import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const WORKFLOW = readFileSync(join(ROOT, '.github', 'workflows', 'ci.yml'), 'utf8');

/** The YAML block of one job, from its header to the next job header. */
function jobBlock(name: string): string {
  const header = new RegExp(`^  ${name}:$`, 'm').exec(WORKFLOW);
  if (header === null) throw new Error(`job ${name} is missing from ci.yml`);
  const bodyStart = header.index + header[0].length;
  const next = /^  [a-z-]+:$/m.exec(WORKFLOW.slice(bodyStart));
  const end = next === null ? WORKFLOW.length : bodyStart + next.index;
  return WORKFLOW.slice(header.index, end);
}

function positions(haystack: string, needles: string[]): number[] {
  return needles.map((needle) => haystack.indexOf(needle));
}

/** Frozen: the site checks must not change the all-checks pipeline. */
const ALL_CHECKS =
  'pnpm run format:check && pnpm run lint && pnpm run check:tokens && pnpm run db:generate && turbo run typecheck && turbo run build && turbo run build:storybook && pnpm run test:visual && pnpm --filter playground run test:visual && pnpm run test:coverage && pnpm run check:size && pnpm run check:publish && pnpm run check:install && pnpm run check:license && pnpm run check:exports && pnpm run check:deps && pnpm run check:docs && pnpm run check:docs:metadata && pnpm run check:docs:readme && pnpm run check:gates';

describe('CI workflow', () => {
  it('runs the site checks in a job named site-checks', () => {
    const job = jobBlock('site-checks');

    expect(job).toContain('runs-on: ubuntu-latest');
    expect(job).toContain('timeout-minutes: 15');
    expect(job).toContain(
      'pnpm --filter @ho-dev/docs exec playwright install --with-deps chromium',
    );
  });

  it('runs the site checks without depending on all-checks', () => {
    const job = jobBlock('site-checks');

    expect(job).not.toMatch(/^\s+needs:/m);
    expect(job).not.toContain('pnpm run all-checks');
  });

  it('builds the four outputs and runs the site checks', () => {
    const job = jobBlock('site-checks');
    const steps = [
      'pnpm install --frozen-lockfile',
      'pnpm run build',
      'pnpm run build:storybook',
      'pnpm run check:docs:export',
      'pnpm run test:docs:built',
      'pnpm run check:artifact',
    ];
    const offsets = positions(job, steps);

    expect(job).toContain('node-version-file: .nvmrc');
    expect(job).toContain('cache: pnpm');
    expect(job).toContain('DATABASE_URL: ${{ secrets.DATABASE_URL }}');
    expect(offsets.every((offset) => offset > -1)).toBe(true);
    expect([...offsets].sort((left, right) => left - right)).toEqual(offsets);
  });

  it('keeps all-checks unchanged', () => {
    const job = jobBlock('all-checks');
    const packageJson = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };

    expect(job).toContain('timeout-minutes: 20');
    expect(job).toContain('run: pnpm run all-checks');
    expect(job).not.toContain('check:docs:export');
    expect(job).not.toContain('check:artifact');
    expect(WORKFLOW.match(/run: pnpm run all-checks/g)).toHaveLength(1);
    expect(packageJson.scripts['all-checks']).toBe(ALL_CHECKS);
  });
});
