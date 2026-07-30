import { ThemeProvider } from '@holiveira/theme';

import type { Metadata } from 'next';

import '@holiveira/theme/theme.css';
import '@holiveira/tokens/tokens.css';
import '@holiveira/charts/chart-styles.css';
import '@holiveira/forms/date-picker-styles.css';

export const metadata: Metadata = {
  title: 'Consumer Test — Holiveira',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
