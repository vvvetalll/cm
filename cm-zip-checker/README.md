# Chicago Mounting ZIP Checker — v0.1.0 (pilot)

This is a **pilot build for staging/testing**, not a production-certified plugin.

## Installation and safe testing

1. Back up the WordPress database and site files.
2. Prefer a password-protected staging clone. Alternatively use a private, noindex test page on the live installation (this still runs plugin code sitewide, so staging is safer).
3. Plugins → Add New → Upload Plugin → select the ZIP → Install → Activate.
4. WP Admin → **CM ZIP Checker** → import `sample-zips.csv` from this package. All sample coverage statuses are **conditional**; examples are not verified as served.
5. Create test page with `[cm_zip_checker style="full" location="test"]` and `[cm_zip_checker style="compact" location="test"]`.
6. Try valid, invalid and unlisted ZIPs. Confirm forms show conditional/unlisted rather than falsely declaring service.
7. To test modal, put `[cm_zip_checker style="popup" location="popup_test"]` on the same page as `[cm_zip_popup_button label="Check ZIP"]`. The popup shortcode's output is moved to a modal by JS after the first open.
8. Inspect browser Console and Network → `admin-ajax.php` for failures. Check mobile and keyboard navigation.
9. Test `/quote/?zip=60025` **manually** before attempting form integration. This build does **not** modify the quote form or automatically prefill its fields.
10. Only after successful staging testing and code review, approve deploying to the live website.

## Shortcodes
- `[cm_zip_checker style="full" location="find_near_me"]`
- `[cm_zip_checker style="compact" location="homepage"]`
- `[cm_zip_checker style="minimal" location="footer"]`
- `[cm_zip_checker style="popup" location="popup"]` along with `[cm_zip_popup_button label="Check Your ZIP"]`.

Popup is a standalone accessible modal for pilot testing; full compatibility with existing Elementor Popup Builder must be tested separately before using in production.

## Admin and coverage model
CSV columns: `zip,city,state,status,landing_page,note`. Status must be `served` or `conditional`. Absent ZIP returns `unlisted`. A quoted ZIP is **not** confirmation of a scheduled appointment.

## JavaScript API
`CMZipChecker.open()`, `CMZipChecker.check('60025')` (Promise returning lookup data), `CMZipChecker.getSelection()`, `CMZipChecker.clear()`.

Document event: `cmzip:selection` contains selected ZIP for first-party site logic; GTM `dataLayer` events omit ZIP codes. GTM events use `cm_zip_check`, `cm_zip_check_served`, `cm_zip_check_conditional`, `cm_zip_check_unlisted`, `cm_zip_quote_click`, `cm_zip_popup_open`. No direct GA4/gtag calls.

## Known limitations / scope
- Uses a WordPress option for records (appropriate for modest datasets); bulk search/filter or versioned audit history not implemented.
- No rate limiting on public AJAX lookups yet. Consider request throttling or a static public coverage dataset after security review.
- No server-side integration with current quote/calculator yet. Quote CTA uses `/quote/?zip=XXXXX` but quote form may ignore the query parameter.
- Custom popup is a pilot implementation; integration with Elementor's native popup needs site-specific investigation.
- No verified service-area database has been supplied. Do not import guessed ZIP statuses into production.
- Event mappings for GA4/GTM need review before publishing tags.
- Requires standard WordPress environment and PHP 7.4+; browser tests, WordPress integration tests and production security audit remain outstanding.
