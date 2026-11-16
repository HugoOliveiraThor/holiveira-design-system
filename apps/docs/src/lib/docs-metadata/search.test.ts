import { describe, expect, it } from 'vitest';

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
    expect(buildSearch(REGISTRY, COMPONENTS)).toEqual([
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
        keywords: ['@ho-dev/primitives', 'components', 'primitives'],
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
    const records = buildSearch(REGISTRY, COMPONENTS);
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
});
