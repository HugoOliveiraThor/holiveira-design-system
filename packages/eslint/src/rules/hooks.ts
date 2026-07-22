import reactHooksPlugin from 'eslint-plugin-react-hooks';

import type { Config } from '../types.js';

export const hooksConfig: Config = {
  plugins: {
    'react-hooks': reactHooksPlugin,
  },
  rules: {
    ...reactHooksPlugin.configs.recommended.rules,
  },
};
