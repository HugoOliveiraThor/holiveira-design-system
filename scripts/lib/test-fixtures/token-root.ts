import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  buildSnapshot,
  renderSnapshot,
  snapshotPath,
  type TokenSnapshot,
  type TokenSurface,
} from '../token-surface';

export const DEFAULT_CSS = `@theme {
  --color-primary: #5750f1;
}
`;

export const DEFAULT_INDEX = `export const colors = { primary: '#5750f1' } as const;
`;

export function defaultSurface(): TokenSurface {
  return {
    css: { '--color-primary': '#5750f1' },
    ts: { 'colors.primary': '#5750f1' },
  };
}

export interface FixtureOverrides {
  css?: string;
  index?: string;
  version?: string;
  /** `undefined` writes the default snapshot, `null` writes none, a string is used verbatim. */
  snapshot?: TokenSnapshot | string | null;
  approvalFiles?: string[];
}

export interface TokenFixture {
  root: string;
  readSnapshotRaw(): string | null;
  writeSnapshotText(text: string): void;
}

export function createTokenFixture(overrides: FixtureOverrides = {}): TokenFixture {
  const root = mkdtempSync(join(tmpdir(), 'token-compat-'));
  const tokenDir = join(root, 'packages', 'tokens');
  mkdirSync(join(tokenDir, 'src'), { recursive: true });
  writeFileSync(join(tokenDir, 'src', 'tokens.css'), overrides.css ?? DEFAULT_CSS);
  writeFileSync(join(tokenDir, 'src', 'index.ts'), overrides.index ?? DEFAULT_INDEX);
  writeFileSync(
    join(tokenDir, 'package.json'),
    `${JSON.stringify({ name: '@ho-dev/tokens', version: overrides.version ?? '0.2.0', private: false }, null, 2)}\n`,
  );

  const snapshot =
    overrides.snapshot === undefined
      ? buildSnapshot(defaultSurface(), { version: '0.2.0', generatedAt: '2026-11-13' })
      : overrides.snapshot;
  if (snapshot !== null) {
    const text = typeof snapshot === 'string' ? snapshot : renderSnapshot(snapshot);
    writeFileSync(snapshotPath(root), text);
  }

  const approvalFiles = overrides.approvalFiles ?? ['ads-012-fixture.md'];
  if (approvalFiles.length > 0) {
    const directory = join(root, 'docs', 'architecture');
    mkdirSync(directory, { recursive: true });
    for (const file of approvalFiles) {
      writeFileSync(join(directory, file), '# fixture ADS\n');
    }
  }

  return {
    root,
    readSnapshotRaw: () => {
      try {
        return readFileSync(snapshotPath(root), 'utf8');
      } catch {
        return null;
      }
    },
    writeSnapshotText: (text) => writeFileSync(snapshotPath(root), text),
  };
}
