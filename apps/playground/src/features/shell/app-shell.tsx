'use client';

import { Header, HeaderActions, HeaderToggle, Sidebar, SidebarProvider } from '@ho-dev/layouts';
import { PageHeader } from '@ho-dev/ui';
import { cn } from '@ho-dev/utils';

import type { ReactNode } from 'react';

/** App is served from a single static export mounted at this base path. */
const BASE_PATH = '/playground';

/** Deployed Storybook site these screens document their components in. */
const STORYBOOK_BASE = 'https://HugoOliveiraThor.github.io/holiveira-design-system';

/** Storybook entry each route illustrates, taken from the built story index. */
const STORYBOOK_PATHS: Record<string, string> = {
  '/': '/?path=/story/patterns-sidebar-breadcrumb--layout',
  '/forms': '/?path=/story/patterns-form-validation--example',
  '/orders': '/?path=/story/patterns-tables-data-table-1--default',
  '/settings': '/?path=/docs/design-tokens-colors--docs',
  '/login': '/?path=/story/layouts-signinform--default',
};

/** Resolves a route to its deployed Storybook entry. */
export function storybookHref(path: string): string {
  return `${STORYBOOK_BASE}${STORYBOOK_PATHS[path] ?? '/?path=/docs/getting-started--docs'}`;
}

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/forms', label: 'Forms' },
  { href: '/orders', label: 'Orders' },
  { href: '/settings', label: 'Settings' },
  { href: '/login', label: 'Login' },
];

/** Resolves a route to the URL the static export is served from. */
export function appHref(path: string): string {
  return path === '/' ? `${BASE_PATH}/` : `${BASE_PATH}${path}/`;
}

export interface AppShellProps {
  title: string;
  activePath: string;
  children: ReactNode;
}

export function AppShell({ title, activePath, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar logo={<span className="text-primary text-lg font-bold">HO Studio</span>}>
          <nav aria-label="Sidebar">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === activePath;

                return (
                  <li key={item.href}>
                    <a
                      href={appHref(item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      data-active={isActive ? 'true' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Sidebar>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Header>
            <div className="flex items-center gap-3">
              <HeaderToggle />
              <span className="text-dark text-sm font-semibold dark:text-white">{title}</span>
            </div>
            <HeaderActions>
              <a
                href={storybookHref(activePath)}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-sm font-medium"
              >
                View in Storybook
              </a>
              <a href={appHref('/settings')} className="text-primary text-sm font-medium">
                Preferences
              </a>
            </HeaderActions>
          </Header>

          <main className="flex-1 p-4 md:p-6 2xl:p-10">
            <PageHeader
              title={title}
              breadcrumb={[{ label: 'Playground', href: appHref('/') }, { label: title }]}
            />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

AppShell.displayName = 'AppShell';
