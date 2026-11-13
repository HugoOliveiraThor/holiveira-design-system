/**
 * Token surface — the public contract of `@ho-dev/tokens`.
 *
 * `packages/tokens/src/tokens.css` (`@theme`) is the source of truth for the CSS
 * face; the package's runtime exports are the source of truth for the TypeScript
 * face. This module parses both, records them in a snapshot, and classifies every
 * difference so a rename, removal, or repaint cannot pass as an ordinary change.
 *
 * It is pure apart from the snapshot/package reads at the bottom, which take an
 * explicit repository root so fixtures never touch the real files.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export const TOKEN_PACKAGE = '@ho-dev/tokens';

export const SNAPSHOT_FORMAT = 1;

export const SNAPSHOT_RELATIVE_PATH = 'packages/tokens/tokens.snapshot.json';

const THEME_CSS_RELATIVE_PATH = 'packages/tokens/src/tokens.css';

const PACKAGE_JSON_RELATIVE_PATH = 'packages/tokens/package.json';

const APPROVAL_PATTERN = /^ads-\d{3}[a-z]?$/i;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export interface TokenSurface {
  /** Custom property name to normalized value. */
  css: Record<string, string>;
  /** Dot path from a public export to its value. */
  ts: Record<string, string>;
}

export interface TokenSnapshot extends TokenSurface {
  format: typeof SNAPSHOT_FORMAT;
  package: string;
  version: string;
  generatedAt: string;
  approval: string | null;
}

export interface ChangedToken {
  path: string;
  from: string;
  to: string;
}

export interface FaceDiff {
  added: string[];
  removed: string[];
  changed: ChangedToken[];
}

export interface SurfaceDiff {
  css: FaceDiff;
  ts: FaceDiff;
  /** A removal, a rename, or a repaint. */
  breaking: boolean;
  empty: boolean;
}

export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export class TokenSurfaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenSurfaceError';
  }
}

/** Collapse whitespace runs so line breaks and indentation never count as a change. */
export function normalizeValue(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Sort keys by code unit, so ordering is identical on every machine and locale. */
export function sortRecord<T>(record: Record<string, T>): Record<string, T> {
  const sorted: Record<string, T> = {};
  for (const key of Object.keys(record).sort(compareKeys)) sorted[key] = record[key];
  return sorted;
}

function compareKeys(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function sortedUnion(...records: Array<Record<string, string>>): string[] {
  const keys = new Set<string>();
  for (const record of records) for (const key of Object.keys(record)) keys.add(key);
  return [...keys].sort(compareKeys);
}

/** Remove nested at-rule blocks so only top-level declarations remain. */
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

function extractThemeBody(css: string): string {
  const at = css.indexOf('@theme');
  if (at === -1) throw new TokenSurfaceError('tokens.css: no @theme block found');
  const open = css.indexOf('{', at);
  if (open === -1) throw new TokenSurfaceError('tokens.css: @theme block has no body');
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  throw new TokenSurfaceError('tokens.css: unbalanced @theme block');
}

/** Parse the `@theme` block into token name to normalized value, sorted by name. */
export function parseTheme(css: string): Record<string, string> {
  const declarations: Record<string, string> = {};
  for (const part of stripNestedBlocks(extractThemeBody(css)).split(';')) {
    const match = part.match(/^\s*(--[A-Za-z0-9-]+)\s*:\s*([\s\S]*)$/);
    if (!match) continue;
    const name = match[1];
    const value = normalizeValue(match[2]);
    if (!value) continue;
    if (name in declarations) {
      throw new TokenSurfaceError(`tokens.css: duplicate token "${name}"`);
    }
    declarations[name] = value;
  }
  if (Object.keys(declarations).length === 0) {
    throw new TokenSurfaceError('tokens.css: @theme block declares no tokens');
  }
  return sortRecord(declarations);
}

/** Flatten the package's runtime exports into dot paths, sorted by path. */
export function flattenExports(exports: Record<string, unknown>): Record<string, string> {
  const flattened: Record<string, string> = {};
  const walk = (path: string, value: unknown): void => {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!path) throw new TokenSurfaceError('Unsupported token value at the export root');
      flattened[path] = String(value);
      return;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      for (const [key, child] of Object.entries(value)) {
        walk(path ? `${path}.${key}` : key, child);
      }
      return;
    }
    throw new TokenSurfaceError(`Unsupported token value at "${path || '(root)'}"`);
  };
  for (const [key, value] of Object.entries(exports)) walk(key, value);
  return sortRecord(flattened);
}

