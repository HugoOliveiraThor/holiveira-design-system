import Link from 'next/link';
import type { ReactNode, RefObject } from 'react';

import { docsSite } from '../../../site.config';

import { ThemeToggle } from './theme-toggle';

export interface SiteHeaderProps {
  search?: ReactNode;
  onMenuClick?: () => void;
  menuOpen?: boolean;
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

const LINK_CLASS = 'text-[var(--portal-body)] hover:text-[var(--portal-primary-strong)]';

/**
 * The sticky top bar: brand, the search trigger the page provides, the external
 * surfaces and the theme toggle. The menu button only exists below the desktop
 * breakpoint, where the sidebar becomes a drawer.
 */
export function SiteHeader({ search, onMenuClick, menuOpen, menuButtonRef }: SiteHeaderProps) {
  return (
    <header className="portal-header sticky top-0 z-40">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 lg:px-6">
        {onMenuClick && (
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onMenuClick}
            aria-expanded={menuOpen ?? false}
            aria-controls="docs-mobile-navigation"
            className="text-body-sm rounded-md border border-[var(--portal-border)] px-2 py-1 text-[var(--portal-body)] lg:hidden"
          >
            Menu
          </button>
        )}
        <Link href="/" className="text-base font-semibold text-[var(--portal-ink)]">
          Holiveira <span className="text-[var(--portal-primary-strong)]">Docs</span>
        </Link>
        <span className="text-body-xs hidden text-[var(--portal-muted)] sm:inline">
          pre-release
        </span>
        <div className="ml-auto flex items-center gap-3">
          {search}
          <nav aria-label="External links" className="hidden items-center gap-4 text-sm md:flex">
            <a href={docsSite.storybookUrl} className={LINK_CLASS}>
              Storybook
            </a>
            <a href={docsSite.playgroundUrl} className={LINK_CLASS}>
              Playground
            </a>
            <a
              href={docsSite.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className={LINK_CLASS}
            >
              GitHub
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
