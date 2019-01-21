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
  margin?: {
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

export class LineChart extends React.Component<LineChartProps, {}> {
  public render() {
    const {
      data,
      scaleX,
      scaleY,
      fieldsX,
      fieldsY,
    } = this.props;

    return (
      <ResponsiveLayer>
        {({ width, height } : ResponsiveState) => (
          <DataLayer
            width={width}
            height={height}
            data={data}
            scaleX={scaleX}
            scaleY={scaleY}
            fieldsX={fieldsX}
            fieldsY={fieldsY}
          >
            {({ xAxis, yAxis } : DataLayerAxes) => {
              const getX = getConvertFuncFromAxis(xAxis, 0);
              const getY = getConvertFuncFromAxis(yAxis, 0);

              return (
                <svg width={width} height={height}>
                  <LinePath
                    data={data}
                    x={getX}
                    y={getY}
                    stroke={'#ff7049'}
                    strokeWidth={3}
                  />
                </svg>
              );
            }}
          </DataLayer>
        )}
      </ResponsiveLayer>
    );
  }
}
