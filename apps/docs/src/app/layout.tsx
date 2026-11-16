import { ThemeProvider } from '@ho-dev/theme';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';


import { docsSite } from '../../site.config';
import { SiteHeader } from '../components/shell/site-header';
import { SkipLink } from '../components/shell/skip-link';


import './globals.css';

export const metadata: Metadata = {
  title: docsSite.title,
  description: docsSite.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-2 text-dark-4 dark:text-dark-6 dark:bg-[#020D1A]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="ho-dev-docs-theme"
        >
          <SkipLink />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="min-h-dvh px-4 py-10 lg:px-6">
            <div className="mx-auto w-full max-w-[1060px]">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
