import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import type { Config } from '../types.js';

export const typescriptConfig: Config = {
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: 'module',
    },
  },
};
