import {
  Axis,
  DataLayer,
  DataLayerAxes,
  Field,
  ResponsiveLayer,
  ResponsiveState,
  Scale
} from '@ichef/transcharts-graph';
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
      left: 20,
    }
  };

  public render() {
    const {
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY,
      margin,
    } = this.props;

    return (
      <ResponsiveLayer>
        {({ width: outerWidth, height: outerHeight }: ResponsiveState) => {
          const { top, right, bottom, left } = margin;
          const graphWidth = outerWidth - left - right;
          const graphHeight = outerHeight - top - bottom;

          return (
            <svg width={outerWidth} height={outerHeight}>
              <g transform={`translate(${left}, ${top})`}>
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
                      <LinePath
                        data={data}
                        x={getX}
                        y={getY}
                        stroke={'#ff7049'}
                        strokeWidth={1.5}
                      />
                    );
                  }}
                </DataLayer>
              </g>
            </svg>
          );
        }}
      </ResponsiveLayer>
    );
  }
}
