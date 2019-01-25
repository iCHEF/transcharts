import * as React from 'react';
import { LinePath } from '@vx/shape';
import {
  AxisConfig,
  AxisLayer,
  DataLayer,
  DataLayerAxes,
  DataField,
  ResponsiveLayer,
  ResponsiveState,
  Scale,
} from '@ichef/transcharts-graph';

export interface LineChartProps {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
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

        return (
          <svg width={outerWidth} height={outerHeight}>
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
                  </g>
                );
              }}
            </DataLayer>
          </svg>
        );
      }}
    </ResponsiveLayer>
  );
};
