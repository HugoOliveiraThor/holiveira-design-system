import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { CANONICAL, REQUIRED, checkDocuments } from './check-docs';

const ROOT = process.cwd();
const GETTING_STARTED = join('apps', 'storybook', 'stories', 'GettingStarted.mdx');
const created: string[] = [];

interface DocsFixture {
  readme?: string;
  contributing?: string;
  gettingStarted?: string;
}

const FIXTURE_README = [
  '# Fixture',
  '',
  `- [Storybook](${CANONICAL.storybook})`,
  `- [Getting Started](${CANONICAL.gettingStarted})`,
  `- [Playground](${CANONICAL.playground})`,
  `- [Repository](${CANONICAL.repository})`,
  '',
].join('\n');

const FIXTURE_CONTRIBUTING = `[Storybook](${CANONICAL.storybook})\n[Playground](${CANONICAL.playground})\n`;

const FIXTURE_GETTING_STARTED = [
  '# Getting Started',
  '',
  `- [Storybook](${CANONICAL.storybook})`,
  `- [Playground](${CANONICAL.playground})`,
  `- [Repository](${CANONICAL.repository})`,
  '',
].join('\n');

/** The four tracked documents, without the portal URL unless a fixture adds it. */
function createDocsFixture(options: DocsFixture = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'ho-docs-links-'));
  created.push(root);
  const documents: Record<string, string> = {
    'README.md': options.readme ?? FIXTURE_README,
    'CONTRIBUTING.md': options.contributing ?? FIXTURE_CONTRIBUTING,
    'CHANGELOG.md': '# Changelog\n',
    [GETTING_STARTED]: options.gettingStarted ?? FIXTURE_GETTING_STARTED,
  };
  for (const [file, content] of Object.entries(documents)) {
    const absolute = join(root, file);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
  return root;
}

afterEach(() => {
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('check-docs', () => {
  it('requires the docs url in the readme and storybook', () => {
    expect(CANONICAL.docs).toBe('https://hugooliveirathor.github.io/holiveira-design-system/docs/');
    expect(REQUIRED['README.md']).toContain('docs');
    expect(REQUIRED[GETTING_STARTED]).toContain('docs');

    const fixture = createDocsFixture();
    const missing = checkDocuments(fixture).findings.filter(
      (finding) => finding.kind === 'missing-url' && finding.detail === CANONICAL.docs,
    );
    expect(missing.map((finding) => finding.file).sort()).toEqual(
      ['README.md', GETTING_STARTED].sort(),
    );

    const real = checkDocuments(ROOT);
    expect(real.missingFiles).toEqual([]);
    expect(real.findings.filter((finding) => finding.kind === 'missing-url')).toEqual([]);
  });

  it('links the portal from the readme', () => {
    const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');

    expect(readme).toContain(CANONICAL.docs);
    expect(readme).toContain(CANONICAL.storybook);
    expect(readme).toContain(CANONICAL.playground);
    const live = /## Live\n([\s\S]*?)\n## /.exec(readme);
    expect(live?.[1]).toContain(CANONICAL.docs);
  });

  it('links the portal from the getting started page', () => {
    const gettingStarted = readFileSync(join(ROOT, GETTING_STARTED), 'utf8');

    expect(gettingStarted).toContain(CANONICAL.docs);
    expect(gettingStarted).toContain(CANONICAL.playground);
    const live = /## Live\n([\s\S]*?)\n## /.exec(gettingStarted);
    expect(live?.[1]).toContain(CANONICAL.docs);
  });

  it('keeps the existing public urls', () => {
    expect(CANONICAL).toEqual({
      storybook: 'https://hugooliveirathor.github.io/holiveira-design-system/',
      gettingStarted:
        'https://hugooliveirathor.github.io/holiveira-design-system/?path=/docs/getting-started--docs',
      playground: 'https://hugooliveirathor.github.io/holiveira-design-system/playground/',
      docs: 'https://hugooliveirathor.github.io/holiveira-design-system/docs/',
      repository: 'https://github.com/HugoOliveiraThor/holiveira-design-system',
      issues: 'https://github.com/HugoOliveiraThor/holiveira-design-system/issues',
    });

    expect(REQUIRED['README.md']).toEqual(
      expect.arrayContaining(['storybook', 'gettingStarted', 'playground', 'docs', 'repository']),
    );
    expect(REQUIRED['CONTRIBUTING.md']).toEqual(
      expect.arrayContaining(['storybook', 'playground']),
    );
    expect(REQUIRED[GETTING_STARTED]).toEqual(
      expect.arrayContaining(['storybook', 'playground', 'docs', 'repository']),
    );

    const report = checkDocuments(ROOT);
    expect(
      report.findings.filter(
        (finding) => finding.kind === 'missing-url' || finding.kind === 'legacy',
      ),
    ).toEqual([]);
  });
});
