import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './src',
});

const patternsToIgnore = [
  '/node_modules/',
  './next',
  '/src/app',
  '/src/interfaces',
  '/src/lib',
  '/src/services/queries',
  '/src/style',
  '/src/types',
];

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: patternsToIgnore,
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: { fetch },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: patternsToIgnore,
  preset: 'ts-jest',
  verbose: true,
};

module.exports = createJestConfig(config);
