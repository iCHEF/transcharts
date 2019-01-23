import { AxisBottom, AxisLeft } from '@vx/axis';
import * as React from 'react';
import { Axis } from './DataLayer';

export interface AxisLayerProps {
  /** Width of the inner graph */
  width: number;

  /** Height of the inner graph */
  height: number;

  /** Should show the axis on the left or not */
  showLeft: boolean;

  /** Should show the axis on the bottom or not */
  showBottom: boolean;

  /** Data of the chart */
  data: object[];

  /** X-axis configurations produced by `<DataLayer>` */
  xAxis: Axis;

  /** Y-axis configurations produced by `<DataLayer>` */
  yAxis: Axis;
}

export const AxisLayer: React.SFC<AxisLayerProps> = ({
  width,
  height,
  // it should always show the left axis by default
  showLeft = true,
  // it should always show the bottom axis by default
  showBottom = true,
  data,
  xAxis,
  yAxis,
}) => {

  return (
      <>
        {showLeft && (
          <AxisLeft
            top={0}
            left={0}
            scale={yAxis.d3Scale}
            hideZero
            // TODO: modify it as a function
            numTicks={5}
            label="Axis Left Label"
            labelProps={{
              fill: '#7c8a94',
              textAnchor: 'middle',
              fontSize: 12,
              fontFamily: 'Arial',
            }}
            stroke="#7c8a94"
            strokeWidth={2}
            tickStroke="#7c8a94"
            tickLabelProps={(value, index) => ({
              fill: '#7c8a94',
              textAnchor: 'end',
              fontSize: 12,
              fontFamily: 'Arial',
              dx: '-0.25em',
              dy: '0.25em',
            })}
            tickComponent={({ formattedValue, ...tickProps }) => (
              <text {...tickProps}>{formattedValue}</text>
            )}
          />
        )}
        {showBottom && (
          <AxisBottom
            top={height}
            scale={xAxis.d3Scale}
            stroke="#7c8a94"
            strokeWidth={2}
            tickStroke="#7c8a94"
            numTicks={5}
            tickLabelProps={(value, index) => ({
              fill: '#7c8a94',
              fontSize: 12,
              textAnchor: 'middle',
            })}
          />
        )}
      </>
  );
};
