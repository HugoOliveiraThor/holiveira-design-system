import { docsHref } from '../../../site.config';
import type { Target } from '../../lib/docs-metadata/types';

import { EmptyState } from './empty-state';
import { DocSection } from './section';

export interface RelatedLink {
  id: string;
  label: string;
  href: string;
}

/** An internal docs href for a component page, a guide or a package anchor. */
export function targetHref(target: Target): string {
  switch (target.kind) {
    case 'page':
      return docsHref(`/components/${target.id}/`);
    case 'guide':
      return docsHref(`/${target.slug.replace(/^\/+|\/+$/g, '')}/`);
    case 'anchor': {
      const slug = target.package.replace(/^@[^/]+\//, '');
      return docsHref(`/packages/${slug}/#${target.anchor}`);
    }
  }
}

/**
 * Turn editorial relations into internal links. A relation with no resolved
 * target is dropped, never rendered as a dead link.
 */
export function relatedLinks(
  relations: ReadonlyArray<{ id: string; label: string; target?: Target }>,
): RelatedLink[] {
  return relations.flatMap((relation) =>
    relation.target === undefined
      ? []
      : [{ id: relation.id, label: relation.label, href: targetHref(relation.target) }],
  );
}

function RelatedLinksSection({
  id,
  title,
  links,
  empty,
}: {
  id: string;
  title: string;
  links: readonly RelatedLink[];
  empty: string;
}) {
  return (
    <DocSection id={id} title={title}>
      {links.length === 0 ? (
        <EmptyState title={empty} />
      ) : (
        <ul className="flex flex-wrap gap-2 text-sm">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="text-body-xs inline-flex items-center rounded-full border border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-3 py-1 font-medium text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] hover:text-[var(--portal-primary-strong)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </DocSection>
  );
}

/** Guides (or other docs pages) related to the page being read. */
export function RelatedPages({ pages }: { pages: readonly RelatedLink[] }) {
  return (
    <RelatedLinksSection
      id="related-pages"
      title="Related pages"
      links={pages}
      empty="No related pages."
    />
  );
}

/** Other packages related to the package being read. */
export function RelatedPackages({ packages }: { packages: readonly RelatedLink[] }) {
  return (
    <RelatedLinksSection
      id="related-packages"
      title="Related packages"
      links={packages}
      empty="No related packages."
    />
  );
}
