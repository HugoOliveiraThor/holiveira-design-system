/**
 * Navigation derived from the committed metadata.
 *
 * Routes, breadcrumbs, pager, and sidebar sections are pure functions over the
 * generated facts, so the shell never hand-maintains what the catalogue already
 * knows.
 */
import apiData from '../generated/api.json';
import registryData from '../generated/registry.json';
import searchData from '../generated/search-index.json';
import { catalog } from '../content/catalog';
import { UNBUILT_SECTIONS, type UnbuiltSection } from '../content/navigation';
import type { ComponentRecord, PackageRecord, SearchRecord } from './docs-metadata/types';

export const packages = registryData as PackageRecord[];
export const components = apiData as ComponentRecord[];
export const searchRecords = searchData as SearchRecord[];

export function slugOf(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface NavigationSection {
  category: string;
  items: NavigationItem[];
}

/** Catalogue order first, then any unexpected category alphabetically. */
function categoryOrder(): string[] {
  const ordered: string[] = [];
  for (const entry of catalog.packages) {
    if (!ordered.includes(entry.category)) ordered.push(entry.category);
  }
  return ordered;
}

function groupCategories<T extends { id: string; label: string; href: string; category: string }>(
  records: T[],
): NavigationSection[] {
  const groups = new Map<string, NavigationItem[]>();
  for (const record of records) {
    const items = groups.get(record.category) ?? [];
    items.push({ id: record.id, label: record.label, href: record.href });
    groups.set(record.category, items);
  }
  const order = [
    ...categoryOrder(),
    ...[...groups.keys()].filter((c) => !categoryOrder().includes(c)).sort(),
  ];
  return order
    .filter((category) => groups.has(category))
    .map((category) => ({ category, items: groups.get(category)! }));
}

export function packageSections(): NavigationSection[] {
  return groupCategories(
    packages.map((record) => ({
      id: slugOf(record.name),
      label: record.name,
      href: `/packages/${slugOf(record.name)}/`,
      category: record.category,
    })),
  );
}

export function componentSections(): NavigationSection[] {
  const categories = new Map(packages.map((record) => [record.name, record.category]));
  return groupCategories(
    components.map((component) => ({
      id: component.id,
      label: component.exportName,
      href: `/components/${component.id}/`,
      category: categories.get(component.package) ?? 'Components',
    })),
  );
}

export function unbuiltSections(): UnbuiltSection[] {
  return UNBUILT_SECTIONS;
}

export interface Crumb {
  label: string;
  href?: string;
}

export function breadcrumbsForPackage(slug: string): Crumb[] {
  const record = packages.find((entry) => slugOf(entry.name) === slug);
  if (!record) return [];
  return [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages/' },
    { label: record.name },
  ];
}

export function breadcrumbsForComponent(id: string): Crumb[] {
  const record = components.find((entry) => entry.id === id);
  if (!record) return [];
  return [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components/' },
    { label: record.exportName },
  ];
}

export interface Pager<T> {
  previous: T | null;
  next: T | null;
}

export function pager<T extends { id: string }>(list: readonly T[], id: string): Pager<T> {
  const index = list.findIndex((entry) => entry.id === id);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}

export interface CatalogueCoverage {
  packages: number;
  components: number;
  missingPackages: string[];
  missingComponents: string[];
}

export function packageSlugs(): string[] {
  return packages.map((record) => slugOf(record.name));
}

export function componentSlugs(): string[] {
  return components.map((record) => record.id);
}

/** Every catalogue entry must resolve to a generated record; the build fails otherwise. */
export function coversEveryCatalogueEntry(): CatalogueCoverage {
  const packageSlugs = new Set(packages.map((record) => slugOf(record.name)));
  const componentIds = new Set(components.map((record) => record.id));
  const catalogPackages = catalog.packages.map((entry) => slugOf(entry.name));
  const catalogComponents = catalog.packages.flatMap((entry) =>
    (entry.components ?? []).map((component) => component.id),
  );
  return {
    packages: packageSlugs.size,
    components: componentIds.size,
    missingPackages: catalogPackages.filter((slug) => !packageSlugs.has(slug)),
    missingComponents: catalogComponents.filter((id) => !componentIds.has(id)),
  };
}

/**
 * Called while rendering the catalogue indexes, so a catalogue entry without a
 * generated record fails the build instead of exporting a dead link.
 */
export function assertCatalogueCoverage(coverage = coversEveryCatalogueEntry()): void {
  if (coverage.missingPackages.length > 0 || coverage.missingComponents.length > 0) {
    throw new Error(
      `catalogue entries without a generated page: ${[
        ...coverage.missingPackages,
        ...coverage.missingComponents,
      ].join(', ')}`,
    );
  }
}
