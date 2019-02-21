import * as React from 'react';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Theme } from '../common/types';

interface ThemeProviderProps {
    theme: Theme;
    children: React.ReactNode;
}

export const themes = {
    default: {
        colors: {
            category: schemeCategory10,
        },
    },
};

const defaultTheme = themes.default;

const { Consumer, Provider } = React.createContext(defaultTheme);

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
    return <Provider value={theme}>
        {children}
    </Provider>
};
export function withChartTheme<P> (WrappedComponent: React.SFC<P>) {
    const Wrapper =  (props: P) => {
        return <Consumer>
            {(theme: Theme) => <WrappedComponent theme={theme} {...props} /> }
        </Consumer>
    }
    Wrapper.displayName = `withChartTheme(${WrappedComponent.displayName})`;
    return Wrapper;
}
