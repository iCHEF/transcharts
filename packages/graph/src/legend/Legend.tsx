import React, { FunctionComponent } from 'react';
import { LegendLinear, LegendOrdinal } from '@vx/legend';

import { styled } from '../utils/styled-components';

const SCALE_TYPE_TO_LEGEND = {
  ordinal: LegendOrdinal,
  sequential: LegendLinear,
}

const LegendWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
`

export interface LegendProps {
  scaleType: string;
  scale: (val: any) => string;
  title: string;
}

export const Legend: FunctionComponent<LegendProps> = ({
  children,
  scaleType,
  scale,
  title,
}) => {
  const LegendComponent = SCALE_TYPE_TO_LEGEND[scaleType];
  return (
    <LegendWrapper className="legend">
      <div className="title">{title}</div>
      <LegendComponent scale={scale} children={children} />
    </LegendWrapper>
  )
}
