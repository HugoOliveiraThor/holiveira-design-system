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
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.*'],
  },
  coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov'],
    include: ['packages/*/src/**'],
    exclude: coverageExclude,
    thresholds: {
      // Utility tier (90%)
      'packages/utils/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/tokens/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/config/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/constants/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/i18n/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/hooks/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      'packages/testing/src/**': { statements: 90, branches: 85, functions: 90, lines: 90 },
      // Component tier (80%)
      'packages/primitives/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
      'packages/ui/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
      'packages/forms/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
      'packages/layouts/src/**': { statements: 80, branches: 70, functions: 80, lines: 80 },
      // Integration tier (60%)
      'packages/auth/src/**': { statements: 60, branches: 50, functions: 60, lines: 60 },
      'packages/charts/src/**': { statements: 60, branches: 50, functions: 60, lines: 60 },
      // Icons tier (50%)
      'packages/icons/src/**': { statements: 50, functions: 50, lines: 50 },
    },
  },
});
