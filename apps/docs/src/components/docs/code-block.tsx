'use client';

import { useState } from 'react';

export interface CodeBlockProps {
  source: string;
  label: string;
  componentName: string;
}

/**
 * The example source, verbatim. The copy button is a real button and the result
 * is announced through a live region, so the reader does not have to watch the
 * button change to know what happened.
 */
export function CodeBlock({ source, label, componentName }: CodeBlockProps) {
  const [status, setStatus] = useState('');

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(source);
      setStatus(`${label} copied.`);
    } catch {
      setStatus(`Could not copy the ${label.toLowerCase()}. Select the code and copy it manually.`);
    }
  }

  return (
    <figure
      data-code-block
      className="overflow-hidden rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)]"
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-[var(--portal-border)] bg-[var(--portal-surface-2)] px-3 py-2">
        <span className="text-body-xs font-semibold tracking-wide text-[var(--portal-muted)] uppercase">
          {label}
        </span>
        <button
          type="button"
          onClick={() => {
            void copy();
          }}
          aria-label={`Copy ${label} for ${componentName}`}
          className="text-body-xs rounded-md border border-[var(--portal-border)] px-2 py-1 text-[var(--portal-body)] transition-colors hover:border-[var(--portal-primary-strong)] hover:text-[var(--portal-primary-strong)]"
        >
          Copy
        </button>
      </figcaption>
      <pre className="overflow-x-auto bg-[var(--portal-code-bg)] p-3 text-xs">
        <code>{source}</code>
      </pre>
      <p role="status" className="sr-only">
        {status}
      </p>
    </figure>
  );
}
