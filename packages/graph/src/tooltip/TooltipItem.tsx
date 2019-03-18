import * as React from 'react';

import { styled } from '../utils/styled-components';

export interface TooltipItemProps {
  color: string;
  text: string;
}

const ItemWrapper = styled.div`
  margin: 0.25rem 0;

  &:before {
    content: '';
    width: 0.35rem;
    height: 0.35rem;
    background-color: ${({ color }) => color};
    float: left;
    margin: 0.5rem 0.8rem 0 0.2rem;
    border-radius: 50%;
  }
`;

export const TooltipItem: React.SFC<TooltipItemProps> = ({
  color = 'gray',
  text,
}) => {
  return (
    <ItemWrapper color={color}>
      {text}
    </ItemWrapper>
  );
};
