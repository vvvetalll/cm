# Chicago Mounting ZIP Checker — v0.2.0 (pilot)

This is a **pilot build for staging/testing**, not a production-certified plugin. v0.2.0 fixes the defects found in the
independent review of v0.1.0 (see `docs/REVIEW-REPORT.md` in the repository and the changelog below).

## Installation and safe testing

1. Back up the WordPress database and site files.
2. Prefer a password-protected staging clone. Alternatively use a private, noindex test page on the live installation (this still runs plugin code sitewide, so staging is safer).
3. Plugins → Add New → Upload Plugin → select the ZIP → Install → Activate. (Upgrading from v0.1.0: choose **Replace current with uploaded**; saved ZIP records are kept.)
4. WP Admin → **CM ZIP Checker** → import `sample-zips.csv` from this package. All sample coverage statuses are **conditional**; examples are not verified as served.
5. Create a test page with `[cm_zip_checker style="full" location="test"]` and `[cm_zip_checker style="compact" location="test"]`.
6. Try valid, invalid and unlisted ZIPs. Confirm forms show conditional/unlisted rather than falsely declaring service.
7. Popup: add `[cm_zip_popup_button label="Check ZIP"]`. It works on its own; add `[cm_zip_checker style="popup" location="popup_test" heading="…"]` only if you want to customise the popup's heading/location.
8. Inspect browser Console and Network → `admin-ajax.php` for failures. Check mobile and keyboard navigation.
9. Quote page: the result button links to `/quote/?zip=60025&city=Glenview`. The quote form is **not** changed unless you enable the optional prefill (below) after checking the real form's field selectors.
10. Only after successful staging testing and code review, approve deploying to the live website.

## Shortcodes
- `[cm_zip_checker style="full" location="find_near_me"]`
- `[cm_zip_checker style="compact" location="homepage"]`
- `[cm_zip_checker style="minimal" location="footer"]`
- `[cm_zip_popup_button label="Check Your ZIP" location="header"]` — opens the plugin's modal. If the page has no `style="popup"` checker, a hidden one is printed in the footer automatically.
- `[cm_zip_checker style="popup" heading="Do We Serve Your Area?"]` — optional; only the source for the modal, hidden in page flow.

Any element (e.g. an Elementor Button with a link to `/find-near-me/`) can open the modal by adding the attribute `data-cm-zip-open`, on pages that load the checker (a checker shortcode on the page, or sitewide via `cm_zip_checker_always_enqueue`). Elsewhere, or if the modal cannot open, the link simply navigates.

`location` is a free label (lowercase letters, numbers, `_`, `-`) sent to analytics so you can compare placements.

