import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Preflight for the built e2e suite.
 *
 * `test:e2e:built` runs Playwright against an existing `out/`, so a missing
 * export must fail here with the build command instead of a browser timeout or
 * a server error.
 */

const indexPath = join(process.cwd(), 'out', 'index.html');

if (!existsSync(indexPath)) {
  console.error(
    `test:e2e:built — ${indexPath} not found. Run: pnpm --filter @ho-dev/docs run build`,
  );
  process.exit(1);
}
