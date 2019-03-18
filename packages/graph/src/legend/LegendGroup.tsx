import React, { RefObject, forwardRef } from 'react';

import { ColorScale, LegendConfig } from '../common/types';
import { styled } from '../utils/styled-components';

import { Legend } from './Legend';

interface LegendGroupProps {
  color?: ColorScale & { legend?: LegendConfig };
}

const LegendGroupWrapper = styled.div`
  background: #fff;
  position: absolute;
`;

const LeftLegendGroupWrapper = styled(LegendGroupWrapper)`
  top: 0;
  left: 0;
`;

const RightLegendGroupWrapper = styled(LegendGroupWrapper)`
  top: 0;
  right: 0;
`;

const TopLegendGroupWrapper = styled(LegendGroupWrapper)`
  top: 0;
  left: 0;
`;
const BottomLegendGroupWrapper = styled(LegendGroupWrapper)`
  bottom: 0;
  left: 0;
`;

const LEGEND_WRAPPER_MAP = {
  top: TopLegendGroupWrapper,
  right: RightLegendGroupWrapper,
  bottom: BottomLegendGroupWrapper,
  left: LeftLegendGroupWrapper,
};

/**
 * Pass scales(color / shape / size, etc.) props,
 * LegendGroup will return corresponding legend.
 *
 */
export const LegendGroup = forwardRef((
  { color }: LegendGroupProps,
  ref: RefObject<HTMLDivElement>,
) => {
  /**
   * TODO: May support more different scales(shape / size) here
   * to include multiple legends.
   */
  if (!color || (color.legend && color.legend.hide)) {
    return null;
  }
  const { scale, scaleType, field, legend = {} } = color;
  const orient = legend.orient || 'right';
  const isSideLegend = ['left', 'right'].indexOf(orient) !== -1;
  const direction = legend.direction || (isSideLegend ? 'vertical' : 'horizontal');
  const LegendGroupWrapperComponent = LEGEND_WRAPPER_MAP[orient];
  return (
    <LegendGroupWrapperComponent ref={ref} >
      <Legend
        scale={scale}
        scaleType={scaleType}
        title={field}
        render={legend.render}
        direction={direction}
      />
    </LegendGroupWrapperComponent>
  );
});
