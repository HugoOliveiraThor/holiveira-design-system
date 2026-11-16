import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  CODE_LANGUAGES,
  countStatements,
  parseMarkdown,
  type MarkdownDoc,
} from './readme-markdown';
import { createVirtualProgram, discoverPackages } from './readme-program';
import { checkCompiles } from './readme-rules';

const ROOT = process.cwd();

function read(relative: string): string {
  return readFileSync(join(ROOT, relative), 'utf8');
}

function parse(relative: string): MarkdownDoc {
  return parseMarkdown(relative, read(relative));
}

function codeBlocks(doc: MarkdownDoc): string[] {
  return doc.blocks.filter((block) => CODE_LANGUAGES.has(block.lang)).map((block) => block.code);
}

function rowOf(doc: MarkdownDoc, name: string): string | undefined {
  return doc.lines.find((line) => new RegExp(`^\\|\\s*\`${name}\`\\s*\\|`).test(line));
}

describe('package documentation', () => {
  it('documents ProviderComposer with tree', () => {
    const doc = parse('packages/providers/README.md');
    const [usage] = codeBlocks(doc);
    expect(usage).toMatch(/<ProviderComposer\s+tree=\{/);
    expect(usage).toContain('ProviderTree');
    expect(usage).not.toContain('providers=');
    expect(usage).toContain("from '@ho-dev/theme'");
    expect(usage).toContain("from '@ho-dev/layouts'");
    expect(read('packages/providers/README.md')).not.toContain('AuthProvider');
  });

  it('documents Field without a name prop', () => {
    const readme = read('packages/forms/README.md');
    const doc = parse('packages/forms/README.md');
    const [usage] = codeBlocks(doc);
    expect(usage).toContain('<Field label="Email"');
    expect(usage).not.toMatch(/<Field[^>]*\sname=/);
    for (const prop of ['`label`', '`description`', '`error`', '`children`']) {
      expect(readme).toContain(prop);
    }
  });

  it('shows AreaChart with its label', () => {
    const doc = parse('packages/charts/README.md');
    const [usage] = codeBlocks(doc);
    expect(usage).toContain('m.AreaChart');
    expect(usage).toMatch(/\slabel="[^"]+"/);
    expect(usage).toMatch(/\sdescription="[^"]+"/);
  });

  it('does not claim rhf on Form', () => {
    const contract = parse('docs/architecture/contracts/forms.md');
    const bullet = contract.lines.find((line) => line.startsWith('- `Form`, `FormProps`'));
    expect(bullet).toBeDefined();
    expect(bullet).toContain('plain `form` wrapper');
    expect(bullet).not.toMatch(/RHF|react-hook-form/i);

    const responsibility = contract.lines.find((line) =>
      line.startsWith('- Provide `Form` wrapper'),
    );
    expect(responsibility).toBeDefined();
    expect(responsibility).not.toMatch(/RHF integration/i);

    const readme = parse('packages/forms/README.md');
    const formRow = rowOf(readme, 'Form');
    expect(formRow).toBeDefined();
    expect(formRow).toContain('submit');
    expect(formRow).not.toMatch(/RHF|react-hook-form/i);
  });

  it('lists label and description in the charts contract', () => {
    const doc = parse('docs/architecture/contracts/charts.md');
    const row = doc.lines.find((line) => line.startsWith('| `AreaChartProps`'));
    expect(row).toBeDefined();
    expect(row).toContain('label: string');
    expect(row).toContain('description?: string');
    expect(read('docs/architecture/contracts/charts.md')).not.toMatch(/\b\d+\s+public exports?\b/i);
  });

  it('imports Breadcrumb from primitives', () => {
    const doc = parse('packages/ui/README.md');
    const [usage] = codeBlocks(doc);
    expect(usage).toMatch(/import \{[^}]*Breadcrumb[^}]*\} from '@ho-dev\/primitives'/);
    expect(rowOf(doc, 'Breadcrumb')).toBeUndefined();
    expect(rowOf(doc, 'BreadcrumbProps')).toBeUndefined();
    expect(read('packages/ui/README.md')).not.toMatch(/\|\s*`Breadcrumb`/);
  });

  it('uses an existing Card variant', () => {
    const [usage] = codeBlocks(parse('packages/ui/README.md'));
    expect(usage).toMatch(/<Card variant="(?:default|bordered|ghost)"/);
    expect(usage).not.toContain('variant="outlined"');
  });

  it('imports the Table parts and passes Alert its required props', () => {
    const [usage] = codeBlocks(parse('packages/primitives/README.md'));
    const importClause = usage.slice(0, usage.indexOf("from '@ho-dev/primitives'"));
    for (const part of [
      'Alert',
      'Table',
      'TableBody',
      'TableCell',
      'TableHead',
      'TableHeader',
      'TableRow',
    ]) {
      expect(importClause).toContain(part);
    }
    expect(usage).toMatch(/<Alert[^>]*\stitle="[^"]+"/);
    expect(usage).toMatch(/<Alert[^>]*\sdescription="[^"]+"/);
  });

  it('states no export total in the icons readme', () => {
    const readme = read('packages/icons/README.md');
    expect(countStatements(parse('packages/icons/README.md'))).toEqual([]);
    expect(countStatements(parse('docs/architecture/contracts/icons.md'))).toEqual([]);
    expect(readme).toContain('**Full icon list:**');
    expect(readme).not.toMatch(/\b\d+\s+(?:icon\s+)?components?\b/i);
    expect(readme).not.toMatch(/\b\d+\s+exports?\b/i);
    expect(read('docs/architecture/contracts/icons.md')).not.toContain('components total');
  });

  it('declares a local stub where no real export exists', () => {
    const program = createVirtualProgram({
      root: ROOT,
      packages: discoverPackages(ROOT),
      blocks: [
        {
          file: 'packages/fixture/README.md',
          block: {
            lang: 'tsx',
            code: [
              'function UserMenu() {',
              '  return <nav>menu</nav>;',
              '}',
              '',
              'export const menu = <UserMenu />;',
            ].join('\n'),
            line: 10,
          },
        },
        {
          file: 'packages/fixture-broken/README.md',
          block: { lang: 'tsx', code: 'export const menu = <UserMenu />;', line: 20 },
        },
      ],
    });
    const findings = checkCompiles(program);
    expect(findings.filter((finding) => finding.file === 'packages/fixture/README.md')).toEqual([]);
    const undeclared = findings.filter(
      (finding) => finding.file === 'packages/fixture-broken/README.md',
    );
    expect(undeclared).toHaveLength(1);
    expect(undeclared[0].message).toContain("Cannot find name 'UserMenu'");
  });
});
