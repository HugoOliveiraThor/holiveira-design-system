import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const GENERATED = join(ROOT, 'apps', 'docs', 'src', 'generated');

function scripts(): Record<string, string> {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
    scripts: Record<string, string>;
  };
  return manifest.scripts;
}

function generated<T>(file: string): T {
  return JSON.parse(readFileSync(join(GENERATED, file), 'utf8')) as T;
}

function publicManifests(): Array<{ name: string; version: string }> {
  const directory = join(ROOT, 'packages');
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      try {
        const manifest = JSON.parse(
          readFileSync(join(directory, entry.name, 'package.json'), 'utf8'),
        ) as { name: string; version: string; private?: boolean };
        return manifest.private === true
          ? []
          : [{ name: manifest.name, version: manifest.version }];
      } catch {
        return [];
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

describe('docs metadata wiring', { timeout: 30_000 }, () => {
  it('matches the committed artifacts with the current source', () => {
    const stdout = execFileSync(
      'pnpm',
      [
        'exec',
        'tsx',
        join(ROOT, 'apps', 'docs', 'scripts', 'generate-docs-metadata.ts'),
        '--check',
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
    expect(stdout).toContain('16 packages, 13 components');
  });

  it('records the real packages in the registry', () => {
    const registry =
      generated<Array<{ name: string; version: string; category: string }>>('registry.json');
    const manifests = publicManifests();
    expect(registry.map((record) => record.name)).toEqual(manifests.map((entry) => entry.name));
    for (const entry of manifests) {
      const record = registry.find((candidate) => candidate.name === entry.name);
      expect(record?.version).toBe(entry.version);
      expect(record?.category.length).toBeGreaterThan(0);
    }
  });

  it('records the real components in the api', () => {
    const api = generated<
      Array<{
        id: string;
        props: Array<{ name: string; origin: string; default: string | null }>;
        variants: Record<string, { default: string | null }>;
      }>
    >('api.json');
    expect(api.map((record) => record.id).sort()).toEqual([
      'alert',
      'area-chart',
      'badge',
      'button',
      'card',
      'dropdown',
      'field',
      'form',
      'header',
      'input-group',
      'page-header',
      'sidebar',
      'table',
    ]);
    const button = api.find((record) => record.id === 'button');
    expect(button?.props.find((prop) => prop.name === 'variant')?.default).toBe('primary');
    expect(button?.variants.variant.default).toBe('primary');
    const alert = api.find((record) => record.id === 'alert');
    expect(alert?.props.find((prop) => prop.name === 'title')?.origin).toBe('component');
  });

  it('records one search record per package and component', () => {
    const search = generated<Array<{ id: string; type: string }>>('search-index.json');
    const registry = generated<Array<{ name: string }>>('registry.json');
    const api = generated<Array<{ id: string }>>('api.json');
    expect(search).toHaveLength(registry.length + api.length);
    expect(new Set(search.map((record) => record.id)).size).toBe(search.length);
    for (const record of registry) {
      expect(
        search.some((entry) => entry.type === 'package' && entry.id === record.name.split('/')[1]),
      ).toBe(true);
    }
    for (const record of api) {
      expect(search.some((entry) => entry.type === 'component' && entry.id === record.id)).toBe(
        true,
      );
    }
  });

  it('keeps check:docs:metadata in all-checks', () => {
    const steps = scripts()
      ['all-checks'].split('&&')
      .map((step) => step.trim().replace(/^pnpm run /, ''));
    expect(scripts()['check:docs:metadata']).toBe(
      'pnpm exec tsx apps/docs/scripts/generate-docs-metadata.ts --check',
    );
    expect(steps).toContain('check:docs');
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
    for (const field of [
      'version',
      'description',
      'category',
      'installState',
      'exportName',
      'required',
      'origin',
      'type',
      'title',
      'package',
      'path',
      'variants',
    ]) {
      expect(readme).toContain(field);
    }
  });
});
