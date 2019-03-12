import React, { FunctionComponent, useContext, useMemo } from 'react';
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

/** A line and a dot for the point being hovered */
const HoveringIndicator: FunctionComponent<{
  hovering: boolean,
  xPos: number,
  rectWidth: number,
  height: number,
  color: string,
}> = ({ hovering, xPos, rectWidth, height, color }) => {
  if (!hovering) {
    return null;
  }

  return(
    <rect
      x={xPos}
      y={0}
      width={rectWidth}
      height={height}
      opacity={0.5}
      fill="rgba(124, 137, 147, 0.25)"
    />
  );
};

export interface BarChartProps {
  /** Margin between the inner graph area and the outer svg */
  margin?: Margin;

  /** Should show the axis on the left or not */
  showLeftAxis?: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis?: boolean;

  /** Ration of the paddings between bars */
  paddingInner: number;

  data: object[];
  x: AxisEncoding;
  y: AxisEncoding;
  color?: ColorEncoding;
}

export const BarChart = ({
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
  paddingInner = 0.1,
}: BarChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const { chartRef, outerDimension, graphDimension } = useChartDimensions(margin);
  const { width: graphWidth, height: graphHeight } = graphDimension;

  const xEncoding: AxisEncoding = { ...x, scale: 'band', scaleConfig: {
    paddingInner,
  }};
  const yEncoding: AxisEncoding = { ...y, scale: 'linear' };
  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
  } = useCartesianEncodings(graphDimension, theme, data, xEncoding, yEncoding, color);
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();

  const bandWidth = scalesConfig.x.scale.bandwidth();

  const graphGroup = useMemo(
    () => {
      // calculate the accumulated y position of certain points
      const accumY = {};
      const getAccumY = (xPos: number, yPos: number, height: number) => {
        if (!accumY[xPos]) {
          accumY[xPos] = graphHeight;
        }
        accumY[xPos] -= height;
        return accumY[xPos];
      };

      return dataGroups.map(
        (rows: object[], groupIdx: number) => {
          return rows.map((row: object, rowIdx: number) => {
            const colorString: string = rowValSelectors.color.getString(rows[0]);
            const xPos = rowValSelectors.x.getScaledVal(row);
            const yPos = rowValSelectors.y.getScaledVal(row);
            const height = graphHeight - yPos;
            return (
              <rect
                key={`bar-${rowIdx}`}
                x={xPos}
                y={getAccumY(xPos, yPos, height)}
                width={bandWidth}
                height={height}
                fill={colorString}
              />
            );
          });
        }
      );
    },
    [dataGroups, scalesConfig, rowValSelectors],
  );

  return (
    <SvgWithAxisFrame
      ref={chartRef}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      // put the axes on top of the bars
      axisInBackground={false}
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
          x={rowValSelectors.x.getScaledVal(data[hoveredPoint.index]) + bandWidth / 2}
          getColor={rowValSelectors.color.getString}
        />
      }
    >
      {graphGroup}
      <HoveringIndicator
        hovering={hovering}
        xPos={rowValSelectors.x.getScaledVal(data[hoveredPoint.index])}
        rectWidth={bandWidth}
        height={graphHeight}
        color={rowValSelectors.color.getString(data[hoveredPoint.index])}
      />

      {/* Areas which are used to detect mouse or touch interactions */}
      <HoverLayer
        setHoveredPosAndIndex={setHoveredPosAndIndex}
        clearHovering={clearHovering}
        collisionComponents={data.map(
          (dataRow, index) => {
            const rectX = rowValSelectors.x.getScaledVal(dataRow);

            return (
              <rect
                // #TODO: use unique keys rather than array index
                key={`colli-${index}`}
                x={rectX}
                y={0}
                width={bandWidth}
                height={graphHeight}
                opacity={0.5}
                fill={'#fcabcd'}
              />
            );
          }
        )}
      />
    </SvgWithAxisFrame>
  );
};
