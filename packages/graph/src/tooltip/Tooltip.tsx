import * as React from 'react';
import { Transition, animated } from 'react-spring';

import { styled } from '../utils/styled-components';

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  };
  show: boolean;
  children: React.ReactNode;
  graphWidth: number;
  graphHeight: number;
}

const TooltipWrapper = styled.div`
  position: absolute;
  background-color: rgba(239, 235, 235, 0.8);
  padding: 0.5rem 1.2rem;
  border-radius: 1.2rem;
  font-size: 1rem;
  white-space: nowrap;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: all 500ms linear;
`;

/**
 * Returns the position and transform
 * which limit the tooltip within the bound of the graph
 */
function getTooltipPosition(
  graphWidth: TooltipProps['graphWidth'],
  graphHeight: TooltipProps['graphHeight'],
  position: TooltipProps['position'],
) {
  const percentX = Math.round(-100 * (position.x / graphWidth));
  const percentY = Math.round(-100 * (position.y / graphHeight));
  return {
    top: `${position.y}px`,
    left: `${position.x}px`,
    transform: `translate(${percentX}%, ${percentY}%)`,
  };
}

export const Tooltip: React.SFC<TooltipProps> = ({
  position,
  children,
  show = false,
  graphWidth,
  graphHeight,
}) => {
  if (!position) {
    return null;
  }

  const tooltipStyle = getTooltipPosition(graphWidth, graphHeight, position);

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
