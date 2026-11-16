import type { PropRecord, VariantRecord } from '../../lib/docs-metadata/types';

function PropRows({ props }: { props: PropRecord[] }) {
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Component props</caption>
      <thead>
        <tr className="border-stroke dark:border-dark-3 border-b">
          <th scope="col" className="py-2 pr-4 font-medium">
            Prop
          </th>
          <th scope="col" className="py-2 pr-4 font-medium">
            Type
          </th>
          <th scope="col" className="py-2 pr-4 font-medium">
            Required
          </th>
          <th scope="col" className="py-2 font-medium">
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name} className="border-stroke dark:border-dark-3 border-b last:border-0">
            <td className="py-2 pr-4 align-top">
              <code className="text-xs font-medium">{prop.name}</code>
            </td>
            <td className="text-dark-4 dark:text-dark-6 py-2 pr-4 align-top text-xs break-words">
              {prop.type}
            </td>
            <td className="text-dark-4 dark:text-dark-6 py-2 pr-4 align-top text-xs">
              {prop.required ? 'Yes' : 'No'}
            </td>
            <td className="text-dark-4 dark:text-dark-6 py-2 align-top text-xs">
              {prop.default ?? '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Component-declared props, with inherited native props behind a disclosure. */
export function PropsTable({ props }: { props: PropRecord[] }) {
  const own = props.filter((prop) => prop.origin === 'component');
  const inherited = props.filter((prop) => prop.origin === 'inherited');

  return (
    <div className="space-y-4">
      {own.length === 0 ? (
        <p className="text-dark-4 dark:text-dark-6 text-sm">
          This component declares no props of its own.
        </p>
      ) : (
        <PropRows props={own} />
      )}

      {inherited.length > 0 && (
        <details className="border-stroke dark:border-dark-3 rounded-lg border p-3">
          <summary className="text-dark cursor-pointer text-sm font-medium dark:text-white">
            Inherited native props ({inherited.length})
          </summary>
          <div className="mt-3">
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
      <p className="text-dark-4 dark:text-dark-6 text-sm">This component exposes no variants.</p>
    );
  }
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Component variants</caption>
      <thead>
        <tr className="border-stroke dark:border-dark-3 border-b">
          <th scope="col" className="py-2 pr-4 font-medium">
            Variant
          </th>
          <th scope="col" className="py-2 pr-4 font-medium">
            Values
          </th>
          <th scope="col" className="py-2 font-medium">
            Default
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((variant) => (
          <tr
            key={variant.name}
            className="border-stroke dark:border-dark-3 border-b last:border-0"
          >
            <td className="py-2 pr-4 align-top">
              <code className="text-xs font-medium">{variant.name}</code>
            </td>
            <td className="text-dark-4 dark:text-dark-6 py-2 pr-4 align-top text-xs">
              {variant.values.join(', ')}
            </td>
            <td className="text-dark-4 dark:text-dark-6 py-2 align-top text-xs">
              {variant.default ?? '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
