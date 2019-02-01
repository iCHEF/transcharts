import * as React from 'react';
import { Transition, animated } from 'react-spring';

import { styled } from '../utils/styled-components';

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  } | null;
  show: boolean;
  children: React.ReactNode;
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
  transition: all 200ms ease-in;
`;

export const Tooltip: React.SFC<TooltipProps> = ({
  position,
  children,
  show = false,
}) => {
  if (!position) {
    return null;
  }

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
            <TooltipWrapper style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
              {children}
            </TooltipWrapper>
          </animated.div>
        )
      }
    </Transition>
  );
};
