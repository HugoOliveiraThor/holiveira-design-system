import type { ReactNode } from 'react';
import { cn } from '@holiveira/utils';
import { useSidebarContext } from './sidebar-context';

interface HeaderToggleProps {
  className?: string;
  children?: ReactNode;
}

function HeaderToggle({ className, children }: HeaderToggleProps) {
  const { toggleMobileOpen } = useSidebarContext();

  return (
    <button
      onClick={toggleMobileOpen}
      className={cn(
        'dark:border-stroke-dark rounded-lg border px-1.5 py-1 lg:hidden dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A]',
        className,
      )}
    >
      {children ?? <MenuIcon />}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}
HeaderToggle.displayName = 'HeaderToggle';

interface HeaderActionsProps {
  children?: ReactNode;
  className?: string;
}

function HeaderActions({ children, className }: HeaderActionsProps) {
  return (
    <div className={cn('2xsm:gap-4 flex flex-1 items-center justify-end gap-2', className)}>
      {children}
    </div>
  );
}
HeaderActions.displayName = 'HeaderActions';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'border-stroke shadow-1 dark:border-stroke-dark dark:bg-gray-dark sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-5 md:px-5 2xl:px-10',
        className,
      )}
    >
      {children}
    </header>
  );
};
Header.displayName = 'Header';

function MenuIcon() {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export {
  Header,
  HeaderToggle,
  HeaderActions,
  type HeaderProps,
  type HeaderToggleProps,
  type HeaderActionsProps,
};
