'use client';

import { useClickOutside, useFocusRestore, useFocusTrap } from '@ho-dev/hooks';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { filterRecords } from './filter';

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  records: SearchRecord[];
}

const GROUP_ORDER = ['component', 'package', 'guide'] as const;

const GROUP_LABELS: Record<(typeof GROUP_ORDER)[number], string> = {
  component: 'Components',
  package: 'Packages',
  guide: 'Guides',
};

interface PaletteGroup {
  label: string;
  records: SearchRecord[];
}

/** Components first, then packages, then guides. */
function groupResults(records: SearchRecord[]): PaletteGroup[] {
  return GROUP_ORDER.flatMap((type) => {
    const grouped = records.filter((record) => record.type === type);
    return grouped.length === 0 ? [] : [{ label: GROUP_LABELS[type], records: grouped }];
  });
}

function optionId(record: SearchRecord): string {
  return `docs-search-option-${record.id}`;
}

/**
 * The primary search surface: a dialog over the page with the filter's results
 * grouped by kind. The active option is tracked on the input with
 * `aria-activedescendant`, so the reader types and navigates without leaving the
 * field; the dialog traps focus while open and the search control restores the
 * trigger when it closes.
 */
export function CommandPalette({ open, onOpenChange, records }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const { save, restore } = useFocusRestore();
  const panelRef = useClickOutside<HTMLDivElement>(() => onOpenChange(false));
  useFocusTrap(open, panelRef);

  const groups = groupResults(filterRecords(records, query));
  const ordered = groups.flatMap((group) => group.records);
  const current = ordered[active];

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (open) save();
    else restore();
  }, [open, save, restore]);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    onOpenChange(false);
  }

  function select(record: SearchRecord) {
    close();
    router.push(record.path);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(ordered.length - 1, index + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === 'Enter') {
      if (current === undefined) return;
      event.preventDefault();
      select(current);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  if (!open) return null;

  return (
    <div className="bg-dark/40 fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <div
        ref={panelRef}
        id="docs-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        onKeyDown={onKeyDown}
        className="shadow-theme-lg w-[min(640px,100%)] overflow-hidden rounded-xl border border-[var(--portal-border)] bg-[var(--portal-surface)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--portal-border)] px-4 py-3">
          <input
            role="combobox"
            aria-expanded="true"
            aria-controls={ordered.length === 0 ? undefined : 'docs-search-list'}
            aria-autocomplete="list"
            aria-label="Search components, packages and guides"
            aria-activedescendant={current === undefined ? undefined : optionId(current)}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components, packages and guides"
            className="text-body-sm w-full bg-transparent text-[var(--portal-ink)] outline-none placeholder:text-[var(--portal-muted)]"
          />
          <kbd className="text-body-xs rounded bg-[var(--portal-code-bg)] px-1.5 text-[var(--portal-muted)]">
            Esc
          </kbd>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {ordered.length} results
        </p>

        {ordered.length > 0 ? (
          <div
            id="docs-search-list"
            role="listbox"
            aria-label="Search results"
            className="max-h-[60vh] overflow-y-auto p-2"
          >
            {groups.map((group) => (
              <div key={group.label} role="group" aria-label={group.label} className="py-1">
                <p
                  role="presentation"
                  className="text-body-xs px-2 py-1 font-semibold tracking-wide text-[var(--portal-muted)] uppercase"
                >
                  {group.label}
                </p>
                {group.records.map((record) => (
                  <div
                    key={`${record.type}-${record.id}`}
                    id={optionId(record)}
                    role="option"
                    aria-selected={record.id === current?.id}
                    onClick={() => select(record)}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 aria-selected:bg-[var(--portal-surface-2)]"
                  >
                    <span className="text-body-sm text-[var(--portal-ink)]">{record.title}</span>
                    {record.package !== undefined && record.package !== record.title && (
                      <span className="text-body-xs text-[var(--portal-muted)]">
                        {record.package}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-10 text-center">
            <p className="text-body-sm text-[var(--portal-body)]">
              No results{query === '' ? ' yet' : ` for “${query}”`}.
            </p>
            <p className="text-body-xs mt-2 text-[var(--portal-muted)]">
              Try a component, a package or a guide name, or browse{' '}
              <Link href="/packages/" className="text-[var(--portal-primary-strong)]">
                all packages
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
