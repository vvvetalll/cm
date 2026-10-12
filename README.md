# Chicago Mounting ZIP Checker

WordPress plugin: ZIP service-area checker with CSV-managed coverage list, Elementor-compatible shortcodes and a popup.

| Path | What |
|---|---|
| `cm-zip-checker/` | Plugin source (current: v0.2.1). The first commit holds v0.1.0 exactly as received, so `git diff` shows every change. |
| `dist/cm-zip-checker-v0.2.1.zip` | Installable package (Plugins → Add New → Upload Plugin). Older packages kept for rollback. |
| `docs/RELEASE-v0.2.1.md` | v0.2.1 styling release: changes, shortcode examples, test results, limitations. |
| `docs/theme-patch/` | Proposed theme CSS patch (`button.btn`) — **not applied**, awaiting approval. |
| `docs/REVIEW-REPORT.md` | Independent review: findings, fixes, test coverage, Elementor and quote-form notes, deployment plan. |
| `docs/test-results/` | Recorded test runs and screenshots. |
| `tests/` | Disposable local WordPress (SQLite) + Playwright E2E suites. See `tests/README.md`. |

Status: **ready for staging, not yet approved for production** — see the report's blockers.
