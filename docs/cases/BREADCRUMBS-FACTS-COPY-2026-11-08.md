# Case Studies correction checkpoint — 2026-11-08

## Status

Production changes are saved and anonymous server-rendered HTML is checked for all 16 cases. **Final visual and interaction certification is incomplete.** Do not treat this checkpoint as final launch approval.

Current default branch was verified as `claude/chicago-mounting-zip-review-szeoup`. Read AGENTS, README, PROJECT, WORK, latest CHANGELOG and MCP-CONNECTION. Reused the latest FINAL-CONTENT-GALLERIES report and its source inventory rather than rebuilding the system.

## Connection and supported editing path

Direct authenticated HTTPS initialization returned HTTP 200, protocol 2025-11-25, session header received; initialized notification 202, tools/list 200 with 22 tools, Single 15714 structure 200/isError=false. Secrets stayed in memory. Existing legacy widgets are not writable through the MCP atomic-element tool, so their existing native settings were changed through registered WordPress REST meta, then saved/published through Elementor MCP. No installed plugin files, OAuth, new connection configuration or GCPRO access.

Before-edit Single metadata and all 16 public Post Content bodies are in before-breadcrumb-facts-copy-2026-11-08.json, committed before mutation (96cd96f). Native revisions also retain the post body edits.

## Single 15714 changes

