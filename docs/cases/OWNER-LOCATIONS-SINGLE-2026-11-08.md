# Single Case corrections and owner-confirmed locations — 2026-11-08

## Authorization and provenance

The owner explicitly confirmed the catalogue city tags as actual installation locations and requested location-aware headings, project descriptions and SEO metadata. This supersedes the earlier unknown-location status for the twelve newer cases. Existing editorial tags remain separate from cm_location; the confirmation authorized copying their city meaning into the existing actual-location taxonomy, not merging the taxonomies.

Case 15731 is the exception: automatic action review rejected the attempted location update because the earlier explicit Winnetka/Streeterville conflict hold requires case-specific confirmation. No location, heading, description or SEO update was executed for 15731. Its existing URL remains unchanged. Ask the owner specifically whether 15731 is in Winnetka, IL despite the historical conflicting photo labels.

All WordPress writes used the existing authenticated WordPress/Elementor browser UI. No Application Password transmission, shell authentication, plugin-file access, alternative API writes or new infrastructure.

## Implemented in existing Single 15714

- Removed redundant Plan a Similar Installation heading, paragraph and service/quote links from Post Content on all sixteen cases. Kept technical descriptions, photographs, video and gallery markup.
- Replaced old final wrapper 748f7af/cm-case-final and Template widget cmct3092 with a complete native copy. Source service3398 outer CTA698338dd/cm_cta_section and template3092 root74cb65b were copied through Elementor's native Copy/Paste. The copied outer section is a root sibling after the article, not constrained inside its1160px content column.
- Final native CTA: outer ec86d3a, inner5769a5f, text column ffc67b2, heading a8e0b21, paragraph c387222, grid1294d2e, buttons5f957fd/d1d9757, installer602152c. No Template widget remains in the copied CTA. Source service3398 and template3092 were not saved or modified.
- Desktop source/copy comparison at1698px: outer1698px, centered1200px inner, two600px columns, text padding50px 0 0, button grid420px, outer padding0. Installer uses the original Call_to_Action_Man-1.png background. Actual rendered source and copied CTA were visually compared; background, text alignment, installer and both buttons match. Mobile390px: outer390px, inner20px horizontal padding,350px stacked columns and button grid; installer remains below the buttons without horizontal overflow.
- Corrected the existing Custom CSS source instead of adding another competing stylesheet. Post Content H2 margin changed from32px 0 16px to var(--wp--preset--spacing--70) 0 var(--wp--preset--spacing--50); first heading retains top0. Paragraph/list margins now top0/bottom existing spacing50. Removed obsolete cm-case-final rules. Existing Kit8 Kanit H1/H2/H3 roles remain unchanged; no new font values or Global Kit changes.
- Project Facts existing aside cmcs001: native20px padding, existing Global Light green background. Location cmcb001 remains before installation83d0898, bound to actual cm_location. Native custom Font Awesome map-marker-alt uses Global Accent #4E9D05, existing14px icon size,8px text indent and Global Text M typography; installation text uses the same global text role. Removed an inadvertently copied location class from the installation widget before final verification.
- Existing sticky rules retained: desktop>=1025, top88px/admin120px, bounded by content398064b9; tablet/mobile static and stacked.
- Per the owner's subsequent correction, deleted separate introductory Post Info cmgeoint. There is no standalone Installation in city line beneath the Hero summary. Location belongs in the main H1 and Facts, with a natural project-overview mention and SEO fields.
- No catalogue/filter/card settings, Global Kit, source CTA, integration pages, publication settings or media were changed. City/service integration blocks remain unpublished.

## Saved case changes

Fifteen posts have a location-aware Post Title/H1, custom AIOSEO title and meta description. Twelve newly receive existing cm_location terms; the three previously supported assignments remain intact. Overview changes mention the city naturally without changing technical claims;15791 already mentioned Wilmette and its overview was preserved. Hero excerpts and URLs remain unchanged. Shared cards automatically inherit the updated Post Titles.

| Case | Actual location | Basis / result |
|---|---|---|
|15832|Glenview, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15830|Wilmette, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15828|Winnetka, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15826|Glenview, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15824|Evanston, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15822|Wilmette, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15820|Wilmette, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15818|Winnetka, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15816|Glenview, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15814|Evanston, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15812|Evanston, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15810|Winnetka, IL|Owner confirmed tag; location/H1/overview/SEO saved|
|15793|Evanston, IL|Existing source-supported location retained; H1/overview/SEO saved|
|15791|Wilmette, IL|Existing source-supported location retained; H1/SEO saved; existing city mention preserved|
|15792|Glenview, IL|Existing source-supported location retained; H1/overview/SEO saved|
|15731|Unspecified|Specific conflicting-case update rejected by automatic review; unchanged|

Example15832:
- H1: 65-Inch Samsung OLED and Bose Soundbar on Stone in Glenview, IL
- SEO title: Samsung OLED & Bose on Stone in Glenview, IL | Chicago Mounting
- Meta description: See a 65-inch Samsung OLED and Bose soundbar installation on a stone fireplace in Glenview, IL, with a Sanus mount secured to wood studs.
- Facts: green native pin + Location: Glenview, IL
- Overview: We installed a 65-inch Samsung S95H OLED television and Bose soundbar above a fireplace in Glenview, IL, using a Sanus 4D Advanced mount.

## Actual verification

Authenticated public rendering was inspected after native saves, using the original case URLs. All16 pages were read in the final pass:
- Fifteen: H1 contains expected city/state; actual Location and green pin present; document.title and rendered meta description exactly match the saved intended strings.
-15731: actual Location absent, no city claim added to H1 or metadata.
- All16 retain robots noindex. No Plan a Similar Installation section remains in Post Content. Separate Hero geography widget absent on all16.
- All80 gallery links remain across12 galleries; counts by case:15832=9,15830=3,15828=7,15826=6,15824=6,15822=4,15820=4,15818=5,15816=12,15814=10,15812=7,15810=7. Original four have no gallery. These changes do not alter gallery URLs, order, alt text or media.
- Representative15832 at390x844: actual viewport confirmed, no horizontal overflow, H1 city wraps normally, green Location row visible, Facts static. At768x1024: column stacking/static Facts, no overflow, computed H2 Kanit60022px/24.2px. Desktop visual result and existing heading weight preserved.
- Native bottom-boundary measurement: Facts bottom and content-section bottom equal related-section top, so sticky does not enter Related Cases. Earlier in this browser continuation the short15791 bottom boundary and long-page layout were inspected. No new exhaustive scroll certification claimed.
- Native grouped lightbox opened all9 images on15832. A subsequent Next/Close check was interrupted by the tab navigating to the WordPress dashboard; fresh Next/Close success is NOT claimed. Previously documented lightbox tests remain historical evidence.
- Screenshots were visually inspected in browser tool output; no downloadable screenshot files were saved. Verification here records the actual DOM/computed-style measurements and inspected states, not a screenshot archive.
- No full filter retest was needed for these content/taxonomy/Single changes; completed filter configuration was not modified. No new-case publish test or exhaustive keyboard certification.

## Remaining

Specific confirmation for15731 Winnetka versus historical Streeterville conflict. Complete fresh representative lightbox navigation check if needed. Prior image-source/high-resolution/older-gallery-mapping limitations remain. Visual approval and final city/service integration launch remain with the owner. Noindex must remain until explicit indexing authorization.
