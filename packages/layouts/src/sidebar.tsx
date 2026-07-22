import { cn } from '@holiveira/utils';
import type { ReactNode } from 'react';

import { useSidebarContext } from './sidebar-context';

interface SidebarProps {
  logo?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Sidebar = ({ logo, children, className }: SidebarProps) => {
  const { expanded, isMobileOpen, isMobile, setMobileOpen } = useSidebarContext();

  const isVisible = isMobile ? isMobileOpen : expanded;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'transition-width dark:bg-gray-dark max-w-[290px] overflow-hidden border-r border-gray-200 bg-white duration-200 ease-linear dark:border-gray-800',
          isMobile ? 'fixed top-0 bottom-0 z-50' : 'sticky top-0 h-screen',
          isVisible ? 'w-full' : 'w-0',
          className,
        )}
        aria-label="Main navigation"
        aria-hidden={!isVisible}
        inert={!isVisible}
      >
        <div className="flex h-full flex-col py-10 pr-[7px] pl-[25px]">
          {logo && <div className="relative pr-4.5">{logo}</div>}

          {children && (
            <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
              {children}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

Sidebar.displayName = 'Sidebar';

export { Sidebar, type SidebarProps };
