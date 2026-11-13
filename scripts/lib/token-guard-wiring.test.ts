import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(join(ROOT, path), 'utf8')) as T;
}

function script(name: string): string {
  const manifest = readJson<{ scripts: Record<string, string> }>('package.json');
  return manifest.scripts[name] ?? '';
}

describe('token guard wiring', () => {
  it('chains the generated-module check and the compatibility check', () => {
    const command = script('check:tokens');
    const generated = command.indexOf('scripts/generate-tokens.ts --check');
    const compat = command.indexOf('scripts/check-tokens-compat.ts');
    expect(generated).toBeGreaterThanOrEqual(0);
    expect(compat).toBeGreaterThan(generated);
    expect(command).toContain('&&');
  });

  it('keeps check:tokens in all-checks', () => {
    const steps = script('all-checks')
      .split('&&')
      .map((step) => step.trim().replace(/^pnpm run /, ''));
    expect(steps).toContain('check:tokens');
  });

  it('names the snapshot command generate:tokens:snapshot', () => {
    expect(script('generate:tokens:snapshot')).toBe(
      'pnpm exec tsx scripts/update-tokens-snapshot.ts',
    );
  });

  it('documents classification, bump rules, approval and commands', () => {
    const contract = readFileSync(
      join(ROOT, 'docs', 'architecture', 'contracts', 'tokens.md'),
      'utf8',
    );
    expect(contract).toContain('## Compatibility');
    expect(contract).toContain('`added`');
    expect(contract).toContain('`removed`');
    expect(contract).toContain('`value-changed`');
    expect(contract).toContain('new ADS');
    expect(contract).toContain('minor bump');
    expect(contract).toContain('major bump');
    expect(contract).toContain('--approval ads-NNN');
    expect(contract).toContain('pnpm run check:tokens');
    expect(contract).toContain('pnpm run generate:tokens:snapshot');
  });
});
