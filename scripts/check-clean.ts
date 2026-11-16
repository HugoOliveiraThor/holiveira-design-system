import { execFileSync, spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  symlinkSync,
  unlinkSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Clean-checkout gate.
 *
 * Exports exactly what `HEAD` contains with `git archive`, links the installed
 * `node_modules` into the export, and runs the file-reading gates with the
 * export as their working directory. A file that exists only in the worktree
 * (gitignored, generated, untracked) is invisible here, which is the failure
 * class CI catches and a local run does not.
 *
 * Exit codes: 0 = every gate passed on the export, 1 = a gate failed,
 * 2 = structural error (the archive could not be produced).
 */

export interface CleanGate {
  /** Root script the gate mirrors. */
  name: string;
  /** Tracked script path, relative to the repository root. */
  script: string;
  args: string[];
}

export const GATES: readonly CleanGate[] = [
  {
    name: 'check:docs:metadata',
    script: join('apps', 'docs', 'scripts', 'generate-docs-metadata.ts'),
    args: ['--check'],
  },
  { name: 'check:docs:readme', script: join('scripts', 'check-readme-docs.ts'), args: [] },
  { name: 'check:exports', script: join('scripts', 'check-exports.ts'), args: [] },
];

/** Workspace groups whose installed dependencies the gates import from. */
const WORKSPACE_GROUPS = ['apps', 'packages'];

/** Every installed `node_modules` directory in the export's workspace layout. */
function moduleLinks(exportRoot: string): string[] {
  const links = ['node_modules'];
  for (const group of WORKSPACE_GROUPS) {
    const base = join(exportRoot, group);
    if (!existsSync(base)) continue;
    for (const entry of readdirSync(base)) {
      links.push(join(group, entry, 'node_modules'));
    }
  }
  return links;
}

/** Creates the temporary directory the gates run in. */
export function createExportDirectory(): string {
  return mkdtempSync(join(tmpdir(), 'ho-clean-'));
}

/**
 * Writes the tree `ref` names into a temporary directory and returns its path.
 * The working tree is never read, so a gitignored or uncommitted file cannot
 * satisfy a gate here.
 */
export function exportHead(root: string, ref = 'HEAD', destination?: string): string {
  let archive: Buffer;
  try {
    archive = execFileSync('git', ['archive', ref], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 512 * 1024 * 1024,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`git archive ${ref} failed: ${detail}`);
  }

  const directory = destination ?? createExportDirectory();
  mkdirSync(directory, { recursive: true });
  const tar = spawnSync('tar', ['-x', '-C', directory], { input: archive });
  if (tar.status !== 0) {
    const detail = tar.stderr?.toString().trim() ?? 'unknown error';
    throw new Error(`tar -x failed: ${detail}`);
  }
  return directory;
}

/**
 * Symlinks the installed dependencies into the export so the gates can import.
 * pnpm installs per workspace member, so every member's `node_modules` is
 * linked; only installed dependencies cross, never a tracked source file.
 */
export function linkModules(root: string, exportRoot: string): void {
  for (const relative of moduleLinks(exportRoot)) {
    const source = join(root, relative);
    if (!existsSync(source)) {
      if (relative === 'node_modules') {
        throw new Error(`${relative} is not installed; run pnpm install first`);
      }
      continue;
    }
    const target = join(exportRoot, relative);
    mkdirSync(dirname(target), { recursive: true });
    try {
      unlinkSync(target);
    } catch {
      // Nothing to replace.
    }
    symlinkSync(source, target, 'dir');
  }
}

/** Removes the export and the dependency links pointing into the repository. */
export function removeExport(exportRoot: string): void {
  for (const relative of moduleLinks(exportRoot)) {
    try {
      unlinkSync(join(exportRoot, relative));
    } catch {
      // The link was never created or was already removed.
    }
  }
  rmSync(exportRoot, { recursive: true, force: true });
}

/**
 * Runs the gates in `exportRoot`, with `tsx` from the repository but every
 * relative path resolved against the export. Returns the first failing code.
 */
export function runGates(
  root: string,
  exportRoot: string,
  gates: readonly CleanGate[] = GATES,
): number {
  const tsx = join(root, 'node_modules', '.bin', 'tsx');
  for (const gate of gates) {
    const result = spawnSync(tsx, [join(exportRoot, gate.script), ...gate.args], {
      cwd: exportRoot,
      stdio: 'inherit',
      env: process.env,
    });
    if (result.status !== 0) {
      console.error(`check:clean — ${gate.name} failed on the exported tree`);
      return result.status ?? 1;
    }
  }
  return 0;
}

export interface CleanCheckOptions {
  root?: string;
  ref?: string;
  runGates?: (root: string, exportRoot: string) => number;
}

export async function runCleanCheck(options: CleanCheckOptions = {}): Promise<number> {
  const root = options.root ?? process.cwd();
  const ref = options.ref ?? 'HEAD';

  let exportRoot: string;
  try {
    exportRoot = exportHead(root, ref);
  } catch (error) {
    console.error(`check:clean — ${error instanceof Error ? error.message : String(error)}`);
    return 2;
  }

  try {
    linkModules(root, exportRoot);
    const code = (options.runGates ?? runGates)(root, exportRoot);
    if (code !== 0) return code;
    console.log(`check:clean — ${GATES.length} gates passed on ${ref}`);
    return 0;
  } finally {
    removeExport(exportRoot);
  }
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  void runCleanCheck().then((code) => process.exit(code));
}
