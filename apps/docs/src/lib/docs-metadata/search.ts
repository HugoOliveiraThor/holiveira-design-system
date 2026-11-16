/**
 * Search index — one record per public package and per catalog component.
 *
 * Paths are the routes the M12.3 shell will serve; no UI reads this yet.
 */
import type { ComponentRecord, PackageRecord, SearchRecord } from './types';

function slugOf(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

export function buildSearch(
  registry: PackageRecord[],
  components: ComponentRecord[],
): SearchRecord[] {
  const packages: SearchRecord[] = registry.map((record) => ({
    id: slugOf(record.name),
    type: 'package',
    title: record.name,
    package: record.name,
    path: `/packages/${slugOf(record.name)}/`,
  }));
  const componentRecords: SearchRecord[] = components.map((component) => ({
    id: component.id,
    type: 'component',
    title: component.exportName,
    package: component.package,
    path: `/components/${component.id}/`,
  }));
  return [...packages, ...componentRecords].sort((a, b) => a.id.localeCompare(b.id));
}
