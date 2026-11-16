/**
 * Generate the documentation metadata.
 *
 * Reads public manifests, barrels, TypeScript types, `cva` definitions, and the
 * curated catalog, then writes `registry.json`, `api.json`, and
 * `search-index.json` under `apps/docs/src/generated/`. `--check` regenerates in
 * memory and compares bytes; it never writes.
 *
 * Usage:
 *   tsx apps/docs/scripts/generate-docs-metadata.ts
 *   tsx apps/docs/scripts/generate-docs-metadata.ts --check
 *   tsx apps/docs/scripts/generate-docs-metadata.ts --root <dir>
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { buildApi, createProgram, exportNames } from '../src/lib/docs-metadata/api';
import { validateCatalog } from '../src/lib/docs-metadata/catalog';
import { renderJson } from '../src/lib/docs-metadata/render';
import { buildRegistry, MetadataError, readManifests } from '../src/lib/docs-metadata/registry';
import { buildSearch } from '../src/lib/docs-metadata/search';
import type { Catalog } from '../src/lib/docs-metadata/types';

function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

const argv = process.argv.slice(2);
const rootOption = readOption(argv, '--root');
const ROOT = rootOption ? resolve(rootOption) : resolve(__dirname, '..', '..', '..');
const CHECK = argv.includes('--check');
const OUTPUT_DIR = join(ROOT, 'apps', 'docs', 'src', 'generated');
const CATALOG_PATH = join(ROOT, 'apps', 'docs', 'src', 'content', 'catalog.ts');

const FILES = ['registry.json', 'api.json', 'search-index.json'] as const;

async function loadCatalog(): Promise<Catalog> {
  if (!existsSync(CATALOG_PATH)) {
    throw new MetadataError(`catalog missing at ${CATALOG_PATH}`);
  }
  let module: { catalog?: unknown };
  try {
    module = (await import(pathToFileURL(CATALOG_PATH).href)) as { catalog?: unknown };
  } catch (error) {
    throw new MetadataError(`catalog could not be loaded: ${(error as Error).message}`);
  }
  if (module.catalog === undefined) {
    throw new MetadataError('catalog is malformed: no catalog export');
  }
  return module.catalog as Catalog;
}

async function main(): Promise<void> {
  const manifests = readManifests(ROOT);
  const publicNames = manifests
    .filter((manifest) => manifest.private !== true)
    .map((manifest) => manifest.name);
  const program = createProgram(ROOT, publicNames);
  const exportsByPackage: Record<string, string[]> = {};
  for (const name of publicNames) {
    exportsByPackage[name] = exportNames(program, ROOT, name);
  }

  const catalog = validateCatalog(await loadCatalog(), {
    publicPackages: publicNames,
    exportsByPackage,
  });
  const registry = buildRegistry({ manifests, catalog, exportsByPackage });
  const components = buildApi(program, ROOT, catalog);
  const search = buildSearch(registry, components);
  const rendered: Record<(typeof FILES)[number], string> = {
    'registry.json': renderJson(registry),
    'api.json': renderJson(components),
    'search-index.json': renderJson(search),
  };

  if (CHECK) {
    const problems: string[] = [];
    for (const file of FILES) {
      const path = join(OUTPUT_DIR, file);
      if (!existsSync(path)) {
        problems.push(`${file}: missing`);
        continue;
      }
      if (readFileSync(path, 'utf8') !== rendered[file]) {
        problems.push(`${file}: out of date`);
      }
    }
    if (problems.length > 0) {
      console.error('check:docs:metadata: generated metadata is out of date:');
      for (const problem of problems) console.error(`  - ${problem}`);
      console.error('Run `pnpm run generate:docs:metadata` to regenerate.');
      process.exit(1);
    }
    console.log(
      `✓ docs metadata current: ${registry.length} packages, ${components.length} components`,
    );
    process.exit(0);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const file of FILES) {
    writeFileSync(join(OUTPUT_DIR, file), rendered[file]);
    console.log(`generated apps/docs/src/${join('generated', file)}`);
  }
  process.exit(0);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(2);
});
