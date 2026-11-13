import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { buildSnapshot } from './lib/token-surface';
import { createTokenFixture, defaultSurface } from './lib/test-fixtures/token-root';

const CLI = join(process.cwd(), 'scripts', 'check-tokens-compat.ts');

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

const TWO_TOKENS = {
  css: { '--color-primary': '#5750f1', '--color-stroke': '#e6ebf1' },
  ts: { 'colors.primary': '#5750f1', 'colors.stroke': '#e6ebf1' },
};

describe('check-tokens-compat CLI', () => {
  it('exits 0 when the fixture surface matches', () => {
    const fixture = createTokenFixture();
    const result = runCli(['--root', fixture.root]);
    expect(result.status).toBe(0);
    expect(result.output).toContain('token surface compatible');
    expect(result.output).toContain('1 css variables');
  });

  it('exits 1 when a fixture token is removed', () => {
    const fixture = createTokenFixture({
      snapshot: buildSnapshot(TWO_TOKENS, { version: '0.2.0', generatedAt: '2026-11-13' }),
    });
    const result = runCli(['--root', fixture.root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('removed (css):');
    expect(result.output).toContain('new ADS');
  });

  it('records every declared @theme name in the committed snapshot', () => {
    const css = readFileSync(
      join(process.cwd(), 'packages', 'tokens', 'src', 'tokens.css'),
      'utf8',
    );
    const declared = [...css.matchAll(/^\s*(--[^:]+):/gm)].map((match) => match[1].trim());
    const snapshot = JSON.parse(
      readFileSync(join(process.cwd(), 'packages', 'tokens', 'tokens.snapshot.json'), 'utf8'),
    ) as { css: Record<string, string> };
    expect(declared.length).toBeGreaterThan(200);
    expect(Object.keys(snapshot.css).sort()).toEqual(declared.sort());
    expect(snapshot.css['--container-2_5']).toBe('0.625rem');
    expect(snapshot.css['--aspect-4\\/3']).toBe('4 / 3');
  });

  it('exits 0 on the committed repository surface', () => {
    const result = runCli([]);
    expect(result.status).toBe(0);
    expect(result.output).toContain('token surface compatible');
  });

  it('exits 2 when the snapshot is malformed', () => {
    const fixture = createTokenFixture({ snapshot: '{ "format": 1 }' });
    const result = runCli(['--root', fixture.root]);
    expect(result.status).toBe(2);
    expect(result.output).toContain('malformed');
  });
});
