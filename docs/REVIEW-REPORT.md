# Chicago Mounting ZIP Checker — independent review and test report

- Reviewed build: **v0.1.0** (as received, commit `27389a4`, `cm-zip-checker/` in this repo)
- Corrected build: **v0.2.0** — `dist/cm-zip-checker-v0.2.0.zip` (SHA-256 `23cf52d9…26dfe`, identical to `cm-zip-checker/`)
- Date: 2026-10-12

## 1. Summary and recommendation

| | Verdict |
|---|---|
| v0.1.0 | **Requires fixes.** No exploitable security hole found, but 1 High and 3 Medium functional defects, confirmed by reproduction. The High one (nonce + page cache) can make every ZIP check fail on a cached production site. |
| v0.2.0 | **Ready for staging.** All confirmed defects fixed and re-tested (136/136 E2E checks, 10/10 install/upgrade checks). |
| Production | **Not ready yet.** The live site, its Elementor setup, the real `/quote/` form, page cache and GTM could not be inspected (network access to chicagomounting.com was blocked from the test environment). Those checks must happen on staging first. |

Overall code quality of v0.1.0: a reasonable pilot. It uses the right WordPress primitives (capability checks, nonces on admin actions, escaping on output, sanitising on input, Options API, no direct SQL, delegated JS events, no jQuery, namespaced CSS). Weak points: very dense formatting (several statements per line, harder to review), a nonce on a public read-only endpoint (cache-hostile), a popup design that depended on a second shortcode, no i18n, and some error paths that leak raw technical messages to visitors.

## 2. What was and was not tested

**Environment actually used:** WordPress 7.1.3 (latest stable), SQLite Database Integration v3.1.0, PHP 8.3.6 (built-in server), default theme Twenty Twenty-Five, Chromium 1194 via Playwright, WP_DEBUG + E_ALL logging. Static tools: `php -l`, PHPCS 3.13 with WordPress security sniffs and PHPCompatibilityWP (PHP 7.4+), ESLint 9 (recommended, ES2020, browser), Elementor 4.0.8 **source code** (read, not run).

Tests executed (all passing on v0.2.0 — full log: `docs/test-results/e2e-v0.2.0.txt`):

| # | Area | Executed | Notes |
|---|---|---|---|
| 1 | Activation / deactivation | Yes | Via Plugins screen; data kept across deactivate/reactivate and across upgrade |
| 2 | ZIP database management | Yes | Save, update, delete, server-side validation (HTML5 bypassed), permissions (editor, logged-out), CSRF (no nonce → 403) |
| 3 | CSV import / export | Yes | Bundled sample, BOM, mixed-case headers, quotes/commas, blank lines, 6 invalid row types, wrong delimiter, 1 MB limit, 5,010 rows (limit reported), export content + formula guard, export→import round trip |
| 4 | Served / conditional / unknown results | Yes | Messages, CTA, local page link |
| 5 | Invalid ZIP validation | Yes | Client (no request sent) and server (400, array input) |
| 6 | All shortcode variants | Yes | full, compact, minimal, popup, invalid style fallback, attribute escaping |
| 7 | Multiple instances on one page | Yes | 6 shortcodes on one page, independent results, single asset/config output, no duplicate IDs, per-instance analytics |
| 8 | Popup open / close | Yes | Click, Escape, close button, backdrop, focus trap, focus return, lookup inside modal, trigger-only page, link fallback |
| 9 | Mobile responsiveness | Yes (Chromium emulation) | 320, 375, 768, 1366 px: no horizontal overflow, stacked form, 46 px tap targets, 16 px input font. Screenshots in `docs/test-results/` |
| 10 | JavaScript console errors | Yes | None on any tested page |
| 11 | WordPress debug errors | Yes | `debug.log` empty after the full run |
| 12 | Quote URL parameter passing | Yes, on a **mock** form | `?zip=&city=`, optional prefill, preservation of existing values, calculator events |
| — | Page cache / nonce behaviour | Simulated | Cached HTML replayed by a logged-in user; nonce life shortened to 4 s |
| — | Elementor element cache | Simulated from Elementor 4.0.8 source logic | Handles re-enqueued by name without running the shortcode |
| — | Install from ZIP, upgrade from v0.1.0 | Yes | Plugins → Upload → *Replace current with uploaded* |

