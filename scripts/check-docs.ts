import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

/**
 * Documentation link check.
 *
 * Verifies, without network access by default:
 *  1. every relative link/image in the tracked docs resolves to a file or directory;
 *  2. the canonical GitHub Pages URLs are present where they must be;
 *  3. the legacy (dead) repository URL is gone.
 *
 * With `--remote`, it also sends a HEAD request to each canonical URL and fails on non-2xx
 * responses. Remote checks stay out of `all-checks` on purpose: CI network is a flake source.
 *
 * Exit codes: 0 = all checks passed, 1 = at least one finding, 2 = structural error.
 */

const ROOT = join(__dirname, '..');
const REMOTE = process.argv.includes('--remote');
const VERBOSE = process.env.CHECK_VERBOSE === 'true';

const DOC_FILES = [
  'README.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'apps/storybook/stories/GettingStarted.mdx',
];

const CANONICAL = {
  storybook: 'https://hugooliveirathor.github.io/holiveira-design-system/',
  gettingStarted:
    'https://hugooliveirathor.github.io/holiveira-design-system/?path=/docs/getting-started--docs',
  playground: 'https://hugooliveirathor.github.io/holiveira-design-system/playground/',
  repository: 'https://github.com/HugoOliveiraThor/holiveira-design-system',
  issues: 'https://github.com/HugoOliveiraThor/holiveira-design-system/issues',
} as const;

/** URLs that must appear in each document. */
const REQUIRED: Record<string, Array<keyof typeof CANONICAL>> = {
  'README.md': ['storybook', 'gettingStarted', 'playground', 'repository'],
  'CONTRIBUTING.md': ['storybook', 'playground'],
  'CHANGELOG.md': [],
  'apps/storybook/stories/GettingStarted.mdx': ['storybook', 'playground', 'repository'],
};

const LEGACY_PATTERNS = ['hugoluisvieira', 'HugoOliveiraThor.github.io'];

interface Finding {
  file: string;
  kind: 'missing-link' | 'missing-url' | 'legacy' | 'remote';
  detail: string;
}

const findings: Finding[] = [];

function fail(finding: Finding): void {
  findings.push(finding);
}

function stripSuffix(target: string): string {
  const hash = target.indexOf('#');
  const withoutHash = hash === -1 ? target : target.slice(0, hash);
  const query = withoutHash.indexOf('?');
  return query === -1 ? withoutHash : withoutHash.slice(0, query);
}

function extractRelativeLinks(content: string): string[] {
  const links: string[] = [];
  const markdown = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const html = /(?:src|href)="([^"]+)"/g;

  for (const match of content.matchAll(markdown)) {
    const target = match[1];
    if (!target.startsWith('http') && !target.startsWith('#') && !target.startsWith('mailto:')) {
      links.push(target);
    }
  }
  for (const match of content.matchAll(html)) {
    const target = match[1];
    if (!/^(?:https?:|mailto:|#|data:)/.test(target)) {
      links.push(target);
    }
  }
  return links;
}

function checkRelativeLinks(file: string, content: string): void {
  const base = dirname(join(ROOT, file));
  for (const raw of extractRelativeLinks(content)) {
    const target = stripSuffix(raw);
    if (target.length === 0) continue;
    const absolute = resolve(base, decodeURIComponent(target));
    if (!existsSync(absolute)) {
      fail({ file, kind: 'missing-link', detail: raw });
      continue;
    }
    if (VERBOSE) {
      const kind = statSync(absolute).isDirectory() ? 'dir' : 'file';
      console.log(`  ok  ${file} -> ${raw} (${kind})`);
    }
  }
}

async function checkRemote(url: string): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    if (response.ok) {
      if (VERBOSE) console.log(`  ok  ${url} -> ${response.status}`);
      return;
    }
    fail({ file: '<remote>', kind: 'remote', detail: `${url} -> ${response.status}` });
  } catch (error) {
    fail({
      file: '<remote>',
      kind: 'remote',
      detail: `${url} -> ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function main(): Promise<number> {
  for (const file of DOC_FILES) {
    const absolute = join(ROOT, file);
    if (!existsSync(absolute)) {
      console.error(`FAIL structural: missing documentation file ${file}`);
      return 2;
    }
  }

  for (const file of DOC_FILES) {
    const content = readFileSync(join(ROOT, file), 'utf8');
    checkRelativeLinks(file, content);

    for (const key of REQUIRED[file] ?? []) {
      if (!content.includes(CANONICAL[key])) {
        fail({ file, kind: 'missing-url', detail: CANONICAL[key] });
      }
    }

    for (const legacy of LEGACY_PATTERNS) {
      if (content.includes(legacy)) {
        fail({ file, kind: 'legacy', detail: legacy });
      }
    }
  }

  if (REMOTE) {
    for (const url of new Set(Object.values(CANONICAL))) {
      await checkRemote(url);
    }
  }

  for (const finding of findings) {
    console.error(`FAIL ${finding.kind}: ${finding.file} — ${finding.detail}`);
  }

  if (findings.length > 0) {
    console.error(`\ncheck:docs — ${findings.length} finding(s)`);
    return 1;
  }

  console.log(
    `check:docs — ${DOC_FILES.length} documents, all links resolve${REMOTE ? ', remote OK' : ''}`,
  );
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error: unknown) => {
    console.error(`FAIL structural: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(2);
  });