## Elementor
- Use the **Shortcode** widget (or Text Editor). Multiple checkers on one page are supported.
- **Inside an Elementor Pro Popup** use `style="compact"` or `style="full"`, not `style="popup"` (that variant is hidden outside the plugin's own modal).
- Element Caching: the Shortcode widget is rendered live by default; if you set its *Cache Settings* to *Active*, Elementor re-enqueues the plugin's script/style by handle, which v0.2.0 supports.
- The plugin's assets are also loaded in the Elementor editor preview.

## Admin and coverage model
CSV columns: `zip,city,state,status,landing_page,note`. Status must be `served` or `conditional`. Absent ZIP returns `unlisted`. A quoted ZIP is **not** confirmation of a scheduled appointment.

Landing pages are stored as site-relative paths (`/tv-installation-in-glenview/`), so the same CSV works on staging and production. Absolute URLs are accepted for this site's host (with or without `www.`) and converted to paths; other hosts make the row invalid. To import production URLs on a staging host, allow the production host temporarily:

```php
add_filter( 'cm_zip_checker_allowed_hosts', function ( $hosts ) { $hosts[] = 'chicagomounting.com'; return $hosts; } );
```

The note column is private (admin only); it is never sent to visitors. CSV export neutralises spreadsheet formulas by prefixing `'`; re-importing the export removes that prefix again.

## Quote page integration (optional, off by default)
The CTA passes `zip` (and `city` when known) in the URL; the last result is also kept in `sessionStorage` for visitors who reach `/quote/` through the menu. To fill the quote form, add a snippet with the real field selectors (check them on the live form first):

```php
add_filter( 'cm_zip_checker_quote_prefill', function () {
	return [
		'zip'    => '#form-field-zip',   // required: CSS selector of the ZIP input
		'city'   => '#form-field-city',  // optional
		'events' => false,               // true = fire input/change so a calculator recalculates
	];
} );
```

Behaviour: runs only on the quote page (`/quote/`, filter `cm_zip_checker_quote_url` to change), loads only the small JS file there, fills **empty** fields only, never overwrites what the visitor or autofill entered, and does not fire events unless `events` is true. If the form is rendered by React/Vue or inside an iframe, setting the value directly may not be enough — test on staging.

## JavaScript API
`CMZipChecker.open()`, `CMZipChecker.check('60025')` (Promise returning lookup data), `CMZipChecker.getSelection()`, `CMZipChecker.clear()`.

Document event: `cmzip:selection` contains the selected ZIP for first-party site logic; GTM `dataLayer` events omit ZIP codes and cities. GTM events: `cm_zip_check`, `cm_zip_check_served`, `cm_zip_check_conditional`, `cm_zip_check_unlisted`, `cm_zip_quote_click`, `cm_zip_popup_open` (parameters `component_variant`, `component_location`, `coverage_status`). No direct GA4/gtag calls. Note: the quote URL contains `zip`/`city`, so GA4 `page_location` for `/quote/` will include them.

## Filters
| Filter | Default | Purpose |
|---|---|---|
| `cm_zip_checker_quote_url` | `home_url('/quote/')` | CTA target and quote-page detection |
| `cm_zip_checker_quote_prefill` | `[]` (off) | Quote-form selectors, see above |
| `cm_zip_checker_allowed_hosts` | site host | Extra hosts accepted for landing-page URLs |
| `cm_zip_checker_always_enqueue` | `false` | Load CSS/JS and a hidden popup checker on every front-end page, so `data-cm-zip-open` buttons and `CMZipChecker.open()` work sitewide |

## Known limitations / scope
- Uses a WordPress option for records (fine for a few thousand ZIPs; ~5,000 records tested). No bulk delete, search/filter or audit history. Import adds/updates, it does not remove ZIPs missing from the file.
- No rate limiting on the public lookup (it is read-only and returns only status, city, state and landing page).
- Public lookup has no nonce on purpose (it broke on page-cached pages in v0.1.0); nothing is written, so there is no CSRF risk.
- The plugin modal does not lock page scroll while open.
- Brand green `#63b600` with white text has a contrast ratio of about 2.5:1 (below WCAG AA). `#4c8f00` (the hover colour) is about 4.0:1; a darker green is needed for 4.5:1.
- Texts are English only (not translatable yet).
- Event mappings for GA4/GTM need review before publishing tags.
- Requires PHP 7.4+ (static compatibility check 7.4–8.4; runtime tested on PHP 8.3 / WordPress 7.1.3 only).

## Changelog
### 0.2.0
- Fixed: lookups failed with 403 "Security token expired" on page-cached pages (expired nonce in cached HTML, and for logged-in visitors). The read-only lookup no longer uses a nonce.
- Fixed: bundled sample CSV and any CSV with absolute URLs imported 0 rows on staging/other hosts, and `www.` vs non-`www` URLs were rejected. Landing pages are now stored as site-relative paths.
- Fixed: the `style="popup"` checker was visible in the page before the modal opened.
- Fixed: `[cm_zip_popup_button]` did nothing on pages without a popup checker; link triggers were blocked from navigating.
- Fixed: assets were registered only inside the shortcode, so Elementor's element cache (re-enqueue by handle) loaded nothing; config was printed once per shortcode.
- Fixed: raw JS errors (e.g. `Unexpected token '<'`) shown to visitors on WAF/HTML/network errors; added 15 s timeout.
- Fixed: "Checking service area…" stuck when the ZIP was edited during a request.
- Fixed: `cm_zip_quote_click` reported the status of the last check on the page instead of the clicked checker; `cm_zip_selection` was pushed to the dataLayer.
- Fixed: CSV export → import added a `'` to formula-like notes; CSV functions now pass `$escape` explicitly (PHP 8.4 deprecation); blank lines no longer counted as skipped; 5,000-row limit is reported.
- Fixed: admin notice displayed any text passed in the URL (`cm_msg`).
- Added: `city` in the quote URL, optional quote-form prefill, filters listed above, `location` attribute on the popup button.
