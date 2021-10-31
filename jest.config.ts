import type { Config } from '@jest/types';
const { defaults } = require('jest-config');

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/test/**', '!**/node_modules/**'],
  testEnvironment: 'jsdom',
};
export default config;