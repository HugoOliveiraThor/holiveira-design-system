import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '../../../components/shell/breadcrumbs';
import { Pager, type PagerItem } from '../../../components/shell/pager';
import {
  breadcrumbsForPackage,
  packageSlugs,
  packages,
  pager,
  slugOf,
} from '../../../lib/docs-metadata-query';

export function generateStaticParams() {
  return packageSlugs().map((slug) => ({ slug }));
}

function findPackage(slug: string) {
  return packages.find((record) => slugOf(record.name) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = findPackage(slug);
  return {
    title: record ? `${record.name} — Holiveira Docs` : 'Package — Holiveira Docs',
    robots: { index: false },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findPackage(slug);
  if (!record) notFound();

  const list: PagerItem[] = packages.map((entry) => ({
    id: slugOf(entry.name),
    label: entry.name,
    href: `/packages/${slugOf(entry.name)}/`,
  }));

  return (
    <article className="space-y-8">
      <Breadcrumbs crumbs={breadcrumbsForPackage(slug)} />
      <header className="space-y-2">
        <h1 className="text-dark text-2xl font-semibold dark:text-white">{record.name}</h1>
        <p className="text-dark-4 dark:text-dark-6 text-sm">
          {record.version} · {record.installState} · {record.category}
        </p>
        <p className="text-dark-4 dark:text-dark-6 text-base">{record.description}</p>
      </header>
      <section>
        <h2 className="text-dark mb-2 text-lg font-semibold dark:text-white">Exports</h2>
        {record.exports.length > 0 ? (
          <ul className="grid gap-1 text-sm sm:grid-cols-2">
            {record.exports.map((entry) => (
              <li
                key={entry.name}
                className="bg-gray-2 dark:bg-dark-2 rounded px-2 py-1 font-mono text-xs"
              >
                {entry.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-dark-4 dark:text-dark-6 text-sm">No runtime exports.</p>
        )}
      </section>
      <section className="border-stroke dark:border-stroke-dark rounded-lg border border-dashed p-4 text-sm">
        <p className="text-dark font-medium dark:text-white">Not documented yet</p>
        <p className="text-dark-4 dark:text-dark-6 mt-1">
          This package page will be completed in a later milestone. For component states, see
          Storybook.
        </p>
      </section>
      <Pager pager={pager(list, slug)} />
      <p className="text-dark-4 dark:text-dark-6 text-xs">
        <Link href="/packages/" className="hover:text-primary dark:text-blue-light-400">
          All packages
        </Link>
      </p>
    </article>
  );
}
