/**
 * Token metadata — the editorial layer the M12.2 catalogue reads.
 *
 * `packages/tokens/tokens.meta.json` records a category and a description for
 * tokens, and declares which categories must be complete. The guard validates
 * it inside the blocking gate, so a token cannot become "documented" by
 * disappearing from the sidecar.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { TokenSurfaceError, type TokenSurface } from './token-surface';

export const META_RELATIVE_PATH = 'packages/tokens/tokens.meta.json';

export interface TokenMetaEntry {
  category: string;
  description: string;
}

export interface TokenMeta {
  requiredCategories: string[];
  tokens: Record<string, TokenMetaEntry>;
}

const CATEGORY_PREFIXES: Array<[string, string]> = [
  ['--text-', 'typography'],
  ['--font-', 'typography'],
  ['--shadow-', 'shadows'],
  ['--breakpoint-', 'breakpoints'],
  ['--color-', 'colors'],
  ['--container-', 'containers'],
  ['--min-width-', 'dimensions'],
  ['--aspect-', 'dimensions'],
  ['--animate-', 'animations'],
];

/** The catalogue category a declared token belongs to, or null when untracked. */
export function categoryOf(name: string): string | null {
  for (const [prefix, category] of CATEGORY_PREFIXES) {
    if (name.startsWith(prefix)) return category;
  }
  return null;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function malformed(detail: string): TokenSurfaceError {
  return new TokenSurfaceError(`metadata is malformed: ${detail}`);
}

/** Validate a parsed sidecar against the live surface. Throws on any gap. */
export function validateTokenMeta(value: unknown, surface: TokenSurface): TokenMeta {
  if (!isPlainRecord(value)) throw malformed('expected a JSON object');

  const required = value.requiredCategories;
  if (
    !Array.isArray(required) ||
    required.some((category) => typeof category !== 'string' || category.length === 0)
  ) {
    throw malformed('"requiredCategories" must be an array of strings');
  }

  if (!isPlainRecord(value.tokens)) throw malformed('"tokens" must be an object');

  const tokens: Record<string, TokenMetaEntry> = {};
  for (const [name, entry] of Object.entries(value.tokens)) {
    if (!isPlainRecord(entry)) throw malformed(`entry "${name}" is not an object`);
    if (typeof entry.category !== 'string' || entry.category.length === 0) {
      throw malformed(`entry "${name}" has no category`);
    }
    if (typeof entry.description !== 'string' || entry.description.trim().length === 0) {
      throw malformed(`entry "${name}" has no description`);
    }
    if (!(name in surface.css)) {
      throw new TokenSurfaceError(
        `metadata names "${name}", which is not a declared token; regenerate the sidecar`,
      );
    }
    const expected = categoryOf(name);
    if (expected !== null && entry.category !== expected) {
      throw new TokenSurfaceError(
        `metadata entry "${name}" says category "${entry.category}" but the token is ${expected}`,
      );
    }
    tokens[name] = { category: entry.category, description: entry.description };
  }

  for (const name of Object.keys(surface.css)) {
    const category = categoryOf(name);
    if (category === null || !required.includes(category)) continue;
    if (!(name in tokens)) {
      throw new TokenSurfaceError(`metadata is missing an entry for "${name}" (${category})`);
    }
  }

  return { requiredCategories: required, tokens };
}

export function readTokenMeta(root: string): unknown {
  let raw: string;
  try {
    raw = readFileSync(join(root, META_RELATIVE_PATH), 'utf8');
  } catch {
    throw new TokenSurfaceError(`metadata missing at ${META_RELATIVE_PATH}`);
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw malformed('the file is not valid JSON');
  }
}

/** Read and validate the sidecar; throws a `TokenSurfaceError` on any gap. */
export function checkTokenMeta(root: string, surface: TokenSurface): TokenMeta {
  return validateTokenMeta(readTokenMeta(root), surface);
}
