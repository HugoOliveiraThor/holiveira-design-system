import { describe, expect, it } from 'vitest';

import { guideDocs } from '../content/guides';

import {
  assertCatalogueCoverage,
  breadcrumbsForComponent,
  breadcrumbsForGuide,
  breadcrumbsForPackage,
  componentSections,
  componentSlugs,
  components,
  coversEveryCatalogueEntry,
  examplesForSlug,
  findComponentDoc,
  guideNeighbours,
  guideSections,
  packages,
  packageSections,
  playgroundHref,
  packageSlugs,
  pager,
  relatedComponentRelations,
  relatedGuideLinks,
  relatedPackageLinks,
  sameCategoryPackageLinks,
  slugOf,
  storyHref,
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

  it('builds absolute story and playground links', () => {
    expect(storyHref('button')).toBe(
      'https://hugoliveirathor.github.io/holiveira-design-system/?path=/docs/primitives-button--docs',
    );
    expect(playgroundHref('forms')).toBe(
      'https://hugoliveirathor.github.io/holiveira-design-system/playground/forms/',
    );
    expect(playgroundHref('dashboard')).toBe(
      'https://hugoliveirathor.github.io/holiveira-design-system/playground/',
    );
    expect(storyHref('ghost')).toBe('');
  });

  it('lists the guides whose relations name a package', () => {
    const themes = relatedGuideLinks('@ho-dev/theme');
    const slugs = themes.map((link) => link.id);
    expect(slugs).toContain('getting-started/theming');
    expect(slugs).toContain('guides/charts');
    for (const link of themes) {
      expect(link.href).toBe(`/holiveira-design-system/docs/${link.id}/`);
      expect(link.label.length).toBeGreaterThan(0);
    }
    for (const guide of guideDocs) {
      for (const name of guide.related.packages) {
        expect(relatedGuideLinks(name).map((link) => link.id)).toContain(guide.slug);
      }
    }
    expect(relatedGuideLinks('@ho-dev/config')).toEqual([]);
    expect(relatedGuideLinks('@ho-dev/ghost')).toEqual([]);
  });

  it('lists the packages of the same category', () => {
    expect(
      sameCategoryPackageLinks('@ho-dev/primitives')
        .map((link) => link.id)
        .sort(),
    ).toEqual([
      '@ho-dev/charts',
      '@ho-dev/forms',
      '@ho-dev/icons',
      '@ho-dev/layouts',
      '@ho-dev/ui',
    ]);
    for (const link of sameCategoryPackageLinks('@ho-dev/primitives')) {
      expect(link.href).toBe(`/holiveira-design-system/docs/packages/${link.id.split('/')[1]}/`);
    }
    expect(sameCategoryPackageLinks('@ho-dev/tokens').map((link) => link.id)).toEqual([
      '@ho-dev/theme',
    ]);
    expect(sameCategoryPackageLinks('@ho-dev/config').map((link) => link.id)).toEqual([
      '@ho-dev/eslint',
    ]);
    expect(sameCategoryPackageLinks('@ho-dev/ghost')).toEqual([]);
    for (const record of packages) {
      const others = sameCategoryPackageLinks(record.name).map((link) => link.id);
      expect(others).not.toContain(record.name);
    }
  });

  it('resolves related components through the target map', () => {
    expect(relatedComponentRelations(['Button'])).toEqual([
      { id: 'Button', label: 'Button', target: { kind: 'page', id: 'button' } },
    ]);
    expect(relatedComponentRelations(['ThemeProvider'])).toEqual([
      {
        id: 'ThemeProvider',
        label: 'ThemeProvider',
        target: { kind: 'guide', slug: 'getting-started/theming' },
      },
    ]);
    expect(relatedComponentRelations(['Avatar'])).toEqual([
      {
        id: 'Avatar',
        label: 'Avatar',
        target: { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'avatar' },
      },
    ]);
    expect(relatedComponentRelations(['GhostWidget'])).toEqual([]);
  });

  it('links only the related packages that exist', () => {
    expect(relatedPackageLinks(['@ho-dev/theme', '@ho-dev/ghost'])).toEqual([
      {
        id: '@ho-dev/theme',
        label: '@ho-dev/theme',
        href: '/holiveira-design-system/docs/packages/theme/',
      },
    ]);
    expect(relatedPackageLinks(['@ho-dev/ghost'])).toEqual([]);
  });

  it('groups the twelve guides into the four ADS sections', () => {
    const sections = guideSections();
    expect(sections.map((section) => section.category)).toEqual([
      'Getting Started',
      'Foundations',
      'Guides',
      'Architecture',
    ]);
    expect(sections.map((section) => section.items.length)).toEqual([3, 3, 5, 1]);
    const items = sections.flatMap((section) => section.items);
    expect(items).toHaveLength(12);
    for (const item of items) {
      expect(item.href).toBe(`/${item.id}/`);
      expect(item.label.length).toBeGreaterThan(0);
    }
    expect(items.map((item) => item.id)).toEqual([
      'getting-started',
      'getting-started/installation',
      'getting-started/theming',
      'foundations/tokens',
      'foundations/styling',
      'foundations/accessibility',
      'guides/providers',
      'guides/forms',
      'guides/charts',
      'guides/layouts',
      'guides/icons',
      'architecture',
    ]);
  });

  it('builds a breadcrumb trail with the section and the guide', () => {
    expect(breadcrumbsForGuide('getting-started/installation')).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Getting Started' },
      { label: 'Installation' },
    ]);
    expect(breadcrumbsForGuide('architecture')).toEqual([
      { label: 'Home', href: '/' },
      { label: 'Architecture' },
      { label: 'Architecture' },
    ]);
    expect(breadcrumbsForGuide('ghost/guide')).toEqual([]);
  });

  it('walks the guide order with the previous and next neighbour', () => {
    const first = guideNeighbours('getting-started');
    expect(first.previous).toBeNull();
    expect(first.next).toEqual({
      id: 'getting-started/installation',
      label: 'Installation',
      href: '/getting-started/installation/',
    });

    const middle = guideNeighbours('foundations/accessibility');
    expect(middle.previous?.id).toBe('foundations/styling');
    expect(middle.next?.id).toBe('guides/providers');

    const last = guideNeighbours('architecture');
    expect(last.previous?.id).toBe('guides/icons');
    expect(last.next).toBeNull();

    expect(guideNeighbours('ghost')).toEqual({ previous: null, next: null });
  });
});