**Not performed (still required):**
- Inspection of chicagomounting.com (`/find-near-me/`, `/quote/`, Elementor setup, theme CSS/JS, GTM/GA4): **blocked** — the test environment's network policy denied the host, and no other authorised access was available. Nothing on the live site was touched.
- Running Elementor / Elementor Pro (editor, Shortcode widget, Pro Popup). Only the Elementor source was analysed.
- Real page-cache plugins / CDN (WP Rocket, LiteSpeed, Cloudflare, host cache).
- Safari/iOS, Firefox, real phones; screen readers (only keyboard behaviour and ARIA attributes were checked).
- PHP 7.4–8.2 and 8.4 at runtime (static compatibility check only; PHP 8.4 behaviour confirmed from php-src), MySQL/MariaDB (the plugin uses only the Options API, so engine differences are unlikely), multisite.
- The real Chicago Mounting theme/Elementor kit styles over the checker (CSS conflicts).
- The real quote form, pricing calculator and booking flow.
- Load / abuse testing of the public lookup.

## 3. Confirmed defects (v0.1.0) — all fixed in v0.2.0

Evidence for every row: `docs/test-results/findings-v0.1.0.txt` (before) vs `findings-v0.2.0.txt` (after), produced by `tests/e2e/repro-findings.mjs`. Line numbers refer to v0.1.0.

| ID | Severity | Defect | Evidence (v0.1.0) | Fix (v0.2.0) |
|---|---|---|---|---|
| H1 | **High** | The public lookup requires a nonce printed into the page (`cm-zip-checker.php:154,180`). Cached pages keep that nonce: after the nonce lifetime (12–24 h) every check returns 403 "Security token expired. Refresh the page." — and refreshing returns the same cached page. Logged-in users who get a cached logged-out page fail immediately (nonce is user-bound). | Reproduced: logged-in replay → `HTTP 403`; nonce life 4 s, retry after 6 s → `HTTP 403`. | Lookup no longer uses a nonce. It is read-only and returns no private data, so there is no CSRF risk; a logged-out nonce is identical for every visitor and gave no anti-abuse value either. |
| M1 | Medium | A landing-page URL on any host other than `home_url()` makes the **whole row** invalid (`:43-53`). The bundled `sample-zips.csv` (production URLs) imports **0 of 3** rows on staging or any other host; `www.` vs non-`www` also fails. | `Imported/updated 0 ZIP records; skipped 3 rows.` | Landing pages are stored as site-relative paths; absolute URLs on the site host (± `www.`) are converted; extra hosts via `cm_zip_checker_allowed_hosts`. Sample CSV uses paths. Import message explains why rows are skipped. Legacy absolute values still work (tested after upgrade). |
| M2 | Medium | `[cm_zip_checker style="popup"]` is rendered **visibly in the page** until the first click, then jumps into the modal (layout shift, duplicate checker). No CSS hides it. | `popup variant visible inline before opening: true` | Hidden in page flow; shown only inside the modal. |
| M3 | Medium | `[cm_zip_popup_button]` does nothing unless a popup-variant shortcode is also on the same page — e.g. a header button on every page is dead on most pages. The click handler also calls `preventDefault()` even when the modal cannot open, so a link trigger cannot fall back to navigating. | `trigger-only page: modal exists after click: 0` | The button prints a hidden popup checker in the footer when the page has none (an explicit one, if present, wins). `preventDefault()` only when the modal opened. |
| L1 | Low | Assets are registered only inside the shortcode callback. Elementor's element cache (Shortcode widget with *Cache Settings: Active*) re-enqueues handles **by name** on a cache hit (`elementor/core/base/document.php`), so nothing loads: the form then does a native GET submit. Default Elementor setting renders Shortcode widgets live, so only affects that explicit setting. | Cache-hit simulation: `script+config loaded: false` | Script/style/config registered on `wp_enqueue_scripts` (and on demand); also enqueued in the Elementor editor preview. |
| L2 | Low | Non-JSON or network failures show raw JS errors to visitors, e.g. `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` (WAF/CDN challenge, PHP notice output). No request timeout. | Reproduced with an HTML 403 reply. | Friendly message for all non-validation errors; 15 s timeout. |
| L3 | Low | If the ZIP is edited while a request is running, "Checking service area…" stays forever. | Reproduced. | Message cleared. |
| L4 | Low | `cm_zip_quote_click` reports the status of the **last check on the page**, not of the clicked checker (wrong analytics with several instances). | Served checker reported `unlisted`. | Status stored per instance. |
| L5 | Low | `cm_zip_selection` is pushed to the dataLayer on every check (undocumented; 3 events per check). | Seen in dataLayer. | Kept as document event only. |
| L6 | Low (security hygiene) | Admin notice prints any text from `?cm_msg=` (`:66`). Escaped, so no XSS, but a crafted link can show a fake message in WP Admin (phishing aid). | Arbitrary text displayed. | Notices are looked up from fixed codes. |
| L7 | Low | CSV export prefixes formula-like values with `'` (good), but import keeps it: export → import changes `-call first` into `'-call first`. | Reproduced. | Import strips the guard prefix; round trip verified. |
| L8 | Low | `fgetcsv()`/`fputcsv()` without `$escape` emit `E_DEPRECATED` on PHP 8.4 (verified in php-src `ext/standard/file.c`). With `display_errors` on, the warning text would be written into the exported CSV. | Static (PHP 8.4 not available to run). | Explicit RFC 4180 parameters. |
| L9 | Low | Import silently stops at 5,000 rows; blank lines counted as "skipped". | Reproduced. | Limit reported; blank lines ignored. |
| L10 | Low | `wp_localize_script` runs once per shortcode → config printed N times (6× on the test page). | Reproduced. | Printed once. |
| L11 | Low | Served ZIP with empty city shows "Explore TV installation in ". | Code path. | Falls back to "your area". |

