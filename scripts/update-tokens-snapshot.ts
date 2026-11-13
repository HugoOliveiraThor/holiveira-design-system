/**
 * The only command that may rewrite the token surface snapshot.
 *
 * Additive changes need a version bump; removals, renames, and repaints need a
 * version bump plus `--approval ads-NNN` pointing at an existing ADS file.
 * Exit codes: `0` recorded, `1` refused, `2` structural failure.
 */
import { resolve } from 'node:path';

import { runSnapshot } from './lib/token-compat';

function readOption(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  return index === -1 ? undefined : argv[index + 1];
}

const argv = process.argv.slice(2);
const rootOption = readOption(argv, '--root');
const root = rootOption ? resolve(rootOption) : resolve(__dirname, '..');
const approval = readOption(argv, '--approval') ?? null;

runSnapshot(root, { approval })
  .then((result) => {
    for (const line of result.lines) console.log(line);
    process.exitCode = result.code;
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 2;
  });
