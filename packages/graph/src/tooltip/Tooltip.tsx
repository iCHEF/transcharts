import React from 'react';
import { Transition, animated } from 'react-spring';

import { styled } from '../utils/styled-components';
import { Margin } from '../common/types';

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  };
  show: boolean;
  children: React.ReactNode;
  graphWidth: number;
  graphHeight: number;
  graphMargin: Margin;
}

const TooltipWrapper = styled.div`
  position: absolute;
  min-width: 3rem;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
  font-size: 1rem;
  white-space: nowrap;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: all 500ms linear;
  box-shadow: 0px 2px 8px 3px rgba(120,120,120,0.3);

  h3 {
    color: #7c8a94;
    margin: 0.25rem 0;
    font-size: 1.1rem;
  }
`;

/**
 * Returns the position and transform
 * which limit the tooltip within the bound of the graph
 */
function getTooltipPosition(
  graphWidth: TooltipProps['graphWidth'],
  graphHeight: TooltipProps['graphHeight'],
  graphMargin: Margin,
  position: TooltipProps['position'],
) {
  const onRightHalf = (position.x / graphWidth) > 0.5;
  const percentX = onRightHalf ? -100 : 0;
  const percentY = Math.round(-100 * (position.y / graphHeight));
  const leftOffset = onRightHalf ? -20 : 20;
  return {
    top: `${graphMargin.top + position.y}px`,
    left: `${graphMargin.left + position.x + leftOffset}px`,
    transform: `translate(${percentX}%, ${percentY}%)`,
  };
}

export const Tooltip: React.SFC<TooltipProps> = ({
  position,
  children,
  show = false,
  graphWidth,
  graphHeight,
  graphMargin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}) => {
  if (!position) {
    return null;
  }

  const tooltipStyle = getTooltipPosition(graphWidth, graphHeight, graphMargin, position);

  return (
    // use Transition to control the mounting/unmounting of Tooltip
    <Transition
      items={show}
      unique
      native
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {showing =>
        showing && (props =>
          <animated.div style={{ ...props, transition: 'opacity 0.1s ease-out' }}>
            <TooltipWrapper style={tooltipStyle}>
              {children}
            </TooltipWrapper>
          </animated.div>
        )
      }
    </Transition>
  );
};
