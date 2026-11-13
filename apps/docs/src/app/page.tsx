import { cn } from '@ho-dev/utils';

import { docsSite } from '../../site.config';

export default function HomePage() {
  return (
    <main className={cn('mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 p-6')}>
      <h1 className="text-2xl font-semibold">{docsSite.title}</h1>
      <p className="text-sm">
        The Documentation Platform is under construction. Packages are pre-release and not yet
        published to npm.
      </p>
      <p className="text-sm">
        <a className="underline" href={docsSite.storybookPath}>
          Storybook
        </a>{' '}
        ·{' '}
        <a className="underline" href={docsSite.playgroundPath}>
          Playground
        </a>
      </p>
    </main>
  );
}
