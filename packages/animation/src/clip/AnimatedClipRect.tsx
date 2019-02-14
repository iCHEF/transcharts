import React, { FunctionComponent, useState } from 'react';
import shortid from 'shortid';

export interface AnimatedClipRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
}

export const AnimatedClipRect: FunctionComponent<AnimatedClipRectProps> = ({
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  children,
  ...restProps
}) => {
  const [clipId] = useState(`clip-${shortid.generate()}`);

  return (
    <>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={width} height={height} {...restProps} />
      </clipPath>
      <g clip-path={`url(#${clipId})`}>
        {children}
      </g>
    </>
  );
};
