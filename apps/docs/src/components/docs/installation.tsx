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
      <p className="text-dark-4 dark:text-dark-6 text-sm">
        <code className="bg-gray-2 dark:bg-dark-2 rounded px-1.5 py-0.5 text-xs">
          {record.name}
        </code>{' '}
        v{record.version} · {record.installState}
      </p>

      {record.installState === 'pre-release' ? (
        <div className="border-stroke dark:border-dark-3 mt-4 space-y-3 rounded-lg border border-dashed p-4">
          <p className="text-dark text-sm font-medium dark:text-white">
            This package is pre-release and not published to npm yet.
          </p>
          <p className="text-dark-4 dark:text-dark-6 text-sm">
            Inside this workspace, depend on it with a workspace range:
          </p>
          <pre className="bg-gray-2 dark:bg-dark-2 overflow-x-auto rounded p-3 text-xs">
            <code>{`"${record.name}": "workspace:*"`}</code>
          </pre>
        </div>
      ) : (
        <div className="border-stroke dark:border-dark-3 mt-4 space-y-3 rounded-lg border p-4">
          <p className="text-dark-4 dark:text-dark-6 text-sm">Install it from npm:</p>
          <pre className="bg-gray-2 dark:bg-dark-2 overflow-x-auto rounded p-3 text-xs">
            <code>{`pnpm add ${record.name}`}</code>
          </pre>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-dark mb-1 text-sm font-semibold dark:text-white">Peer dependencies</h3>
        {peers.length === 0 ? (
          <p className="text-dark-4 dark:text-dark-6 text-sm">No peer dependencies.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {peers.map(([name, range]) => (
              <li key={name} className="text-dark-4 dark:text-dark-6">
                <code className="bg-gray-2 dark:bg-dark-2 rounded px-1.5 py-0.5 text-xs">
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
