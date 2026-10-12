# ZIP Checker v0.2.2 — buttons match chicagomounting.com out of the box

- **Package:** `dist/cm-zip-checker-v0.2.2.zip` (SHA-256 `3e780684…8d040f`).
- **Status:** ready for staging. It has not been deployed, and the theme has not been changed.
- **Install or update:** Plugins → Add New → Upload Plugin, then **Replace current with uploaded**. Nothing else is needed: no CSS file to copy and no shortcode attributes.

## What was wrong in v0.2.1

1. **The default design was not the site's design.** The default look was the old plugin style: no border, 15px/700, 46px height, `12px 17px` padding, and `#4c8f00` on hover. The site's look was only available after copying `starter/chicagomounting.css` or adding classes.
2. **Elementor and theme rules could override the button.** The plugin selectors were a single class (specificity 0-1-0). Elementor's global *Site Settings → Buttons* rule `.elementor-kit-N button` (0-1-1) and the theme's `button{}` rules beat them. The ZIP field had the same problem with `.elementor-kit-N input:not(…):not(…)` (0-3-1). The selectors were taken from Elementor 4.0.8 source.

## Fix

**Buttons.** The Check button (`.cm-zip .cm-zip__button`), result CTA (`.cm-zip .cm-zip__cta`) and popup button (`.cm-zip-trigger`) now use the theme's `btn btn-primary btn-md` by default:

| Property | Value |
|---|---|
| Background and border | Elementor global accent (fallback `#63B600`), 2px border |
| Text | white, uppercase, 14px, weight 600, line-height 1.2, no wrap |
| Size | 52px min-height, `0 30px` padding, 8px radius |
| Hover | `#3F8104` background and border, 2px lift, 0.25s transitions |
| ≤767px | 42px, `0 18px` padding, 13px text, 4px radius |

All four variants use it: full, compact, minimal and popup.

**Selectors.** They now have two-class specificity, with `:focus` included. This beats Elementor kit and theme rules without `!important`.

**ZIP field.** Its height and radius match the button.

**Modal close button (×).** It is protected from global button styles.

**Text Editor widgets.** The CTA label colour is protected in all link states: normal, hover, focus, visited and active.

**Intentional differences from the site's link buttons:**
- The lift appears on keyboard focus (`:focus-visible`), not after a mouse click.
- A visible 2px focus ring is shown; the theme removes outlines.
- The button is shown disabled (dimmed) while a check is running.

**Removed.** `starter/chicagomounting.css` is no longer needed. The optional `custom.css` and the theme classes still work on other sites.

**Not changed:** ZIP lookup, database and CSV, the endpoint, popup behaviour, quote integration and GA4/GTM events.

**Modified files:**
- `cm-zip-checker/assets/zip-checker.css`
- `cm-zip-checker/cm-zip-checker.php` (version and admin text only)
- `cm-zip-checker/README.md`
- `starter/` removed

## Verification (Playwright, actual rendered HTML)

The reference is `<a class="btn btn-primary btn-md">` on the same page, styled by the theme `style.css` you provided (verbatim excerpt).

| Suite | Result |
|---|---|
| `cm-buttons.test.mjs` | **173/173** — `docs/test-results/cm-buttons-v0.2.2.txt` |
| `styling.test.mjs` | **75/75** |
| `plugin.test.mjs`, full regression | **136/136** |
| Install from ZIP and upgrade from v0.1.0 | **10/10** |
| Static checks | PHP lint, PHPCS escaping/SQL, PHPCompatibility 7.4+ and ESLint all clean |

`cm-buttons.test.mjs` checks the following:

- **Computed styles.** It compares 35 properties (colours, border, radius, font, size, padding, transitions, transform) against the site button. Width is excluded, because full width on phones is a layout choice.
  - Variants: full, compact, minimal, popup-in-modal, the popup button and the result CTA.
  - Screen widths: 1280, 768 and 375 px.
  - Scenarios: theme CSS only; theme CSS plus loud Elementor kit Buttons/Form Fields globals; and no theme CSS at all.
- **States:**
  - hover is the same as on the site;
  - keyboard focus gives the hover look plus a ring;
  - after a mouse click the button returns to normal;
  - while a check runs the button is dimmed, has no lift and shows a wait cursor.
- **Pixel comparison.** When both are aligned to whole pixels, the plugin's "Check Service Area" and "Get a Free Quote" buttons are **0.00% different** from the site's buttons with the same label, at 1280, 768 and 375 px. Screenshots: `docs/test-results/v0.2.2-site-vs-plugin-*.png`.
- **Elementor kit globals.** With the kit globals active, the checker's buttons and ZIP field stay identical, and the plain `<button>` used as a probe is visibly restyled, which proves the fixture is active.
- **Accent colour.** When the Elementor accent colour is set on `<body>`, it reaches the site buttons and the plugin buttons alike.

## Limitations

- **The real site was not inspected.** The test environment cannot reach chicagomounting.com. The Elementor global colours are assumed (accent `#63B600`). The plugin uses `--e-global-color-accent` exactly as the theme does, so on the live site it picks up the real value.
- **Elementor kit values are unknown.** The stress test uses deliberately loud values, not the site's real ones. If Site Settings → Form Fields styles labels, the "ZIP Code" label follows it; the plugin does not override labels.
- **Browser coverage.** Only Chromium was tested; Safari/iOS still needs a check on staging.
- **Phone tap target.** The 42px phone height matches the site's `btn-md`. That is below the 44px often recommended for tap targets, but above the WCAG 2.2 AA minimum of 24px.
