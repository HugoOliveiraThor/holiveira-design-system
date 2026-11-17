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
        <p className="text-body-sm text-[var(--portal-body)]">
          This package has no public exports.
        </p>
      ) : (
        <div className="space-y-5">
          {groups.map((group) => (
            <div key={group.kind}>
              <h3 className="text-body-sm mb-2 font-semibold text-[var(--portal-ink)]">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2 text-xs">
                {group.entries.map((entry) => (
                  <li key={entry.name}>
                    <code className="inline-block rounded-md border border-[var(--portal-border)] bg-[var(--portal-code-bg)] px-2 py-1 text-[var(--portal-ink)]">
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
