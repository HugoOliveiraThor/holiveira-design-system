import { describe, expect, it } from 'vitest';

import { validateCatalog, type CatalogContext } from './catalog';
import type { Catalog, CatalogPackage } from './types';

const CONTEXT: CatalogContext = {
  publicPackages: [
    '@ho-dev/primitives',
    '@ho-dev/ui',
    '@ho-dev/forms',
    '@ho-dev/charts',
    '@ho-dev/layouts',
  ],
  exportsByPackage: {
    '@ho-dev/primitives': ['Button', 'Alert', 'Badge', 'InputGroup', 'Table', 'Dropdown'],
    '@ho-dev/ui': ['Card', 'PageHeader'],
    '@ho-dev/forms': ['Field', 'Form'],
    '@ho-dev/charts': ['AreaChart'],
    '@ho-dev/layouts': ['Sidebar', 'Header'],
  },
};

function packages(): CatalogPackage[] {
  return [
    {
      name: '@ho-dev/primitives',
      category: 'Components',
      components: [
        { exportName: 'Button', id: 'button', core: true },
        { exportName: 'Alert', id: 'alert', core: true },
        { exportName: 'Badge', id: 'badge', core: true },
        { exportName: 'InputGroup', id: 'input-group', core: true },
        { exportName: 'Table', id: 'table', core: true },
        { exportName: 'Dropdown', id: 'dropdown', core: true },
      ],
    },
    {
      name: '@ho-dev/ui',
      category: 'Components',
      components: [
        { exportName: 'Card', id: 'card', core: true },
        { exportName: 'PageHeader', id: 'page-header', core: true },
      ],
    },
    {
      name: '@ho-dev/forms',
      category: 'Components',
      components: [
        { exportName: 'Field', id: 'field', core: true },
        { exportName: 'Form', id: 'form' },
      ],
    },
    {
      name: '@ho-dev/charts',
      category: 'Components',
      components: [{ exportName: 'AreaChart', id: 'area-chart', core: true }],
    },
    {
      name: '@ho-dev/layouts',
      category: 'Components',
      components: [
        { exportName: 'Sidebar', id: 'sidebar', core: true },
        { exportName: 'Header', id: 'header', core: true },
      ],
    },
  ];
}

function valid(): Catalog {
  return { packages: packages() };
}

describe('catalog validation', () => {
  it('lists category, components and core flags', () => {
    const result = validateCatalog(valid(), CONTEXT);
    const primitives = result.packages.find((entry) => entry.name === '@ho-dev/primitives');
    expect(primitives?.category).toBe('Components');
    expect(primitives?.components).toContainEqual({
      exportName: 'Button',
      id: 'button',
      core: true,
    });
    const forms = result.packages.find((entry) => entry.name === '@ho-dev/forms');
    expect(forms?.components).toContainEqual({ exportName: 'Form', id: 'form' });
  });

  it('rejects a private package entry', () => {
    const catalog = valid();
    catalog.packages.push({ name: '@ho-dev/secret', category: 'Components' });
    expect(() => validateCatalog(catalog, CONTEXT)).toThrow(
      /catalog names @ho-dev\/secret, which is not a public package/,
    );
  });

  it('rejects an unknown export', () => {
    const catalog = valid();
    catalog.packages[0].components?.push({ exportName: 'Nope', id: 'nope' });
    expect(() => validateCatalog(catalog, CONTEXT)).toThrow(
      /catalog names Nope, which @ho-dev\/primitives does not export/,
    );
  });

  it('requires the twelve core components', () => {
    const catalog = valid();
    const primitives = catalog.packages[0];
    primitives.components = primitives.components?.filter(
      (component) => component.exportName !== 'Button',
    );
    expect(() => validateCatalog(catalog, CONTEXT)).toThrow(/missing core component Button/);
  });

  it('rejects a duplicate component id', () => {
    const catalog = valid();
    catalog.packages[1].components?.push({ exportName: 'Card', id: 'button' });
    expect(() => validateCatalog(catalog, CONTEXT)).toThrow(/duplicate component id "button"/);
  });

  it('rejects malformed catalog input', () => {
    expect(() => validateCatalog({}, CONTEXT)).toThrow(/expected a packages array/);
    const catalog = valid();
    catalog.packages[0].components?.[0] && (catalog.packages[0].components[0].id = 'Not A Slug');
    expect(() => validateCatalog(catalog, CONTEXT)).toThrow(/invalid id/);
  });
});
