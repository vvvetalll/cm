# Case Study SEO metadata verification — 2026-11-11

## Result and root-cause investigation

**Owner clarification:** Screaming Frog reported the shared title on four filtered catalogue URLs, not on individual case pages. Those filter URLs are audited below and preserved. The16 canonical cases have no duplicate-title issue. Before making any website change, all16 anonymous case URLs already returned16 unique titles and16 unique descriptions. Every case was then opened directly in the supported WordPress/AIOSEO admin interface: saved values match public output. A second anonymous pass reconfirmed every result. Only catalogue15716 uses `Case Studies | Chicago Mounting`.

No production change was necessary or made. Re-saving correct fields, changing a working global template, or replacing dynamic tags with16 redundant overrides would not fix a demonstrated defect.

- Existing Chicago Mounting MCP successfully read catalogue15716 and Single15714.
- These are standard WordPress Posts, category144, not a Case Study CPT. Each admin page identifies its content as Post.
- AIOSEO Search Appearance → Content Types → Posts uses dynamic **Post Title + Separator + Site Title**, description **Post Excerpt**, search visibility **Yes**. Pages uses Page Title + Separator + Site Title. No constant Case Studies title was found in these defaults. No setting was saved.
- Fifteen cases have explicit unique SEO titles.15731 uses native Post Title/Separator/Site Title smart tags, resolving correctly to its approved city-neutral title. Catalogue15716 uses Page Title smart tags. Dynamic fields are not defects.
- Single15714 is the existing shared Elementor template. MCP structure and public HTML show case-specific H1/content; every public document head retains its case-specific AIOSEO title. No active Single-template HTML title override was observed; internal filter code/dynamic-tag binding was not inspected or changed.
- All16 public Open Graph titles/descriptions match their own SEO metadata. Blank saved Facebook overrides correctly inherit the SEO values. The existing global social-preview image remains intentionally shared.
- `Case Studies` is also the expected shared breadcrumb parent/category label. That label is not the individual HTML title. The owner identified the source as Screaming Frog and supplied four filter routes. Their shared title is catalogue metadata on non-indexable filtered variants; it is not a duplication defect across individual cases. No stale-cache or historical-defect claim is made.

## Before/after table — all16

Every row has unchanged before/after title and description because the starting values already satisfy the requested uniqueness. All16: reopened saved admin values match; HTTP200; self-canonical; indexable (no noindex or blocking X-Robots-Tag); one approved H1; schema/breadcrumbs unchanged. No post-save result is claimed because no save was needed.

