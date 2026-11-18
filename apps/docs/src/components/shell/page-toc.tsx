'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  title: string;
}

/**
 * In-page navigation built from the page's own sections. It renders nothing for
 * fewer than two sections, and the reader's position is read with an
 * IntersectionObserver; without one the first section is the static fallback.
 */
export function PageToc({ items }: { items: TocItem[] }) {
  const [observed, setObserved] = useState<string | null>(null);
  const active = observed ?? items[0]?.id;

  useEffect(() => {
    if (items.length < 2 || typeof IntersectionObserver === 'undefined') return;
    const headings = items.flatMap((item) => {
      const element = document.getElementById(item.id);
      return element === null ? [] : [element];
    });
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
        const first = visible[0];
        if (first !== undefined) setObserved(first.target.id);
      },
      { rootMargin: '0px 0px -70% 0px' },
    );
    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-body-sm">
      <p className="mb-3 font-semibold text-[var(--portal-ink)]">On this page</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? 'location' : undefined}
              className="block text-[var(--portal-muted)] hover:text-[var(--portal-primary-strong)] aria-[current=location]:font-medium aria-[current=location]:text-[var(--portal-primary-strong)]"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