No Critical defects. No SQL injection, stored/reflected XSS, CSRF or privilege-escalation issue found: output is escaped (PHPCS escaping sniffs clean; HTML in shortcode attributes and CSV city tested), admin actions require `manage_options` + nonce (editor and logged-out requests → 403/400, CSRF POST → 403), uploads are checked with `is_uploaded_file()` and a size limit, and the public lookup never returns the private note. The remaining PHPCS "nonce" errors are false positives: verification happens in `admin_guard()`, which the sniff cannot follow.

## 4. Other observations (not changed)

| Severity | Observation | Recommendation |
|---|---|---|
| Low | Brand green `#63b600` with white 15 px bold text: contrast 2.55:1 (WCAG AA needs 4.5:1; `#4c8f00` = 4.01:1, `#3d7a00` = 5.27:1). | Brand decision; consider `#3d7a00` for button background. |
| Low | Modal does not lock background scroll. | Optional. |
| Low (risk, unverified) | If the Elementor kit defines global button/field styles (`.elementor-kit-N button`, specificity 0-1-1 / 0-3-1), they override the checker's `.cm-zip__button` / `.cm-zip__input` (0-1-0). Can only be judged on the real site. | Visual check on staging. |
| Low | Admin list renders every record with its own form: 5,000 records ≈ 2.8 MB HTML, ~2 s locally. Fine for the expected few hundred ZIPs. | Pagination only if the list grows into thousands. |
| Low | No rate limiting on the public lookup (each call boots WordPress via admin-ajax). | Add server/WAF rate limit for `admin-ajax.php?action=cm_zip_lookup` if abused. |
| Info | Texts are English only; Text Domain declared but unused. | Fine for a single-language site. |
| Info | No uninstall cleanup — coverage data survives plugin deletion. | Intentional: protects data during manual reinstall. |
| Info | Deactivating the plugin leaves `[cm_zip_checker …]` visible as text where it was placed (WordPress behaviour). | Part of the rollback plan below. |
| Info | GA4 will record `zip`/`city` in `page_location` of `/quote/` because they are in the URL (dataLayer events themselves contain no ZIP). ZIP/city are not PII by Google's definition, but decide whether you want them in GA4. | If not, keep only the `sessionStorage` hand-off (drop the URL parameters). |

## 5. Elementor compatibility assessment

Confidence: **Medium** (source analysis + simulation; Elementor was not run).

- **Shortcode widget / Text Editor:** compatible. In Elementor 4.0.8 `Element_Base::is_dynamic_content()` defaults to `true` and the Shortcode widget does not override it, so with Element Caching on, the widget is still rendered live (placeholder `[elementor-element]`), which runs the shortcode and enqueues assets. If someone sets the widget's *Cache Settings* to *Active*, v0.2.0 still works (handle-based re-enqueue tested); v0.1.0 did not.
- **Multiple widgets per page:** supported (no IDs, delegated events, single config).
- **Elementor Pro Popup:** put `[cm_zip_checker style="compact"]` (or `full`) inside the popup. Do **not** use `style="popup"` there. Forms rendered later in popups work because events are delegated.
- **Header/footer templates:** `[cm_zip_popup_button]` works alone in v0.2.0. An Elementor Button can open the modal with the attribute `data-cm-zip-open` (Advanced → Attributes, Pro) on pages that load the checker; for a sitewide header button enable `cm_zip_checker_always_enqueue` (adds about 10 KB JS + 2.5 KB CSS, ≈5 KB gzipped, to every page). On other pages the button keeps working as a normal link.
- **Editor preview:** assets are enqueued in the preview, so newly added widgets are styled and functional without reload (not run-tested).
- **Theme conflicts:** CSS is namespaced (`.cm-zip*`), JS uses globals `CMZipChecker` / `CMZipCheckerConfig` only, no jQuery dependency. Kit global styles may restyle buttons/inputs (see §4).

