'use client';

import { useTheme } from '@ho-dev/theme';

import { useEffect } from 'react';

const VALID = new Set(['light', 'dark', 'system']);

/** Drop a stored theme the app does not define, so an invalid value never wins. */
export function ThemeGuard() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme !== undefined && !VALID.has(theme)) setTheme('system');
  }, [theme, setTheme]);

  return null;
}
