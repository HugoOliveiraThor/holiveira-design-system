/**
 * Editorial content records.
 *
 * A record holds only what the repository cannot derive: why a component exists,
 * when to avoid it, how it behaves with a keyboard, and which components relate
 * to it. Everything factual - props, variants, peers, story ids - comes from the
 * generated artifacts, never from this layer.
 *
 * The gate validates structure and facts, not prose quality: an empty field or a
 * relation to a component that does not exist is an error; a dull sentence is a
 * review comment.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { expectedExampleKinds } from './examples';
import { MetadataError } from './registry';
import type { ComponentDoc, ExampleRecord, PlaygroundScreen, StoryRecord } from './types';
import { PLAYGROUND_SCREENS } from './types';

export interface ContentContext {
  catalogIds: ReadonlySet<string>;
  coreIds: readonly string[];
  playgroundScreens?: readonly string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireText(value: unknown, field: string, id: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new MetadataError(`content record ${id} has an empty ${field}`);
  }
  return value;
}

function requireAccessibility(value: unknown, id: string): ComponentDoc['accessibility'] {
  if (!isRecord(value)) {
    throw new MetadataError(`content record ${id} has no accessibility prose`);
  }
  return {
    keyboard: requireText(value.keyboard, 'accessibility.keyboard', id),
    aria: requireText(value.aria, 'accessibility.aria', id),
    focus: requireText(value.focus, 'accessibility.focus', id),
  };
}

/** Validate the editorial records against the catalogue and the Playground screens. */
export function validateComponentDocs(value: unknown, context: ContentContext): ComponentDoc[] {
  if (!Array.isArray(value)) {
    throw new MetadataError('component content is malformed: expected an array of records');
  }
  const screens = context.playgroundScreens ?? PLAYGROUND_SCREENS;
  const seen = new Set<string>();
  const docs: ComponentDoc[] = [];

  for (const entry of value) {
    if (!isRecord(entry)) {
      throw new MetadataError('component content is malformed: record is not an object');
    }
    const id = entry.id;
    if (typeof id !== 'string' || id.length === 0) {
      throw new MetadataError('component content is malformed: record has no id');
    }
    if (!context.catalogIds.has(id)) {
      throw new MetadataError(`content record ${id} is not a catalogued component`);
    }
    if (seen.has(id)) {
      throw new MetadataError(`component content has a duplicate record for ${id}`);
    }
    seen.add(id);

    const related = Array.isArray(entry.related) ? entry.related : [];
    for (const relation of related) {
      if (typeof relation !== 'string' || !context.catalogIds.has(relation)) {
        throw new MetadataError(
          `content record ${id} relates to ${String(relation)}, which is not catalogued`,
        );
      }
      if (relation === id) {
        throw new MetadataError(`content record ${id} relates to itself`);
      }
    }

    const playground = entry.playground;
    if (
      playground !== undefined &&
      (typeof playground !== 'string' || !screens.includes(playground))
    ) {
      throw new MetadataError(
        `content record ${id} names playground ${String(playground)}, which does not exist`,
      );
    }

    docs.push({
      id,
      summary: requireText(entry.summary, 'summary', id),
      whenToUse: requireText(entry.whenToUse, 'whenToUse', id),
      whenNotToUse: requireText(entry.whenNotToUse, 'whenNotToUse', id),
      accessibility: requireAccessibility(entry.accessibility, id),
      related: [...related].sort(),
      ...(playground !== undefined ? { playground: playground as PlaygroundScreen } : {}),
    });
  }

  return docs.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Every core component owes a record, a generated component, and both examples.
 * The gate fails on the first missing piece and names it, so a half-written page
 * never ships.
 */
export function assertCoreCoverage({
  coreIds,
  docs,
  examples,
  components,
}: {
  coreIds: readonly string[];
  docs: readonly ComponentDoc[];
  examples: readonly ExampleRecord[];
  components: readonly { id: string; story: StoryRecord }[];
}): void {
  const docIds = new Set(docs.map((doc) => doc.id));
  const componentIds = new Set(components.map((component) => component.id));
  const exampleKeys = new Set(examples.map((example) => `${example.id}/${example.kind}`));

  for (const id of coreIds) {
    if (!docIds.has(id)) {
      throw new MetadataError(`core component ${id} has no content record`);
    }
    if (!componentIds.has(id)) {
      throw new MetadataError(`core component ${id} has no generated record`);
    }
    for (const kind of expectedExampleKinds()) {
      if (!exampleKeys.has(`${id}/${kind}`)) {
        throw new MetadataError(
          `core component ${id} is missing the ${kind} example (expected apps/docs/src/examples/${id}/${kind}.tsx)`,
        );
      }
    }
  }
}

/** Load the editorial records the app imports, or an empty list before any exists. */
export async function loadComponentDocs(root: string): Promise<unknown[]> {
  const path = join(root, 'apps', 'docs', 'src', 'content', 'components', 'index.ts');
  if (!existsSync(path)) return [];
  let module: { componentDocs?: unknown };
  try {
    module = (await import(pathToFileURL(path).href)) as { componentDocs?: unknown };
  } catch (error) {
    throw new MetadataError(`component content could not be loaded: ${(error as Error).message}`);
  }
  if (!Array.isArray(module.componentDocs)) {
    throw new MetadataError('component content is malformed: no componentDocs array');
  }
  return module.componentDocs;
}
