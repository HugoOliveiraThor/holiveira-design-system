import Link from 'next/link';

import { docsSite } from '../../site.config';
import { packages, packageSections } from '../lib/docs-metadata-query';

export default function HomePage() {
  const sections = packageSections();
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-dark text-3xl font-semibold dark:text-white">
          Holiveira Documentation Platform
        </h1>
        <p className="text-dark-4 dark:text-dark-6 text-base">
          Official documentation for the Holiveira Design System. {docsSite.status}: the packages
          are documented as they are published.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/packages/"
            className="bg-primary rounded-md px-4 py-2 font-medium text-white"
          >
            Browse packages
          </Link>
          <Link
            href="/components/"
            className="border-stroke text-dark-4 dark:border-stroke-dark dark:text-dark-6 rounded-md border px-4 py-2 font-medium"
          >
            Browse components
          </Link>
        </div>
      </header>
      {sections.map((section) => (
        <section key={section.category} className="space-y-3">
          <h2 className="text-dark text-lg font-semibold dark:text-white">{section.category}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="border-stroke hover:border-primary dark:border-stroke-dark dark:bg-dark-2 block rounded-lg border bg-white p-4"
                >
                  <span className="text-dark block text-sm font-medium dark:text-white">
                    {item.label}
                  </span>
                  <span className="text-dark-5 mt-1 block text-xs">
                    {packages.find((record) => record.name === item.label)?.installState}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
