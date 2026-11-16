import { ThemeProvider } from '@ho-dev/theme';

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';


import { SiteHeader } from './site-header';
import { SkipLink } from './skip-link';

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
    expect(screen.getByRole('link', { name: /storybook/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /playground/i })).toHaveAttribute(
      'href',
      '/playground/',
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
  });

  it('labels the theme toggle by its action', async () => {
    renderWithTheme(<SiteHeader />);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeEnabled(),
    );
  });

  it('renders the skip link targeting main', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
