'use client';

import { ThemeProvider, useTheme } from '@ho-dev/theme';

/** Reads the active theme and writes the next one. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Switch to the {theme === 'dark' ? 'light' : 'dark'} theme
    </button>
  );
}

/** The provider wraps the application once, above anything that reads the theme. */
export function ThemedApp() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}
