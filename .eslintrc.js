module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "react-hooks"
  ],
  ignorePatterns: ["dist"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
    indent: ["error", 2],
    "semi": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
