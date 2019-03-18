import * as React from 'react';
import { schemeCategory10, interpolateBlues, schemeBlues } from 'd3-scale-chromatic';
import deepmerge from 'deepmerge';

import { Theme } from '../common/types';

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
        interpolator: interpolateBlues,
      },
    },
    xAxis: {
      strokeColor: '#7c8a94',
      tickStrokeColor: '#7c8a94',
      strokeWidth: 1.5,
      tickFontSize: 13,
    },
    yAxis: {
      strokeColor: '#7c8a94',
      tickStrokeColor: '#7c8a94',
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
