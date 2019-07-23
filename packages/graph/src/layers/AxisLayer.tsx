import React, { useContext, useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@vx/axis';

import { AxisScale, AxisEncoding } from '../common/types';
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

/**
 * Returns the text of the label displayed along axis
 */
function getAxisLabel(axis: AxisEncoding): string | undefined {
  const { label, field, hideLabel } = axis;
  if (hideLabel) {
    return undefined;
  }

  return label || field;
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

  /** Should show the zero line */
  showZeroLine?: boolean;

  /** Data of the chart */
  data: object[];

  /** Axis encoding of x-axis */
  x: AxisEncoding;

  /** Axis encoding of y-axis */
  y: AxisEncoding;

  /** Whether it is a vertical chart. True for most charts. */
  drawFromXAxis?: boolean;

  /** X-axis configurations produced by `getAxisScale` */
  xAxisScale: AxisScale['scale'];

  /** Y-axis configurations produced by `getAxisScale` */
  yAxisScale: AxisScale['scale'];
}

const getZeroLineProps = (
  xAxisScale: AxisScale['scale'],
  yAxisScale: AxisScale['scale'],
  drawFromXAxis: AxisLayerProps['drawFromXAxis'],
) => {
  if (drawFromXAxis) {
    const yPos = yAxisScale(0);
    return {
      x1: 0,
      y1: yPos,
      x2: xAxisScale.range()[1],
      y2: yPos,
    };
  }

  // horizontal charts
  const xPos = xAxisScale(0);
  return {
    x1: xPos,
    y1: 0,
    x2: xPos,
    y2: yAxisScale.range()[0],
  };
};

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
  x,
  y,
  // it should always show the left axis by default
  showLeftAxis = true,
  // it should always show the bottom axis by default
  showBottomAxis = true,
  // it should always show the zero line if its domain crosses zero
  showZeroLine = true,
  drawFromXAxis = true,
  data,
  xAxisScale,
  yAxisScale,
}) => {
  const theme = useContext(ThemeContext);
  const { xAxis: xAxisTheme, yAxis: yAxisTheme } = theme;

  const xAxisLabel = useMemo(() => getAxisLabel(x), [x]);
  const yAxisLabel = useMemo(() => getAxisLabel(y), [y]);

  // props for the zero value assisting
  const zeroLineProps = useMemo(
    () => {
      let crossedPosNeg = false;
      if (drawFromXAxis) {
        const yDomain = yAxisScale.domain();
        crossedPosNeg = yDomain[0] * yDomain[1] < 0;
      } else {
        const xDomain = xAxisScale.domain();
        crossedPosNeg = xDomain[0] * xDomain[1] < 0;
      }

      // if there is no need to draw the zero value line
      if (!(showZeroLine && crossedPosNeg)) {
        return undefined;
      }

      return getZeroLineProps(xAxisScale, yAxisScale, drawFromXAxis);
    },
    [xAxisScale, yAxisScale, drawFromXAxis]
  );

  const axisLayer = useMemo(
    () => {
      return (
        <>
          {/* Zero value line */}
          {zeroLineProps && (
            <line
              {...zeroLineProps}
              style={{ stroke:'rgba(124, 137, 147, 0.25)', strokeWidth: 2 }}
            />
          )}

          {/* Y Axis */}
          {showLeftAxis && (
            <AxisLeft
              top={0}
              left={0}
              scale={yAxisScale}
              label={yAxisLabel}
              labelProps={{
                fill: yAxisTheme.labelColor,
                fontSize: yAxisTheme.labelFontSize,
                textAnchor: yAxisTheme.labelTextAnchor,
              }}
              stroke={yAxisTheme.strokeColor}
              strokeWidth={yAxisTheme.strokeWidth}
              tickStroke={yAxisTheme.tickStrokeColor}
              // TODO: modify it as a function
              numTicks={getNumberOfTicks(height, data)}
              tickLabelProps={getXtickLabelProps(yAxisTheme)}
              tickFormat={tickFormat}
              // TODO: format the ticks based on the axis types
              // tickComponent={({ formattedValue, ...tickProps }) => (
              //   <text {...tickProps}>{formattedValue}</text>
              // )}
            />
          )}

          {/* X Axis */}
          {showBottomAxis && (
            <AxisBottom
              top={height}
              scale={xAxisScale}
              label={xAxisLabel}
              labelProps={{
                fill: xAxisTheme.labelColor,
                fontSize: xAxisTheme.labelFontSize,
                textAnchor: xAxisTheme.labelTextAnchor,
              }}
              stroke={xAxisTheme.strokeColor}
              strokeWidth={xAxisTheme.strokeWidth}
              tickStroke={xAxisTheme.tickStrokeColor}
              numTicks={getNumberOfTicks(width, data)}
              tickFormat={tickFormat}
              tickLabelProps={getYtickLabelProps(xAxisTheme)}
            />
          )}
        </>
      );
    },
    [
      width,
      height,
      x,
      y,
      showLeftAxis,
      showBottomAxis,
      showZeroLine,
      data,
      xAxisScale,
      yAxisScale,
    ]
  );

  return axisLayer;
};
