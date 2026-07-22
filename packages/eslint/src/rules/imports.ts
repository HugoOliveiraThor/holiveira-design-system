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
        pathGroups: [{ pattern: '@holiveira/**', group: 'external', position: 'before' }],
        pathGroupsExcludedImportTypes: ['@holiveira'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
