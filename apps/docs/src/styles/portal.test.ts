import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const PORTAL_CSS = join(ROOT, 'apps', 'docs', 'src', 'styles', 'portal.css');
const TOKENS_CSS = join(ROOT, 'packages', 'tokens', 'src', 'tokens.css');
const PORTAL_SRC = join(ROOT, 'apps', 'docs', 'src');

/**
 * The roles the design fixes. Every one of them is declared in :root and in
 * .dark, so a surface that loses its dark value fails here instead of shipping a
 * light panel in the dark theme.
 */
const ROLES = [
  '--portal-canvas',
  '--portal-surface',
  '--portal-surface-2',
  '--portal-border',
  '--portal-ink',
  '--portal-body',
  '--portal-muted',
  '--portal-primary',
  '--portal-primary-strong',
  '--portal-primary-soft',
  '--portal-accent',
  '--portal-success',
  '--portal-warning',
  '--portal-danger',
  '--portal-code-bg',
  '--portal-ring',
] as const;

/** Surfaces and text roles whose dark value must differ from the light one. */
const REMAPPED = [
  '--portal-canvas',
  '--portal-surface',
  '--portal-surface-2',
  '--portal-border',
  '--portal-code-bg',
  '--portal-ink',
  '--portal-body',
  '--portal-muted',
] as const;

/** The only documented literals: the theme's dark canvas and dark code surface. */
const CANVAS_LITERALS = ['#020d1a', '#0b1624'];

function read(path: string): string {
  return readFileSync(path, 'utf8');
}

function block(css: string, selector: RegExp): string {
  const match = selector.exec(css);
  if (match === null) throw new Error(`selector ${String(selector)} is missing`);
  const open = css.indexOf('{', match.index);
  const close = css.indexOf('}', open);
  if (open === -1 || close === -1) throw new Error(`selector ${String(selector)} is unterminated`);
  return css.slice(open + 1, close);
}

function declarations(body: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of body.split(';')) {
    const index = entry.indexOf(':');
    if (index === -1) continue;
    const name = entry.slice(0, index).trim();
    map.set(name, entry.slice(index + 1).trim());
  }
  return map;
}

function tokenColors(): Map<string, string> {
  const map = new Map<string, string>();
  for (const match of read(TOKENS_CSS).matchAll(/--color-([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) {
    map.set(`--color-${match[1]}`, match[2]);
  }
  return map;
}

function resolve(value: string | undefined, tokens: Map<string, string>): string {
  if (value === undefined) throw new Error('role is missing');
  const reference = /var\((--color-[\w-]+)\)/.exec(value);
  if (reference !== null) {
    const hex = tokens.get(reference[1]);
    if (hex === undefined) throw new Error(`unknown token ${reference[1]}`);
    return hex;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
  throw new Error(`value has no resolvable colour: ${value}`);
}

function channel(value: number): number {
  const ratio = value / 255;
  return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

function contrast(foreground: string, background: string): number {
  const first = luminance(foreground);
  const second = luminance(background);
  const [high, low] = first > second ? [first, second] : [second, first];
  return (high + 0.05) / (low + 0.05);
}

function filesUnder(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

function lightRoles(): Map<string, string> {
  return declarations(block(read(PORTAL_CSS), /^:root\s*\{/m));
}

function darkRoles(): Map<string, string> {
  return declarations(block(read(PORTAL_CSS), /^\.dark\s*\{/m));
}

describe('portal visual layer', () => {
  it('maps every portal role to a token and keeps the components free of hex literals', () => {
    const css = read(PORTAL_CSS);
    const light = declarations(block(css, /^:root\s*\{/m));
    const dark = declarations(block(css, /^\.dark\s*\{/m));
    const tokens = tokenColors();

    const literals: string[] = [];
    for (const role of ROLES) {
      for (const [theme, values] of [
        ['light', light],
        ['dark', dark],
      ] as const) {
        const value = values.get(role);
        expect(value, `${role} is not declared in ${theme}`).toBeDefined();
        const reference = /var\((--color-[\w-]+)\)/.exec(value ?? '');
        if (reference !== null) {
          expect(
            tokens.get(reference[1]),
            `${role} references unknown ${reference[1]}`,
          ).toBeDefined();
          continue;
        }
        literals.push((value ?? '').toLowerCase());
      }
    }
    expect(literals.sort()).toEqual(CANVAS_LITERALS);

    const literal = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|\brgba?\(|\bhsla?\(/g;
    const violations = filesUnder(PORTAL_SRC)
      .filter((file) => /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file))
      .flatMap((file) => {
        const matches = read(file).match(literal) ?? [];
        return matches.map((found) => `${relative(ROOT, file)}: ${found}`);
      });
    expect(violations).toEqual([]);
  });

  it('uses Satoshi for body and the mono stack for code', () => {
    const css = read(PORTAL_CSS);
    const sans = lightRoles().get('--font-sans');
    expect(sans).toContain('var(--font-satoshi)');
    expect(sans).toMatch(/'Satoshi'/);
    for (const fallback of ['ui-sans-serif', 'system-ui', 'sans-serif']) {
      expect(sans).toContain(fallback);
    }

    const body = /body\s*\{([^}]*)\}/.exec(css);
    expect(body).not.toBeNull();
    expect(declarations(body?.[1] ?? '').get('font-family')).toBe('var(--font-sans)');

    const code = /code,\s*kbd,\s*pre,\s*samp\s*\{([^}]*)\}/.exec(css);
    expect(code).not.toBeNull();
    expect(declarations(code?.[1] ?? '').get('font-family')).toBe(
      'ui-monospace, SFMono-Regular, Menlo, monospace',
    );
  });

  it('keeps body contrast at 4.5:1 in both themes', () => {
    const tokens = tokenColors();
    for (const [theme, roles] of [
      ['light', lightRoles()],
      ['dark', darkRoles()],
    ] as const) {
      const body = resolve(roles.get('--portal-body'), tokens);
      const ink = resolve(roles.get('--portal-ink'), tokens);
      for (const surface of [
        '--portal-canvas',
        '--portal-surface',
        '--portal-surface-2',
      ] as const) {
        const background = resolve(roles.get(surface), tokens);
        expect(contrast(body, background), `${theme} body on ${surface}`).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(contrast(ink, background), `${theme} ink on ${surface}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('keeps every surface mapped in dark', () => {
    const css = read(PORTAL_CSS);
    const light = declarations(block(css, /^:root\s*\{/m));
    const dark = declarations(block(css, /^\.dark\s*\{/m));

    for (const role of REMAPPED) {
      const value = dark.get(role);
      expect(value, `${role} is missing in dark`).toBeDefined();
      expect(value?.toLowerCase(), `${role} still holds the light value`).not.toBe(
        light.get(role)?.toLowerCase(),
      );
    }
  });
});
