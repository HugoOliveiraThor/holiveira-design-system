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
    <figure data-code-block className="border-stroke dark:border-dark-3 rounded-lg border">
      <figcaption className="border-stroke dark:border-dark-3 flex items-center justify-between gap-3 border-b px-3 py-2">
        <span className="text-dark-4 dark:text-dark-6 text-xs font-medium">{label}</span>
        <button
          type="button"
          onClick={() => {
            void copy();
          }}
          aria-label={`Copy ${label} for ${componentName}`}
          className="border-stroke dark:border-dark-3 rounded-md border px-2 py-1 text-xs"
        >
          Copy
        </button>
      </figcaption>
      <pre className="bg-gray-2 dark:bg-dark-2 overflow-x-auto p-3 text-xs">
        <code>{source}</code>
      </pre>
      <p role="status" className="sr-only">
        {status}
      </p>
    </figure>
  );
}
