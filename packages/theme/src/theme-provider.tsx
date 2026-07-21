'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { Attribute } from 'next-themes';
import type { ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
  /** Override the default theme. Defaults to "light". */
  defaultTheme?: string;
  /** Override the attribute used for theme switching. Defaults to "class". */
  attribute?: Attribute | Attribute[];
  /** Additional props forwarded to next-themes ThemeProvider. */
  [key: string]: unknown;
}

/** Wraps next-themes ThemeProvider with framework defaults (attribute="class", defaultTheme="light"). @public */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  attribute = 'class',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme} {...props}>
      {children}
    </NextThemesProvider>
  );
}

ThemeProvider.displayName = 'ThemeProvider';
