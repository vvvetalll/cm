# Case Studies composition — 2026-11-08

## Current delivery and publication hold

Continue from715dedea79a5a4cac3746a354052267fce15ccd7.

**Latest user instruction overrides the earlier live integration request:** do not expose the new Case Studies blocks on city/service pages during development. Publish these blocks only with explicit final-launch authorization. The11 inserted sections were removed from all public consumers; original page trees restored. All11 anonymous responses200, with no cm-case-selection section. Canonical catalogue15716 and all16 review cases remain published/noindex as previously authorized.

Prepared and tested native sections are retained in automatic-selections-prepared-2026-11-08.json, not in duplicate WordPress pages/templates. Before-state backup: composition-before-2026-11-08.json (bdc7d000c803125d334c89b0f3856febdc7aedd4). Final canonical documents and verification: composition-after-2026-11-08.json (4b97cb0e43998ebb77c61707d319112387453d32).

## Card15715 — completed

- Deleted excerpt/Short Description element158ecb5 from the shared template; case excerpts/content themselves preserved.
- Retains16:9 featured image, native editorial-city badge, existing Kanit heading and View Case Study link.
- Final user typography choice: UPPERCASE, Kanit500 (medium),17px desktop/16px mobile; existing1.2 line-height and.02em tracking retained. Earlier600/title-case experiments are superseded.
-20px horizontal/title-bottom spacing; flex card layout and auto top margin keep52px CTA buttons aligned across a row.
- Fixed screenshot-reported flush-left titles and tiny badges: explicit native heading selector;32px white pill with native green map marker. Removed unused Installation Type row from Card Post Info; type taxonomy remains filterable.
- Restored right-hand arrows after user correction. CTA native rich text has two spans, “View case study” and “→”; existing flex space-between aligns the arrow right. No CSS string/pseudo-element dependency.
- Moved card presentation ownership from Page15716 to existing Card15715 custom_css, enabling consistent reuse. Catalogue retains only its own layout/filter/pagination CSS. No competing stylesheets/global changes.
- Corrected styles after actual rendering exposed native specificity and inline quote-escaping issues. Final reusable CSS avoids quoted attribute selectors/generated-content strings. Native editor save and final frontend used as evidence, not MCP save status alone.

## Single15714 — completed composition

Existing category condition include/singular/in_category/144 remains. Native order:
1. Breadcrumb link back to catalogue.
2. Existing dynamic H1 and summary.
3. Existing featured image16:9, unchanged cover/crop rule.
4. Existing actual-location/installation facts, quote button and Post Content; mobile stacks.
5. Native Loop Grid: three more category144 cases, excludes current_post, Card15715.
6. Final quote CTA using established heading globals and theme button classes.

Preserved written case content, galleries, videos, media assignments and actual locations. No unsupported equipment field, fabricated fact or empty optional-data row added; equipment remains in the original body. Fixed an existing root bottom-padding unit error64rem→64px. Header/footer/global styles unchanged.

Verified newest15832 Single: exactly one H1; related15830/15828/15826 (current excluded); final CTA/quote/. At390px hero330×185.625 and column body;1440px hero1160×652.5 and row body; three related columns,64px bottom padding, no horizontal overflow. Final all16 anonymous responses200/noindex/Single15714/one H1.

## Dynamic integrations — prepared/tested, REMOVED FROM LIVE

Native Loop Grid queries category144 AND existing tag/type,4 items per section, no manual case-ID lists.11 existing consumers, no new WP objects:

| Page | ID | Query term beyond category144 | Verified visible IDs before removal |
|---|---:|---:|---|
| Glenview |9833|editorial tag152|15832,15826,15816,15792|
| Evanston |9987|editorial tag153|15824,15814,15812,15793|
| Wilmette |9701|editorial tag154|15830,15822,15820,15791|
| Winnetka |9888|editorial tag155|15828,15818,15810,15731|
| Large/Premium |15342|type157|15822,15793|
| Outdoor |11178|type148|15792|
| Recessed Media |8156|type159|15816|
| Frame TV |5671|type147|15826,15824,15820,15731|
| Soundbar |3398|type158|15818,15812|
| Fireplace/Specialty |3281|type156|15832,15830,15828,15814; fifth via View All|
| General TV |1682|all category144|latest four; all via catalogue|

Native View All buttons link to existing filtered catalogue URLs. Native responsive4/2/1 columns. All11 inspected at1440px and390px before removal: one selection per page, expected IDs, no excerpts,16:9,then-current18px desktop/17px mobile headings (subsequently user changed final typography to17/16px as above),52px CTA, no overflow. Existing product loops, galleries, videos and sections preserved.

City copy explicitly labels editorial examples and states card cities are collection labels, not verified job locations. Single facts continue using actual cm_location only. Service queries use PRIMARY installation classification; they are not an exhaustive multi-service inventory. Twelve newer actual cities remain unknown;15731 photo provenance conflict remains flagged.

## Dynamic cache verification and supported fix

A reversible test temporarily added editorial tag153 to15826, without changing actual location/content/status/noindex. Evanston automatically included15826 without editing its page, but anonymous output initially remained stale after tag restoration.

Used WP Rocket’s EXISTING native Always Purge URL(s) setting; no plugin source/file access or custom hooks. Previous field empty. Added the11 consumer paths plus /installation-case-studies-draft/(.*). No other setting was deliberately changed. Native settings-saved notice and field readback verified.
Reference: https://docs.wp-rocket.me/article/1391-always-purge-url-s

Repeated actual test after fix:
- tag addition HTTP200 → Evanston15826/15824/15814/15812;
- restoration HTTP200, original tags[152] verified → anonymous Evanston15824/15814/15812/15793.
No manual page edit/cache purge between these requests. Final tags restored; actual locations untouched.
The native purge configuration remains useful for the review catalogue and prepared final launch. These rules do NOT republish removed blocks.

## Final verification and scope

- All11 public page responses200 with new blocks absent. Parsed original page-tree length/checksum matches pre-change snapshot for every page; no original page section removed/rebuilt.
- Catalogue mobile390: final title16px/Kanit500/uppercase; no excerpt; Glenview+Frame returns15826; Large/Premium combination empty; reset restores8; pages1/2 union16 unique IDs. Buttons, filters and native pagination remain working.
- Final desktop1440 title17px/Kanit500/uppercase. Title margin0 20px 20px; badge32px with native SVG; CTA52px. Right-hand arrow verified as native spans with space-between.
- All16 remain published/noindex and each renders one H1/Single15714. No new case records, pages, templates, filters, taxonomies, plugins or custom runtime systems.
- A runtime timeout interrupted the View All save batch; inspected actual state and completed only missing/unfinished operations. A native Card MCP save warning persisted despite stored updates; actual native editor/frontend/readback verified final result.
- Temporary viewport overrides reset. Screenshots visually inspected in tool output; no downloadable screenshot artifact saved.
- Full screen-reader/video playback audit and publishing a new case were not performed. No existing case was moved to Draft for testing.

## Next step

Continue review on canonical catalogue/Single only. Do NOT publish city/service blocks until final-launch authorization. At launch restore prepared native sections, preserve original consumers, rerun focused guest/cache/mobile checks. Keep all case noindex until explicitly approved; factual/photo refinement remains separate.