## 6. Quote integration findings

**Blocker:** the real `/quote/` form and pricing calculator could not be inspected, so the integration cannot be finalised. What was built and tested is safe by default and configurable once the real fields are known.

What v0.2.0 does:
1. The result CTA links to `/quote/?zip=60601&city=Chicago` (city only when known). The last result is also saved in `sessionStorage`, so a visitor who checks a ZIP on any page and then opens `/quote/` from the menu can still be prefilled.
2. **Optional prefill — off by default.** Enabled only with `cm_zip_checker_quote_prefill` (see plugin README). When on, only the small JS file loads on `/quote/` (no CSS), and it:
   - fills **empty** fields only; never overwrites autofill or a visitor's typing (tested, including edits made before `window.load`);
   - does **not** fire `input`/`change` events unless `events: true`, so the calculator is not triggered unexpectedly; with `events: true` it fires exactly one of each per field (tested);
   - ignores invalid ZIP parameters, strips markup from `city`, and fails silently on a bad selector.

How to finish it (on staging):
1. In DevTools, inspect the ZIP and city fields on `/quote/`: note the form plugin and each field's `id`/`name`.
2. Prefer the form's **native** prefill if it exists — it is the most robust:
   - Elementor Pro Form: field *Default Value* → Dynamic Tags → *Request Parameter* (GET, `zip`). (Feature name from memory — Medium confidence; verify in the editor.)
   - Gravity Forms: *Allow field to be populated dynamically* with parameter `zip`. WPForms: default value `{query_var key="zip"}`. Fluent Forms: `{get.zip}`.
   Native prefill covers the URL case only; add the plugin prefill if you also want the `sessionStorage` case.
3. Otherwise set the plugin filter with the real selectors (snippet in the plugin README). Decide `events` based on whether the calculator should react to ZIP.
4. If the calculator is a React/Vue app or the form is in an iframe, direct value setting may not register — test, and report back for an adapter.
5. Test: direct link with parameters, menu navigation after a check, manual edit preserved, calculator totals unchanged/updated as intended, form submission contains the ZIP, booking flow unchanged, GTM preview.

## 7. Deployment plan

1. **Static review + local tests** — done (this report).
2. **Staging (preferred).** Use the host's one-click staging (or WP Staging / Duplicator) on a password-protected, `noindex` copy. **Disable outgoing email / form notifications and booking integrations on staging** so test submissions do not reach customers or staff. Install `dist/cm-zip-checker-v0.2.0.zip`, import the verified coverage CSV (only verified ZIPs as `served`), then run the checklist in §2 against the real theme, Elementor, cache and form.
3. **Test page on staging** with every variant, two instances, and the popup button; check console, Network → `admin-ajax.php`, mobile, keyboard.
4. **Elementor popup test** (Pro popup with `style="compact"`; header button with the plugin modal).
5. **Quote integration** per §6, then GTM preview mode to map `cm_zip_*` events to GA4.
6. **Production after approval:** full backup → upload ZIP → activate → import CSV → place shortcodes/widgets → purge page cache/CDN → verify as a logged-out visitor and as an admin → re-check after more than 24 h (proves the cached-page issue is gone) → monitor `debug.log` / console.

If no staging is available, the lowest-risk alternative: full backup; activate in a low-traffic window (WordPress aborts activation on a fatal error); the plugin adds no front-end output or assets to pages without its shortcodes; build a **private (password-protected) test page**, exclude it from page cache, test there; only then add widgets to public pages. Rollback: remove/replace the widgets first, then deactivate (otherwise the raw shortcode text shows), or rename `wp-content/plugins/cm-zip-checker` via SFTP if wp-admin is unavailable.

## 8. Remaining blockers before production

1. Access to inspect the live/staging site (theme, Elementor kit, page cache/CDN, GTM) — blocked in this environment.
2. Verified service-area data (no real served list was supplied; the sample is conditional-only).
3. Real `/quote/` form selectors and calculator behaviour.
4. Elementor / Elementor Pro runtime test and a visual check on the real theme.
5. Cross-browser check (Safari iOS at minimum) and PHP version of the production server (7.4+ required; 8.4 now handled).
6. Your approval for staging and, later, production deployment.

## 9. Files

- `cm-zip-checker/` — plugin source (v0.2.0); history shows the exact diff from v0.1.0.
- `dist/cm-zip-checker-v0.2.0.zip` — installable package.
- `tests/` — reproducible local WordPress + E2E suites (see `tests/README.md`).
- `docs/test-results/` — recorded runs and screenshots.
