'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useClickOutside } from '@holiveira/hooks';
import { cn } from '@holiveira/utils';
import type { SetStateActionType } from '@holiveira/types';

type DropdownContextType = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdownContext must be used within a Dropdown');
  }
  return context;
}

/** @public */
type DropdownProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: SetStateActionType<boolean>;
};

/**
 * Dropdown container with context-based state. Compound with
 * DropdownTrigger, DropdownContent, and DropdownClose sub-components.
 * Fully controlled — parent manages open state.
 * @public
 */
function Dropdown({ children, isOpen, setIsOpen }: DropdownProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    } else if (wasOpen.current) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  return (
    <DropdownContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      <div className="relative" onKeyDown={handleKeyDown}>
        {children}
      </div>
      {isOpen && <div className="fixed inset-0 z-40" onClick={handleClose} aria-hidden="true" />}
    </DropdownContext.Provider>
  );
}

Dropdown.displayName = 'Dropdown';

/** @public */
type DropdownContentProps = {
  align?: 'start' | 'end' | 'center';
  className?: string;
  children: ReactNode;
};

/**
 * Dropdown menu panel. Visible only when parent Dropdown is open.
 * Renders with `role="menu"` and click-outside dismiss via useClickOutside.
 * @public
 */
function DropdownContent({ children, align = 'center', className }: DropdownContentProps) {
  const { isOpen, handleClose } = useDropdownContext();
  const contentRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) handleClose();
  });

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      className={cn(
        'fade-in-0 zoom-in-95 pointer-events-auto absolute z-99 mt-2 min-w-32 origin-top-right rounded-lg',
        {
          'animate-in right-0': align === 'end',
          'left-0': align === 'start',
          'left-1/2 -translate-x-1/2': align === 'center',
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

DropdownContent.displayName = 'DropdownContent';

/** @public */
type DropdownTriggerProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button that toggles the dropdown open/closed.
 * Renders with aria-expanded and aria-haspopup attributes.
 * @public
 */
function DropdownTrigger({ children, className, ...props }: DropdownTriggerProps) {
  const { handleOpen, isOpen } = useDropdownContext();

  return (
    <button
      className={className}
      onClick={handleOpen}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      {children}
    </button>
  );
}

DropdownTrigger.displayName = 'DropdownTrigger';

/** @public */
type DropdownCloseProps = {
  children: ReactNode;
};

/**
 * Element that closes the dropdown on click.
 * @public
 */
function DropdownClose({ children }: DropdownCloseProps) {
  const { handleClose } = useDropdownContext();
  return <div onClick={handleClose}>{children}</div>;
}

DropdownClose.displayName = 'DropdownClose';

export { Dropdown, DropdownContent, DropdownTrigger, DropdownClose };
