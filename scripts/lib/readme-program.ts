/**
 * The virtual TypeScript program behind the package documentation gate.
 *
 * Every fenced block becomes a module served from memory, named under
 * `apps/docs/src/__readme__/` so `next`, `zod` and `react-hook-form` resolve
 * from the docs app exactly as they do for a consumer. Nothing is written to
 * disk. The same program carries the package barrels, so the export map is a
 * checker walk over the real `src/index.ts`, private packages included.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import ts from 'typescript';

import type { Block } from './readme-markdown';

/** Virtual directory, under the docs app, that blocks are served from. */
export const ANCHOR_DIR = 'apps/docs/src/__readme__';

export interface PackageDocSource {
  /** Repo-relative package directory, e.g. `packages/ui`. */
  dir: string;
  /** Manifest name, e.g. `@ho-dev/ui`. */
  name: string;
  /** Absolute barrel path. */
  barrel: string;
  /** Absolute README path. */
  readme: string;
  /** Absolute contract path, when the package has one. */
  contract?: string;
}

export interface BlockSource {
  /** Repo-relative file the block was read from. */
  file: string;
  block: Block;
}

export interface VirtualBlock extends BlockSource {
  /** Absolute virtual file name the program sees. */
  virtual: string;
}

export type ExportKind = 'value' | 'type';
export type ExportMap = Map<string, Map<string, ExportKind>>;

export interface ImportedNames {
  module: string;
  /** Exported names a named import asks for; empty for a namespace import. */
  names: string[];
  /** Document line the import declaration starts on, 1-based. */
  line: number;
  relative: boolean;
  /** False when the module or a subpath does not resolve. */
  resolved: boolean;
}

export interface VirtualProgramOptions {
  root: string;
  blocks: BlockSource[];
  /** Barrels carried by the same program; defaults to every workspace package. */
  packages?: PackageDocSource[];
}

export interface ReadmeProgram {
  program: ts.Program;
  root: string;
  blocks: VirtualBlock[];
  diagnosticsFor(virtual: string): ts.Diagnostic[];
  importsOf(virtual: string): ImportedNames[];
}

export class ReadmeProgramError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReadmeProgramError';
  }
}

const EXTENSIONS: Record<string, string> = {
  ts: 'ts',
  tsx: 'tsx',
  js: 'js',
  jsx: 'jsx',
};

function extensionOf(lang: string): string {
  return EXTENSIONS[lang] ?? 'ts';
}

/** A short, stable file stem for the block's source document. */
export function slugOf(file: string): string {
  const normalized = file.split('\\').join('/');
  const readme = /^packages\/([^/]+)\/README\.md$/.exec(normalized);
  if (readme !== null) return readme[1];
  const contract = /^docs\/architecture\/contracts\/([^/]+)\.md$/.exec(normalized);
  if (contract !== null) return `contract-${contract[1]}`;
  return normalized.replace(/\.md$/, '').split('/').join('-');
}

/** Compiler options the virtual program runs with. */
export function programOptions(root: string): ts.CompilerOptions {
  return {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    esModuleInterop: true,
    noEmit: true,
    moduleDetection: ts.ModuleDetectionKind.Force,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    baseUrl: root,
    paths: { '@ho-dev/*': ['packages/*/src/index.ts'] },
  };
}

interface Manifest {
  name?: unknown;
}

/** Every workspace package with its barrel, README and contract. */
export function discoverPackages(root: string): PackageDocSource[] {
  const packagesDir = join(root, 'packages');
  const sources: PackageDocSource[] = [];

  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = join(packagesDir, entry.name);
    const manifestPath = join(dir, 'package.json');
    if (!existsSync(manifestPath)) continue;

    let manifest: Manifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest;
    } catch {
      throw new ReadmeProgramError(`packages/${entry.name}/package.json is not valid JSON`);
    }
    if (typeof manifest.name !== 'string' || manifest.name.length === 0) {
      throw new ReadmeProgramError(`packages/${entry.name}/package.json has no name`);
    }

    const barrel = join(dir, 'src', 'index.ts');
    if (!existsSync(barrel)) {
      throw new ReadmeProgramError(`${manifest.name} has no src/index.ts`);
    }
    const readme = join(dir, 'README.md');
    if (!existsSync(readme)) {
      throw new ReadmeProgramError(`${manifest.name} has no README.md`);
    }

    const contract = join(root, 'docs', 'architecture', 'contracts', `${entry.name}.md`);
    sources.push({
      dir: `packages/${entry.name}`,
      name: manifest.name,
      barrel,
      readme,
      contract: existsSync(contract) ? contract : undefined,
    });
  }

  return sources.sort((left, right) => left.name.localeCompare(right.name));
}

interface Host {
  host: ts.CompilerHost;
  options: ts.CompilerOptions;
}

function createHost(root: string, virtual: Map<string, string>): Host {
  const options = programOptions(root);
  const base = ts.createCompilerHost(options, true);
  return {
    options,
    host: {
      ...base,
      getCurrentDirectory: () => root,
      fileExists: (fileName) => virtual.has(fileName) || base.fileExists(fileName),
      readFile: (fileName) => virtual.get(fileName) ?? base.readFile(fileName),
      getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
        const text = virtual.get(fileName);
        if (text !== undefined) return ts.createSourceFile(fileName, text, languageVersion, true);
        return base.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
      },
      writeFile: () => undefined,
    },
  };
}

