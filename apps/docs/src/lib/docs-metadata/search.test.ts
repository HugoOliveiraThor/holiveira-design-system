import { describe, expect, it } from 'vitest';

import { filterRecords } from '../../components/search/filter';

import type { GuideDoc } from './guides';
import { buildSearch } from './search';
import type { ComponentRecord, PackageRecord } from './types';

const REGISTRY: PackageRecord[] = [
  {
    name: '@ho-dev/primitives',
    version: '0.2.1',
    description: '',
    private: false,
    installState: 'pre-release',
    exports: [{ name: 'Button', kind: 'component' }],
    componentExports: [
      {
        id: 'button',
        exportName: 'Button',
        sourceFile: 'packages/primitives/src/button.tsx',
      },
    ],
    category: 'Components',
    peers: {},
  },
  {
    name: '@ho-dev/ui',
    version: '0.2.1',
    description: '',
    private: false,
    installState: 'pre-release',
    exports: [{ name: 'Card', kind: 'component' }],
    componentExports: [],
    category: 'Components',
    peers: {},
  },
];

const GUIDES: GuideDoc[] = [
  {
    slug: 'getting-started/theming',
    section: 'Getting Started',
    title: 'Theming',
    summary: 'ThemeProvider switches the whole application between light and dark.',
    order: 3,
    sections: [{ id: 'provider', title: 'Provide the theme', prose: ['Wrap once.'] }],
    snippets: [],
    related: { packages: ['@ho-dev/theme'], components: ['Button'] },
    sources: ['docs/architecture/contracts/theme.md'],
  },
];

const COMPONENTS: ComponentRecord[] = [
  {
    id: 'button',
    package: '@ho-dev/primitives',
    exportName: 'Button',
    props: [],
    variants: {},
    story: { title: 'Primitives/Button', id: 'primitives-button' },
    sourceFile: 'packages/primitives/src/button.tsx',
  },
];

describe('search index', () => {
  it('emits one record per package and component', () => {
    expect(buildSearch(REGISTRY, COMPONENTS, [])).toEqual([
      {
        id: 'button',
        type: 'component',
        title: 'Button',
        package: '@ho-dev/primitives',
        category: 'Components',
        summary: '',
        keywords: ['@ho-dev/primitives', 'button', 'components'],
        path: '/components/button/',
      },
      {
        id: 'primitives',
        type: 'package',
        title: '@ho-dev/primitives',
        package: '@ho-dev/primitives',
        category: 'Components',
        summary: '',
        keywords: ['@ho-dev/primitives', 'button', 'components', 'primitives'],
        path: '/packages/primitives/',
      },
      {
        id: 'ui',
        type: 'package',
        title: '@ho-dev/ui',
        package: '@ho-dev/ui',
        category: 'Components',
        summary: '',
        keywords: ['@ho-dev/ui', 'components', 'ui'],
        path: '/packages/ui/',
      },
    ]);
  });

  it('adds category and keywords to every record', () => {
    const records = buildSearch(REGISTRY, COMPONENTS, []);
    expect(records).toHaveLength(3);
    for (const record of records) {
      expect(record.category).toBe('Components');
      expect(record.summary).toBe('');
      expect(record.keywords.length).toBeGreaterThan(0);
      expect(record.keywords).toEqual([...record.keywords].sort());
      expect(new Set(record.keywords).size).toBe(record.keywords.length);
      for (const keyword of record.keywords) expect(keyword).toBe(keyword.toLowerCase());
    }
    const button = records[0];
    expect(button.keywords).toContain('button');
    expect(button.keywords).toContain('@ho-dev/primitives');
  });

  it('adds a search record per guide', () => {
    const records = buildSearch(REGISTRY, COMPONENTS, GUIDES);
    const guides = records.filter((record) => record.type === 'guide');
    expect(guides).toEqual([
      {
        id: 'getting-started/theming',
        type: 'guide',
        title: 'Theming',
        category: 'Getting Started',
        summary: 'ThemeProvider switches the whole application between light and dark.',
        keywords: [
          '@ho-dev/theme',
          'getting started',
          'getting-started/theming',
          'theme',
          'theming',
        ],
        path: '/getting-started/theming/',
      },
    ]);
    expect(records).toHaveLength(4);
    expect(guides[0]).not.toHaveProperty('package');
  });

  it('indexes the guide title, section and related packages as keywords', () => {
    const guide = buildSearch(REGISTRY, COMPONENTS, GUIDES).find(
      (record) => record.id === 'getting-started/theming',
    );
    expect(guide?.keywords).toEqual(expect.arrayContaining(['theming', 'getting started']));
    expect(guide?.keywords).toContain('@ho-dev/theme');
    expect(guide?.keywords).toContain('theme');
  });

  it('includes the package component export names as keywords', () => {
    const primitives = buildSearch(REGISTRY, COMPONENTS, GUIDES).find(
      (record) => record.id === 'primitives',
    );
    expect(primitives?.keywords).toContain('button');
  });

  it('finds the guide when the reader searches for it', () => {
    const records = buildSearch(REGISTRY, COMPONENTS, GUIDES);
    expect(filterRecords(records, 'theming').map((record) => record.id)).toEqual([
      'getting-started/theming',
    ]);
  });
});
