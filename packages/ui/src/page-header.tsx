import { cn } from '@ho-dev/utils';

import type { HTMLAttributes } from 'react';

interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
}

const PageHeader = ({ title, breadcrumb, className, ...props }: PageHeaderProps) => {
  const trail =
    breadcrumb && breadcrumb.length > 0
      ? breadcrumb
      : [{ label: 'Dashboard', href: '/' }, { label: title }];

  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    >
      <h2 className="text-dark text-[26px] leading-[30px] font-bold dark:text-white">{title}</h2>

      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            const link = item.href ? (
              <a className="font-medium" href={item.href}>
                {item.label}
                {!isLast && ' /'}
              </a>
            ) : (
              <span className="text-primary font-medium">{item.label}</span>
            );

            return (
              <li key={item.label} aria-current={isLast ? 'page' : undefined}>
                {link}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

PageHeader.displayName = 'PageHeader';

export { PageHeader, type PageHeaderProps };
