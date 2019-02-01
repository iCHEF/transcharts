import * as React from 'react';

import { styled } from '../utils/styled-components';

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  } | null;
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
  transition: all 150ms ease-in;
`;

export const Tooltip: React.SFC<TooltipProps> = ({
  position,
  children,
}) => {
  if (!position) {
    return null;
  }

  return (
    <TooltipWrapper style={{ transform: `translate(${position.x}px, ${position.y}px)`  }}>
      {children}
    </TooltipWrapper>
  );
};
