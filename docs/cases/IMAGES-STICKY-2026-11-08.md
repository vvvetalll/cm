# Case images, galleries and sticky Project Facts — 2026-11-08

## Current image requirements
The latest user instruction supersedes the earlier manual-Featured-image arrangement. The assistant prepares Featured images and galleries. Featured: individually inspect each verified source, keep the entire TV visible when practical, center the TV as closely as the real photograph permits, preserve useful installation context, exact16:9 WebP, target1920×1080 without upscaling. No stretching, generated extensions or automatic blanket center crop. Gallery: natural aspect ratio, WebP quality84, longest side1600px maximum without enlargement. Preserve originals; only audited project assignments.

## Delivered
- Canonical Single15714 only: existing Project Facts aside cmcs001 is CSS sticky at desktop >=1025px, top88px (72px fixed header +16px gap), top120px for logged-in admin bar. All facts/type/planning text/quote button remain in that one aside.
- Parent398064b9 has visible overflow and flex-start alignment; all ancestor overflow was inspected and is visible. CSS sticky is naturally bounded by that section; Related Cases and CTA are later siblings. Minimal scoped CSS supplies position:sticky and the existing section boundary without additional scripts or duplicated elements.
- Native tablet controls now stack both existing columns at100% width; <=1024px sidebar is static. Global header and shared styles untouched.
-15 individually reviewed Featured compositions uploaded:13 at1920×1080;15793 at1600×900;15792 at736×414. Both smaller files preserve native resolution, not claimed to satisfy1920px.
-15791 retains existing1280×720 JPEG video still, including its existing side panels: no suitable verified replacement original. This remains unfinished.
-15731 reframes the currently assigned2000×2000 attachment9963 only. Its geographic attribution conflict is still unresolved; neutral visual alt text makes no new location claim.
-92 verified originals for12 newer cases converted;80 non-Hero photos displayed in12 galleries.14 existing suitable natural-ratio WebP attachments reused;66 additional gallery uploads. Featured source photo excluded from its gallery. Existing earlier Featured views may appear as distinct additional views when the new Hero uses another photograph.
-All123 originals accessible before uploads. SHA256 comparison confirms all92 processed originals unchanged.31 unmapped photographs remain unused; original4 cases have no newly assigned galleries.
-Galleries use WordPress Post Content image markup, attachment IDs, natural dimensions, lazy loading, WordPress-generated srcset and scoped responsive grid:2 columns desktop/tablet,1 mobile. Native Elementor data attributes group the lightbox per case; no custom JS/PHP/plugin.
-Existing CTA template3092 embedded through the native Template widget at the existing final CTA location. Source3092 unchanged; quote link/booking popup5890 retained.
-No new posts/pages/templates/filter sets. Card15715, catalogue15716 and Filter Set15744 preserved. City/service blocks remain withdrawn under final-launch hold.

## Actual checks
-Desktop1280: catalogue pages1/2 visually reviewed, all16 thumbnails loaded and retained full prepared16:9 composition;275×154.6875px. Native Page2 link works. The first newly selected image on page2 initially loaded later than neighbors, then verified loaded1024×576 and visible.
-Mobile390: both catalogue pages retain8 cards and16:9 boxes336×189; no horizontal overflow. Representative scroll views inspected; this is not a screenshot-by-screenshot mobile review of every card.
-Single15810 desktop: Hero1160×652.5, gallery2 columns. Single15832 mobile: Hero330×185.625, gallery1 column330px,9 grouped images, static facts, CTA330px, no overflow.
-Sticky long15810: top120px while section scrolls; later sidebar bottom equals section bottom, so it leaves before Related Cases/CTA. Short15793: section276.8125px, sidebar251.578125px; it remains bounded rather than pinning past the section. Tablet820 and mobile390: static, stacked, no overflow. After gallery expansion, long-case bottom boundary was checked again.
-Desktop15810 lightbox opens a7-photo group; Next changes the displayed caption; Escape closes. Mobile15832 opens9-photo group and Close works. ArrowRight transition was not established; exhaustive keyboard accessibility is not claimed.
-15 final crop outputs plus retained15791 individually visually inspected; selected gallery WebP outputs inspected for compression/detail. All output dimensions/native aspect ratios checked.
-All16 anonymous pages HTTP200/noindex/Single15714/CTA3092. All12 galleries expose expected group counts (3–12). WordPress srcset present. REST comparison: all16 still publish; URLs, taxonomies, approved prose and excerpts unchanged after replacing only the prior gallery shortcode.
-Temporary viewport overrides reset.

## Operational notes and remaining limitations
-1920×1080 is incomplete for15793/15792 (need higher-resolution verified originals);15791 needs a suitable actual installation photograph. Never upscale or select an unrelated project just to remove these flags.
-15731 Winnetka versus Streeterville provenance remains open; reframing does not validate it. Newer actual-location taxonomy values remain untouched/empty where unverified. Editorial tags are not installation proof.
-Gallery count is unrestricted by template/CSS. For another case, add its verified attachment images to Post Content, retain wp-image-ID class, natural width/height, loading=lazy and a common data-elementor-lightbox-slideshow=case-POSTID on each file link, with data-elementor-open-lightbox=yes. Updating a gallery does not require changing Single15714. A plain WordPress gallery shortcode opened files individually; explicit supported Elementor grouping attributes were necessary for Next/Previous navigation.
-No exhaustive interaction test of every gallery, full keyboard audit, physical-device test or real new-case publishing test. Existing completed filter behavior was not re-mutated/re-audited for an image-only change.
-One media upload request failed before an attachment was returned; filename search returned no match before one successful retry. A bulk media read returned non-JSONHTML; cause not established. Subsequent bounded writes/reads and all16 guest pages succeeded.
-Inventory and exact previous Featured IDs/gallery shortcodes/scoped Single settings are in image-inventory-2026-11-08.json. Original attachments/files were not deleted. Restore those IDs/shortcodes and Single settings for rollback; keep new media unreferenced until safe cleanup is explicitly requested.
