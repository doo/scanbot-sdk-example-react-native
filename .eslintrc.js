module.exports = {
  extends: ['@doo/eslint-config/react'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
};
