import { execFileSync } from 'child_process';
import { join } from 'path';

interface SizeLimitEntry {
  name: string;
  passed: boolean;
  size: number;
  sizeLimit: number;
}

/**
 * Parse size-limit JSON output from stdout.
 * size-limit may also emit non-JSON progress lines to stderr.
 */
function parseSizeLimitOutput(stdout: string): SizeLimitEntry[] {
  const trimmed = stdout.trim();
  if (!trimmed) {
    console.error('check:size: size-limit produced empty output');
    process.exit(2);
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    console.error('check:size: failed to parse size-limit JSON output');
    console.error('Output was:');
    console.error(stdout);
    process.exit(2);
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
  const args = ['--json'];

  let stdout: string;
  try {
    stdout = execFileSync(sizeLimitBin, args, {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'stdout' in err) {
      stdout = (err as { stdout: string }).stdout;
    } else {
      console.error('check:size: failed to execute size-limit');
      if (err instanceof Error) {
        console.error(`  ${err.message}`);
      }
      process.exit(2);
    }
  }

  const entries = parseSizeLimitOutput(stdout);
  let blockFailures = 0;
  let warnFailures = 0;

  for (const entry of entries) {
    const pkgName = extractPackageName(entry.name);
    const tier = classifyTier(pkgName);
    const sizeKB = (entry.size / 1000).toFixed(2);
    const limitKB = (entry.sizeLimit / 1000).toFixed(2);

    if (entry.passed) {
      if (verbose) {
        console.log(`  PASS  ${entry.name}: ${sizeKB} KB (limit: ${limitKB} KB)`);
      }
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
        if (verbose) {
          console.log(`  INFO  ${entry.name}: ${sizeKB} KB exceeds ${limitKB} KB (informational)`);
        }
        break;
      default:
        if (verbose) {
          console.log(`  ???   ${entry.name}: ${sizeKB} KB (unclassified)`);
        }
        break;
    }
  }

  const total = entries.length;
  const passed = entries.filter((e) => e.passed).length;
  const failed = total - passed;
  const blocked = blockFailures > 0;

  console.log(`\ncheck:size: ${passed}/${total} entries within budget`);

  if (blockFailures > 0) {
    console.error(`check:size: ${blockFailures} Block-tier failure(s) — CI blocked`);
  }
  if (warnFailures > 0) {
    console.error(`check:size: ${warnFailures} Warn-tier violation(s) — action recommended`);
  }
  if (ciMode && verbose) {
    const summary = {
      total,
      passed,
      failed,
      blockFailures,
      warnFailures,
      blocked,
    };
    console.log(JSON.stringify(summary));
  }

  if (blockFailures > 0) {
    process.exit(1);
  }

  process.exit(0);
}

main();
