import { SidebarProvider, Sidebar, Header, HeaderToggle, HeaderActions } from '@ho-dev/layouts';
import { Breadcrumb } from '@ho-dev/ui';

export default function LayoutsPage() {
  return (
    <main>
      <h1>Layouts Example — Sidebar + Header + Breadcrumb</h1>

      <SidebarProvider>
        <Header>
          <HeaderToggle />
          <HeaderActions>
            <span>User Actions</span>
          </HeaderActions>
        </Header>

        <Sidebar>
          <nav>
            <Breadcrumb pageName="Layouts" />
          </nav>
        </Sidebar>
      </SidebarProvider>
    </main>
  );
}
