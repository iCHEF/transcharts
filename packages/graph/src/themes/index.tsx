import * as React from 'react';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Theme } from '../common/types';

export const themes = {
    default: {
        colors: {
            category: schemeCategory10,
        },
    },
};

const defaultTheme = themes.default;

const { Consumer, Provider } = React.createContext(defaultTheme);

export const ThemeProvider = Provider;
export function withChartTheme<P> (WrappedComponent: React.SFC<P>) {
    const Wrapper =  (props: P) => {
        return <Consumer>
            {(theme: Theme) => <WrappedComponent theme={theme} {...props} /> }
        </Consumer>
    }
    Wrapper.displayName = `withChartTheme(${WrappedComponent.displayName})`;
    return Wrapper;
}
