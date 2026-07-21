import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@holiveira/utils';

interface ShowcaseSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

const ShowcaseSection = ({ title, children, className, ...props }: ShowcaseSectionProps) => {
  const headingId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <section aria-labelledby={headingId}>
      <div
        className={cn(
          'shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white',
          className,
        )}
        {...props}
      >
        <h2
          id={headingId}
          className="border-stroke text-dark dark:border-dark-3 border-b px-4 py-4 font-medium sm:px-6 xl:px-7.5 dark:text-white"
        >
          {title}
        </h2>

        <div className="p-4 sm:p-6 xl:p-10">{children}</div>
      </div>
    </section>
  );
};

ShowcaseSection.displayName = 'ShowcaseSection';

export { ShowcaseSection, type ShowcaseSectionProps };
