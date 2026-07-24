import { renderWithProviders } from '@holiveira/testing';
import { ThemeProvider } from '@holiveira/theme';

import type { RenderOptions } from '@testing-library/react';

export function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderWithProviders(ui, { providers: [ThemeProvider] }, options);
}
