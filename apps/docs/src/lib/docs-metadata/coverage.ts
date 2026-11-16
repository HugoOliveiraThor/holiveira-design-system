/**
 * Catalogue coverage gate.
 *
 * The one place that fails the build when the catalogue stops matching the
 * packages. It proves the package set has its tracked documents, every barrel
 * export is recorded once, every component export resolves to exactly one
 * served target, and every guide snippet and relation points at something that
 * exists. The report records the counts and the Storybook fallbacks.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { MetadataError } from './registry';
import { GUIDE_ROUTES } from './routes';
import type { PackageRecord, Target } from './types';

/** The guide routes ADS-011 §5.7/§5.8 fixes. A target naming another fails the gate. */
export { GUIDE_ROUTES } from './routes';

function packageDir(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

/** A component export, paired with the package that owns it. */
export interface ComponentExportRef {
  package: string;
  exportName: string;
}

export function resolveTargetOf(
  resolve: (packageName: string, exportName: string) => Target | undefined,
  record: ComponentExportRef,
): Target | undefined {
  return resolve(record.package, record.exportName);
}

/** The docs route a target resolves to; anchors resolve to their package page. */
export function targetRoute(target: Target): string {
  switch (target.kind) {
    case 'page':
      return `/components/${target.id}/`;
    case 'guide':
      return `/${target.slug.replace(/^\/+|\/+$/g, '')}/`;
    case 'anchor':
      return `/packages/${packageDir(target.package)}/`;
  }
}

/** Every route the portal serves, including the guide routes the milestone fixes. */
export function portalRoutes({
  packages,
  components,
}: {
  packages: readonly PackageRecord[];
  components: readonly { id: string }[];
}): string[] {
  return [
    '/',
    '/packages/',
    ...packages.map((record) => `/packages/${packageDir(record.name)}/`),
    '/components/',
    ...components.map((record) => `/components/${record.id}/`),
    ...GUIDE_ROUTES.map((route) => `/${route}/`),
  ];
}

/** Each public package owns a README and an architecture contract. */
export function assertPackageCoverage({
  packages,
  root,
}: {
  packages: readonly PackageRecord[];
  root: string;
}): void {
  for (const record of packages) {
    const dir = packageDir(record.name);
    if (!existsSync(join(root, 'packages', dir, 'README.md'))) {
      throw new MetadataError(`${record.name} has no README (expected packages/${dir}/README.md)`);
    }
    if (!existsSync(join(root, 'docs', 'architecture', 'contracts', `${dir}.md`))) {
      throw new MetadataError(
        `${record.name} has no architecture contract (expected docs/architecture/contracts/${dir}.md)`,
      );
    }
  }
}

/** Every barrel export is recorded exactly once; inventory slugs stay unique. */
export function assertExportCoverage({
  registry,
  barrelExports,
}: {
  registry: readonly PackageRecord[];
  barrelExports: Record<string, readonly string[]>;
}): void {
  for (const record of registry) {
    const barrel = barrelExports[record.name];
    if (barrel === undefined) {
      throw new MetadataError(`no barrel exports found for ${record.name}`);
    }
    const recorded = new Set(record.exports.map((entry) => entry.name));
    for (const name of barrel) {
      if (!recorded.has(name)) {
        throw new MetadataError(
          `${record.name} exports ${name}, which is missing from registry.json`,
        );
      }
    }
    const barrelSet = new Set(barrel);
    for (const entry of record.exports) {
      if (!barrelSet.has(entry.name)) {
        throw new MetadataError(
          `registry.json records ${record.name}.${entry.name}, which the barrel does not export`,
        );
      }
    }
    const slugs = new Map<string, string>();
    for (const component of record.componentExports) {
      const previous = slugs.get(component.id);
      if (previous !== undefined) {
        throw new MetadataError(
          `${record.name} exports ${previous} and ${component.exportName}, which share the inventory slug "${component.id}"`,
        );
      }
      slugs.set(component.id, component.exportName);
    }
  }
}

/** Every component export resolves to exactly one target the portal serves. */
export function assertTargetCoverage({
  componentExports,
  resolve,
  routes,
}: {
  componentExports: readonly ComponentExportRef[];
  resolve: (packageName: string, exportName: string) => Target | undefined;
  routes: readonly string[];
}): void {
  const served = new Set(routes);
  for (const entry of componentExports) {
    const target = resolve(entry.package, entry.exportName);
    if (target === undefined) {
      throw new MetadataError(
        `${entry.package} exports ${entry.exportName}, which has no documentation target; add it to apps/docs/src/content/targets.ts`,
      );
    }
    const route = targetRoute(target);
    if (!served.has(route)) {
      throw new MetadataError(
        `${entry.package} exports ${entry.exportName}, whose target names ${route}, which the portal does not serve`,
      );
    }
  }
}

export interface GuideSectionRecord {
  id: string;
  title: string;
  prose: readonly string[];
}

/** The guide facts the gate reads; the full record adds editorial fields. */
export interface GuideCoverageRecord {
  slug: string;
  title: string;
  summary: string;
  sections: readonly GuideSectionRecord[];
  snippets: readonly string[];
  related: { packages?: readonly string[]; components?: readonly string[] };
}

function requireText(value: unknown, field: string, guide: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new MetadataError(`guide ${guide} has an empty ${field}`);
  }
  return value;
}

