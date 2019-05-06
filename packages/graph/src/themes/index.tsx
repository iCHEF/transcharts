import * as React from 'react';
import { schemeCategory10, interpolateCool, schemeBlues } from 'd3-scale-chromatic';
import deepmerge from 'deepmerge';

import { Theme } from '../common/types';

const COLORS = {
  GRAY: '#7c8a94',
};

interface ThemeProviderProps {
  /** theme prop can be partial of Theme type */
  theme: Partial<Theme>;
  children: React.ReactNode;
}

export const themes = {
  default: {
    colors: {
      category: schemeCategory10,
      sequential: {
        scheme: schemeBlues,
        interpolator: interpolateCool,
      },
    },
    xAxis: {
      labelFontSize: 15,
      labelColor: COLORS.GRAY,
      labelTextAnchor: 'middle',
      strokeColor: COLORS.GRAY,
      tickStrokeColor: COLORS.GRAY,
      strokeWidth: 1.5,
      tickFontSize: 13,
    },
    yAxis: {
      labelFontSize: 15,
      labelColor: COLORS.GRAY,
      labelTextAnchor: 'middle',
      strokeColor: COLORS.GRAY,
      tickStrokeColor: COLORS.GRAY,
      strokeWidth: 1.5,
      tickFontSize: 13,
    },
  },
};

const defaultTheme = themes.default;

export const ThemeContext = React.createContext(defaultTheme);

const { Provider } = ThemeContext;
function mergeTheme(theme: Theme, partialTheme: Partial<Theme>): Theme {
  // see https://github.com/TehShrike/deepmerge
  return deepmerge(
    theme,
    partialTheme,
    { arrayMerge: (dest, source) => source },
  );
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const resultTheme = mergeTheme(defaultTheme, theme);
  return (
    <Provider value={resultTheme}>
      {children}
    </Provider>
  );
};
