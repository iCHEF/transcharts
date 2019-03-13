module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/config/tsconfig.base.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  rootDir: '../',
};
