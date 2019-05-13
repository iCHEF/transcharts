// import React, { useContext } from 'react';

import React from 'react';
// import { ThemeContext } from '../themes';

import { styled } from '../utils/styled-components';

export interface HeaderBoxProps {
  title?: string | JSX.Element;
  desc?: string | JSX.Element;
}

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.h5`
  font-size: 16px;
  margin: 0.5rem 1rem;
`;

const Description = styled.span`
  font-size: 12px;
`;

export const HeaderBox = React.forwardRef<
  HTMLDivElement,
  HeaderBoxProps
>(({
  title,
  desc,
  children,
}, ref) => {
  // const theme = useContext(ThemeContext);
  if (!title && !desc) {
    return null;
  }

  return (
    <Wrapper ref={ref}>
      {title && (
        <Title>
          {title}
        </Title>
      )}
      {desc && (
        <Description>
          {desc}
        </Description>
      )}
    </Wrapper>
  );
});
