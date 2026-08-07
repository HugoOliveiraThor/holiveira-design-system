import { ThemeProvider } from '@ho-dev/theme';

import type { Metadata } from 'next';

import '@ho-dev/theme/theme.css';
import '@ho-dev/tokens/tokens.css';
import '@ho-dev/charts/chart-styles.css';
import '@ho-dev/forms/date-picker-styles.css';

export const metadata: Metadata = {
  title: 'Holiveira — Next.js Example',
  description: 'Reference application using @ho-dev packages.',
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
