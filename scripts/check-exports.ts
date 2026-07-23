import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

const CONTRACTS_DIR = join(__dirname, '..', 'docs', 'architecture', 'contracts');
const PACKAGES_DIR = join(__dirname, '..', 'packages');

const EXCLUDED_SUBHEADING_KEYWORDS = ['removed', 'deferred', 'deprecated'];

interface Result {
  package: string;
  missing: string[];
  unexpected: string[];
  errors: string[];
}

const KNOWN_ISSUES: Record<string, string[]> = {
  i18n: ['FormatDateOptions', 'FormatCurrencyOptions', 'FormatMessageTimeOptions'],
  icons: ['PascalCaseIconName'],
};

function listContracts(): string[] {
  return readdirSync(CONTRACTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => basename(f, '.md'));
}

function getHeadingDepth(line: string): number {
  const m = line.match(/^(#+)/);
  return m ? m[1].length : 0;
}

function isHeading(line: string): boolean {
  return /^#{2,}\s/.test(line);
}

function isPublicApiHeading(line: string): boolean {
  return /^#{2,}\s/i.test(line) && /public\s*api/i.test(line);
}

function normalizeName(name: string): string {
  return name.replace(/<.+>$/, '');
}

function stripParamList(name: string): string {
  return name.replace(/\(.*\)$/, '').trim();
}

function extractBacktickNames(text: string): string[] {
  const names: string[] = [];
  const regex = /`([^`]+)`/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    let name = match[1].trim();
    name = stripParamList(name);
    if (
      name &&
      !name.includes(' ') &&
      !name.includes('.') &&
      !name.includes('(') &&
      !name.includes(')') &&
      !name.includes('[') &&
      !name.includes(']') &&
      !name.includes('{') &&
      !name.includes('}') &&
      !name.includes('*') &&
      !name.startsWith('-') &&
      !name.startsWith('|')
    ) {
      names.push(name);
    }
  }
  return names;
}

function lineIsPureBacktickList(line: string): boolean {
  const stripped = line.replace(/`[^`]+`/g, '').replace(/[,.\s\u2014\u2013]/g, '');
  return stripped.length === 0;
}

