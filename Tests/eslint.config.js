import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import {version} from "react"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-case-declarations": "warn",
      camelcase: "warn",
      "react/react-in-jsx-scope": "warn",
    },
  },
  {
    settings: {
      react: {
        version: version,
      }
    }
  }
];
