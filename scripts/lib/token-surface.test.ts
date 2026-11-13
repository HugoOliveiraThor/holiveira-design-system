import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  buildSnapshot,
  compareVersions,
  diffSurfaces,
  flattenExports,
  isBreakingBump,
  isVersionRegression,
  parseTheme,
  parseVersion,
  renderSnapshot,
  resolveApproval,
  validateSnapshot,
} from './token-surface';

const CSS = `@theme {
  --color-primary: #5750f1;
  --breakpoint-2xsm: 375px;
  --spacing-4: 1rem;
  --font-sans:
    'Satoshi', ui-sans-serif,
    system-ui;
}`;

describe('token surface', () => {
  it('records every @theme variable with its normalized value', () => {
    expect(parseTheme(CSS)).toEqual({
      '--breakpoint-2xsm': '375px',
      '--color-primary': '#5750f1',
      '--font-sans': "'Satoshi', ui-sans-serif, system-ui",
      '--spacing-4': '1rem',
    });
    expect(Object.keys(parseTheme(CSS))).toEqual([
      '--breakpoint-2xsm',
      '--color-primary',
      '--font-sans',
      '--spacing-4',
    ]);
  });

  it('fails on a duplicate @theme variable', () => {
    expect(() => parseTheme('@theme {\n--color-primary: #000;\n--color-primary: #fff;\n}')).toThrow(
      /duplicate token "--color-primary"/,
    );
  });

  it('fails when the @theme block is missing', () => {
    expect(() => parseTheme('body { color: red; }')).toThrow(/no @theme block/);
  });

  it('collapses multi-line values to a single space', () => {
    expect(parseTheme(CSS)['--font-sans']).toBe("'Satoshi', ui-sans-serif, system-ui");
    expect(parseTheme('@theme {\n--color-x:  #abc \n ;\n}')).toEqual({ '--color-x': '#abc' });
  });

  it('flattens exported token objects to dot paths', () => {
    const flattened = flattenExports({
      colors: { primary: '#5750f1', 'gray-1': '#f9fafb' },
      text: { 'heading-1': { fontSize: '60px', lineHeight: '72px' } },
      containers: { '3': '0.75rem' },
    });
    expect(flattened).toEqual({
      'colors.gray-1': '#f9fafb',
      'colors.primary': '#5750f1',
      'containers.3': '0.75rem',
      'text.heading-1.fontSize': '60px',
      'text.heading-1.lineHeight': '72px',
    });
  });

  it('rejects an unsupported token leaf', () => {
    expect(() => flattenExports({ bad: null })).toThrow(/Unsupported token value/);
  });

  it('records format, package, version and generation date', () => {
    const snapshot = buildSnapshot(
      { css: { '--color-primary': '#5750f1' }, ts: { 'colors.primary': '#5750f1' } },
      { version: '0.2.0', generatedAt: '2026-11-13' },
    );
    expect(snapshot).toEqual({
      format: 1,
      package: '@ho-dev/tokens',
      version: '0.2.0',
      generatedAt: '2026-11-13',
      approval: null,
      css: { '--color-primary': '#5750f1' },
      ts: { 'colors.primary': '#5750f1' },
    });
  });

  it('renders the snapshot sorted and byte-stable', () => {
    const snapshot = {
      format: 1 as const,
      package: '@ho-dev/tokens',
      version: '0.2.0',
      generatedAt: '2026-11-13',
      approval: null,
      css: { '--color-z': '#fff', '--color-a': '#000' },
      ts: { 'colors.z': '#fff', 'colors.a': '#000' },
    };
    const first = renderSnapshot(snapshot);
    expect(first).toBe(renderSnapshot(snapshot));
    expect(first.endsWith('\n')).toBe(true);
    const parsed = JSON.parse(first) as { css: Record<string, string>; ts: Record<string, string> };
    expect(Object.keys(parsed.css)).toEqual(['--color-a', '--color-z']);
    expect(Object.keys(parsed.ts)).toEqual(['colors.a', 'colors.z']);
  });

  it('rejects a snapshot missing a required section', () => {
    expect(() =>
      validateSnapshot({
        format: 1,
        package: '@ho-dev/tokens',
        version: '0.2.0',
        generatedAt: '2026-11-13',
        approval: null,
        css: {},
      }),
    ).toThrow(/missing "ts"/);
  });

  it('rejects an unsupported snapshot format', () => {
    expect(() =>
      validateSnapshot({
        format: 2,
        package: '@ho-dev/tokens',
        version: '0.2.0',
        generatedAt: '2026-11-13',
        approval: null,
        css: {},
        ts: {},
      }),
    ).toThrow(/format 2 is unsupported/);
  });

  it('classifies a rename as removed plus added', () => {
    const diff = diffSurfaces(
      { css: { '--color-primary': '#5750f1' }, ts: { 'colors.primary': '#5750f1' } },
      { css: { '--color-brand': '#5750f1' }, ts: { 'colors.brand': '#5750f1' } },
    );
    expect(diff.css).toEqual({
      added: ['--color-brand'],
      removed: ['--color-primary'],
      changed: [],
    });
    expect(diff.ts).toEqual({ added: ['colors.brand'], removed: ['colors.primary'], changed: [] });
    expect(diff.breaking).toBe(true);
    expect(diff.empty).toBe(false);
  });

  it('reports a removed token whose parent object is gone', () => {
    const diff = diffSurfaces(
      { css: {}, ts: { 'text.heading-1.fontSize': '60px' } },
      { css: {}, ts: {} },
    );
    expect(diff.ts.removed).toEqual(['text.heading-1.fontSize']);
    expect(diff.ts.changed).toEqual([]);
    expect(diff.breaking).toBe(true);
  });

  it('reports css and ts faces independently', () => {
    const diff = diffSurfaces(
      { css: { '--color-a': '#000' }, ts: { 'colors.a': '#000' } },
      { css: { '--color-a': '#000', '--color-b': '#fff' }, ts: { 'colors.a': '#000' } },
    );
    expect(diff.css.added).toEqual(['--color-b']);
    expect(diff.css.removed).toEqual([]);
    expect(diff.css.changed).toEqual([]);
    expect(diff.ts).toEqual({ added: [], removed: [], changed: [] });
    expect(diff.breaking).toBe(false);
  });

  it('classifies a value change with both values', () => {
    const diff = diffSurfaces(
      { css: { '--color-primary': '#5750f1' }, ts: { 'colors.primary': '#5750f1' } },
      { css: { '--color-primary': '#111111' }, ts: { 'colors.primary': '#111111' } },
    );
    expect(diff.css.changed).toEqual([{ path: '--color-primary', from: '#5750f1', to: '#111111' }]);
    expect(diff.ts.changed).toEqual([{ path: 'colors.primary', from: '#5750f1', to: '#111111' }]);
    expect(diff.breaking).toBe(true);
  });

  it('treats equal surfaces as an empty diff', () => {
    const surface = { css: { '--color-a': '#000' }, ts: { 'colors.a': '#000' } };
    expect(diffSurfaces(surface, surface)).toEqual({
      css: { added: [], removed: [], changed: [] },
      ts: { added: [], removed: [], changed: [] },
      breaking: false,
      empty: true,
    });
  });

  it('requires a minor bump for a breaking change below 1.0', () => {
    expect(isBreakingBump('0.2.0', '0.3.0')).toBe(true);
    expect(isBreakingBump('1.2.0', '2.0.0')).toBe(true);
    expect(isBreakingBump('0.2.0', '0.2.1')).toBe(false);
    expect(isBreakingBump('1.2.0', '1.3.0')).toBe(false);
  });

  it('treats a lower version as a regression', () => {
    expect(compareVersions('0.10.0', '0.9.9')).toBeGreaterThan(0);
    expect(compareVersions('0.2.0', '0.2.0')).toBe(0);
    expect(isVersionRegression('0.1.0', '0.2.0')).toBe(true);
    expect(isVersionRegression('0.3.0', '0.2.0')).toBe(false);
  });

  it('rejects a pre-release version', () => {
    expect(() => parseVersion('0.2.0-beta.1')).toThrow(/MAJOR.MINOR.PATCH/);
  });

  it('resolves an approval reference to an existing ADS file', () => {
    const root = mkdtempSync(join(tmpdir(), 'token-approval-'));
    mkdirSync(join(root, 'docs', 'architecture'), { recursive: true });
    writeFileSync(join(root, 'docs', 'architecture', 'ads-012-fixture.md'), '# ADS\n');
    expect(resolveApproval(root, 'ads-012')).toBe('ads-012-fixture.md');
    expect(resolveApproval(root, 'ADS-012')).toBe('ads-012-fixture.md');
    expect(resolveApproval(root, 'ads-999')).toBeNull();
    expect(resolveApproval(root, 'not-an-ads')).toBeNull();
  });
});
