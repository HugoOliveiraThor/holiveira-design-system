'use client';

import { Button } from '@ho-dev/primitives';
import { useTheme } from '@ho-dev/theme';
import { colors, containers, shadows } from '@ho-dev/tokens';
import { Card, CardTitle } from '@ho-dev/ui';

import { useEffect, useState } from 'react';

export function SettingsView() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle as="h2">Appearance</CardTitle>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Switch between light and dark. The choice is kept across page loads.
        </p>
        <Button className="mt-4" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          {/* The stored theme is only known after mount; keep the server and client text equal. */}
          {mounted ? (isDark ? 'Switch to light' : 'Switch to dark') : 'Theme'}
        </Button>
      </Card>

      <Card>
        <CardTitle as="h2">Color tokens</CardTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors).map(([name, value]) => (
            <li key={name} data-testid="color-swatch" className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="border-stroke dark:border-dark-3 size-8 shrink-0 rounded-md border"
                style={{ backgroundColor: value }}
              />
              <span className="text-dark text-sm font-medium dark:text-white">{name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle as="h2">Spacing tokens</CardTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(containers).map(([name, value]) => (
            <li key={name} data-testid="spacing-swatch" className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-primary/20 h-6 shrink-0 rounded-sm"
                style={{ width: value }}
              />
              <span className="text-dark text-sm font-medium dark:text-white">{name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle as="h2">Shadow tokens</CardTitle>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(shadows).map(([name, value]) => (
            <li
              key={name}
              data-testid="shadow-swatch"
              className="rounded-lg bg-white p-4 dark:bg-white/5"
              style={{ boxShadow: value }}
            >
              <span className="text-dark text-sm font-medium dark:text-white">{name}</span>
              <span className="mt-1 block text-xs break-all text-gray-500 dark:text-gray-400">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

SettingsView.displayName = 'SettingsView';
