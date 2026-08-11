'use client';

import { ArrowLeftIcon } from '@ho-dev/icons';
import { cn } from '@ho-dev/utils';

import { type HTMLAttributes, type ReactNode } from 'react';

type AuthLayoutProps = HTMLAttributes<HTMLElement> & {
  brandLogo?: ReactNode;
  brandText?: string;
  backHref?: string;
  children: ReactNode;
};

function AuthLayout({
  brandLogo,
  brandText,
  backHref = '/',
  children,
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn('relative z-1 flex min-h-screen w-full bg-white dark:bg-gray-900', className)}
      {...props}
    >
      <div className="flex w-full flex-1 flex-col">
        <div className="mx-auto w-full max-w-md px-6 pt-10 sm:px-0">
          <a
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon size={20} className="stroke-current" />
            Back to dashboard
          </a>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10 sm:px-0">
          {children}
        </div>
      </div>

      <div className="bg-brand-950 relative hidden w-full items-center lg:grid lg:w-1/2">
        <div className="absolute top-0 right-0 w-full max-w-[250px] xl:max-w-[450px]">
          <GridShape />
        </div>
        <div className="absolute bottom-0 left-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
          <GridShape />
        </div>
        <div className="relative z-10 flex w-full flex-col items-center">
          {brandLogo && <div className="mb-4">{brandLogo}</div>}
          {brandText && (
            <p className="max-w-xs text-center text-gray-400 dark:text-white/60">{brandText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

AuthLayout.displayName = 'AuthLayout';

function GridShape() {
  return (
    <svg
      width="450"
      height="254"
      viewBox="0 0 450 254"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.50555 45.1131L450 45.1132L450 44.6073L0.50555 44.6072L0.50555 45.1131Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M205.546 253.529L205.546 -2.13709e-05L205.04 -2.1392e-05L205.04 253.529L205.546 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.505546 97.2164L450 97.2165L450 96.7106L0.505546 96.7106L0.505546 97.2164Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M256.806 253.529L256.806 -1.68895e-05L256.3 -1.69106e-05L256.3 253.529L256.806 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.505837 253.529L0.505859 -3.9296e-05L0 -3.93171e-05L-2.21642e-05 253.529L0.505837 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.505541 149.321L450 149.321L450 148.815L0.505541 148.815L0.505541 149.321Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M308.066 253.529L308.066 -1.24083e-05L307.56 -1.24294e-05L307.56 253.529L308.066 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.7662 253.529L51.7662 -3.48147e-05L51.2603 -3.48358e-05L51.2603 253.529L51.7662 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.505537 201.424L450 201.424L450 200.918L0.505537 200.918L0.505537 201.424Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M359.326 253.529L359.326 -7.92695e-06L358.82 -7.94806e-06L358.82 253.529L359.326 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.026 253.529L103.026 -3.03334e-05L102.52 -3.03545e-05L102.52 253.529L103.026 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M410.586 253.529L410.586 -3.44569e-06L410.08 -3.4668e-06L410.08 253.529L410.586 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M154.286 253.529L154.286 -2.58521e-05L153.78 -2.58732e-05L153.78 253.529L154.286 253.529Z"
        fill="url(#gridgrad)"
        fillOpacity="0.3"
      />
      <defs>
        <linearGradient
          id="gridgrad"
          x1="277.872"
          y1="0"
          x2="194.87"
          y2="235.867"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B2B2B2" />
          <stop offset="1" stopColor="#B2B2B2" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { AuthLayout, type AuthLayoutProps };
