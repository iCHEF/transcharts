import React, { FunctionComponent, useContext, useRef } from 'react';
import { groupBy, values } from 'lodash-es'
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
  AxisEncoding,
  ColorEncoding,
  // from utils
  getColorScale,
  getDataGroup,
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
  color?: ColorEncoding;
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
  color,
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
  const xAxis = getXAxisScale({
    data,
    axisLength: graphWidth,
    encoding: x,
  });
  const yAxis = getYAxisScale({
    data,
    axisLength: graphHeight,
    encoding: y,
  });
  const xSelector = xAxis.selector;
  const ySelector = yAxis.selector;

  const bandWidth = graphWidth / (data.length - 1);
  const colorScale = typeof color !== 'undefined' && getColorScale({
    encoding: color,
    data,
    colors: theme.colors,
  });
  const defaultColor = theme.colors.category[0]
  const getColor = colorScale ? colorScale.selector.getScaledVal : () => defaultColor;
  const fieldsToGroupBy: string[] = [color].filter(encoding => !!encoding).map(encoding => encoding.field);
  const dataGroup = getDataGroup(data, fieldsToGroupBy);

  const graphGroup = dataGroup.map(
    rows => {
      const colorString: string = getColor(rows[0]);
      const lineDots = rows.map((dataRow, index) => (
        <circle
          key={`c-${index}`}
          cx={xSelector.getScaledVal(dataRow)}
          cy={ySelector.getScaledVal(dataRow)}
          r={3.5}
          fill={colorString}
        />
      ));
      return (<>
        {/* Draw the line */}
        <LinePath
          data={rows}
          x={xSelector.getScaledVal}
          y={ySelector.getScaledVal}
          stroke={colorString}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Draw dots on the line */}
        {lineDots}
      </>)
    }
  );

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      ref={chartRef}
    >
      <svg width={outerWidth} height={outerHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisLayer
            width={graphWidth}
            height={graphHeight}
            showLeftAxis={showLeftAxis}
            showBottomAxis={showBottomAxis}
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
          />

          {graphGroup}
          <HoveringIndicator
            hovering={hovering}
            xPos={xSelector.getScaledVal(data[hoveredPoint.index])}
            yPos={ySelector.getScaledVal(data[hoveredPoint.index])}
            height={graphHeight}
            color={getColor(data[hoveredPoint.index])}
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
                    // #TODO: use unique keys rather than array index
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
        getColor={getColor}
      />
    </div>
  );
};
