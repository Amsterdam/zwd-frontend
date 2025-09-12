import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { settings: { react: { version: "detect" } } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  globalIgnores(["dist", "**/__generated__"]),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "arrow-body-style": ["error", "as-needed"],
      "block-spacing": ["error", "always"],
      "comma-dangle": "off",
      "import/no-anonymous-default-export": "off",
      "no-multiple-empty-lines": ["error"],
      "object-curly-spacing": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }],
      "space-unary-ops": ["error"],
      "space-infix-ops": ["error"],
      "semi": ["error", "never"],
      "indent": ["error", 2, { "SwitchCase": 1 }]
    }
  }
])