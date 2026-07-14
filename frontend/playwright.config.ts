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
 * Note: the CI job (see README "Frontend e2e / screenshots") uploads the
 * e2e/screenshots/ folder as a build artifact so screenshots are viewable per-PR.
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