/**
 * Guide fields, snippet provenance and relations. A snippet that no guide names
 * is an orphan; a guide that names a snippet, package or component that does not
 * exist fails naming the guide and the link.
 */
export function assertGuideCoverage({
  guides,
  snippets,
  packages,
  componentExports,
  enforceOrphans = true,
}: {
  guides: readonly GuideCoverageRecord[];
  snippets: readonly string[];
  packages: readonly string[];
  componentExports: readonly ComponentExportRef[];
  enforceOrphans?: boolean;
}): void {
  const snippetPaths = new Set(snippets);
  const packageNames = new Set(packages);
  const componentNames = new Set(componentExports.map((entry) => entry.exportName));
  const referenced = new Set<string>();

  for (const guide of guides) {
    const slug = requireText(guide.slug, 'slug', String(guide.slug));
    requireText(guide.title, 'title', slug);
    requireText(guide.summary, 'summary', slug);

    if (guide.sections.length === 0) {
      throw new MetadataError(`guide ${slug} has no sections`);
    }
    for (const section of guide.sections) {
      const id = requireText(section.id, 'section id', slug);
      requireText(section.title, `title of section ${id}`, slug);
      if (section.prose.length === 0) {
        throw new MetadataError(`guide ${slug} has an empty prose in section ${id}`);
      }
      for (const paragraph of section.prose) {
        requireText(paragraph, `prose in section ${id}`, slug);
      }
    }

    if (guide.snippets.length === 0) {
      throw new MetadataError(`guide ${slug} has no snippets`);
    }
    for (const path of guide.snippets) {
      if (!snippetPaths.has(path)) {
        throw new MetadataError(`guide ${slug} names snippet ${path}, which does not exist`);
      }
      referenced.add(path);
    }

    for (const name of guide.related.packages ?? []) {
      if (!packageNames.has(name)) {
        throw new MetadataError(`guide ${slug} relates to package ${name}, which does not exist`);
      }
    }
    for (const name of guide.related.components ?? []) {
      if (!componentNames.has(name)) {
        throw new MetadataError(`guide ${slug} relates to component ${name}, which does not exist`);
      }
    }
  }

  if (!enforceOrphans) return;
  for (const path of snippets) {
    if (!referenced.has(path)) {
      throw new MetadataError(`snippet ${path} is referenced by no guide`);
    }
  }
}

export interface CoverageReport {
  packages: number;
  componentExports: number;
  targeted: number;
  fallbacks: string[];
}

/** Counts plus the exports that fall back to their package Storybook root. */
export function describeCoverage({
  registry,
  resolve,
}: {
  registry: readonly PackageRecord[];
  resolve?: (packageName: string, exportName: string) => Target | undefined;
}): CoverageReport {
  let componentExports = 0;
  let targeted = 0;
  const fallbacks: string[] = [];

  for (const record of registry) {
    for (const component of record.componentExports) {
      componentExports += 1;
      if (component.story === undefined) fallbacks.push(`${record.name}/${component.exportName}`);
      if (resolve?.(record.name, component.exportName) !== undefined) targeted += 1;
    }
  }

  return {
    packages: registry.length,
    componentExports,
    targeted,
    fallbacks: fallbacks.sort(),
  };
}
