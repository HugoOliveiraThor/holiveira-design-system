import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { depVersion, elapsedMs, nowIso, writeGateReport, type GateItem } from './lib/gate-report';

const PACKAGES_DIR = join(__dirname, '..', 'packages');
const verbose = process.env.CHECK_VERBOSE === 'true';
const startedAt = nowIso();

// Dedicated npm cache: `attw --pack` shells out to `npm pack`, and the user's
// global npm cache may be unwritable (root-owned files). A temp cache keeps the
// gate deterministic and independent of the machine's npm state.
const NPM_CACHE = join(tmpdir(), 'ho-dev-check-publish-npm-cache');
mkdirSync(NPM_CACHE, { recursive: true });

const AGADOO_PACKAGES = new Set([
  'utils',
  'constants',
  'tokens',
  'types',
  'hooks',
  'providers',
  'i18n',
  'config',
]);

// `config` reads process.env.NODE_ENV at module top level (isDev/isProd/isTest),
// so it cannot be tree-shaken. This is a documented, intentional exception.
const AGADOO_EXCEPTIONS = new Set(['config']);

interface ToolResult {
  name: 'publint' | 'agadoo' | 'attw';
  target: string;
  ok: boolean;
  executed: boolean;
  outputException: boolean;
  output: string;
}

function publicPackages(): string[] {
  return readdirSync(PACKAGES_DIR)
    .filter((d) => !d.startsWith('.'))
    .filter((d) => {
      const pkgPath = join(PACKAGES_DIR, d, 'package.json');
      if (!existsSync(pkgPath)) return false;
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      return pkg.private !== true;
    })
    .sort();
}

/**
 * CSS subpath exports (e.g. `./theme.css`) are valid for consumers, but attw
 * analyses JS/TS resolution and reports a false "no resolution" for CSS files.
 * Those entrypoints are excluded from the attw run — the JS entrypoints remain
 * fully analysed and blocking.
 */
function cssEntrypoints(pkgDir: string): string[] {
  const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
  const exportsMap = pkg.exports ?? {};
  return Object.keys(exportsMap)
    .filter((key) => key.endsWith('.css'))
    .map((key) => (key.startsWith('.') ? key : `./${key}`));
}

function run(cmd: string, args: string[]): { ok: boolean; executed: boolean; output: string } {
  try {
    const output = execFileSync(cmd, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, npm_config_cache: NPM_CACHE },
    });
    return { ok: true, executed: true, output };
  } catch (err) {
    const e = err as {
      stdout?: Buffer | string;
      stderr?: Buffer | string;
      code?: string;
    };
    const out = Buffer.isBuffer(e.stdout) ? e.stdout.toString() : (e.stdout ?? '');
    const errOut = Buffer.isBuffer(e.stderr) ? e.stderr.toString() : (e.stderr ?? '');
    // ENOENT means the binary never ran; any other error means it ran and failed.
    const executed = e.code !== 'ENOENT';
    return { ok: false, executed, output: `${out}\n${errOut}`.trim() };
  }
}

function main(): void {
  const pkgs = publicPackages();
  const results: ToolResult[] = [];

  for (const pkg of pkgs) {
    const dir = join(PACKAGES_DIR, pkg);
    const distDir = join(dir, 'dist');
    if (!existsSync(distDir)) {
      console.error(`check:publish: ${pkg} missing dist/ — run pnpm run build first`);
      writeGateReport({
        gate: 'publish',
        status: 'error',
        executed: false,
        tool: 'publint+agadoo+attw',
        startedAt,
        durationMs: elapsedMs(startedAt),
        items: [],
        error: `${pkg} missing dist/`,
      });
      process.exit(2);
    }

    const publint = run('publint', [dir]);
    results.push({
      name: 'publint',
      target: pkg,
      ok: publint.ok,
      executed: publint.executed,
      outputException: false,
      output: publint.output,
    });

    if (AGADOO_PACKAGES.has(pkg)) {
      const agadoo = run('agadoo', [join(distDir, 'index.js')]);
      results.push({
        name: 'agadoo',
        target: pkg,
        ok: agadoo.ok,
        executed: agadoo.executed,
        outputException: AGADOO_EXCEPTIONS.has(pkg) && !agadoo.ok,
        output: agadoo.output,
      });
    }

    // ESM-only by design: run the `esm-only` profile (ignores node10/CJS
    // resolutions) and exclude CSS subpaths (attw cannot analyse them).
    const attwArgs = ['--pack', dir, '--profile', 'esm-only'];
    const css = cssEntrypoints(dir);
    if (css.length > 0) attwArgs.push('--exclude-entrypoints', ...css);

    const attw = run('attw', attwArgs);
    results.push({
      name: 'attw',
      target: pkg,
      ok: attw.ok,
      executed: attw.executed,
      outputException: false,
      output: attw.output,
    });
  }

  let failed = false;
  const items: GateItem[] = [];

  for (const r of results) {
    const label = `${r.name} ${r.target}`;
    if (r.ok) {
      if (verbose) console.log(`check:publish: ${label}: PASS`);
      items.push({ name: label, status: 'pass', evidence: { executed: r.executed } });
    } else if (r.outputException) {
      if (verbose) console.warn(`check:publish: ${label}: EXCEPTION (documented, non-blocking)`);
      console.warn(r.output);
      items.push({
        name: label,
        status: 'pass',
        detail: 'documented exception',
        evidence: { executed: r.executed },
      });
    } else {
      failed = true;
      console.error(`check:publish: ${label}: FAIL`);
      console.error(r.output);
      items.push({
        name: label,
        status: r.executed ? 'fail' : 'error',
        detail: r.executed ? 'tool reported a problem' : 'tool did not execute',
        evidence: { executed: r.executed },
      });
    }
  }

  const passed = results.filter((r) => r.ok || r.outputException).length;
  console.log(
    `check:publish: ${passed}/${results.length} tool runs passed (${pkgs.length} packages)`,
  );

  writeGateReport({
    gate: 'publish',
    status: failed ? 'fail' : 'pass',
    executed: results.every((r) => r.executed),
    tool: 'publint+agadoo+attw',
    toolVersion: depVersion('publint'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items,
  });

  process.exit(failed ? 1 : 0);
}

main();
