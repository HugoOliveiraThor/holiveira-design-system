import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

import {
  ANCHOR_DIR,
  createVirtualProgram,
  discoverPackages,
  exportMap,
  hasRuntimeExport,
  ReadmeProgramError,
  subpathResolves,
} from './readme-program';

const ROOT = process.cwd();
const ANCHOR = join(ROOT, ANCHOR_DIR);

const BLOCKS = [
  {
    file: 'packages/example/README.md',
    block: { lang: 'ts', code: 'export const answer: number = 42;', line: 10 },
  },
  {
    file: 'packages/example/README.md',
    block: {
      lang: 'tsx',
      code: "import { cn } from '@ho-dev/utils';\n\nexport const merged = cn('a', 'b');",
      line: 20,
    },
  },
  {
    file: 'packages/example/README.md',
    block: {
      lang: 'tsx',
      code: [
        "import dynamic from 'next/dynamic';",
        "import { z } from 'zod';",
        "import { useForm } from 'react-hook-form';",
        '',
        'const Lazy = dynamic(() => Promise.resolve(() => null));',
        'const schema = z.object({ email: z.string() });',
        '',
        'export function useMyForm() {',
        '  return { Lazy, schema, form: useForm() };',
        '}',
      ].join('\n'),
      line: 40,
    },
  },
  {
    file: 'docs/architecture/contracts/example.md',
    block: { lang: 'ts', code: "const value: number = 'text';\nexport { value };", line: 5 },
  },
  {
    file: 'packages/example/src/README.md',
    block: {
      lang: 'ts',
      code: [
        "import { cn } from '@ho-dev/utils';",
        "import { AreaChart } from '@ho-dev/charts';",
        "import { helper } from './missing-helper';",
        '',
        'export const widgets = [cn(), AreaChart, helper];',
      ].join('\n'),
      line: 40,
    },
  },
];

const packages = discoverPackages(ROOT);
const program = createVirtualProgram({ root: ROOT, blocks: BLOCKS, packages });

afterAll(() => {
  expect(existsSync(ANCHOR)).toBe(false);
});

describe('readme virtual program', () => {
  it('serves a block from memory without creating the anchor directory', () => {
    expect(existsSync(ANCHOR)).toBe(false);
    const diagnostics = program.diagnosticsFor(program.blocks[0].virtual);
    expect(diagnostics).toEqual([]);
  });

  it('compiles a block that imports a workspace package', () => {
    const diagnostics = program.diagnosticsFor(program.blocks[1].virtual);
    expect(diagnostics).toEqual([]);
  });

  it('resolves next, zod and react-hook-form through the virtual path', () => {
    const diagnostics = program.diagnosticsFor(program.blocks[2].virtual);
    expect(diagnostics.map((entry) => entry.messageText)).toEqual([]);
  });

  it('reports a TypeScript diagnostic for a block that does not compile', () => {
    const diagnostics = program.diagnosticsFor(program.blocks[3].virtual);
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].code).toBe(2322);
    expect(String(diagnostics[0].messageText)).toContain("Type 'string' is not assignable");
  });

  it('reads exports from private packages', () => {
    const map = exportMap(program, packages);
    const auth = map.get('@ho-dev/auth');
    const db = map.get('@ho-dev/db');
    expect(auth).toBeDefined();
    expect(auth?.get('createProxy')).toBe('value');
    expect(auth?.get('AppRole')).toBe('type');
    expect(db?.get('db')).toBe('value');
    const manifest = packages.find((source) => source.name === '@ho-dev/auth');
    expect(manifest?.dir).toBe('packages/auth');
  });

  it('lists public and private packages with value and type kinds', () => {
    const map = exportMap(program, packages);
    expect([...map.keys()]).toHaveLength(20);
    expect(map.get('@ho-dev/ui')?.get('Card')).toBe('value');
    expect(map.get('@ho-dev/ui')?.get('CardProps')).toBe('type');
    expect(hasRuntimeExport(map, '@ho-dev/ui')).toBe(true);
    expect(hasRuntimeExport(map, '@ho-dev/types')).toBe(false);
    expect(hasRuntimeExport(map, '@ho-dev/eslint')).toBe(true);
  });

  it('records the module, names and document line of every import', () => {
    const imports = program.importsOf(program.blocks[1].virtual);
    expect(imports).toEqual([
      {
        module: '@ho-dev/utils',
        names: ['cn'],
        line: 20,
        relative: false,
        resolved: true,
      },
    ]);
  });

  it('maps every later import back to its document line', () => {
    const imports = program.importsOf(program.blocks[4].virtual);
    expect(imports).toEqual([
      { module: '@ho-dev/utils', names: ['cn'], line: 40, relative: false, resolved: true },
      {
        module: '@ho-dev/charts',
        names: ['AreaChart'],
        line: 41,
        relative: false,
        resolved: true,
      },
      {
        module: './missing-helper',
        names: ['helper'],
        line: 42,
        relative: true,
        resolved: false,
      },
    ]);
  });

  it('resolves a documented subpath against the package directory', () => {
    expect(subpathResolves(ROOT, '@ho-dev/charts/chart-styles.css')).toBe(true);
    expect(subpathResolves(ROOT, '@ho-dev/charts/missing.css')).toBe(false);
  });

  it('fails naming a package without a barrel', () => {
    const root = mkdtempSync(join(tmpdir(), 'readme-program-'));
    try {
      mkdirSync(join(root, 'packages', 'broken', 'src'), { recursive: true });
      writeFileSync(
        join(root, 'packages', 'broken', 'package.json'),
        JSON.stringify({ name: '@ho-dev/broken' }),
      );
      writeFileSync(join(root, 'packages', 'broken', 'README.md'), '# @ho-dev/broken\n');
      expect(() => discoverPackages(root)).toThrow(ReadmeProgramError);
      expect(() => discoverPackages(root)).toThrow(/@ho-dev\/broken has no src\/index\.ts/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
