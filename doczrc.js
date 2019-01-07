import * as path from 'path';

const modifyBundlerConfig = config => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    '@ichef/transcharts-graph': path.resolve(__dirname, 'packages/graph/src'),
  });
  return config;
};

export default {
  title: 'transchart',
  typescript: true,
  modifyBundlerConfig,
};
