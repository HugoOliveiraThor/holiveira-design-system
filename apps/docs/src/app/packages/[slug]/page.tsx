import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComponentInventory } from '../../../components/docs/component-inventory';
import { ExportsTable } from '../../../components/docs/exports-table';
import { Installation } from '../../../components/docs/installation';
import { PackageHeader } from '../../../components/docs/package-header';
import { RelatedPackages, RelatedPages } from '../../../components/docs/related-links';
import { PageShell } from '../../../components/shell/page-shell';
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

/** The page's own sections, in contract order, for the table of contents. */
const TOC = [
  { id: 'installation', title: 'Installation' },
  { id: 'exports', title: 'Exports' },
  { id: 'components', title: 'Components' },
  { id: 'related-pages', title: 'Related pages' },
  { id: 'related-packages', title: 'Related packages' },
];

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
    <PageShell breadcrumbs={breadcrumbsForPackage(slug)} toc={TOC}>
      <article className="space-y-10">
        <PackageHeader record={record} />
        <Installation record={record} />
        <ExportsTable record={record} />
        <ComponentInventory record={record} />
        <RelatedPages pages={relatedGuideLinks(record.name)} />
        <RelatedPackages packages={sameCategoryPackageLinks(record.name)} />
        <Pager pager={pager(list, slug)} />
        <p className="text-body-xs text-[var(--portal-muted)]">
          <Link href="/packages/" className="text-[var(--portal-primary-strong)] hover:underline">
            All packages
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
