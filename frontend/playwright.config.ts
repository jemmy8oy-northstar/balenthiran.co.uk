import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright e2e config for balenthiran.co.uk's frontend.
 *
 * These tests run the app entirely off mocked API responses (see e2e/mocks.ts),
 * so they need no backend and are deterministic. Each spec also captures full-page
 * screenshots into e2e/screenshots/ for visual review.
 *
 * Run:  npm run test:e2e            (headless, starts the dev server for you)
 *       npm run test:e2e -- --ui    (interactive)
 *
 * e2e/screenshots/ is GITIGNORED and asserts nothing — page.screenshot() is a
 * plain write, not a comparison, so these files can never fail a build.
 *
 * ⚠️ This comment used to claim the CI job uploads e2e/screenshots/ as a
 * per-PR artifact. It does not — ci.yml uploads playwright-report/ and only
 * `if: failure()`. See frontend/e2e/README.md for the step to add.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
