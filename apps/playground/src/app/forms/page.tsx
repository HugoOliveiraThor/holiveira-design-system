import { FormView } from '../../features/form/form-view';
import { AppShell } from '../../features/shell/app-shell';

export default function Page() {
  return (
    <AppShell title="Forms" activePath="/forms">
      <FormView />
    </AppShell>
  );
}
