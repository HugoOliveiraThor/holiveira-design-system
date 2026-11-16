import { Button } from '@ho-dev/primitives';
import { ThemeProvider } from '@ho-dev/theme';

/** Two installed packages: a foundation provider and a component. */
export function InstallationCheck() {
  return (
    <ThemeProvider>
      <Button>Installed</Button>
    </ThemeProvider>
  );
}
