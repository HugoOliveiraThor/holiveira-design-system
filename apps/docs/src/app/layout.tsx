import { ThemeProvider } from '@ho-dev/theme';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { docsSite } from '../../site.config';
import { DocsSearch } from '../components/search/search';
import { DocsShell } from '../components/shell/docs-shell';
import { SkipLink } from '../components/shell/skip-link';
import { ThemeGuard } from '../components/shell/theme-guard';
import {
  componentSections,
  guideSections,
  packageSections,
  searchRecords,
} from '../lib/docs-metadata-query';

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
          <ThemeGuard />
          <SkipLink />
          <DocsShell
            search={<DocsSearch records={searchRecords} />}
            guideSections={guideSections()}
            packageSections={packageSections()}
            componentSections={componentSections()}
          >
            {children}
          </DocsShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
