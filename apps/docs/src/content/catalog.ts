/**
 * Curated documentation catalogue.
 *
 * Editorial decisions live here: which package belongs to which section and
 * which exports the portal promises to document. Every entry is validated
 * against the public packages and barrels by `check:docs:metadata`; the
 * catalogue can classify, never invent.
 *
 * `core: true` marks the D12.4 component set. Other entries are documented
 * later and are not required to satisfy the full page contract yet.
 */
import type { Catalog } from '../lib/docs-metadata/types';

export const catalog: Catalog = {
  packages: [
    {
      name: '@ho-dev/tokens',
      category: 'Foundation',
    },
    {
      name: '@ho-dev/theme',
      category: 'Foundation',
    },
    {
      name: '@ho-dev/constants',
      category: 'Utilities',
    },
    {
      name: '@ho-dev/types',
      category: 'Utilities',
    },
    {
      name: '@ho-dev/utils',
      category: 'Utilities',
    },
    {
      name: '@ho-dev/hooks',
      category: 'Utilities',
    },
    {
      name: '@ho-dev/i18n',
      category: 'Utilities',
    },
    {
      name: '@ho-dev/providers',
      category: 'Utilities',
    },
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
      name: '@ho-dev/layouts',
      category: 'Components',
      components: [
        { exportName: 'Sidebar', id: 'sidebar', core: true },
        { exportName: 'Header', id: 'header', core: true },
      ],
    },
    {
      name: '@ho-dev/charts',
      category: 'Components',
      components: [{ exportName: 'AreaChart', id: 'area-chart', core: true }],
    },
    {
      name: '@ho-dev/icons',
      category: 'Components',
    },
    {
      name: '@ho-dev/config',
      category: 'Tooling',
    },
    {
      name: '@ho-dev/eslint',
      category: 'Tooling',
    },
  ],
};
