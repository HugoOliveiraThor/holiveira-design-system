import { describe, expect, it } from 'vitest';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { MAX_RESULTS, filterRecords } from './filter';

function record(overrides: Partial<SearchRecord>): SearchRecord {
  return {
    id: 'button',
    type: 'component',
    title: 'Button',
    package: '@ho-dev/primitives',
    category: 'Components',
    summary: '',
    keywords: ['button', '@ho-dev/primitives', 'components'],
    path: '/components/button/',
    ...overrides,
  };
}

const RECORDS: SearchRecord[] = [
  record({}),
  record({
    id: 'page-header',
    title: 'PageHeader',
    package: '@ho-dev/ui',
    keywords: ['page-header', 'pageheader', '@ho-dev/ui'],
    path: '/components/page-header/',
  }),
  record({
    id: 'tokens',
    type: 'package',
    title: '@ho-dev/tokens',
    package: '@ho-dev/tokens',
    category: 'Foundation',
    keywords: ['@ho-dev/tokens', 'foundation', 'tokens'],
    path: '/packages/tokens/',
  }),
];

describe('search filter', () => {
  it('filters by title, package, category and keywords', () => {
    expect(filterRecords(RECORDS, 'button').map((entry) => entry.id)).toEqual(['button']);
    expect(filterRecords(RECORDS, 'primitives').map((entry) => entry.id)).toEqual(['button']);
    expect(filterRecords(RECORDS, 'foundation').map((entry) => entry.id)).toEqual(['tokens']);
    expect(filterRecords(RECORDS, 'page-header').map((entry) => entry.id)).toEqual(['page-header']);
  });

  it('ignores case and surrounding whitespace', () => {
    expect(filterRecords(RECORDS, '  BUTTON  ').map((entry) => entry.id)).toEqual(['button']);
  });

  it('caps the results at twenty', () => {
    const many = Array.from({ length: 30 }, (_, index) =>
      record({ id: `item-${index}`, title: `Item ${index}` }),
    );
    expect(filterRecords(many, 'item')).toHaveLength(MAX_RESULTS);
    expect(filterRecords(many, '')).toHaveLength(MAX_RESULTS);
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(filterRecords(RECORDS, 'zzz')).toEqual([]);
  });
});
