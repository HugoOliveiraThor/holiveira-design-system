import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
  },
  coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov'],
    include: ['packages/*/src/**'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    thresholds: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
});
