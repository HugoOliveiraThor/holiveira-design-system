/**
 * Guide snippet extraction.
 *
 * Each guide code block shows a real `.tsx` file under
 * `apps/docs/src/examples/guides/`. The source is read here once and committed
 * as `guide-examples.json`, so the page never retypes code and the gate can
 * prove the bytes are current. Snippets are public consumers: the same import
 * boundary as the component examples applies.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import { assertSourceImports } from './examples';
import type { GuideExampleRecord } from './types';

export function guideExamplesRoot(root: string): string {
  return join(root, 'apps', 'docs', 'src', 'examples', 'guides');
}

function walkSnippets(directory: string, found: string[] = []): string[] {
  if (!existsSync(directory)) return found;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walkSnippets(path, found);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      found.push(path);
    }
  }
  return found;
}

/** Every guide snippet with its repo-relative path and verbatim source, sorted. */
export function buildGuideExamples(root: string): GuideExampleRecord[] {
  return walkSnippets(guideExamplesRoot(root))
    .map((file) => ({
      path: relative(root, file).split(/[\\/]/).join('/'),
      source: readFileSync(file, 'utf8'),
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

/** Reject a snippet that imports a private package or a package source path. */
export function assertGuideExampleImports(
  examples: GuideExampleRecord[],
  privatePackages: ReadonlySet<string>,
): void {
  for (const example of examples) {
    assertSourceImports(example.path, example.source, privatePackages);
  }
}
