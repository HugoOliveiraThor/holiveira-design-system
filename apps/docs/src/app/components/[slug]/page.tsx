import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { docsHref, docsSite } from '../../../../site.config';
import { ComponentPage, type PageExample } from '../../../components/docs/component-page';
import { Breadcrumbs } from '../../../components/shell/breadcrumbs';
import { Pager, type PagerItem } from '../../../components/shell/pager';
import { exampleComponent } from '../../../examples/registry';
import {
  breadcrumbsForComponent,
  componentDoc,
  componentSlugs,
  components,
  examplesFor,
  pager,
  packages,
  playgroundHref,
  slugOf,
  storyHref,
} from '../../../lib/docs-metadata-query';

export function generateStaticParams() {
  return componentSlugs().map((slug) => ({ slug }));
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
  const doc = record === undefined ? undefined : componentDoc(record.id);
  return {
    title: record ? `${record.exportName} — Holiveira Docs` : 'Component — Holiveira Docs',
    ...(doc === undefined ? {} : { description: doc.summary }),
  };
}

export default async function ComponentRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findComponent(slug);
  if (record === undefined) notFound();

  const doc = componentDoc(record.id);
  const packageRecord = packages.find((entry) => entry.name === record.package);
  const Preview = exampleComponent(record.id, 'realistic');
  const sources = examplesFor(record.id);
  if (
    doc === undefined ||
    packageRecord === undefined ||
    Preview === undefined ||
    sources.length < 2
  ) {
    notFound();
  }

  const examples: PageExample[] = sources.map((example) => ({
    kind: example.kind,
    label: example.kind === 'minimal' ? 'Minimal example' : 'Realistic example',
    source: example.source,
  }));

  const list: PagerItem[] = components.map((component) => ({
    id: component.id,
    label: component.exportName,
    href: `/components/${component.id}/`,
  }));

  const packageSlug = slugOf(record.package);

  return (
    <div className="space-y-8">
      <Breadcrumbs crumbs={breadcrumbsForComponent(slug)} />
      <ComponentPage
        record={record}
        doc={doc}
        packageRecord={packageRecord}
        preview={<Preview />}
        previewKey={`${record.id}/realistic`}
        examples={examples}
        related={doc.related}
        sourceHref={`${docsSite.repositoryUrl}/blob/main/${record.sourceFile}`}
        contractHref={`${docsSite.repositoryUrl}/blob/main/docs/architecture/contracts/${packageSlug}.md`}
        packageHref={docsHref(`/packages/${packageSlug}/`)}
        storyHref={storyHref(record.id)}
        {...(doc.playground === undefined
          ? {}
          : { playgroundHref: playgroundHref(doc.playground) })}
      />
      <Pager pager={pager(list, slug)} />
    </div>
  );
}
