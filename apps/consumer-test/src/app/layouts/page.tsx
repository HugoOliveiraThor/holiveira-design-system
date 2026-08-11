import { SidebarProvider, Sidebar, Header, HeaderToggle, HeaderActions } from '@ho-dev/layouts';
import { PageHeader } from '@ho-dev/ui';

export default function LayoutsPage() {
  return (
    <main>
      <h1>Layouts Example — Sidebar + Header + PageHeader</h1>

      <SidebarProvider>
        <Header>
          <HeaderToggle />
          <HeaderActions>
            <span>User Actions</span>
          </HeaderActions>
        </Header>

        <Sidebar>
          <nav>
            <PageHeader title="Layouts" />
          </nav>
        </Sidebar>
      </SidebarProvider>
    </main>
  );
}
