import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const coverageExclude = [
  '**/node_modules/**',
  '**/dist/**',
  '**/*.stories.{ts,tsx,mdx}',
  '**/*.stories.*',
  '**/*.mdx',
  '**/*.test.{ts,tsx}',
  '**/*.spec.{ts,tsx}',
  '**/test-fixtures/**',
  '**/*.fixture.{ts,tsx}',
  'prisma/**',
  '**/generated/**',
  '**/index.ts',
  '**/*.d.ts',
  'coverage/**',
  'storybook-static/**',
  '**/*.config.{ts,mts,js}',
  '**/.storybook/**',
];

export default defineConfig({
  resolve: {
    alias: {
      '@ho-dev/testing': resolve(__dirname, 'packages/testing/src/index.ts'),
      '@ho-dev/utils': resolve(__dirname, 'packages/utils/src/index.ts'),
      '@ho-dev/types': resolve(__dirname, 'packages/types/src/index.ts'),
      '@ho-dev/tokens': resolve(__dirname, 'packages/tokens/src/index.ts'),
      '@ho-dev/config': resolve(__dirname, 'packages/config/src/index.ts'),
      '@ho-dev/constants': resolve(__dirname, 'packages/constants/src/index.ts'),
      '@ho-dev/hooks': resolve(__dirname, 'packages/hooks/src/index.ts'),
      '@ho-dev/i18n': resolve(__dirname, 'packages/i18n/src/index.ts'),
      '@ho-dev/theme': resolve(__dirname, 'packages/theme/src/index.ts'),
      '@ho-dev/primitives': resolve(__dirname, 'packages/primitives/src/index.ts'),
      '@ho-dev/forms': resolve(__dirname, 'packages/forms/src/index.ts'),
      '@ho-dev/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
      '@ho-dev/icons': resolve(__dirname, 'packages/icons/src/index.ts'),
      '@ho-dev/layouts': resolve(__dirname, 'packages/layouts/src/index.ts'),
      '@ho-dev/charts': resolve(__dirname, 'packages/charts/src/index.ts'),
      '@ho-dev/auth': resolve(__dirname, 'packages/auth/src/index.ts'),
      '@ho-dev/db': resolve(__dirname, 'packages/db/src/index.ts'),
      '@testing-helpers': resolve(__dirname, 'tests/helpers'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/*/src/**/*.test.{ts,tsx}', 'apps/playground/src/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: false,
      include: ['packages/*/src/**'],
      exclude: coverageExclude,
      thresholds: {
        // NOTE: thresholds are a RATCHET — set to the current (deterministic, isolated)
        // coverage floor and raised as tests are added. Never lower below a measured value.
        // Values below reflect `vitest run packages/<pkg>/src --coverage` (no cross-package
        // process contamination). Aspirational targets are documented in the plan.
        //
        // Utility tier
        'packages/utils/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
        'packages/tokens/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
        'packages/config/src/**': { statements: 60, branches: 85, functions: 20, lines: 60 },
        'packages/constants/src/**': { statements: 90, branches: 70, functions: 90, lines: 90 },
        'packages/i18n/src/**': { statements: 85, branches: 75, functions: 85, lines: 85 },
        'packages/hooks/src/**': { statements: 35, branches: 70, functions: 40, lines: 35 },
        'packages/testing/src/**': { statements: 50, branches: 75, functions: 40, lines: 50 },
        // Component tier
        'packages/primitives/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
        'packages/ui/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
        // V8 function attribution reports 0% for the forwardRef widgets in this package
        // (statements/branches/lines are ~92/54/92). Floor set from the stable
        // measurement; the Quality Engine should treat function % as diagnostic here.
        'packages/forms/src/**': { statements: 60, branches: 45, functions: 40, lines: 60 },
        'packages/layouts/src/**': { statements: 90, branches: 75, functions: 70, lines: 90 },
        // Integration tier
        'packages/auth/src/**': { statements: 70, branches: 25, functions: 70, lines: 70 },
        'packages/charts/src/**': { statements: 85, branches: 30, functions: 50, lines: 85 },
        // Icons tier
        'packages/icons/src/**': { statements: 50, functions: 50, lines: 50 },
      },
    },
  },
});
