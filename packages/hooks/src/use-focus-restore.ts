import { useCallback, useRef } from 'react';

export function useFocusRestore() {
  const previousRef = useRef<HTMLElement | null>(null);

  const save = useCallback(() => {
    previousRef.current = document.activeElement as HTMLElement;
  }, []);

  const restore = useCallback(() => {
    requestAnimationFrame(() => {
      previousRef.current?.focus();
    });
  }, []);

  return { save, restore };
}
