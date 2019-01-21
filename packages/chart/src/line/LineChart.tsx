import {
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
              console.log(xAxis, yAxis);
              return (
                <svg width={width} height={height}>
                  <LinePath
                    data={data}
                    x={d => xAxis.d3Scale(d.x)}
                    y={d => yAxis.d3Scale(d.y)}
                    stroke={'#af0c5d'}
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
