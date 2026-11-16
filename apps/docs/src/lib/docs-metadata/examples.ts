/**
 * Example extraction.
 *
 * Each example is a real `.tsx` file under `apps/docs/src/examples/<id>/<kind>.tsx`.
 * The file is both what the portal previews and what the code block shows, so the
 * source is read here once and never retyped by hand.
 *
 * A generated artifact is the only way the source reaches the page: the Next build
 * never reads the filesystem, and `--check` keeps the committed bytes honest.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

import { MetadataError } from './registry';
import { EXAMPLES_DIR, type ExampleKind, type ExampleRecord } from './types';

const KINDS: readonly ExampleKind[] = ['minimal', 'realistic'];

export function examplesRoot(root: string): string {
  return join(root, ...EXAMPLES_DIR);
}

function examplePath(root: string, id: string, kind: ExampleKind): string {
  return join(examplesRoot(root), id, `${kind}.tsx`);
}

/**
 * Read every example file, sorted by component id and then by kind order. A
 * directory without a known kind file yields nothing; completeness is the gate's
 * job, not this reader's.
 */
export function buildExamples(root: string): ExampleRecord[] {
  const directory = examplesRoot(root);
  if (!existsSync(directory)) return [];
  const records: ExampleRecord[] = [];
  const ids = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const id of ids) {
    for (const kind of KINDS) {
      const path = examplePath(root, id, kind);
      if (!existsSync(path)) continue;
      records.push({
        id,
        kind,
        path: relative(root, path).split(/[\\/]/).join('/'),
        source: readFileSync(path, 'utf8'),
      });
    }
  }
  return records;
}

const IMPORT_PATTERN = /(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g;

/**
 * Examples are public consumers: they may import a public `@ho-dev/*` barrel and
 * third-party packages, never a private package or a path into `packages/`.
 */
export function assertExampleImports(
  examples: ExampleRecord[],
  privatePackages: ReadonlySet<string>,
): void {
  for (const example of examples) {
    for (const match of example.source.matchAll(IMPORT_PATTERN)) {
      const specifier = match[1];
      if (privatePackages.has(specifier)) {
        throw new MetadataError(
          `example ${example.id}/${example.kind} imports ${specifier}, which is a private package`,
        );
      }
      if (specifier.includes('packages/')) {
        throw new MetadataError(
          `example ${example.id}/${example.kind} imports ${specifier}, which is a package source path`,
        );
      }
    }
  }
}

/** Every example file the gate expects for a component, in kind order. */
export function expectedExampleKinds(): readonly ExampleKind[] {
  return KINDS;
}
