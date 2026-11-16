/**
 * Storybook story discovery.
 *
 * The portal links to Storybook by story id, and a story id is derived from the
 * story's `title` with Storybook's own sanitization. The title is read from the
 * colocated story file, so the link can never drift from the story the package
 * ships. No Storybook build is required and no id is typed by hand.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { MetadataError } from './registry';
import type { StoryRecord } from './types';

const STORY_SUFFIX = '.stories.tsx';

/** `PageHeader` → `page-header`, `AreaChart` → `area-chart`. */
export function storySlug(exportName: string): string {
  return exportName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Storybook's story id: lowercase, every run of non-alphanumerics becomes one
 * dash, no leading or trailing dash. `Primitives/InputGroup` → `primitives-inputgroup`.
 */
export function storyId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function walkStories(directory: string, found: string[] = []): string[] {
  if (!existsSync(directory)) return found;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walkStories(path, found);
    } else if (entry.isFile() && entry.name.endsWith(STORY_SUFFIX)) {
      found.push(path);
    }
  }
  return found;
}

function readTitle(file: string): string {
  const content = readFileSync(file, 'utf8');
  const match = /title:\s*['"]([^'"]+)['"]/.exec(content);
  if (match === null) {
    throw new MetadataError(`${file} has no story title`);
  }
  return match[1];
}

function indexStories(root: string, packageName: string): Map<string, string> {
  const directory = join(root, 'packages', packageName.replace(/^@[^/]+\//, ''), 'src');
  const bySlug = new Map<string, string>();
  for (const file of walkStories(directory)) {
    const slug = file.split('/').pop()!.slice(0, -STORY_SUFFIX.length);
    bySlug.set(slug, file);
  }
  return bySlug;
}

/** The story of a component export, read from its colocated story file. */
export function resolveStory(root: string, packageName: string, exportName: string): StoryRecord {
  const directory = join(root, 'packages', packageName.replace(/^@[^/]+\//, ''), 'src');
  const slug = storySlug(exportName);
  const expected = join(directory, `${slug}.stories.tsx`);
  const file = indexStories(root, packageName).get(slug);
  if (file === undefined) {
    throw new MetadataError(`${packageName} has no story for ${exportName} (expected ${expected})`);
  }
  const title = readTitle(file);
  return { title, id: storyId(title) };
}

/** Two components may not claim the same Storybook id. */
export function assertUniqueStoryTitles(
  entries: Array<{ id: string; exportName: string; title: string }>,
): void {
  const seen = new Map<string, string>();
  for (const entry of entries) {
    const previous = seen.get(entry.title);
    if (previous !== undefined) {
      throw new MetadataError(
        `${previous} and ${entry.exportName} share the story title "${entry.title}"`,
      );
    }
    seen.set(entry.title, entry.exportName);
  }
}
