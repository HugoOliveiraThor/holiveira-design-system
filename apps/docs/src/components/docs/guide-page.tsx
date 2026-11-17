import type { GuideDoc } from '../../lib/docs-metadata/guides';
import {
  breadcrumbsForGuide,
  guideNeighbours,
  packages,
  relatedComponentRelations,
  relatedPackageLinks,
  snippetSource,
} from '../../lib/docs-metadata-query';
import { PageShell } from '../shell/page-shell';
import type { TocItem } from '../shell/page-toc';
import { Pager } from '../shell/pager';

import { CodeBlock } from './code-block';
import { PageHeader } from './page-header';
import { relatedLinks, type RelatedLink } from './related-links';
import { DocSection } from './section';
import {
  TABLE_CELL_CLASS,
  TABLE_CLASS,
  TABLE_HEAD_CELL_CLASS,
  TABLE_HEAD_CLASS,
  TABLE_ROW_CLASS,
  TABLE_WRAPPER_CLASS,
} from './surfaces';

/** The one package whose exported categories the tokens guide tabulates. */
const TOKENS_PACKAGE = '@ho-dev/tokens';

const PROSE_CLASS = 'text-body-2xlg mb-3 text-[var(--portal-body)] last:mb-0';

const PILL_CLASS =
  'text-body-xs inline-flex items-center rounded-full border border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-3 py-1 font-medium text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] hover:text-[var(--portal-primary-strong)]';

function tokenCategories(): string[] {
  const record = packages.find((entry) => entry.name === TOKENS_PACKAGE);
  return (record?.exports ?? [])
    .filter((entry) => entry.kind === 'constant')
    .map((entry) => entry.name);
}

/**
 * The guide's related components, resolved through the target map: a page, a
 * guide or a package anchor. A component with no target is dropped.
 */
function relatedComponentLinks(names: readonly string[]): RelatedLink[] {
  return relatedLinks(relatedComponentRelations(names));
}

/** The in-page navigation: the record's sections, the snippets and the related links. */
function tocFor(guide: GuideDoc): TocItem[] {
  return [
    ...guide.sections.map((section) => ({ id: section.id, title: section.title })),
    ...(guide.slug === 'foundations/tokens'
      ? [{ id: 'token-categories', title: 'Token categories' }]
      : []),
    { id: 'snippets', title: 'Snippets' },
    { id: 'related-links', title: 'Related' },
  ];
}

function LinkPills({ links }: { links: readonly RelatedLink[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.href} className={PILL_CLASS}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function TokenCategories() {
  const categories = tokenCategories();
  return (
    <DocSection id="token-categories" title="Token categories">
      {categories.length === 0 ? (
        <p className="text-body-2xlg text-[var(--portal-body)]">
          The tokens package exports no categories.
        </p>
      ) : (
        <div className={TABLE_WRAPPER_CLASS}>
          <table data-docs-table className={TABLE_CLASS}>
            <thead className={TABLE_HEAD_CLASS}>
              <tr>
                <th scope="col" className={TABLE_HEAD_CELL_CLASS}>
                  Category
                </th>
                <th scope="col" className={TABLE_HEAD_CELL_CLASS}>
                  Import
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category} className={TABLE_ROW_CLASS}>
                  <th
                    scope="row"
                    className={`${TABLE_CELL_CLASS} text-left font-medium text-[var(--portal-ink)]`}
                  >
                    {category}
                  </th>
                  <td className={`${TABLE_CELL_CLASS} text-xs`}>
                    {`import { ${category} } from '${TOKENS_PACKAGE}';`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DocSection>
  );
}

export interface GuidePageProps {
  guide: GuideDoc;
  /** Resolve a snippet path to its committed source. Defaults to the artifact. */
  snippets?: (path: string) => string | undefined;
}

/**
 * The guide page contract: one `h1` for the title, the summary, the record's
 * prose sections in order, one code block per snippet read from a real file,
 * the token category table on the tokens guide, and the related links, inside
 * the shared shell and the 820px measure.
 */
export function GuidePage({ guide, snippets = snippetSource }: GuidePageProps) {
  const componentLinks = relatedComponentLinks(guide.related.components);

  return (
    <PageShell breadcrumbs={breadcrumbsForGuide(guide.slug)} toc={tocFor(guide)}>
      <article className="space-y-10">
        <PageHeader title={guide.title} summary={guide.summary} />

        {guide.sections.map((section) => (
          <DocSection key={section.id} id={section.id} title={section.title}>
            {section.prose.map((paragraph, index) => (
              <p key={index} className={PROSE_CLASS}>
                {paragraph}
              </p>
            ))}
          </DocSection>
        ))}

        {guide.slug === 'foundations/tokens' && <TokenCategories />}

        <DocSection id="snippets" title="Snippets">
          <div className="space-y-4">
            {guide.snippets.map((path) => {
              const source = snippets(path);
              if (source === undefined) return null;
              return (
                <CodeBlock
                  key={path}
                  source={source}
                  label={path.split('/').pop() ?? path}
                  componentName={guide.title}
                />
              );
            })}
          </div>
        </DocSection>

        <section aria-labelledby="related-links-heading" id="related-links" className="space-y-6">
          <h2
            id="related-links-heading"
            className="text-heading-6 mb-4 font-semibold text-[var(--portal-ink)]"
          >
            Related
          </h2>
          <div>
            <h3 className="text-body-sm mb-2 font-semibold text-[var(--portal-ink)]">Packages</h3>
            {relatedPackageLinks(guide.related.packages).length === 0 ? (
              <p className="text-body-2xlg text-[var(--portal-body)]">No related packages.</p>
            ) : (
              <LinkPills links={relatedPackageLinks(guide.related.packages)} />
            )}
          </div>
          <div>
            <h3 className="text-body-sm mb-2 font-semibold text-[var(--portal-ink)]">Components</h3>
            {componentLinks.length === 0 ? (
              <p className="text-body-2xlg text-[var(--portal-body)]">No related components.</p>
            ) : (
              <LinkPills links={componentLinks} />
            )}
          </div>
        </section>

        <Pager pager={guideNeighbours(guide.slug)} />
      </article>
    </PageShell>
  );
}
