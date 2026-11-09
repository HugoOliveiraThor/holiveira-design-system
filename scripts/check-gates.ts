import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Gate summary / honesty audit.
 *
 * Reads the canonical reports written by each `check:*` script and verifies:
 *  1. every expected gate produced a report;
 *  2. every report matches the contract (`gate`, `status`, `executed`, `tool`,
 *     `startedAt`, `durationMs`, `items`);
 *  3. no report is a "false green" (`executed: false` with `status: "pass"`);
 *  4. every reported gate status is `pass`.
 *
 * This is the layer the future Quality Engine will consume. It intentionally
 * does not re-run the gates — it audits their output.
 */
const GATES_DIR = process.env.HO_GATES_DIR ?? join(__dirname, '..', 'reports', 'gates');
const SUMMARY_FILE = join(GATES_DIR, 'summary.json');

/** Gates that MUST have produced a report after a full pipeline run. */
const EXPECTED_GATES = ['tokens', 'size', 'publish', 'license', 'exports', 'install'];

interface GateItem {
  name: string;
  status: string;
  detail?: string;
}

interface GateReport {
  gate: string;
  status: string;
  executed: boolean;
  tool: string;
  toolVersion?: string;
  startedAt: string;
  durationMs: number;
  items: GateItem[];
  error?: string;
}

interface Finding {
  gate: string;
  kind: 'missing' | 'contract' | 'false-green' | 'failing';
  detail: string;
}

function loadReports(): Map<string, GateReport> {
  const reports = new Map<string, GateReport>();
  if (!existsSync(GATES_DIR)) return reports;
  for (const file of readdirSync(GATES_DIR)) {
    if (!file.endsWith('.json') || file === 'summary.json') continue;
    try {
      const report = JSON.parse(readFileSync(join(GATES_DIR, file), 'utf8')) as GateReport;
      if (typeof report.gate === 'string') reports.set(report.gate, report);
    } catch {
      reports.set(file.replace(/\.json$/, ''), {
        gate: file.replace(/\.json$/, ''),
        status: 'error',
        executed: false,
        tool: 'unknown',
        startedAt: '',
        durationMs: 0,
        items: [],
        error: 'unparseable report',
      });
    }
  }
  return reports;
}

function validateContract(report: GateReport): string[] {
  const problems: string[] = [];
  if (typeof report.status !== 'string') problems.push('missing status');
  if (typeof report.executed !== 'boolean') problems.push('missing executed');
  if (typeof report.tool !== 'string') problems.push('missing tool');
  if (typeof report.startedAt !== 'string') problems.push('missing startedAt');
  if (typeof report.durationMs !== 'number') problems.push('missing durationMs');
  if (!Array.isArray(report.items)) problems.push('missing items');
  return problems;
}

function main(): void {
  mkdirSync(GATES_DIR, { recursive: true });
  const reports = loadReports();
  const findings: Finding[] = [];

  for (const gate of EXPECTED_GATES) {
    const report = reports.get(gate);
    if (!report) {
      findings.push({ gate, kind: 'missing', detail: 'no report found' });
      continue;
    }
    const contractProblems = validateContract(report);
    if (contractProblems.length > 0) {
      findings.push({ gate, kind: 'contract', detail: contractProblems.join(', ') });
    }
    if (report.executed === false && report.status === 'pass') {
      findings.push({
        gate,
        kind: 'false-green',
        detail: 'executed=false but status=pass',
      });
    }
    if (report.status !== 'pass') {
      findings.push({
        gate,
        kind: 'failing',
        detail: `status=${report.status}${report.error ? ` (${report.error})` : ''}`,
      });
    }
  }

  console.log('check:gates — canonical gate summary\n');
  for (const gate of EXPECTED_GATES) {
    const report = reports.get(gate);
    if (!report) {
      console.log(`  ✗ ${gate.padEnd(10)} MISSING`);
      continue;
    }
    const mark = report.status === 'pass' ? '✓' : '✗';
    const executed = report.executed ? 'executed' : 'NOT EXECUTED';
    console.log(
      `  ${mark} ${gate.padEnd(10)} ${report.status.padEnd(6)} ${executed} ` +
        `${report.tool}${report.toolVersion ? `@${report.toolVersion}` : ''} (${report.durationMs}ms)`,
    );
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    gates: EXPECTED_GATES.map((gate) => {
      const report = reports.get(gate);
      return report
        ? {
            gate: report.gate,
            status: report.status,
            executed: report.executed,
            tool: report.tool,
            toolVersion: report.toolVersion ?? null,
            durationMs: report.durationMs,
            itemCount: report.items.length,
          }
        : { gate, status: 'missing', executed: false };
    }),
    findings,
    ok: findings.length === 0,
  };
  writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`);

  if (findings.length > 0) {
    console.error('\ncheck:gates: FAIL');
    for (const f of findings) {
      console.error(`  [${f.kind}] ${f.gate}: ${f.detail}`);
    }
    process.exit(1);
  }

  console.log('\ncheck:gates: PASS — all expected gates executed and passed');
  process.exit(0);
}

main();
