import reactPlugin from 'eslint-plugin-react';

import type { Config } from '../types.js';

export const reactConfig: Config = {
  plugins: {
    react: reactPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
