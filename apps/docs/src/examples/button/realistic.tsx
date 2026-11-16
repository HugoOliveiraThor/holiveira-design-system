import { Button } from '@ho-dev/primitives';

export function ButtonRealistic() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Button variant="outline">Save draft</Button>
      <Button variant="outline" shape="rounded">
        Preview
      </Button>
      <Button>Publish release</Button>
    </div>
  );
}
