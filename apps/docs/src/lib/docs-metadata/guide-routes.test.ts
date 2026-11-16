import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { components, packages, slugOf } from '../docs-metadata-query';

import { GUIDE_ROUTES } from './coverage';

const APP_DIR = join(process.cwd(), 'apps', 'docs', 'src', 'app');

/** The page file that serves each ADS-011 guide route. */
const PAGE_FILES: Record<string, string> = {
  'getting-started': 'getting-started/page.tsx',
  'getting-started/installation': 'getting-started/installation/page.tsx',
  'getting-started/theming': 'getting-started/theming/page.tsx',
  'foundations/tokens': 'foundations/[slug]/page.tsx',
  'foundations/styling': 'foundations/[slug]/page.tsx',
  'foundations/accessibility': 'foundations/[slug]/page.tsx',
  'guides/providers': 'guides/[slug]/page.tsx',
  'guides/forms': 'guides/[slug]/page.tsx',
  'guides/charts': 'guides/[slug]/page.tsx',
  'guides/layouts': 'guides/[slug]/page.tsx',
  'guides/icons': 'guides/[slug]/page.tsx',
  architecture: 'architecture/page.tsx',
};

describe('guide routes', () => {
  it('serves the twelve guide routes as real page files', () => {
    expect(Object.keys(PAGE_FILES).sort()).toEqual([...GUIDE_ROUTES].sort());
    for (const [route, file] of Object.entries(PAGE_FILES)) {
      expect(existsSync(join(APP_DIR, file)), `${route} → apps/docs/src/app/${file}`).toBe(true);
    }
  });

  it('routes the three foundations and five guides through one file each', () => {
    const foundations = Object.entries(PAGE_FILES).filter(([route]) =>
      route.startsWith('foundations/'),
    );
    const guides = Object.entries(PAGE_FILES).filter(([route]) => route.startsWith('guides/'));
    expect(foundations.map(([, file]) => file)).toEqual(
      Array(3).fill('foundations/[slug]/page.tsx'),
    );
    expect(guides.map(([, file]) => file)).toEqual(Array(5).fill('guides/[slug]/page.tsx'));
    expect(foundations.map(([route]) => route)).toEqual([
      'foundations/tokens',
      'foundations/styling',
      'foundations/accessibility',
    ]);
    expect(guides.map(([route]) => route)).toEqual([
      'guides/providers',
      'guides/forms',
      'guides/charts',
      'guides/layouts',
      'guides/icons',
    ]);
  });

  it('keeps a guide route out of the package and component namespaces', () => {
    const reserved = new Set([
      '/',
      '/packages/',
      '/components/',
      ...packages.map((record) => `/packages/${slugOf(record.name)}/`),
      ...components.map((record) => `/components/${record.id}/`),
    ]);
    for (const route of GUIDE_ROUTES) {
      expect(reserved.has(`/${route}/`), route).toBe(false);
    }
  });
});
