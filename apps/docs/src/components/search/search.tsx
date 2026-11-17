'use client';

import { useEffect, useRef, useState } from 'react';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { CommandPalette } from './command-palette';

export interface DocsSearchProps {
  records: SearchRecord[];
}

/**
 * The search entry point: a trigger in the header and the keyboard shortcuts
 * that open the palette from anywhere on the page. Focus returns to the trigger
 * whenever the palette closes, which is the contract the header relies on.
 */
export function DocsSearch({ records }: DocsSearchProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target !== null &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable === true);
      if (event.key === '/' && !typing) {
        event.preventDefault();
        setOpen(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="docs-search-dialog"
        aria-haspopup="dialog"
        aria-label="Search documentation"
        className="text-body-sm flex items-center gap-2 rounded-md border border-[var(--portal-border)] px-3 py-1.5 text-[var(--portal-body)] hover:border-[var(--portal-primary-strong)]"
      >
        Search
        <kbd
          aria-hidden="true"
          className="text-body-xs hidden rounded bg-[var(--portal-code-bg)] px-1.5 text-[var(--portal-muted)] sm:inline-block"
        >
          ⌘K
        </kbd>
      </button>
      <CommandPalette open={open} onOpenChange={setOpen} records={records} />
    </>
  );
}
