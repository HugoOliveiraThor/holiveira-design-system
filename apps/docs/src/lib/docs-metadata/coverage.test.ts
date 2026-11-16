import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { resolveTarget } from '../../content/targets';
import {
  assertExportCoverage,
  assertGuideCoverage,
  assertPackageCoverage,
  assertTargetCoverage,
  describeCoverage,
  GUIDE_ROUTES,
  portalRoutes,
  targetRoute,
  type GuideCoverageRecord,
} from './coverage';
import type { ComponentExportRecord, PackageRecord, Target } from './types';

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-coverage-'));
  for (const [relative, content] of Object.entries(files)) write(root, relative, content);
  return root;
}

function packageRecord(overrides: Partial<PackageRecord> = {}): PackageRecord {
  return {
    name: '@ho-dev/alpha',
    version: '0.2.0',
    description: '',
    private: false,
    installState: 'pre-release',
    exports: [{ name: 'Button', kind: 'component' }],
    componentExports: [
      {
        id: 'button',
        exportName: 'Button',
        sourceFile: 'packages/alpha/src/button.tsx',
      },
    ],
    category: 'Components',
    peers: {},
    ...overrides,
  };
}

function component(
  id: string,
  exportName: string,
  story?: ComponentExportRecord['story'],
): ComponentExportRecord {
  return {
    id,
    exportName,
    sourceFile: `packages/alpha/src/${id}.tsx`,
    ...(story === undefined ? {} : { story }),
  };
}

const GUIDE: GuideCoverageRecord = {
  slug: 'guides/icons',
  title: 'Icons',
  summary: 'How to use the icon set.',
  sections: [{ id: 'usage', title: 'Usage', prose: ['Import the icon you need.'] }],
  snippets: ['apps/docs/src/examples/guides/icons.tsx'],
  related: { packages: ['@ho-dev/icons'], components: ['AlertErrorIcon'] },
};

const GUIDE_INPUT = {
  snippets: ['apps/docs/src/examples/guides/icons.tsx'],
  packages: ['@ho-dev/icons'],
  componentExports: [{ package: '@ho-dev/icons', exportName: 'AlertErrorIcon' }],
};

describe('package coverage', () => {
  it('passes when every package has a README and a contract', () => {
    const root = fixture({
      'packages/alpha/README.md': '# alpha',
      'docs/architecture/contracts/alpha.md': '# alpha',
    });
    expect(() => assertPackageCoverage({ packages: [packageRecord()], root })).not.toThrow();
  });

  it('fails naming a package with no README', () => {
    const root = fixture({ 'docs/architecture/contracts/alpha.md': '# alpha' });
    expect(() => assertPackageCoverage({ packages: [packageRecord()], root })).toThrow(
      /@ho-dev\/alpha has no README \(expected packages\/alpha\/README.md\)/,
    );
  });

  it('fails naming a package with no architecture contract', () => {
    const root = fixture({ 'packages/alpha/README.md': '# alpha' });
    expect(() => assertPackageCoverage({ packages: [packageRecord()], root })).toThrow(
      /@ho-dev\/alpha has no architecture contract \(expected docs\/architecture\/contracts\/alpha.md\)/,
    );
  });
});

describe('export coverage', () => {
  it('passes when the registry matches the barrel', () => {
    expect(() =>
      assertExportCoverage({
        registry: [packageRecord()],
        barrelExports: { '@ho-dev/alpha': ['Button'] },
      }),
    ).not.toThrow();
  });

  it('fails naming a package and export missing from the registry', () => {
    expect(() =>
      assertExportCoverage({
        registry: [packageRecord({ exports: [], componentExports: [] })],
        barrelExports: { '@ho-dev/alpha': ['Button'] },
      }),
    ).toThrow(/@ho-dev\/alpha exports Button, which is missing from registry.json/);
  });

  it('fails naming a recorded export the barrel does not ship', () => {
    expect(() =>
      assertExportCoverage({
        registry: [packageRecord()],
        barrelExports: { '@ho-dev/alpha': [] },
      }),
    ).toThrow(/registry.json records @ho-dev\/alpha.Button, which the barrel does not export/);
  });

  it('fails when two component exports share an inventory slug', () => {
    expect(() =>
      assertExportCoverage({
        registry: [
          packageRecord({
            exports: [
              { name: 'Button', kind: 'component' },
              { name: 'ButtonTwo', kind: 'component' },
            ],
            componentExports: [
              component('button', 'Button', { title: 'Alpha/Button', id: 'alpha-button' }),
              component('button', 'ButtonTwo'),
            ],
          }),
        ],
        barrelExports: { '@ho-dev/alpha': ['Button', 'ButtonTwo'] },
      }),
    ).toThrow(
      /@ho-dev\/alpha exports Button and ButtonTwo, which share the inventory slug "button"/,
    );
  });
});

