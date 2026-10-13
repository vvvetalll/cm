# Chicago Mounting ZIP Checker

WordPress plugin: ZIP service-area checker with CSV-managed coverage list, Elementor-compatible shortcodes and a popup.

| Path | What |
|---|---|
| `cm-zip-checker/` | Plugin source (current: v0.2.3). The first commit holds v0.1.0 exactly as received, so `git diff` shows every change. |
| `dist/cm-zip-checker-v0.2.3.zip` | Installable package (Plugins → Add New → Upload Plugin). Older packages kept for rollback. |
| `docs/RELEASE-v0.2.2.md` | v0.2.2: buttons match the site out of the box — changes, test results, limitations. |
| `docs/RELEASE-v0.2.1.md` | v0.2.1 styling release (theme classes, site stylesheet). |
| `docs/theme-patch/` | Optional theme CSS patch for `<button class="btn">` — **not applied**, not needed for the checker since v0.2.2. |
| `docs/REVIEW-REPORT.md` | Independent review: findings, fixes, test coverage, Elementor and quote-form notes, deployment plan. |
| `docs/test-results/` | Recorded test runs and screenshots. |
| `tests/` | Disposable local WordPress (SQLite) + Playwright E2E suites. See `tests/README.md`. |

Status: **ready for staging, not yet approved for production** — see the report's blockers.
