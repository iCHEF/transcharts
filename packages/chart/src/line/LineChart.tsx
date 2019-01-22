import {
  Axis,
  DataLayer,
  DataLayerAxes,
  Field,
  ResponsiveLayer,
  ResponsiveState,
  Scale,
} from '@ichef/transcharts-graph';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { LinePath } from '@vx/shape';
import * as React from 'react';

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
  fieldsX: Field[];
  fieldsY: Field[];
}

/**
 * Returns the data value conversion function of the field
 * using the d3Scale function of the axis
 * @param axis - the axis computed from DataLayer
 * @param fieldIndex - the current index of the field
 */
function getConvertFuncFromAxis(axis: Axis, fieldIndex: number) {
  const { fields, d3Scale, getValue } = axis;
  const fieldName = fields[fieldIndex].name;
  return (d: object) => d3Scale(getValue(d[fieldName]));
}

export class LineChart extends React.PureComponent<LineChartProps, {}> {
  public static defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 30,
    },
  };

  public render() {
    const { data, scaleX, scaleY, fieldsX, fieldsY, margin } = this.props;

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

                  return (
                    <g transform={`translate(${left}, ${top})`}>
                      <LinePath
                        data={data}
                        x={getX}
                        y={getY}
                        stroke={'#ff7049'}
                        strokeWidth={1.5}
                      />
                      <AxisLeft
                        top={0}
                        left={0}
                        scale={yAxis.d3Scale}
                        hideZero
                        // TODO: modify it as a function
                        numTicks={5}
                        label="Axis Left Label"
                        labelProps={{
                          fill: '#1b1a1e',
                          textAnchor: 'middle',
                          fontSize: 12,
                          fontFamily: 'Arial',
                        }}
                        stroke="#1b1a1e"
                        tickStroke="#1b1a1e"
                        tickLabelProps={(value, index) => ({
                          fill: '#1b1a1e',
                          textAnchor: 'end',
                          fontSize: 10,
                          fontFamily: 'Arial',
                          dx: '-0.25em',
                          dy: '0.25em',
                        })}
                        tickComponent={({ formattedValue, ...tickProps }) => (
                          <text {...tickProps}>{formattedValue}</text>
                        )}
                      />
                      <AxisBottom
                        top={graphHeight}
                        scale={xAxis.d3Scale}
                        stroke="#1b1a1e"
                        tickStroke="#1b1a1e"
                        tickLabelProps={(value, index) => ({
                          fill: '#1b1a1e',
                          fontSize: 11,
                          textAnchor: 'middle',
                        })}
                      />
                    </g>
                  );
                }}
              </DataLayer>
            </svg>
          );
        }}
      </ResponsiveLayer>
    );
  }
}
