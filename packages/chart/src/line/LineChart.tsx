import * as React from 'react';
import { LinePath } from '@vx/shape';
import {
  AxisConfig,
  AxisLayer,
  DataLayer,
  DataLayerAxes,
  HoverLayer,
  HoverLayerState,
  DataField,
  ResponsiveLayer,
  ResponsiveState,
  Scale,
  Margin,
} from '@ichef/transcharts-graph';

export interface LineChartProps {
   /** Margin between the inner graph area and the outer svg */
  margin: Margin;
  data: object[];
  scaleX: Scale;
  scaleY: Scale;
  fieldsX: DataField[];
  fieldsY: DataField[];
  /** Should show the axis on the left or not */
  showLeftAxis: boolean;
  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean;
}

/**
 * Returns the data value conversion function of the field
 * using the d3Scale function of the axis
 * @param axis - the axis computed from DataLayer
 * @param fieldIndex - the current index of the field
 */
function getConvertFuncFromAxis(axis: AxisConfig, fieldIndex: number) {
  const { fields, d3Scale, getValue } = axis;
  const fieldName = fields[fieldIndex].name;
  return (d: object) => d3Scale(getValue(d[fieldName]));
}

export const LineChart: React.SFC<LineChartProps> = ({
  data,
  scaleX,
  scaleY,
  fieldsX,
  fieldsY,
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  },
  showLeftAxis = true,
  showBottomAxis = true,
}) => {
  return (
    <ResponsiveLayer>
      {({ width: outerWidth, height: outerHeight }: ResponsiveState) => {
        const { top, right, bottom, left } = margin;
        const graphWidth = outerWidth - left - right;
        const graphHeight = outerHeight - top - bottom;

        if (graphWidth <= 0 || graphHeight <= 0) {
          return null;
        }

        return (
            <DataLayer
              width={graphWidth}
              height={graphHeight}
              data={data}
              scaleX={scaleX}
              scaleY={scaleY}
              fieldsX={fieldsX}
              fieldsY={fieldsY}
            >
              {({ xAxis, yAxis }: DataLayerAxes) => {
                const getX = getConvertFuncFromAxis(xAxis, 0);
                const getY = getConvertFuncFromAxis(yAxis, 0);

                /** Width of the collision detection rectangle */
                const bandWidth = graphWidth / (data.length - 1);

                const lineDots = data.map((dataRow, index) => (
                  <circle
                    key={`c-${index}`}
                    cx={getX(dataRow)}
                    cy={getY(dataRow)}
                    r={3.5}
                    fill={'#ff7049'}
                  />
                ));

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

                        {/* Draw the line */}
                        <LinePath
                          data={data}
                          x={getX}
                          y={getY}
                          stroke={'#ff7049'}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Draw dots on the line */}
                        {lineDots}

                        {/* Areas which are used to detect mouse or touch interactions */}
                        <HoverLayer
                          width={outerWidth}
                          height={outerWidth}
                          margin={margin}
                          collisionComponents={
                            data.map((dataRow, index) => (
                              <rect
                                key={`colli-${index}`}
                                x={index === 0 ? 0 : getX(dataRow) - bandWidth * 0.5}
                                y={0}
                                width={index === 0 || index === data.length - 1
                                  ? bandWidth / 2
                                  : bandWidth
                                }
                                height={graphHeight}
                                fill={'#ff7049'}
                                opacity={0.5}
                                stroke="blue"
                                strokeWidth={3}
                              />
                            ))
                          }
                        />
                      </g>
                    </svg>
                  </>
                );
              }}
            </DataLayer>
        );
      }}
    </ResponsiveLayer>
  );
};
