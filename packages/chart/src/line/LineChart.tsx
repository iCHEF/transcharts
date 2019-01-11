import { ResponsiveLayer } from '@ichef/transcharts-graph';
import * as React from 'react';

export interface LineChartProps {
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

// #TODO: sample data

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
