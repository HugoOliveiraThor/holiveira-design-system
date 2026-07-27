import { expect } from 'vitest';

export interface FocusTrapConfig {
  active?: boolean;
  tabKey?: 'Tab' | 'Shift+Tab';
}

export async function expectFocusTrap(
  container: HTMLElement,
  config?: FocusTrapConfig,
): Promise<void> {
  const active = config?.active ?? true;
  if (!active) return;

  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"]):not([tabindex="-1"])',
  ].join(', ');

  const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (el) => el.offsetParent !== null,
  );

  if (focusable.length < 2) return;

  const isShiftTab = config?.tabKey === 'Shift+Tab';
  const from = isShiftTab ? 0 : focusable.length - 1;
  const expectedTarget = isShiftTab ? focusable[focusable.length - 1] : focusable[0];

  focusable[from].focus();

  const event = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey: isShiftTab,
    bubbles: true,
    cancelable: true,
  });

  container.dispatchEvent(event);

  await new Promise((resolve) => requestAnimationFrame(resolve));

  expect(document.activeElement).toBe(expectedTarget);
}
