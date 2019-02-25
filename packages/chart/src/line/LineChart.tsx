import React, { FunctionComponent, useContext, useRef } from 'react';
import { LinePath } from '@vx/shape';
import {
  // from AxisLayer
  AxisLayer,
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from TooltipLayer
  TooltipLayer,
  // from common types
  Margin,
  Scale,
  AxisEncoding,
  // from utils
  getXAxisScale,
  getYAxisScale,
  // from themes
  Theme,
  ThemeContext,
  // from hooks
  useContainerDimension,
} from '@ichef/transcharts-graph';

import { getInnerGraphDimension } from '../utils/getInnerGraphDimension';

export interface LineChartProps {
   /** Margin between the inner graph area and the outer svg */
  margin: Margin;
  data: object[];
  x: AxisEncoding;
  y: AxisEncoding;
  /** Should show the axis on the left or not */
  showLeftAxis: boolean;
  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean;
  /** Theme object */
  theme: Theme;
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

export const LineChart: FunctionComponent<LineChartProps> = ({
  data,
  x,
  y,
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  showLeftAxis = true,
  showBottomAxis = true,
}) => {
  const theme = useContext(ThemeContext);
  const chartRef = useRef<HTMLDivElement>(null);
  const dimension = useContainerDimension(chartRef);
  const { width: outerWidth, height: outerHeight } = dimension;
  const { graphWidth, graphHeight } = getInnerGraphDimension(dimension, margin);
  if (graphWidth <= 0 || graphHeight <= 0) {
    return null;
  }
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();
  const bandWidth = graphWidth / (data.length - 1);

  const xAxis = getXAxisScale({
    axisLength: graphWidth,
    encoding: x,
    data,
  })
  const yAxis = getYAxisScale({
    axisLength: graphHeight,
    encoding: y,
    data
  })
  const xSelector = xAxis.getSelectors();
  const ySelector = yAxis.getSelectors();
  /** Width of the collision detection rectangle */
  const color = theme.colors.category[0];

  const lineDots = data.map((dataRow, index) => (
    <circle
      key={`c-${index}`}
      cx={xSelector.getScaledVal(dataRow)}
      cy={ySelector.getScaledVal(dataRow)}
      r={3.5}
      fill={color}
    />
  ));

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      ref={chartRef}
    >
      <svg width={outerWidth} height={outerHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Draw the axes */}
          <AxisLayer
            width={graphWidth}
            height={graphHeight}
            showLeftAxis={showLeftAxis}
            showBottomAxis={showBottomAxis}
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
          />

          {/* Draw the line */}
          <LinePath
            data={data}
            x={xSelector.getScaledVal}
            y={ySelector.getScaledVal}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Draw dots on the line */}
          {lineDots}
          <HoveringIndicator
            hovering={hovering}
            xPos={xSelector.getScaledVal(data[hoveredPoint.index])}
            yPos={ySelector.getScaledVal(data[hoveredPoint.index])}
            height={graphHeight}
            color={color}
          />

          {/* Areas which are used to detect mouse or touch interactions */}
          <HoverLayer
            setHoveredPosAndIndex={setHoveredPosAndIndex}
            clearHovering={clearHovering}
            collisionComponents={data.map(
              (dataRow, index) => {
                const rectX = index === 0
                  ? 0
                  : xSelector.getScaledVal(
                      dataRow,
                    ) -
                    bandWidth * 0.5;

                const rectWidth = index === 0 || index === data.length - 1
                  ? bandWidth / 2
                  : bandWidth;

                return (
                  <rect
                    // #TODO: use keys defined in the `<DataLayer>`
                    key={`colli-${index}`}
                    x={rectX}
                    y={0}
                    width={rectWidth}
                    height={graphHeight}
                    opacity={0}
                  />
                );
              })}
          />
        </g>
      </svg>

      {/* Draw the tooltip */}
      <TooltipLayer
        hovering={hovering}
        hoveredPoint={hoveredPoint}
        data={data}
        graphWidth={graphWidth}
        graphHeight={graphHeight}
        margin={margin}
        xSelector={xSelector}
        ySelector={ySelector}
        color={color}
      />
    </div>
  );
};
