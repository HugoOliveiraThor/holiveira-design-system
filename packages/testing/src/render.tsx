import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactNode, ComponentType, ReactElement } from 'react';
import type { ProviderConfig } from './types';

export { renderWithProviders };
export type { ProviderConfig, RenderWithProvidersOptions } from './types';

function renderWithProviders(
  ui: ReactElement,
  config: ProviderConfig,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  const { providers } = config;

  function Wrapper({ children }: { children: ReactNode }) {
    return providers.reduceRight((wrapped, Provider) => <Provider>{wrapped}</Provider>, children);
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
