'use client';

import { EyeCloseIcon, EyeIcon } from '@ho-dev/icons';
import { Button, Checkbox, InputGroup } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

import { useState, type FormEvent, type ReactNode } from 'react';

type SocialProvider = {
  provider: 'google' | 'x';
  label: string;
  icon?: ReactNode;
};

type SignInFormProps = {
  onSubmit: (values: { email: string; password: string; remember: boolean }) => void;
  submitting?: boolean;
  error?: string;
  socialProviders?: SocialProvider[];
  forgotHref?: string;
  signupHref?: string;
  className?: string;
};

function SignInForm({
  onSubmit,
  submitting,
  error,
  socialProviders,
  forgotHref = '/forgot-password',
  signupHref = '/signup',
  className,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
      remember,
    });
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 text-[36px] leading-[44px] font-semibold text-gray-800 dark:text-white/90">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>
      </div>

      {socialProviders && socialProviders.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            {socialProviders.map((p) => (
              <button
                key={p.provider}
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-gray-100 px-7 py-3 text-sm font-normal text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>
          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white p-2 text-gray-400 sm:px-5 sm:py-2 dark:bg-gray-900">
                Or
              </span>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <InputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="info@gmail.com"
            required
          />
          <div className="relative">
            <InputGroup
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute top-[42px] right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeCloseIcon size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Keep me logged in"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <a
              href={forgotHref}
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
            >
              Forgot password?
            </a>
          </div>

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            size="sm"
            aria-disabled={submitting || undefined}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <a href={signupHref} className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
          Sign Up
        </a>
      </p>
    </div>
  );
}

SignInForm.displayName = 'SignInForm';

export { SignInForm, type SignInFormProps, type SocialProvider };
