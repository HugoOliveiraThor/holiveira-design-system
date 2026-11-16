import Link from 'next/link';

import { Breadcrumbs } from '../../components/shell/breadcrumbs';
import { packages, slugOf } from '../../lib/docs-metadata-query';

export default function PackagesIndex() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]} />
      <h1 className="text-dark mb-6 text-2xl font-semibold dark:text-white">Packages</h1>
      <ul className="space-y-2">
        {packages.map((record) => (
          <li key={record.name}>
            <Link
              href={`/packages/${slugOf(record.name)}/`}
              className="border-stroke hover:border-primary dark:border-stroke-dark dark:bg-dark-2 flex items-center justify-between rounded-md border bg-white px-4 py-3"
            >
              <span className="text-dark text-sm font-medium dark:text-white">{record.name}</span>
              <span className="text-dark-5 text-xs">
                {record.version} · {record.installState} · {record.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
