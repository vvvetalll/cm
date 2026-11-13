# CSS ownership and Steps accent removal — 13 November 2026

Owner made CSS centralization a permanent architecture rule and explicitly requested removal of green top lines on the five step cards. AGENTS.md now requires: inspect native settings/rendered CSS/ownership first; prefer sufficient native controls; otherwise minimally reuse/correct the owning rule in existing theme style.css; no scattering/new stylesheets/duplicate overrides. Widget Custom CSS remains only a technically justified reusable-component exception, separately approved. Existing Rule#1 approval requirements remain unchanged; historical widget CSS is not blanket permission.

## Source and inspection

The screenshot matches homepage16's reusable **Steps template4290**, grid1b03a91 and cards0c13f91/9ad595c/7530bb7/eb74103/7c57fbb. Current MCP tree confirmed4290; native Elementor first-card Style→Border showed Solid1px on all sides. No Elementor changes or Publish. The4px green line was a separate **::before** accent owned by active theme **wp-content/themes/chicagomounting/style.css**, original lines2141–2159, not the native border. Computed ::before content empty string,4px high, accent rgb(78,157,5).

## Exact correction

Removed only this existing281-character block, including its comment and adjacent separator newlines:

```css
/* Green top accent */

.elementor .elementor-element.cm_steps
> .elementor-element.cm-step.e-con::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    height: 4px;

    background-color: var(--e-global-color-accent);

    z-index: 2;
}
```

No override/new rule, widget CSS, inline style, extra stylesheet or plugin. The similarly named **pricing-carousel green accent remains untouched**. Number-badge ::after, normal card border, gradients, hover rules and all responsive declarations remain unchanged. Previously approved Chips focus rule remains byte-for-byte intact. This correction is shared for any component using the existing cm_steps/cm-step classes; no individual page override added.

Native Theme File Editor buffer compared exactly with expected file before saving. Update File success, reload and complete-content readback verified **104214→103933characters**, exactly one281-character removal. No unrelated original content changed. Native Rocket Clear Used CSS and Clear and Preload Cache propagated the theme edit; no cache configuration changes. Installed plugin files not accessed.

## Frontend verification and rollback

Real anonymous homepage: all five cards ::before now **none / transparent**; automatic number badges remain.1366desktop: five equal224×368.125px cards, no horizontal overflow.390mobile: five equal330×158.333px cards, existing horizontal image/text layout and badges preserved, no overflow. [Desktop screenshot](STEPS-2026-11-13-desktop.jpg), [mobile screenshot](STEPS-2026-11-13-mobile.jpg), [exact source/before/after evidence](STEPS-2026-11-13-verification.json). No SEO, product, filter, Case Studies, Cloudflare or form changes.

Rollback: reinsert the recorded281-character block in the same shared style.css **immediately before `/* Automatic STEP number badge */`**, Update File/reload/read back, native CSS/cache refresh, verify desktop/mobile. Do not restore the whole stylesheet or alter pricing/card/badge rules. AGENTS architecture instruction is an owner policy and should remain even if the visual change is rolled back.
