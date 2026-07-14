# Frontend e2e / screenshot tests (Playwright)

Deterministic end-to-end tests that run the site off **mocked API responses**
(no backend required) and capture full-page **screenshots** for visual review.
Intended as a reusable pattern across the Northstar frontends.

## Layout

| File | Purpose |
|---|---|
| `../playwright.config.ts` | Config — boots the Vite dev server, targets Chromium. |
| `mocks.ts` | One place that fulfils every API call the app makes. Add a route here when the frontend starts calling a new endpoint. |
| `home.spec.ts` | Smoke asserts + screenshots for the home page (light + dark) and a project detail page. |
| `screenshots/` | Generated PNGs land here (git-ignored reports aside). |

## Run locally

```bash
cd frontend
npm install
npx playwright install chromium   # one-time: downloads the browser
npm run test:e2e                  # headless; starts the dev server for you
npm run test:e2e -- --ui          # interactive runner
```

Screenshots are written to `frontend/e2e/screenshots/`. After a run,
`npx playwright show-report` opens the HTML report.

## CI (recommended — this is how screenshots get reviewed per-PR)

The bot's sandbox has no browser libraries, so **it cannot render screenshots
itself** — CI (or a local run) produces them. Add this workflow so every PR
attaches the screenshots as a downloadable artifact:

```yaml
# .github/workflows/frontend-e2e.yml
name: frontend-e2e
on:
  pull_request:
    paths: ['frontend/**']
jobs:
  e2e:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: e2e-screenshots
          path: frontend/e2e/screenshots/
```

GitHub runners ship all the browser deps, so `--with-deps` just works there.
Download the `e2e-screenshots` artifact from the PR's checks to review.
