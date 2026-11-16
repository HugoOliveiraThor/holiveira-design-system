import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { GuideDoc } from '../../lib/docs-metadata/guides';
import { packages } from '../../lib/docs-metadata-query';

import { GuidePage } from './guide-page';

const SNIPPET = 'apps/docs/src/examples/guides/theming.tsx';
const SOURCE = `import { ThemeProvider } from '@ho-dev/theme';

export function App() {
  return <ThemeProvider>Ready</ThemeProvider>;
}
`;

const GUIDE: GuideDoc = {
  slug: 'getting-started/theming',
  section: 'Getting Started',
  title: 'Theming',
  summary: 'ThemeProvider switches the whole application between light and dark.',
  order: 3,
  sections: [
    { id: 'provider', title: 'Provide the theme', prose: ['Wrap the application once.'] },
    { id: 'dark-class', title: 'The dark class', prose: ['The provider toggles .dark on html.'] },
  ],
  snippets: [SNIPPET],
  related: {
    packages: ['@ho-dev/theme'],
    components: ['Alert'],
  },
  sources: ['docs/architecture/contracts/theme.md'],
};

const TOKENS_GUIDE: GuideDoc = {
  ...GUIDE,
  slug: 'foundations/tokens',
  section: 'Foundations',
  title: 'Design tokens',
  summary: 'Token categories exported by the tokens package.',
  order: 4,
  sections: [{ id: 'categories', title: 'Categories', prose: ['One object per category.'] }],
  snippets: ['apps/docs/src/examples/guides/tokens.tsx'],
  related: { packages: ['@ho-dev/tokens'], components: [] },
  sources: ['docs/architecture/contracts/tokens.md'],
};

function snippetsWith(source: string, path = SNIPPET) {
  return (candidate: string) => (candidate === path ? source : undefined);
}

function stubClipboard(writeText: (text: string) => Promise<void>): void {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, 'clipboard');
});

describe('guide page', () => {
  it('names the guide once in its heading', () => {
    render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Theming');
  });

  it('renders the summary, then every section in record order', () => {
    const { container } = render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    const summary = screen.getByText(/ThemeProvider switches/);
    const firstSection = screen.getByRole('heading', { level: 2, name: 'Provide the theme' });
    const secondSection = screen.getByRole('heading', { level: 2, name: 'The dark class' });
    expect(
      summary.compareDocumentPosition(firstSection) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      firstSection.compareDocumentPosition(secondSection) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    const headings = [...container.querySelectorAll('h2')].map((heading) => heading.textContent);
    expect(headings.slice(0, 2)).toEqual(['Provide the theme', 'The dark class']);
  });

  it('anchors every section with its record id', () => {
    render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    expect(document.getElementById('provider')).not.toBeNull();
    expect(document.getElementById('dark-class')).not.toBeNull();
  });

  it('renders the snippet source it is given verbatim', () => {
    render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    expect(document.querySelector('pre > code')?.textContent).toBe(SOURCE);
    expect(screen.getByText('theming.tsx')).toBeInTheDocument();
  });

  it('renders no code block for a snippet the artifact does not hold', () => {
    render(<GuidePage guide={GUIDE} snippets={() => undefined} />);
    expect(document.querySelector('pre > code')).toBeNull();
  });

  it('copies a guide snippet and announces success', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    fireEvent.click(screen.getByRole('button', { name: /copy theming.tsx for theming/i }));

    expect(writeText).toHaveBeenCalledWith(SOURCE);
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('theming.tsx copied.'),
    );
  });

  it('lists token categories from the registry', () => {
    render(<GuidePage guide={TOKENS_GUIDE} snippets={() => undefined} />);
    const record = packages.find((entry) => entry.name === '@ho-dev/tokens');
    const expected = (record?.exports ?? [])
      .filter((entry) => entry.kind === 'constant')
      .map((entry) => entry.name);
    expect(expected.length).toBeGreaterThan(0);

    const rows = [...document.querySelectorAll('#token-categories tbody tr')];
    expect(rows.map((row) => row.querySelector('th')?.textContent)).toEqual(expected);
    expect(rows.map((row) => row.querySelector('td')?.textContent)).toEqual(
      expected.map((category) => `import { ${category} } from '@ho-dev/tokens';`),
    );
  });

  it('links the related packages and components it can resolve', () => {
    render(<GuidePage guide={GUIDE} snippets={snippetsWith(SOURCE)} />);
    expect(screen.getByRole('link', { name: '@ho-dev/theme' })).toHaveAttribute(
      'href',
      '/holiveira-design-system/docs/packages/theme/',
    );
    expect(screen.getByRole('link', { name: 'Alert' })).toHaveAttribute(
      'href',
      '/holiveira-design-system/docs/components/alert/',
    );
  });

  it('drops a related package or component the catalogue cannot resolve', () => {
    render(
      <GuidePage
        guide={{
          ...GUIDE,
          related: {
            packages: ['@ho-dev/theme', '@ho-dev/ghost'],
            components: ['Alert', 'GhostWidget'],
          },
        }}
        snippets={snippetsWith(SOURCE)}
      />,
    );
    expect(screen.queryByText('@ho-dev/ghost')).not.toBeInTheDocument();
    expect(screen.queryByText('GhostWidget')).not.toBeInTheDocument();
    expect(screen.queryByText('No related components.')).not.toBeInTheDocument();
  });
});
