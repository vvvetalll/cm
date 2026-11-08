# Single Case typography, photo sequence and actual location — 2026-11-08

This checkpoint supersedes earlier typography, gallery order and the unresolved15731 actual-location assignment. Existing canonical objects reused. No Global Kit, service page, Card15715, catalogue/filter settings, shared CTA source or city/service integration block edited.

## Global typography
Read actual Kit8 and service pages15342/3398; compared rendered3398 headings. Existing roles:

| Heading | Existing Kit role | ID | Weight |
|---|---|---|---|
| H1 | XL H1 Title | 78732fe | bold |
| H2 | L H2 Title | 4b3367a | 600 |
| H3 | M H3 Title | c569f17 | 600 |
| H4 | S H4 Title | b4aface | 500 |
| H5 | XS H5 Title | 1f5663e | 500 |
| H6 | XXS H6 Title | 7def6ec | 500 |

H1 widget59cad9c already used78732fe and computed700; retained. Facts headingcmcs002 now explicitH2/4b3367a, matching body section headings. Related headingb33e9d6 explicitH2/4b3367a retained. Post Content headings had a localKanit400 rule; replaced its typography declarations with references to existing4b3367a CSS variables. Its schema exposes no heading controls, so scoped variable references are necessary. Existing margins32px above/16px below retained; first bodyH2 has no top margin. Removed local letter-spacing variation. Reused related-cardH3 uses existingc569f17 variables in Single15714 only, without changing sharedCard15715 or catalogue typography. No invented sizes/weights/new global variables.

Computed Kanit typography:

| Viewport | H1 size/weight/line | H2 size/weight/line | H3 size/weight/line |
|---|---|---|---|
|1280|38.4 /700 /40.32px|23.04 /600 /25.344px|19.2 /600 /22.08px|
|820|30 /700 /31.5px|22 /600 /24.2px|16 /600 /18.4px|
|390|30 /700 /36px|22 /600 /24.2px|16 /600 /18.4px|

Actual desktop/tablet/mobile visuals inspected; no horizontal overflow. Mobile H1 line-height comes from the existing responsive Kit setting. Kit metadata compared equal before/after. Each of16 guest pages has oneH1; body sections/facts/related areH2, related cardsH3.

## Logical gallery sequence
Visually inspected every one of80 additional photos across12 existing galleries. Preserved every figure/image/link/alt/lightbox attribute exactly, changing only figure order. No new uploads, file replacements or image assignments. Hero remains excluded. Not inferred from filenames, dates or attachment order.

The following attachment sequences are final. Full per-image stage, alt/source URL, former order and uncertainty are in refinements-sequence-location-2026-11-08.json.

| Case | Ordered attachment IDs | Limit / uncertainty |
|---|---|---|
|15832|16070 → 16073 → 16069 → 16067 → 15861 → 16064 → 16071 → 16066 → 15850|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15830|16068 → 16065 → 15860|Only three additional photographs exist: packaging, measuring work and prepared bracket. Completed TV78 is Hero only. No separate final installation image can close this gallery without duplicating Hero.|
|15828|16060 → 16063 → 16058 → 16062 → 16061 → 16059 → 15859|72 has TV mounted but packaging in front;77 shows gloved contact. Both precede the unobstructed final side profile75.|
|15826|16055 → 16053 → 16056 → 16054 → 15858 → 16057|Extended mount67 is grouped with finished functional details after installer adjustment69; retracted front view66 closes the gallery. Setup screen does not establish final configuration.|
|15824|16049 → 16046 → 15857 → 16052 → 16050 → 16051|Last additional mounted-TV view still includes a ladder; clean completed view59 remains Hero only. Exact setup chronology is uncertain.|
|15822|16042 → 16048 → 15856 → 16047|Last image shows mounted TV powered to a setup screen; full configuration is not established.|
|15820|16045 → 16041 → 16043 → 15855|No additional completed-TV photograph apart from excluded Hero49. Last image is the installed recessed-outlet detail, not a full completed-TV view. Do not duplicate Hero to fabricate a final gallery image.|
|15818|16034 → 15854 → 16044 → 16040 → 16036|All final views show TV/soundbar mounted; supporting cables/equipment remain visible. Cleanup/completion of that equipment is not proven.|
|15816|16031 → 16039 → 16029 → 15853 → 16037 → 16035 → 16038 → 15842 → 16030 → 16033 → 16028 → 16032|Installer remains visible in34/35; these setup images precede unoccupied finished views. Relative chronology of preparation close-ups is uncertain.|
|15814|16022 → 16017 → 16025 → 16018 → 16027 → 15852 → 16023 → 16020 → 16026 → 16024|20 has mounted TV, protective sticker and ladder; treated as positioning/setup. Lowered/retracted finished views are functional positions, not a proven chronological sequence.|
|15812|16013 → 16021 → 16016 → 16012 → 16019 → 15851 → 16010|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15810|16007 → 16014 → 15835 → 16008 → 16009 → 16015 → 16011|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15793|No gallery|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15791|No gallery|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15792|No gallery|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|
|15731|No gallery|No gallery exists and no additional source-to-case mapping is verified; nothing to reorder.|

