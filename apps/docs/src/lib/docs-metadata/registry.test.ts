import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { buildRegistry, readManifests } from './registry';
import type { Catalog, ComponentExportRecord, ExportRecord } from './types';

function fixturePackages(
  packages: Array<{
    dir: string;
    name: string;
    version: string;
    description?: string;
    private?: boolean;
    peerDependencies?: Record<string, string>;
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
          peerDependencies: pkg.peerDependencies,
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

const EXPORTS: Record<string, ExportRecord[]> = {
  '@ho-dev/alpha': [
    { name: 'Zeta', kind: 'type' },
    { name: 'Alpha', kind: 'function' },
  ],
  '@ho-dev/beta': [],
};

const COMPONENTS: Record<string, ComponentExportRecord[]> = {
  '@ho-dev/alpha': [],
  '@ho-dev/beta': [],
};

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
      componentExportsByPackage: COMPONENTS,
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
      componentExportsByPackage: COMPONENTS,
    });
    expect(registry[0]).toEqual({
      name: '@ho-dev/alpha',
      version: '0.2.1',
      description: 'Alpha package',
      private: false,
      installState: 'pre-release',
      exports: [
        { name: 'Alpha', kind: 'function' },
        { name: 'Zeta', kind: 'type' },
      ],
      componentExports: [],
      category: 'Components',
      peers: {},
    });
  });

  it('records peer dependencies sorted by name', () => {
    const root = fixturePackages([
      {
        dir: 'alpha',
        name: '@ho-dev/alpha',
        version: '0.2.1',
        peerDependencies: { typescript: '^5.0.0', react: '^19.0.0' },
      },
    ]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: CATALOG,
      exportsByPackage: EXPORTS,
      componentExportsByPackage: COMPONENTS,
    });
    expect(registry[0].peers).toEqual({ react: '^19.0.0', typescript: '^5.0.0' });
    expect(Object.keys(registry[0].peers)).toEqual(['react', 'typescript']);
  });

  it('excludes private packages', () => {
    const root = fixturePackages([
      { dir: 'alpha', name: '@ho-dev/alpha', version: '0.2.1' },
      { dir: 'secret', name: '@ho-dev/secret', version: '0.1.0', private: true },
    ]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: { packages: [{ name: '@ho-dev/alpha', category: 'Components' }] },
      exportsByPackage: { '@ho-dev/alpha': [{ name: 'Alpha', kind: 'function' }] },
      componentExportsByPackage: { '@ho-dev/alpha': [] },
    });
    expect(registry.map((record) => record.name)).toEqual(['@ho-dev/alpha']);
  });

  it('includes a package with no catalog components', () => {
    const root = fixturePackages([{ dir: 'beta', name: '@ho-dev/beta', version: '0.3.0' }]);
    const registry = buildRegistry({
      manifests: readManifests(root),
      catalog: { packages: [{ name: '@ho-dev/beta', category: 'Foundation' }] },
      exportsByPackage: { '@ho-dev/beta': [] },
      componentExportsByPackage: { '@ho-dev/beta': [] },
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
        componentExportsByPackage: { '@ho-dev/alpha': [] },
      }),
    ).toThrow(/catalog has no entry for public package @ho-dev\/alpha/);
  });
});
