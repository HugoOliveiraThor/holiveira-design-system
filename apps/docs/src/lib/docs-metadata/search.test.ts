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
    exports: ['Button'],
    category: 'Components',
  },
  {
    name: '@ho-dev/ui',
    version: '0.2.1',
    description: '',
    private: false,
    installState: 'pre-release',
    exports: ['Card'],
    category: 'Components',
  },
];

const COMPONENTS: ComponentRecord[] = [
  {
    id: 'button',
    package: '@ho-dev/primitives',
    exportName: 'Button',
    props: [],
    variants: {},
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
        path: '/components/button/',
      },
      {
        id: 'primitives',
        type: 'package',
        title: '@ho-dev/primitives',
        package: '@ho-dev/primitives',
        path: '/packages/primitives/',
      },
      {
        id: 'ui',
        type: 'package',
        title: '@ho-dev/ui',
        package: '@ho-dev/ui',
        path: '/packages/ui/',
      },
    ]);
  });
});
