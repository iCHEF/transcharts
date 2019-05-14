import React, { useContext, useMemo } from 'react';
import { LinePath } from '@vx/shape';
import {
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  AxisProjectedValue,
  // from Legend,
  LegendGroup,
  // from common types
  FieldSelector,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

import { useChartDimensions } from '../hooks/useChartDimensions';
import { useCartesianEncodings } from '../hooks/useCartesianEncodings';
import { SvgWithAxisFrame } from '../frames/SvgWithAxisFrame';
import { DEFAULT_VALS } from '../common/config';
import { CommonChartProps } from '../common/types';

/**
 * Return the position of the hovering detection rect.
 * If the given index exceeds its bound, it will return its closest value.
 */
function getXPosByIndex(arr: AxisProjectedValue[], idx: number) {
  let arrIdx = idx < 0 ? 0 : idx;
  if (idx >= arr.length) {
    arrIdx = arr.length - 1;
  }
  return arr[arrIdx].xPos;
}

export type LineChartProps = CommonChartProps;

/** A line and a dot for the point being hovered */
const HoveringIndicator = ({ hovering, projectedPoints, height }: {
  hovering: boolean,
  projectedPoints: AxisProjectedValue,
  height: number,
}) => {
  if (!hovering) {
    return null;
  }

  const circles = projectedPoints.groupedY.map(pointY => (
    <circle
      key={`c-${pointY.yStrVal}`}
      cx={projectedPoints.xPos}
      cy={pointY.yPos}
      r={4.5}
      fill={pointY.color}
    />
  ));

  return(
    <>
      <line
        x1={projectedPoints.xPos}
        y1={0}
        x2={projectedPoints.xPos}
        y2={height}
        style={{ stroke:'rgba(124, 137, 147, 0.25)', strokeWidth: 2 }}
      />
      {circles}
    </>
  );
};

const DataLine = ({ color, xSelector, ySelector, rows }: {
  color: string,
  xSelector: FieldSelector,
  ySelector: FieldSelector,
  rows: object[],
}) => {
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

const defaultProps = {
  margin: DEFAULT_VALS.MARGIN,
};

export const LineChart = ({
  data,
  margin,
  x,
  y,
  color,
  title,
  titleDesc,
  showLeftAxis,
  showBottomAxis,
}: LineChartProps) => {
  const theme = useContext<Theme>(ThemeContext);
  const {
    chartRef,
    titleRef,
    legendRef,
    outerDimension,
    graphDimension,
    graphMargin,
  } = useChartDimensions(margin, color);
  const { width: graphWidth, height: graphHeight } = graphDimension;
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();
  const {
    dataGroups,
    scalesConfig,
    rowValSelectors,
    axisProjectedValues,
  } = useCartesianEncodings(graphDimension, theme, data, x, y, color);

  const graphGroup = useMemo(
    () => (
      dataGroups.map(
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
      )
    ),
    [dataGroups, rowValSelectors]
  );

  const hoverDetectionComponents = useMemo(
    () => (
      axisProjectedValues.map(
        (row, idx) => {
          const rectX = (row.xPos + getXPosByIndex(axisProjectedValues, idx - 1)) / 2;

          const rectWidth = (
            (row.xPos + getXPosByIndex(axisProjectedValues, idx + 1)) / 2
          ) - rectX;

          return (
            <rect
              // #TODO: use unique keys rather than array index
              key={`colli-${idx}`}
              x={rectX}
              y={0}
              width={rectWidth}
              height={graphHeight}
              opacity={0}
            />
          );
        }
      )
    ),
    [axisProjectedValues, graphHeight]
  );

  return (
    <SvgWithAxisFrame
      ref={chartRef}
      titleRef={titleRef}
      title={title}
      titleDesc={titleDesc}
      outerDimension={outerDimension}
      graphDimension={graphDimension}
      showLeftAxis={showLeftAxis}
      showBottomAxis={showBottomAxis}
      x={x}
      y={y}
      margin={graphMargin}
      data={data}
      scalesConfig={scalesConfig}
      svgOverlay={
        <>
          {/* Draw the tooltip */}
          <TooltipLayer
            hovering={hovering}
            hoveredPoint={hoveredPoint}
            axisProjectedValues={axisProjectedValues}
            graphWidth={graphWidth}
            graphHeight={graphHeight}
            margin={graphMargin}
          />
          {/* Draw the legned */}
          <LegendGroup
            color={color && {
              ...color,
              ...scalesConfig.color!,
            }}
            ref={legendRef}
          />
        </>
      }
    >
      {graphGroup}
      <HoveringIndicator
        hovering={hovering}
        projectedPoints={axisProjectedValues[hoveredPoint.index]}
        height={graphHeight}
      />

      {/* Areas which are used to detect mouse or touch interactions */}
      <HoverLayer
        setHoveredPosAndIndex={setHoveredPosAndIndex}
        clearHovering={clearHovering}
        hoverDetectionComponents={hoverDetectionComponents}
      />
    </SvgWithAxisFrame>
  );
};
LineChart.defaultProps = defaultProps;
