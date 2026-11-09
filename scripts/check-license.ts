import { execFileSync } from 'node:child_process';

import { depVersion, elapsedMs, nowIso, writeGateReport, type GateItem } from './lib/gate-report';

const BLOCKED = /(^|\s)(GPL|AGPL|SSPL)/i;
const verbose = process.env.CHECK_VERBOSE === 'true';
const startedAt = nowIso();

function abort(message: string): never {
  console.error(message);
  writeGateReport({
    gate: 'license',
    status: 'error',
    executed: false,
    tool: 'pnpm licenses list',
    toolVersion: depVersion('pnpm'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items: [],
    error: message,
  });
  process.exit(2);
}

function main(): void {
  let stdout: string;
  try {
    stdout = execFileSync('pnpm', ['licenses', 'list', '--json'], {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err) {
    abort(
      `check:license: failed to run pnpm licenses list${err instanceof Error ? `: ${err.message}` : ''}`,
    );
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(stdout);
  } catch {
    abort('check:license: failed to parse pnpm licenses JSON');
  }

  const items: GateItem[] = [];
  const blocked: string[] = [];
  const unknown: string[] = [];

  for (const [license, pkgs] of Object.entries(data)) {
    const names = Array.isArray(pkgs) ? pkgs.map((p) => (p as { name?: string }).name ?? '?') : [];
    if (BLOCKED.test(license)) {
      blocked.push(`${license}: ${names.join(', ')}`);
      items.push({ name: license, status: 'fail', detail: names.join(', ') });
    } else if (/UNKNOWN|UNLICENSED/i.test(license)) {
      unknown.push(`${license}: ${names.join(', ')}`);
      items.push({ name: license, status: 'pass', detail: 'unknown (non-blocking)' });
    } else {
      items.push({ name: license, status: 'pass', detail: `${names.length} package(s)` });
    }
  }

  if (blocked.length > 0) {
    console.error('check:license: BLOCKED licenses found:');
    for (const b of blocked) console.error(`  ${b}`);
    console.error(`check:license: ${blocked.length} blocked license(s) — CI blocked`);
    writeGateReport({
      gate: 'license',
      status: 'fail',
      executed: true,
      tool: 'pnpm licenses list',
      toolVersion: depVersion('pnpm'),
      startedAt,
      durationMs: elapsedMs(startedAt),
      items,
    });
    process.exit(1);
  }

  if (unknown.length > 0 && verbose) {
    console.log('check:license: UNKNOWN/UNLICENSED (non-blocking):');
    for (const u of unknown) console.log(`  ${u}`);
  }

  console.log('check:license: PASS — no GPL/AGPL/SSPL licenses');
  writeGateReport({
    gate: 'license',
    status: 'pass',
    executed: true,
    tool: 'pnpm licenses list',
    toolVersion: depVersion('pnpm'),
    startedAt,
    durationMs: elapsedMs(startedAt),
    items,
  });
  process.exit(0);
}

main();
