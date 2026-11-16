import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { assembleArtifact, runArtifactCheck, smokeArtifact } from './check-artifact';

const STORYBOOK_HTML =
  '<html><head><title>@storybook/core - Storybook</title></head><body>storybook</body></html>';
const PLAYGROUND_HTML =
  '<html><head><title>Playground — HO Design System</title></head><body>playground</body></html>';
const DOCS_HTML =
  '<html><head><title>Holiveira Documentation Platform</title></head><body>Holiveira</body></html>';

const created: string[] = [];

function tempDir(prefix: string): string {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  created.push(directory);
  return directory;
}

interface BuildOptions {
  docs?: string | null;
  playground?: string;
  storybook?: string;
}

/** Lays out the three build outputs the workflows produce, under a fake repository root. */
function createRepository(options: BuildOptions = {}): string {
  const root = tempDir('ho-artifact-repo-');

  mkdirSync(join(root, 'apps', 'storybook', 'storybook-static'), { recursive: true });
  writeFileSync(
    join(root, 'apps', 'storybook', 'storybook-static', 'index.html'),
    options.storybook ?? STORYBOOK_HTML,
  );

  mkdirSync(join(root, 'apps', 'playground', 'out'), { recursive: true });
  writeFileSync(
    join(root, 'apps', 'playground', 'out', 'index.html'),
    options.playground ?? PLAYGROUND_HTML,
  );

  if (options.docs !== null) {
    mkdirSync(join(root, 'apps', 'docs', 'out', '_next', 'static'), { recursive: true });
    writeFileSync(join(root, 'apps', 'docs', 'out', 'index.html'), options.docs ?? DOCS_HTML);
    writeFileSync(join(root, 'apps', 'docs', 'out', '_next', 'static', 'app.css'), 'body{}');
  }

  return root;
}

/** A directory shaped like the Pages artifact after both copies. */
function createArtifact(): string {
  const directory = tempDir('ho-artifact-existing-');
  writeFileSync(join(directory, 'index.html'), STORYBOOK_HTML);
  mkdirSync(join(directory, 'playground'), { recursive: true });
  writeFileSync(join(directory, 'playground', 'index.html'), PLAYGROUND_HTML);
  mkdirSync(join(directory, 'docs'), { recursive: true });
  writeFileSync(join(directory, 'docs', 'index.html'), DOCS_HTML);
  return directory;
}

function snapshot(directory: string): Map<string, number> {
  const files = new Map<string, number>();
  const walk = (current: string): void => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      files.set(relative(directory, full).split(sep).join('/'), statSync(full).size);
    }
  };
  walk(directory);
  return files;
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('check-artifact', () => {
  it('assembles the artifact from the three builds', () => {
    const root = createRepository();
    const destination = join(tempDir('ho-artifact-dest-'), 'artifact');

    const directory = assembleArtifact(root, destination);

    expect(directory).toBe(destination);
    expect(readFileSync(join(directory, 'index.html'), 'utf8')).toBe(STORYBOOK_HTML);
    expect(readFileSync(join(directory, 'playground', 'index.html'), 'utf8')).toBe(PLAYGROUND_HTML);
    expect(readFileSync(join(directory, 'docs', 'index.html'), 'utf8')).toBe(DOCS_HTML);
    expect(existsSync(join(directory, 'docs', '_next', 'static', 'app.css'))).toBe(true);
  });

  it('serves the three public paths from one artifact', async () => {
    const root = createRepository();
    const directory = assembleArtifact(root, join(tempDir('ho-artifact-serve-'), 'artifact'));

    const findings = await smokeArtifact(directory);

    expect(findings).toEqual([]);
    expect(existsSync(join(directory, 'index.html'))).toBe(true);
  });

  it('requires a route marker, not only a status', async () => {
    const cases: Array<{ path: string; file: string; body: string; marker: string }> = [
      { path: '/', file: 'index.html', body: DOCS_HTML, marker: '@storybook/core - Storybook' },
      {
        path: '/playground/',
        file: 'playground/index.html',
        body: DOCS_HTML,
        marker: 'Playground',
      },
      { path: '/docs/', file: 'docs/index.html', body: STORYBOOK_HTML, marker: 'Holiveira' },
    ];

    for (const probe of cases) {
      const artifact = createArtifact();
      writeFileSync(join(artifact, probe.file), probe.body);

      const findings = await smokeArtifact(artifact);

      expect(findings, probe.path).toHaveLength(1);
      expect(findings[0], probe.path).toMatchObject({ path: probe.path, problem: 'marker' });
      expect(findings[0].detail, probe.path).toContain(probe.marker);
    }
  });

  it('names the path that is missing', async () => {
    const artifact = createArtifact();
    rmSync(join(artifact, 'docs', 'index.html'));
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const findings = await smokeArtifact(artifact);
    const code = await runArtifactCheck(['--artifact', artifact], artifact);

    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ path: '/docs/', problem: 'missing' });
    expect(code).toBe(1);
    expect(errors.mock.calls.flat().join('\n')).toContain('/docs/');
  });

  it('names the build output that is missing', async () => {
    const root = createRepository({ docs: null });
    const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const code = await runArtifactCheck([], root);

    expect(code).toBe(2);
    expect(() => assembleArtifact(root)).toThrow(/apps\/docs\/out/);
    expect(errors.mock.calls.flat().join('\n')).toContain(join('apps', 'docs', 'out'));
  });

  it('validates an existing artifact directory', async () => {
    const artifact = createArtifact();
    const emptyRoot = tempDir('ho-artifact-empty-');
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const code = await runArtifactCheck(['--artifact', artifact], emptyRoot);

    expect(code).toBe(0);
    expect(readdirSync(emptyRoot)).toEqual([]);
    expect(existsSync(join(emptyRoot, 'apps'))).toBe(false);
  });

  it('leaves the repository untouched', () => {
    const root = createRepository();
    const before = snapshot(root);

    const directory = assembleArtifact(root);
    const after = snapshot(root);
    created.push(directory);

    expect(directory.startsWith(tmpdir())).toBe(true);
    expect(directory.startsWith(root)).toBe(false);
    expect(after).toEqual(before);
    expect(existsSync(join(root, 'apps', 'storybook', 'storybook-static', 'docs'))).toBe(false);
    expect(existsSync(join(root, 'apps', 'storybook', 'storybook-static', 'playground'))).toBe(
      false,
    );
  });
});
