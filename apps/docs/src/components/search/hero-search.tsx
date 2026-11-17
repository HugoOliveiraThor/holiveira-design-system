'use client';

import { useEffect, useRef, useState } from 'react';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { CommandPalette } from './command-palette';

export interface HeroSearchProps {
  records: SearchRecord[];
}

/**
 * The landing's wide search affordance.
 *
 * It is a button drawn like a field, not an input: the page keeps exactly one
 * combobox, the palette's, so the strict locators and the accessible names the
 * header already owns stay valid. Clicking it mounts the same palette and the
 * focus returns here when the palette closes.
 */
export function HeroSearch({ records }: HeroSearchProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

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
        aria-haspopup="dialog"
        aria-expanded={open}
        className="text-body-sm group flex w-full max-w-[680px] items-center gap-3 rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)] px-4 py-3 text-left shadow-[var(--shadow-1)] transition-colors hover:border-[var(--portal-primary-strong)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="size-4 shrink-0 text-[var(--portal-muted)] group-hover:text-[var(--portal-primary-strong)]"
        >
          <circle cx="9" cy="9" r="5.25" />
          <path d="m13 13 3.5 3.5" />
        </svg>
        <span className="flex-1 text-[var(--portal-muted)]">
          Search components, packages and guides
        </span>{' '}
        <kbd className="text-body-xs rounded border border-[var(--portal-border)] bg-[var(--portal-code-bg)] px-1.5 py-0.5 text-[var(--portal-body)]">
          ⌘K
        </kbd>
      </button>
      {open && <CommandPalette open onOpenChange={setOpen} records={records} />}
    </>
  );
}
