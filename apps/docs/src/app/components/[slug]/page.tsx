import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '../../../components/shell/breadcrumbs';
import { Pager, type PagerItem } from '../../../components/shell/pager';
import {
  breadcrumbsForComponent,
  components,
  pager,
  slugOf,
} from '../../../lib/docs-metadata-query';

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.id }));
}

function findComponent(id: string) {
  return components.find((component) => component.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = findComponent(slug);
  return {
    title: record ? `${record.exportName} — Holiveira Docs` : 'Component — Holiveira Docs',
    robots: { index: false },
  };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findComponent(slug);
  if (!record) notFound();

  const list: PagerItem[] = components.map((component) => ({
    id: component.id,
    label: component.exportName,
    href: `/components/${component.id}/`,
  }));
  const variantNames = Object.keys(record.variants);

  return (
    <article className="space-y-8">
      <Breadcrumbs crumbs={breadcrumbsForComponent(slug)} />
      <header className="space-y-2">
        <h1 className="text-dark text-2xl font-semibold dark:text-white">{record.exportName}</h1>
        <p className="text-dark-5 text-sm">
          <Link href={`/packages/${slugOf(record.package)}/`} className="hover:text-primary">
            {record.package}
          </Link>{' '}
          · {record.props.length} props
        </p>
      </header>
      <section>
        <h2 className="text-dark mb-2 text-lg font-semibold dark:text-white">Variants</h2>
        {variantNames.length > 0 ? (
          <dl className="space-y-1 text-sm">
            {variantNames.map((name) => (
              <div key={name} className="flex gap-2">
                <dt className="text-dark-5 font-mono text-xs">{name}</dt>
                <dd className="text-dark-4 dark:text-dark-6">
                  {record.variants[name].values.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-dark-5 text-sm">No variants.</p>
        )}
      </section>
      <section className="border-stroke dark:border-stroke-dark rounded-lg border border-dashed p-4 text-sm">
        <p className="text-dark font-medium dark:text-white">Not documented yet</p>
        <p className="text-dark-5 mt-1">
          The full component page — preview, usage, props table, and accessibility notes — arrives
          in a later milestone. For component states, see Storybook.
        </p>
      </section>
      <Pager pager={pager(list, slug)} />
      <p className="text-dark-5 text-xs">
        <Link href="/packages/" className="hover:text-primary">
          All packages
        </Link>
      </p>
    </article>
  );
}
