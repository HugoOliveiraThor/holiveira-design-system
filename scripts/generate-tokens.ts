import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import prettier from 'prettier';

import { elapsedMs, nowIso, writeGateReport } from './lib/gate-report';

/**
 * Generate the TypeScript token modules from `packages/tokens/src/tokens.css`.
 *
 * `tokens.css` (`@theme`) is the single source of truth — it is what Tailwind
 * actually consumes at runtime. This script derives `colors.ts`, `shadows.ts`,
 * `spacing.ts` and `typography.ts` from it, and `--check` mode fails when the
 * committed TS drifts from the CSS.
 *
 * Usage:
 *   tsx scripts/generate-tokens.ts          # write generated files
 *   tsx scripts/generate-tokens.ts --check  # fail on drift (no writes)
 */
const REPO_ROOT = join(__dirname, '..');
const TOKENS_CSS = join(REPO_ROOT, 'packages', 'tokens', 'src', 'tokens.css');
const OUT_DIR = join(REPO_ROOT, 'packages', 'tokens', 'src');
const CHECK = process.argv.includes('--check');
const startedAt = nowIso();

const HEADER = `// AUTO-GENERATED from packages/tokens/src/tokens.css by scripts/generate-tokens.ts.
// Do not edit by hand. Run \`pnpm run generate:tokens\` after changing tokens.css.
`;

function extractThemeBlock(css: string): string {
  const at = css.indexOf('@theme');
  if (at === -1) throw new Error('tokens.css: no @theme block found');
  const open = css.indexOf('{', at);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  throw new Error('tokens.css: unbalanced @theme block');
}

/** Remove nested at-rule blocks (e.g. @keyframes) so only top-level declarations remain. */
function stripNestedBlocks(body: string): string {
  let out = '';
  let depth = 0;
  for (const ch of body) {
    if (ch === '{') {
      depth++;
      continue;
    }
    if (ch === '}') {
      depth--;
      continue;
    }
    if (depth === 0) out += ch;
  }
  return out;
}

function parseDeclarations(theme: string): Map<string, string> {
  const declarations = new Map<string, string>();
  for (const part of stripNestedBlocks(theme).split(';')) {
    const match = part.match(/^\s*(--[A-Za-z0-9-]+)\s*:\s*([\s\S]*)$/);
    if (!match) continue;
    const value = match[2].replace(/\s+/g, ' ').trim();
    if (value) declarations.set(match[1], value);
  }
  return declarations;
}

function escapeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function objectEntries(declarations: Map<string, string>, prefix: string): Array<[string, string]> {
  return [...declarations]
    .filter(([name]) => name.startsWith(prefix))
    .map(([name, value]) => [name.slice(prefix.length), value] as [string, string])
    .sort(([a], [b]) => a.localeCompare(b));
}

function numericAwareSort(entries: Array<[string, string]>): Array<[string, string]> {
  return [...entries].sort(([a], [b]) => {
    const na = Number(a);
    const nb = Number(b);
    if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
    return a.localeCompare(b);
  });
}

function renderObject(entries: Array<[string, string]>, indent = '  '): string {
  return entries.map(([k, v]) => `${indent}'${k}': '${escapeValue(v)}',`).join('\n');
}

function buildColors(declarations: Map<string, string>): string {
  const entries = objectEntries(declarations, '--color-');
  return `${HEADER}\n/** Design token color palette, derived from the CSS \`@theme\` block. */
export const colors = {
${renderObject(entries)}
} as const;

/** Valid keys for the \`colors\` object. */
export type ColorKey = keyof typeof colors;
`;
}

function buildShadows(declarations: Map<string, string>): string {
  const entries = objectEntries(declarations, '--shadow-');
  return `${HEADER}\n/** Shadow tokens, derived from the CSS \`@theme\` block. */
export const shadows = {
${renderObject(entries)}
} as const;
`;
}

