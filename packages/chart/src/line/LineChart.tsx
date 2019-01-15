import { Field, ResponsiveLayer, Scale } from '@ichef/transcharts-graph';
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
    return (
      <ResponsiveLayer>
        {({ width, height }) => (
          <div>
            <p>Width: {width}</p>
            <p>Height: {height}</p>
          </div>
        )}
      </ResponsiveLayer>
    );
  }
}
