# Single Case source audit and design review — 2026-11-07

Status: design/copy proposal only; awaiting approval. No WordPress mutations, media uploads, page/template creation, CSS/JS deployment or publication. Canonical Single remains 15714.

## Current-session evidence

- Direct authenticated Elementor MCP: initialize200, notifications202, tools/list200/22 tools and Single15714 structure200. Read source instructions on the actual default branch claude/chicago-mounting-zip-review-szeoup.
- Read all16 current posts in edit context and their exposed fields; ACF output is empty for all16. Read all646 Media Library metadata records across7 pages. Current client-media attachment parent fields are unreliable: gallery details15852–15861 and related images are parented to15812 despite belonging to different source jobs. Do not derive gallery membership from post_parent alone.
- Retrieved all123 original client image files from16 source folders and all12 accompanying client description documents. Decoded all123 without errors and visually reviewed every source in per-folder contact sheets, with larger selected views. No exact binary duplicates. Original bytes preserved in temporary working storage; no raw customer materials or source documents committed.
- Source orientations:112 portrait,10 square,1 landscape. The landscape image is packaging in unassigned source folder16. There is no genuine landscape finished-installation original in source folders1–12. Uploaded landscape derivatives were crops of portrait originals.

## Per-case verified inventory

| Post | Source folder | Original image files verified | Current matched site photos | Proposed gallery after one approved hero |
|---|---:|---:|---:|---:|
|15810|1|8|2|7|
|15812|2|8|2|7|
|15814|3|11|2|10|
|15816|4|13|2|12|
|15818|5|6|2|5|
|15820|6|5|2|4|
|15822|7|5|2|4|
|15824|8|7|2|6|
|15826|9|7|2|6|
|15828|10|8|2|7|
|15830|11|4|2|3|
|15832|12|10|2|9|
|15731|Unmatched|Not established|1|Unconfirmed|
|15791|Unmatched|Not established|0 + video still|Unconfirmed|
|15792|Unmatched|Not established|1|Unconfirmed|
|15793|Unmatched|Not established|1|Unconfirmed|

92 original images map to12 newer cases;24 are currently represented, leaving68 source images unrepresented. Folders13–16 contain6/7/6/12 images (31 total) without description documents or proved mappings to the four older posts. Do not conflate16 source folders with16 existing posts. Folder15 packaging identifies a different TCL98-inch project and must not be assigned to the Samsung Evanston record.

## Provenance issue

Visual comparison:7316 and9963 show the same photograph.7316 caption/alt attributes it to Streeterville, Chicago (65-inch Frame Pro);9963 description/caption/alt attributes it to Winnetka. The new copy withholds an asserted city and exact model/size for15731 until reconciled. No taxonomy or metadata was changed. Editorial tags remain separate from verified job provenance.

## Proposed design and copy

Simple CM-branded layout: existing header/footer, breadcrumb/title/introduction,16:9 hero,balanced description/details columns,natural-aspect gallery,related cases and one final CTA. Native Single15714 remains the implementation target. Hero selection must preserve the full screen and relevant mounting details; no portrait hero frame or fabricated replacement photo.

Prepared16 copy drafts:12 supported by original client descriptions plus corresponding photographs;4 evidence-limited drafts with explicit missing-source/claim notes. No filler added to make unsupported cases artificially long. Prepared a per-case original-vs-current/completeness review,proposed hero file and gallery membership,and123 proposed image descriptions. An ambiguous Sony model string is withheld;Samsung QN70F is supported by source packaging photo.

Representative preview uses all5 original images of15822/source7:IMG_9846 as a proposed16:9 crop plus the other4 as a natural-aspect gallery,without repeating hero in gallery. This set has no genuine landscape original; the preview does not pretend otherwise. All5 open full-frame in the local preview lightbox.

Gallery architecture after approval: arbitrary-length per-post collection through existing supported native WordPress/Elementor content/gallery controls,not hardcoded two slots or new templates. Existing Post Content is a per-post source; populated gallery/equipment custom fields were not found. Exact native dynamic gallery/lightbox binding must be confirmed during implementation before claiming support. No production custom JavaScript or plugin installation proposed.

## Verification and limits

Current live15822 desktop/mobile inspected with screenshots and current image/typography measurements. Revised local preview inspected desktop and390px contained mobile composition: hero16:9,4 gallery images at natural ratios,one content CTA,no detected mobile-stage overflow. Preview photo dialog opening and Escape close tested; production lightbox not certified. Temporary viewport API did not change the preview viewport for later820/320 attempts; these sizes are NOT claimed tested. Other hero crops remain proposals,not individually approved crops. Full pixel-level forensic review and model-label verification for every source image are not claimed.

Private review deliverable contains the visual preview,all16 draft descriptions,current-publication comparison,confirmed/missing claims,hero/gallery plan and source-file alt inventory. No customer originals or raw notes in GitHub. Next: user reviews design/copy; resolve4 older source mappings and15731 location conflict; then obtain implementation approval before any site change.