function importedFrom(node: ts.ImportDeclaration | ts.ExportDeclaration): {
  names: string[];
  namespace: boolean;
} {
  const clause = ts.isImportDeclaration(node) ? node.importClause : undefined;
  if (clause === undefined) {
    const named = ts.isExportDeclaration(node) ? node.exportClause : undefined;
    if (named !== undefined && ts.isNamedExports(named)) {
      return {
        names: named.elements.map((element) => (element.propertyName ?? element.name).text),
        namespace: false,
      };
    }
    return { names: [], namespace: false };
  }
  if (clause.namedBindings === undefined) return { names: [], namespace: false };
  if (ts.isNamespaceImport(clause.namedBindings)) return { names: [], namespace: true };
  return {
    names: clause.namedBindings.elements.map(
      (element) => (element.propertyName ?? element.name).text,
    ),
    namespace: false,
  };
}

/** Build the program that carries the barrels and the virtual blocks. */
export function createVirtualProgram(options: VirtualProgramOptions): ReadmeProgram {
  const { root } = options;
  const packages = options.packages ?? discoverPackages(root);
  const blocks: VirtualBlock[] = options.blocks.map((source, index) => ({
    ...source,
    virtual: join(
      root,
      ANCHOR_DIR,
      `${slugOf(source.file)}-${index}.${extensionOf(source.block.lang)}`,
    ),
  }));
  const virtual = new Map(blocks.map((entry) => [entry.virtual, entry.block.code]));
  const { host, options: compilerOptions } = createHost(root, virtual);

  const program = ts.createProgram({
    rootNames: [
      ...packages.map((source) => source.barrel),
      ...blocks.map((entry) => entry.virtual),
    ],
    options: compilerOptions,
    host,
  });

  const lineOf = (entry: VirtualBlock, position: number): number => {
    const source = program.getSourceFile(entry.virtual);
    const offset = source === undefined ? 0 : source.getLineAndCharacterOfPosition(position).line;
    return entry.block.line + offset;
  };

  const resolves = (moduleName: string, containingFile: string): boolean => {
    const resolved = ts.resolveModuleName(moduleName, containingFile, compilerOptions, host);
    return resolved.resolvedModule !== undefined;
  };

  return {
    program,
    root,
    blocks,
    diagnosticsFor(virtualFile) {
      const source = program.getSourceFile(virtualFile);
      if (source === undefined) return [];
      return [
        ...program.getSyntacticDiagnostics(source),
        ...program.getSemanticDiagnostics(source),
      ];
    },
    importsOf(virtualFile) {
      const entry = blocks.find((block) => block.virtual === virtualFile);
      const source = program.getSourceFile(virtualFile);
      if (entry === undefined || source === undefined) return [];

      const imports: ImportedNames[] = [];
      source.forEachChild((node) => {
        if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return;
        const specifier = node.moduleSpecifier;
        if (specifier === undefined || !ts.isStringLiteral(specifier)) return;
        const moduleName = specifier.text;
        const relative = moduleName.startsWith('.');
        if (!relative && !moduleName.startsWith('@ho-dev/')) return;
        const { names, namespace } = importedFrom(node);
        imports.push({
          module: moduleName,
          names: namespace ? [] : names,
          line: lineOf(entry, node.getStart(source)),
          relative,
          resolved: resolves(moduleName, entry.virtual),
        });
      });
      return imports;
    },
  };
}

/**
 * Whether a `@ho-dev/<pkg>/<subpath>` import resolves: the package declares the
 * subpath in its manifest exports, or the file exists in the package directory.
 */
export function subpathResolves(root: string, moduleName: string): boolean {
  const parts = moduleName.split('/');
  if (parts.length < 3 || parts[0] !== '@ho-dev') return false;
  const packageRoot = join(root, 'packages', parts[1]);
  const subpath = `./${parts.slice(2).join('/')}`;
  try {
    const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
      exports?: Record<string, unknown>;
    };
    if (manifest.exports !== undefined && subpath in manifest.exports) return true;
  } catch {
    return false;
  }
  return existsSync(join(packageRoot, ...parts.slice(2)));
}

/** Barrel exports and their kind, package by package. */
export function exportMap(program: ReadmeProgram, sources: PackageDocSource[]): ExportMap {
  const checker = program.program.getTypeChecker();
  const map: ExportMap = new Map();

  for (const source of sources) {
    const file = program.program.getSourceFile(source.barrel);
    if (file === undefined)
      throw new ReadmeProgramError(`cannot read the barrel of ${source.name}`);
    const symbol = checker.getSymbolAtLocation(file);
    if (symbol === undefined) {
      throw new ReadmeProgramError(`cannot resolve the barrel symbol of ${source.name}`);
    }
    const exports = new Map<string, ExportKind>();
    for (const exported of checker.getExportsOfModule(symbol)) {
      const target =
        (exported.getFlags() & ts.SymbolFlags.Alias) !== 0
          ? checker.getAliasedSymbol(exported)
          : exported;
      exports.set(
        exported.name,
        (target.getFlags() & ts.SymbolFlags.Value) !== 0 ? 'value' : 'type',
      );
    }
    map.set(source.name, exports);
  }

  return map;
}

/** Whether a package exposes anything at runtime, so its README owes an API section. */
export function hasRuntimeExport(map: ExportMap, packageName: string): boolean {
  const exports = map.get(packageName);
  if (exports === undefined) return false;
  for (const kind of exports.values()) {
    if (kind === 'value') return true;
  }
  return false;
}
