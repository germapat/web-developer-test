module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  rules: {
    "template-curly-spacing" : "off",
    indent : "off",
    quotes: [2, 'single', { avoidEscape: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
