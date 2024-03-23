module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    requireConfigFile: false,
  },
  globals: {
    globalThis: false,
  },
  extends: ['eslint-config-prettier', 'prettier'],
  plugins: ['prettier'],
};