describe('target coverage', () => {
  const routes = ['/components/button/', '/guides/icons/', '/packages/alpha/'];

  it('resolves one target per component export', () => {
    expect(() =>
      assertTargetCoverage({
        componentExports: [{ package: '@ho-dev/alpha', exportName: 'Button' }],
        resolve: () => ({ kind: 'page', id: 'button' }),
        routes,
        registry: [packageRecord()],
      }),
    ).not.toThrow();

    // Two targets for one export is not "one target": the map refuses it.
    expect(() =>
      resolveTarget('@ho-dev/theme', 'ThemeProvider', {
        entries: [
          {
            package: '@ho-dev/theme',
            exportName: 'ThemeProvider',
            target: { kind: 'guide', slug: 'getting-started/theming' },
          },
          {
            package: '@ho-dev/theme',
            exportName: 'ThemeProvider',
            target: { kind: 'anchor', package: '@ho-dev/theme', anchor: 'theme-provider' },
          },
        ],
        patterns: [],
      }),
    ).toThrow(/targets\.ts maps @ho-dev\/theme ThemeProvider more than once/);
  });

  it('fails when a component export has no target', () => {
    expect(() =>
      assertTargetCoverage({
        componentExports: [{ package: '@ho-dev/alpha', exportName: 'Avatar' }],
        resolve: () => undefined,
        routes,
        registry: [packageRecord()],
      }),
    ).toThrow(/@ho-dev\/alpha exports Avatar, which has no documentation target/);
  });

  it('fails when a target route is not served', () => {
    expect(() =>
      assertTargetCoverage({
        componentExports: [{ package: '@ho-dev/alpha', exportName: 'AlertErrorIcon' }],
        resolve: () => ({ kind: 'guide', slug: 'guides/ghost' }),
        routes,
        registry: [packageRecord()],
      }),
    ).toThrow(
      /@ho-dev\/alpha exports AlertErrorIcon, whose target names \/guides\/ghost\/, which the portal does not serve/,
    );
  });

  it('fails when an anchor target has no inventory row', () => {
    expect(() =>
      assertTargetCoverage({
        componentExports: [{ package: '@ho-dev/alpha', exportName: 'Avatar' }],
        resolve: () => ({ kind: 'anchor', package: '@ho-dev/alpha', anchor: 'ghost' }),
        routes,
        registry: [packageRecord()],
      }),
    ).toThrow(
      /@ho-dev\/alpha exports Avatar, whose target anchor "#ghost" has no inventory row in @ho-dev\/alpha/,
    );
  });

  it('fails when an anchor target collides with a package page section', () => {
    expect(() =>
      assertTargetCoverage({
        componentExports: [{ package: '@ho-dev/alpha', exportName: 'Avatar' }],
        resolve: () => ({ kind: 'anchor', package: '@ho-dev/alpha', anchor: 'exports' }),
        routes,
        registry: [packageRecord()],
      }),
    ).toThrow(
      /@ho-dev\/alpha exports Avatar, whose target anchor "exports" collides with a @ho-dev\/alpha page section/,
    );
  });

  it('maps each target kind to its docs route', () => {
    const page: Target = { kind: 'page', id: 'button' };
    const guide: Target = { kind: 'guide', slug: '/guides/icons/' };
    const anchor: Target = { kind: 'anchor', package: '@ho-dev/primitives', anchor: 'avatar' };
    expect([targetRoute(page), targetRoute(guide), targetRoute(anchor)]).toEqual([
      '/components/button/',
      '/guides/icons/',
      '/packages/primitives/',
    ]);
  });

  it('counts the routes the portal serves, including every guide route', () => {
    const routes = portalRoutes({
      packages: [packageRecord()],
      components: [{ id: 'button' }],
    });
    expect(routes).toContain('/packages/alpha/');
    expect(routes).toContain('/components/button/');
    expect(routes).toHaveLength(5 + GUIDE_ROUTES.length);
    for (const route of GUIDE_ROUTES) expect(routes).toContain(`/${route}/`);
  });
});

