import { ResponsiveLayer } from '@ichef/transcharts-graph';
import * as React from 'react';

export interface Scale {
  type: 'point' | 'time' | 'linear';
}
export interface Field {
  name: string;
  color: string;
}

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
  fieldX: Field;
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
