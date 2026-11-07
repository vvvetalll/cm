# Chicago Mounting — Case Studies recovery checkpoint

Date: 2026-11-07 (America/Chicago)

**Evidence:** A user-supplied read-only ChatGPT Work audit covering authenticated WordPress REST, Elementor MCP and frontend checks on 2026-11-07. All WordPress states below are **reported by Work**, not independently retested by the assistant saving this GitHub checkpoint. The GitHub default branch and earlier project records were separately checked.

## User-approved publication status (critical correction)

**The user explicitly authorized publishing all sixteen cases to review the real catalogue, with noindex while the content and design remain under review.** The twelve new published posts are **intentional**, not unauthorized releases. Do NOT bulk-revert them to draft, and do not mistake `noindex` for access control or WP draft status.

**Indexing gap identified by Work:** Catalogue **15716**, original **15731**, and all twelve new posts **15810–15832** emit `noindex`; three initial published cases **15791, 15792, 15793** do **not**. This needs a targeted noindex fix and independent frontend verification.

## Case inventory — sixteen published posts

All records are standard WordPress Posts in Case Studies category term **144**. Taxonomies: TV Wall Mounting **146**, Frame TV **147**, Outdoor TV **148**. All published case URLs reportedly returned HTTP 200. The twelve new records have no actual Location taxonomy assignment.

| Post ID | Title | Location term | Installation type | Featured image | Gallery / source |
| --- | --- | --- | --- | --- | --- |
| 15731 | Samsung Frame TV Installation on Tile in Winnetka | Winnetka 145 | Frame + TV | 9963 WebP | Original, no gallery |
| 15791 | TV Wall Mounting in Wilmette | Wilmette 149 | TV | 15794 JPEG | Original, no gallery; YouTube URL rendered as text |
| 15792 | Outdoor TV Installation on Brick in Glenview | Glenview 150 | Outdoor | 9974 WebP | Original, no gallery |
| 15793 | 85-Inch Samsung Neo QLED Installation in Evanston | Evanston 151 | TV | 10248 WebP | Original, no gallery |
| 15810 | 77-Inch LG G6 Installation on a Stone Fireplace | Unassigned | TV | 15834 WebP | Drive job 1; two-image gallery |
| 15812 | 77-Inch LG C6 and Samsung Q990H Soundbar Installation | Unassigned | TV | 15837 WebP | Drive job 2; two-image gallery |
| 15814 | 55-Inch Samsung OLED on Tile with MantelMount MAX1 | Unassigned | TV | 15838 WebP | Drive job 3; two-image gallery |
| 15816 | 77-Inch LG G6 with a Legrand Recessed Media Box | Unassigned | TV | 15842 WebP | Drive job 4; two-image gallery |
| 15818 | 85-Inch Sony BRAVIA and Sonos Arc Ultra Installation | Unassigned | TV | 15843 WebP | Drive job 5; two-image gallery |
| 15820 | 65-Inch Samsung Frame Pro with a Recessed Outlet | Unassigned | Frame | 15844 WebP | Drive job 6; two-image gallery |
| 15822 | 100-Inch LG QNED Installation with Home Audio | Unassigned | TV | 15845 WebP | Drive job 7; two-image gallery |
| 15824 | Samsung Frame Pro Fireplace Installation with Sonos Amp | Unassigned | Frame | 15846 WebP | Drive job 8; two-image gallery |
| 15826 | 85-Inch Samsung Frame TV on a Full-Motion Mount | Unassigned | Frame | 15847 WebP | Drive job 9; two-image gallery |
| 15828 | 77-Inch LG W6 Fireplace Installation with Sonos Arc Ultra | Unassigned | TV | 15848 WebP | Drive job 10; two-image gallery |
| 15830 | 85-Inch Neo QLED and Soundbar on a Brick Fireplace | Unassigned | TV | 15849 WebP | Drive job 11; two-image gallery |
| 15832 | 65-Inch Samsung OLED and Bose Soundbar on Stone | Unassigned | TV | 15850 WebP | Drive job 12; two-image gallery |

Media: twenty-eight distinct attachments checked; twenty-seven WebP and one JPEG; new twelve have galleries with two images each, including featured image. All checked original media URLs reportedly returned HTTP 200. Attachment **15861** has empty alt text. Some generated renditions may be larger than originals; full source-image provenance and optimization comparison incomplete. Initial four cases do not have comparable galleries.

Customer Drive folders **1–12** have job descriptions corresponding to the twelve new posts; those descriptions did **not** contain cities. Folders **13–16** have photographs but no description documents. No final proof of sixteen *different real-world jobs* or photographic match for all original records was established. Do not invent evidence.

## Elementor/content architecture — do not duplicate

