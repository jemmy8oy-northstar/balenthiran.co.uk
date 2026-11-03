import { test, expect } from '@playwright/test';
import { mockApi } from './mocks';

test.use({ viewport: { width: 390, height: 844 } });

test('kitstudio splash registers interest in Kit', async ({ page }) => {
  await mockApi(page);

  // Registered after mockApi so it takes precedence over the generic interest mock.
  const posted: { url: string; body: unknown }[] = [];
  await page.route('**/api/interest/register/kit', async (route) => {
    posted.push({ url: route.request().url(), body: route.request().postDataJSON() });
    await route.fulfill({ status: 200, json: { message: 'Registered' } });
  });

  await page.goto('/kitstudio');

  await expect(page.getByRole('heading', { name: 'Kit', level: 1 })).toBeVisible();
  await expect(
    page.getByText('Describe the app. Kit specs it, builds it and ships it.'),
  ).toBeVisible();

  const email = page.getByPlaceholder('Enter your email');
  await expect(email).toBeVisible();

  await email.fill('visitor@example.com');
  await page.getByRole('button', { name: 'Get Updates' }).click();

  await expect(page.getByText("Thanks! You'll be notified about Kit updates.")).toBeVisible();
  expect(posted).toHaveLength(1);
  expect(new URL(posted[0].url).pathname).toBe('/api/interest/register/kit');
  expect(posted[0].body).toMatchObject({ email: 'visitor@example.com' });
});
