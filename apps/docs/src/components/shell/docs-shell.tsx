'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import type { NavigationSection } from '../../lib/docs-metadata-query';

import { SiteHeader } from './site-header';

export interface DocsShellProps {
  children: ReactNode;
  search?: ReactNode;
  guideSections: NavigationSection[];
  packageSections: NavigationSection[];
  componentSections: NavigationSection[];
}

const ITEM_CLASS =
  'text-body-sm block rounded-md px-2 py-1 text-[var(--portal-body)] hover:bg-[var(--portal-surface-2)] hover:text-[var(--portal-primary-strong)] aria-[current=page]:bg-[var(--portal-primary-soft)] aria-[current=page]:font-medium aria-[current=page]:text-[var(--portal-primary-strong)]';

const GROUP_CLASS =
  'text-body-xs mb-2 font-semibold tracking-wide text-[var(--portal-muted)] uppercase';

const CATEGORY_CLASS = 'text-body-xs mb-1 text-[var(--portal-muted)]';

function matches(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/' || pathname === '';
  return pathname === href || pathname === href.replace(/\/$/, '');
}

interface NavGroup {
  label: string;
  sections: NavigationSection[];
  /** Catalog groups keep their category label; a guide group's label is the category. */
  labels: boolean;
}

/** The five navigation groups, in reading order, with the architecture guides under Guides. */
function navGroups(
  guideSections: NavigationSection[],
  packageSections: NavigationSection[],
  componentSections: NavigationSection[],
): NavGroup[] {
  const guides = (label: string, categories: string[]): NavGroup => ({
    label,
    sections: guideSections.filter((section) => categories.includes(section.category)),
    labels: false,
  });
  return [
    guides('Getting Started', ['Getting Started']),
    guides('Foundations', ['Foundations']),
    guides('Guides', ['Guides', 'Architecture']),
    { label: 'Packages', sections: packageSections, labels: true },
    { label: 'Components', sections: componentSections, labels: false },
  ].filter((group) => group.sections.some((section) => section.items.length > 0));
}

function SidebarContent({
  pathname,
  guideSections,
  packageSections,
  componentSections,
  onNavigate,
}: Omit<DocsShellProps, 'children' | 'search'> & {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Documentation" className="space-y-6">
      {navGroups(guideSections, packageSections, componentSections).map((group) => (
        <div key={group.label}>
          <p data-nav-group={group.label} className={GROUP_CLASS}>
            {group.label}
          </p>
          {group.sections.map((section) => (
            <div key={section.category}>
              {group.labels && <p className={CATEGORY_CLASS}>{section.category}</p>}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={matches(pathname, item.href) ? 'page' : undefined}
                      className={ITEM_CLASS}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({
  children,
  search,
  guideSections,
  packageSections,
  componentSections,
}: DocsShellProps) {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <SiteHeader
        search={search}
        onMenuClick={() => setOpen(true)}
        menuOpen={open}
        menuButtonRef={triggerRef}
      />
      <div className="mx-auto flex w-full max-w-[1440px] gap-10 px-4 lg:px-6">
        <aside className="hidden w-[280px] shrink-0 py-8 lg:block">
          <SidebarContent
            pathname={pathname}
            guideSections={guideSections}
            packageSections={packageSections}
            componentSections={componentSections}
          />
        </aside>
        <main id="main-content" tabIndex={-1} className="min-h-dvh min-w-0 flex-1 py-10">
          {children}
        </main>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="bg-dark/40 absolute inset-0"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
          />
          <div
            ref={dialogRef}
            id="docs-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Documentation navigation"
            className="shadow-theme-lg relative h-full w-72 max-w-[80%] overflow-y-auto bg-[var(--portal-surface)] p-4"
          >
            <SidebarContent
              pathname={pathname}
              guideSections={guideSections}
              packageSections={packageSections}
              componentSections={componentSections}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