| ID | Object | Status (Work) | Function |
| --- | --- | --- | --- |
| **15716** | Installation Case Studies — Draft | publish | **Canonical** catalogue; current URL `/installation-case-studies-draft/`; working filters / dynamic Loop Grid |
| **15715** | CM — Case Card — Draft | publish | **Canonical** reusable Loop Card |
| **15714** | CM — Single Case — Draft | publish | **Original** Single Case; currently renders only original four records due to explicit display conditions |
| **15744** | Filter Everything set | Frontend confirmed | Location + Installation Type filtering; backend publication status not verified |
| **15781** | CM Case Studies — Desktop Card Design Test | draft | Older design test with 9 dynamic cards; no working filter controls |
| **15839** | CM — Featured Project — Approval Draft | draft | Alternate Single design, preview context 15810; no display conditions |
| **15878** | Case Studies — 16 Project Editorial Review | draft | Static HTML 4×4 editorial review, not automatically synced with Loop Card |
| **4432** | Article | publish | General Article template currently renders **all twelve newer case posts**, unlike the original four |

Catalogue **15716**: Loop Grid widget `52200b7` uses Loop Card **15715**, category **144**, `posts_per_page: 16`. Filter shortcode widget `111a2a4` uses set **15744**. Clear Filters has the base URL without `#video`; the AJAX result selector `#video` is still correct. Catalogue location badges are present only on the original four; installation type badges are visually hidden by page-scoped CSS. A fixed per-page 16 result count is a scaling risk as records are added; pagination beyond 16 remains untested.

Original Single **15714** conditions are `include/singular/post/15731`, `.../15791`, `.../15792`, `.../15793`. New draft Single **15839** contains a dynamic featured image, title/excerpt, taxonomy sidebar, post content and CTA; it is not live. The original four display through 15714, twelve newer through general Article 4432. Choose **one existing Single** after preview approval, not a third.

The three separate related prototype/review objects are **15781** (catalogue visual test), **15839** (single design proposal), **15878** (static editorial review). They are not three equally functional Single templates. Do not delete, alter or publish prototypes without an ID-specific decision that preserves useful work.

## Editorial 4×4 preview — NOT Location taxonomy

The draft **15878** static preview uses the following illustrative assignments, each of the sixteen records exactly once:

| Target city group | Post IDs |
| --- | --- |
| Glenview | 15792, 15826, 15816, 15832 |
| Evanston | 15793, 15824, 15814, 15812 |
| Wilmette | 15791, 15820, 15830, 15822 |
| Winnetka | 15731, 15818, 15810, 15828 |

**These are editorial selections, not verified geographic provenance.** The user requested distribution of the cases to visualize the 4×4 catalogue; current taxonomy fields are not populated for the twelve new cases.

## Work-reported tests

- All sixteen case URLs HTTP 200; sixteen distinct post IDs rendered on catalogue.
- Desktop catalogue: four columns; mobile 390px: one column, no horizontal overflow.
- Location Winnetka + Frame returned 15731; Winnetka + Outdoor returned native empty state.
- Mobile Frame returned 15731, 15820, 15824, 15826.
- Both desktop/mobile Clear Filters reset two selections, restored sixteen cards and left URL free of `#video`.
- Draft 15878 showed four static groups of four; draft Single 15839 preview showed dynamic case 15810 and images.
- Frontend usage established the 15714/4432 Single split.

## Outstanding issues in priority order

1. **Indexing:** add and verify `noindex` for 15791/15792/15793; retain user-approved published-review state for all sixteen cases.
2. **Architecture:** use exactly one existing reusable Single for all cases (review 15714 vs 15839); avoid ID-by-ID template condition management and general Article 4432 fallback.
3. **Catalogue scalability:** remove the fixed sixteen-item ceiling using existing pagination/load-more as supported; test filtering/reset when the catalogue grows beyond sixteen.
4. **HTML/media defects:** duplicated H1 on 15791, 15792, 15793; broken Wilmette 15791 video embed; low-res JPEG featured 15794 (480×360); missing alt text 15861. Verify each specific fix.
5. **Content consistency:** original four lack matching gallery/description depth; some new cases link only to general services.
6. **Location/editorial mapping:** twelve new Location taxonomy values are missing; don't equate 4×4 review groups with verified job locations. Confirm or explicitly label decisions before any taxonomy changes.
7. **Code ownership:** audit page-scoped CSS, dynamic template responsibilities, scripts, duplicates; prefer native WordPress/Elementor/ACF/Filter Everything, no plugin source-file edits and no new parallel page systems.
8. **Operational:** verify case-category filtering of drafts, future pagination, source image matching, full mobile/keyboard QA and image/video performance.

## Next stage / safeguards

**No site changes are performed by this GitHub checkpoint.** User wants to preserve all work, avoid further duplicate pages or templates, and improve a scalable reusable system. Preserve the existing canonical catalogue **15716**, card **15715**, filter **15744**, and all sixteen case records. Protect the user's explicit approval to publish for preview with noindex. Make site changes as minimal ID-scoped patches and independently verify outcome; record each actual change in GitHub.

Current GitHub recovery report should be cross-checked against fresh WordPress reads before later production mutations.