import { vi } from "vitest";

export function waitForAnimation(ms: number = 300): void {
  vi.advanceTimersByTime(ms);
}
