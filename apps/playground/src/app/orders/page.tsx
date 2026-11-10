import { AppShell } from '../../features/shell/app-shell';
import { TableView } from '../../features/table/table-view';

export default function Page() {
  return (
    <AppShell title="Orders" activePath="/orders">
      <TableView />
    </AppShell>
  );
}
