import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

import { PAGE_LINK_CLASS } from './page-header';
import { DocSection } from './section';

/** The Storybook docs page of one export, or the package root when it has no story. */
function storybookHref(record: PackageRecord, storyId: string | undefined): string {
  return storyId === undefined
    ? docsSite.storybookUrl
    : `${docsSite.storybookUrl}?path=/docs/${storyId}--docs`;
}

/**
 * Every component export as an anchored row: the reader can deep-link to
 * `/packages/<slug>/#<export-slug>`, see the file that declares it, and reach
 * its Storybook story. A package with no story links its Storybook root and
 * says so, instead of rendering a dead link.
 */
export function ComponentInventory({ record }: { record: PackageRecord }) {
  return (
    <DocSection id="components" title="Components">
      {record.componentExports.length === 0 ? (
        <p className="text-body-sm text-[var(--portal-body)]">
          This package exports no components.
        </p>
      ) : (
        <ul className="space-y-2">
          {record.componentExports.map((component) => (
            <li
              key={component.id}
              id={component.id}
              className="scroll-mt-24 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <code className="text-body-sm font-medium text-[var(--portal-ink)]">
                  {component.exportName}
                </code>
                <a href={storybookHref(record, component.story?.id)} className={PAGE_LINK_CLASS}>
                  {component.story === undefined ? 'Storybook (package root)' : 'Storybook story'}
                </a>
              </div>
              <p className="text-body-xs mt-1 text-[var(--portal-muted)]">{component.sourceFile}</p>
            </li>
          ))}
        </ul>
      )}
    </DocSection>
  );
}
