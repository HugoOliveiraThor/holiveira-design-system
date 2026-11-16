/**
 * Package registry — the public packages derived from their manifests.
 *
 * A package is public when its manifest does not say `private: true`. Its
 * exports come from the barrel the caller resolved, never from package
 * internals. The catalogue supplies the editorial category.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Catalog, PackageRecord } from './types';

export class MetadataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MetadataError';
  }
}

export interface PackageManifest {
  name: string;
  version: string;
  description?: string;
  private?: boolean;
}

/** Read every `packages/<dir>/package.json`, sorted by name. */
export function readManifests(root: string): PackageManifest[] {
  const directory = join(root, 'packages');
  const manifests: PackageManifest[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    let raw: string;
    try {
      raw = readFileSync(join(directory, entry.name, 'package.json'), 'utf8');
    } catch {
      continue;
    }
    const parsed = JSON.parse(raw) as Partial<PackageManifest>;
    if (typeof parsed.name !== 'string' || typeof parsed.version !== 'string') {
      throw new MetadataError(`packages/${entry.name}/package.json is missing a name or version`);
    }
    manifests.push({
      name: parsed.name,
      version: parsed.version,
      description: parsed.description ?? '',
      private: parsed.private === true,
    });
  }
  return manifests.sort((a, b) => a.name.localeCompare(b.name));
}

/** Pre-release while the package is `0.x`; the catalogue never claims otherwise. */
export function installStateFor(version: string): 'pre-release' | 'published' {
  return version.startsWith('0.') ? 'pre-release' : 'published';
}

export interface BuildRegistryInput {
  manifests: PackageManifest[];
  catalog: Catalog;
  exportsByPackage: Record<string, string[]>;
}

export function buildRegistry({
  manifests,
  catalog,
  exportsByPackage,
}: BuildRegistryInput): PackageRecord[] {
  const categories = new Map(catalog.packages.map((entry) => [entry.name, entry.category]));
  return manifests
    .filter((manifest) => manifest.private !== true)
    .map((manifest) => {
      const category = categories.get(manifest.name);
      if (category === undefined) {
        throw new MetadataError(`catalog has no entry for public package ${manifest.name}`);
      }
      const exportsList = exportsByPackage[manifest.name];
      if (exportsList === undefined) {
        throw new MetadataError(`no barrel exports found for ${manifest.name}`);
      }
      return {
        name: manifest.name,
        version: manifest.version,
        description: manifest.description ?? '',
        private: false as const,
        installState: installStateFor(manifest.version),
        exports: [...exportsList].sort(),
        category,
      };
    });
}
