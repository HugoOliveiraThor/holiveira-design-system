import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();
const APP_ROOT = join(REPO_ROOT, 'apps', 'playground');
const SRC_ROOT = join(APP_ROOT, 'src');

// Built from parts so this scanner does not match its own source.
const PRIVATE_PACKAGES = ['auth', 'api', 'db', 'testing'].map((name) =>
  ['@ho-dev', name].join('/'),
);
const PROCESS_ENV = ['process', 'env'].join('\\.');
const IMPORT_RE = /(?:from\s+|import\s*)['"]([^'"]+)['"]/g;

/** Third-party packages the app may import directly, beyond its own `@ho-dev/*` UI. */
const ALLOWED_EXTERNAL = [
  'react',
  'react-dom',
  'next',
  'zod',
  'react-hook-form',
  'flatpickr',
  'next-themes',
  'clsx',
  'tailwind-merge',
];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

function readSources(): { path: string; text: string }[] {
  return listFiles(SRC_ROOT).map((path) => ({ path, text: readFileSync(path, 'utf8') }));
}

/** Production files only: tests import their own runner and DOM helpers. */
function appSources(): { path: string; text: string }[] {
  return readSources().filter(
    ({ path }) => !/\.test\.(ts|tsx)$/.test(path) && !path.endsWith('/test-setup.ts'),
  );
}

function bareImports(text: string): string[] {
  return [...text.matchAll(IMPORT_RE)]
    .map((match) => match[1])
    .filter((specifier) => !specifier.startsWith('.') && !specifier.startsWith('/'));
}

function isAllowedExternal(specifier: string): boolean {
  if (specifier.startsWith('@ho-dev/')) {
    return true;
  }

  return ALLOWED_EXTERNAL.some((name) => specifier === name || specifier.startsWith(`${name}/`));
}

function hoImports(text: string): string[] {
  return [...text.matchAll(IMPORT_RE)]
    .map((match) => match[1])
    .filter((specifier) => specifier.startsWith('@ho-dev/'))
    .map((specifier) => specifier.split('/').slice(0, 2).join('/'));
}

describe('playground app boundary', () => {
  it('uses only @ho-dev packages in the app', () => {
    const pkg = JSON.parse(readFileSync(join(APP_ROOT, 'package.json'), 'utf8')) as {
      name: string;
      private: boolean;
      dependencies: Record<string, string>;
    };

    expect(pkg.name).toBe('playground');
    expect(pkg.private).toBe(true);

    const declared = Object.keys(pkg.dependencies).filter((name) => name.startsWith('@ho-dev/'));
    const imported = new Set(readSources().flatMap(({ text }) => hoImports(text)));

    expect(declared.length).toBeGreaterThan(0);
    expect(imported.size).toBeGreaterThan(0);
    for (const name of imported) {
      expect(declared).toContain(name);
    }
  });

  it('imports only the approved external packages', () => {
    const sources = appSources();
    expect(sources.length).toBeGreaterThan(0);

    const specifiers = new Set(sources.flatMap(({ text }) => bareImports(text)));
    expect(specifiers.size).toBeGreaterThan(0);

    for (const { path, text } of sources) {
      for (const specifier of bareImports(text)) {
        expect(isAllowedExternal(specifier), `${path} imports ${specifier}`).toBe(true);
      }
    }

    expect(isAllowedExternal('lodash')).toBe(false);
    expect(isAllowedExternal('@tanstack/react-query')).toBe(false);
    expect(isAllowedExternal('react-dom/client')).toBe(true);
    expect(isAllowedExternal('next/link')).toBe(true);
  });

  it('imports no private packages and no environment variables', () => {
    const sources = readSources();
    expect(sources.length).toBeGreaterThan(0);

    const envRead = new RegExp(PROCESS_ENV);

    for (const { path, text } of sources) {
      for (const name of PRIVATE_PACKAGES) {
        expect(text, path).not.toContain(name);
      }
      expect(text, path).not.toMatch(envRead);
    }
  });
});

describe('dead example app', () => {
  it('has no examples with-nextjs', () => {
    expect(existsSync(join(REPO_ROOT, 'examples', 'with-nextjs'))).toBe(false);

    const workspace = readFileSync(join(REPO_ROOT, 'pnpm-workspace.yaml'), 'utf8');
    expect(workspace).not.toContain('examples/');
  });
});
