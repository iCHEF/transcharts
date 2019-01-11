import * as React from 'react';

export interface LineChartProps {
  framework?: string;
}

// #TODO: sample data

export class LineChart extends React.Component<LineChartProps, {}> {
    public render() {
        return <h1>Line Chart {this.props.framework}!</h1>;
    }
}
