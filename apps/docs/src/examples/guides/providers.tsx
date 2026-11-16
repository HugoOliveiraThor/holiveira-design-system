import { SidebarProvider } from '@ho-dev/layouts';
import { ProviderComposer, type ProviderTree } from '@ho-dev/providers';
import { ThemeProvider } from '@ho-dev/theme';

import type { ReactNode } from 'react';

/** Outermost first: the theme wraps the layout, the layout wraps the application. */
const tree: ProviderTree = [[ThemeProvider], [SidebarProvider]];

export function AppProviders({ children }: { children: ReactNode }) {
  return <ProviderComposer tree={tree}>{children}</ProviderComposer>;
}
