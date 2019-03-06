module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
