import { CORE_COMPONENTS, type Catalog, type CatalogComponent, type CatalogPackage } from './types';
import { MetadataError } from './registry';

export interface CatalogContext {
  publicPackages: string[];
  exportsByPackage: Record<string, string[]>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validate the curated catalogue against the packages and barrels.
 *
 * The catalogue is editorial, but it may only reference facts that exist:
 * public packages, real exports, unique slugs, and the D12.4 core set.
 */
export function validateCatalog(value: unknown, context: CatalogContext): Catalog {
  if (!isRecord(value) || !Array.isArray(value.packages)) {
    throw new MetadataError('catalog is malformed: expected a packages array');
  }

  const publicSet = new Set(context.publicPackages);
  const seenIds = new Set<string>();
  const seenCore = new Set<string>();
  const packages: CatalogPackage[] = [];

  for (const entry of value.packages) {
    if (!isRecord(entry))
      throw new MetadataError('catalog is malformed: package entry is not an object');
    const name = entry.name;
    const category = entry.category;
    if (typeof name !== 'string' || name.length === 0) {
      throw new MetadataError('catalog is malformed: package entry has no name');
    }
    if (typeof category !== 'string' || category.length === 0) {
      throw new MetadataError(`catalog entry for ${name} has no category`);
    }
    if (!publicSet.has(name)) {
      throw new MetadataError(`catalog names ${name}, which is not a public package`);
    }
    const exportsList = context.exportsByPackage[name];
    if (exportsList === undefined) {
      throw new MetadataError(`catalog names ${name}, which has no public barrel`);
    }
    if (entry.components !== undefined && !Array.isArray(entry.components)) {
      throw new MetadataError(`catalog entry for ${name} has a malformed components list`);
    }

    const components: CatalogComponent[] = [];
    for (const component of (entry.components ?? []) as unknown[]) {
      if (!isRecord(component)) {
        throw new MetadataError(`catalog entry for ${name} has a malformed component`);
      }
      const exportName = component.exportName;
      const id = component.id;
      if (typeof exportName !== 'string' || exportName.length === 0) {
        throw new MetadataError(`catalog entry for ${name} has a component without an export name`);
      }
      if (typeof id !== 'string' || !ID_PATTERN.test(id)) {
        throw new MetadataError(`catalog entry for ${name}.${exportName} has an invalid id`);
      }
      if (seenIds.has(id)) {
        throw new MetadataError(`catalog has a duplicate component id "${id}"`);
      }
      if (!exportsList.includes(exportName)) {
        throw new MetadataError(`catalog names ${exportName}, which ${name} does not export`);
      }
      seenIds.add(id);
      const core = component.core === true;
      if (core) seenCore.add(exportName);
      components.push({ exportName, id, ...(core ? { core: true as const } : {}) });
    }

    packages.push({ name, category, ...(components.length > 0 ? { components } : {}) });
  }

  for (const core of CORE_COMPONENTS) {
    if (!seenCore.has(core)) {
      throw new MetadataError(`catalog is missing core component ${core}`);
    }
  }

  return { packages };
}
