import type { ExportKind, PackageRecord } from '../../lib/docs-metadata/types';

import { DocSection } from './section';

/** The order the page contract lists the kinds in; empty kinds are omitted. */
export const EXPORT_KINDS: readonly ExportKind[] = [
  'component',
  'hook',
  'function',
  'constant',
  'type',
];

const KIND_LABELS: Record<ExportKind, string> = {
  component: 'Components',
  hook: 'Hooks',
  function: 'Functions',
  constant: 'Constants',
  type: 'Types',
};

/**
 * Every public export, grouped by the kind the checker derived. A kind with no
 * export is not rendered, so the reader never sees an empty heading.
 */
export function ExportsTable({ record }: { record: PackageRecord }) {
  const groups = EXPORT_KINDS.map((kind) => ({
    kind,
    label: KIND_LABELS[kind],
    entries: record.exports.filter((entry) => entry.kind === kind),
  })).filter((group) => group.entries.length > 0);

  return (
    <DocSection id="exports" title="Exports">
      {groups.length === 0 ? (
        <p className="text-dark-4 dark:text-dark-6 text-sm">This package has no public exports.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.kind}>
              <h3 className="text-dark mb-2 text-sm font-semibold dark:text-white">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2 text-xs">
                {group.entries.map((entry) => (
                  <li key={entry.name}>
                    <code className="bg-gray-2 dark:bg-dark-2 rounded px-2 py-1 font-mono">
                      {entry.name}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </DocSection>
  );
}
