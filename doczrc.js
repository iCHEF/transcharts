import * as path from 'path';

const modifyBundlerConfig = config => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '@ichef/transcharts-graph': path.resolve(__dirname, 'packages/graph/src'),
  });
  return config;
};

export default {
  title: 'Transchart',
  typescript: true,
  modifyBundlerConfig,
  themeConfig: {
    mode: 'light',
    colors: {
      primary: '#ff7049',
      background: '#e3e5e5',
      sidebarBg: '#eff0f0',
    },
    styles: {
      playground: {
        background: '#ffffff',
      },
    },
  },
};
