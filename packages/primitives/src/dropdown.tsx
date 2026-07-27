'use client';

import { useClickOutside, useFocusTrap, useFocusRestore } from '@holiveira/hooks';
import type { SetStateActionType } from '@holiveira/types';
import { cn } from '@holiveira/utils';

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from 'react';

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
  const wasOpen = useRef(isOpen);
  const { save, restore } = useFocusRestore();

  useEffect(() => {
    if (isOpen) {
      save();
    } else if (wasOpen.current) {
      restore();
    }
    wasOpen.current = isOpen;
  }, [isOpen, save, restore]);

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
  useFocusTrap(isOpen, contentRef);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;

      e.preventDefault();
      const container = contentRef.current;
      if (!container) return;

      const items = container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      );

      if (items.length === 0) return;

      const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
      let nextIndex: number;

      switch (e.key) {
        case 'ArrowDown':
          nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
          break;
        case 'ArrowUp':
          nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }

      items[nextIndex]?.focus();
    },
    [contentRef],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
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
