import { describe, expect, it } from 'vitest';

import { parseMarkdown, type MarkdownDoc } from './readme-markdown';
import { createVirtualProgram, discoverPackages, exportMap } from './readme-program';
import {
  checkCompiles,
  checkCounts,
  checkDuplicateSections,
  checkImports,
  checkPaths,
  checkPublicApi,
  RULES,
  runReadmeRules,
  type Finding,
  type RuleName,
} from './readme-rules';

const ROOT = process.cwd();
const packages = discoverPackages(ROOT);

const BLOCKS = [
  {
    file: 'packages/fixture/README.md',
    block: {
      lang: 'ts',
      code: "import { Ghost } from '@ho-dev/ui';\n\nexport const value = Ghost;",
      line: 10,
    },
  },
  {
    file: 'packages/fixture/README.md',
    block: { lang: 'ts', code: "export const broken: number = 'text';", line: 20 },
  },
  {
    file: 'packages/fixture/README.md',
    block: { lang: 'ts', code: 'export const value = NeverDeclared;', line: 30 },
  },
  {
    file: 'packages/fixture/README.md',
    block: {
      lang: 'ts',
      code: "import { helper } from './missing-helper';\n\nexport const value = helper;",
      line: 40,
    },
  },
  {
    file: 'packages/fixture-clean/README.md',
    block: {
      lang: 'ts',
      code: "import { Card } from '@ho-dev/ui';\n\nexport const card = Card;",
      line: 60,
    },
  },
];

const program = createVirtualProgram({ root: ROOT, blocks: BLOCKS, packages });
const exports = exportMap(program, packages);

function doc(
  text: string,
  file = 'packages/ui/README.md',
  packageName = '@ho-dev/ui',
): MarkdownDoc {
  return parseMarkdown(file, text, { kind: 'readme', packageName });
}

const uiReadme = doc(
  [
    '# @ho-dev/ui',
    '',
    '## Public API',
    '',
    '| Export   | Kind      |',
    '| -------- | --------- |',
    '| `Card`   | component |',
    '| `Ghost`  | component |',
    '',
  ].join('\n'),
);

const noApiReadme = doc(['# @ho-dev/ui', '', '## Usage', '', 'Install it.', ''].join('\n'));

const countDoc = doc(['# @ho-dev/ui', '', 'Ships 12 exports today.', ''].join('\n'));

const duplicateDoc = parseMarkdown(
  'docs/architecture/contracts/ui.md',
  [
    '# Package Contract: @ho-dev/ui',
    '',
    '## Public API',
    '',
    '- `Card`',
    '',
    '## Internal API',
    '',
    '## Public API',
    '',
    '- `Card`',
    '',
  ].join('\n'),
);

const pathDoc = doc(
  [
    '# @ho-dev/ui',
    '',
    'See `docs/does-not-exist.md` for details.',
    '',
    'The real file is `packages/ui/README.md`.',
    '',
  ].join('\n'),
);

const cleanReadme = doc(
  [
    '# @ho-dev/ui',
    '',
    '## Public API',
    '',
    '| Export      | Kind      |',
    '| ----------- | --------- |',
    '| `Card`      | component |',
    '| `CardProps` | type      |',
    '',
    'See `packages/ui/README.md` and `docs/architecture/contracts/ui.md`.',
    '',
  ].join('\n'),
);

const CLEAN_FILE = 'packages/fixture-clean/README.md';

function forFile(findings: Finding[], file: string): Finding[] {
  return findings.filter((finding) => finding.file === file);
}

