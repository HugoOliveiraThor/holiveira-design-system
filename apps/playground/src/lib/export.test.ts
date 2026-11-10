import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();
const APP_ROOT = join(REPO_ROOT, 'apps', 'playground');
const OUT_ROOT = join(APP_ROOT, 'out');

const ROUTE_EXPORTS = [
  'index.html',
  join('forms', 'index.html'),
  join('settings', 'index.html'),
  join('login', 'index.html'),
  join('orders', 'index.html'),
];

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

describe('static export', () => {
  it('emits a static export', () => {
    for (const route of ROUTE_EXPORTS) {
      expect(existsSync(join(OUT_ROOT, route)), route).toBe(true);
    }
  });

  it('rewrites assets for the playground base path', () => {
    const html = readFileSync(join(OUT_ROOT, 'index.html'), 'utf8');
    const assetRefs = [...html.matchAll(/(?:src|href)="([^"]*\/_next\/[^"]+)"/g)].map(
      (match) => match[1],
    );

    expect(assetRefs.length).toBeGreaterThan(0);
    for (const ref of assetRefs) {
      expect(ref.startsWith('/holiveira-design-system/playground/_next/'), ref).toBe(true);
    }
    expect(html).not.toContain('src="/_next/');
    expect(html).not.toContain('href="/_next/');
  });

  it('includes the playground in the turbo build', () => {
    const rootPackage = readJson<{ scripts: Record<string, string> }>(
      join(REPO_ROOT, 'package.json'),
    );
    const appPackage = readJson<{ scripts: Record<string, string> }>(
      join(APP_ROOT, 'package.json'),
    );
    const appTurbo = readJson<{ tasks: { build: { outputs: string[] } } }>(
      join(APP_ROOT, 'turbo.json'),
    );

    expect(rootPackage.scripts.build).toBe('turbo run build');
    expect(appPackage.scripts.build).toBe('next build');
    expect(appTurbo.tasks.build.outputs).toContain('out/**');
  });
});
