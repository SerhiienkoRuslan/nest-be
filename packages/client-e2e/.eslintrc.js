module.exports = {
  extends: ['plugin:cypress/recommended', '../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'jest/no-conditional-expect': 'off',
        'nonblock-statement-body-position': 'off',
        curly: ['error', 'all'],
      },
    },
    {
      files: [
        'packages/client-e2e/**/*.ts',
        'packages/client-e2e/**/*.tsx',
        'packages/client-e2e/**/*.js',
        'packages/client-e2e/**/*.jsx',
      ],
      extends: ['plugin:cypress/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        camelcase: 'off',
        'cypress/no-unnecessary-waiting': 'warn',
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off',
        'testing-library/await-async-query': 'off',
        'testing-library/await-async-utils': 'off',
        'testing-library/prefer-screen-queries': 'off',
        'jest/no-disabled-tests': 'off',
      },
    },
  ],
};
