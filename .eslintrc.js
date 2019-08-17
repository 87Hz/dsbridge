module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:fp/recommended',
    'plugin:ramda/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['fp', 'ramda', 'react'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  rules: {
    indent: 'off',
    'fp/no-nil': 0,
    'fp/no-unused-expression': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
