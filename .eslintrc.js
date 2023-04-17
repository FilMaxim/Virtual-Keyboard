export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  ignores: ["**/*.config.js"],
  files: ["src/**/*.js"],
  rules: {
    semi: "error",
    "prefer-const": "error",
  },  
};
