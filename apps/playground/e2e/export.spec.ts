import { expect, test } from '@playwright/test';

const ROUTES = [
  { path: './', heading: 'Dashboard' },
  { path: 'forms/', heading: 'Forms' },
  { path: 'orders/', heading: 'Orders' },
  { path: 'login/', heading: 'Login' },
  { path: 'settings/', heading: 'Settings' },
];

test('serves every route directly from the static export', async ({ page }) => {
  const failedResponses: string[] = [];

  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  for (const route of ROUTES) {
    const response = await page.goto(route.path);
    expect(response?.status(), route.path).toBe(200);
    await expect(
      page.getByRole('heading', { level: 2, name: route.heading }).first(),
      route.path,
    ).toBeVisible();
  }

  await page.goto('./');
  await expect(page.locator('.apexcharts-svg')).toHaveCount(2);
  await expect(page.locator('.apexcharts-svg').first()).toBeVisible();

  expect(failedResponses, failedResponses.join('\n')).toEqual([]);
});