function buildSpacing(declarations: Map<string, string>): string {
  const containers = numericAwareSort(objectEntries(declarations, '--container-'));
  const breakpoints = objectEntries(declarations, '--breakpoint-');
  return `${HEADER}\n/** Container dimension tokens, derived from the CSS \`@theme\` block. */
export const containers = {
${renderObject(containers)}
} as const;

/** Custom breakpoints, derived from the CSS \`@theme\` block. */
export const breakpoints = {
${renderObject(breakpoints)}
} as const;

/** Valid keys for the \`breakpoints\` object. */
export type Breakpoint = keyof typeof breakpoints;
`;
}

function buildTypography(declarations: Map<string, string>): string {
  const fontEntries = objectEntries(declarations, '--font-');
  const text = new Map<string, { fontSize?: string; lineHeight?: string }>();

  for (const [name, value] of declarations) {
    if (!name.startsWith('--text-')) continue;
    const isLineHeight = name.endsWith('--line-height');
    const key = isLineHeight
      ? name.slice('--text-'.length, -'--line-height'.length)
      : name.slice('--text-'.length);
    const entry = text.get(key) ?? {};
    if (isLineHeight) entry.lineHeight = value;
    else entry.fontSize = value;
    text.set(key, entry);
  }

  const textEntries = [...text]
    .filter(([, v]) => v.fontSize !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => {
      const parts = [`fontSize: '${escapeValue(v.fontSize!)}'`];
      if (v.lineHeight !== undefined) parts.push(`lineHeight: '${escapeValue(v.lineHeight)}'`);
      return `  '${k}': { ${parts.join(', ')} },`;
    })
    .join('\n');

  return `${HEADER}\n/** Font stacks, derived from the CSS \`@theme\` block. */
export const fontFamily = {
${renderObject(fontEntries)}
} as const;

/** Typography scale, derived from the CSS \`@theme\` block. */
export const text = {
${textEntries}
} as const;
`;
}

async function format(filePath: string, source: string): Promise<string> {
  const config = (await prettier.resolveConfig(filePath)) ?? {};
  return prettier.format(source, { ...config, parser: 'typescript', filepath: filePath });
}

async function main(): Promise<void> {
  const css = readFileSync(TOKENS_CSS, 'utf8');
  const declarations = parseDeclarations(extractThemeBlock(css));

  const files: Array<[string, string]> = [
    [join(OUT_DIR, 'colors.ts'), buildColors(declarations)],
    [join(OUT_DIR, 'shadows.ts'), buildShadows(declarations)],
    [join(OUT_DIR, 'spacing.ts'), buildSpacing(declarations)],
    [join(OUT_DIR, 'typography.ts'), buildTypography(declarations)],
  ];

  const drifted: string[] = [];

  for (const [filePath, raw] of files) {
    const formatted = await format(filePath, raw);
    let existing = '';
    try {
      existing = readFileSync(filePath, 'utf8');
    } catch {
      existing = '';
    }

    if (existing !== formatted) {
      drifted.push(filePath.replace(`${REPO_ROOT}/`, ''));
      if (!CHECK) {
        writeFileSync(filePath, formatted);
        console.log(`generated ${filePath.replace(`${REPO_ROOT}/`, '')}`);
      }
    }
  }

  if (CHECK) {
    if (drifted.length > 0) {
      console.error('check:tokens: token TS is out of sync with tokens.css:');
      for (const f of drifted) console.error(`  - ${f}`);
      console.error('Run `pnpm run generate:tokens` to regenerate.');
      writeGateReport({
        gate: 'tokens',
        status: 'fail',
        executed: true,
        tool: 'generate-tokens',
        startedAt,
        durationMs: elapsedMs(startedAt),
        items: drifted.map((f) => ({ name: f, status: 'fail' as const })),
      });
      process.exit(1);
    }
    console.log('check:tokens: PASS — TS tokens match tokens.css');
    writeGateReport({
      gate: 'tokens',
      status: 'pass',
      executed: true,
      tool: 'generate-tokens',
      startedAt,
      durationMs: elapsedMs(startedAt),
      items: files.map(([f]) => ({
        name: f.replace(`${REPO_ROOT}/`, ''),
        status: 'pass' as const,
      })),
    });
    process.exit(0);
  }

  if (drifted.length === 0) {
    console.log('generate:tokens: already up to date');
  }
  process.exit(0);
}

void main();
