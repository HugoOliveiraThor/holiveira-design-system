import { docsHref } from '../../../site.config';
import { resolveTarget } from '../../content/targets';
import type { GuideDoc } from '../../lib/docs-metadata/guides';
import {
  breadcrumbsForGuide,
  guideNeighbours,
  packages,
  snippetSource,
  slugOf,
} from '../../lib/docs-metadata-query';
import { Breadcrumbs } from '../shell/breadcrumbs';
import { Pager } from '../shell/pager';

import { CodeBlock } from './code-block';
import { targetHref, type RelatedLink } from './related-links';
import { DocSection } from './section';

/** The one package whose exported categories the tokens guide tabulates. */
const TOKENS_PACKAGE = '@ho-dev/tokens';

function tokenCategories(): string[] {
  const record = packages.find((entry) => entry.name === TOKENS_PACKAGE);
  return (record?.exports ?? [])
    .filter((entry) => entry.kind === 'constant')
    .map((entry) => entry.name);
}

/** The guide's related packages, resolved against the registry. */
export function relatedPackageLinks(names: readonly string[]): RelatedLink[] {
  return names.flatMap((name) => {
    const record = packages.find((entry) => entry.name === name);
    return record === undefined
      ? []
      : [{ id: name, label: name, href: docsHref(`/packages/${slugOf(name)}/`) }];
  });
}

/**
 * The guide's related component exports, resolved to the page, guide or anchor
 * that documents them. A component the catalogue does not target is dropped.
 */
export function relatedComponentLinks(names: readonly string[]): RelatedLink[] {
  return names.flatMap((name) => {
    const owner = packages.find((record) =>
      record.componentExports.some((component) => component.exportName === name),
    );
    if (owner === undefined) return [];
    const target = resolveTarget(owner.name, name);
    return target === undefined ? [] : [{ id: name, label: name, href: targetHref(target) }];
  });
}

function LinkPills({ links }: { links: readonly RelatedLink[] }) {
  return (
    <ul className="flex flex-wrap gap-2 text-sm">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            className="border-stroke dark:border-dark-3 hover:border-primary rounded-full border px-3 py-1"
          >
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
        <p className="text-dark-4 dark:text-dark-6 text-sm">
          The tokens package exports no categories.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-stroke dark:border-dark-3 border-b">
              <th scope="col" className="py-2 pr-4 font-medium">
                Category
              </th>
              <th scope="col" className="py-2 font-medium">
                Import
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category} className="border-stroke dark:border-dark-3 border-b">
                <th scope="row" className="py-2 pr-4 font-mono text-xs font-normal">
                  {category}
                </th>
                <td className="text-dark-4 dark:text-dark-6 py-2 font-mono text-xs">
                  {`import { ${category} } from '${TOKENS_PACKAGE}';`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
 * the token category table on the tokens guide, and the related links.
 */
export function GuidePage({ guide, snippets = snippetSource }: GuidePageProps) {
  const componentLinks = relatedComponentLinks(guide.related.components);

  return (
    <article className="space-y-10">
      <Breadcrumbs crumbs={breadcrumbsForGuide(guide.slug)} />
      <header className="space-y-3">
        <h1 className="text-dark text-3xl font-semibold dark:text-white">{guide.title}</h1>
        <p className="text-dark-4 dark:text-dark-6 text-sm leading-6">{guide.summary}</p>
      </header>

      {guide.sections.map((section) => (
        <DocSection key={section.id} id={section.id} title={section.title}>
          {section.prose.map((paragraph, index) => (
            <p
              key={index}
              className="text-dark-4 dark:text-dark-6 mb-3 text-sm leading-6 last:mb-0"
            >
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
          className="text-dark mb-3 text-lg font-semibold dark:text-white"
        >
          Related
        </h2>
        <div>
          <h3 className="text-dark mb-2 text-sm font-semibold dark:text-white">Packages</h3>
          {relatedPackageLinks(guide.related.packages).length === 0 ? (
            <p className="text-dark-4 dark:text-dark-6 text-sm">No related packages.</p>
          ) : (
            <LinkPills links={relatedPackageLinks(guide.related.packages)} />
          )}
        </div>
        <div>
          <h3 className="text-dark mb-2 text-sm font-semibold dark:text-white">Components</h3>
          {componentLinks.length === 0 ? (
            <p className="text-dark-4 dark:text-dark-6 text-sm">No related components.</p>
          ) : (
            <LinkPills links={componentLinks} />
          )}
        </div>
      </section>

      <Pager pager={guideNeighbours(guide.slug)} />
    </article>
  );
}