function diffFace(previous: Record<string, string>, current: Record<string, string>): FaceDiff {
  const diff: FaceDiff = { added: [], removed: [], changed: [] };
  for (const path of sortedUnion(previous, current)) {
    if (!(path in previous)) {
      diff.added.push(path);
      continue;
    }
    if (!(path in current)) {
      diff.removed.push(path);
      continue;
    }
    if (previous[path] !== current[path]) {
      diff.changed.push({ path, from: previous[path], to: current[path] });
    }
  }
  return diff;
}

/** Compare each face independently; any removal or repaint makes the drift breaking. */
export function diffSurfaces(previous: TokenSurface, current: TokenSurface): SurfaceDiff {
  const css = diffFace(previous.css, current.css);
  const ts = diffFace(previous.ts, current.ts);
  const breaking = [css, ts].some((face) => face.removed.length + face.changed.length > 0);
  const empty = [css, ts].every(
    (face) => face.added.length + face.removed.length + face.changed.length === 0,
  );
  return { css, ts, breaking, empty };
}

export function parseVersion(version: string): Version {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new TokenSurfaceError(`"${version}" is not a MAJOR.MINOR.PATCH version`);
  }
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

export function compareVersions(a: string, b: string): number {
  const left = parseVersion(a);
  const right = parseVersion(b);
  if (left.major !== right.major) return left.major - right.major;
  if (left.minor !== right.minor) return left.minor - right.minor;
  return left.patch - right.patch;
}

export function isVersionRegression(current: string, previous: string): boolean {
  return compareVersions(current, previous) < 0;
}

/** Before 1.0 a minor bump is breaking; from 1.0 a major bump is. */
export function isBreakingBump(previous: string, current: string): boolean {
  const before = parseVersion(previous);
  const after = parseVersion(current);
  if (after.major > before.major) return true;
  if (after.major < before.major) return false;
  return before.major === 0 && after.minor > before.minor;
}

