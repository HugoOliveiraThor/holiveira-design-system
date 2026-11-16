import { Alert } from '@ho-dev/primitives';

export function AlertMinimal() {
  return (
    <Alert
      variant="info"
      title="Scheduled maintenance"
      description="Deployments pause on Saturday from 02:00 to 04:00 UTC."
    />
  );
}
