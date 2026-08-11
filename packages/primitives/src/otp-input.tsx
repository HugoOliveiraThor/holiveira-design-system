'use client';

import { cn } from '@ho-dev/utils';

import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

type OTPInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
};

const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  (
    { length = 6, value, defaultValue = '', onChange, onComplete, disabled, className, autoFocus },
    ref,
  ) => {
    const id = useId();
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string[]>(
      Array.from({ length }, (_, i) => (defaultValue ?? '')[i] ?? ''),
    );

    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const prevFull = useRef(false);

    const digits = isControlled
      ? Array.from({ length }, (_, i) => (value ?? '')[i] ?? '')
      : internal;

    function emit(next: string[]) {
      const code = next.join('');
      if (!isControlled) setInternal(next);
      onChange?.(code);
      if (next.every((d) => d !== '') && !prevFull.current) {
        prevFull.current = true;
        onComplete?.(code);
      } else if (next.some((d) => d === '')) {
        prevFull.current = false;
      }
    }

    function focusIndex(i: number) {
      inputs.current[Math.max(0, Math.min(length - 1, i))]?.focus();
    }

    function handleChange(i: number, raw: string) {
      const digit = raw.slice(-1).replace(/[^0-9]/g, '');
      const next = [...digits];
      next[i] = digit;
      emit(next);
      if (digit !== '') focusIndex(i + 1);
    }

    function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Backspace' && digits[i] === '') {
        e.preventDefault();
        focusIndex(i - 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusIndex(i - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusIndex(i + 1);
      }
    }

    function handlePaste(i: number, e: React.ClipboardEvent<HTMLInputElement>) {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData('text')
        .replace(/[^0-9]/g, '')
        .slice(0, length);
      if (pasted.length === 0) return;
      const next = [...digits];
      for (let j = 0; j < pasted.length; j++) {
        next[Math.min(i + j, length - 1)] = pasted[j];
      }
      emit(next);
      focusIndex(Math.min(i + pasted.length - 1, length - 1));
    }

    useEffect(() => {
      if (autoFocus) inputs.current[0]?.focus();
    }, [autoFocus]);

    useImperativeHandle(ref, () => inputs.current[0] as HTMLInputElement);

    return (
      <div
        id={id}
        role="group"
        aria-label="One-time code"
        className={cn('flex gap-2 sm:gap-4', className)}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={digits[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            maxLength={1}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={`Digit ${i + 1} of ${length}`}
            disabled={disabled}
            className={cn(
              'focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 shadow-theme-xs h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-center text-xl font-semibold text-gray-800 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30',
            )}
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';

export { OTPInput, type OTPInputProps };
