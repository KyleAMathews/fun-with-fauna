module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [`react-app`, `plugin:prettier/recommended`],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  plugins: [`prettier`],
  rules: {
    quotes: [`error`, `backtick`],
  },
}
