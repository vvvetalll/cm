# Single Case editorial redesign — 2026-11-07

Status: implemented for user visual review; NOT visually approved. User rejected the preceding generic/boxed design. No new pages, templates, prototypes, plugins or stylesheet files were created.

## Existing style sources inspected before editing

| Source | Actual role | Changed? |
|---|---|---|
| Elementor Global Kit 8 | Global colors: primary/secondary #292B26, text #343434, accent #4E9D05. Inter body roles, Kanit heading roles, 1200px container and 768/1025 breakpoints. Existing global headings are heavier than the requested treatment. | No; before/after metadata equal. |
| WordPress wp-custom-css | Calculator controls, Filter Everything wrappers/options/chips, product-category thumbnails. No Single-specific source of truth. | No |
| Active chicagomounting theme stylesheet | Existing CM button classes btn, btn-md, btn-outline, Inter/button sizing, uppercase labels, hover/focus behavior and responsive radii. Also class-based blog styles. Read public stylesheet only; no plugin directories accessed. | No |
| Template 15714 document custom_css | Previous 5191-character block owned gray photo box/fixed-height image, heavy title, main/right boxed sidebar, gallery ratios and duplicated button styles. | Replaced, not appended: 892 characters remain for intrinsic media, WP-generated content and local focus indicator. |
| GitHub project style records | knowledge/PROJECT.md, WORK/SEO-CONTENT latest records; tests/fixtures/theme/chicagomounting-style-excerpt.css verified existing btn conventions. | Relevant records updated only. |

Source of truth is layered: Kit8 owns shared tokens/typography roles; existing theme owns reusable button behavior; native controls on Single15714 own this template's composition and title exception. Do not copy the old document CSS back or change global typography to solve this Single.

## Exact changes within existing 15714

| Element ID | Change and styling location |
|---|---|
|6d6ca67c|Existing atomic article wrapper/local native style: max-width75rem, existing20px gutters,32px top/64px bottom padding, block flow.|
|592c353d|Existing featured-image widget: removed fixed620/400px image heights, retains dynamic full featured source, contain,4px image radius,32px bottom margin. Minimal document rule makes width/height intrinsic, caps max-height72vh, centers image and removes need for gray media background.|
|0bae6cd|Existing heading container native controls: column, left alignment,16px gap,32px bottom spacing. Removed location widget from hero and moved it into facts.|
|59cad9c|Native heading typography: Kanit400, clamp26–38px, uppercase presentation,1.15 line height,.025em letter spacing; primary Kit color. Stored case titles/SEO metadata not rewritten.|
|0981606|Existing dynamic summary: Kit Text L role4229e4b and text color; left aligned,820px maximum native custom width. Body text retains original case.|
|398064b9|Native flex container: facts first, story second; desktop48px gap,tablet/mobile32px; mobile column. No custom grid/responsive layout CSS.|
|cmcs001|Existing sidebar converted to unboxed narrow facts column:24% desktop/28% tablet/100% mobile, zero padding,20px native gap. Renamed class cm-case-facts-column; no card border/background/top stripe/shadow.|
|cmcs002|Heading Project facts, existing Kit S H4 typography b4aface and primary color; h2 semantics.|
|cmcb001|Existing actual cm_location Post Info moved below facts heading; actual location retained; empty row hidden. No editorial city substituted into Single provenance.|
|83d0898|Existing Installation Type Post Info; removed duplicate Location row because location is already rendered above.|
|cmcs003|Short native text: Planning a similar installation? Generic paragraph removed.|
|cmcs004|Existing /quote CTA uses theme classes btn btn-md btn-outline; no duplicated local button styling. Existing Navigation and Buttons Kit role retained; local focus-visible outline compensates for theme focus outline removal.|
|cmcm001|Native main content column70% desktop/66% tablet/100% mobile, zero padding; retains single dynamic Post Content widget5870cef0.|
|5870cef0|Body typography/color use Kit Text M132a2a3 and text token. Actual story remains source content.|

Residual document CSS is entirely scoped to .elementor-15714, not body.elementor-page-15714 (which only targets the template preview body, not real case pages). It handles intrinsic featured image sizing, uppercase lightweight h2 inside WordPress-generated content, default WP gallery image border/natural height, responsive iframe, empty term rows and CTA focus-visible. There is no new stylesheet, script or appended large CSS block. Fixed widths/heights previously distorted the portrait image; final rendered aspect ratios were measured after native CSS save/regeneration.

## Gallery content changes

Twelve newer posts changed ONLY their existing gallery shortcode: removed the featured attachment ID from the repeated gallery list, kept the additional real photo, set one column and full source (responsive srcset remains native). No image attachment, featured relationship, written installation story, title, slug or SEO metadata was deleted/rewritten. Source content before/after is included in the implementation snapshot.

Affected posts:15810,15812,15814,15816,15818,15820,15822,15824,15826,15828,15830,15832. The full source avoids enlarging the prior768px large derivative into an812px story column. Four original posts have no duplicate gallery to remove and were not edited.

## Verified result

- All16 public case responses:200,publish,noindex,exactly1 H1 and Single15714. Category condition remains include/singular/in_category/144. Actual locations, featured IDs and stored case titles unchanged. See single-editorial-verification-2026-11-07.json.
- Portrait15810: source1200x1600; rendered685.78x914.39 at desktop1718px,594x792 at tablet820px,330x440 at mobile390px. Natural3:4 ratio, no gray container, no crop/distortion. Story812px vs facts278px desktop; tablet story501.59px vs facts212.80px; mobile both330px stacked.
- Landscape15791: source1280x720; rendered1160x652.5 desktop,760x427.5 tablet,330x185.625 mobile. Natural16:9 ratio preserved.
- Square original15731 additionally inspected desktop; dynamic title,actual location,facts/story and video retained.
- All inspected viewport document scrollWidth equaled clientWidth (desktop1698,tablet800,mobile370); no horizontal overflow. H1 computed Kanit400,38px desktop/26px tablet-mobile. Body remains Inter, not uppercase.
- Actual viewport screenshots of portrait and landscape desktop/tablet/mobile, and portrait lower story/gallery, were emitted in chat and inspected. Screenshot image files were NOT successfully persisted to GitHub; do not claim committed screenshot artifacts. A final screenshot-saving attempt hit a browser CDP timeout after completed visual checks.
- Final gallery source-size change large→full was checked through source/public HTML, not another browser visual pass; layout and aspect rules are unchanged. Video player rendered; playback and exhaustive keyboard/hover audit not performed.

## Review URLs

Portrait/new: https://chicagomounting.com/77-inch-lg-g6-installation-on-a-stone-fireplace/
Landscape/original: https://chicagomounting.com/tv-wall-mounting-case-wilmette/
Square/original: https://chicagomounting.com/samsung-frame-tv-installation-on-tile-in-winnetka/

User must review rendered design before visual approval. Prior proposed design is superseded, not approved. Draft15839 remains draft/unmodified. Catalogue15716,Card15715,Filter15744 and global styles unchanged during this redesign. Badge fix was separately committed as8a26e28b67f0f12a4d74c2c3fa268c57780e8022. Location filter remains actual-location based,not editorial four-per-city.
