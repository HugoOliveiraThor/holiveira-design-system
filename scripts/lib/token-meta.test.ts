import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { categoryOf, checkTokenMeta, readTokenMeta, validateTokenMeta } from './token-meta';
import { parseTheme, type TokenSurface } from './token-surface';
import { createTokenFixture, defaultSurface } from './test-fixtures/token-root';

const ROOT = process.cwd();

function realSurface(): TokenSurface {
  const css = parseTheme(
    readFileSync(join(ROOT, 'packages', 'tokens', 'src', 'tokens.css'), 'utf8'),
  );
  const snapshot = JSON.parse(
    readFileSync(join(ROOT, 'packages', 'tokens', 'tokens.snapshot.json'), 'utf8'),
  ) as { ts: Record<string, string> };
  return { css, ts: snapshot.ts };
}

function surface(css: Record<string, string>): TokenSurface {
  return { css, ts: {} };
}

describe('token metadata', () => {
  it('ships metadata for the required categories', () => {
    const meta = checkTokenMeta(ROOT, realSurface());
    expect(meta.requiredCategories).toEqual(['typography', 'shadows', 'breakpoints']);
    expect(Object.keys(meta.tokens)).toHaveLength(46);

    const counts = new Map<string, number>();
    for (const [name, entry] of Object.entries(meta.tokens)) {
      expect(entry.description.trim().length).toBeGreaterThan(0);
      expect(entry.category).toBe(categoryOf(name));
      counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
    }
    expect(counts.get('typography')).toBe(19);
    expect(counts.get('shadows')).toBe(24);
    expect(counts.get('breakpoints')).toBe(3);

    for (const name of Object.keys(realSurface().css)) {
      const category = categoryOf(name);
      if (category === null || !meta.requiredCategories.includes(category)) continue;
      expect(meta.tokens).toHaveProperty(name);
    }
  });

  it('rejects malformed metadata', () => {
    expect(() => readTokenMeta(createTokenFixture({ meta: '{not json' }).root)).toThrow(
      /not valid JSON/,
    );
    expect(() => readTokenMeta(createTokenFixture({ meta: null }).root)).toThrow(
      /metadata missing/,
    );
    expect(() => validateTokenMeta({ tokens: {} }, defaultSurface())).toThrow(/requiredCategories/);
    expect(() =>
      validateTokenMeta({ requiredCategories: [], tokens: [] }, defaultSurface()),
    ).toThrow(/"tokens" must be an object/);
  });

  it('rejects an entry without category or description', () => {
    const live = surface({ '--color-a': '#000' });
    expect(() =>
      validateTokenMeta(
        { requiredCategories: [], tokens: { '--color-a': { category: '', description: 'x' } } },
        live,
      ),
    ).toThrow(/has no category/);
    expect(() =>
      validateTokenMeta(
        { requiredCategories: [], tokens: { '--color-a': { category: 'colors' } } },
        live,
      ),
    ).toThrow(/has no description/);
  });

  it('rejects a metadata key that is not a declared token', () => {
    expect(() =>
      validateTokenMeta(
        {
          requiredCategories: [],
          tokens: { '--color-nope': { category: 'colors', description: 'x' } },
        },
        surface({ '--color-a': '#000' }),
      ),
    ).toThrow(/not a declared token/);
  });

  it('requires a metadata entry for every required token', () => {
    expect(() =>
      validateTokenMeta(
        { requiredCategories: ['typography'], tokens: {} },
        surface({ '--text-heading-1': '60px' }),
      ),
    ).toThrow(/missing an entry for "--text-heading-1"/);
  });

  it('allows entries outside the required categories', () => {
    const meta = validateTokenMeta(
      {
        requiredCategories: ['typography'],
        tokens: {
          '--text-heading-1': { category: 'typography', description: 'Heading 1.' },
          '--color-a': { category: 'colors', description: 'A color.' },
        },
      },
      surface({ '--text-heading-1': '60px', '--color-a': '#000' }),
    );
    expect(Object.keys(meta.tokens)).toEqual(['--text-heading-1', '--color-a']);
  });

  it('keeps the metadata out of the published files', () => {
    const manifest = JSON.parse(
      readFileSync(join(ROOT, 'packages', 'tokens', 'package.json'), 'utf8'),
    ) as { files: string[] };
    expect(manifest.files).not.toContain('tokens.meta.json');
  });
});
