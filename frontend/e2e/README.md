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
| `screenshots/` | Generated PNGs land here. **Gitignored** — see below. |

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

## The screenshots are not committed, and they assert nothing

`page.screenshot()` is a plain **write**, not a comparison. There is no
`toHaveScreenshot` here, so **no screenshot can ever fail a build** — they exist
to be looked at. They were committed until snip-it#15, where James asked for
them out: *"get rid of the committed pngs I think it wastes git storage."* They
were 2.3 MB at HEAD here, the largest of the three repos, and nothing referenced
them except the spec that writes them.

`frontend/e2e/screenshots/` is now gitignored. Run the suite locally and they
appear; they just never enter git.

## Reviewing them on a PR

`ci.yml`'s `e2e` job uploads `playwright-report/` and only `if: failure()`, so a
green run publishes nothing to look at. To get the screenshots per-PR, add this
step to that job:

```yaml
      - name: Upload e2e screenshots
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: e2e-screenshots
          path: frontend/e2e/screenshots/
          retention-days: 7
```

<!-- Corrections, 2026-08-15: this section previously described a
     frontend-e2e.yml workflow that was never added — ci.yml has the e2e job —
     and claimed the bot's sandbox has no browser libraries. Playwright has run
     in-pod since 2026-08-09. Check before repeating either claim. -->

