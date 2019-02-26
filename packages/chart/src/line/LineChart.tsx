import React, { useContext } from 'react';
import { LinePath } from '@vx/shape';
import {
  // from AxisLayer
  AxisLayer,
  // from HoverLayer
  HoverLayer,
  // from hooks
  useHoverState,
  // from ResponsiveLayer
  ResponsiveLayer,
  ResponsiveState,
  // from TooltipLayer
  TooltipLayer,
  // from common types
  Margin,
  AxisEncoding,
  ColorEncoding,
  // from utils
  getXAxisScale,
  getYAxisScale,
  getColorScale,
  // from themes
  Theme,
  ThemeContext,
} from '@ichef/transcharts-graph';

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
const HoveringIndicator: React.FC<{
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

export const LineChart: React.SFC<LineChartProps> = ({
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
  const { clearHovering, hovering, hoveredPoint, setHoveredPosAndIndex } = useHoverState();
  return (
    <ResponsiveLayer>
      {({ width: outerWidth, height: outerHeight }: ResponsiveState) => {
        const { top, right, bottom, left } = margin;
        const graphWidth = outerWidth - left - right;
        const graphHeight = outerHeight - top - bottom;

        if (graphWidth <= 0 || graphHeight <= 0) {
          return null;
        }
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

        /** Width of the collision detection rectangle */
        const bandWidth = graphWidth / (data.length - 1);
        const colorScale = typeof color !== 'undefined' && getColorScale({
          encoding: color,
          data,
          colors: theme.colors,
        });

        const dataGroup: object[][] = typeof colorScale === 'object'  ? (function(){
          const dataByField = data.reduce(
            (all, row) => {
              const { field } = color;
              const val = row[field]
              if (!all[val]) {
                all[val] = [row]
              } else {
                all[val].push(row)
              }
              return all
            },
            {}
          );
          return Object.keys(dataByField).map(key => dataByField[key]);
        })() :
          [data];

        const defaultColor = theme.colors.category[0]

        const graphGroup = dataGroup.map(
          rows => {
            const colorString: string = colorScale ? colorScale.scale(rows[0][color.field]) : defaultColor;
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
          <>
            <svg width={outerWidth} height={outerHeight}>
              <g transform={`translate(${left}, ${top})`}>
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

                {graphGroup}
                <HoveringIndicator
                  hovering={hovering}
                  xPos={xSelector.getScaledVal(data[hoveredPoint.index])}
                  yPos={ySelector.getScaledVal(data[hoveredPoint.index])}
                  height={graphHeight}
                  color={defaultColor}
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
              color={defaultColor}
            />
          </>
        );
      }}
    </ResponsiveLayer>
  );
};