| Case ID / URL | SEO title — before = after | Meta description — before = after | Saved/admin and public verification | Changes |
|---|---|---|---|---|
| [15832](https://chicagomounting.com/65-inch-samsung-oled-and-bose-soundbar-on-stone/) | Samsung OLED & Bose on Stone in Glenview, IL \| Chicago Mounting | See a 65-inch Samsung OLED and Bose soundbar installation on a stone fireplace in Glenview, IL, with a Sanus mount secured to wood studs. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15830](https://chicagomounting.com/85-inch-neo-qled-and-soundbar-on-a-brick-fireplace/) | 85-Inch Neo QLED & Soundbar in Wilmette, IL \| Chicago Mounting | An 85-inch Neo QLED and soundbar installation above a brick fireplace in Wilmette, IL, using a Sanus mount and masonry anchors. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15828](https://chicagomounting.com/77-inch-lg-w6-fireplace-installation-with-sonos-arc-ultra/) | 77-Inch LG W6 Fireplace Setup in Winnetka, IL \| Chicago Mounting | A 77-inch LG W6 fireplace installation in Winnetka, IL, with a recessed media box, Sonos Arc Ultra mount and LG Zero Connect Box. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15826](https://chicagomounting.com/85-inch-samsung-frame-tv-on-a-full-motion-mount/) | 85-Inch Samsung Frame TV in Glenview, IL \| Chicago Mounting | An 85-inch Samsung Frame TV mounted on drywall with wood studs in Glenview, IL, using a Sanus Preferred full-motion mount. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15824](https://chicagomounting.com/samsung-frame-pro-fireplace-installation-with-sonos-amp/) | Samsung Frame & Sonos Amp in Evanston, IL \| Chicago Mounting | A Samsung Frame fireplace installation in Evanston, IL, with a recessed outlet and a connection to a Sonos Amp in the basement. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15822](https://chicagomounting.com/100-inch-lg-qned-installation-with-home-audio/) | 100-Inch LG QNED & Home Audio in Wilmette, IL \| Chicago Mounting | A 100-inch LG QNED installation with home audio in Wilmette, IL. View the project details and photographs of the completed setup. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15820](https://chicagomounting.com/65-inch-samsung-frame-pro-with-a-recessed-outlet/) | 65-Inch Samsung Frame Pro in Wilmette, IL \| Chicago Mounting | A 65-inch Samsung Frame Pro installation with a recessed outlet in Wilmette, IL. View the wall-mounted TV and project details. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15818](https://chicagomounting.com/85-inch-sony-bravia-and-sonos-arc-ultra-installation/) | 85-Inch Sony BRAVIA & Sonos in Winnetka, IL \| Chicago Mounting | An 85-inch Sony BRAVIA and Sonos Arc Ultra installation in Winnetka, IL. Explore the project details and installation photographs. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15816](https://chicagomounting.com/77-inch-lg-g6-with-a-legrand-recessed-media-box/) | 77-Inch LG G6 & Media Box in Glenview, IL \| Chicago Mounting | A 77-inch LG G6 installation with a Legrand recessed media box in Glenview, IL. View the project details and installation gallery. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15814](https://chicagomounting.com/55-inch-samsung-oled-on-tile-with-mantelmount-max1/) | Samsung OLED & MantelMount in Evanston, IL \| Chicago Mounting | A 55-inch Samsung OLED installed on tile with a MantelMount MAX1 in Evanston, IL. Explore the installation details and project photographs. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15812](https://chicagomounting.com/77-inch-lg-c6-and-samsung-q990h-soundbar-installation/) | LG C6 & Samsung Q990H in Evanston, IL \| Chicago Mounting | A 77-inch LG C6 and Samsung Q990H soundbar installation in Evanston, IL, with concealed connecting cables and a recessed box for power equipment. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15810](https://chicagomounting.com/77-inch-lg-g6-installation-on-a-stone-fireplace/) | 77-Inch LG G6 on Stone in Winnetka, IL \| Chicago Mounting | A 77-inch LG G6 television installed on a stone fireplace in Winnetka, IL. Explore the project details and installation photographs. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15793](https://chicagomounting.com/85-inch-samsung-neo-qled-installation-evanston/) | 85-Inch Samsung Neo QLED in Evanston, IL \| Chicago Mounting | An 85-inch Samsung Neo QLED wall installation in Evanston, IL, with a recessed media box and concealed wiring behind the screen. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15792](https://chicagomounting.com/outdoor-tv-brick-installation-glenview/) | Outdoor TV on Brick in Glenview, IL \| Chicago Mounting | An outdoor TV and soundbar mounted on brick beneath a covered patio in Glenview, IL. See the installation photograph and project overview. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15791](https://chicagomounting.com/tv-wall-mounting-case-wilmette/) | TV Wall Mounting in Wilmette, IL \| Chicago Mounting | See our TV wall-mounting project in Wilmette, IL. Watch the original Chicago Mounting installation video and view the project overview. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |
| [15731](https://chicagomounting.com/samsung-frame-tv-installation-on-tile-in-winnetka/) | Samsung Frame TV Installation on Tile \| Chicago Mounting | See a Samsung Frame TV mounted above a tiled fireplace with a soundbar below the screen. Explore the installation overview, photograph and video. | Reopened: match; HTML200; canonical/robots/H1/schema pass | None required |

## Broader metadata/image audit

All16 titles are51–64 characters; descriptions122–145. These are descriptive installation-specific US English values, not16 copies of catalogue text. Preserved approved city assignments and city-neutral15731.15824 remains Samsung Frame family wording, without restoring the disputed Pro model claim.

All96 relevant featured/gallery media records have nonempty ALT and media titles; there are no exact duplicate ALT strings. Current public Media REST read succeeded with the explicit audit User-Agent. Captions: one nonempty,95empty; empty captions are not automatically defects. Gallery lightbox labels were inspected in HTML. No image URL/file/replacement/ALT/title/caption changes. The four existing96-image contact sheets were also reinspected in this session. All96current source URLs match that prior inventory. This is not new independent installation/city provenance certification or a fresh download/hash of all originals. Detailed96-record metadata is in the companion JSON.

Each case has one contextual service link in its actual Post Content; navigation/footer links are excluded from this count. One H1 then H2 sections and H3 related cards on all16. BlogPosting/WebPage and one BreadcrumbList resolve to Home → Case Studies catalogue → individual case. Featured image is present in the page/schema. Global social sharing image: https://chicagomounting.com/wp-content/uploads/2026/02/chicago-mounting-social-preview.jpg . No need to create empty-field overrides merely because social values inherit defaults.

| Case | Relevant featured + gallery images | ALT audit | Focus keyphrase status | Contextual service link |
|---|---:|---|---|---|
| 15832 | 10 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/fireplace-or-brick-wall-mounting/ |
| 15830 | 4 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/fireplace-or-brick-wall-mounting/ |
| 15828 | 8 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/recessed-media-box/ |
| 15826 | 7 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/frame-tv-mounting-chicago/ |
| 15824 | 7 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/frame-tv-mounting-chicago/ |
| 15822 | 5 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/premium-large-tv-installation/ |
| 15820 | 5 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/frame-tv-mounting-chicago/ |
| 15818 | 6 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/premium-large-tv-installation/ |
| 15816 | 13 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/recessed-media-box/ |
| 15814 | 11 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/fireplace-or-brick-wall-mounting/ |
| 15812 | 8 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/soundbar-installation/ |
| 15810 | 8 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/recessed-media-box/ |
| 15793 | 1 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/recessed-media-box/ |
| 15792 | 1 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/outdoor-tv-installation/ |
| 15791 | 1 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/tv-installation-and-mounting/ |
| 15731 | 1 | All present; preserved | Empty (native AIOSEO verified) | https://chicagomounting.com/frame-tv-mounting-chicago/ |

## Catalogue protection

Catalogue15716 URL: https://chicagomounting.com/case-studies/

- Before/after title: **Case Studies | Chicago Mounting**.
- Before/after description: Explore Chicago Mounting case studies for Frame TVs, fireplaces, large screens, outdoor TVs and home audio. Filter projects by collection and installation type.
- Native AIOSEO reopened: Page Title smart-tag template, correct description. Anonymous HTTP200/self-canonical/indexable. No catalogue design/filter/template/navigation/integration changes.

## Remaining admin checks completed — read only

- All16 native AIOSEO sidebar cards explicitly show **No focus keyword set**. The earlier14unknown statuses are closed. No analysis keywords were added.
- All16 case Advanced panels plus catalogue15716 were opened individually. Canonical URL override is empty on all17, correctly generating self-canonical HTML. Use Default Settings is off; all seven robots suppression checkboxes (No Index, No Follow, No Archive, No Translate, No Image Index, No Snippet, No ODP) are unchecked on every record. This matches public indexability. Nothing toggled or saved.
- Social Networks → Facebook was inspected. Default Post Image Source is **Default Image (Set Below)**, pointing to the existing chicago-mounting-social-preview.jpg. Posts object type=Article. The shared preview image is the configured selection, not a missing-featured-image fallback defect. No social setting saved.
- All96media source URLs match the prior96-image audit.92ALT values are identical; four15824values reflect the previously approved Frame Pro→Frame neutrality correction. Those current neutral descriptions match the inspected photographs and are preserved. All96have nonempty descriptive ALT and media titles; no exact duplicate ALT.95empty captions remain acceptable, without filler captions. Four existing contact sheets covering all96images were reinspected; no new original-file replacement/download or city inference.

## Unverified fields and limits

- Internal theme/plugin title-filter code and full Elementor dynamic bindings are not inspected; no active title-generation defect was found and installed-plugin source access is prohibited. Public output and saved supported settings were checked instead.
- A current binary hash/redownload of all96originals was not repeated. Photo review uses the existing contact sheets with all96live source URLs matched. Independent installation provenance and historic15731city remain unverified; no new location/model assertions.
- No new physical-device/layout regression test or search-engine index-coverage claim. This is read-only; existing two-pass headings/body/images/links/JSON-LD comparisons remain unchanged. No save/persistence experiment or production changes were necessary.

The companion JSON records exact titles/descriptions, canonical/robots, H1, OG metadata, schema types, image metadata, service links and unchanged comparisons. Report and knowledge files are the only repository changes; commit/push is verified separately.

## Screaming Frog filter-route clarification and verification

The owner clarified that the crawl's `Case Studies | Chicago Mounting` title applied to the TV/Soundbar, Evanston, Frame TV and Fireplace filters, with HTTP200 / Non-Indexable / Canonicalised,noindex. The owner did **not** report duplicate titles on the16canonical cases. This supersedes the earlier unresolved-source wording.

Fresh anonymous verification covers all11known single city/type routes, one filtered pagination route, catalogue page2 and the base catalogue. This matches the existing intended policy recorded before this task in public-launch-seo-verification-2026-11-11.json: filter variants noindex/follow and canonical to the unfiltered catalogue at the same pagination level. The unfiltered page2's pre-existing noindex/nofollow/self-canonical is recorded separately and preserved.

| URL | HTTP | Robots | Canonical | Interpretation |
|---|---:|---|---|---|
| https://chicagomounting.com/case-studies/2/ | 200 | noindex, nofollow, max-snippet:-1, max-image-preview:large, max-video-preview:-1 | https://chicagomounting.com/case-studies/2/ | Existing pagination policy; preserve |
| https://chicagomounting.com/case-studies/case-city-featured-city-glenview/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-city-featured-city-evanston/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-city-featured-city-winnetka/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-city-featured-city-wilmette/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-frame-tv-installation/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-fireplace-specialty-mounting/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-outdoor-tv-installation/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-large-premium-tv/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-standard-tv-mounting/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-recessed-media-installation/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-tv-soundbar-installation/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/case-installation-large-premium-tv/2/ | 200 | noindex, follow | https://chicagomounting.com/case-studies/2/ | Expected non-indexable filter variant; preserve |
| https://chicagomounting.com/case-studies/ | 200 | max-snippet:-1, max-image-preview:large, max-video-preview:-1 | https://chicagomounting.com/case-studies/ | Indexable base catalogue; preserve |

All four supplied routes and the other ten examined catalogue/filter/pagination endpoints retain their existing behavior. Shared titles on these canonicalized/noindex variants do not require individual-case SEO overrides, URL deletion, redirects, filter removal, template edits or indexing changes. Canonical is an HTML hint and noindex is an indexing directive; no assumption that Google has already processed either is made.

### Link and social-image availability

- https://chicagomounting.com/fireplace-or-brick-wall-mounting/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/frame-tv-mounting-chicago/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/outdoor-tv-installation/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/premium-large-tv-installation/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/recessed-media-box/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/soundbar-installation/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/tv-installation-and-mounting/: HTTP200 (text/html; charset=UTF-8).
- https://chicagomounting.com/wp-content/uploads/2026/02/chicago-mounting-social-preview.jpg: HTTP200 (image/jpeg).