- Physically moved existing breadcrumb widget a4a0776 to index 0 of existing heading container 0bae6cd, before H1 59cad9c and summary 0981606. Removed its ineffective _flex_order setting. Existing Home/Case Studies links and breadcrumb styling retained. Featured widget 592c353d remains after that container.
- Existing Facts cmcs001 retains Global Light green 8fcd26f (#EFF2EF), 10px radius and 20px padding. Explicit native tablet/mobile padding and radius match desktop; native gap reduced 20 to 16px.
- Location cmcb001 retains dynamic cm_location, existing map marker, green Accent and Text M. Installation 83d0898 retains dynamic cm_installation_type; changed hidden/user-circle icon to native Font Awesome TV, show_icon=custom, label Installation Type. Both native icon sizes 18px, text indent 8px; mobile custom-width units corrected to percent.
- Existing Kanit global heading 4b3367a retained. Quote cmcs004 and adjacent invitation cmcs003 use native hide_mobile, avoiding a second sidebar quote action alongside the existing global mobile CTA. Global CTA unchanged.
- Sticky rules and containing content section retained: desktop >=1025 sticky, tablet/mobile static, Related Cases outside the containing section. These are inspected settings/CSS, not newly observed scroll behavior.
- No Equipment field exists in exposed ACF/meta data. Omitted the optional row rather than introducing fields or parsing specifications into a new architecture. Verified equipment remains in stories.
- Catalogue 15716, Card 15715, Filter Set 15744, global Kit, Header/Footer, related cards and native final CTA were not changed.

## Copy correction

Rewrote all 16 stories again to remove filler, visual-description repetition and redundant two-section layouts. Most cases now have one useful Project Overview paragraph; only 15810 and 15818 retain separate Installation Details for their distinct technical constraints. Older evidence-limited cases remain brief. We/our-team voice retained; no unsupported technical detail added.

Facts come from the previously audited customer-note/source inventory documented in FINAL-CONTENT-GALLERIES-2026-11-08.md and existing records; this continuation did not retrieve new raw customer notes. Existing equipment models retained from that inventory. Original 9974 caption/description was read again and explicitly mentions Glenview brick-wall outdoor/soundbar installation; no weatherproof guarantee was added.

All 16 REST writes returned HTTP200 and exact intended content. Subsequent anonymous HTML checks verified the new prose appears. No internal source/editorial language or standalone non-gallery story links remain. All figure markup, video blocks and media order compare exactly with the pre-edit backup. No image file was changed.

Post titles, excerpts, URLs, featured IDs, both taxonomy assignments and editorial tags compared unchanged after writes. AIOSEO fields compared unchanged except automatic updated/seo_analyzer_scan_date timestamps.

## Galleries and source limitations

Reopened the four existing source-folder contact sheets (13–16; all 31 photographs represented) and the four older case reference images. Folder13 has a conventional mantel/Frame installation;14 a different full-motion fireplace;15 a 98-inch TCL installation;16 an LG installation with contrasting marble surround/built-ins. None establishes ownership for the older four cases. Reused the prior actual Media Library audit; did not claim a new exhaustive Library scan.

No verified additional image was found for15731/15791/15792/15793. Kept Featured images and existing videos, no unrelated image or duplicate Hero. Existing 80 images in12 galleries remain unchanged, including source ordering and focal positions. Existing Single CSS retains1:1 cover thumbnails and uncropped original lightbox links, Hero16:9.

| Case ID | Additional gallery photos | Current dynamic location |
|---|---:|---|
| 15832 | 9 | Glenview, IL |
| 15830 | 3 | Wilmette, IL |
| 15828 | 7 | Winnetka, IL |
| 15826 | 6 | Glenview, IL |
| 15824 | 6 | Evanston, IL |
| 15822 | 4 | Wilmette, IL |
| 15820 | 4 | Wilmette, IL |
| 15818 | 5 | Winnetka, IL |
| 15816 | 12 | Glenview, IL |
| 15814 | 10 | Evanston, IL |
| 15812 | 7 | Evanston, IL |
| 15810 | 7 | Winnetka, IL |
| 15793 | 0 | Evanston, IL |
| 15791 | 0 | Wilmette, IL |
| 15792 | 0 | Glenview, IL |
| 15731 | 0 | Not assigned; preserved |

15731 has no existing cm_location assignment; the complete empty Location widget remains omitted by existing CSS. The approved editorial Winnetka tag is preserved. This task did not alter geography or resolve historical physical-location provenance.

## Cache defect found and corrected

Anonymous HTML initially used updated markup but WP Rocket's background-CSS cache served an older post-15714.css: Facts padding0, gap20 and no background/radius. Direct generated Elementor CSS already contained the new settings. This was actual cache evidence, not an inferred design defect.

Used the existing registered Hostinger clear-cache REST endpoint; HTTP200 returned purged=true/skipped=false. Subsequent plain public URL linked a regenerated background-CSS asset containing Light green token,20px padding,10px radius,16px gap,18px green TV icon and native responsive values. No cache/security configuration or plugin files were changed.

## Actual checks and limits

All16 original plain public URLs fetched anonymously, each HTTP200, noindex, one H1, breadcrumb markup before H1, current story, no internal prose, no non-gallery inline story links, green TV icon markup and native hidden-mobile sidebar Quote class. All16 remain publish by authenticated REST. All80 gallery lightbox memberships retained. Back navigation, Related grid and native final CTA were present in the first all16 pass. Link targets retained; no new click or playback test claimed.

Fetched and inspected generated public CSS for native Facts background, responsive padding/radius, type-icon color/size and existing sticky/gallery media rules. **CSS/HTML evidence is not a rendered desktop/tablet/mobile visual test.**

Visual runtime blockers in this session:
- CUA browser initialization failed: windows sandbox orchestrator_helper_incomplete, setup helper exited before setup completed.
- Native Windows automation helper failed: failed to launch codex app-server: program not found.
No screenshots of current rendered pages, computed responsive positions, overflow checks, actual sticky scroll, keyboard navigation, lightbox Next/Close or fixed-CTA visibility were completed here. Historical tests remain historical.

## Next checkpoint

Restore a functioning browser surface, then inspect all16 at desktop/tablet/mobile for breadcrumb positions, card background/padding/alignment, no duplicate mobile quote, bounded sticky, square crops/lightbox, links and overflow. Fix any observed issue within15714. Do not announce the full project finished before this visual/interaction pass. Four old galleries require genuine matching photographs; no upload is warranted without them. City/service integration blocks remain unpublished and all16 noindex.
