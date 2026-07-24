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
      '@holiveira/testing': resolve(__dirname, 'packages/testing/src/index.ts'),
      '@holiveira/utils': resolve(__dirname, 'packages/utils/src/index.ts'),
      '@holiveira/types': resolve(__dirname, 'packages/types/src/index.ts'),
      '@holiveira/tokens': resolve(__dirname, 'packages/tokens/src/index.ts'),
      '@holiveira/config': resolve(__dirname, 'packages/config/src/index.ts'),
      '@holiveira/constants': resolve(__dirname, 'packages/constants/src/index.ts'),
      '@holiveira/hooks': resolve(__dirname, 'packages/hooks/src/index.ts'),
      '@holiveira/i18n': resolve(__dirname, 'packages/i18n/src/index.ts'),
      '@holiveira/theme': resolve(__dirname, 'packages/theme/src/index.ts'),
      '@holiveira/primitives': resolve(__dirname, 'packages/primitives/src/index.ts'),
      '@holiveira/forms': resolve(__dirname, 'packages/forms/src/index.ts'),
      '@holiveira/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
      '@holiveira/icons': resolve(__dirname, 'packages/icons/src/index.ts'),
      '@holiveira/layouts': resolve(__dirname, 'packages/layouts/src/index.ts'),
      '@holiveira/charts': resolve(__dirname, 'packages/charts/src/index.ts'),
      '@holiveira/auth': resolve(__dirname, 'packages/auth/src/index.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.stories.*'],
    passWithNoTests: true,
  },
  coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov'],
    include: ['packages/*/src/**'],
    exclude: coverageExclude,
    thresholds: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
});
