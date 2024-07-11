const prettierConfig = require('../../.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  ignorePatterns: ['!**/*', '.next/**/*'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'standard',
    'plugin:prettier/recommended',
    'plugin:@nx/react-typescript',
    'next',
    'next/core-web-vitals',
    '../../.eslintrc.js',
  ],
  globals: {
    VERSION: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@babel', 'jest', 'react-hooks', 'prettier'],
  rules: {
    camelcase: 'off',
    curly: 'error',
    'linebreak-style': ['error', 'unix'],
    'newline-before-return': 'error',
    'no-else-return': 'error',
    'no-param-reassign': 'error',
    'nonblock-statement-body-position': ['error', 'below'],
    'object-shorthand': 'error',
    'prefer-destructuring': 'error',
    'prettier/prettier': ['error', prettierConfig],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/hook-use-state': 'error',
    'react/jsx-filename-extension': [
      0,
      {
        allow: 'as-needed',
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/no-array-index-key': 'error',
    'react/prop-types': 1, // warn
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react/display-name': 0,
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // lint settings for typescript files only
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jest-dom'],
      rules: {
        '@next/next/no-html-link-for-pages': ['error', 'packages/client/pages'],
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'interface', format: ['PascalCase'] },
          { selector: 'typeLike', format: ['PascalCase'] },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 0, // TODO: 'error'
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        '@typescript-eslint/no-unused-vars': 'error',
        'prefer-regex-literals': 0,
        '@typescript-eslint/no-use-before-define': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 0, // off
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
