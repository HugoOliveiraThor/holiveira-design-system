import { Header, HeaderActions, HeaderToggle, SidebarProvider } from '@ho-dev/layouts';

export function HeaderRealistic() {
  return (
    <SidebarProvider>
      <Header>
        <HeaderToggle />
        <nav aria-label="Example navigation" className="flex items-center gap-4 text-sm">
          <a href="#orders">Orders</a>
          <a href="#customers">Customers</a>
        </nav>
        <HeaderActions>
          <span className="text-dark-4 dark:text-dark-6 text-sm">jane@acme.com</span>
        </HeaderActions>
      </Header>
    </SidebarProvider>
  );
}
