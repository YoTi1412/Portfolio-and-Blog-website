const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended.js");

module.exports = {
  globals: globals.browser,
  overrides: [
    {
      files: ["*.js"],
      processor: "@eslint/js",
      rules: pluginJs.configs.recommended.rules,
    },
    {
      files: ["*.jsx"],
      extends: ["plugin:react/recommended"],
      rules: pluginReactConfig.rules,
    },
  ],
};
