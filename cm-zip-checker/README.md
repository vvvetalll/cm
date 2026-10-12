# Chicago Mounting ZIP Checker — v0.2.1 (pilot)

This is a **pilot build for staging/testing**, not a production-certified plugin. v0.2.0 fixed the defects found in the
independent review of v0.1.0 (see `docs/REVIEW-REPORT.md` in the repository); v0.2.1 adds the styling system below.

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
- Use the **Shortcode** widget. Multiple checkers on one page are supported. (Text Editor also works, but on chicagomounting.com its theme rule `.elementor-widget-text-editor a{color:…!important}` recolours links: the default CTA is protected against it, a CTA using theme classes is not.)
- **Inside an Elementor Pro Popup** use `style="compact"` or `style="full"`, not `style="popup"` (that variant is hidden outside the plugin's own modal).
- Element Caching: the Shortcode widget is rendered live by default; if you set its *Cache Settings* to *Active*, Elementor re-enqueues the plugin's script/style by handle, which v0.2.0+ supports (base and site stylesheets both load).
- The plugin's assets are also loaded in the Elementor editor preview.

## Styling

Two layers, both loaded only on pages that show the checker:

1. **Base** (`assets/zip-checker.css`, part of the plugin): layout, states, accessibility and the default look, driven by `--cmz-*` custom properties.
2. **Site stylesheet** (optional, outside the plugin): `wp-content/uploads/cm-zip-checker/custom.css`. Loaded after the base, cache-busted by its modification time. Plugin updates never touch it. If the file does not exist, nothing extra loads and the default look is used.

To customise: copy `starter/chicagomounting.css` from this plugin to `wp-content/uploads/cm-zip-checker/custom.css` (SFTP or the host's file manager), then edit it. Set tokens, or add rules scoped to `.cm-zip` — no `!important` needed. WP Admin → CM ZIP Checker shows whether the file is loaded. Move or disable it with a filter:

```php
// Example: keep it in the child theme instead (or return false to disable).
add_filter( 'cm_zip_checker_custom_css', fn() => [
	'path' => get_stylesheet_directory() . '/cm-zip-checker.css',
	'url'  => get_stylesheet_directory_uri() . '/cm-zip-checker.css',
] );
```

| Token | Default | Used for |
|---|---|---|
| `--cmz-primary` / `--cmz-primary-hover` / `--cmz-on-primary` | `#63b600` / `#4c8f00` / `#fff` | Buttons, CTA, result accent / hover / button text |
| `--cmz-text`, `--cmz-muted` | `#292b26`, `#525c4c` | Text, intro text |
| `--cmz-surface`, `--cmz-border`, `--cmz-result-bg` | `#fff`, `#e2e7de`, `#f1f8ea` | Box and popup panel, box border, result panel |
| `--cmz-font` | theme font | Font family of box and buttons |
| `--cmz-radius`, `--cmz-control-radius` | `14px`, `8px` | Box radius; input, button and result radius |
| `--cmz-padding`, `--cmz-padding-compact`, `--cmz-padding-minimal`, `--cmz-padding-mobile`, `--cmz-gap` | `24px`, `16px`, `12px`, `18px`, `10px` | Spacing |
| `--cmz-control-height`, `--cmz-button-padding`, `--cmz-button-font-size`, `--cmz-button-weight` | `46px`, `12px 17px`, `15px`, `700` | Input/button size and button text |
| `--cmz-input-border`, `--cmz-input-bg`, `--cmz-input-text`, `--cmz-input-font-size` | `#aeb5aa`, `#fff`, `#292b26`, `16px` | Input (keep ≥16px on mobile to avoid iOS zoom) |
| `--cmz-focus` | `#292b26` | Keyboard focus ring |

Set tokens on `.cm-zip, .cm-zip-trigger, .cm-zip-modal` (as the starter does) or on `:root`.

### Theme classes (optional)
Instead of the plugin look, a control can use the theme's own classes. The plugin class stays first (JavaScript relies on it), `cm-zip-themed` switches off the plugin look for that control, then your classes follow:

```
[cm_zip_checker style="full" location="find_near_me" button_class="btn btn-primary btn-md" cta_class="btn btn-primary btn-md"]
[cm_zip_checker style="compact" location="homepage" cta_class="btn btn-outline btn-md"]
[cm_zip_checker style="full" input_class="form-control"]
[cm_zip_popup_button label="Check Your ZIP" button_class="btn btn-outline btn-sm"]
```

renders e.g. `<button class="cm-zip__button cm-zip-themed btn btn-primary btn-md" type="submit">`.

Site-wide defaults (shortcode attributes override them; `button_class=""` turns a default off for one checker):

```php
add_filter( 'cm_zip_checker_default_classes', function ( $classes ) {
	$classes['button']  = 'btn btn-primary btn-md'; // Check button
	$classes['cta']     = 'btn btn-primary btn-md'; // result button (link)
	$classes['input']   = '';                       // ZIP field
	$classes['trigger'] = 'btn btn-outline btn-sm'; // [cm_zip_popup_button]
	return $classes;
} );
```

Class names must be plain CSS class tokens (`A-Z a-z 0-9 _ -`); anything `sanitize_html_class()` would alter (e.g. Tailwind `hover:…`, `w-1/2`) is dropped. Up to 20 per control. A keyboard focus ring is kept on themed controls even if the theme removes outlines.

On chicagomounting.com the `.btn` system is written for links (`a.btn`) and Elementor buttons only, so `button_class` on the Check button needs the theme patch in `docs/theme-patch/` of the repository (not applied; needs approval). `cta_class` works without it. The theme has no input styles, so leave `input_class` empty there. The site stylesheet route needs no theme change.

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
| `cm_zip_checker_default_classes` | all empty | Site-wide theme classes: `button`, `cta`, `input`, `trigger` |
| `cm_zip_checker_custom_css` | uploads path | Site stylesheet location `['path' => …, 'url' => …]`, or `false` to disable |
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
### 0.2.1
- Added: two-layer styling — base stylesheet driven by `--cmz-*` custom properties, plus an optional site stylesheet in `wp-content/uploads/cm-zip-checker/custom.css` (survives updates, loaded after the base only where the checker is shown, cache-busted by file time; relocatable via `cm_zip_checker_custom_css`). Starter for chicagomounting.com in `starter/chicagomounting.css`. Admin page shows whether it is loaded.
- Added: `button_class`, `cta_class`, `input_class` on `[cm_zip_checker]`, `button_class` on `[cm_zip_popup_button]`, and site-wide defaults via `cm_zip_checker_default_classes`. Controls with theme classes get `cm-zip-themed` and only layout rules from the plugin.
- Changed: style handle `cm-zip-checker` is now an alias that loads `cm-zip-checker-base` and, if present, `cm-zip-checker-custom` (so Elementor's element cache gets both).
- Changed: visible keyboard focus ring (`--cmz-focus`, dark) on all controls, including themed ones; the default input focus ring is now dark instead of the low-contrast green.
- Fixed: on chicagomounting.com, the theme rule `.elementor-widget-text-editor a{color:…!important}` turned the default CTA label green-on-green when the checker sat in a Text Editor widget.
- Default look without classes or site stylesheet is unchanged (computed styles compared with v0.2.0 in tests).

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
