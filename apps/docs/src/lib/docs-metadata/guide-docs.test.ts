import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { guideDocs } from '../../content/guides';
import { packages } from '../docs-metadata-query';

import { validateGuideDocs, type GuideDoc } from './guides';
import { GUIDE_ROUTES } from './routes';

const ROOT = process.cwd();

const guideExamples = JSON.parse(
  readFileSync(join(ROOT, 'apps', 'docs', 'src', 'generated', 'guide-examples.json'), 'utf8'),
) as Array<{ path: string; source: string }>;

function context() {
  return {
    packages: packages.map((record) => record.name),
    componentExports: packages.flatMap((record) =>
      record.componentExports.map((component) => ({
        package: record.name,
        exportName: component.exportName,
      })),
    ),
  };
}

function bySlug(slug: string): GuideDoc {
  const record = guideDocs.find((guide) => guide.slug === slug);
  if (record === undefined) throw new Error(`no guide record for ${slug}`);
  return record;
}

function prose(record: GuideDoc): string {
  return [record.summary, ...record.sections.flatMap((section) => section.prose)].join('\n');
}

describe('guide content', () => {
  it('validates every guide record against the model', () => {
    const validated = validateGuideDocs(guideDocs, context());
    expect(validated).toHaveLength(6);
    expect(validated.map((record) => record.slug)).toEqual(guideDocs.map((record) => record.slug));
  });

  it('sorts the guide records by order', () => {
    const orders = guideDocs.map((record) => record.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('the theming guide documents the theme provider and dark class', () => {
    const record = bySlug('getting-started/theming');
    const text = prose(record);
    expect(text).toContain('ThemeProvider');
    expect(text).toContain('@ho-dev/theme');
    expect(text).toContain('.dark');
    expect(text).toContain('import');
    expect(record.sources).toContain('docs/architecture/contracts/theme.md');

    const snippet = guideExamples.find(
      (example) => example.path === 'apps/docs/src/examples/guides/theming.tsx',
    );
    expect(snippet?.source).toContain("from '@ho-dev/theme'");
    expect(record.snippets).toEqual(['apps/docs/src/examples/guides/theming.tsx']);
  });

  it('cites ADS-008 in the accessibility guide', () => {
    const record = bySlug('foundations/accessibility');
    expect(record.sources).toContain('docs/architecture/ads-008-accessibility-excellence.md');
    expect(prose(record)).toContain('WCAG 2.2 Level AA');
  });

  it('references every guide snippet from a real file', () => {
    const paths = new Set(guideExamples.map((example) => example.path));
    for (const record of guideDocs) {
      expect(record.snippets.length).toBeGreaterThan(0);
      for (const path of record.snippets) {
        expect(paths.has(path), `${record.slug} → ${path}`).toBe(true);
      }
    }
  });

  it('uses every guide route the portal has a record for', () => {
    for (const record of guideDocs) {
      expect(GUIDE_ROUTES).toContain(record.slug);
    }
  });
});
