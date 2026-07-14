import { test, expect } from '@playwright/test';
import { mockApi } from './mocks';

/**
 * Smoke + screenshot coverage for the public site, driven entirely off mocked
 * API responses. Each test asserts the key content is present, then captures a
 * full-page screenshot into e2e/screenshots/ for visual review.
 */

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

test('home page renders hero and project grid', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'James Balenthiran', level: 1 }),
  ).toBeVisible();

  // Proves the mocked GET /api/projects rendered into the grid.
  await expect(page.getByText('Germy', { exact: false }).first()).toBeVisible();

  await page.screenshot({
    path: 'e2e/screenshots/home-light.png',
    fullPage: true,
  });
});

test('home page renders in dark mode', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'James Balenthiran', level: 1 }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Toggle Theme' }).click();

  await page.screenshot({
    path: 'e2e/screenshots/home-dark.png',
    fullPage: true,
  });
});

test('project detail page renders', async ({ page }) => {
  await page.goto('/projects/germy');

  // Detail pages are static content; assert the page mounted without error.
  await expect(page.locator('main')).toBeVisible();

  await page.screenshot({
    path: 'e2e/screenshots/project-germy.png',
    fullPage: true,
  });
});
