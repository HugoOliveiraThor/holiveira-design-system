/**
 * Navigation derived from the committed metadata.
 *
 * Routes, breadcrumbs, pager, and sidebar sections are pure functions over the
 * generated facts, so the shell never hand-maintains what the catalogue already
 * knows.
 */
import apiData from '../generated/api.json';
import examplesData from '../generated/examples.json';
import guideExamplesData from '../generated/guide-examples.json';
import registryData from '../generated/registry.json';
import searchData from '../generated/search-index.json';
import { docsHref, docsSite } from '../../site.config';
import { catalog } from '../content/catalog';
import { componentDocs } from '../content/components';
import { guideDocs as contentGuides } from '../content/guides';
import { resolveTarget } from '../content/targets';
import { GUIDE_SECTIONS, type GuideDoc } from './docs-metadata/guides';
import { guideRouteSegments } from './docs-metadata/routes';
import type {
  ComponentDoc,
  ComponentRecord,
  ExampleRecord,
  GuideExampleRecord,
  PackageRecord,
  PlaygroundScreen,
  SearchRecord,
  Target,
} from './docs-metadata/types';

export const packages = registryData as unknown as PackageRecord[];
export const components = apiData as ComponentRecord[];
export const searchRecords = searchData as SearchRecord[];
export const examples = examplesData as ExampleRecord[];
export const guideExamples = guideExamplesData as GuideExampleRecord[];

export function findComponentDoc(
  docs: readonly ComponentDoc[],
  id: string,
): ComponentDoc | undefined {
  return docs.find((doc) => doc.id === id);
}

export function examplesForSlug(list: readonly ExampleRecord[], id: string): ExampleRecord[] {
  return list.filter((example) => example.id === id);
}

/** The editorial record for a component, when one exists. */
export function componentDoc(id: string): ComponentDoc | undefined {
  return findComponentDoc(componentDocs, id);
}

/** The generated examples for a component, in kind order. */
export function examplesFor(id: string): ExampleRecord[] {
  return examplesForSlug(examples, id);
}

/** The source of a guide snippet, read from the committed guide artifact. */
export function snippetSource(path: string): string | undefined {
  return guideExamples.find((example) => example.path === path)?.source;
}

/** The editorial record served on a guide route, when one exists. */
export function guideBySlug(slug: string): GuideDoc | undefined {
  return contentGuides.find((guide) => guide.slug === slug);
}

/**
 * The route segments of a guide family, for `generateStaticParams`. The routes
 * are fixed by ADS-011, so the export has a path for every one even before its
 * content lands; the page resolves the record and calls `notFound()` without it.
 */
export function guideSlugs(family: string): string[] {
  return guideRouteSegments(family);
}

/** The Storybook docs page of a component, from its generated story id. */
export function storyHref(id: string): string {
  const record = components.find((component) => component.id === id);
  return record === undefined ? '' : `${docsSite.storybookUrl}?path=/docs/${record.story.id}--docs`;
}

/** The Playground screen linked by a component page, when one exists. */
export function playgroundHref(screen: PlaygroundScreen): string {
  return screen === 'dashboard' ? docsSite.playgroundUrl : `${docsSite.playgroundUrl}${screen}/`;
}

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

/** The guide sections in ADS order, each item linking to its guide route. */
export function guideSections(): NavigationSection[] {
  return GUIDE_SECTIONS.flatMap((section) => {
    const items = contentGuides
      .filter((guide) => guide.section === section)
      .map((guide) => ({ id: guide.slug, label: guide.title, href: `/${guide.slug}/` }));
    return items.length === 0 ? [] : [{ category: section, items }];
  });
}

/** A component the catalogue can document, resolved to where it lands. */
export interface ComponentRelation {
  id: string;
  label: string;
  target?: Target;
}

/** The guide's related packages, resolved against the registry. */
export function relatedPackageLinks(names: readonly string[]): NavigationItem[] {
  return names.flatMap((name) => {
    const record = packages.find((entry) => entry.name === name);
    return record === undefined
      ? []
      : [{ id: name, label: name, href: docsHref(`/packages/${slugOf(name)}/`) }];
  });
}

/**
 * The guide's related component exports, resolved to the page, guide or package
 * anchor that documents them. A component the catalogue does not target keeps
 * no target and is dropped by the caller.
 */
export function relatedComponentRelations(names: readonly string[]): ComponentRelation[] {
  return names.flatMap((name) => {
    const owner = packages.find((record) =>
      record.componentExports.some((component) => component.exportName === name),
    );
    if (owner === undefined) return [];
    return [{ id: name, label: name, target: resolveTarget(owner.name, name) }];
  });
}

/** The guides whose editorial relations name this package. */
export function relatedGuideLinks(packageName: string): NavigationItem[] {
  return contentGuides
    .filter((guide) => guide.related.packages.includes(packageName))
    .map((guide) => ({ id: guide.slug, label: guide.title, href: docsHref(`/${guide.slug}/`) }));
}

/** The other packages that share this package's category. */
export function sameCategoryPackageLinks(packageName: string): NavigationItem[] {
  const record = packages.find((entry) => entry.name === packageName);
  if (record === undefined) return [];
  return packages
    .filter((entry) => entry.category === record.category && entry.name !== record.name)
    .map((entry) => ({
      id: entry.name,
      label: entry.name,
      href: docsHref(`/packages/${slugOf(entry.name)}/`),
    }));
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

export function breadcrumbsForGuide(slug: string): Crumb[] {
  const guide = guideBySlug(slug);
  if (!guide) return [];
  return [{ label: 'Home', href: '/' }, { label: guide.section }, { label: guide.title }];
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

/** The guide siblings in the record order the sidebar reads, for the pager. */
export function guideNeighbours(slug: string): Pager<NavigationItem> {
  return pager(
    contentGuides.map((guide) => ({
      id: guide.slug,
      label: guide.title,
      href: `/${guide.slug}/`,
    })),
    slug,
  );
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
