import { ThemeProvider } from '@ho-dev/theme';
import { colors, containers, shadows } from '@ho-dev/tokens';

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SettingsView } from './settings-view';

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('dark');
});

describe('SettingsView', () => {
  it('toggles the document theme', async () => {
    render(
      <ThemeProvider>
        <SettingsView />
      </ThemeProvider>,
    );

    expect(document.documentElement).not.toHaveClass('dark');

    fireEvent.click(await screen.findByRole('button', { name: 'Switch to dark' }));

    await waitFor(() => expect(document.documentElement).toHaveClass('dark'));
    expect(await screen.findByRole('button', { name: 'Switch to light' })).toBeVisible();

    fireEvent.click(await screen.findByRole('button', { name: 'Switch to light' }));

    await waitFor(() => expect(document.documentElement).not.toHaveClass('dark'));
    expect(await screen.findByRole('button', { name: 'Switch to dark' })).toBeVisible();
  });

  it('renders color spacing and shadow swatches', () => {
    render(<SettingsView />);

    expect(screen.getAllByTestId('color-swatch')).toHaveLength(Object.keys(colors).length);
    expect(screen.getAllByTestId('spacing-swatch')).toHaveLength(Object.keys(containers).length);
    expect(screen.getAllByTestId('shadow-swatch')).toHaveLength(Object.keys(shadows).length);

    expect(screen.getByText('brand-500')).toBeVisible();
    expect(screen.getAllByText('#465fff').length).toBeGreaterThan(0);

    const spacingBar = screen
      .getAllByTestId('spacing-swatch')[0]
      .querySelector<HTMLElement>('[aria-hidden="true"]');
    if (!spacingBar) {
      throw new Error('spacing swatch is missing its width bar');
    }
    expect(spacingBar).toHaveStyle({ width: containers['3'] });

    expect(screen.getAllByTestId('shadow-swatch')[0]).toHaveStyle({
      boxShadow: shadows['1'],
    });
  });
});
