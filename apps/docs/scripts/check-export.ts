import { DOCS_BASE_PATH } from '../site.config';
import { exportChecks, formatExportChecks, summarizeExportChecks } from './lib/export-check';

/**
 * Portal export check.
 *
 * Asserts the built export under `out/` and the sources that produce it; the
 * check list lives in `scripts/lib/export-check.ts` so the suite covers every
 * assertion. Prints one line per check and exits non-zero when one fails.
 */

const report = exportChecks(process.cwd(), DOCS_BASE_PATH);

for (const line of formatExportChecks(report.checks)) {
  console.log(line);
}

if (report.result.missingIndex && report.result.message) {
  console.error(report.result.message);
}

for (const violation of report.result.violations) {
  console.error(`  ${violation.file}: ${violation.url}`);
}

for (const file of report.result.nonIndexHtml) {
  console.error(`  non-index HTML: ${file}`);
}

const { failed, exitCode } = summarizeExportChecks(report.checks);
if (failed.length > 0) {
  console.error(
    `\ncheck:export — ${failed.length} check(s) failed: ${failed
      .map((check) => check.id)
      .join(', ')}`,
  );
}

process.exit(exitCode);
