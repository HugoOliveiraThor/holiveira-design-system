import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { buildRegistry, readManifests } from './registry';
import type { Catalog } from './types';

function fixturePackages(
  packages: Array<{
    dir: string;
    name: string;
    version: string;
    description?: string;
    private?: boolean;
  }>,
): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-registry-'));
  for (const pkg of packages) {
    const dir = join(root, 'packages', pkg.dir);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'package.json'),
      `${JSON.stringify(
        {
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          private: pkg.private,
        },
        null,
        2,
      )}\n`,
    );
  }
  return root;
}

const CATALOG: Catalog = {
  packages: [
    { name: '@ho-dev/alpha', category: 'Components' },
    { name: '@ho-dev/beta', category: 'Foundation' },
  ],
};

const EXPORTS = { '@ho-dev/alpha': ['Zeta', 'Alpha'], '@ho-dev/beta': [] };

describe('package registry', () => {
  it('derives registry from the public manifests', () => {
    const root = fixturePackages([
      { dir: 'alpha', name: '@ho-dev/alpha', version: '0.2.1', description: 'Alpha package' },
      { dir: 'beta', name: '@ho-dev/beta', version: '0.3.0' },
    ]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: CATALOG,
      exportsByPackage: EXPORTS,
    });
    expect(registry.map((record) => record.name)).toEqual(['@ho-dev/alpha', '@ho-dev/beta']);
  });

  it('records version, description, install state and category', () => {
    const root = fixturePackages([
      { dir: 'alpha', name: '@ho-dev/alpha', version: '0.2.1', description: 'Alpha package' },
    ]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: CATALOG,
      exportsByPackage: EXPORTS,
    });
    expect(registry[0]).toEqual({
      name: '@ho-dev/alpha',
      version: '0.2.1',
      description: 'Alpha package',
      private: false,
      installState: 'pre-release',
      exports: ['Alpha', 'Zeta'],
      category: 'Components',
    });
  });

  it('excludes private packages', () => {
    const root = fixturePackages([
      { dir: 'alpha', name: '@ho-dev/alpha', version: '0.2.1' },
      { dir: 'secret', name: '@ho-dev/secret', version: '0.1.0', private: true },
    ]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: { packages: [{ name: '@ho-dev/alpha', category: 'Components' }] },
      exportsByPackage: { '@ho-dev/alpha': ['Alpha'] },
    });
    expect(registry.map((record) => record.name)).toEqual(['@ho-dev/alpha']);
  });

  it('includes a package with no catalog components', () => {
    const root = fixturePackages([{ dir: 'beta', name: '@ho-dev/beta', version: '0.3.0' }]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: { packages: [{ name: '@ho-dev/beta', category: 'Foundation' }] },
      exportsByPackage: { '@ho-dev/beta': [] },
    });
    expect(registry).toHaveLength(1);
  });

  it('fails when a public package has no category', () => {
    const root = fixturePackages([{ dir: 'alpha', name: '@ho-dev/alpha', version: '0.2.1' }]);
    expect(() =>
      buildRegistry({
        manifests: readManifests(root),
        catalog: { packages: [] },
        exportsByPackage: { '@ho-dev/alpha': [] },
      }),
    ).toThrow(/catalog has no entry for public package @ho-dev\/alpha/);
  });
});
