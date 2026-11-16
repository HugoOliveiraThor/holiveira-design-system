import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { catalog } from '../../content/catalog';
import { COMPONENT_TARGETS, resolveTarget, TARGET_PATTERNS } from '../../content/targets';
import type { ComponentExportRecord } from './types';

const REGISTRY = JSON.parse(
  readFileSync(join(process.cwd(), 'apps', 'docs', 'src', 'generated', 'registry.json'), 'utf8'),
) as Array<{ name: string; componentExports: ComponentExportRecord[] }>;

const CATALOGUED = new Map<string, string>(
  catalog.packages.flatMap((entry) =>
    (entry.components ?? []).map((component): [string, string] => [
      `${entry.name}/${component.exportName}`,
      component.id,
    ]),
  ),
);

describe('component target map', () => {
  it('resolves a catalogued component to its page', () => {
    expect(resolveTarget('@ho-dev/primitives', 'Button')).toEqual({ kind: 'page', id: 'button' });
    expect(resolveTarget('@ho-dev/charts', 'AreaChart')).toEqual({
      kind: 'page',
      id: 'area-chart',
    });
  });

  it('resolves an explicit entry to its anchor', () => {
    expect(resolveTarget('@ho-dev/primitives', 'Tooltip')).toEqual({
      kind: 'anchor',
      package: '@ho-dev/primitives',
      anchor: 'tooltip',
    });
    expect(resolveTarget('@ho-dev/ui', 'CardTitle')).toEqual({
      kind: 'anchor',
      package: '@ho-dev/ui',
      anchor: 'card-title',
    });
  });

  it('resolves a part sharing its source file to the parent target', () => {
    expect(resolveTarget('@ho-dev/primitives', 'TableBody')).toEqual({ kind: 'page', id: 'table' });
    expect(resolveTarget('@ho-dev/primitives', 'TabsList')).toEqual({
      kind: 'anchor',
      package: '@ho-dev/primitives',
      anchor: 'tabs',
    });
    expect(resolveTarget('@ho-dev/primitives', 'ListItem')).toEqual({
      kind: 'anchor',
      package: '@ho-dev/primitives',
      anchor: 'list',
    });
  });

  it('resolves every icon family export to the icons guide', () => {
    const expected = { kind: 'guide', slug: 'guides/icons' };
    expect(resolveTarget('@ho-dev/icons', 'BellIcon')).toEqual(expected);
    expect(resolveTarget('@ho-dev/icons', 'IconWrapper')).toEqual(expected);
    for (const entry of REGISTRY.find((record) => record.name === '@ho-dev/icons')!
      .componentExports) {
      expect(resolveTarget('@ho-dev/icons', entry.exportName), entry.exportName).toEqual(expected);
    }
  });

  it('resolves the five auth layouts to the layouts guide', () => {
    for (const name of [
      'AuthLayout',
      'SignInForm',
      'SignUpForm',
      'PasswordResetForm',
      'TwoStepVerificationForm',
    ]) {
      expect(resolveTarget('@ho-dev/layouts', name), name).toEqual({
        kind: 'guide',
        slug: 'guides/layouts',
      });
    }
  });

  it('lets an explicit entry win over a pattern', () => {
    const map = {
      entries: [
        {
          package: '@ho-dev/icons',
          exportName: 'BellIcon',
          target: {
            kind: 'anchor' as const,
            package: '@ho-dev/icons',
            anchor: 'bell-icon',
          },
        },
      ],
      patterns: TARGET_PATTERNS,
    };
    expect(resolveTarget('@ho-dev/icons', 'BellIcon', map)).toEqual({
      kind: 'anchor',
      package: '@ho-dev/icons',
      anchor: 'bell-icon',
    });
    expect(resolveTarget('@ho-dev/icons', 'MoonIcon', map)).toEqual({
      kind: 'guide',
      slug: 'guides/icons',
    });
  });

  it('fails when an explicit entry competes with a catalogued page', () => {
    const map = {
      entries: [
        {
          package: '@ho-dev/primitives',
          exportName: 'Button',
          target: { kind: 'guide' as const, slug: 'guides/forms' },
        },
      ],
      patterns: [],
    };
    expect(() => resolveTarget('@ho-dev/primitives', 'Button', map)).toThrow(
      /targets\.ts maps Button explicitly, but @ho-dev\/primitives already documents it on the button page/,
    );
  });

  it('fails when the map names one export twice', () => {
    const map = {
      entries: [
        COMPONENT_TARGETS.find(
          (entry) => entry.package === '@ho-dev/theme' && entry.exportName === 'ThemeProvider',
        )!,
        {
          package: '@ho-dev/theme',
          exportName: 'ThemeProvider',
          target: { kind: 'anchor' as const, package: '@ho-dev/theme', anchor: 'theme-provider' },
        },
      ],
      patterns: [],
    };
    expect(() => resolveTarget('@ho-dev/theme', 'ThemeProvider', map)).toThrow(
      /targets\.ts maps @ho-dev\/theme ThemeProvider more than once/,
    );
  });

  it('gives every component export of the catalogued packages exactly one target', () => {
    for (const record of REGISTRY) {
      for (const component of record.componentExports) {
        const key = `${record.name}/${component.exportName}`;
        const target = resolveTarget(record.name, component.exportName);
        expect(target, key).toBeDefined();
        const page = CATALOGUED.get(key);
        if (page === undefined) continue;
        expect(target, key).toEqual({ kind: 'page', id: page });
      }
    }
  });

  it('keeps an explicit entry for every non-core export outside the pattern families', () => {
    const explicit = new Set(
      COMPONENT_TARGETS.map((entry) => `${entry.package}/${entry.exportName}`),
    );
    for (const record of REGISTRY) {
      for (const component of record.componentExports) {
        const key = `${record.name}/${component.exportName}`;
        if (CATALOGUED.has(key)) {
          expect(explicit.has(key), key).toBe(false);
          continue;
        }
        const pattern = TARGET_PATTERNS.some(
          (entry) => entry.package === record.name && entry.match(component.exportName),
        );
        if (!pattern) expect(explicit.has(key), key).toBe(true);
      }
    }
  });
});
