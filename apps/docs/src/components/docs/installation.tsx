import type { PackageRecord } from '../../lib/docs-metadata/types';

import { DocSection } from './section';

/**
 * Installation facts, generated from the package manifest. A pre-release package
 * is never presented as installable from npm: it shows its state and the local
 * workspace alternative instead.
 */
export function Installation({ record }: { record: PackageRecord }) {
  const peers = Object.entries(record.peers);

  return (
    <DocSection id="installation" title="Installation">
      <p className="text-body-sm text-[var(--portal-body)]">
        <code className="rounded border border-[var(--portal-border)] bg-[var(--portal-code-bg)] px-1.5 py-0.5 text-xs text-[var(--portal-ink)]">
          {record.name}
        </code>{' '}
        v{record.version} · {record.installState}
      </p>

      {record.installState === 'pre-release' ? (
        <div className="mt-4 space-y-3 rounded-xl border border-dashed border-[var(--portal-border)] bg-[var(--portal-surface-2)] p-4">
          <p className="text-body-sm font-semibold text-[var(--portal-ink)]">
            This package is pre-release and not published to npm yet.
          </p>
          <p className="text-body-sm text-[var(--portal-body)]">
            Inside this workspace, depend on it with a workspace range:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-[var(--portal-code-bg)] p-3 text-xs">
            <code>{`"${record.name}": "workspace:*"`}</code>
          </pre>
        </div>
      ) : (
        <div className="mt-4 space-y-3 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-4">
          <p className="text-body-sm text-[var(--portal-body)]">Install it from npm:</p>
          <pre className="overflow-x-auto rounded-lg bg-[var(--portal-code-bg)] p-3 text-xs">
            <code>{`pnpm add ${record.name}`}</code>
          </pre>
        </div>
      )}

      <div className="mt-5">
        <h3 className="text-body-sm mb-2 font-semibold text-[var(--portal-ink)]">
          Peer dependencies
        </h3>
        {peers.length === 0 ? (
          <p className="text-body-sm text-[var(--portal-body)]">No peer dependencies.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {peers.map(([name, range]) => (
              <li key={name} className="text-body-sm text-[var(--portal-body)]">
                <code className="rounded border border-[var(--portal-border)] bg-[var(--portal-code-bg)] px-1.5 py-0.5 text-xs text-[var(--portal-ink)]">
                  {name}
                </code>{' '}
                {range}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DocSection>
  );
}
