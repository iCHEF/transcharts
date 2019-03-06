import React, { FunctionComponent, useContext } from 'react';
import { LinePath } from '@vx/shape';
import {
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  // from common types
  Margin,
  FieldSelector,
  AxisEncoding,
  ColorEncoding,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

import { useChartDimensions } from '../hooks/useChartDimensions';
import { useCartesianEncodings } from '../hooks/useCartesianEncodings';
import { SvgWithAxisFrame } from '../frames/SvgWithAxisFrame';

export interface LineChartProps {
  /** Margin between the inner graph area and the outer svg */
  margin?: Margin;

  /** Should show the axis on the left or not */
  showLeftAxis?: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis?: boolean;

  data: object[];
  x: AxisEncoding;
  y: AxisEncoding;
  color?: ColorEncoding;
}

/** A line and a dot for the point being hovered */
const HoveringIndicator: FunctionComponent<{
  hovering: boolean,
  xPos: number,
  yPos: number,
  height: number,
  color: string,
}> = ({ hovering, xPos, yPos, height, color }) => {
  if (!hovering) {
    return null;
  }

  return(
    <>
      <line
        x1={xPos}
        y1={0}
        x2={xPos}
        y2={height}
        style={{ stroke:'rgba(124, 137, 147, 0.25)', strokeWidth: 2 }}
      />
      <circle
        cx={xPos}
        cy={yPos}
        r={4.5}
        fill={color}
      />
    </>
  );
};

const DataLine: FunctionComponent<{
  color: string,
  xSelector: FieldSelector,
  ySelector: FieldSelector,
  rows: object[],
}> = ({ color, xSelector, ySelector, rows }) => {
  const lineDots = rows.map((dataRow, index) => (
    <circle
      key={`c-${index}`}
      cx={xSelector.getScaledVal(dataRow)}
      cy={ySelector.getScaledVal(dataRow)}
      r={3.5}
      fill={color}
    />
  ));
  return (
    <>
      {/* Draw the line */}
      <LinePath
        data={rows}
        x={xSelector.getScaledVal}
        y={ySelector.getScaledVal}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Draw dots on the line */}
      {lineDots}
    </>
  );
};

export const LineChart = ({
  data,
  // FIXME: remove the default margin after fixing the defaultProps of`<SvgWithAxisFrame>`
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  x,
  y,
  color,
  showLeftAxis,
  showBottomAxis,
}: LineChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const { chartRef, outerDimension, graphDimension } = useChartDimensions(margin);
  const { width: graphWidth, height: graphHeight } = graphDimension;
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();
  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
  } = useCartesianEncodings(graphDimension, theme, data, x, y, color);

  const graphGroup = dataGroups.map(
    (rows: object[], index: number) => {
      const colorString: string = rowValSelectors.color.getString(rows[0]);
      return (
        <DataLine
          key={`row-${index}`}
          color={colorString}
          rows={rows}
          xSelector={rowValSelectors.x}
          ySelector={rowValSelectors.y}
        />
      );
    }
  );

  /** Width of the collision detection rectangle */
  const collisBandWidth = graphWidth / (data.length - 1);

  return (
    <SvgWithAxisFrame
      ref={chartRef}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      margin={margin}
      data={data}
      scalesConfig={scalesConfig}
      svgOverlay={
        // Draw the tooltip
        <TooltipLayer
          hovering={hovering}
          hoveredPoint={hoveredPoint}
          data={data}
          graphWidth={graphWidth}
          graphHeight={graphHeight}
          margin={margin}
          xSelector={rowValSelectors.x}
          ySelector={rowValSelectors.y}
          getColor={rowValSelectors.color.getString}
        />
      }
    >
      {graphGroup}
      <HoveringIndicator
        hovering={hovering}
        xPos={rowValSelectors.x.getScaledVal(data[hoveredPoint.index])}
        yPos={rowValSelectors.y.getScaledVal(data[hoveredPoint.index])}
        height={graphHeight}
        color={rowValSelectors.color.getString(data[hoveredPoint.index])}
      />

      {/* Areas which are used to detect mouse or touch interactions */}
      <HoverLayer
        setHoveredPosAndIndex={setHoveredPosAndIndex}
        clearHovering={clearHovering}
        collisionComponents={data.map(
          (dataRow, index) => {
            const rectX = index === 0
              ? 0
              : rowValSelectors.x.getScaledVal(
                  dataRow,
                ) -
                collisBandWidth * 0.5;

            const rectWidth = index === 0 || index === data.length - 1
              ? collisBandWidth / 2
              : collisBandWidth;

            return (
              <rect
                // #TODO: use unique keys rather than array index
                key={`colli-${index}`}
                x={rectX}
                y={0}
                width={rectWidth}
                height={graphHeight}
                opacity={0}
              />
            );
          }
        )}
      />
    </SvgWithAxisFrame>
  );
};
