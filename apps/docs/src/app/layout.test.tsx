import '@testing-library/jest-dom/vitest';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const captured = vi.hoisted(() => ({ props: {} as Record<string, unknown> }));

vi.mock('@ho-dev/theme', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ThemeProvider: (props: Record<string, unknown> & { children?: React.ReactNode }) => {
    captured.props = props;
    return <div>{props.children}</div>;
  },
  useTheme: () => ({ theme: 'system', resolvedTheme: 'light', setTheme: vi.fn() }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

import RootLayout from './layout';

describe('root layout', () => {
  it('configures the theme provider for system default', () => {
    render(<RootLayout>{<p>page</p>}</RootLayout>);
    expect(captured.props).toMatchObject({
      attribute: 'class',
      defaultTheme: 'system',
      enableSystem: true,
      storageKey: 'ho-dev-docs-theme',
    });
  });
});
