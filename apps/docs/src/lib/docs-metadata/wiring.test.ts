import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

function scripts(): Record<string, string> {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>;
  };
  return manifest.scripts;
}

describe('docs metadata wiring', () => {
  it('keeps check:docs:metadata in all-checks', () => {
    const steps = scripts()
      ['all-checks'].split('&&')
      .map((step) => step.trim().replace(/^pnpm run /, ''));
    expect(steps).toContain('check:docs:metadata');
    expect(steps.indexOf('check:docs:metadata')).toBeGreaterThan(steps.indexOf('check:docs'));
  });

  it('names the write command generate:docs:metadata', () => {
    expect(scripts()['generate:docs:metadata']).toBe(
      'pnpm exec tsx apps/docs/scripts/generate-docs-metadata.ts',
    );
  });

  it('documents the three artifacts in the README', () => {
    const readme = readFileSync(join(ROOT, 'apps', 'docs', 'README.md'), 'utf8');
    for (const name of ['registry.json', 'api.json', 'search-index.json']) {
      expect(readme).toContain(name);
    }
    for (const field of ['installState', 'exportName', 'variants', 'path']) {
      expect(readme).toContain(field);
    }
  });
});
