import { expect, type Page } from '@playwright/test';

/**
 * Press `/` until the search palette opens.
 *
 * The shortcut is a React handler, so the key only works after hydration. On a
 * slow runner the first press can land before the handler exists; retrying the
 * gesture keeps the keyboard contract without asserting a hydration race.
 */
export async function openSearch(page: Page): Promise<void> {
  await expect(async () => {
    if (await page.getByRole('combobox').isVisible()) return;
    await page.keyboard.press('/');
    await expect(page.getByRole('combobox')).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
  await expect(page.getByRole('combobox')).toBeFocused();
}
