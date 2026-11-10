import { SettingsView } from '../../features/settings/settings-view';
import { AppShell } from '../../features/shell/app-shell';

export default function Page() {
  return (
    <AppShell title="Settings" activePath="/settings">
      <SettingsView />
    </AppShell>
  );
}
