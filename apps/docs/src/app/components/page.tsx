import Link from 'next/link';

import { PageHeader } from '../../components/docs/page-header';
import { CARD_CLASS } from '../../components/docs/surfaces';
import { PageShell } from '../../components/shell/page-shell';
import {
  assertCatalogueCoverage,
  components,
  packages,
  slugOf,
} from '../../lib/docs-metadata-query';

assertCatalogueCoverage();

export default function ComponentsIndex() {
  const categories = new Map(packages.map((record) => [record.name, record.category]));
  return (
    <PageShell wide breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Components' }]}>
      <article className="space-y-6">
        <PageHeader
          title="Components"
          summary="The documented components, each with its props, variants and runnable examples."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <li key={component.id}>
              <Link href={`/components/${component.id}/`} className={CARD_CLASS}>
                <span>
                  <span className="text-body-sm block font-semibold text-[var(--portal-ink)]">
                    {component.exportName}
                  </span>
                  <span className="text-body-xs block text-[var(--portal-muted)]">
                    {component.package} ·{' '}
                    {categories.get(component.package) ?? slugOf(component.package)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
