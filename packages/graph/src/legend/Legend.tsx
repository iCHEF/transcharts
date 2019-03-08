import React from 'react';
import { LegendLinear, LegendOrdinal } from '@vx/legend';

import { LegendConfig } from '../common/types';

const SCALE_TYPE_TO_LEGEND = {
  ordinal: LegendOrdinal,
  sequential: LegendLinear,
};

export interface LegendProps {
  direction?: LegendConfig['direction'];
  scaleType: string;
  scale: (val: any) => string;
  title: string;
  render?: (labels: ReadonlyArray<object>) => React.ReactNode;
}

const defaultProps = {
  direction: 'horizontal',
};

export const Legend = ({
  direction,
  render,
  scaleType,
  scale,
  title,
}: LegendProps) => {
  const LegendComponent = SCALE_TYPE_TO_LEGEND[scaleType];
  const vxDirection = direction === 'horizontal' ? 'column' : 'row';
  return (
    <div>
      <div>{title}</div>
      <LegendComponent scale={scale} direction={vxDirection}>
        {render}
      </LegendComponent>
    </div>
  );
};

Legend.defaultProps = defaultProps;
