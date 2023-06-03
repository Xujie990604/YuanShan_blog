/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 即开即用的 eslint rules 合集
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  // 不同场景下的 eslint 规则扩充
  plugins: [],
  // 自定义单个规则
  rules: {
    'no-var': 'error',
    'vue/comment-directive': 'off',
  },
}
