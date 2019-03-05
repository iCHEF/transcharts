import React from 'react';

import { ColorScale, LegendConfig } from '../common/types';
import { styled } from '../utils/styled-components';

import { Legend } from './Legend';

interface LegendGroupProps {
  color?: ColorScale & { legend?: LegendConfig };
}

const LegendGroupWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
`;

/**
 * Pass scales(color / shape / size, etc.) props,
 * LegendGroup will return corresponding legend.
 *
 */
export const LegendGroup = (props: LegendGroupProps) => {
  /**
   * TODO: May support more different scales(shape / size) here
   * to include multiple legends.
   */
  const { color } = props;
  if (!color || (color.legend && color.legend.hide)) {
    return null;
  }
  const { scale, scaleType, field, legend = {} } = color;
  return (
    <LegendGroupWrapper>
      <Legend
        scale={scale}
        scaleType={scaleType}
        title={field}
        render={legend.render}
      />
    </LegendGroupWrapper>
  );
};
