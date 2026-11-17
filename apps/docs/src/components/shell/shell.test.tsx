import '@testing-library/jest-dom/vitest';
import { ThemeProvider } from '@ho-dev/theme';

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DocsSearch } from '../search/search';

import { SiteHeader } from './site-header';
import { SkipLink } from './skip-link';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

function renderWithTheme(ui: React.ReactNode) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {ui}
    </ThemeProvider>,
  );
}

afterEach(cleanup);

describe('shell', () => {
  it('renders the header links', () => {
    renderWithTheme(<SiteHeader />);
    expect(screen.getByRole('link', { name: /holiveira docs/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /storybook/i })).toHaveAttribute(
      'href',
      'https://hugoliveirathor.github.io/holiveira-design-system/',
    );
    expect(screen.getByRole('link', { name: /playground/i })).toHaveAttribute(
      'href',
      'https://hugoliveirathor.github.io/holiveira-design-system/playground/',
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
    expect(screen.getByRole('button', { name: /switch to .* theme/i })).toBeInTheDocument();
  });

  it('labels the theme toggle by its action', async () => {
    renderWithTheme(<SiteHeader />);
    const toggle = await screen.findByRole('button', { name: /switch to .* theme/i });
    const initial = toggle.getAttribute('aria-label');
    await waitFor(() => expect(toggle).toBeEnabled());
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.getAttribute('aria-label')).not.toBe(initial));
  });

  it('shows the search trigger with the shortcut', () => {
    renderWithTheme(<SiteHeader search={<DocsSearch records={[]} />} />);
    const trigger = screen.getByRole('button', { name: /search/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger.querySelector('kbd')?.textContent).toBe('⌘K');
  });

  it('keeps the brand at weight 600', () => {
    renderWithTheme(<SiteHeader />);
    expect(screen.getByRole('link', { name: /holiveira docs/i })).toHaveClass('font-semibold');
  });

  it('keeps the header visible while scrolling', () => {
    renderWithTheme(<SiteHeader />);
    expect(screen.getByRole('banner')).toHaveClass('sticky', 'top-0');
  });

  it('renders the skip link targeting main', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
