import type { ReactNode } from 'react';

import type {
  ComponentDoc,
  ComponentRecord,
  ExampleKind,
  PackageRecord,
} from '../../lib/docs-metadata/types';
import type { Crumb } from '../../lib/docs-metadata-query';
import { PageShell } from '../shell/page-shell';
import type { TocItem } from '../shell/page-toc';

import { CodeBlock } from './code-block';
import { ExamplePreview } from './example-preview';
import { Installation } from './installation';
import { PAGE_CHIP_CLASS, PAGE_LINK_CLASS, PageHeader } from './page-header';
import { PropsTable, VariantsTable } from './props-table';
import { References, RelatedComponents } from './references';
import { DocSection } from './section';

/** One example, as the page receives it: label and the generated source. */
export interface PageExample {
  kind: ExampleKind;
  label: string;
  source: string;
}

export interface ComponentPageProps {
  record: ComponentRecord;
  doc: ComponentDoc;
  packageRecord: PackageRecord;
  preview: ReactNode;
  previewKey: string;
  examples: PageExample[];
  related: string[];
  sourceHref: string;
  contractHref: string;
  packageHref: string;
  storyHref: string;
  playgroundHref?: string;
  /** The route's trail; the shell renders it above the content column. */
  breadcrumbs?: Crumb[];
}

/** The page's own sections, in contract order, for the table of contents. */
const TOC: TocItem[] = [
  { id: 'description', title: 'Description' },
  { id: 'installation', title: 'Installation' },
  { id: 'preview', title: 'Preview' },
  { id: 'variants', title: 'Variants and states' },
  { id: 'usage', title: 'Usage' },
  { id: 'api', title: 'Props / API' },
  { id: 'accessibility', title: 'Accessibility' },
  { id: 'related', title: 'Related components' },
  { id: 'references', title: 'References' },
];

/**
 * The component page contract (ADS-011 §5.9): header, description, installation,
 * preview, variants and states, usage, props/API, accessibility, related
 * components, and references, in that order, inside the shared shell.
 */
export function ComponentPage({
  record,
  doc,
  packageRecord,
  preview,
  previewKey,
  examples,
  related,
  sourceHref,
  contractHref,
  packageHref,
  storyHref,
  playgroundHref,
  breadcrumbs = [],
}: ComponentPageProps) {
  return (
    <PageShell breadcrumbs={breadcrumbs} toc={TOC}>
      <article className="space-y-10">
        <PageHeader
          title={record.exportName}
          eyebrow={
            <>
              <a href={packageHref} className={PAGE_LINK_CLASS}>
                {record.package}
              </a>
              <span aria-hidden="true">·</span>
              <span>{record.exportName}</span>
            </>
          }
          badges={
            <>
              <span className={PAGE_CHIP_CLASS}>{packageRecord.installState}</span>
              <span className={PAGE_CHIP_CLASS}>v{packageRecord.version}</span>
            </>
          }
          summary={doc.summary}
          actionsLabel="Component links"
          actions={
            <>
              <a href={sourceHref} className={PAGE_LINK_CLASS}>
                Source
              </a>
              <a href={storyHref} className={PAGE_LINK_CLASS}>
                Storybook
              </a>
            </>
          }
        />

        <DocSection id="description" title="Description">
          <div className="space-y-3">
            <p className="text-body-2xlg text-[var(--portal-body)]">
              <strong className="font-semibold text-[var(--portal-ink)]">When to use. </strong>
              {doc.whenToUse}
            </p>
            <p className="text-body-2xlg text-[var(--portal-body)]">
              <strong className="font-semibold text-[var(--portal-ink)]">When not to use. </strong>
              {doc.whenNotToUse}
            </p>
          </div>
        </DocSection>

        <Installation record={packageRecord} />

        <DocSection id="preview" title="Preview">
          <h3 className="text-body-sm mb-2 font-semibold text-[var(--portal-ink)]">Live example</h3>
          <ExamplePreview label={record.exportName} exampleKey={previewKey}>
            {preview}
          </ExamplePreview>
        </DocSection>

        <DocSection id="variants" title="Variants and states">
          <VariantsTable variants={record.variants} />
        </DocSection>

        <DocSection id="usage" title="Usage">
          <div className="space-y-4">
            {examples.map((example) => (
              <CodeBlock
                key={example.kind}
                source={example.source}
                label={example.label}
                componentName={record.exportName}
              />
            ))}
          </div>
        </DocSection>

        <DocSection id="api" title="Props / API">
          <PropsTable props={record.props} />
        </DocSection>

        <DocSection id="accessibility" title="Accessibility">
          <dl className="space-y-4">
            <div>
              <dt className="text-body-sm font-semibold text-[var(--portal-ink)]">Keyboard</dt>
              <dd className="text-body-2xlg text-[var(--portal-body)]">
                {doc.accessibility.keyboard}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm font-semibold text-[var(--portal-ink)]">ARIA</dt>
              <dd className="text-body-2xlg text-[var(--portal-body)]">{doc.accessibility.aria}</dd>
            </div>
            <div>
              <dt className="text-body-sm font-semibold text-[var(--portal-ink)]">Focus</dt>
              <dd className="text-body-2xlg text-[var(--portal-body)]">
                {doc.accessibility.focus}
              </dd>
            </div>
          </dl>
        </DocSection>

        <RelatedComponents related={related} />

        <References
          sourceHref={sourceHref}
          contractHref={contractHref}
          packageHref={packageHref}
          storyHref={storyHref}
          {...(playgroundHref === undefined ? {} : { playgroundHref })}
        />
      </article>
    </PageShell>
  );
}
