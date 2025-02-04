/** @type {import('ts-jest').JestConfigWithTsJest} **/

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
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testRegex: ['\\.spec.ts$', '\\.ispec.ts$']
};