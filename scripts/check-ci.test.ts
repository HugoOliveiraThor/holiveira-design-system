import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

interface PackageJson {
  scripts: Record<string, string>;
}

function scripts(path: string): Record<string, string> {
  return (JSON.parse(readFileSync(join(ROOT, path), 'utf8')) as PackageJson).scripts;
}

const root = scripts('package.json');
const docs = scripts(join('apps', 'docs', 'package.json'));

const PARITY_STEPS = [
  'pnpm run ensure:browser',
  'pnpm run all-checks',
  'pnpm run check:clean',
  'pnpm run check:docs:export',
  'pnpm run test:docs:built',
  'pnpm run check:artifact',
];

/** Frozen: CI runs exactly this, so a new step here is a pipeline change. */
const ALL_CHECKS =
  'pnpm run format:check && pnpm run lint && pnpm run check:tokens && pnpm run db:generate && turbo run typecheck && turbo run build && turbo run build:storybook && pnpm run test:visual && pnpm --filter playground run test:visual && pnpm run test:coverage && pnpm run check:size && pnpm run check:publish && pnpm run check:install && pnpm run check:license && pnpm run check:exports && pnpm run check:deps && pnpm run check:docs && pnpm run check:docs:metadata && pnpm run check:docs:readme && pnpm run check:gates';

describe('check:ci', () => {
  it('runs the full parity set', () => {
    expect(root['check:ci'].split(' && ')).toEqual(PARITY_STEPS);
    for (const step of PARITY_STEPS.filter((entry) => entry.startsWith('pnpm run '))) {
      const name = step.replace('pnpm run ', '');
      expect(root[name], name).toBeTypeOf('string');
    }
    expect(root['check:docs:export']).toBe('pnpm --filter @ho-dev/docs run check:export');
    expect(root['test:docs:built']).toBe('pnpm --filter @ho-dev/docs run test:e2e:built');
    expect(root['check:artifact']).toBe('pnpm exec tsx scripts/check-artifact.ts');
    expect(root['check:clean']).toBe('pnpm exec tsx scripts/check-clean.ts');
  });

  it('keeps all-checks unchanged', () => {
    expect(root['all-checks']).toBe(ALL_CHECKS);
  });

  it('keeps the self-contained portal e2e', () => {
    expect(docs['test:e2e']).toBe('next build && playwright test');
    expect(docs['test:e2e:built']).toBe('node scripts/require-export.mjs && playwright test');
    expect(docs['check:export']).toBe('tsx scripts/check-export.ts');
  });
});
