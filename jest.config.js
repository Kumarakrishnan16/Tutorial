module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  globals: {
    ngJest: {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
};
