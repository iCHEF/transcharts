import * as path from 'path';
import { css } from 'styled-components';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const modifyBundlerConfig = (config, dev) => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '@ichef/transcharts-graph': path.resolve(__dirname, 'packages/graph/src'),
    '@ichef/transcharts-chart': path.resolve(__dirname, 'packages/chart/src'),
    '@ichef/transcharts-animation': path.resolve(__dirname, 'packages/animation/src'),
  });
  const customPlugins = dev ? [
    new ForkTSCheckerWebpackPlugin({
      tsconfig: './config/tsconfig.docz.json',
      async: false,
      watch: ['./packages/**/*.{ts,tsx}'],
      tslint: './config/tslint.docz.json'
    }),
  ] : [];
  config.plugins.push(...customPlugins)
  return config;
};

export default {
  title: 'Transchart',
  repository: 'https://github.com/iCHEF/transcharts',
  typescript: true,
  htmlContext: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://codemirror.net/theme/oceanic-next.css'
      }]
    }
  },
  modifyBundlerConfig,
  themeConfig: {
    // See: https://github.com/pedronauck/docz/tree/master/core/docz-theme-default
    mode: 'light',
    codemirrorTheme: 'oceanic-next',
    showPlaygroundEditor: true, // always display the code in <Playground>
    colors: {
      primary: '#ff7049',
      background: '#e3e5e5',
      blue: '#2f98f7',
      sidebarBg: '#e3e5e5',
      codeBg: '#ffffff',
      codeColor: '#ff7049',
      theadColor: '#555e6d',
    },
    styles: {
      playground: css`
        background: #ffffff;
        padding: 1rem;
      `,
    },
  },
};
