import type { ReactNode } from 'react';

/** One contract section: a heading that anchors the page and its content. */
export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="text-dark mb-3 text-lg font-semibold dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}
