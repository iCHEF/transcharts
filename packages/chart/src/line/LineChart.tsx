import { DataLayer, Field, ResponsiveLayer, Scale } from '@ichef/transcharts-graph';
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
        {({ width, height }) => (
          <DataLayer
            width={width}
            height={height}
            data={data}
            scaleX={scaleX}
            scaleY={scaleY}
            fieldsX={fieldsX}
            fieldsY={fieldsY}
          >
            {({ xAxis, yAxis }) => {
              console.log(xAxis, yAxis)
              return (
                <>
                  <p>Width: {width}</p>
                  <p>Height: {height}</p>
                </>
              );
            }}
          </DataLayer>
        )}
      </ResponsiveLayer>
    );
  }
}
