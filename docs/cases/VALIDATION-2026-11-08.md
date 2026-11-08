# Case Studies validation and Single hero correction — 2026-11-08

Continued from commit046ff8ebbf5875d5167659aa17d249e08b962de8 on the verified default branch claude/chicago-mounting-zip-review-szeoup. This supersedes the interrupted-check limitations of that checkpoint only for checks explicitly completed below. No MCP setup or completed filter mutation was repeated.

## Completed interrupted checks

| Check | Actual result |
|---|---|
| Desktop empty combination | Glenview + Large & Premium TV: zero cards, native “No installations match these filters.” |
| Reset from empty | Both selects0; exact base catalogue URL without fragment; eight results and Page2 |
| Page1 | 15832,15830,15828,15826,15824,15822,15820,15818 |
| Page2 | 15816,15814,15812,15810,15793,15791,15792,15731 |
| Pagination union | Sixteen unique IDs; no duplicates/omissions |
| Mobile selection from page2 | At390×844, keyboard-selected Wilmette returns15830,15822,15820,15791; URL resets to first filtered page |
| Mobile empty combination | Wilmette + Outdoor: zero cards and native empty message |
| Mobile reset/page2 | Enter on Clear Filters restores base/eight; Enter on Page2 renders other eight |
| Responsive |390px viewport, document scrollWidth370px; one338px grid track; no horizontal overflow |
| Control size | Both Select2 controls296×52px; Clear123.625×52px |
| Type dropdown bounds | x38..332; list360px high, scrollHeight384; native internal scroll, seven types plus placeholder |
| Keyboard | Space opens; ArrowDown navigates; Enter commits; Escape closes; Tab from Location reaches Clear; Enter activates Clear/Page2 |
| Focus | Clear Filters computed visible2px solid rgb(57,117,4) outline |

These are focused keyboard checks, not exhaustive WCAG/screen-reader certification. No new draft or case was created to test a publish/draft transition.

## Existing city/service integration inspection

Authenticated supported REST reads inspected complete native Elementor trees and relevant shared template dependencies; no production city/service changes.

| Page | ID | Current case integration |
|---|---:|---|
| Glenview |9833|Static native gallery/video; no category144 case query |
| Evanston |9987|Static native gallery/video; no category144 case query |
| Wilmette |9701|Static native gallery/video; no category144 case query |
| Winnetka |9888|Static native gallery/two videos; no category144 case query |
| Premium & Large TV |15342|Static gallery/video; no category144 case query |
| Outdoor TV |11178|No case query; referenced outdoor product recommendations |
| Recessed Media Box |8156|No case query |
| Frame TV |5671|Loopfc44ff4 queries products127/138 through Card10278; not cases |
| Soundbar |3398|No case query |
| Fireplace/Brick |3281|No case query |
| General TV mounting |1682|No case query |

Shared dependencies inspected:12415 Hero buttons,12405 Hero services,2157 Our Advantages,4290 Steps,11040 Top TV,2164 Reviews,3092 cta,11227 outdoor_tv_top. TopTV11040 Loop4ab819b queries products term128/Card10278. Outdoor11227 Loopd96b719 queries product term136,Card10278/alternate11436. These product widgets must not be repurposed as case widgets.

Automatic geographic/service case placement is therefore still NOT implemented on these eleven inspected pages. Current category144 catalogue and Single condition are reusable, but do not imply city/service consumers exist. The twelve newer actual cm_location values remain empty. Editorial tags152–155 are selections, not job-location evidence;15731 photo attribution conflict remains flagged. Do not place unverified jobs under copy claiming local installation provenance.

## Actual Single15714 production change

Inspected actual portrait15810 at desktop/mobile against documented requirements: original image remained portrait, measured655.546875×874.078125px at1718 viewport and330×440px at390. Existing Kanit heading, body stacking, native taxonomy facts, gallery and quote destination already work. Optional structured equipment fields and related-case block are still absent.

Changed only one EXISTING rule in Single15714 page-settings custom_css using native Elementor editor. Published the existing template update; no WordPress object was created. Featured source, post content/gallery, native widget settings, element tree, category condition, globals, catalogue Hero/Card/filter and URLs preserved.

Old rule (exact rollback):
```css
.elementor-15714 .cm-case-cover img{display:block;width:auto!important;height:auto!important;max-width:100%;max-height:72vh;margin-inline:auto}
```

New rule:
```css
.elementor-15714 .cm-case-cover img{display:block;width:100%!important;height:auto!important;aspect-ratio:16/9;object-fit:cover;object-position:center 22%;max-width:100%;max-height:none;margin-inline:auto}
```

This implements the previously explicit16:9 hero requirement only, not the entire unapproved design proposal. Uses the existing template-scoped CSS owner; no appended competing override, new stylesheet, per-case patch or script.22% vertical crop favors the screen in the inspected portrait example; full fireplace is cropped by16:9. Photo/crop review remains open as requested; no image is claimed to be an original landscape source.

## Save and frontend verification

- REST readback: custom_css equals EXACT old-to-new transformation; element tree byte-equivalent; display conditions unchanged include/singular/in_category/144. Page-settings keys remain preview_id/custom_css.
- Before/after all16 post comparisons: status/content/excerpt/featured_media/cm_location/cm_installation_type/tags unchanged.
- After update, all16 anonymous HTML responses200/noindex and Single15714. All remain published.
- Portrait15810: Chrome1718 showed1160×652.5/cover/50%22%; Chrome then detached during screenshot. Continued in already available in-app browser without new infrastructure.
- In-app desktop1440: portrait15810 and landscape-thumbnail15791 each1160×652.5; scrollWidth1420<1440.
- In-app mobile390: both330×185.625; scrollWidth370<390;15810 facts/story stacks column.
- Actual desktop/mobile screenshots inspected; the portrait screen remains visible. Screenshots were displayed in tool output but no downloadable screenshot file was saved.
- All temporary viewport overrides reset. No persistent browser/runtime blocker remains. No credential/auth/config changes or installed-plugin source access.

## Remaining work and boundaries

Prepared16 texts remain approved for now; factual/provenance uncertainties are not resolved by that approval. Original media and content remain intact. No new copy waiting gate was introduced.

1. Implement automatic city/service consumers only within approved placement scope, preserving existing galleries/products and distinguishing editorial selection from actual job location.
2. Broader Single design proposal (breadcrumb/title order, related cases, structured optional equipment and final CTA) remains unimplemented;16:9 correction is complete. No new prototype needed.
3. Later factual/photo/crop review: twelve unknown cities;15731 Streeterville/Winnetka photo conflict; original four source mappings; missing source gallery photos.
4. Future-case publish/draft acceptance and exhaustive accessibility/video playback are not claimed complete.
