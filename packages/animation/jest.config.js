const baseConfig = require('../../config/jest.config.base');
const package = require('./package');

module.exports = {
  ...baseConfig,
  displayName: package.name,
  name: package.name,
};
