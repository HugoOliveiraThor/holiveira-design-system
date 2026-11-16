import { Header, HeaderActions, HeaderToggle, Sidebar, SidebarProvider } from '@ho-dev/layouts';

import type { ReactNode } from 'react';

/** The shell owns open/close state; the application owns what goes inside. */
export function AppLayout({
  children,
  navigation,
}: {
  children: ReactNode;
  navigation: ReactNode;
}) {
  return (
    <SidebarProvider>
      <Header>
        <HeaderToggle />
        <HeaderActions>
          <span className="text-sm">Signed in</span>
        </HeaderActions>
      </Header>
      <Sidebar logo={<span className="text-sm font-semibold">Holiveira</span>}>
        <nav aria-label="Main navigation">{navigation}</nav>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
