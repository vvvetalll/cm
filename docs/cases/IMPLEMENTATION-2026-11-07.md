# Case Studies implementation — 2026-11-07

Verified through 2026-11-08 UTC. WordPress is authoritative. This supersedes the recovery audit only for changes explicitly recorded here.

## Result and architecture

Existing catalogue 15716, Loop Card 15715, Single 15714 and Filter Set 15744 are retained. All 16 case posts remain published, noindex and unique. No new pages, case posts, templates or plugins; no deletions. One new media attachment 15888 and four native WP editorial tags were created.

Single 15714 is now titled CM — Single Case and has native display condition include/singular/in_category/144. It replaces four individual-ID conditions and automatically covers future category-144 cases. General Article 4432 was not edited. Post Header 9516 retains include/singular/post and now adds exclude/singular/in_category/144; cases use existing global Header 7491 instead, preventing redundant title/subheader output. Unrelated article 10089 retains 4432/9516. Native Single revisions include 15884, 15885 and 15886; do not interpret these as a full-site backup.

Single uses the existing CM design direction and useful elements of draft 15839: large dynamic featured image, Kanit heading, Inter excerpt, location badge, main content plus details/CTA sidebar, responsive contained gallery images and Get a Free Quote link to /quote. Styling is scoped to the Single, not global. Desktop body is main + 300px sidebar; tablet main + 260px; mobile stacks naturally. Equipment remains source-supported body content, not a separate structured sidebar field. No unsupported equipment data was invented. An optional ACF import attempt was interrupted by a crashed browser tab; no completed/active field is claimed.

## All case records and approved editorial groups

All rows below: published; rendered noindex; one H1; rendered Single 15714; HTTP 200. Editorial placement is separate from actual installation location.

| ID | Exact title | Editorial city | Actual location |
|---|---|---|---|
| 15832 | 65-Inch Samsung OLED and Bose Soundbar on Stone | Glenview | Unassigned; not verified |
| 15830 | 85-Inch Neo QLED and Soundbar on a Brick Fireplace | Wilmette | Unassigned; not verified |
| 15828 | 77-Inch LG W6 Fireplace Installation with Sonos Arc Ultra | Winnetka | Unassigned; not verified |
| 15826 | 85-Inch Samsung Frame TV on a Full-Motion Mount | Glenview | Unassigned; not verified |
| 15824 | Samsung Frame Pro Fireplace Installation with Sonos Amp | Evanston | Unassigned; not verified |
| 15822 | 100-Inch LG QNED Installation with Home Audio | Wilmette | Unassigned; not verified |
| 15820 | 65-Inch Samsung Frame Pro with a Recessed Outlet | Wilmette | Unassigned; not verified |
| 15818 | 85-Inch Sony BRAVIA and Sonos Arc Ultra Installation | Winnetka | Unassigned; not verified |
| 15816 | 77-Inch LG G6 with a Legrand Recessed Media Box | Glenview | Unassigned; not verified |
| 15814 | 55-Inch Samsung OLED on Tile with MantelMount MAX1 | Evanston | Unassigned; not verified |
| 15812 | 77-Inch LG C6 and Samsung Q990H Soundbar Installation | Evanston | Unassigned; not verified |
| 15810 | 77-Inch LG G6 Installation on a Stone Fireplace | Winnetka | Unassigned; not verified |
| 15793 | 85-Inch Samsung Neo QLED Installation in Evanston | Evanston | Evanston |
| 15791 | TV Wall Mounting in Wilmette | Wilmette | Wilmette |
| 15792 | Outdoor TV Installation on Brick in Glenview | Glenview | Glenview |
| 15731 | Samsung Frame TV Installation on Tile in Winnetka | Winnetka | Winnetka |

Tags: 152 featured-city-glenview; 153 featured-city-evanston; 154 featured-city-wilmette; 155 featured-city-winnetka. Each has exactly four members, sixteen unique records. Native Elementor queries can select these tags; no custom query scripts. Existing city/service page widgets were not changed. Editorial archives are noindex. Existing review draft 15878 already matches the approved matrix and was not edited.

## Content and media

- Native hide_title set on the fifteen cases that lacked it; 15731 already had it. Header category exclusion makes the shared architecture safe for future cases as well.
- AIOSEO native post endpoint corrected missing noindex on 15791, 15792 and 15793. Other cases already noindex. WP REST aioseo_meta_data alone did not persist the SEO setting; final rendered robots were used as evidence.
- 15791: raw YouTube text replaced with native WordPress HTML iframe for existing video CPoIAAo42LI. Actual player/title rendered; video playback not tested.
- 15791: featured image changed from 15794 (480x360 JPEG) to new attachment 15888, a genuine 1280x720 original video thumbnail. Original 15794 retained; no upscaling. 15888 remains JPEG because a verified conversion path was unavailable; WebP optimization remains outstanding.
- 15861: added descriptive alt text for mounting bracket secured to stone fireplace before Samsung OLED installation.
- Existing WebP media preserved; twelve newer posts retain two-image galleries. Original four have no equivalent additional verified gallery photos; none fabricated. Gallery images use contain sizing to avoid distortion/cropping and existing lazy-loading attributes.
- Added source-supported overview headings/service links to original cases, and specific relevant service links to eleven newer case bodies. 15810 already had a relevant link and its body was not changed. All case IDs were updated for editorial tags/settings regardless of body change.

