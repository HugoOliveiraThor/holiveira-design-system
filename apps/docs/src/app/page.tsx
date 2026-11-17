import Link from 'next/link';

import { docsSite } from '../../site.config';
import { CodeBlock } from '../components/docs/code-block';
import {
  components,
  examples,
  guideDocs,
  packageSections,
  packages,
} from '../lib/docs-metadata-query';

const INSTALL_SNIPPET = '"@ho-dev/primitives": "workspace:*"';

const STATS = [
  { label: 'Packages', value: packages.length },
  { label: 'Components', value: components.length },
  { label: 'Guides', value: guideDocs.length },
  { label: 'Examples', value: examples.length },
];

/** The component category is documented by the component pages; the rest by the package index. */
function categoryHref(category: string): string {
  return category === 'Components' ? '/components/' : '/packages/';
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" />
    </svg>
  );
}

const CARD_CLASS =
  'group flex items-center justify-between gap-4 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-5 transition-colors hover:border-[var(--portal-primary-strong)]';

const ACTION_CLASS =
  'text-body-sm inline-flex items-center gap-2 rounded-md bg-[var(--portal-primary)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--portal-primary-strong)]';

export default function HomePage() {
  const sections = packageSections();

  return (
    <article className="space-y-16">
      <section aria-labelledby="hero-heading" className="max-w-[820px] space-y-6">
        <p className="text-body-xs inline-block rounded-full border border-[var(--portal-border)] px-3 py-1 font-medium tracking-wide text-[var(--portal-muted)] uppercase">
          {docsSite.status}
        </p>
        <h1
          id="hero-heading"
          className="text-heading-4 md:text-heading-2 font-bold text-[var(--portal-ink)]"
        >
          Holiveira Design System
        </h1>
        <p className="text-body-2xlg text-[var(--portal-body)]">
          Tokens, primitives, forms, charts and layout shells for React and Tailwind v4, documented
          with runnable examples, props and accessibility notes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/components/" className={ACTION_CLASS}>
            Browse components
            <ArrowIcon />
          </Link>
          <Link
            href="/getting-started/"
            className="text-body-sm inline-flex items-center gap-2 rounded-md border border-[var(--portal-border)] px-4 py-2 font-medium text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] hover:text-[var(--portal-primary-strong)]"
          >
            Start with the guides
          </Link>
        </div>
      </section>

      <section aria-label="Install and statistics" className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-5">
          <h2 className="text-body-sm font-semibold text-[var(--portal-ink)]">
            Install from the workspace
          </h2>
          <p className="text-body-sm text-[var(--portal-body)]">
            The packages are pre-release. Inside this monorepo, depend on one with a workspace
            range:
          </p>
          <CodeBlock source={INSTALL_SNIPPET} label="Workspace install" componentName="Holiveira" />
        </div>
        <dl className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-5"
            >
              <dt className="text-body-xs font-medium tracking-wide text-[var(--portal-muted)] uppercase">
                {stat.label}
              </dt>
              <dd className="text-heading-5 mt-1 font-bold text-[var(--portal-ink)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="categories-heading" className="space-y-4">
        <div className="space-y-1">
          <h2
            id="categories-heading"
            className="text-heading-6 font-semibold text-[var(--portal-ink)]"
          >
            Browse the catalogue
          </h2>
          <p className="text-body-sm text-[var(--portal-body)]">
            Every package belongs to one of the catalogue categories.
          </p>
        </div>
        <ul aria-label="Package categories" className="grid gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <li key={section.category}>
              <Link href={categoryHref(section.category)} className={CARD_CLASS}>
                <span>
                  <span className="text-body-sm block font-semibold text-[var(--portal-ink)]">
                    {section.category}
                  </span>
                  <span className="text-body-xs block text-[var(--portal-muted)]">
                    {section.items.length} packages
                  </span>
                </span>
                <span className="text-[var(--portal-primary-strong)] transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="surfaces-heading" className="space-y-4">
        <div className="space-y-1">
          <h2
            id="surfaces-heading"
            className="text-heading-6 font-semibold text-[var(--portal-ink)]"
          >
            See it running
          </h2>
          <p className="text-body-sm text-[var(--portal-body)]">
            The Storybook shows every component in isolation; the Playground composes them into
            screens.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <a href={docsSite.storybookUrl} target="_blank" rel="noreferrer" className={CARD_CLASS}>
              <span>
                <span className="text-body-sm block font-semibold text-[var(--portal-ink)]">
                  Storybook
                </span>
                <span className="text-body-xs block text-[var(--portal-muted)]">
                  Every component, one page each
                </span>
              </span>
              <span className="text-[var(--portal-primary-strong)]">
                <ArrowIcon />
              </span>
            </a>
          </li>
          <li>
            <a
              href={docsSite.playgroundUrl}
              target="_blank"
              rel="noreferrer"
              className={CARD_CLASS}
            >
              <span>
                <span className="text-body-sm block font-semibold text-[var(--portal-ink)]">
                  Playground
                </span>
                <span className="text-body-xs block text-[var(--portal-muted)]">
                  The components composed into screens
                </span>
              </span>
              <span className="text-[var(--portal-primary-strong)]">
                <ArrowIcon />
              </span>
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
