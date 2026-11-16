import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { guideDocs } from '../../content/guides';
import { packages } from '../docs-metadata-query';

import { assertGuideCoverage } from './coverage';
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
    expect(validated).toHaveLength(12);
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

  it('covers every guide route the portal serves', () => {
    expect(guideDocs.map((record) => record.slug).sort()).toEqual([...GUIDE_ROUTES].sort());
  });

  it('references every snippet once and leaves no orphan', () => {
    const referenced = guideDocs.flatMap((record) => record.snippets);
    expect(referenced.sort()).toEqual(guideExamples.map((example) => example.path).sort());
    expect(new Set(referenced).size).toBe(guideDocs.length);
  });

  it('fails when a snippet belongs to no guide', () => {
    const snippets = [
      ...guideExamples.map((example) => example.path),
      'apps/docs/src/examples/guides/orphan.tsx',
    ];
    expect(() =>
      assertGuideCoverage({
        guides: guideDocs,
        snippets,
        packages: context().packages,
        componentExports: context().componentExports,
      }),
    ).toThrow(/snippet apps\/docs\/src\/examples\/guides\/orphan.tsx is referenced by no guide/);
  });

  it('cites the dependency ownership spec and the contracts directory in the architecture guide', () => {
    const record = bySlug('architecture');
    expect(record.sources).toContain('docs/superpowers/specs/dependency-ownership-architecture.md');
    expect(record.sources.some((source) => source.startsWith('docs/architecture/contracts/'))).toBe(
      true,
    );
    expect(prose(record)).toContain('Level 0');
  });
});
