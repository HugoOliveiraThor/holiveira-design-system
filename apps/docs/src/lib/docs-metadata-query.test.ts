import { describe, expect, it } from 'vitest';

import {
  breadcrumbsForComponent,
  breadcrumbsForPackage,
  componentSections,
  components,
  coversEveryCatalogueEntry,
  packages,
  packageSections,
  pager,
  slugOf,
  unbuiltSections,
} from './docs-metadata-query';

describe('docs metadata query', () => {
  it('groups packages by category', () => {
    const sections = packageSections();
    expect(sections.map((section) => section.category)).toEqual([
      'Foundation',
      'Utilities',
      'Components',
      'Tooling',
    ]);
    expect(sections.flatMap((section) => section.items)).toHaveLength(16);
    for (const section of sections) {
      expect(section.items.every((item) => item.href.startsWith('/packages/'))).toBe(true);
    }
  });

  it('sorts components by id', () => {
    const sections = componentSections();
    expect(sections.flatMap((section) => section.items)).toHaveLength(13);
    for (const section of sections) {
      const ids = section.items.map((item) => item.id);
      expect(ids).toEqual([...ids].sort());
    }
  });

  it('builds breadcrumbs for a package page', () => {
    expect(breadcrumbsForPackage('primitives')).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Packages', href: '/packages/' },
      { label: '@ho-dev/primitives' },
    ]);
    expect(breadcrumbsForComponent('button')).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components/' },
      { label: 'Button' },
    ]);
  });

  it('returns null at the ends and neighbours in the middle', () => {
    const list = packages.map((record) => ({ id: slugOf(record.name) }));
    const first = pager(list, list[0].id);
    expect(first.previous).toBeNull();
    expect(first.next?.id).toBe(list[1].id);

    const middle = pager(list, list[5].id);
    expect(middle.previous?.id).toBe(list[4].id);
    expect(middle.next?.id).toBe(list[6].id);

    const last = pager(list, list[list.length - 1].id);
    expect(last.previous?.id).toBe(list[list.length - 2].id);
    expect(last.next).toBeNull();
  });

  it('covers every catalogue entry', () => {
    const coverage = coversEveryCatalogueEntry();
    expect(coverage.packages).toBe(16);
    expect(coverage.components).toBe(13);
    expect(coverage.missingPackages).toEqual([]);
    expect(coverage.missingComponents).toEqual([]);
    expect(components).toHaveLength(13);
  });

  it('lists unbuilt sections as disabled', () => {
    const sections = unbuiltSections();
    expect(sections.map((section) => section.title)).toEqual([
      'Getting Started',
      'Foundations',
      'Guides',
      'Architecture',
    ]);
    for (const section of sections) expect(section.items.length).toBeGreaterThan(0);
  });
});
