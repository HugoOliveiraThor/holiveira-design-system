/**
 * Generate the documentation metadata.
 *
 * Reads public manifests, barrels, TypeScript types, `cva` definitions, stories,
 * example files, and the curated catalog, then writes `registry.json`, `api.json`,
 * `search-index.json`, and `examples.json` under `apps/docs/src/generated/`.
 * `--check` regenerates in memory and compares bytes; it never writes.
 *
 * Usage:
 *   tsx apps/docs/scripts/generate-docs-metadata.ts
 *   tsx apps/docs/scripts/generate-docs-metadata.ts --check
 *   tsx apps/docs/scripts/generate-docs-metadata.ts --root <dir>
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { buildApi, createProgram } from '../src/lib/docs-metadata/api';
import {
  assertCoreCoverage,
  loadComponentDocs,
  validateComponentDocs,
} from '../src/lib/docs-metadata/content';
import { assertExampleImports, buildExamples } from '../src/lib/docs-metadata/examples';
import {
  assertGuideExampleImports,
  buildGuideExamples,
} from '../src/lib/docs-metadata/guide-examples';
import { validateGuideDocs } from '../src/lib/docs-metadata/guides';
import { buildComponentExports, buildExports } from '../src/lib/docs-metadata/inventory';
import { validateCatalog } from '../src/lib/docs-metadata/catalog';
import {
  assertExportCoverage,
  assertGuideCoverage,
  assertPackageCoverage,
  assertTargetCoverage,
  describeCoverage,
  GUIDE_ROUTES,
  portalRoutes,
  type ComponentExportRef,
} from '../src/lib/docs-metadata/coverage';
import { renderJson } from '../src/lib/docs-metadata/render';
import { buildRegistry, MetadataError, readManifests } from '../src/lib/docs-metadata/registry';
import { buildSearch } from '../src/lib/docs-metadata/search';
import {
  CORE_COMPONENTS,
  PLAYGROUND_SCREENS,
  type Catalog,
  type ComponentExportRecord,
  type ExportRecord,
  type Target,
} from '../src/lib/docs-metadata/types';

import { elapsedMs, nowIso, writeGateReport } from '../../../scripts/lib/gate-report';

function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

const argv = process.argv.slice(2);
const rootOption = readOption(argv, '--root');
const ROOT = rootOption ? resolve(rootOption) : resolve(__dirname, '..', '..', '..');
const CHECK = argv.includes('--check');
// The gate report describes the repository gate; a fixture run must not touch it.
const WRITE_GATE_REPORT = CHECK && rootOption === undefined;
const startedAt = nowIso();
const OUTPUT_DIR = join(ROOT, 'apps', 'docs', 'src', 'generated');
const CATALOG_PATH = join(ROOT, 'apps', 'docs', 'src', 'content', 'catalog.ts');

const FILES = [
  'registry.json',
  'api.json',
  'search-index.json',
  'examples.json',
  'guide-examples.json',
] as const;

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

type ResolveTarget = (packageName: string, exportName: string) => Target | undefined;

/** The editorial target map, once T4 adds it; before that no target is claimed. */
async function loadTargetResolver(): Promise<ResolveTarget | undefined> {
  const path = join(ROOT, 'apps', 'docs', 'src', 'content', 'targets.ts');
  if (!existsSync(path)) return undefined;
  const module = (await import(pathToFileURL(path).href)) as { resolveTarget?: unknown };
  if (typeof module.resolveTarget !== 'function') {
    throw new MetadataError('targets.ts has no resolveTarget export');
  }
  return module.resolveTarget as ResolveTarget;
}

/** The guide records as the app imports them; before any exists the set is empty. */
async function loadGuideDocs(): Promise<unknown[]> {
  const path = join(ROOT, 'apps', 'docs', 'src', 'content', 'guides', 'index.ts');
  if (!existsSync(path)) return [];
  const module = (await import(pathToFileURL(path).href)) as { guideDocs?: unknown };
  if (!Array.isArray(module.guideDocs)) {
    throw new MetadataError('guide content is malformed: no guideDocs array');
  }
  return module.guideDocs;
}

