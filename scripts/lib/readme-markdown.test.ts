import { describe, expect, it } from 'vitest';

import {
  countStatements,
  inferKind,
  MarkdownError,
  parseMarkdown,
  publicApiNames,
  type MarkdownDoc,
} from './readme-markdown';

const FILE = 'packages/example/README.md';

function doc(text: string, file = FILE): MarkdownDoc {
  return parseMarkdown(file, text);
}

const DOCUMENT = [
  '# @ho-dev/example',
  '',
  '<!-- the intro has `NotAnExport` in prose, which the gate must ignore -->',
  '',
  '```bash',
  'pnpm add @ho-dev/example',
  '```',
  '',
  '## Usage',
  '',
  '```tsx',
  'const value = 1;',
  '```',
  '',
  '## Public API',
  '',
  '- `Button`, `ButtonProps` — primary action (renamed from `LegacyButton`)',
  '- `Tabs`, `TabsList`,',
  '  `TabsContent` — tab parts',
  '',
  '| Export | Kind      |',
  '| ------ | --------- |',
  '| `Card` | component |',
  '',
  '| Option   | Type   |',
  '| -------- | ------ |',
  '| `locale` | string |',
  '',
  '```ts',
  'type Locale = string;',
  'function formatDate(date: string): string;',
  '```',
  '',
  '## License',
  '',
  'MIT.',
].join('\n');

describe('readme markdown', () => {
  it('records every fenced block with its language and first content line', () => {
    const parsed = doc(DOCUMENT);
    expect(parsed.blocks).toEqual([
      { lang: 'bash', code: 'pnpm add @ho-dev/example', line: 6 },
      { lang: 'tsx', code: 'const value = 1;', line: 12 },
      {
        lang: 'ts',
        code: 'type Locale = string;\nfunction formatDate(date: string): string;',
        line: 30,
      },
    ]);
  });

  it('keeps each level-two section heading and its body', () => {
    const parsed = doc(DOCUMENT);
    expect(parsed.sections.map((section) => [section.heading, section.line])).toEqual([
      ['Usage', 9],
      ['Public API', 15],
      ['License', 34],
    ]);
    const api = parsed.sections[1];
    expect(api.body[1]).toBe(
      '- `Button`, `ButtonProps` — primary action (renamed from `LegacyButton`)',
    );
    expect(api.body).toHaveLength(18);
  });

  it('does not treat a heading inside a fence as a section', () => {
    const parsed = doc(['```md', '## Not A Section', '```', '## Real', '', 'Body.'].join('\n'));
    expect(parsed.sections.map((section) => section.heading)).toEqual(['Real']);
    expect(parsed.blocks[0].code).toBe('## Not A Section');
  });

  it('reads the identifiers a Public API section documents', () => {
    expect(publicApiNames(doc(DOCUMENT))).toEqual([
      { name: 'Button', line: 17 },
      { name: 'ButtonProps', line: 17 },
      { name: 'Tabs', line: 18 },
      { name: 'TabsList', line: 18 },
      { name: 'TabsContent', line: 18 },
      { name: 'Card', line: 23 },
      { name: 'Locale', line: 30 },
      { name: 'formatDate', line: 31 },
    ]);
  });

  it('reads only the bullet before the em dash and the first table cell', () => {
    const names = publicApiNames(doc(DOCUMENT)).map((entry) => entry.name);
    expect(names).not.toContain('LegacyButton');
    expect(names).not.toContain('NotAnExport');
    expect(names).not.toContain('locale');
    expect(names).not.toContain('Type');
  });

  it('strips generics and argument lists from a documented name', () => {
    const text = [
      '## Public API',
      '',
      '- `cn(...inputs)` — class names',
      '- `VariantProps<T>` — cva type',
      '- `--color-primary` — a CSS custom property, not an export',
      '',
    ].join('\n');
    expect(publicApiNames(doc(text)).map((entry) => entry.name)).toEqual(['cn', 'VariantProps']);
  });

  it('ignores a table whose first column is not Export', () => {
    const text = [
      '## Public API',
      '',
      '| Provider | Owner |',
      '| -------- | ----- |',
      '| `Theme`  | app   |',
      '',
    ].join('\n');
    expect(publicApiNames(doc(text))).toEqual([]);
  });

  it('returns nothing when the document has no Public API section', () => {
    expect(publicApiNames(doc('## Usage\n\n```ts\nconst a = 1;\n```\n'))).toEqual([]);
  });

  it('reports a hard-coded count outside a fence only', () => {
    const text = [
      '## Purpose',
      '',
      'Ships 12 exports today.',
      '',
      '```text',
      'The 40 exports total.',
      '```',
      '',
      'Buttons come in 3 sizes.',
    ].join('\n');
    expect(countStatements(doc(text))).toEqual([{ line: 3, text: 'Ships 12 exports today.' }]);
  });

  it('reports the count in a heading and a note', () => {
    const text = ['## Public API (2 exports)', '', '(4 components total at v0.1.0)'].join('\n');
    expect(countStatements(doc(text)).map((statement) => statement.line)).toEqual([1, 3]);
  });

  it('does not count a number that names variants, shapes or sizes', () => {
    const text = 'Buttons come in 6 variants, 3 shapes and 2 sizes.';
    expect(countStatements(doc(text))).toEqual([]);
  });

  it('fails an unterminated fence naming the file and line', () => {
    const text = ['# Example', '', '```ts', 'const a = 1;'].join('\n');
    expect(() => doc(text, 'packages/broken/README.md')).toThrow(MarkdownError);
    try {
      doc(text, 'packages/broken/README.md');
    } catch (error) {
      expect(error).toBeInstanceOf(MarkdownError);
      expect((error as MarkdownError).file).toBe('packages/broken/README.md');
      expect((error as MarkdownError).line).toBe(3);
      expect((error as MarkdownError).message).toContain('packages/broken/README.md:3');
      expect((error as MarkdownError).message).toContain('unterminated code fence');
    }
  });

  it('infers the document kind from the file name', () => {
    expect(inferKind('packages/ui/README.md')).toBe('readme');
    expect(inferKind('docs/architecture/contracts/ui.md')).toBe('contract');
    const parsed = parseMarkdown('packages/ui/README.md', '# @ho-dev/ui', {
      packageName: '@ho-dev/ui',
    });
    expect(parsed.kind).toBe('readme');
    expect(parsed.packageName).toBe('@ho-dev/ui');
  });

  it('keeps every source line for whole-document rules', () => {
    expect(doc('# Example\n\nBody.\n').lines).toEqual(['# Example', '', 'Body.', '']);
  });
});
