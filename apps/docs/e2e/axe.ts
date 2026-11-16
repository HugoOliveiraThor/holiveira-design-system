import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

/**
 * The axe violations of the settled page.
 *
 * The theme toggle and the component previews transition their colours, and axe
 * samples computed styles in between frames; the transition CSS is disabled
 * before the analysis so only the settled state is judged.
 */
export async function axeViolations(page: Page) {
  await page.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
  });
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations;
}
