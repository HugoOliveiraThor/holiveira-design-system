/**
 * Search index — one record per public package, catalog component and guide.
 *
 * Paths are the routes the portal serves. Package and component records are
 * generated facts; a guide record is one editorial record, indexed with the
 * summary and the package relations it states.
 */
import type { GuideDoc } from './guides';
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
  guides: readonly GuideDoc[],
): SearchRecord[] {
  const categories = new Map(registry.map((record) => [record.name, record.category]));
  const packages: SearchRecord[] = registry.map((record) => ({
    id: slugOf(record.name),
    type: 'package',
    title: record.name,
    package: record.name,
    category: record.category,
    summary: '',
    keywords: keywords(
      slugOf(record.name),
      record.name,
      record.category,
      ...record.componentExports.map((component) => component.exportName),
    ),
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
  const guideRecords: SearchRecord[] = guides.map((guide) => ({
    id: guide.slug,
    type: 'guide',
    title: guide.title,
    category: guide.section,
    summary: guide.summary,
    keywords: keywords(
      guide.title,
      guide.section,
      guide.slug,
      ...guide.related.packages,
      ...guide.related.packages.map(slugOf),
    ),
    path: `/${guide.slug}/`,
  }));
  return [...packages, ...componentRecords, ...guideRecords].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}