async function main(): Promise<void> {
  const manifests = readManifests(ROOT);
  const publicNames = manifests
    .filter((manifest) => manifest.private !== true)
    .map((manifest) => manifest.name);
  const program = createProgram(ROOT, publicNames);
  const exportRecordsByPackage: Record<string, ExportRecord[]> = {};
  const componentExportsByPackage: Record<string, ComponentExportRecord[]> = {};
  const exportsByPackage: Record<string, string[]> = {};
  for (const name of publicNames) {
    const records = buildExports(program, ROOT, name);
    exportRecordsByPackage[name] = records;
    exportsByPackage[name] = records.map((record) => record.name);
    componentExportsByPackage[name] = buildComponentExports(program, ROOT, name, records);
  }

  const catalog = validateCatalog(await loadCatalog(), {
    publicPackages: publicNames,
    exportsByPackage,
  });
  const catalogIds = new Set(
    catalog.packages.flatMap((entry) => (entry.components ?? []).map((component) => component.id)),
  );
  const coreComponentIds = catalog.packages.flatMap((entry) =>
    (entry.components ?? []).filter((component) => component.core === true).map((c) => c.id),
  );
  const docs = validateComponentDocs(await loadComponentDocs(ROOT), {
    catalogIds,
    coreIds: CORE_COMPONENTS,
    playgroundScreens: PLAYGROUND_SCREENS,
  });
  const registry = buildRegistry({
    manifests,
    catalog,
    exportsByPackage: exportRecordsByPackage,
    componentExportsByPackage,
  });
  const components = buildApi(program, ROOT, catalog);
  const examples = buildExamples(ROOT);
  const guideExamples = buildGuideExamples(ROOT);
  assertCoreCoverage({ coreIds: coreComponentIds, docs, examples, components });
  const privateNames = new Set(
    manifests.filter((manifest) => manifest.private === true).map((manifest) => manifest.name),
  );
  assertExampleImports(examples, privateNames);
  assertGuideExampleImports(guideExamples, privateNames);

  assertPackageCoverage({ packages: registry, root: ROOT });
  assertExportCoverage({ registry, barrelExports: exportsByPackage });
  const componentExportRefs: ComponentExportRef[] = registry.flatMap((record) =>
    record.componentExports.map((component) => ({
      package: record.name,
      exportName: component.exportName,
    })),
  );
  const resolveTarget = await loadTargetResolver();
  if (resolveTarget !== undefined) {
    assertTargetCoverage({
      componentExports: componentExportRefs,
      resolve: resolveTarget,
      routes: portalRoutes({ packages: registry, components }),
    });
  }
  const guides = validateGuideDocs(await loadGuideDocs(), {
    packages: registry.map((record) => record.name),
    componentExports: componentExportRefs,
  });
  if (guides.length > 0) {
    assertGuideCoverage({
      guides,
      snippets: guideExamples.map((example) => example.path),
      packages: registry.map((record) => record.name),
      componentExports: componentExportRefs,
      // The guide content lands in more than one task; an orphan is only
      // provable once every route has its record.
      enforceOrphans: guides.length >= GUIDE_ROUTES.length,
    });
  }
  const search = buildSearch(registry, components, guides);
  const coverage = describeCoverage({ registry, resolve: resolveTarget });
  const coverageItem = {
    name: 'coverage',
    status: 'pass' as const,
    detail: `${coverage.packages} packages, ${coverage.componentExports} component exports, ${coverage.targeted} targeted, ${coverage.fallbacks.length} storybook fallbacks`,
    evidence: { ...coverage },
  };

  const rendered: Record<(typeof FILES)[number], string> = {
    'registry.json': renderJson(registry),
    'api.json': renderJson(components),
    'search-index.json': renderJson(search),
    'examples.json': renderJson(examples),
    'guide-examples.json': renderJson(guideExamples),
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
      if (WRITE_GATE_REPORT) {
        writeGateReport({
          gate: 'docs-metadata',
          status: 'fail',
          executed: true,
          tool: 'generate-docs-metadata',
          startedAt,
          durationMs: elapsedMs(startedAt),
          items: [
            ...problems.map((problem) => ({ name: problem, status: 'fail' as const })),
            coverageItem,
          ],
        });
      }
      console.error('check:docs:metadata: generated metadata is out of date:');
      for (const problem of problems) console.error(`  - ${problem}`);
      console.error('Run `pnpm run generate:docs:metadata` to regenerate.');
      process.exit(1);
    }
    if (WRITE_GATE_REPORT) {
      writeGateReport({
        gate: 'docs-metadata',
        status: 'pass',
        executed: true,
        tool: 'generate-docs-metadata',
        startedAt,
        durationMs: elapsedMs(startedAt),
        items: [...FILES.map((file) => ({ name: file, status: 'pass' as const })), coverageItem],
      });
    }
    console.log(
      `✓ docs metadata current: ${registry.length} packages, ${components.length} components, ${examples.length} examples, ${coverage.componentExports} component exports, ${coverage.targeted} targeted, ${coverage.fallbacks.length} storybook fallbacks`,
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
