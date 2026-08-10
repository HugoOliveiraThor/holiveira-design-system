'use client';

import { useFocusRestore, useFocusTrap } from '@ho-dev/hooks';
import { CloseIcon } from '@ho-dev/icons';
import type { SetStateActionType } from '@ho-dev/types';
import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, useRef, useEffect, type ReactNode } from 'react';

const modalVariants = cva('relative w-full rounded-3xl bg-white p-6 lg:p-10 dark:bg-gray-900', {
  variants: {
    size: {
      sm: 'max-w-[400px]',
      md: 'max-w-[600px]',
      lg: 'max-w-[800px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/** @public */
type ModalProps = {
  isOpen: boolean;
  setIsOpen: SetStateActionType<boolean>;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  fullScreen?: boolean;
  label?: string;
};

/**
 * Controlled modal overlay + panel. Closes on backdrop click, click-outside,
 * Escape, or ModalCloseButton. Focus-trapped while open; restores on close.
 * @public
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      setIsOpen,
      children,
      size = 'md',
      centered = true,
      fullScreen = false,
      label = 'Modal',
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const wasOpen = useRef(isOpen);
    const { save, restore } = useFocusRestore();

    useFocusTrap(isOpen, panelRef);

    useEffect(() => {
      if (isOpen) {
        save();
      } else if (wasOpen.current) {
        restore();
      }
      wasOpen.current = isOpen;
    }, [isOpen, save, restore]);

    useEffect(() => {
      if (!isOpen) return;
      function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') setIsOpen(false);
      }
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    if (fullScreen) {
      return (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-99999 flex h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-white p-6 lg:p-10 dark:bg-gray-900"
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto p-5"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
          aria-hidden="true"
        />
        <div
          ref={(node) => {
            panelRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            modalVariants({ size }),
            !centered && 'my-auto flex flex-col justify-center',
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

/** @public */
type ModalCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Absolute close (X) button for a Modal.
 * @public
 */
const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close modal"
      className={cn(
        'absolute top-3 right-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:top-6 sm:right-6 sm:h-11 sm:w-11 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        className,
      )}
      {...props}
    >
      <CloseIcon size={24} />
    </button>
  ),
);

ModalCloseButton.displayName = 'ModalCloseButton';

export { Modal, ModalCloseButton, modalVariants, type ModalProps, type ModalCloseButtonProps };
