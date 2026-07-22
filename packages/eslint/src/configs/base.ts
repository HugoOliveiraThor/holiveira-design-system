import { a11yConfig } from '../rules/a11y.js';
import { hooksConfig } from '../rules/hooks.js';
import { importsConfig } from '../rules/imports.js';
import { namingConfig } from '../rules/naming.js';
import { reactConfig } from '../rules/react.js';
import { typescriptConfig } from '../rules/typescript.js';
import type { Config } from '../types.js';

export const configBase: Config[] = [
  typescriptConfig,
  importsConfig,
  {
    rules: {
      ...namingConfig.rules,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
];

export const configReact: Config[] = [...configBase, reactConfig, hooksConfig, a11yConfig];
