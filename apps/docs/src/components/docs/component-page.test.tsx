import '@testing-library/jest-dom/vitest';
import { ThemeProvider } from '@ho-dev/theme';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ComponentDoc, ComponentRecord, PackageRecord } from '../../lib/docs-metadata/types';

import { ComponentPage, type ComponentPageProps } from './component-page';

afterEach(cleanup);

const RECORD: ComponentRecord = {
  id: 'button',
  package: '@ho-dev/primitives',
  exportName: 'Button',
  props: [
    { name: 'label', type: 'string', required: true, default: null, origin: 'component' },
    {
      name: 'onClick',
      type: 'MouseEventHandler',
      required: false,
      default: null,
      origin: 'inherited',
    },
  ],
  variants: {
    variant: { name: 'variant', values: ['primary', 'outline'], default: 'primary' },
  },
  story: { title: 'Primitives/Button', id: 'primitives-button' },
  sourceFile: 'packages/primitives/src/button.tsx',
};

const DOC: ComponentDoc = {
  id: 'button',
  summary: 'Triggers an action.',
  whenToUse: 'Use it for the primary action of a view.',
  whenNotToUse: 'Do not use it for navigation.',
  accessibility: {
    keyboard: 'Enter and Space activate it.',
    aria: 'Renders a native button.',
    focus: 'Keeps the browser focus ring.',
  },
  related: ['alert'],
};

const PACKAGE: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: '',
  private: false,
  installState: 'pre-release',
  exports: [{ name: 'Button', kind: 'component' }],
  componentExports: [],
  category: 'Components',
  peers: { react: '^19.0.0' },
};

const PROPS: ComponentPageProps = {
  record: RECORD,
  doc: DOC,
  packageRecord: PACKAGE,
  preview: <div>preview child</div>,
  previewKey: 'button/realistic',
  examples: [
    { kind: 'minimal', label: 'Minimal example', source: '<Button>Save</Button>' },
    { kind: 'realistic', label: 'Realistic example', source: '<Button>Publish</Button>' },
  ],
  related: ['alert'],
  sourceHref: 'https://github.com/example/blob/main/packages/primitives/src/button.tsx',
  contractHref: 'https://github.com/example/blob/main/docs/architecture/contracts/primitives.md',
  packageHref: '/holiveira-design-system/docs/packages/primitives/',
  storyHref: 'https://example.test/?path=/docs/primitives-button--docs',
};

function renderPage(overrides: Partial<ComponentPageProps> = {}) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ComponentPage {...PROPS} {...overrides} />
    </ThemeProvider>,
  );
}

describe('component page', () => {
  it('renders the ten contract sections in order', () => {
    renderPage();
    const headings = screen
      .getAllByRole('heading')
      .filter((heading) => ['H1', 'H2'].includes(heading.tagName));
    expect(headings.map((heading) => heading.textContent)).toEqual([
      'Button',
      'Description',
      'Installation',
      'Preview',
      'Variants and states',
      'Usage',
      'Props / API',
      'Accessibility',
      'Related components',
      'References',
    ]);
  });

  it('states when to use and when not to use the component', () => {
    renderPage();
    expect(screen.getByText(/Use it for the primary action of a view\./)).toBeInTheDocument();
    expect(screen.getByText(/Do not use it for navigation\./)).toBeInTheDocument();
  });

  it('renders one minimal and one realistic example', () => {
    renderPage();
    expect(document.querySelectorAll('[data-code-block]')).toHaveLength(2);
    expect(screen.getByText('Minimal example')).toBeInTheDocument();
    expect(screen.getByText('Realistic example')).toBeInTheDocument();
  });

  it('links the source file and the story in the header', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute('href', PROPS.sourceHref);
    expect(screen.getByRole('link', { name: 'Storybook' })).toHaveAttribute(
      'href',
      PROPS.storyHref,
    );
  });
});
