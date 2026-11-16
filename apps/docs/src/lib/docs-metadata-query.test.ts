import { describe, expect, it } from 'vitest';

import {
  assertCatalogueCoverage,
  breadcrumbsForComponent,
  breadcrumbsForPackage,
  componentSections,
  componentSlugs,
  components,
  coversEveryCatalogueEntry,
  examplesForSlug,
  findComponentDoc,
  packages,
  packageSections,
  packageSlugs,
  pager,
  slugOf,
  unbuiltSections,
} from './docs-metadata-query';
import type { ComponentDoc, ExampleRecord } from './docs-metadata/types';

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

    const componentList = components.map((record) => ({ id: record.id }));
    const sorted = [...componentList].sort((a, b) => a.id.localeCompare(b.id));
    expect(sorted[0].id).toBe('alert');
    const componentMiddle = pager(sorted, sorted[3].id);
    expect(componentMiddle.previous?.id).toBe(sorted[2].id);
    expect(componentMiddle.next?.id).toBe(sorted[4].id);
    expect(pager(sorted, sorted[0].id).previous).toBeNull();
    expect(pager(sorted, sorted[sorted.length - 1].id).next).toBeNull();
  });

  it('generates slugs for every catalogue entry', () => {
    expect(packageSlugs()).toHaveLength(16);
    expect(componentSlugs()).toHaveLength(13);
    expect(new Set(packageSlugs()).size).toBe(16);
    expect(new Set(componentSlugs()).size).toBe(13);
    const coverage = coversEveryCatalogueEntry();
    expect(coverage.missingPackages).toEqual([]);
    expect(coverage.missingComponents).toEqual([]);
  });

  it('fails the build input when a catalogue entry has no page', () => {
    expect(() => assertCatalogueCoverage()).not.toThrow();
    expect(() =>
      assertCatalogueCoverage({
        packages: 15,
        components: 12,
        missingPackages: ['ghost-package'],
        missingComponents: ['ghost-component'],
      }),
    ).toThrow(/ghost-package, ghost-component/);
  });

  it('covers every catalogue entry', () => {
    const coverage = coversEveryCatalogueEntry();
    expect(coverage.packages).toBe(16);
    expect(coverage.components).toBe(13);
    expect(coverage.missingPackages).toEqual([]);
    expect(coverage.missingComponents).toEqual([]);
    expect(components).toHaveLength(13);
  });

  it('returns the content record for a slug', () => {
    const docs: ComponentDoc[] = [
      {
        id: 'button',
        summary: 'Triggers an action.',
        whenToUse: 'Use it for the primary action.',
        whenNotToUse: 'Do not use it for navigation.',
        accessibility: { keyboard: 'Enter and Space.', aria: 'Native button.', focus: 'Ring.' },
        related: [],
      },
    ];
    expect(findComponentDoc(docs, 'button')?.summary).toBe('Triggers an action.');
    expect(findComponentDoc(docs, 'card')).toBeUndefined();
  });

  it('returns the examples for a slug in kind order', () => {
    const examples: ExampleRecord[] = [
      {
        id: 'button',
        kind: 'minimal',
        path: 'apps/docs/src/examples/button/minimal.tsx',
        source: 'a',
      },
      {
        id: 'button',
        kind: 'realistic',
        path: 'apps/docs/src/examples/button/realistic.tsx',
        source: 'b',
      },
      { id: 'card', kind: 'minimal', path: 'apps/docs/src/examples/card/minimal.tsx', source: 'c' },
    ];
    expect(examplesForSlug(examples, 'button').map((example) => example.kind)).toEqual([
      'minimal',
      'realistic',
    ]);
    expect(examplesForSlug(examples, 'alert')).toEqual([]);
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
