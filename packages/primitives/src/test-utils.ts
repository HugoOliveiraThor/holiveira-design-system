import { renderWithProviders } from '@ho-dev/testing';
import { ThemeProvider } from '@ho-dev/theme';

import { userEvent } from '@storybook/test';
import type { RenderOptions } from '@testing-library/react';

export function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderWithProviders(ui, { providers: [ThemeProvider] }, options);
}

export function renderKeyboard(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return {
    ...render(ui, options),
    user: userEvent,
  };
}
