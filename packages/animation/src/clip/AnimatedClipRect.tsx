import React, { FunctionComponent, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import shortid from 'shortid';

import { getD3EaseFunc } from '../utils/getD3EaseFunc';

export interface AnimatedClipRectProps {
  type: 'slideRight' | 'slideLeft' | 'slideUp'| 'slideDown';
  width: number;
  height: number;

  /** Delay before the animation starts (ms) */
  delay: number;

  /** Duration of the animation (ms) */
  duration: number;

  /** Name of the easing function which belongs to `d3-ease` */
  easing?: string;

  children: React.ReactNode;
}

/**
 * Returns the animated properties for the rectangle clip path
 */
function getSpringFromTo(
  type: AnimatedClipRectProps['type'],
  width: AnimatedClipRectProps['width'],
  height: AnimatedClipRectProps['height'],
  delay: AnimatedClipRectProps['delay'],
  duration: AnimatedClipRectProps['duration'],
  easing: AnimatedClipRectProps['easing'],
) {
  const results = {
    delay,
    config: {
      duration,
      easing: getD3EaseFunc(easing),
    },
    to: {
      width,
      height,
      left: 0,
      top: 0,
    },
  };

  switch (type) {
    case 'slideLeft': {
      return {
        ...results,
        from: {
          height,
          width: 0,
          left: width,
          top: 0,
        },
      };
    }
    case 'slideUp': {
      return {
        ...results,
        from: {
          width,
          height: 0,
          left: 0,
          top: height,
        },
      };
    }
    case 'slideDown': {
      return {
        ...results,
        from: {
          width,
          height: 0,
          left: 0,
          top: 0,
        },
      };
    }
    case 'slideRight':
    default: {
      return {
        ...results,
        from: {
          height,
          width: 0,
          left: 0,
          top: 0,
        },
      };
    }
  }
}

export const AnimatedClipRect: FunctionComponent<AnimatedClipRectProps> = ({
  type = 'slideRight',
  width = 1,
  height = 1,
  duration = 500,
  delay = 0,
  easing,
  children,
  ...restProps
}) => {
  const { current: clipId } = useRef(`clipRect-${shortid.generate()}`);
  const springProps = useSpring(getSpringFromTo(
    type,
    width,
    height,
    delay,
    duration,
    easing,
  ));
  const { left, top, width: springWidth, height: springHeight } = springProps;

  return (
    <>
      <clipPath id={clipId}>
        <animated.rect
          x={left}
          y={top}
          width={springWidth}
          height={springHeight}
          {...restProps}
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {children}
      </g>
    </>
  );
};
