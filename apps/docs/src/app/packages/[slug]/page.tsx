import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComponentInventory } from '../../../components/docs/component-inventory';
import { ExportsTable } from '../../../components/docs/exports-table';
import { Installation } from '../../../components/docs/installation';
import { PackageHeader } from '../../../components/docs/package-header';
import { RelatedPackages, RelatedPages } from '../../../components/docs/related-links';
import { Breadcrumbs } from '../../../components/shell/breadcrumbs';
import { Pager, type PagerItem } from '../../../components/shell/pager';
import {
  breadcrumbsForPackage,
  packageSlugs,
  packages,
  pager,
  relatedGuideLinks,
  sameCategoryPackageLinks,
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
  };
}

/**
 * The package page contract (ADS-011 §5.7): header, installation, exports,
 * components, related pages and related packages, in that order. Every fact
 * comes from the generated registry; the page is indexable, like the component
 * pages.
 */
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
    <article className="space-y-10">
      <Breadcrumbs crumbs={breadcrumbsForPackage(slug)} />
      <PackageHeader record={record} />
      <Installation record={record} />
      <ExportsTable record={record} />
      <ComponentInventory record={record} />
      <RelatedPages pages={relatedGuideLinks(record.name)} />
      <RelatedPackages packages={sameCategoryPackageLinks(record.name)} />
      <Pager pager={pager(list, slug)} />
      <p className="text-dark-4 dark:text-dark-6 text-xs">
        <Link href="/packages/" className="hover:text-primary dark:text-blue-light-400">
          All packages
        </Link>
      </p>
    </article>
  );
}
