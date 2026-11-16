import { expect, test } from '@playwright/test';

test.describe('desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('sidebar is visible at desktop width', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('navigation', { name: 'Documentation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  });
});

test.describe('mobile drawer', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('sidebar is hidden below the breakpoint', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Documentation' })).toBeHidden();
  });

  test('drawer traps focus and locks scroll', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Documentation navigation' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    for (let index = 0; index < 6; index++) {
      await page.keyboard.press('Tab');
      const inside = await dialog.evaluate((node) => node.contains(document.activeElement));
      expect(inside).toBe(true);
    }

    // Shift+Tab from the first focusable wraps to the last inside the dialog.
    await dialog.locator('a[href], button:not([disabled])').first().focus();
    await page.keyboard.press('Shift+Tab');
    const wrappedBack = await dialog.evaluate((node) => node.contains(document.activeElement));
    expect(wrappedBack).toBe(true);

    // Tab from the last focusable wraps to the first.
    await dialog.locator('a[href], button:not([disabled])').last().focus();
    await page.keyboard.press('Tab');
    const wrappedForward = await dialog.evaluate((node) => node.contains(document.activeElement));
    expect(wrappedForward).toBe(true);
  });

  test('overlay closes the drawer and returns focus', async ({ page }) => {
    await page.goto('./');
    const trigger = page.getByRole('button', { name: 'Menu' });
    await trigger.click();
    await page.mouse.click(380, 20);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('escape closes the drawer and returns focus', async ({ page }) => {
    await page.goto('./');
    const trigger = page.getByRole('button', { name: 'Menu' });
    await trigger.click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('closes the drawer when the viewport grows', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('restores body scroll after closing the drawer', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Menu' }).click();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    await page.keyboard.press('Escape');
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });
});
