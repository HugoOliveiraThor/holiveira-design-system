import { readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import {
  depVersion,
  elapsedMs,
  nowIso,
  writeGateReport,
  type GateItem,
  type GateStatus,
} from './lib/gate-report';
import { CODE_LANGUAGES, parseMarkdown, type MarkdownDoc } from './lib/readme-markdown';
import {
  createVirtualProgram,
  discoverPackages,
  exportMap,
  ReadmeProgramError,
  type BlockSource,
  type PackageDocSource,
} from './lib/readme-program';
import { runReadmeRules, type Finding } from './lib/readme-rules';

/**
 * Package documentation gate.
 *
 * Reads every `packages/<pkg>/README.md` and `docs/architecture/contracts/<pkg>.md`,
 * compiles their TypeScript blocks in a virtual program, and enforces the readme
 * rules: named imports exist, documented identifiers exist, no hard-coded export
 * or component count, one `## Public API` per contract, and every cited
 * repository path resolves.
 *
 * Writes `reports/gates/docs-readme.json` and nothing else.
 * Exit codes: 0 = every rule holds, 1 = at least one finding, 2 = structural error.
 *
 * `--filter <package>` (repeatable, comma-separated) limits the run to those
 * packages and their contracts. `HO_README_ROOT` overrides the repository root,
 * the same way `HO_GATES_DIR` overrides the report directory.
 */

const ROOT = process.env.HO_README_ROOT ?? join(__dirname, '..');
const VERBOSE = process.env.CHECK_VERBOSE === 'true';
const GATE = 'docs-readme';

function filtersFrom(argv: string[]): string[] {
  const filters: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--filter') {
      const value = argv[index + 1];
      if (value !== undefined) filters.push(...value.split(','));
      index += 1;
      continue;
    }
    if (arg.startsWith('--filter=')) filters.push(...arg.slice('--filter='.length).split(','));
  }
  return filters.map((value) => value.trim()).filter((value) => value.length > 0);
}

function packageDirOf(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

function matches(packageName: string, filters: string[]): boolean {
  const dir = packageDirOf(packageName);
  return filters.some((filter) => filter === packageName || filter === dir);
}

function relativePath(absolute: string): string {
  return relative(ROOT, absolute).split(sep).join('/');
}

function readDoc(source: PackageDocSource, file: string, kind: 'readme' | 'contract'): MarkdownDoc {
  return parseMarkdown(relativePath(file), readFileSync(file, 'utf8'), {
    kind,
    packageName: source.name,
  });
}

function docsOf(source: PackageDocSource): MarkdownDoc[] {
  const docs = [readDoc(source, source.readme, 'readme')];
  if (source.contract !== undefined) docs.push(readDoc(source, source.contract, 'contract'));
  return docs;
}

function report(
  status: GateStatus,
  executed: boolean,
  startedAt: string,
  items: GateItem[],
  error?: string,
): void {
  writeGateReport({
    gate: GATE,
    status,
    executed,
    tool: 'typescript',
    toolVersion: depVersion('typescript'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items,
    ...(error === undefined ? {} : { error }),
  });
}

function main(): number {
  const startedAt = nowIso();
  const filters = filtersFrom(process.argv.slice(2));

  let findings: Finding[];
  let selected: PackageDocSource[];
  let docs: MarkdownDoc[];
  let blockCount: number;

  try {
    const packages = discoverPackages(ROOT);
    selected =
      filters.length === 0 ? packages : packages.filter((source) => matches(source.name, filters));
    if (selected.length === 0) {
      throw new ReadmeProgramError(`--filter matched no package: ${filters.join(', ')}`);
    }

    docs = selected.flatMap(docsOf);
    const blocks: BlockSource[] = docs.flatMap((doc) =>
      doc.blocks
        .filter((block) => CODE_LANGUAGES.has(block.lang))
        .map((block) => ({ file: doc.file, block })),
    );
    blockCount = blocks.length;

    const program = createVirtualProgram({ root: ROOT, blocks, packages });
    const exports = exportMap(program, packages);
    findings = runReadmeRules({ root: ROOT, docs, exports, program });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`FAIL structural: ${message}`);
    report('error', false, startedAt, [{ name: GATE, status: 'error', detail: message }], message);
    return 2;
  }

  const contractCount = docs.filter((doc) => doc.kind === 'contract').length;
  const summary = `${selected.length} packages, ${contractCount} contracts, ${blockCount} blocks, ${findings.length} findings`;

  if (VERBOSE) {
    for (const doc of docs) console.log(`  ok  ${doc.file}`);
  }

  if (findings.length > 0) {
    for (const finding of findings) {
      console.error(`FAIL ${finding.rule}: ${finding.file}:${finding.line} — ${finding.message}`);
    }
    console.error(`\ncheck:docs:readme — ${findings.length} finding(s) in ${summary}`);
    report(
      'fail',
      true,
      startedAt,
      findings.map((finding) => ({
        name: finding.rule,
        status: 'fail',
        detail: `${finding.file}:${finding.line} ${finding.message}`,
        evidence: { file: finding.file, line: finding.line },
      })),
    );
    return 1;
  }

  report('pass', true, startedAt, [
    {
      name: GATE,
      status: 'pass',
      detail: `${summary}, ${blockCount} blocks`,
      evidence: { packages: selected.length, contracts: contractCount, blocks: blockCount },
    },
  ]);
  console.log(`✓ docs readme current: ${summary}`);
  return 0;
}

const code = main();
process.exit(code);
