import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

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
        <p className="text-dark-4 dark:text-dark-6 text-sm">This package exports no components.</p>
      ) : (
        <ul className="space-y-2">
          {record.componentExports.map((component) => (
            <li
              key={component.id}
              id={component.id}
              className="border-stroke dark:border-stroke-dark scroll-mt-24 rounded-md border p-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <code className="text-dark font-mono text-sm dark:text-white">
                  {component.exportName}
                </code>
                <a
                  href={storybookHref(record, component.story?.id)}
                  className="text-primary dark:text-blue-light-400 text-xs underline"
                >
                  {component.story === undefined ? 'Storybook (package root)' : 'Storybook story'}
                </a>
              </div>
              <p className="text-dark-4 dark:text-dark-6 mt-1 font-mono text-xs">
                {component.sourceFile}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DocSection>
  );
}
