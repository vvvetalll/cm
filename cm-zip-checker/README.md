# Chicago Mounting ZIP Checker — v0.2.3 (pilot)

This is a **pilot build for staging/testing**, not a production-certified plugin. v0.2.0 fixed the defects found in the
independent review of v0.1.0 (see `docs/REVIEW-REPORT.md` in the repository). Since v0.2.2 the buttons look like the
chicagomounting.com buttons straight after install — no files to copy, no shortcode attributes needed.

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

**Default (no setup):** the Check button, the result button and the popup button use the chicagomounting.com
button design — `btn btn-primary btn-md` from the theme: brand green from the Elementor global accent colour
(fallback `#63b600`), 2px border, uppercase 14px/600, 52px high, `0 30px` padding, 8px radius, hover `#3F8104` with a
2px lift, 0.25s transitions; on screens ≤767px 42px high, `0 18px`, 13px, 4px radius. The ZIP field matches the button
height and radius. All variants (full, compact, minimal, popup) use it. Selectors are strong enough that theme
`button{}` rules and Elementor *Site Settings → Buttons / Form Fields* do not change the checker.

Differences from the theme's link buttons, on purpose: the lift also shows on keyboard focus (`:focus-visible`), not
after a mouse click; keyboard focus has a visible 2px ring (the theme removes outlines); a disabled state while checking.

**Title:** "Do We Serve Your Area?" uses your site's own `<h2>` style (theme / Elementor *Site Settings → Typography*);
the plugin sets only its spacing. Change the text with `heading="…"`, or leave it out with `heading=""` and put your own
Elementor Heading widget above the checker. Same for the line under it: `intro="…"` / `intro=""`.

```
[cm_zip_checker style="full" location="find_near_me" heading="Check Your ZIP Code"]
[cm_zip_checker style="compact" location="homepage" heading="" intro=""]
```

**Other sites / own tweaks (optional):** put CSS in `wp-content/uploads/cm-zip-checker/custom.css`. It loads after the
plugin styles, only on pages that show the checker, and plugin updates never touch it. Use the same selectors as the
plugin or set the tokens — no `!important` needed:

```css
.cm-zip, .cm-zip-trigger, .cm-zip-modal { --cmz-primary: #0a66c2; --cmz-primary-hover: #084d92; }
.cm-zip .cm-zip__button, .cm-zip .cm-zip__cta, .cm-zip-trigger.cm-zip-trigger { border-radius: 999px; text-transform: none; }
```

Tokens (set on `.cm-zip, .cm-zip-trigger, .cm-zip-modal`): `--cmz-primary`, `--cmz-primary-hover`, `--cmz-on-primary`,
`--cmz-text`, `--cmz-muted`, `--cmz-surface`, `--cmz-border`, `--cmz-result-bg`, `--cmz-font`, `--cmz-radius`,
`--cmz-control-radius`, `--cmz-control-height`, `--cmz-button-padding`, `--cmz-button-font-size`, `--cmz-button-weight`,
`--cmz-padding`, `--cmz-padding-compact`, `--cmz-padding-minimal`, `--cmz-padding-mobile`, `--cmz-gap`,
`--cmz-input-border`, `--cmz-input-bg`, `--cmz-input-text`, `--cmz-input-font-size` (keep ≥16px against iOS zoom),
`--cmz-focus`. Move or disable the file with the `cm_zip_checker_custom_css` filter
(`['path' => …, 'url' => …]` or `false`).

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

Not needed on chicagomounting.com (the default already matches). If used there: the theme's `.btn` system covers links (`a.btn`) and Elementor buttons only, so `button_class` on a `<button>` needs the theme patch in `docs/theme-patch/` of the repository (not applied).

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
- Brand green `#63b600` with white text has a contrast ratio of about 2.5:1 (below WCAG AA); the site's own buttons have the same. The hover colour `#3F8104` is about 4.8:1 (passes AA).
- Texts are English only (not translatable yet).
- Event mappings for GA4/GTM need review before publishing tags.
- Requires PHP 7.4+ (static compatibility check 7.4–8.4; runtime tested on PHP 8.3 / WordPress 7.1.3 only).

## Changelog
### 0.2.3
- Changed: the title no longer has its own font size/line height; it uses the site's `<h2>` style (theme / Elementor global typography), in all variants including the popup. Verified against a plain `<h2>` on the same page.
- Added: `intro` attribute; `heading=""` / `intro=""` leave the title / intro out (e.g. to use an Elementor Heading widget instead).

### 0.2.2
- Fixed: the Check button, result CTA and popup button did not look like the site's buttons. The default design is now the chicagomounting.com `btn btn-primary btn-md` (normal, hover, keyboard focus, disabled, ≤767px sizes), verified pixel-identical against the theme's own button in tests. ZIP field height/radius match the button.
- Fixed: Elementor *Site Settings → Buttons / Form Fields* (`.elementor-kit-N button`, `.elementor-kit-N input:not(…)`) and theme `button{}` rules could override the checker's button, ZIP field and modal close button. Selectors now outrank them.
- Fixed: CTA label colour also protected for `:visited`, `:focus`, `:active` inside Elementor Text Editor widgets.
- Removed: `starter/chicagomounting.css` (no longer needed). The optional site stylesheet and theme classes remain for other sites.

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
