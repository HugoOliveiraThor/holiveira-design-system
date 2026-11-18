import type { PropRecord, VariantRecord } from '../../lib/docs-metadata/types';

import { EmptyState } from './empty-state';
import {
  TABLE_CELL_CLASS,
  TABLE_CLASS,
  TABLE_HEAD_CELL_CLASS,
  TABLE_HEAD_CLASS,
  TABLE_ROW_CLASS,
  TABLE_WRAPPER_CLASS,
} from './surfaces';

const HEAD_CLASS = TABLE_HEAD_CELL_CLASS;
const CELL_CLASS = TABLE_CELL_CLASS;
const MONO_CLASS = 'text-body-xs font-medium text-[var(--portal-ink)]';

function PropRows({ props }: { props: PropRecord[] }) {
  return (
    <div className={TABLE_WRAPPER_CLASS}>
      <table data-docs-table className={TABLE_CLASS}>
        <caption className="sr-only">Component props</caption>
        <thead className={TABLE_HEAD_CLASS}>
          <tr>
            <th scope="col" className={HEAD_CLASS}>
              Prop
            </th>
            <th scope="col" className={HEAD_CLASS}>
              Type
            </th>
            <th scope="col" className={HEAD_CLASS}>
              Required
            </th>
            <th scope="col" className={HEAD_CLASS}>
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className={TABLE_ROW_CLASS}>
              <td className={CELL_CLASS}>
                <code className={MONO_CLASS}>{prop.name}</code>
              </td>
              <td className={`${CELL_CLASS} text-body-xs break-words`}>{prop.type}</td>
              <td className={`${CELL_CLASS} text-body-xs`}>{prop.required ? 'Yes' : 'No'}</td>
              <td className={`${CELL_CLASS} text-body-xs`}>{prop.default ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Component-declared props, with inherited native props behind a disclosure. */
export function PropsTable({ props }: { props: PropRecord[] }) {
  const own = props.filter((prop) => prop.origin === 'component');
  const inherited = props.filter((prop) => prop.origin === 'inherited');

  return (
    <div className="space-y-4">
      {own.length === 0 ? (
        <EmptyState
          title="This component declares no props of its own."
          hint="It only accepts the native element props, listed below when the component forwards them."
        />
      ) : (
        <PropRows props={own} />
      )}

      {inherited.length > 0 && (
        <details className="rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] p-4">
          <summary className="text-body-sm cursor-pointer font-medium text-[var(--portal-ink)]">
            Inherited native props ({inherited.length})
          </summary>
          <div className="mt-4">
            <PropRows props={inherited} />
          </div>
        </details>
      )}
    </div>
  );
}

/** Extracted variants with their allowed values and default. */
export function VariantsTable({ variants }: { variants: Record<string, VariantRecord> }) {
  const list = Object.values(variants);
  if (list.length === 0) {
    return (
      <EmptyState
        title="This component exposes no variants."
        hint="Its appearance is fixed; the props table lists the knobs it accepts."
      />
    );
  }
  return (
    <div className={TABLE_WRAPPER_CLASS}>
      <table data-docs-table className={TABLE_CLASS}>
        <caption className="sr-only">Component variants</caption>
        <thead className={TABLE_HEAD_CLASS}>
          <tr>
            <th scope="col" className={HEAD_CLASS}>
              Variant
            </th>
            <th scope="col" className={HEAD_CLASS}>
              Values
            </th>
            <th scope="col" className={HEAD_CLASS}>
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((variant) => (
            <tr key={variant.name} className={TABLE_ROW_CLASS}>
              <td className={CELL_CLASS}>
                <code className={MONO_CLASS}>{variant.name}</code>
              </td>
              <td className={`${CELL_CLASS} text-body-xs`}>{variant.values.join(', ')}</td>
              <td className={`${CELL_CLASS} text-body-xs`}>{variant.default ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
