import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { buildSnapshot } from './lib/token-surface';
import { createTokenFixture } from './lib/test-fixtures/token-root';

const CLI = join(process.cwd(), 'scripts', 'update-tokens-snapshot.ts');

const TWO_TOKENS = {
  css: { '--color-primary': '#5750f1', '--color-stroke': '#e6ebf1' },
  ts: { 'colors.primary': '#5750f1', 'colors.stroke': '#e6ebf1' },
};

const ADDITIVE_CSS = `@theme {
  --color-primary: #5750f1;
  --color-brand: #000000;
}
`;

const ADDITIVE_INDEX = `export const colors = { primary: '#5750f1', brand: '#000000' } as const;
`;

function runCli(args: string[]): { status: number; output: string } {
  try {
    const stdout = execFileSync('pnpm', ['exec', 'tsx', CLI, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { status: 0, output: stdout };
  } catch (error) {
    const failure = error as { status?: number; stdout?: string; stderr?: string };
    return {
      status: failure.status ?? 1,
      output: `${failure.stdout ?? ''}${failure.stderr ?? ''}`,
    };
  }
}

describe('update-tokens-snapshot CLI', () => {
  it('aborts a removal without approval', () => {
    const fixture = createTokenFixture({
      version: '0.3.0',
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const before = fixture.readSnapshotRaw();
    const result = runCli(['--root', fixture.root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('without an approval');
    expect(fixture.readSnapshotRaw()).toBe(before);
  });

  it('writes the additive snapshot after a patch bump', () => {
    const fixture = createTokenFixture({
      version: '0.2.1',
      css: ADDITIVE_CSS,
      index: ADDITIVE_INDEX,
    });
    const result = runCli(['--root', fixture.root]);
    expect(result.status).toBe(0);
    expect(result.output).toContain('snapshot recorded at 0.2.1');
    const written = JSON.parse(fixture.readSnapshotRaw() ?? '{}') as {
      version: string;
      approval: string | null;
      css: Record<string, string>;
    };
    expect(written.version).toBe('0.2.1');
    expect(written.approval).toBeNull();
    expect(written.css['--color-brand']).toBe('#000000');
  });

  it('records the approval, version and date on a rewrite', () => {
    const fixture = createTokenFixture({
      version: '0.3.0',
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const result = runCli(['--root', fixture.root, '--approval', 'ads-012']);
    expect(result.status).toBe(0);
    expect(result.output).toContain('approval: ads-012');
    const written = JSON.parse(fixture.readSnapshotRaw() ?? '{}') as {
      version: string;
      approval: string | null;
      generatedAt: string;
    };
    expect(written.version).toBe('0.3.0');
    expect(written.approval).toBe('ads-012');
    expect(written.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
