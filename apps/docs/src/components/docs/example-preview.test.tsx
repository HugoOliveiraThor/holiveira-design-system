import '@testing-library/jest-dom/vitest';
import { ThemeProvider } from '@ho-dev/theme';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ExamplePreview } from './example-preview';

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  vi.restoreAllMocks();
});

function renderPreview(ui: React.ReactNode) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {ui}
    </ThemeProvider>,
  );
}

function frame(): HTMLElement {
  const element = document.querySelector<HTMLElement>('[data-preview-frame]');
  if (element === null) throw new Error('preview frame missing');
  return element;
}

describe('example preview', () => {
  it('applies the selected viewport width', () => {
    renderPreview(
      <ExamplePreview label="Button" exampleKey="button/realistic">
        <div>example</div>
      </ExamplePreview>,
    );
    expect(frame().style.width).toBe('100%');

    fireEvent.click(screen.getByRole('button', { name: '375' }));
    expect(frame().style.width).toBe('375px');
    expect(screen.getByRole('button', { name: '375' })).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: '768' }));
    expect(frame().style.width).toBe('768px');

    fireEvent.click(screen.getByRole('button', { name: 'Full' }));
    expect(frame().style.width).toBe('100%');
  });

  it('drives the page theme', () => {
    renderPreview(
      <ExamplePreview label="Button" exampleKey="button/realistic">
        <div>example</div>
      </ExamplePreview>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.documentElement).toHaveClass('dark');

    fireEvent.click(screen.getByRole('button', { name: 'light' }));
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('previews inherit the site theme', () => {
    renderPreview(
      <ExamplePreview label="Button" exampleKey="button/realistic">
        <div>example</div>
      </ExamplePreview>,
    );
    const surface = frame();
    // The surface follows the site's dark variant instead of opening a nested scope.
    expect(surface.className).toContain('bg-white');
    expect(surface.className).toContain('dark:bg-[var(--portal-canvas)]');
    expect(surface.classList.contains('dark')).toBe(false);
    expect(surface.closest('[data-theme]')).toBeNull();
    expect(surface.closest('.dark')).toBeNull();
  });

  it('shows an error message when the example throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    function Broken(): never {
      throw new Error('boom');
    }

    renderPreview(
      <ExamplePreview label="Button" exampleKey="button/realistic">
        <Broken />
      </ExamplePreview>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(/could not be rendered/i);
    expect(screen.queryByText('boom')).not.toBeInTheDocument();
  });
});
