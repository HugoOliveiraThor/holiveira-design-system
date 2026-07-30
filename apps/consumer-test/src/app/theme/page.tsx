'use client';

import { Button } from '@holiveira/primitives';
import { useTheme } from '@holiveira/theme';
import { colors } from '@holiveira/tokens';

export default function ThemePage() {
  const { theme, setTheme } = useTheme();

  return (
    <main style={{ padding: 24 }}>
      <h1>Theme Example — ThemeProvider + dark mode toggle + tokens</h1>

      <p>
        Current theme: <strong>{theme}</strong>
      </p>

      <Button
        label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <section style={{ marginTop: 24 }}>
        <h2>Custom Color Tokens</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(colors)
            .slice(0, 8)
            .map(([key, val]) => (
              <div
                key={key}
                title={`${key}: ${typeof val === 'string' ? val : JSON.stringify(val)}`}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 4,
                  background: typeof val === 'string' ? val : '#ccc',
                  border: '1px solid var(--color-border)',
                }}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
