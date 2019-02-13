import React, { FunctionComponent } from 'react';

export interface AnimatedClipRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const AnimatedClipRect: FunctionComponent<AnimatedClipRectProps> = ({
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  ...restProps
}) => {
  return (
    <rect x={x} y={y} width={width} height={height} {...restProps} />
  );
};
