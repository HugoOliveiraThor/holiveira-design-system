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

export function SiteHeader({ search, onMenuClick, menuOpen, menuButtonRef }: SiteHeaderProps) {
  return (
    <header className="border-stroke dark:border-stroke-dark dark:bg-dark-2 border-b bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-3 lg:px-6">
        {onMenuClick && (
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onMenuClick}
            aria-expanded={menuOpen ?? false}
            aria-controls="docs-mobile-navigation"
            className="border-stroke dark:border-stroke-dark rounded-md border px-2 py-1 text-sm lg:hidden"
          >
            Menu
          </button>
        )}
        <Link href="/" className="text-dark text-base font-semibold dark:text-white">
          Holiveira <span className="text-primary dark:text-blue-light-400">Docs</span>
        </Link>
        <span className="text-dark-4 dark:text-dark-6 hidden text-xs sm:inline">pre-release</span>
        <div className="ml-auto flex items-center gap-3">
          {search}
          <nav aria-label="External links" className="hidden items-center gap-3 text-sm md:flex">
            <a
              href={docsSite.storybookUrl}
              className="text-dark-4 dark:text-dark-6 hover:text-primary dark:text-blue-light-400 dark:text-dark-6"
            >
              Storybook
            </a>
            <a
              href={docsSite.playgroundUrl}
              className="text-dark-4 dark:text-dark-6 hover:text-primary dark:text-blue-light-400 dark:text-dark-6"
            >
              Playground
            </a>
            <a
              href={docsSite.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="text-dark-4 dark:text-dark-6 hover:text-primary dark:text-blue-light-400 dark:text-dark-6"
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
