import Link from 'next/link';
import type { ReactNode } from 'react';

import { docsSite } from '../../../site.config';

import { ThemeToggle } from './theme-toggle';

export interface SiteHeaderProps {
  search?: ReactNode;
}

export function SiteHeader({ search }: SiteHeaderProps) {
  return (
    <header className="border-stroke dark:border-stroke-dark dark:bg-dark-2 border-b bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="text-dark text-base font-semibold dark:text-white">
          Holiveira <span className="text-primary">Docs</span>
        </Link>
        <span className="text-dark-5 text-xs">pre-release</span>
        <div className="ml-auto flex items-center gap-3">
          {search}
          <nav aria-label="External links" className="flex items-center gap-3 text-sm">
            <a
              href={docsSite.storybookPath}
              className="text-dark-4 hover:text-primary dark:text-dark-6"
            >
              Storybook
            </a>
            <a
              href={docsSite.playgroundPath}
              className="text-dark-4 hover:text-primary dark:text-dark-6"
            >
              Playground
            </a>
            <a
              href={docsSite.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="text-dark-4 hover:text-primary dark:text-dark-6"
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
