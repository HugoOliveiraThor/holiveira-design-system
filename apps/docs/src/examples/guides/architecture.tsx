import { Button } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

/**
 * Applications import the public entry point of every package. A dependency
 * belongs to the package whose source imports it, never to the application.
 */
export function SubmitRow({ busy }: { busy: boolean }) {
  return (
    <div className={cn('flex items-center gap-3', busy && 'opacity-60')}>
      <Button type="submit">Save</Button>
    </div>
  );
}