function getHeadingText(line: string): string {
  return line.replace(/^#+\s*/, '');
}

function parseContractItems(md: string): Set<string> {
  const items = new Set<string>();
  const lines = md.split('\n');
  let inPublicApi = false;
  let publicApiDepth = 0;
  let skipSection = false;
  let skipSectionDepth = 99;
  let currentDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) continue;

    if (isPublicApiHeading(trimmed)) {
      currentDepth = getHeadingDepth(trimmed);
      inPublicApi = true;
      publicApiDepth = currentDepth;
      skipSection = false;
      skipSectionDepth = 99;
      continue;
    }

    if (isHeading(trimmed)) {
      if (inPublicApi) {
        currentDepth = getHeadingDepth(trimmed);
        if (currentDepth <= publicApiDepth) {
          inPublicApi = false;
          continue;
        }
        const text = getHeadingText(trimmed).toLowerCase();
        const isExcluded = EXCLUDED_SUBHEADING_KEYWORDS.some((kw) => text.includes(kw));
        if (isExcluded) {
          skipSection = true;
          skipSectionDepth = currentDepth;
        } else if (currentDepth <= skipSectionDepth) {
          skipSection = false;
          skipSectionDepth = 99;
        }
      }
      continue;
    }

    if (!inPublicApi || skipSection) continue;

    if (trimmed.startsWith('- ')) {
      let content = trimmed.slice(2);
      const dashIdx = content.search(/ [\u2014\u2013] /);
      if (dashIdx !== -1) content = content.slice(0, dashIdx);
      const names = extractBacktickNames(content);
      for (const n of names) items.add(n);
      continue;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|') && currentDepth <= publicApiDepth + 1) {
      const firstCol = trimmed.split('|')[1]?.trim();
      if (firstCol) {
        const m = firstCol.match(/^`([^`]+)`$/);
        if (m) items.add(m[1].trim());
      }
      continue;
    }

    if (lineIsPureBacktickList(trimmed)) {
      const names = extractBacktickNames(trimmed);
      for (const n of names) items.add(n);
    }
  }

  return items;
}

function parseContractCodeBlocks(md: string): Set<string> {
  const items = new Set<string>();
  const lines = md.split('\n');
  let inPublicApi = false;
  let publicApiDepth = 0;
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let skipSection = false;
  let skipSectionDepth = 99;

  function flush(): void {
    if (codeContent.length === 0) return;
    const code = codeContent.join('\n');
    for (const m of code.matchAll(/(?:type|interface)\s+(\w+)/g)) items.add(m[1]);
    for (const m of code.matchAll(/function\s+(\w+)/g)) items.add(m[1]);
    codeContent = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```') && !trimmed.startsWith('`````')) {
      if (inCodeBlock) {
        if (inPublicApi && !skipSection) flush();
        else codeContent = [];
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (isPublicApiHeading(trimmed)) {
      inPublicApi = true;
      publicApiDepth = getHeadingDepth(trimmed);
      skipSection = false;
      skipSectionDepth = 99;
      continue;
    }

    if (isHeading(trimmed)) {
      if (inPublicApi) {
        const depth = getHeadingDepth(trimmed);
        if (depth <= publicApiDepth) {
          inPublicApi = false;
          continue;
        }
        const text = getHeadingText(trimmed).toLowerCase();
        const isExcluded = EXCLUDED_SUBHEADING_KEYWORDS.some((kw) => text.includes(kw));
        if (isExcluded) {
          skipSection = true;
          skipSectionDepth = depth;
        } else if (depth <= skipSectionDepth) {
          skipSection = false;
          skipSectionDepth = 99;
        }
      }
      continue;
    }

    if (!inPublicApi || !inCodeBlock || skipSection) continue;

    codeContent.push(trimmed);
  }

  return items;
}

function parseBarrelExports(ts: string): Set<string> {
  const items = new Set<string>();
  const clean = ts.replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  const reExport = /export\s+(?:type\s+)?\{\s*([^}]+)\s*\}\s*from/g;
  let match: RegExpExecArray | null;
  while ((match = reExport.exec(clean)) !== null) {
    const parts = match[1]
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    for (const part of parts) {
      const name = part
        .replace(/^(?:type\s+)?/, '')
        .replace(/\s+as\s+\w+$/, '')
        .trim();
      if (name && !name.includes(' ') && !name.includes('{') && !name.includes('}')) {
        items.add(name);
      }
    }
  }

  const reStandalone = /^export\s+(?:type|const|function|interface|class)\s+(\w+)/gm;
  while ((match = reStandalone.exec(clean)) !== null) {
    items.add(match[1]);
  }

  return items;
}

function main(): void {
  const contracts = listContracts();
  let allPass = true;
  let hasStructuralError = false;
  const results: Result[] = [];

  for (const pkg of contracts) {
    const contractPath = join(CONTRACTS_DIR, `${pkg}.md`);
    const barrelPath = join(PACKAGES_DIR, pkg, 'src', 'index.ts');

    const result: Result = { package: pkg, missing: [], unexpected: [], errors: [] };

    if (!existsSync(contractPath)) {
      result.errors.push(`Missing contract file: docs/architecture/contracts/${pkg}.md`);
      results.push(result);
      hasStructuralError = true;
      continue;
    }

    if (!existsSync(barrelPath)) {
      result.errors.push(`Missing barrel export: packages/${pkg}/src/index.ts`);
      results.push(result);
      hasStructuralError = true;
      continue;
    }

    const contractMd = readFileSync(contractPath, 'utf-8');
    const barrelTs = readFileSync(barrelPath, 'utf-8');

    const contractItems = new Set([
      ...parseContractItems(contractMd),
      ...parseContractCodeBlocks(contractMd),
    ]);

    const barrelItems = parseBarrelExports(barrelTs);

    const normalizedContract = new Set([...contractItems].map(normalizeName));
    const normalizedBarrel = new Set([...barrelItems].map(normalizeName));

    const knownIssues = KNOWN_ISSUES[pkg] || [];

    for (const item of barrelItems) {
      const norm = normalizeName(item);
      if (
        !normalizedContract.has(norm) &&
        !knownIssues.includes(item) &&
        !knownIssues.includes(norm)
      ) {
        result.unexpected.push(item);
      }
    }

    for (const item of contractItems) {
      const norm = normalizeName(item);
      if (!normalizedBarrel.has(norm)) {
        result.missing.push(item);
      }
    }

    if (result.unexpected.length > 0 || result.missing.length > 0) allPass = false;

    results.push(result);
  }

  for (const r of results) {
    if (r.errors.length > 0) {
      console.error(`\nSTRUCTURAL ERROR — ${r.package}:`);
      r.errors.forEach((e) => console.error(`  ${e}`));
      continue;
    }
    if (r.unexpected.length > 0 || r.missing.length > 0) {
      console.error(`\nFAIL — ${r.package}:`);
      if (r.unexpected.length > 0) {
        console.error(`  Exported in barrel but NOT in contract:`);
        r.unexpected.forEach((i) => console.error(`    - ${i}`));
      }
      if (r.missing.length > 0) {
        console.error(`  In contract but NOT exported from barrel:`);
        r.missing.forEach((i) => console.error(`    - ${i}`));
      }
    } else {
      console.log(`PASS — ${r.package}`);
    }
  }

  if (hasStructuralError) {
    console.error('\nExit 2: Structural errors detected.');
    process.exit(2);
  }
  if (!allPass) {
    console.error('\nExit 1: Validation failures detected.');
    process.exit(1);
  }
  console.log('\nAll packages pass export validation.');
  process.exit(0);
}

main();
