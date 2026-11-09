/**
 * Post-build ESM extension fixer.
 *
 * `tsc` with `moduleResolution: "bundler"` emits extensionless relative
 * specifiers (e.g. `from './button'`). Node ESM requires explicit extensions,
 * so this script rewrites every relative specifier in the emitted `dist` output
 * (`*.js` and `*.d.ts`) to include `.js`.
 *
 * Usage (from a package directory): `node ../../scripts/fix-esm-extensions.mjs`
 * It walks `./dist` by default; pass a directory as the first argument to
 * override.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

if (!existsSync(root)) {
  console.error(`fix-esm-extensions: directory not found: ${root}`);
  process.exit(1);
}

const EXTENSIONS = ['.js', '.mjs', '.cjs', '.json', '.css', '.node'];

function hasExtension(specifier) {
  return EXTENSIONS.some((ext) => specifier.endsWith(ext));
}

// Matches: from './x' | from "./x" | import('./x') | export * from './x'
// Captures the quote and the specifier.
const SPECIFIER_RE = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(['"])(\.\.?\/[^'"]+)\2/g;

function fixSource(source) {
  return source.replace(SPECIFIER_RE, (match, prefix, quote, specifier) => {
    if (hasExtension(specifier)) return match;
    // A relative specifier without an extension must point to a file; all
    // packages in this repo use file-level imports (no directory imports).
    return `${prefix}${quote}${specifier}.js${quote}`;
  });
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!full.endsWith('.js') && !full.endsWith('.d.ts')) continue;

    const before = readFileSync(full, 'utf8');
    const after = fixSource(before);
    if (after !== before) {
      writeFileSync(full, after);
      console.log(`fixed ${full}`);
    }
  }
}

walk(root);
