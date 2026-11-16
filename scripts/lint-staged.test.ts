import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

interface StagedConfig {
  [glob: string]: string[];
}

const stagedConfig = JSON.parse(
  readFileSync(join(ROOT, '.lintstagedrc.json'), 'utf8'),
) as StagedConfig;

interface StagedTask {
  glob: string;
  commands: string[];
}

function stagedTasks(): StagedTask[] {
  return Object.entries(stagedConfig).map(([glob, commands]) => ({
    glob,
    commands,
  }));
}

/** Extensions a `*.ext` or `*.{a,b}` glob claims, so a filename can be matched. */
function extensionsOf(glob: string): string[] {
  const braced = /^\*\.\{([^}]+)\}$/.exec(glob);
  if (braced !== null) return braced[1].split(',').map((extension) => `.${extension.trim()}`);
  const single = /^\*(\.[a-z]+)$/.exec(glob);
  return single === null ? [] : [single[1]];
}

function commandsFor(file: string): string[] {
  const extension = file.slice(file.lastIndexOf('.'));
  return stagedTasks()
    .filter((task) => extensionsOf(task.glob).includes(extension))
    .flatMap((task) => task.commands);
}

describe('lint-staged', () => {
  it('covers code and docs in the staged configuration', () => {
    expect(commandsFor('button.tsx')).toEqual(['eslint --fix', 'prettier --write']);
    expect(commandsFor('button.ts')).toEqual(['eslint --fix', 'prettier --write']);

    for (const file of [
      'app.js',
      'app.jsx',
      'data.json',
      'GUIDE.md',
      'ci.yml',
      'ci.yaml',
      'theme.css',
    ]) {
      const commands = commandsFor(file);
      expect(commands, `${file} is formatted`).toContain('prettier --write');
      expect(commands, `${file} is not linted`).not.toContain('eslint --fix');
    }
  });

  it('wires the pre-commit hook to lint-staged', () => {
    const hook = readFileSync(join(ROOT, '.husky', 'pre-commit'), 'utf8').trim();

    expect(hook).toContain('lint-staged');
    expect(hook).toContain('--no-install');
    expect(hook).not.toContain('--config');
  });
});