/** Resolve `ads-NNN` to an existing `docs/architecture/ads-NNN*.md`, or null. */
export function resolveApproval(root: string, reference: string): string | null {
  if (!APPROVAL_PATTERN.test(reference)) return null;
  const directory = join(root, 'docs', 'architecture');
  let files: string[];
  try {
    files = readdirSync(directory);
  } catch {
    return null;
  }
  const prefix = reference.toLowerCase();
  return (
    files.find(
      (file) => file.toLowerCase().startsWith(prefix) && file.toLowerCase().endsWith('.md'),
    ) ?? null
  );
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireStringRecord(value: unknown, section: string): Record<string, string> {
  if (!isPlainRecord(value)) {
    throw new TokenSurfaceError(`snapshot is malformed: missing "${section}"`);
  }
  const record: Record<string, string> = {};
  for (const [key, child] of Object.entries(value)) {
    if (typeof child !== 'string') {
      throw new TokenSurfaceError(`snapshot is malformed: "${section}.${key}" is not a string`);
    }
    record[key] = child;
  }
  return sortRecord(record);
}

/** Validate a parsed snapshot, rejecting anything the guard cannot reason about. */
export function validateSnapshot(value: unknown): TokenSnapshot {
  if (!isPlainRecord(value)) {
    throw new TokenSurfaceError('snapshot is malformed: expected a JSON object');
  }
  if (value.format !== SNAPSHOT_FORMAT) {
    throw new TokenSurfaceError(
      `snapshot format ${String(value.format)} is unsupported; run the snapshot command`,
    );
  }
  if (typeof value.package !== 'string' || value.package.length === 0) {
    throw new TokenSurfaceError('snapshot is malformed: missing "package"');
  }
  if (typeof value.version !== 'string') {
    throw new TokenSurfaceError('snapshot is malformed: missing "version"');
  }
  parseVersion(value.version);
  if (typeof value.generatedAt !== 'string' || !DATE_PATTERN.test(value.generatedAt)) {
    throw new TokenSurfaceError('snapshot is malformed: missing "generatedAt" date');
  }
  if (value.approval !== null && typeof value.approval !== 'string') {
    throw new TokenSurfaceError('snapshot is malformed: "approval" must be a string or null');
  }
  return {
    format: SNAPSHOT_FORMAT,
    package: value.package,
    version: value.version,
    generatedAt: value.generatedAt,
    approval: value.approval ?? null,
    css: requireStringRecord(value.css, 'css'),
    ts: requireStringRecord(value.ts, 'ts'),
  };
}

export function buildSnapshot(
  surface: TokenSurface,
  options: { version: string; approval?: string | null; generatedAt?: string },
): TokenSnapshot {
  parseVersion(options.version);
  return {
    format: SNAPSHOT_FORMAT,
    package: TOKEN_PACKAGE,
    version: options.version,
    generatedAt: options.generatedAt ?? new Date().toISOString().slice(0, 10),
    approval: options.approval ?? null,
    css: sortRecord(surface.css),
    ts: sortRecord(surface.ts),
  };
}

/** Canonical rendering: fixed top-level order, sorted maps, trailing newline. */
export function renderSnapshot(snapshot: TokenSnapshot): string {
  const ordered = {
    format: snapshot.format,
    package: snapshot.package,
    version: snapshot.version,
    generatedAt: snapshot.generatedAt,
    approval: snapshot.approval,
    css: sortRecord(snapshot.css),
    ts: sortRecord(snapshot.ts),
  };
  return `${JSON.stringify(ordered, null, 2)}\n`;
}

export function snapshotPath(root: string): string {
  return join(root, SNAPSHOT_RELATIVE_PATH);
}

/** Read and validate the snapshot; a missing file is null, a broken file throws. */
export function readSnapshot(root: string): TokenSnapshot | null {
  let raw: string;
  try {
    raw = readFileSync(snapshotPath(root), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new TokenSurfaceError('snapshot is not valid JSON');
  }
  return validateSnapshot(parsed);
}

/** The version declared by the tokens package, validated as semver. */
export function readPackageVersion(root: string): string {
  let raw: string;
  try {
    raw = readFileSync(join(root, PACKAGE_JSON_RELATIVE_PATH), 'utf8');
  } catch {
    throw new TokenSurfaceError(`missing ${PACKAGE_JSON_RELATIVE_PATH}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new TokenSurfaceError(`${PACKAGE_JSON_RELATIVE_PATH} is not valid JSON`);
  }
  if (!isPlainRecord(parsed) || typeof parsed.version !== 'string') {
    throw new TokenSurfaceError(`${PACKAGE_JSON_RELATIVE_PATH} declares no version`);
  }
  parseVersion(parsed.version);
  return parsed.version;
}

/**
 * Collect the live surface. Runs under `tsx` (or Vitest), which loads the
 * TypeScript entry point natively.
 */
export async function collectSurface(root: string): Promise<TokenSurface> {
  let css: string;
  try {
    css = readFileSync(join(root, THEME_CSS_RELATIVE_PATH), 'utf8');
  } catch {
    throw new TokenSurfaceError(`missing ${THEME_CSS_RELATIVE_PATH}`);
  }
  const entry = pathToFileURL(join(root, 'packages', 'tokens', 'src', 'index.ts')).href;
  let exports: Record<string, unknown>;
  try {
    exports = (await import(entry)) as Record<string, unknown>;
  } catch (error) {
    throw new TokenSurfaceError(
      `cannot load packages/tokens/src/index.ts: ${(error as Error).message}`,
    );
  }
  return { css: parseTheme(css), ts: flattenExports(exports) };
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