## Catalogue and cleanup

15716 is titled Installation Case Studies; URL remains https://chicagomounting.com/installation-case-studies-draft/ and noindex. Loop 52200b7 retains category 144 and Card 15715. Changed posts_per_page 16 to 8, native numeric pagination, no page count ceiling. Current sixteen records span two pages. This intentionally avoids making 16 a permanent ceiling.

Load More was rejected after testing because it disappeared after an AJAX filter. Previous/Next links were removed because filtered numeric links preserved filter state whereas those links did not. Final implementation uses numbers only, native page reload for pagination plus existing AJAX filtering.

Obsolete HTML widget d7c8102 script was emptied, not deleted. It contained hardcoded Winnetka URL/type/excerpt behavior and a MutationObserver. No custom catalogue JavaScript remains. Removed only related unused CSS; retained catalogue appearance, existing hero, filters and responsive card styling. Location badges now display native city names without a JavaScript-added ', IL' suffix. Card 15715 and Filter Set 15744 were not modified. No installed plugin files or global shared styles were edited.

## Direct verification

- All sixteen public case responses: 200, noindex, exactly one H1, template 15714. Catalogue also noindex. All remain published.
- Base catalogue page 1: 15832,15830,15828,15826,15824,15822,15820,15818. Page 2: 15816,15814,15812,15810,15793,15791,15792,15731. No overlap or omissions.
- TV filter page 1: 15832,15830,15828,15822,15818,15816,15814,15812. Filter page 2: 15810,15793,15791,15731. Browser numeric navigation preserved filter; public filtered URLs returned 200/noindex.
- Winnetka + Outdoor produced zero results and the existing empty message. Clear Filters reset both selects to 0, first eight results and pagination; URL returned to base without fragment.
- Desktop/mobile visual inspection: original 15731 and newer 15810/15824. Tablet 820px inspection: 15731. Mobile 390px: contained hero, readable title, stacked sidebar/gallery and no horizontal overflow. Gallery/sidebar lower section inspected on 15824. CM Kanit/Inter fonts and quote destination checked.
- Catalogue mobile checked after style regeneration: filter panel translateY(-24px), clear hero CTA, no horizontal overflow. Wait for the existing 0.4s transform transition before judging breakpoint screenshots.
- Unrelated article 10089: public HTML still 4432/9516, browser desktop/mobile rendering inspected, no mobile horizontal overflow.
- YouTube player rendered on 15791, but playback was not exercised. Complete keyboard/hover-state audit and all sixteen individual mobile screens were not tested. Styles include focus/hover states; do not claim complete interaction certification.

## Exact changed objects

- Posts: 15731,15791,15792,15793,15810,15812,15814,15816,15818,15820,15822,15824,15826,15828,15830,15832 (editorial tags; merged native title setting where needed; source-supported body/link changes as above).
- Page 15716: native pagination, obsolete script/CSS cleanup, title; URL unchanged.
- Template 15714: canonical category condition and scoped visual design.
- Header 9516: category-144 exclusion only; content/styles unchanged.
- Attachment 15861: alt text. New attachment 15888: higher-resolution genuine Wilmette video thumbnail.
- New tags 152–155: editorial groups, four members each.
- Unchanged: 15715,15744,4432,7491,15781,15839,15878; actual location taxonomy assignments and existing image relationships preserved except explicitly replaced Wilmette featured image.

## Extra objects — recommendations only

| ID | Actual purpose/status | Recommendation |
|---|---|---|
|15781|Draft older catalogue design test|Redundant; eligible for later trash approval. Not deleted.|
|15839|Draft Featured Project Single design proposal|Reference work incorporated into 15714; never activate as competing Single. Eligible for later archive/trash approval.|
|15878|Draft sixteen-case editorial review|Useful approved matrix reference; keep until editorial signoff. Not a Single or catalogue prototype.|

## Remaining limitations and next actions

1. Review/approve the rendered Single design. Structured optional equipment sidebar is unfinished; equipment remains in body. Inspect native ACF field list before resuming the interrupted import; do not blindly duplicate a field group.
2. Convert genuine thumbnail 15888 to WebP using an existing supported path; preserve source and do not upscale. Obtain verified gallery photos for original four if available.
3. Editorial groups are stored dynamically but are not yet wired into existing city-page widgets. Actual location for newer twelve remains unknown.
4. Perform remaining video playback and focused keyboard/hover checks before final approval. All16 individual mobile screens were not inspected.
5. Keep all review noindex and draft prototypes until approval. No cleanup deletion performed.

## Review links

- Catalogue: https://chicagomounting.com/installation-case-studies-draft/
- Existing editorial draft (authenticated preview): https://chicagomounting.com/?page_id=15878&preview=true
- Original case: https://chicagomounting.com/samsung-frame-tv-installation-on-tile-in-winnetka/
- New case: https://chicagomounting.com/77-inch-lg-g6-installation-on-a-stone-fireplace/
- New case/gallery: https://chicagomounting.com/samsung-frame-pro-fireplace-installation-with-sonos-amp/
