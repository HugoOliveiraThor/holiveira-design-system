/**
 * Search index — one record per public package and per catalog component.
 *
 * Paths are the routes the M12.3 shell will serve; no UI reads this yet.
 */
import type { ComponentRecord, PackageRecord, SearchRecord } from './types';

function slugOf(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

function keywords(...values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim().toLowerCase()).filter(Boolean))].sort();
}

export function buildSearch(
  registry: PackageRecord[],
  components: ComponentRecord[],
): SearchRecord[] {
  const categories = new Map(registry.map((record) => [record.name, record.category]));
  const packages: SearchRecord[] = registry.map((record) => ({
    id: slugOf(record.name),
    type: 'package',
    title: record.name,
    package: record.name,
    category: record.category,
    summary: '',
    keywords: keywords(slugOf(record.name), record.name, record.category),
    path: `/packages/${slugOf(record.name)}/`,
  }));
  const componentRecords: SearchRecord[] = components.map((component) => ({
    id: component.id,
    type: 'component',
    title: component.exportName,
    package: component.package,
    category: categories.get(component.package) ?? '',
    summary: '',
    keywords: keywords(
      component.id,
      component.exportName,
      component.package,
      categories.get(component.package) ?? '',
      ...Object.keys(component.variants),
    ),
    path: `/components/${component.id}/`,
  }));
  return [...packages, ...componentRecords].sort((a, b) => a.id.localeCompare(b.id));
}
