'use client';

import { useTheme } from '@ho-dev/theme';

import { Component, type ReactNode, useState } from 'react';

type PreviewWidth = 'full' | '375' | '768';

const WIDTHS: Array<{ value: PreviewWidth; label: string }> = [
  { value: 'full', label: 'Full' },
  { value: '375', label: '375' },
  { value: '768', label: '768' },
];

const THEMES = ['system', 'light', 'dark'] as const;

const TOOLBAR_BUTTON_CLASS =
  'text-body-xs rounded-md border border-[var(--portal-border)] px-2 py-1 text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] aria-pressed:border-[var(--portal-primary)] aria-pressed:bg-[var(--portal-primary)] aria-pressed:text-white';

class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p
          role="alert"
          className="text-body-sm rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface-2)] p-4 text-[var(--portal-body)]"
        >
          This example could not be rendered. Open the Storybook story to inspect it.
        </p>
      );
    }
    return this.props.children;
  }
}

/**
 * The preview frame. It owns the viewport width and drives the same theme
 * provider as the header toggle, so the preview is always rendered in the
 * reader's theme instead of a nested one.
 */
export function ExamplePreview({
  label,
  exampleKey,
  children,
}: {
  label: string;
  exampleKey: string;
  children: ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [width, setWidth] = useState<PreviewWidth>('full');

  return (
    <div
      data-preview
      className="overflow-hidden rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)]"
    >
      <div className="flex flex-wrap items-center gap-4 border-b border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-3 py-2">
        <div role="group" aria-label="Preview width" className="flex items-center gap-1">
          <span className="text-body-xs mr-1 text-[var(--portal-muted)]">Width</span>
          {WIDTHS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={width === option.value}
              onClick={() => {
                setWidth(option.value);
              }}
              className={TOOLBAR_BUTTON_CLASS}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Preview theme" className="flex items-center gap-1">
          <span className="text-body-xs mr-1 text-[var(--portal-muted)]">Theme</span>
          {THEMES.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={theme === option}
              onClick={() => {
                setTheme(option);
              }}
              className={`${TOOLBAR_BUTTON_CLASS} capitalize`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <div
          data-preview-frame
          data-example={exampleKey}
          style={{ width: width === 'full' ? '100%' : `${width}px` }}
          className="mx-auto max-w-full rounded-lg border border-[var(--portal-border)] bg-white p-4 dark:bg-[var(--portal-canvas)]"
        >
          <PreviewErrorBoundary>{children}</PreviewErrorBoundary>
        </div>
      </div>

      <p className="sr-only">{label} preview</p>
    </div>
  );
}
