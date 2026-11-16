import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { assertGuideExampleImports, buildGuideExamples, guideExamplesRoot } from './guide-examples';

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-guide-examples-'));
  for (const [relative, content] of Object.entries(files)) {
    write(root, relative, content);
  }
  return root;
}

const THEMING = `import { ThemeProvider } from '@ho-dev/theme';

export function ThemingSnippet() {
  return <ThemeProvider attribute="class">{null}</ThemeProvider>;
}
`;

const INSTALLATION = `import { Button } from '@ho-dev/primitives';

export function InstallationSnippet() {
  return <Button>Save</Button>;
}
`;

describe('guide snippet extraction', () => {
  it('records each snippet with its repo-relative path and verbatim source', () => {
    const root = fixture({
      'apps/docs/src/examples/guides/theming.tsx': THEMING,
      'apps/docs/src/examples/guides/installation.tsx': INSTALLATION,
    });
    expect(buildGuideExamples(root)).toEqual([
      {
        path: 'apps/docs/src/examples/guides/installation.tsx',
        source: INSTALLATION,
      },
      { path: 'apps/docs/src/examples/guides/theming.tsx', source: THEMING },
    ]);
  });

  it('records an empty list when the directory does not exist', () => {
    const root = mkdtempSync(join(tmpdir(), 'docs-guide-examples-empty-'));
    expect(
      guideExamplesRoot(root).endsWith(join('apps', 'docs', 'src', 'examples', 'guides')),
    ).toBe(true);
    expect(buildGuideExamples(root)).toEqual([]);
  });

  it('ignores files that are not .tsx snippets', () => {
    const root = fixture({
      'apps/docs/src/examples/guides/theming.tsx': THEMING,
      'apps/docs/src/examples/guides/notes.md': 'not a snippet',
    });
    expect(buildGuideExamples(root)).toHaveLength(1);
  });

  it('fails when a snippet imports a private package, naming the file', () => {
    const root = fixture({
      'apps/docs/src/examples/guides/theming.tsx': "import { db } from '@ho-dev/db';\n",
    });
    expect(() =>
      assertGuideExampleImports(buildGuideExamples(root), new Set(['@ho-dev/db'])),
    ).toThrow(
      /apps\/docs\/src\/examples\/guides\/theming\.tsx imports @ho-dev\/db, which is a private package/,
    );
  });

  it('fails when a snippet imports a package source path, naming the file', () => {
    const root = fixture({
      'apps/docs/src/examples/guides/installation.tsx':
        "import { Button } from '../../../packages/primitives/src/button';\n",
    });
    expect(() => assertGuideExampleImports(buildGuideExamples(root), new Set())).toThrow(
      /installation\.tsx imports .*packages\/primitives\/src\/button, which is a package source path/,
    );
  });

  it('accepts public barrels and third-party packages', () => {
    const root = fixture({
      'apps/docs/src/examples/guides/forms.tsx': `import { useForm } from 'react-hook-form';
import { Form } from '@ho-dev/forms';

export function FormsSnippet() {
  return <Form />;
}
`,
    });
    expect(() =>
      assertGuideExampleImports(buildGuideExamples(root), new Set(['@ho-dev/db'])),
    ).not.toThrow();
  });
});
