import '@testing-library/jest-dom/vitest';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

vi.mock('../fonts/satoshi', () => ({
  satoshi: { variable: 'font-satoshi-variable', className: 'font-satoshi-class' },
}));

import RootLayout from './layout';

afterEach(cleanup);

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

  it('keeps the skip link first', () => {
    const { container } = render(<RootLayout>{<p>page</p>}</RootLayout>);
    const focusable = container.querySelectorAll<HTMLElement>('a[href], button, input, [tabindex]');
    expect(focusable[0]).toHaveTextContent('Skip to content');
  });
});
