import * as styledComponents from 'styled-components';

export interface ThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>;

export { styled, css, createGlobalStyle, keyframes };
