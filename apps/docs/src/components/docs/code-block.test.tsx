import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CodeBlock } from './code-block';

const SOURCE = `import { Button } from '@ho-dev/primitives';

export function ButtonMinimal() {
  return <Button>Save changes</Button>;
}
`;

function stubClipboard(writeText: (text: string) => Promise<void>): void {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, 'clipboard');
});

describe('code block', () => {
  it('copies the source and announces success', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<CodeBlock source={SOURCE} label="Minimal example" componentName="Button" />);
    fireEvent.click(screen.getByRole('button', { name: /copy minimal example/i }));

    expect(writeText).toHaveBeenCalledWith(SOURCE);
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Minimal example copied.'),
    );
  });

  it('announces a failed copy and keeps the source selectable', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')));

    render(<CodeBlock source={SOURCE} label="Minimal example" componentName="Button" />);
    fireEvent.click(screen.getByRole('button', { name: /copy minimal example/i }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/could not copy the minimal example/i),
    );
    expect(document.querySelector('pre > code')?.textContent).toContain(SOURCE.split('\n')[0]);
  });

  it('renders the source verbatim inside pre code', () => {
    render(<CodeBlock source={SOURCE} label="Minimal example" componentName="Button" />);
    const code = document.querySelector('pre > code');
    expect(code?.textContent).toBe(SOURCE);
  });

  it('names the copy button after the example', () => {
    render(<CodeBlock source={SOURCE} label="Realistic example" componentName="Button" />);
    expect(
      screen.getByRole('button', { name: 'Copy Realistic example for Button' }),
    ).toBeInTheDocument();
  });
});
