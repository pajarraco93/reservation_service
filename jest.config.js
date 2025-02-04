/** @type {import('ts-jest').JestConfigWithTsJest} **/
import { pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.json' with { type: "json" };

export default {
  testEnvironment: "node",
  maxWorkers: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/domain/**/model.ts',
    '!**/*.ispec.data.ts',
    '!**/*spec.ts',
    '!**/*ispec.ts',
    '!**/typeorm/migrations/**',
    '!**/typeorm/entity.ts',
    '!<rootDir>/shared/infra/shared/env.ts',
    '!**/__mock__/**'
  ],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/main.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testRegex: ['\\.spec.ts$', '\\.ispec.ts$']
};
