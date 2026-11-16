import type { ReactNode } from 'react';

import type {
  ComponentDoc,
  ComponentRecord,
  ExampleKind,
  PackageRecord,
} from '../../lib/docs-metadata/types';

import { CodeBlock } from './code-block';
import { ExamplePreview } from './example-preview';
import { Installation } from './installation';
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
  examples: PageExample[];
  related: string[];
  sourceHref: string;
  contractHref: string;
  packageHref: string;
  storyHref: string;
  playgroundHref?: string;
}

/**
 * The component page contract (ADS-011 §5.9): header, description, installation,
 * preview, variants and states, usage, props/API, accessibility, related
 * components, and references, in that order.
 */
export function ComponentPage({
  record,
  doc,
  packageRecord,
  preview,
  examples,
  related,
  sourceHref,
  contractHref,
  packageHref,
  storyHref,
  playgroundHref,
}: ComponentPageProps) {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <p className="text-dark-4 dark:text-dark-6 text-sm">
          <a href={packageHref} className="text-primary dark:text-blue-light-400 hover:underline">
            {record.package}
          </a>{' '}
          · {record.exportName}
        </p>
        <h1 className="text-dark text-3xl font-semibold dark:text-white">{record.exportName}</h1>
        <p className="text-dark-4 dark:text-dark-6 text-base">{doc.summary}</p>
        <nav aria-label="Component links" className="flex flex-wrap gap-4 text-sm">
          <a href={sourceHref} className="text-primary dark:text-blue-light-400 hover:underline">
            Source
          </a>
          <a href={storyHref} className="text-primary dark:text-blue-light-400 hover:underline">
            Storybook
          </a>
        </nav>
      </header>

      <DocSection id="description" title="Description">
        <div className="space-y-3 text-sm">
          <p className="text-dark-4 dark:text-dark-6">
            <strong className="text-dark dark:text-white">When to use. </strong>
            {doc.whenToUse}
          </p>
          <p className="text-dark-4 dark:text-dark-6">
            <strong className="text-dark dark:text-white">When not to use. </strong>
            {doc.whenNotToUse}
          </p>
        </div>
      </DocSection>

      <Installation record={packageRecord} />

      <DocSection id="preview" title="Preview">
        <ExamplePreview label={record.exportName}>{preview}</ExamplePreview>
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
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-dark font-medium dark:text-white">Keyboard</dt>
            <dd className="text-dark-4 dark:text-dark-6">{doc.accessibility.keyboard}</dd>
          </div>
          <div>
            <dt className="text-dark font-medium dark:text-white">ARIA</dt>
            <dd className="text-dark-4 dark:text-dark-6">{doc.accessibility.aria}</dd>
          </div>
          <div>
            <dt className="text-dark font-medium dark:text-white">Focus</dt>
            <dd className="text-dark-4 dark:text-dark-6">{doc.accessibility.focus}</dd>
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
  );
}
