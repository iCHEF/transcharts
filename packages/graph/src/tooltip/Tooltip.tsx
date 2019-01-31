import * as React from 'react';

import { styled } from '../utils/styled-components';

export interface TooltipProps {
  top: number;
  left: number;
  children: React.ReactNode;
}

const TooltipWrapper = styled.div`
  position: absolute;
  background-color: rgba(239, 235, 235, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  font-size: 1rem;
  white-space: nowrap;
`;

export const Tooltip: React.SFC<TooltipProps> = ({
  top = 0,
  left = 0,
  children,
}) => {
  return (
    <TooltipWrapper style={{ top, left }}>
      {children}
    </TooltipWrapper>
  );
};
