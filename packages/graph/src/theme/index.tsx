import * as React from 'react';
import { Theme } from '../common/types';


export const themes = {
    default: {},
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
