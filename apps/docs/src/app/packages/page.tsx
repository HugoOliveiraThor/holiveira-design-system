import Link from 'next/link';

import { PageHeader } from '../../components/docs/page-header';
import { CARD_CLASS } from '../../components/docs/surfaces';
import { PageShell } from '../../components/shell/page-shell';
import { assertCatalogueCoverage, packages, slugOf } from '../../lib/docs-metadata-query';

assertCatalogueCoverage();

export default function PackagesIndex() {
  return (
    <PageShell wide breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]}>
      <article className="space-y-6">
        <PageHeader
          title="Packages"
          summary="Every published surface of the design system, grouped by what it owns."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {packages.map((record) => (
            <li key={record.name}>
              <Link href={`/packages/${slugOf(record.name)}/`} className={CARD_CLASS}>
                <span>
                  <span className="text-body-sm block font-semibold text-[var(--portal-ink)]">
                    {record.name}
                  </span>
                  <span className="text-body-xs block text-[var(--portal-muted)]">
                    {record.category}
                  </span>
                </span>
                <span className="text-body-xs shrink-0 text-[var(--portal-muted)]">
                  {record.version} · {record.installState}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
