# Local test environment and E2E tests

Disposable WordPress for testing the plugin without MySQL, Docker or the live site:
WordPress core + the official SQLite Database Integration drop-in, served by PHP's built-in server,
driven by Playwright (Chromium).

Requirements: PHP 7.4+ with `pdo_sqlite` and `zip`, git, Node 18+, a Chromium binary.

```bash
# 1. Build the site (clones WordPress 7.1.3 + SQLite integration v3.1.0 into WORK, installs, creates test pages)
tests/env/bootstrap.sh /tmp/cmzip-work            # optional 2nd arg: plugin dir (default ./cm-zip-checker)

# 2. Serve it. Use several workers: browsers keep idle keep-alive sockets that block a single-worker server.
cd /tmp/cmzip-work/site && PHP_CLI_SERVER_WORKERS=32 php -S 127.0.0.1:8899 -t . /path/to/repo/tests/env/router.php

# 3. Run the tests (from tests/)
npm install
SITE_DIR=/tmp/cmzip-work/site OUT_DIR=/tmp/cmzip-out CHROMIUM_PATH=/path/to/chrome node e2e/plugin.test.mjs
SITE_DIR=/tmp/cmzip-work/site node e2e/upgrade.test.mjs <cm-zip-checker-v0.1.0.zip> ../dist/cm-zip-checker-v0.2.0.zip
SITE_DIR=/tmp/cmzip-work/site node e2e/repro-findings.mjs     # prints the behaviour behind each review finding
```

Login: `admin` / `admin-pass-123` (editor: `editor` / `editor-pass-123`). Local only — never reuse.

| File | Purpose |
|---|---|
| `env/bootstrap.sh` | Builds the site |
| `env/wp-config.php` | WP_DEBUG + debug.log, SQLite, fixed local URL |
| `env/cm-test-env.php` | **Test-only** mu-plugin: disables update checks (no network), flag files for scenarios (short nonce life, quote prefill config, allowed hosts), Elementor cache-hit simulation |
| `env/setup-content.php` | Test pages: all shortcode variants, popup cases, mock `/quote/` form with a mock calculator, Elementor cache page |
| `e2e/plugin.test.mjs` | Full suite (activation, admin CRUD, permissions/CSRF, CSV, results, validation, multiple instances, popup, mobile, console, debug.log, quote URL/prefill, caching) |
| `e2e/upgrade.test.mjs` | Install via *Upload Plugin*, upgrade from v0.1.0 with *Replace current with uploaded* |
| `e2e/repro-findings.mjs` | Before/after evidence for the review findings |
| `fixtures/*.csv` | Sample, edge-case and bad-header CSV files |

Outputs (results, screenshots, export, debug.log copy) go to `OUT_DIR`. The results recorded for this review are in `docs/test-results/`.

The mock `/quote/` page is **not** the real Chicago Mounting form; quote integration must still be verified against the real form on staging.
