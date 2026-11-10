import { DashboardView } from '../features/dashboard/dashboard-view';
import { AppShell } from '../features/shell/app-shell';

export default function Page() {
  return (
    <AppShell title="Dashboard" activePath="/">
      <DashboardView />
    </AppShell>
  );
}
