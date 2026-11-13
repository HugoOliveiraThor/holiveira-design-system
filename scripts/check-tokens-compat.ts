/**
 * Read-only token compatibility check.
 *
 * Compares the live surface of `@ho-dev/tokens` (CSS variables plus exported
 * TypeScript paths) with the committed snapshot. Exit codes: `0` compatible,
 * `1` drift, `2` structural failure. It never writes.
 */
import { resolve } from 'node:path';

import { runCheck } from './lib/token-compat';

function readRoot(argv: string[]): string {
  const index = argv.indexOf('--root');
  const value = index === -1 ? undefined : argv[index + 1];
  return value ? resolve(value) : resolve(__dirname, '..');
}

runCheck(readRoot(process.argv.slice(2)))
  .then((result) => {
    for (const line of result.lines) console.log(line);
    process.exitCode = result.code;
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 2;
  });
