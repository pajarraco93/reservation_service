const { default: basicConfig} = require('./jest.config'); // eslint-disable-line

export default {
    ... basicConfig,
    collectCoverageFrom: [
        ...basicConfig.collectCoverageFrom,
        '!**/*.ispec.ts',
    ],
    testRegex: '\\.spec.ts$'
};
