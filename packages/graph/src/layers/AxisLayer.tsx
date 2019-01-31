import * as React from 'react';
import { AxisBottom, AxisLeft } from '@vx/axis';

import { AxisConfig } from '../common/types';

// TODO: This should be extracted as a variable in the context
const axisStyles = {
  strokeColor: '#7c8a94',
  tickStrokeColor: '#7c8a94',
  strokeWidth: 1.5,
  tickFontSize: 13,
};

/**
 * Returns the number of ticks on the axis based on the length of data and the axis
 * @param axisLength - length of the axis
 * @param data - data of the graph
 */
function getNumberOfTicks(axisLength: number, data: object[]): number {
  const maxTicks = Math.max(data.length, 2);
  const lengthBasis = axisLength > 0 ? axisLength : 60;
  const ticksFromLen = Math.ceil(lengthBasis / 60);
  return Math.min(maxTicks, ticksFromLen);
}

export interface AxisLayerProps {
  /** Width of the inner graph */
  width: number;

  /** Height of the inner graph */
  height: number;

  /** Should show the axis on the left or not */
  showLeftAxis: boolean;

  /** Should show the axis on the bottom or not */
  showBottomAxis: boolean;

  /** Data of the chart */
  data: object[];

  /** X-axis configurations produced by `<DataLayer>` */
  xAxis: AxisConfig;

  /** Y-axis configurations produced by `<DataLayer>` */
  yAxis: AxisConfig;
}

const getXtickLabelProps = (styles: { tickFontSize: number }) => (value: any, index: number) => ({
  fill: axisStyles.strokeColor,
  textAnchor: 'end',
  fontSize: styles.tickFontSize,
  dx: '-0.25em',
  dy: '0.25em',
});

const getYtickLabelProps = (styles: { tickFontSize: number }) => (value: any, index: number) => ({
  fill: axisStyles.strokeColor,
  fontSize: styles.tickFontSize,
  textAnchor: 'middle',
});

export const AxisLayer: React.SFC<AxisLayerProps> = ({
  width,
  height,
  // it should always show the left axis by default
  showLeftAxis = true,
  // it should always show the bottom axis by default
  showBottomAxis = true,
  data,
  xAxis,
  yAxis,
}) => {

  return (
      <>
        {showLeftAxis && (
          <AxisLeft
            top={0}
            left={0}
            scale={yAxis.d3Scale}
            // TODO: support showing labels on axes
            stroke={axisStyles.strokeColor}
            strokeWidth={axisStyles.strokeWidth}
            tickStroke={axisStyles.tickStrokeColor}
            // TODO: modify it as a function
            numTicks={getNumberOfTicks(height, data)}
            tickLabelProps={getXtickLabelProps(axisStyles)}
            // TODO: format the ticks based on the axis types
            // tickComponent={({ formattedValue, ...tickProps }) => (
            //   <text {...tickProps}>{formattedValue}</text>
            // )}
          />
        )}
        {showBottomAxis && (
          <AxisBottom
            top={height}
            scale={xAxis.d3Scale}
            stroke={axisStyles.strokeColor}
            strokeWidth={axisStyles.strokeWidth}
            tickStroke={axisStyles.tickStrokeColor}
            numTicks={getNumberOfTicks(width, data)}
            // TODO: deal with date type
            tickLabelProps={getYtickLabelProps(axisStyles)}
          />
        )}
      </>
  );
};
