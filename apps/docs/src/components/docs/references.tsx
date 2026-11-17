import { docsHref } from '../../../site.config';
import { components } from '../../lib/docs-metadata-query';

import { DocSection } from './section';

export interface ReferencesProps {
  sourceHref: string;
  contractHref: string;
  packageHref: string;
  storyHref: string;
  playgroundHref?: string;
}

/** Where the facts on the page come from, and where to go next. */
export function References({
  sourceHref,
  contractHref,
  packageHref,
  storyHref,
  playgroundHref,
}: ReferencesProps) {
  const links = [
    { label: 'Source file', href: sourceHref },
    { label: 'Package contract', href: contractHref },
    { label: 'Package page', href: packageHref },
    { label: 'Storybook story', href: storyHref },
    ...(playgroundHref === undefined ? [] : [{ label: 'Playground screen', href: playgroundHref }]),
  ];

  return (
    <DocSection id="references" title="References">
      <ul className="space-y-1 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-primary dark:text-blue-light-400 hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}

/**
 * Editorial relationships, resolved against the catalogue: an id that is not
 * catalogued is skipped instead of rendering a dead link.
 */
export function RelatedComponents({ related }: { related: string[] }) {
  const entries = related.flatMap((id) => {
    const record = components.find((component) => component.id === id);
    return record === undefined ? [] : [{ id, label: record.exportName }];
  });

  return (
    <DocSection id="related" title="Related components">
      {entries.length === 0 ? (
        <p className="text-dark-4 dark:text-dark-6 text-sm">
          No related components are documented yet.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-2 text-sm">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={docsHref(`/components/${entry.id}/`)}
                className="text-body-xs inline-flex items-center rounded-full border border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-3 py-1 font-medium text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] hover:text-[var(--portal-primary-strong)]"
              >
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </DocSection>
  );
}
