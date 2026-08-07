import { configBase, configReact } from '@ho-dev/eslint';

const withFiles = (preset, files) => preset.map((c) => ({ ...c, files }));

const eslintConfig = [
  {
    ignores: ['**/dist/**', '**/storybook-static/**', '**/.next/**', '**/generated/**'],
  },
  ...withFiles(configReact, [
    '**/*.tsx',
    'apps/storybook/**/*.ts',
    'apps/storybook/**/*.mts',
    'apps/storybook/**/*.cts',
  ]),
  ...withFiles(configBase, ['packages/**/*.ts', 'packages/**/*.mts', 'packages/**/*.cts']),
];

export default eslintConfig;
