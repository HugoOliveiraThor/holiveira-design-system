import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuidePage } from '../../../components/docs/guide-page';
import { guideBySlug, guideSlugs } from '../../../lib/docs-metadata-query';

const FAMILY = 'guides';

export function generateStaticParams() {
  return guideSlugs(FAMILY).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(`${FAMILY}/${slug}`);
  return { title: guide ? `${guide.title} — Holiveira Docs` : 'Guide — Holiveira Docs' };
}

export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(`${FAMILY}/${slug}`);
  if (guide === undefined) notFound();
  return <GuidePage guide={guide} />;
}
