import React from 'react';
import { LegendLinear, LegendOrdinal } from '@vx/legend';

const SCALE_TYPE_TO_LEGEND = {
  ordinal: LegendOrdinal,
  sequential: LegendLinear,
};

export interface LegendProps {
  scaleType: string;
  scale: (val: any) => string;
  title: string;
  render?: (labels: ReadonlyArray<object>) => React.ReactNode;
}

export const Legend = ({
  render,
  scaleType,
  scale,
  title,
}: LegendProps) => {
  const LegendComponent = SCALE_TYPE_TO_LEGEND[scaleType];
  return (
    <div>
      <div>{title}</div>
      <LegendComponent scale={scale}>
        {render}
      </LegendComponent>
    </div>
  );
};
