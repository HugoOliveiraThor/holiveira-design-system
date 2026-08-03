import { execFileSync } from 'child_process';

const BLOCKED = /(^|\s)(GPL|AGPL|SSPL)/i;
const verbose = process.env.CHECK_VERBOSE === 'true';

function main(): void {
  let stdout: string;
  try {
    stdout = execFileSync('pnpm', ['licenses', 'list', '--json'], {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err) {
    console.error('check:license: failed to run pnpm licenses list');
    if (err instanceof Error) console.error(`  ${err.message}`);
    process.exit(2);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(stdout);
  } catch {
    console.error('check:license: failed to parse pnpm licenses JSON');
    process.exit(2);
  }

  const blocked: string[] = [];
  const unknown: string[] = [];

  for (const [license, pkgs] of Object.entries(data)) {
    const names = Array.isArray(pkgs) ? pkgs.map((p) => (p as { name?: string }).name ?? '?') : [];
    if (BLOCKED.test(license)) {
      blocked.push(`${license}: ${names.join(', ')}`);
    } else if (/UNKNOWN|UNLICENSED/i.test(license)) {
      unknown.push(`${license}: ${names.join(', ')}`);
    }
  }

  if (blocked.length > 0) {
    console.error('check:license: BLOCKED licenses found:');
    for (const b of blocked) console.error(`  ${b}`);
    console.error(`check:license: ${blocked.length} blocked license(s) — CI blocked`);
    process.exit(1);
  }

  if (unknown.length > 0 && verbose) {
    console.log('check:license: UNKNOWN/UNLICENSED (non-blocking):');
    for (const u of unknown) console.log(`  ${u}`);
  }

  console.log('check:license: PASS — no GPL/AGPL/SSPL licenses');
  process.exit(0);
}

main();
