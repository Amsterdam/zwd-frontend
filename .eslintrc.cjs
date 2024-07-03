module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "block-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "import/no-anonymous-default-export": "off",
    "no-multiple-empty-lines": ["error"],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "space-unary-ops": ["error"],
    "space-infix-ops": ["error"],
    "semi": ["error", "never"],
    "indent": ["error", 2],
    "template-curly-spacing": ["error", "always"],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: "none",
        requireLast: true
      },
      singleline: {
        delimiter: "comma",
        requireLast: false
      }
    }],
    "@typescript-eslint/type-annotation-spacing": ["error", {
      before: false,
      after: true,
      overrides: { arrow: { before: true, after: true } }
    }]
  },
}
