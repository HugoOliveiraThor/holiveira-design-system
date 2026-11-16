'use client';

import { useTheme } from '@ho-dev/theme';

import { useEffect, useState } from 'react';


export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const next = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${next} theme`;

  return (
    <button
      type="button"
      aria-label={label}
      disabled={!mounted}
      onClick={() => setTheme(next)}
      className="border-stroke text-dark-4 hover:bg-gray-2 dark:border-stroke-dark dark:text-dark-6 dark:hover:bg-dark-2 rounded-md border px-3 py-1.5 text-sm font-medium transition disabled:opacity-60"
    >
      Theme
    </button>
  );
}