Relative order within one visible stage is a visual narrative, not exact capture chronology. Mounted/operational views do not prove full cleanup or device configuration. In15820, the last extra photo is an installed outlet detail; there is no separate completed-TV photo.15830 has only packaging/measuring/bracket extras; its only completed-TV photo is the Hero. These limitations cannot be fixed by reordering without duplicating Hero or adding an unverified photo.15824 ends on a mounted-TV view with a ladder still present; clean final view remains Hero. No verified photo was removed.

All12 raw saved bodies match the planned order. All16 anonymous HTML responses checked; gallery attachment sequences match after accounting for WP Rocket noscript fallback copies. Desktop15810 first image is packaging, Next is prepared wall; final group contains completed views. Mobile15832 first packaging, Next original wall, last wide finished installation; opening/closing/navigation checked. Existing responsive2-column/1-column gallery, optimized files/srcset and native Elementor grouped lightbox preserved. Transition animations required fresh state reads; exhaustive keyboard certification is not claimed.

## Actual geographic context
Native existing sidebarcmcb001 remains bound to cm_location with label Location:. Term names now include state (Glenview, IL / Evanston, IL / Wilmette, IL / Winnetka, IL); IDs/slugs unchanged. Editorial tags152–155 unchanged.

Added one native Post Info widgetcmgeoint to existing introduction, bound to the same cm_location, prefix Installation in. It is not per-case hardcoded city prose. Unknown terms omit the entire row/introduction widget; no empty label/fallback. Existing one-off overview geographic phrases removed from3 known cases to prevent an independent duplicate location source; technical statements retained. Existing navigation/source references retained.

| Case | Actual location status | Evidence |
|---|---|---|
|15832|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15830|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15828|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15826|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15824|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15822|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15820|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15818|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15816|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15814|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15812|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15810|UNVERIFIED|Existing audited source mapping/client material has not established an actual installation city. Editorial tag is excluded as evidence.|
|15793|Evanston, IL|Original attachment10248 caption and description explicitly identify Evanston, IL. No location inferred from filename.|
|15791|Wilmette, IL|Official Chicago Mounting YouTube oEmbed HTTP200: CPoIAAo42LI, title TV Installation in Wilmette, IL | Clean Wall Mount; author Chicago Mounting.|
|15792|Glenview, IL|Original attachment9974 caption and description explicitly identify Glenview, IL. No location inferred from image appearance/filename.|
|15731|UNRESOLVED_CONFLICT|Source audit: same photograph7316/9963 has Streeterville versus Winnetka assertions; actual-location term145 withheld pending reconciliation.|

Three source-backed locations are retained from the publisher's explicit original records:15791 official Chicago Mounting YouTube oEmbed title/author (HTTP200);15792 original attachment9974 caption/description;15793 original10248 caption/description. This is source attribution, not new customer-address/GPS verification. No inference from filenames, picture appearance or editorial city selection.

15731: identical photograph7316/9963 has conflicting Streeterville/Winnetka assertions. Removed only cm_location145 assignment from that post; term retained. Removed unsupported geographic phrase from overview, title and excerpt. Title now Samsung Frame TV Installation on Tile; original URL/slug unchanged. Editorial Winnetka badge/tag intentionally remains an editorial selection. This correction does not establish Streeterville as the actual case location. Twelve newer cases remain unassigned; no source-backed city was established for them.

Rendered verification: all16 guest pages200/noindex/oneH1/published;3 show Location and dynamic intro,13 omit both. Desktop15791 shows WilmetteIL; atscrollY1080 sidebarTop120,bottom374.84375,sectionBottom604.25. At lower boundary sidebar bottom equals section bottom244.25. Mobile15792 shows GlenviewIL/static/no overflow. Unknown15731 row/intro omitted desktop/mobile. Prior desktop/tablet/mobile typography and gallery checks preserved. Temporary viewport reset.

## Preservation and recovery
All16 Featured IDs, URLs and editorial tags unchanged.80 existing figure blocks preserved. No city/service blocks restored; final-launch hold remains active. No plugin files/global Kit/new taxonomy/new system edits.

Exact prior Single document, prior term names, previous15731 title/excerpt/term, old gallery orders and location phrase changes are included in the companion JSON for rollback. Existing image-inventory-2026-11-08.json remains the earlier media/crop snapshot; use this checkpoint's companion JSON for current order/location status. Remaining: source gaps noted above,13 unknown/conflicted locations, original4 missing gallery mappings and pre-existing image-resolution limitations; no invented fixes.
