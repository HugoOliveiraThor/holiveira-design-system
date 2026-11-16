import { Sidebar, SidebarProvider } from '@ho-dev/layouts';

export function SidebarMinimal() {
  return (
    <div className="border-stroke dark:border-dark-3 h-[360px] overflow-hidden rounded-lg border">
      <SidebarProvider>
        <Sidebar className="h-full" logo={<span className="text-sm font-bold">HQ</span>}>
          <nav aria-label="Example navigation" className="space-y-1">
            <a href="#dashboard" className="block rounded-lg px-3 py-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="#orders" className="block rounded-lg px-3 py-2 text-sm font-medium">
              Orders
            </a>
          </nav>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
