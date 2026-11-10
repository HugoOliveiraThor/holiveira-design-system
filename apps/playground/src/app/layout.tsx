import { ThemeProvider } from '@ho-dev/theme';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@ho-dev/theme/theme.css';

export const metadata: Metadata = {
  title: 'Playground — HO Design System',
  description: 'Reference product screens composed from @ho-dev packages.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-2 text-dark dark:bg-dark dark:text-white">{children}</body>
    </html>
  );
}
