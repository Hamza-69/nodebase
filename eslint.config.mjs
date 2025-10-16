import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from '@typescript-eslint/eslint-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Base JS rules
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Style
  '@stylistic/indent': ['error', 2],
  '@stylistic/linebreak-style': ['error', 'unix'],
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/semi': ['error', 'never'],
      // Quality
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
  // Unused variables and parameters (treat both as errors)
  'no-unused-vars': ['error', { args: 'all', caughtErrors: 'all' }],
    },
  },
  // TypeScript/TSX rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // No semicolons in TS as well
  '@stylistic/semi': ['error', 'never'],
  // Prefer the TS-aware unused-vars rule; error on unused params too
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { args: 'all', caughtErrors: 'all' }],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "components/ui/*",
    ],
  },
];

export default eslintConfig;
