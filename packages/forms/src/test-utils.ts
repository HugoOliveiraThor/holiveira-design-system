import { renderWithProviders } from '@holiveira/testing';
import { ThemeProvider } from '@holiveira/theme';

import { userEvent } from '@storybook/test';
import type { RenderOptions } from '@testing-library/react';
import React from 'react';
import { FormProvider } from 'react-hook-form';

export function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderWithProviders(ui, { providers: [ThemeProvider, FormProvider] }, options);
}

export function renderKeyboard(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return {
    ...render(ui, options),
    user: userEvent,
  };
}
