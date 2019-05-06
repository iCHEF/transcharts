import React, { useContext } from 'react';
import { AxisBottom, AxisLeft } from '@vx/axis';

import { AxisScale } from '../common/types';
import { ThemeContext } from '../themes';

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

  /** X-axis configurations produced by `getAxisScale` */
  xAxisScale: AxisScale['scale'];

  /** Y-axis configurations produced by `getAxisScale` */
  yAxisScale: AxisScale['scale'];
}

const getXtickLabelProps = (styles: {
  tickFontSize: number,
  strokeColor: string,
}) => (value: any, index: number) => ({
  fill: styles.strokeColor,
  textAnchor: 'end',
  fontSize: styles.tickFontSize,
  dx: '-0.25em',
  dy: '0.25em',
});

const getYtickLabelProps = (styles: {
  tickFontSize: number,
  strokeColor: string,
}) => (value: any, index: number) => ({
  fill: styles.strokeColor,
  fontSize: styles.tickFontSize,
  textAnchor: 'middle',
});

/**
 * Always format the value as string to prevent the zero value from not showing
 */
const tickFormat = (val: any) => `${val}`;

export const AxisLayer: React.SFC<AxisLayerProps> = ({
  width,
  height,
  // it should always show the left axis by default
  showLeftAxis = true,
  // it should always show the bottom axis by default
  showBottomAxis = true,
  data,
  xAxisScale,
  yAxisScale,
}) => {

  const theme = useContext(ThemeContext);
  const { xAxis: xAxisTheme, yAxis: yAxisTheme } = theme;

  return (
      <>
        {showLeftAxis && (
          <AxisLeft
            top={0}
            left={0}
            scale={yAxisScale}
            // TODO: support showing labels on axes
            stroke={xAxisTheme.strokeColor}
            strokeWidth={xAxisTheme.strokeWidth}
            tickStroke={xAxisTheme.tickStrokeColor}
            // TODO: modify it as a function
            numTicks={getNumberOfTicks(height, data)}
            tickLabelProps={getXtickLabelProps(xAxisTheme)}
            tickFormat={tickFormat}
            // TODO: format the ticks based on the axis types
            // tickComponent={({ formattedValue, ...tickProps }) => (
            //   <text {...tickProps}>{formattedValue}</text>
            // )}
          />
        )}
        {showBottomAxis && (
          <AxisBottom
            top={height}
            scale={xAxisScale}
            stroke={yAxisTheme.strokeColor}
            strokeWidth={yAxisTheme.strokeWidth}
            tickStroke={yAxisTheme.tickStrokeColor}
            numTicks={getNumberOfTicks(width, data)}
            label="label"
            tickFormat={tickFormat}
            tickLabelProps={getYtickLabelProps(yAxisTheme)}
          />
        )}
      </>
  );
};
