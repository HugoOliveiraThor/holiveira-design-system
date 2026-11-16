import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { extname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Artifact smoke.
 *
 * Assembles Storybook, the playground export and the portal export into one
 * directory, serves it on an ephemeral port, and requires HTTP 200 plus a
 * route-specific marker for `/`, `/playground/` and `/docs/`.
 *
 * `--artifact <dir>` validates an existing artifact (the Pages workflow) instead
 * of assembling one. The default run copies into `os.tmpdir()` and removes the
 * copy, so the repository, `storybook-static` and both exports stay untouched.
 *
 * Exit codes: 0 = every route served its own document, 1 = at least one route
 * finding, 2 = structural error (a build output is missing).
 */

export const DEFAULT_OUTPUTS = {
  storybook: join('apps', 'storybook', 'storybook-static'),
  playground: join('apps', 'playground', 'out'),
  docs: join('apps', 'docs', 'out'),
} as const;

export interface ArtifactRoute {
  /** Public path served from the artifact root. */
  path: string;
  /** File inside the artifact that answers the path. */
  file: string;
  /** String that only this route's document contains. */
  marker: string;
}

export const ROUTES: readonly ArtifactRoute[] = [
  { path: '/', file: 'index.html', marker: '@storybook/core - Storybook' },
  {
    path: '/playground/',
    file: 'playground/index.html',
    marker: 'Playground — HO Design System',
  },
  { path: '/docs/', file: 'docs/index.html', marker: 'Holiveira' },
];

export interface ArtifactFinding {
  path: string;
  problem: 'missing' | 'status' | 'marker';
  detail: string;
}

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

/** Copies every entry of `source` into `target`, like `cp -R source/. target/`. */
function copyContents(source: string, target: string): void {
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(source)) {
    cpSync(join(source, entry), join(target, entry), { recursive: true });
  }
}

function outputMissing(file: string, command: string): Error {
  return new Error(`${file} has no index.html. Run: ${command}`);
}

/**
 * Copies the three build outputs into one temporary artifact and returns its
 * path. Throws, naming the output directory, when an export has not been built.
 */
export function assembleArtifact(root: string, destination?: string): string {
  const sources = [
    {
      source: join(root, DEFAULT_OUTPUTS.storybook),
      target: undefined,
      command: 'pnpm run build:storybook',
    },
    {
      source: join(root, DEFAULT_OUTPUTS.playground),
      target: 'playground',
      command: 'pnpm run build',
    },
    { source: join(root, DEFAULT_OUTPUTS.docs), target: 'docs', command: 'pnpm run build' },
  ];

  for (const entry of sources) {
    if (!existsSync(join(entry.source, 'index.html'))) {
      throw outputMissing(entry.source, entry.command);
    }
  }

  const directory = destination ?? mkdtempSync(join(tmpdir(), 'ho-artifact-'));
  mkdirSync(directory, { recursive: true });
  for (const entry of sources) {
    copyContents(entry.source, entry.target ? join(directory, entry.target) : directory);
  }
  return directory;
}

function staticServer(root: string): Server {
  return createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');
    const pathname = decodeURIComponent(url.pathname);
    const target = resolve(root, `.${pathname}`);

    if (target !== root && !target.startsWith(`${root}${sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }

    if (!pathname.endsWith('/') && existsSync(target) && statSync(target).isDirectory()) {
      response.writeHead(301, { location: `${pathname}/` });
      response.end();
      return;
    }

    const file = pathname.endsWith('/') ? join(target, 'index.html') : target;
    if (!existsSync(file) || !statSync(file).isFile()) {
      response.writeHead(404);
      response.end('not found');
      return;
    }

    response.writeHead(200, {
      'content-type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream',
    });
    response.end(readFileSync(file));
  });
}

function listen(server: Server): Promise<number> {
  return new Promise((resolvePort, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      resolvePort((server.address() as AddressInfo).port);
    });
  });
}

function close(server: Server): Promise<void> {
  return new Promise((resolveClose, reject) => {
    server.close((error) => (error ? reject(error) : resolveClose()));
  });
}

/**
 * Requests every public path from `directory` and returns one finding per route
 * that is missing, does not answer 200, or serves a document without its marker.
 */
export async function smokeArtifact(directory: string): Promise<ArtifactFinding[]> {
  const root = resolve(directory);
  const findings: ArtifactFinding[] = [];

  for (const route of ROUTES) {
    const file = join(root, route.file);
    if (!existsSync(file) || !statSync(file).isFile()) {
      findings.push({
        path: route.path,
        problem: 'missing',
        detail: `${route.file} not found in ${root}`,
      });
    }
  }

  const server = staticServer(root);
  const port = await listen(server);
  try {
    for (const route of ROUTES) {
      if (findings.some((finding) => finding.path === route.path)) continue;

      const response = await fetch(`http://127.0.0.1:${port}${route.path}`);
      const body = await response.text();
      if (response.status !== 200) {
        findings.push({
          path: route.path,
          problem: 'status',
          detail: `expected 200, got ${response.status}`,
        });
        continue;
      }
      if (!body.includes(route.marker)) {
        findings.push({
          path: route.path,
          problem: 'marker',
          detail: `response body has no ${JSON.stringify(route.marker)}`,
        });
      }
    }
  } finally {
    await close(server);
  }

  return findings;
}

/**
 * CLI entry point. `--artifact <dir>` serves an existing artifact; the default
 * assembles one in a temporary directory and removes it afterwards.
 */
export async function runArtifactCheck(argv: string[], root = process.cwd()): Promise<number> {
  const flag = argv.indexOf('--artifact');
  const artifact = flag === -1 ? undefined : argv[flag + 1];

  let directory: string;
  let assembled = false;
  if (artifact !== undefined) {
    directory = resolve(root, artifact);
  } else {
    try {
      directory = assembleArtifact(root);
      assembled = true;
    } catch (error) {
      console.error(`check:artifact — ${error instanceof Error ? error.message : String(error)}`);
      return 2;
    }
  }

  try {
    console.log(`check:artifact — serving ${directory}`);
    const findings = await smokeArtifact(directory);
    if (findings.length > 0) {
      for (const finding of findings) {
        console.error(`FAIL ${finding.problem}: ${finding.path} — ${finding.detail}`);
      }
      console.error(`\ncheck:artifact — ${findings.length} finding(s)`);
      return 1;
    }
    console.log('check:artifact — /, /playground/ and /docs/ each served their own document');
    return 0;
  } finally {
    if (assembled) rmSync(directory, { recursive: true, force: true });
  }
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  void runArtifactCheck(process.argv.slice(2)).then((code) => process.exit(code));
}
