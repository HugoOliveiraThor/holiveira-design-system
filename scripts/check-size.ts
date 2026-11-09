import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

import { depVersion, elapsedMs, nowIso, writeGateReport, type GateItem } from './lib/gate-report';

interface SizeLimitEntry {
  name: string;
  passed: boolean;
  size: number;
  sizeLimit: number;
}

const startedAt = nowIso();

function abort(message: string): never {
  console.error(message);
  writeGateReport({
    gate: 'size',
    status: 'error',
    executed: false,
    tool: 'size-limit',
    toolVersion: depVersion('size-limit'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items: [],
    error: message,
  });
  process.exit(2);
}

/** Parse size-limit JSON output from stdout. */
function parseSizeLimitOutput(stdout: string): SizeLimitEntry[] {
  const trimmed = stdout.trim();
  if (!trimmed) {
    abort('check:size: size-limit produced empty output');
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    abort(`check:size: failed to parse size-limit JSON output\nOutput was:\n${stdout}`);
  }
}

const BLOCK_PACKAGES = new Set(['icons', 'charts']);
const WARN_PACKAGES = new Set(['primitives', 'forms', 'layouts', 'ui', 'theme']);

function extractPackageName(entryName: string): string | null {
  const m = entryName.match(/^@ho-dev\/(\w+)/);
  return m ? m[1] : null;
}

function classifyTier(pkgName: string | null): 'block' | 'warn' | 'info' | 'unknown' {
  if (!pkgName) return 'unknown';
  if (BLOCK_PACKAGES.has(pkgName)) return 'block';
  if (WARN_PACKAGES.has(pkgName)) return 'warn';
  return 'info';
}

const verbose = process.env.CHECK_VERBOSE === 'true';
const ciMode = process.env.CI === 'true';

function main(): void {
  const sizeLimitBin = join(__dirname, '..', 'node_modules', '.bin', 'size-limit');

  let stdout: string;
  try {
    stdout = execFileSync(sizeLimitBin, ['--json'], {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'stdout' in err) {
      stdout = (err as { stdout: string }).stdout;
    } else {
      abort(
        `check:size: failed to execute size-limit${err instanceof Error ? `: ${err.message}` : ''}`,
      );
    }
  }

  const entries = parseSizeLimitOutput(stdout);
  let blockFailures = 0;
  let warnFailures = 0;
  const items: GateItem[] = [];

  for (const entry of entries) {
    const pkgName = extractPackageName(entry.name);
    const tier = classifyTier(pkgName);
    const sizeKB = Number((entry.size / 1000).toFixed(2));
    const limitKB = Number((entry.sizeLimit / 1000).toFixed(2));

    items.push({
      name: entry.name,
      status: entry.passed ? 'pass' : tier === 'block' ? 'fail' : 'pass',
      detail: `${sizeKB} KB / limit ${limitKB} KB (tier: ${tier})`,
      evidence: { sizeKB, limitKB, tier, passed: entry.passed },
    });

    if (entry.passed) {
      if (verbose) console.log(`  PASS  ${entry.name}: ${sizeKB} KB (limit: ${limitKB} KB)`);
      continue;
    }

    switch (tier) {
      case 'block':
        blockFailures++;
        console.error(`  BLOCK ${entry.name}: ${sizeKB} KB exceeds ${limitKB} KB`);
        break;
      case 'warn':
        warnFailures++;
        console.error(`  WARN  ${entry.name}: ${sizeKB} KB exceeds ${limitKB} KB`);
        break;
      case 'info':
        if (verbose)
          console.log(`  INFO  ${entry.name}: ${sizeKB} KB exceeds ${limitKB} KB (informational)`);
        break;
      default:
        if (verbose) console.log(`  ???   ${entry.name}: ${sizeKB} KB (unclassified)`);
        break;
    }
  }

  const total = entries.length;
  const passed = entries.filter((e) => e.passed).length;
  const failed = total - passed;

  console.log(`\ncheck:size: ${passed}/${total} entries within budget`);

  if (blockFailures > 0) {
    console.error(`check:size: ${blockFailures} Block-tier failure(s) — CI blocked`);
  }
  if (warnFailures > 0) {
    console.error(`check:size: ${warnFailures} Warn-tier violation(s) — action recommended`);
  }
  if (ciMode && verbose) {
    console.log(
      JSON.stringify({
        total,
        passed,
        failed,
        blockFailures,
        warnFailures,
        blocked: blockFailures > 0,
      }),
    );
  }

  writeGateReport({
    gate: 'size',
    status: blockFailures > 0 ? 'fail' : 'pass',
    executed: true,
    tool: 'size-limit',
    toolVersion: depVersion('size-limit'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items,
  });

  process.exit(blockFailures > 0 ? 1 : 0);
}

main();
