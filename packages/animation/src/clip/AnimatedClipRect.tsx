import React, { FunctionComponent, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import shortid from 'shortid';

export interface AnimatedClipRectProps {
  type: 'slideRight' | 'slideLeft' | 'slideUp'| 'slideDown';
  width: number;
  height: number;

  /** Delay before the animation starts (ms) */
  delay: number;
  duration: number;
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
) {
  const results = {
    delay,
    config: {
      duration,
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
  children,
  ...restProps
}) => {
  const [clipId] = useState(`clipRect-${shortid.generate()}`);
  const springProps = useSpring(getSpringFromTo(
    type,
    width,
    height,
    delay,
    duration,
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
