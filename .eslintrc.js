module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: ['ts-mailonline'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname
  },
  root: true
};