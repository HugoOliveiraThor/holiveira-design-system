import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuidePage } from '../../components/docs/guide-page';
import { guideBySlug } from '../../lib/docs-metadata-query';

const SLUG = 'architecture';

export function generateMetadata(): Metadata {
  const guide = guideBySlug(SLUG);
  return { title: guide ? `${guide.title} — Holiveira Docs` : 'Guide — Holiveira Docs' };
}

export default function ArchitectureGuide() {
  const guide = guideBySlug(SLUG);
  if (guide === undefined) notFound();
  return <GuidePage guide={guide} />;
}
