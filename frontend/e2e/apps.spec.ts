import { test, expect } from '@playwright/test';
import { mockApi } from './mocks';
import { readFileSync } from 'node:fs';

// Read rather than imported: Playwright's ESM loader rejects a bare JSON import.
const appsData: { apps: { id: string; path: string }[] } = JSON.parse(
  readFileSync('src/data/apps.json', 'utf8'),
);

/**
 * The /apps page is static (src/data/apps.json), so these only need the shared
 * API mocks to keep the rest of the shell quiet.
 */

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

test('apps page lists every live app', async ({ page }) => {
  await page.goto('/apps');

  await expect(page.getByRole('heading', { name: 'Apps', level: 1 })).toBeVisible();

  const cards = page.getByTestId('app-list').getByTestId('app-card');
  await expect(cards).toHaveCount(6);

  for (const [i, app] of appsData.apps.entries()) {
    await expect(cards.nth(i).getByRole('link', { name: 'Open' })).toHaveAttribute('href', app.path);
  }

  await page.screenshot({
    path: 'e2e/screenshots/apps-light.png',
    fullPage: true,
    animations: 'disabled',
  });
});

test('apps page is reachable from the navbar', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('navigation').getByRole('link', { name: 'Apps' }).click();

  await expect(page).toHaveURL(/\/apps$/);
  await expect(page.getByRole('heading', { name: 'Apps', level: 1 })).toBeVisible();
});
