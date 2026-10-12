# ZIP Checker v0.2.1 — native styling

Package: `dist/cm-zip-checker-v0.2.1.zip` (SHA-256 `43c089ed…57834`). Status: **ready for staging**. Not deployed, the theme was not changed, and nothing was merged into main.

## What changed

| Area | Change |
|---|---|
| Base stylesheet | Same default look as v0.2.0, now driven by `--cmz-*` custom properties. Controls with theme classes get only layout rules. |
| Site stylesheet | Optional `wp-content/uploads/cm-zip-checker/custom.css`. It is loaded after the base, only on pages that show the checker, and is cache-busted by file time. Plugin updates do not touch it. It can be moved or disabled with `cm_zip_checker_custom_css`. |
| Starter | `cm-zip-checker/starter/chicagomounting.css` matches the theme's button system (uppercase, 14px/600, 52px, 8px/4px, `#3F8104` hover, 2px lift). It also uses the Elementor global colours with fallbacks. It contains no `!important`. |
| Theme classes | `button_class`, `cta_class`, `input_class` on `[cm_zip_checker]`; `button_class` on `[cm_zip_popup_button]`. Site-wide defaults come from `cm_zip_checker_default_classes`. Tokens are validated with `sanitize_html_class()` and escaped. |
| Accessibility | A dark keyboard focus ring is shown on every control, including when the theme removes outlines (`a.btn:focus{outline:none}`). |
| Fix | Inside an Elementor Text Editor widget, the theme rule `.elementor-widget-text-editor a{color:…!important}` made the default CTA label green on green. That is fixed. |

Not changed: ZIP lookup, the ZIP database and CSV format, the endpoint, popup behaviour, quote integration, and GA4/GTM events.

Modified files: `cm-zip-checker/cm-zip-checker.php`, `assets/zip-checker.css`, `assets/zip-checker.js` (CTA class only), `README.md`. New file: `starter/chicagomounting.css`.

## Shortcode examples

```
[cm_zip_checker style="full" location="find_near_me"]
[cm_zip_checker style="full" location="find_near_me" cta_class="btn btn-primary btn-md"]
[cm_zip_checker style="compact" location="homepage" button_class="btn btn-primary btn-md" cta_class="btn btn-outline btn-md"]   (button_class needs the theme patch)
[cm_zip_checker style="minimal" location="footer" button_class=""]   (opts out of a site-wide default)
[cm_zip_popup_button label="Check Your ZIP" location="header" button_class="btn btn-primary btn-sm"]   (needs the theme patch)
```

## Recommended setup for chicagomounting.com

**Option 1 — site stylesheet (no theme change).** Copy `starter/chicagomounting.css` to `wp-content/uploads/cm-zip-checker/custom.css` and use the shortcodes without class attributes.

**Option 2 — theme classes.** Use `cta_class="btn btn-primary btn-md"`. For the Check button and the popup button, `button_class` only takes effect after the approved patch `docs/theme-patch/chicagomounting-button-btn.css` is added to the theme. Leave `input_class` empty, because the theme has no input styles.

Use the Shortcode widget, not Text Editor, when using theme classes.

## Proposed theme patch (not applied)

The patch is in `docs/theme-patch/chicagomounting-button-btn.css`. Append it to the end of the theme `style.css` or add it in Elementor → Site Settings → Custom CSS.

- It is additive and only matches `<button>` elements that have the `.btn` class.
- `button.btn.btn-*` now computes exactly like `a.btn.btn-*` on desktop and at 375 px.
- Differences from `a.btn`, made on purpose:
  - a font/margin/padding reset;
  - the lift on `:focus-visible` instead of `:focus`;
  - a visible focus ring;
  - a disabled state.

## Test results (local WordPress 7.1.3, PHP 8.3, Chromium)

| Suite | Result |
|---|---|
| Styling (`tests/e2e/styling.test.mjs`) | **93/93** — `docs/test-results/styling-v0.2.1.txt` |
| Existing full suite (`plugin.test.mjs`) | **136/136** — `docs/test-results/e2e-v0.2.1.txt` |
| Install from ZIP + upgrade v0.1.0 → v0.2.1 | **10/10** — `docs/test-results/upgrade-v0.1.0-to-v0.2.1.txt` |
| Static | `php -l`, PHPCS escaping/SQL clean, PHPCompatibility 7.4+ OK, ESLint clean |

What the styling suite proves:

- **Default look is unchanged.** Box, heading, input, button, button hover, result, CTA and local link compute exactly as in v0.2.0. Focus ring properties are excluded from this comparison, because the ring changed on purpose.
- **Class attributes are safe.** Classes are appended after the plugin class. Injection attempts (`"`, `onclick`, markup, `hover:`) are dropped. Duplicates are removed. Empty values opt an instance out of a default. Defaults and per-shortcode overrides work. The CTA gets its classes for served, conditional and unlisted results.
- **JavaScript is unaffected.** The lookup, dataLayer events and the popup behave as before.
- **The theme patch causes no regressions.** It was checked against the real theme CSS: links, Elementor-style buttons, Elementor form submit, plain `<button>`, `input[type=submit]` and WooCommerce buttons are identical with and without the patch, on desktop and at 375 px. `button.btn` matches `a.btn` in normal state, hover, disabled and keyboard focus. A mouse click does not leave the button lifted.
- **No conflicts with the theme.** With the checker and the starter stylesheet on the page, theme, Elementor and WooCommerce controls compute identically.
- **The site stylesheet layer works:**
  - it loads after the base and is not loaded on unrelated pages;
  - Elementor cache hits get both layers;
  - overrides work without `!important`;
  - the accent follows the Elementor global colour;
  - the 375 px layout holds with no overflow;
  - focus rings are visible;
  - when the file is missing, the base styles still work.
- **Clean run.** No console errors and an empty `debug.log`.

## Remaining limitations

- **The live site was not inspected.** chicagomounting.com is blocked from this environment. The theme CSS used in tests is a verbatim excerpt of the `style.css` you provided. The Elementor kit colours (`--e-global-color-*`) are **assumed** (`#63B600` accent, `#292B26` secondary) and must be checked on staging.
- **Elementor and Elementor Pro were not run.** Shortcode widget, container and Text Editor were tested with Elementor's markup structure, and the element cache was simulated from Elementor 4.0.8 source. The Pro Popup could not be tested.
- **Elementor Site Settings → Buttons/Form Fields** apply to every `button` inside `.elementor-kit-N`. If they are set, verify on staging that they do not change the checker.
- **Theme classes depend on the theme.** Classes containing `:` or `/` (Tailwind-style) are rejected. A CTA that uses theme classes inside a Text Editor widget gets the theme's own `!important` link colours.
- **Browser coverage.** Only Chromium was tested; Safari/iOS and Firefox are still needed on staging.
