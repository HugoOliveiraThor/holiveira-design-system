import Link from 'next/link';

import { Breadcrumbs } from '../../components/shell/breadcrumbs';
import { components, slugOf, packages } from '../../lib/docs-metadata-query';

export default function ComponentsIndex() {
  const categories = new Map(packages.map((record) => [record.name, record.category]));
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Components' }]} />
      <h1 className="text-dark mb-6 text-2xl font-semibold dark:text-white">Components</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {components.map((component) => (
          <li key={component.id}>
            <Link
              href={`/components/${component.id}/`}
              className="border-stroke hover:border-primary dark:border-stroke-dark dark:bg-dark-2 block rounded-lg border bg-white p-4"
            >
              <span className="text-dark block text-sm font-medium dark:text-white">
                {component.exportName}
              </span>
              <span className="text-dark-4 dark:text-dark-6 mt-1 block text-xs">
                {component.package} ·{' '}
                {categories.get(component.package) ?? slugOf(component.package)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
