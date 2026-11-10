import { LoginView } from '../../features/login/login-view';
import { AppShell } from '../../features/shell/app-shell';

export default function Page() {
  return (
    <AppShell title="Login" activePath="/login">
      <LoginView />
    </AppShell>
  );
}
