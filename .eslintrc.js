module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': "error",
    "vue/no-v-html": "off",
    'max-params': ["error", 3]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
