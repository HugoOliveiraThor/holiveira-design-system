'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { filterRecords } from './filter';

export interface DocsSearchProps {
  records: SearchRecord[];
}

export function DocsSearch({ records }: DocsSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = filterRecords(records, query);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setActive(0), [query]);

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

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((current) => Math.min(results.length - 1, current + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => Math.max(0, current - 1));
    } else if (event.key === 'Enter') {
      const record = results[active];
      if (record !== undefined) {
        event.preventDefault();
        setOpen(false);
        router.push(record.path);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="docs-search-dialog"
        className="border-stroke dark:border-stroke-dark text-dark-4 dark:text-dark-6 flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
      >
        Search
        <kbd className="bg-gray-2 dark:bg-dark-3 rounded px-1 text-xs">/</kbd>
      </button>
      {open && (
        <div
          id="docs-search-dialog"
          role="dialog"
          aria-label="Search documentation"
          className="border-stroke shadow-theme-lg dark:border-stroke-dark dark:bg-dark-2 fixed inset-x-0 top-16 z-30 mx-auto w-[min(640px,92vw)] rounded-lg border bg-white p-3"
        >
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={open}
            aria-controls="docs-search-list"
            aria-autocomplete="list"
            aria-activedescendant={
              results[active] ? `docs-search-option-${results[active].id}` : undefined
            }
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search packages and components"
            className="border-stroke dark:border-stroke-dark dark:bg-dark-2 w-full rounded-md border px-3 py-2 text-sm"
          />
          <p role="status" aria-live="polite" className="text-dark-4 dark:text-dark-6 mt-2 text-xs">
            {results.length} results
          </p>
          {results.length > 0 ? (
            <ul
              id="docs-search-list"
              role="listbox"
              aria-label="Search results"
              className="mt-2 max-h-80 overflow-y-auto"
            >
              {results.map((record, index) => (
                <li
                  key={`${record.type}-${record.id}`}
                  id={`docs-search-option-${record.id}`}
                  role="option"
                  aria-selected={index === active}
                  className="aria-selected:bg-gray-2 dark:aria-selected:bg-dark-3 rounded px-2 py-1 text-sm"
                >
                  <Link
                    href={record.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-dark dark:text-white">{record.title}</span>
                    <span className="text-dark-4 dark:text-dark-6 text-xs">
                      {record.type} · {record.package}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-dark-4 dark:text-dark-6 mt-2 text-sm">
              No results. Browse{' '}
              <Link href="/packages/" className="text-primary dark:text-blue-light-400">
                all packages
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </>
  );
}
