import React, { useContext } from 'react';

import { ThemeContext } from '../themes';
import { styled } from '../utils/styled-components';
import { HeaderBoxTheme } from '../common/types';

export interface HeaderBoxProps {
  title?: string | JSX.Element;
  desc?: string | JSX.Element;
  align?: string;
}

const Wrapper = styled.div<HeaderBoxTheme & Pick<HeaderBoxProps, 'align'>>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ align, defaultTextAlign }) => align || defaultTextAlign};
`;

const Title = styled.h5<HeaderBoxTheme>`
  font-size: ${({ titleFontSize }) => `${titleFontSize}px`};
  color: ${({ titleColor }) => titleColor};
  margin: 0;
`;

const Description = styled.span<HeaderBoxTheme>`
  font-size: ${({ titleDescFontSize }) => `${titleDescFontSize}px`};
  color: ${({ titleDescColor }) => titleDescColor};
`;

export const HeaderBox = React.forwardRef<
  HTMLDivElement,
  HeaderBoxProps
>(({
  title,
  desc,
  align,
}, ref) => {
  const theme = useContext(ThemeContext);
  const { headerBox: headerBoxTheme } = theme;

  if (!title && !desc) {
    return null;
  }

  return (
    <Wrapper
      ref={ref}
      align={align}
      {...headerBoxTheme}
    >
      {title && (
        <Title {...headerBoxTheme}>
          {title}
        </Title>
      )}
      {desc && (
        <Description {...headerBoxTheme}>
          {desc}
        </Description>
      )}
    </Wrapper>
  );
});
