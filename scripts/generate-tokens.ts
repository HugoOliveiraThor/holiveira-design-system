import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import prettier from 'prettier';

import { elapsedMs, nowIso, writeGateReport } from './lib/gate-report';
import { parseTheme } from './lib/token-surface';

/**
 * Generate the TypeScript token modules from `packages/tokens/src/tokens.css`.
 *
 * `tokens.css` (`@theme`) is the single source of truth — it is what Tailwind
 * actually consumes at runtime. This script derives `colors.ts`, `shadows.ts`,
 * `spacing.ts`, `typography.ts`, `dimensions.ts` and `animations.ts` from it, and `--check` mode fails when the
 * committed TS drifts from the CSS.
 *
 * Declarations come from the same parser the compatibility guard uses, so a
 * name with `_` or a CSS escape cannot be silently skipped.
 *
 * Usage:
 *   tsx scripts/generate-tokens.ts                  # write generated files
 *   tsx scripts/generate-tokens.ts --check          # fail on drift (no writes)
 *   tsx scripts/generate-tokens.ts --root <dir>     # operate on a fixture root
 */
function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

const argv = process.argv.slice(2);
const rootOption = readOption(argv, '--root');
const REPO_ROOT = rootOption ? resolve(rootOption) : join(__dirname, '..');
const TOKENS_CSS = join(REPO_ROOT, 'packages', 'tokens', 'src', 'tokens.css');
const OUT_DIR = join(REPO_ROOT, 'packages', 'tokens', 'src');
const CHECK = argv.includes('--check');
const startedAt = nowIso();

const HEADER = `// AUTO-GENERATED from packages/tokens/src/tokens.css by scripts/generate-tokens.ts.
// Do not edit by hand. Run \`pnpm run generate:tokens\` after changing tokens.css.
`;

type Declarations = Record<string, string>;

function entriesFor(declarations: Declarations, prefix: string): Array<[string, string]> {
  return Object.entries(declarations)
    .filter(([name]) => name.startsWith(prefix))
    .map(([name, value]) => [name.slice(prefix.length).replace(/\\(.)/g, '$1'), value])
    .sort(([a], [b]) => a.localeCompare(b));
}

function numericAwareSort(entries: Array<[string, string]>): Array<[string, string]> {
  return [...entries].sort(([a], [b]) => {
    const na = Number(a.replace('_', '.'));
    const nb = Number(b.replace('_', '.'));
    if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
    return a.localeCompare(b);
  });
}

function escapeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function renderObject(entries: Array<[string, string]>, indent = '  '): string {
  return entries.map(([k, v]) => `${indent}'${k}': '${escapeValue(v)}',`).join('\n');
}

function buildColors(declarations: Declarations): string {
  const entries = entriesFor(declarations, '--color-');
  return `${HEADER}\n/** Design token color palette, derived from the CSS \`@theme\` block. */
export const colors = {
${renderObject(entries)}
} as const;

/** Valid keys for the \`colors\` object. */
export type ColorKey = keyof typeof colors;
`;
}

function buildShadows(declarations: Declarations): string {
  const entries = entriesFor(declarations, '--shadow-');
  return `${HEADER}\n/** Shadow tokens, derived from the CSS \`@theme\` block. */
export const shadows = {
${renderObject(entries)}
} as const;
`;
}

function buildSpacing(declarations: Declarations): string {
  const containers = numericAwareSort(entriesFor(declarations, '--container-'));
  const breakpoints = entriesFor(declarations, '--breakpoint-');
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

function buildTypography(declarations: Declarations): string {
  const fontEntries = entriesFor(declarations, '--font-');
  const text = new Map<string, { fontSize?: string; lineHeight?: string }>();

  for (const [name, value] of Object.entries(declarations)) {
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

function buildDimensions(declarations: Declarations): string {
  const minWidth = entriesFor(declarations, '--min-width-');
  const aspectRatio = entriesFor(declarations, '--aspect-');
  return `${HEADER}\n/** Min-width tokens, derived from the CSS \`@theme\` block. */
export const minWidth = {
${renderObject(minWidth)}
} as const;

/** Aspect ratio tokens, derived from the CSS \`@theme\` block. */
export const aspectRatio = {
${renderObject(aspectRatio)}
} as const;
`;
}

function buildAnimations(declarations: Declarations): string {
  const entries = entriesFor(declarations, '--animate-');
  return `${HEADER}\n/** Animation tokens, derived from the CSS \`@theme\` block. */
export const animate = {
${renderObject(entries)}
} as const;
`;
}

async function format(filePath: string, source: string): Promise<string> {
  const config = (await prettier.resolveConfig(filePath)) ?? {};
  return prettier.format(source, { ...config, parser: 'typescript', filepath: filePath });
}

async function main(): Promise<void> {
  const css = readFileSync(TOKENS_CSS, 'utf8');
  const declarations = parseTheme(css);

  const files: Array<[string, string]> = [
    [join(OUT_DIR, 'colors.ts'), buildColors(declarations)],
    [join(OUT_DIR, 'shadows.ts'), buildShadows(declarations)],
    [join(OUT_DIR, 'spacing.ts'), buildSpacing(declarations)],
    [join(OUT_DIR, 'typography.ts'), buildTypography(declarations)],
    [join(OUT_DIR, 'dimensions.ts'), buildDimensions(declarations)],
    [join(OUT_DIR, 'animations.ts'), buildAnimations(declarations)],
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

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
