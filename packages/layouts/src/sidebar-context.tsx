'use client';

import { useIsMobile } from '@ho-dev/hooks';

import { createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
  expanded: boolean;
  collapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  toggleMobileOpen: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
      setCollapsed(true);
    } else {
      setCollapsed(defaultCollapsed);
    }
  }, [isMobile]);

  function toggleMobileOpen() {
    setMobileOpen((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        expanded: !collapsed,
        collapsed,
        isMobileOpen,
        isMobile,
        setCollapsed,
        setMobileOpen,
        toggleMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