describe('coverage report', () => {
  it('reports packages, component exports, targets and the storybook fallbacks', () => {
    const registry = [
      packageRecord({
        exports: [
          { name: 'Button', kind: 'component' },
          { name: 'Avatar', kind: 'component' },
        ],
        componentExports: [
          component('avatar', 'Avatar'),
          component('button', 'Button', { title: 'Alpha/Button', id: 'alpha-button' }),
        ],
      }),
    ];
    const report = describeCoverage({
      registry,
      resolve: (_package, exportName) =>
        exportName === 'Button' ? { kind: 'page', id: 'button' } : undefined,
    });
    expect(report).toEqual({
      packages: 1,
      componentExports: 2,
      targeted: 1,
      fallbacks: ['@ho-dev/alpha/Avatar'],
    });
    expect(describeCoverage({ registry }).targeted).toBe(0);
  });

  it('lists the storybook fallback without failing', () => {
    const registry = [packageRecord({ componentExports: [component('avatar', 'Avatar')] })];
    const report = describeCoverage({ registry });
    expect(report.fallbacks).toContain('@ho-dev/alpha/Avatar');
    expect(report.targeted).toBe(0);
  });
});

describe('guide coverage', () => {
  it('passes when every guide field, snippet and relation resolves', () => {
    expect(() => assertGuideCoverage({ guides: [GUIDE], ...GUIDE_INPUT })).not.toThrow();
  });

  it('fails when a guide names a missing snippet', () => {
    expect(() =>
      assertGuideCoverage({
        guides: [{ ...GUIDE, snippets: ['apps/docs/src/examples/guides/missing.tsx'] }],
        ...GUIDE_INPUT,
      }),
    ).toThrow(
      /guide guides\/icons names snippet apps\/docs\/src\/examples\/guides\/missing.tsx, which does not exist/,
    );
  });

  it('fails when a snippet belongs to no guide', () => {
    expect(() =>
      assertGuideCoverage({
        ...GUIDE_INPUT,
        guides: [GUIDE],
        snippets: [...GUIDE_INPUT.snippets, 'apps/docs/src/examples/guides/orphan.tsx'],
      }),
    ).toThrow(/snippet apps\/docs\/src\/examples\/guides\/orphan.tsx is referenced by no guide/);
  });

  it('defers orphan enforcement while the guide set is incomplete', () => {
    expect(() =>
      assertGuideCoverage({
        ...GUIDE_INPUT,
        guides: [GUIDE],
        snippets: [...GUIDE_INPUT.snippets, 'apps/docs/src/examples/guides/pending.tsx'],
        enforceOrphans: false,
      }),
    ).not.toThrow();
  });

  it('fails when a guide field is empty', () => {
    expect(() =>
      assertGuideCoverage({ guides: [{ ...GUIDE, summary: '' }], ...GUIDE_INPUT }),
    ).toThrow(/guide guides\/icons has an empty summary/);
    expect(() =>
      assertGuideCoverage({
        guides: [
          {
            ...GUIDE,
            sections: [{ id: 'usage', title: 'Usage', prose: [''] }],
          },
        ],
        ...GUIDE_INPUT,
      }),
    ).toThrow(/guide guides\/icons has an empty prose in section usage/);
  });

  it('fails when a guide links to an unknown page', () => {
    expect(() =>
      assertGuideCoverage({
        guides: [{ ...GUIDE, related: { packages: ['@ho-dev/ghost'], components: [] } }],
        ...GUIDE_INPUT,
      }),
    ).toThrow(/guide guides\/icons relates to package @ho-dev\/ghost, which does not exist/);
  });

  it('fails when a relation names an unknown page', () => {
    expect(() =>
      assertGuideCoverage({
        guides: [{ ...GUIDE, related: { packages: [], components: ['Ghost'] } }],
        ...GUIDE_INPUT,
      }),
    ).toThrow(/guide guides\/icons relates to component Ghost, which does not exist/);
  });
});
