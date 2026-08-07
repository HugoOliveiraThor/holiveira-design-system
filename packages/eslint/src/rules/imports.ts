import importPlugin from 'eslint-plugin-import';

import type { Config } from '../types.js';

export const importsConfig: Config = {
  plugins: {
    import: importPlugin,
  },
  rules: {
    'import/no-anonymous-default-export': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [{ pattern: '@ho-dev/**', group: 'external', position: 'before' }],
        pathGroupsExcludedImportTypes: ['@ho-dev'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
