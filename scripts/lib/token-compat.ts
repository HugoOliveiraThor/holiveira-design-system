/**
 * Token compatibility commands — the orchestration behind the read-only check and
 * the single write command that may change the recorded surface.
 *
 * Both return `{ code, lines }` and never print, so fixtures drive every branch
 * without touching the repository. Exit codes: `0` compatible, `1` drift or a
 * refused write, `2` structural failure.
 */
import { writeFileSync } from 'node:fs';

import {
  buildSnapshot,
  collectSurface,
  compareVersions,
  diffSurfaces,
  isBreakingBump,
  isVersionRegression,
  readPackageVersion,
  readSnapshot,
  renderSnapshot,
  resolveApproval,
  snapshotPath,
  type TokenSurface,
  today,
  TokenSurfaceError,
} from './token-surface';

export const ADDITIVE_INSTRUCTION =
  'Additive change: bump the @ho-dev/tokens version, then run `pnpm run generate:tokens:snapshot`.';

export const BREAKING_INSTRUCTION =
  'Breaking change: a new ADS approved by the ARB is required before the snapshot is regenerated.';

export interface CompatResult {
  code: number;
  lines: string[];
}

export interface CompatDeps {
  /** Collect the live surface; injected so tests never import a fixture root. */
  collectSurface(root: string): Promise<TokenSurface>;
}

const defaultDeps: CompatDeps = { collectSurface };

function counts(surface: TokenSurface): string {
  return `${Object.keys(surface.css).length} css variables, ${Object.keys(surface.ts).length} typescript paths`;
}

function diffLines(diff: ReturnType<typeof diffSurfaces>): string[] {
  const lines: string[] = [];
  const faces: Array<[string, (typeof diff)['css']]> = [
    ['css', diff.css],
    ['ts', diff.ts],
  ];
  const sections: Array<[string, (face: (typeof diff)['css']) => string[]]> = [
    ['added', (face) => face.added],
    ['removed', (face) => face.removed],
    [
      'value-changed',
      (face) => face.changed.map((entry) => `${entry.path}: ${entry.from} -> ${entry.to}`),
    ],
  ];
  for (const [classification, pick] of sections) {
    for (const [faceName, face] of faces) {
      const entries = pick(face);
      if (entries.length === 0) continue;
      lines.push(`${classification} (${faceName}):`);
      for (const entry of entries) lines.push(`  ${entry}`);
    }
  }
  return lines;
}

function structuralError(error: unknown): CompatResult {
  if (error instanceof TokenSurfaceError) return { code: 2, lines: [`✗ ${error.message}`] };
  throw error;
}

/** Read-only: compares the live surface to the snapshot and classifies the drift. */
export async function runCheck(
  root: string,
  deps: CompatDeps = defaultDeps,
): Promise<CompatResult> {
  try {
    const snapshot = readSnapshot(root);
    if (!snapshot) {
      return {
        code: 2,
        lines: [
          '✗ snapshot missing at packages/tokens/tokens.snapshot.json',
          'Run `pnpm run generate:tokens:snapshot` to record the current surface.',
        ],
      };
    }
    const version = readPackageVersion(root);
    if (isVersionRegression(version, snapshot.version)) {
      return {
        code: 2,
        lines: [
          `✗ version regression: package.json has ${version} but the snapshot recorded ${snapshot.version}`,
        ],
      };
    }
    const surface = await deps.collectSurface(root);
    const diff = diffSurfaces(snapshot, surface);
    if (diff.empty) {
      return { code: 0, lines: [`✓ token surface compatible: ${counts(surface)}`] };
    }
    const lines = [
      `✗ token surface changed (${diff.breaking ? 'breaking' : 'additive'})`,
      ...diffLines(diff),
      diff.breaking ? BREAKING_INSTRUCTION : ADDITIVE_INSTRUCTION,
    ];
    return { code: 1, lines };
  } catch (error) {
    return structuralError(error);
  }
}

export interface SnapshotOptions {
  approval?: string | null;
}

function writeSnapshot(root: string, content: string): void {
  writeFileSync(snapshotPath(root), content);
}

function approvalRefusal(approval: string): CompatResult {
  return {
    code: 1,
    lines: [`✗ approval "${approval}" has no matching docs/architecture file`],
  };
}

/** The only writer: validates version, approval, and bump before touching the file. */
export async function runSnapshot(
  root: string,
  options: SnapshotOptions = {},
  deps: CompatDeps = defaultDeps,
): Promise<CompatResult> {
  try {
    const snapshot = readSnapshot(root);
    const version = readPackageVersion(root);
    const surface = await deps.collectSurface(root);

    if (snapshot && isVersionRegression(version, snapshot.version)) {
      return {
        code: 2,
        lines: [
          `✗ version regression: package.json has ${version} but the snapshot recorded ${snapshot.version}`,
        ],
      };
    }

    if (!snapshot) {
      if (options.approval && !resolveApproval(root, options.approval)) {
        return approvalRefusal(options.approval);
      }
      const created = buildSnapshot(surface, { version, approval: options.approval ?? null });
      writeSnapshot(root, renderSnapshot(created));
      return { code: 0, lines: [`✓ snapshot created at ${version}: ${counts(surface)}`] };
    }

    const diff = diffSurfaces(snapshot, surface);
    if (diff.empty) {
      if (compareVersions(version, snapshot.version) === 0) {
        return { code: 0, lines: [`✓ snapshot already current at ${version}`] };
      }
      const refreshed = { ...snapshot, version, generatedAt: today() };
      writeSnapshot(root, renderSnapshot(refreshed));
      return { code: 0, lines: [`✓ snapshot metadata refreshed to ${version}`] };
    }

    if (compareVersions(version, snapshot.version) <= 0) {
      return {
        code: 1,
        lines: [
          `✗ version ${version} does not advance the snapshot version ${snapshot.version}`,
          diff.breaking
            ? 'A breaking change needs a minor bump before the snapshot is recorded.'
            : 'An additive change needs at least a patch bump before the snapshot is recorded.',
        ],
      };
    }

    if (diff.breaking && !options.approval) {
      return {
        code: 1,
        lines: [
          '✗ breaking change without an approval reference',
          ...diffLines(diff),
          'Pass --approval ads-NNN after the ARB approves the change.',
        ],
      };
    }

    if (options.approval && !resolveApproval(root, options.approval)) {
      return approvalRefusal(options.approval);
    }

    if (diff.breaking && !isBreakingBump(snapshot.version, version)) {
      return {
        code: 1,
        lines: [
          `✗ ${version} is not a breaking bump of ${snapshot.version}`,
          'A breaking change needs a minor bump below 1.0 and a major bump from 1.0.',
        ],
      };
    }

    const recorded = buildSnapshot(surface, {
      version,
      approval: options.approval ?? null,
    });
    writeSnapshot(root, renderSnapshot(recorded));
    return {
      code: 0,
      lines: [
        `✓ snapshot recorded at ${version}: ${counts(surface)}`,
        `approval: ${recorded.approval ?? 'none'}`,
      ],
    };
  } catch (error) {
    return structuralError(error);
  }
}
