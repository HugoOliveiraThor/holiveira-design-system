import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Repository root, derived from this file (`<repo>/scripts/lib/`). */
const REPO_ROOT = join(__dirname, '..', '..');

/** Canonical status for a gate (consumed by the future Quality Engine). */
export type GateStatus = 'pass' | 'fail' | 'error' | 'skipped';

/** A single result item inside a gate. */
export interface GateItem {
  name: string;
  status: GateStatus;
  detail?: string;
  evidence?: Record<string, unknown>;
}

/**
 * Canonical gate report. Every `check:*` script MUST write one of these to
 * `reports/gates/<gate>.json`.
 *
 * `executed` is the anti-false-green field: it MUST be `false` when the
 * underlying tool did not actually run (e.g. missing binary, crash before
 * analysis), independently of `status`. A report with `executed: false` and
 * `status: "pass"` is a contract violation.
 */
export interface GateReport {
  gate: string;
  status: GateStatus;
  executed: boolean;
  tool: string;
  toolVersion?: string;
  startedAt: string;
  durationMs: number;
  items: GateItem[];
  error?: string;
}

export const GATES_DIR = process.env.HO_GATES_DIR ?? join(REPO_ROOT, 'reports', 'gates');

export function writeGateReport(report: GateReport): string {
  mkdirSync(GATES_DIR, { recursive: true });
  const file = join(GATES_DIR, `${report.gate}.json`);
  writeFileSync(file, `${JSON.stringify(report, null, 2)}\n`);
  return file;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function elapsedMs(startedAt: string): number {
  return Date.now() - new Date(startedAt).getTime();
}

/** Read a dependency's version without failing when it is unavailable. */
export function depVersion(name: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(join(REPO_ROOT, 'node_modules', name, 'package.json'));
    return typeof pkg.version === 'string' ? pkg.version : undefined;
  } catch {
    return undefined;
  }
}
