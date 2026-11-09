'use client';

import { useEffect } from 'react';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), ' +
    '[contenteditable="true"]';
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Traps focus inside `ref` while `active` is true.
 *
 * - moves focus to the first focusable element on activation;
 * - wraps Tab / Shift+Tab at the boundaries;
 * - pulls focus back if it escapes the container.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean, ref: { current: T | null }) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const initial = getFocusableElements(container);
    if (initial.length > 0) {
      initial[0].focus();
    } else {
      container.tabIndex = -1;
      container.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (container.contains(event.target as Node)) return;
      const focusableElements = getFocusableElements(container);
      (focusableElements[0] ?? container).focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [active, ref]);
}
