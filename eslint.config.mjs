import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import pluginImportHelpers from 'eslint-plugin-import-helpers';
import jestPlugin from 'eslint-plugin-jest';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      'import-helpers': pluginImportHelpers,
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          groups: [
            'type',
            '/^next$/',
            '/^next//',
            '/^react$/',
            '/^next/',
            '/^@tanstack/',
            '/^@chakra-ui/',
            '/^react/',
            'module',
            '/interface/',
            '/config/',
            '/components/Layouts/',
            '/components/Elements/',
            '/components/Modules/',
            '/components/Sections/',
            '/tests/',
            '/utils/',
            '/app/',
            ['parent', 'sibling', 'index'],
            '/public/',
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
    },
    ignores: ['.github', '.husky', '.vscode', '.next', 'node_modules', 'public'],
  },
];

export default eslintConfig;
