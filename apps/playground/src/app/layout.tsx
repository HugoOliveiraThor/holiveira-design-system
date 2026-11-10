import { ThemeProvider } from '@ho-dev/theme';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@ho-dev/charts/chart-styles.css';
import '@ho-dev/forms/date-picker-styles.css';
import 'flatpickr/dist/flatpickr.min.css';

import './globals.css';

export const metadata: Metadata = {
  title: 'Playground — HO Design System',
  description: 'Reference product screens composed from @ho-dev packages.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-2 text-dark dark:bg-dark dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