describe('readme rules', () => {
  it('names the file, line and diagnostic', () => {
    const findings = forFile(checkCompiles(program), 'packages/fixture/README.md').filter(
      (finding) => finding.line === 20,
    );
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('compile');
    expect(findings[0].message).toContain('TS2322');
    expect(findings[0].message).toContain("Type 'string' is not assignable to type 'number'");
  });

  it('names the identifier a block never declares', () => {
    const findings = forFile(checkCompiles(program), 'packages/fixture/README.md').filter(
      (finding) => finding.line === 30,
    );
    expect(findings).toHaveLength(1);
    expect(findings[0].message).toContain('TS2304');
    expect(findings[0].message).toContain("Cannot find name 'NeverDeclared'");
  });

  it('rejects a named import the package does not export', () => {
    const findings = checkImports(program, exports);
    expect(findings).toContainEqual({
      rule: 'import',
      file: 'packages/fixture/README.md',
      line: 10,
      message: "@ho-dev/ui does not export 'Ghost'",
    });
  });

  it('rejects a relative import that does not resolve', () => {
    const findings = checkImports(program, exports);
    expect(findings).toContainEqual({
      rule: 'import',
      file: 'packages/fixture/README.md',
      line: 40,
      message: "relative import './missing-helper' does not resolve",
    });
  });

  it('rejects a documented name missing from the barrel', () => {
    const findings = checkPublicApi([uiReadme], exports);
    expect(findings).toEqual([
      {
        rule: 'public-api',
        file: 'packages/ui/README.md',
        line: 8,
        message: "@ho-dev/ui does not export 'Ghost' documented under Public API",
      },
    ]);
  });

  it('requires a public api section for a runtime package', () => {
    const findings = checkPublicApi([noApiReadme], exports);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('missing-api');
    expect(findings[0].file).toBe('packages/ui/README.md');
    expect(findings[0].message).toContain('@ho-dev/ui');
    expect(findings[0].message).toContain('no');
  });

  it('exempts a type-only package from the public api section', () => {
    const typesReadme = doc('# @ho-dev/types\n', 'packages/types/README.md', '@ho-dev/types');
    expect(checkPublicApi([typesReadme], exports)).toEqual([]);
  });

  it('rejects a hard-coded export count', () => {
    expect(checkCounts([countDoc])).toEqual([
      {
        rule: 'counts',
        file: 'packages/ui/README.md',
        line: 3,
        message: "states a hard-coded count: 'Ships 12 exports today.'",
      },
    ]);
  });

  it('rejects a second public api heading', () => {
    const findings = checkDuplicateSections([duplicateDoc]);
    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({
      rule: 'duplicate-api',
      file: 'docs/architecture/contracts/ui.md',
      line: 3,
    });
    expect(findings[0].message).toContain('3, 9');
  });

  it('rejects a repository path that does not exist', () => {
    expect(checkPaths([pathDoc], ROOT)).toEqual([
      {
        rule: 'paths',
        file: 'packages/ui/README.md',
        line: 3,
        message: "cited path 'docs/does-not-exist.md' does not exist",
      },
    ]);
  });

  it('reports every finding in one run', () => {
    const findings = runReadmeRules({
      root: ROOT,
      docs: [uiReadme, countDoc, pathDoc],
      exports,
      program,
    });
    const rules = new Set(findings.map((finding) => finding.rule));
    expect(rules).toEqual(
      new Set(['compile', 'import', 'public-api', 'missing-api', 'counts', 'paths']),
    );
    expect(findings.length).toBeGreaterThan(5);
    const ordered = findings.map((finding) => [finding.file, finding.line]);
    const sorted = [...ordered].sort(
      (left, right) =>
        left[0].localeCompare(right[0] as string) || Number(left[1]) - Number(right[1]),
    );
    expect(ordered).toEqual(sorted);
  });

  it('produces the same findings twice', () => {
    const input = { root: ROOT, docs: [uiReadme, countDoc, pathDoc], exports, program };
    const first = runReadmeRules(input);
    const second = runReadmeRules(input);
    expect(first.length).toBeGreaterThan(0);
    expect(second).toEqual(first);
  });

  it('every rule has a failing fixture', () => {
    const fixtures: Record<RuleName, () => Finding[]> = {
      compile: () => checkCompiles(program),
      import: () => checkImports(program, exports),
      'public-api': () => checkPublicApi([uiReadme], exports),
      'missing-api': () => checkPublicApi([noApiReadme], exports),
      counts: () => checkCounts([countDoc]),
      'duplicate-api': () => checkDuplicateSections([duplicateDoc]),
      paths: () => checkPaths([pathDoc], ROOT),
    };
    for (const rule of RULES) {
      const findings = fixtures[rule]();
      expect(findings.length, rule).toBeGreaterThan(0);
      expect(
        findings.every((finding) => finding.rule === rule),
        rule,
      ).toBe(true);
    }
    expect(Object.keys(fixtures).sort()).toEqual([...RULES].sort());
  });

  it('accepts a fixture that satisfies every rule', () => {
    const clean = forFile(checkCompiles(program), CLEAN_FILE);
    expect(clean).toEqual([]);
    expect(forFile(checkImports(program, exports), CLEAN_FILE)).toEqual([]);
    expect(checkPublicApi([cleanReadme], exports)).toEqual([]);
    expect(checkCounts([cleanReadme])).toEqual([]);
    expect(checkDuplicateSections([cleanReadme])).toEqual([]);
    expect(checkPaths([cleanReadme], ROOT)).toEqual([]);
  });
});
