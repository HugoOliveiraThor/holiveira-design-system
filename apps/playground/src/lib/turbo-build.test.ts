import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();

interface TurboTask {
  taskId: string;
  task: string;
  package: string;
  dependencies?: string[];
  resolvedTaskDefinition?: { dependsOn?: string[] };
}

interface TurboDryRun {
  tasks: TurboTask[];
}

function turboBuildGraph(): TurboDryRun {
  const stdout = execFileSync(
    'pnpm',
    ['exec', 'turbo', 'run', 'build', '--dry=json', '--filter=playground'],
    { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );

  return JSON.parse(stdout) as TurboDryRun;
}

describe('turbo build graph', () => {
  it('includes the playground in the turbo build graph', () => {
    const graph = turboBuildGraph();
    const playgroundBuild = graph.tasks.find((task) => task.taskId === 'playground#build');

    expect(playgroundBuild, 'playground#build').toBeDefined();
    expect(playgroundBuild?.resolvedTaskDefinition?.dependsOn).toContain('^build');

    const dependencies = playgroundBuild?.dependencies ?? [];
    expect(dependencies.length).toBeGreaterThan(0);
    for (const dependency of dependencies) {
      expect(dependency.startsWith('@ho-dev/'), dependency).toBe(true);
    }
  }, 60_000);
});
