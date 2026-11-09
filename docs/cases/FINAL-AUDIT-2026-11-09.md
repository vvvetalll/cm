# Case Studies final audit and launch readiness — 2026-11-09

**Decision: GO for continued noindex review; NO-GO for public SEO launch and geographic/service integration release.** The catalogue works for the current 16 records. Remaining material issues are provenance/editorial labeling, inconsistent breadcrumb destinations, missing reusable page mappings and unverified recoverable hosting backup. Capacity at 10,000 records is unproven. Nothing was launched by this audit.

Scope: Chicago Mounting production; existing default branch `claude/chicago-mounting-zip-review-szeoup`. Current API, anonymous HTML, original media and browser checks supersede historical counts. No installed plugin files were inspected. No new cases, templates, plugins, taxonomies or public integration blocks were created. Global SEO, WooCommerce, existing geographic/service pages and shared design were not edited.

## Evidence and actual state

| Object | Current ownership / behavior |
|---|---|
| Catalogue 15716 | Published technical demonstration at https://chicagomounting.com/installation-case-studies-draft/ ; noindex. Native Loop Grid `52200b7`, category 144, eight posts/page, numeric pagination. |
| Case Card 15715 | Published reusable Loop Item; dynamic featured image, editorial tag badge, title and case permalink. Shared by catalogue and Single related section. |
| Single Case 15714 | Published; condition `include/singular/in_category/144`. Dynamic post title/excerpt/image/body and taxonomy facts. Not a per-case condition list. |
| Related grid `b0668c1` | Three latest category-144 posts, current post excluded. Label is “More Installation Case Studies”; not a similarity algorithm. |
| Filter Set 15744 | Published, post type Post, page 15716; bound query hash `fa84d59b7d802e8b71ff685edca5380a` (Posts #1 — Elementor). Result container `#video`. |
| Location filter 15958 | Uses editorial WordPress tags 152–155, prefix `case-city`; **not** factual `cm_location`. |
| Installation Type filter 15759 | Uses `cm_installation_type`, prefix `case-installation`; multiple types per case now represented. |
| Category 144 | `/case-studies/` was indexable and in category sitemap. Corrected to category-specific noindex; canonical and URL preserved. |
| Case population | 16 published, noindex. Draft-category query returned zero records; no temporary public fixture was created. All catalogue IDs match the published allowlist. |

The current default MCP endpoint `/wp-json/mcp/mcp-adapter-default-server` initialized successfully, exposed 36 tools and read Elementor structure for 15716. An initial tools/list request without the negotiated protocol-version header returned HTTP 400; adding the header resolved it. This is a verified connection, not merely saved configuration. No credentials appear in these artifacts.

Companion evidence:

- [Per-case content/SEO review](PER-CASE-AUDIT-2026-11-09.md): all 16 IDs, URLs, H1/SEO metadata, classifications, source limits and image membership.
- [Every-image audit](IMAGE-AUDIT-2026-11-09.csv): 96 attachments, actual file size/dimensions/hash, filename, title/alt, order, delivery and limitations.
- [Verification results](final-audit-verification-2026-11-09.json): exact saved-field checks, public responses, filters and unchanged shared objects.
- [Initial correction rollback](final-audit-corrections-2026-11-09.json), commit `052d6530a0fc3e91de04852a3bff8766b3c329ca`.
- [Contextual-link rollback](service-link-corrections-2026-11-09.json), commit `e36b5defda3fafd3731c9db20bc490655f229580`.

## Corrections completed and verified

1. Added supported secondary Installation Types to **13 existing posts**. Prior single-type classification hid relevant soundbar, premium and recessed-box jobs. Existing terms retained; no model/size/surface terms were created. Counts now: Frame 4, Outdoor 1, Fireplace & Specialty 7, Large & Premium 11, TV & Soundbar 8, Recessed Media 5, Standard 1. Premium matches the current service's OLED as well as large-display scope; a 55-inch OLED is not described as large. Recessed outlet alone is not a media box; 15818 explicitly cannot accept a box and remains excluded from that filter.
2. Replaced unsupported/generic SEO descriptions on 15731, 15791, 15792, 15793 and 15812 with source-supported descriptions. Improved excerpts on 15791 and 15792. No invented city, equipment or testimonial claims.
3. Replaced 94 filename-like/corrupted media titles with meaningful existing scene descriptions; all 94 exact values read back. All 96 attachment URLs and alt values preserved. No upload, rename, destructive recompression or unnecessary duplicate media.
4. Added **one contextual service link per case** by linking existing wording. All 16 saved bodies read back exactly and anonymous HTML contains the new link. Destination service pages were read-only and return 200. No standalone SEO paragraph or extra layout section.
5. Set category 144 alone to custom robots/noindex. REST POST returned 200 but did not persist the setting; this was detected, not reported as success. Saved via AIOSEO category UI, reopened checked state, verified REST `robots_default=false/robots_noindex=true`, anonymous noindex meta and removal from `category-sitemap.xml`. No Follow and other restrictive toggles remain off.

All 16 post IDs/slugs/URLs, featured IDs, factual Location arrays and four-city editorial tags are unchanged. Exact Elementor data, conditions and statuses of 15714/15715/15716 match the pre-audit snapshot. No global cache purge was required to see saved content, classifications, filtered results or category noindex.

Rollback: restore only affected post fields/media titles from the two linked before/after files, checking for subsequent edits first. Restore category's previous per-term robots settings only if explicitly desired; doing so would reopen indexing. These targeted exports are **not** a full-site recoverable backup. Hostinger backup completion, retention and restore path remain unverified; staging URL remains unconfirmed, not proven absent.

## Content and image findings

All 16 pages have one H1, distinct useful project text, unique SEO titles/descriptions, self-canonicals and noindex. Language is natural US English. Existing city mentions follow the previously approved editorial decision; this audit does not independently authenticate installations' cities. No repetitive city lists or duplicate full descriptions were found. Long H1s wrap naturally; SEO titles are separately concise. Short descriptions of roughly 41–84 words reflect limited source material; do not pad to an arbitrary word target. Four legacy cases lack additional original photographs.

**Provenance requires a release decision.** Editorial 4×4 grouping is preserved. Card badges/Location filter use those editorial tags; Single facts use `cm_location`. This distinction is not explained to visitors. Fifteen records have stored locations but these are not independent proof. Case 15731 remains neutral with actual Location empty because its earlier Winnetka/Streeterville evidence conflicts; its historic Winnetka slug and editorial badge remain. Do not manufacture a location to make the UI consistent. Case 15824 source says Frame Pro while visible packaging says The Frame: confirm the actual model from the job record before indexing.

96 original media files were fetched successfully and visually reviewed in four contact sheets: **16 heroes + 80 gallery images**, 95 WebP and one legacy JPEG. No empty alts and no exact duplicate binary hashes. Filenames are generally descriptive with retained camera-number suffixes; changing URLs solely to remove those suffixes is unjustified. Captions/descriptions remain optional: do not repeat all alt text below each image. Gallery sequence generally moves from equipment/preparation through mounting to finished views. Similar process views are not automatically duplicate assets.

Full-size total is **14,557,115 bytes**, excluding generated variants and older source uploads. Eight sources exceed 300 KB (16073, 16067, 16068, 16063, 16025, 16017, 16021, 15854); largest is 16063 at 550,370 bytes. These are lightbox originals with responsive thumbnail variants, not evidence that every page downloads all originals. Further quality/compression comparison belongs on a copy, preserving originals. Three legacy heroes have source limitations: 16087 is 736×414; 15888 is a 1280×720 video JPEG with side panels; 16086 is a landscape crop from older square media. Stronger originals are required for a genuine quality improvement.

Heroes have dimensions, responsive srcsets, high fetch priority and no lazy loading. Gallery images have lazy loading, dimensions and responsive candidates; WordPress/WP Rocket noscript copies were excluded from the image count. Desktop thumbnails are square (396×396 measured), mobile square (350×350); gallery anchors point to full images. Browser lightbox advanced from image 1 to 2, loaded the original 1200×1600 file and closed with Escape. Hero `sizes` remains a generic full-width declaration while layout is constrained: possible overdelivery, not a measured LCP failure. Do not alter global image/CDN settings for this module.

## Functional and responsive QA

| Check | Observed result |
|---|---|
| Base catalogue pages 1 + 2 | Eight + eight distinct IDs, union equals all 16 published cases. No duplicate/missing case. |
| Four city selections | Glenview 15832/15826/15816/15792; Evanston 15824/15814/15812/15793; Wilmette 15830/15822/15820/15791; Winnetka 15828/15818/15810/15731. All four anonymous filtered URLs match exactly. |
| Seven type selections | Anonymous results match actual term assignments. Large & Premium page 1 has eight; page 2 has 15812/15810/15793, completing eleven without overlap. |
| Combined filters | Mobile Glenview + Recessed Media returns only 15816; Glenview + Standard returns zero and the configured empty-result text. Earlier Glenview + Frame returned 15826. |
| Clear Filters | Returns base URL with eight first-page results and reset controls. |
| Keyboard | Select control opens with Enter; arrow/Enter selection produces a working combined filter. Escape closes dropdown/lightbox; gallery links receive visible native focus. Not a full screen-reader/WCAG certification. |
| Card/detail navigation | Native card link opens 15832 using Single 15714; Back to All Case Studies returns catalogue. All 16 target pages separately return 200. |
| Desktop 1366×900 | Four-column catalogue, 277px card boxes; 52px select controls. No document horizontal overflow. Single facts stick at top 120px after scrollY 1800. |
| Tablet 768×1024 | Two columns, 338px cards, 336.67×189.38px images (16:9), no document overflow. |
| Mobile 390×844 | One-column flow; working combined filters; facts before body, no sidebar quote duplicate. Fixed Quote/Call buttons measure 46px high. No document overflow. |
| Cropping | 16:9 card media, square gallery previews, full uncropped original in lightbox. Existing focal-point exceptions 16044/16040/16025 retained. |

Mobile selected-filter chips use an internal horizontal scroll strip; it does not overflow the page but the green scrollbar and clipped second chip are a minor polish/accessibility issue. Card CTA accessible names are repeated “View case study”; their surrounding headings provide context, but unique link names would improve screen-reader lists. Catalogue card headings are H3 directly beneath H1 with no H2 results heading: minor hierarchy debt. These were not addressed through unrelated design changes.

No visible overflow or abrupt content shifts were observed in these interactions. **No CLS/LCP/INP score was measured.** Anonymous full HTML fetches of 16 cases were about 1.9–2.9 seconds in the earlier sample; those include network/download and are not TTFB, Lighthouse or field CWV. Logged-in browser renders are not cache-performance benchmarks. GSC/CrUX and controlled anonymous performance measurement remain required before performance claims.

## Architecture and maintenance

- A single reusable Single and Card already avoid per-case template editing. Native post/term queries and numeric pagination should remain; no architecture replacement is justified by 16 records.
- Data owners: title/excerpt/body/featured image on the Post; installation classification in `cm_installation_type`; actual city in `cm_location`; approved editorial city in tag 152–155. ACF registration exposes the two custom taxonomies to Posts. They are public but `publicly_queryable=false`; do not link their generated query-string archive URLs as city/service destinations.
- No term-to-existing-page mapping is present. Store one page relationship per Location/service term when approved, render mapped links only when valid, and return no results when a selection mapping is missing. Never fall back to every post. Do not substitute editorial geography for verified provenance. Standard WordPress tags used for editorial grouping require an authoring rule to keep unrelated tags off case posts, or they can leak into cards/filter choices.
- Gallery content is hand-authored HTML with attachment IDs, slideshow grouping and responsive attributes. It renders well but is the clearest authoring bottleneck: define a reusable editor pattern or validated importer that emits the existing markup. New jobs must not require copying arbitrary CSS or editing templates. Keep job identity/upsert key separate from display title so imports cannot duplicate installations. Retain media IDs and original URLs.
- Scoped custom CSS exists in all three objects: Single roughly 3 KB, Card roughly 2.5 KB, Catalogue roughly 10 KB. Catalogue contains older three-column rules followed by four-column overrides and repeated spacing/corner rules. Card mixes native and Atomic elements with a generated selector `.e-1468a62-ecae` and hardcoded colors/fonts; fragile under widget replacement. An empty HTML widget `d7c8102` is unused. None is a demonstrated current functional failure. Consolidate on a cloned/staged layout with visual diffs, not speculative deletions on production.
- Single facts `cmcs001` uses existing global color reference `8fcd26f`; other scoped overrides bypass global tokens. Do not change the Global Kit to repair a local override. Hero trust/reviews shortcode is an existing CM dependency, not disposable HTML. No new custom JavaScript was added or necessary.
- Draft experiments 15781, 15839 and 15878 remain unassigned/draft; not deleted. Existing Article/product/header/footer conditions remain untouched.
- Dependencies observed: WordPress 7.1.4, Elementor 4.4.0, Elementor Pro 4.3.3, ACF 6.8.11, Filter Everything PRO 1.9.8, WP Rocket 3.24, AIOSEO/Pro 5.0.5, TinyPNG 3.8.1. No version upgrade in this audit. Elementor/Pro compatibility is a staging regression-test responsibility; different version numbers alone do not prove a defect. PHP 8.3.36/MariaDB 11.8.9/LiteSpeed; front-end WP memory setting 40M vs admin max 2048M warrants hosting review before scale, not a global setting change here.

## 10,000-record assessment

**Proven: 16 cases; not proven: 10,000-case throughput, latency, cache pressure or editorial operability.** WordPress term relationships support the model in principle. Bounded grids fetch eight records (catalogue), three (related), four (prepared integrations), rather than dumping 10,000 cards. However, result counts, joins for multiple taxonomies and deep offset pagination can still become expensive. Filter Everything's bound Elementor query works on current data; database plans, slow-query logs, object-cache status and cold-cache large-data behavior were not measured. No installed plugin internals were inspected and no production load data was generated.

Before a real scale commitment, benchmark a restored staging copy at representative population levels with anonymized content: unfiltered, each city/type, combined empty/non-empty filters, deep page offsets, cold/warm caches and concurrent reads. Capture p50/p95 server response, query counts/time, memory and invalidation cost. Use a query profiler/EXPLAIN through authorized staging tools; do not add indexes or rewrite queries without measured evidence. Keep a finite taxonomy vocabulary and avoid independent filters for TV model, bracket or every attribute. Two filters remain sufficient; Mounting Surface stays an attribute until enough consistently verified examples justify a third.

At the current image mix, 10,000 records would imply about **9.1 GB of these optimized originals alone** by simple arithmetic, before generated sizes, raw originals, backups and growth. This is storage planning, not a capacity/performance guarantee. Bound thumbnail sizes, retain originals, and plan media lifecycle and backup retention. ACF term relationships are preferable to broad wildcard postmeta text searches. Future additions should assign terms without editing page queries; adding a new city still requires its one-time mapping to an existing/new approved geo page, not a city×service explosion.

Current taxonomy saves became visible in public catalogue filters without manual cache purging. This does **not** prove invalidation of all 11 inactive integrations. The previously documented WP Rocket purge list is historical evidence; this audit did not independently re-open that global setting. Reconfirm consumers and test one legitimate assignment after an approved integration release. Avoid clearing all site caches on every imported case; measure fan-out before bulk publishing. Sitemap generation/sharding and Search Console coverage at 10,000 remain untested.

## The 11 prepared integrations — held, not public

Read `automatic-selections-prepared-2026-11-08.json` and every current destination. All 11 return 200; no `cm-case-selection` exists in current public HTML/Elementor trees. Snapshot configuration is category 144 AND the relevant editorial tag or service type, Card 15715, four items, 4/2/1 columns, empty message and matching View All filter URL. This audit validates the selection data against current terms; it does not claim current on-page runtime/mobile/cache verification for blocks that are not installed.

| Destination | Prepared selector / current eligible population | Placement recommendation from current page |
|---|---|---|
| Glenview 9833 | Category 144 + tag 152; 4 | After existing installation-project gallery, before FAQ; retain current videos/gallery. |
| Evanston 9987 | Category 144 + tag 153; 4 | Adjacent to existing recent-project material before FAQ/reviews; no duplicate introductory SEO paragraph. |
| Wilmette 9701 | Category 144 + tag 154; 4 | After existing examples, before FAQ; do not relabel editorial examples as independently verified local work. |
| Winnetka 9888 | Category 144 + tag 155; 4 | Same existing-project area, but resolve 15731 provenance/badge issue first. |
| Premium Large TV 15342 | Type 157; 11 eligible, grid shows 4 | After recent large-installation examples; retain useful process content. |
| Outdoor TV 11178 | Type 148; 1 | Use one relevant example after service explanation/before reviews; do not force four empty slots or modify product loop 11227. |
| Recessed Media Box 8156 | Type 159; 5 | Between box/options explanation and FAQ. Do not include outlet-only 15820 or no-box 15818. |
| Frame TV 5671 | Type 147; 4 | After existing recent Frame projects, before product/review material. Product loop `fc44ff4`, Card 10278 and product terms remain untouched. |
| Soundbar 3398 | Type 158; 8 | After process/benefits, before reviews; do not confuse existing speakers/Amp with soundbar installation. |
| Fireplace/Brick 3281 | Type 156; 7 | After existing real-work video, before FAQ. |
| General TV Mounting 1682 | Category 144; 16 | Optional four diverse examples after service overview; add only if it improves the page, not automatically. |

The snapshots automatically choose new term-assigned cases in principle, with no post-ID list. A missing/deleted-term failure must be explicitly validated on staging: do not assume native include-terms behavior fails closed. All publication remains held. Future term-page relations belong in one maintained mapping; no manual edits to each case template or each city's case list.

## Indexing, schema and release checklist

Verified now: all 16 cases and catalogue noindex; cases and catalogue excluded from post/page sitemaps; category 144 now noindex and excluded from category sitemap; all four editorial tag archives return 200/noindex. Custom Location/Installation Type taxonomies are not public queryable archives. Sample filter URLs are noindex with catalogue canonical. Catalogue page 2 is self-canonical with `noindex,nofollow`; review that follow policy at launch without changing global SEO settings now. Robots.txt permits crawling these pages so noindex can be read.

AIOSEO emits a single graph including BlogPosting/WebPage/Organization/Person/WebSite and BreadcrumbList. No unqualified Review schema was added. **Breadcrumb mismatch:** visible breadcrumb uses `/installation-case-studies-draft/`, schema's category item uses `/case-studies/`. Both resolve but represent different hubs. Decide the canonical public hub and use a supported scoped breadcrumb configuration; preserve current URLs unless an explicit redirect is approved. Do not add a second conflicting BreadcrumbList as a workaround.

Cases are reachable from catalogue and related cards; service links now point outward from every case. Broader geographic/service inbound discovery remains intentionally absent. This is a held release, not proof of a completed crawl architecture. No sitemap submission, URL-indexing request, new menu link or robots unblock was performed.

Release order after explicit approval:

1. Verify a completed Hostinger backup and a usable restore procedure; use staging if available. Keep targeted exports for every affected object.
2. Resolve 15731 location/editorial presentation and 15824 model ambiguity. Confirm editorial badge wording does not imply false provenance. Preserve the 4×4 editorial assignment unless owner changes it.
3. Align visible/schema breadcrumbs on the approved existing hub; implement/review reusable valid term-to-page relationships with fail-closed behavior. Keep unrelated queries unchanged.
4. Review one prepared integration in preview/staging, including empty/missing mapping, mobile, links and cache invalidation. Release one destination at a time only with approval, and revert the affected change on regression.
5. Approve only the specific case/catalogue URLs to index; remove their noindex individually, keep filter/tag/duplicate archive URLs excluded, verify followable pagination and one canonical per page. No mass city×service pages.
6. Verify fresh anonymous output and XML sitemap inclusion/exclusion, then submit the existing sitemap / inspect approved URLs in Search Console. No indexing guarantee follows from sitemap inclusion.
7. Measure real anonymous performance and field data as available; monitor crawl coverage, errors, duplicate canonicals and real business outcomes. Separately benchmark scale on staging.

Severity: **High before SEO launch** — provenance labeling and unresolved 15731/15824 facts; **High before structural release** — unverified recovery; **Medium before integration/SEO launch** — breadcrumb hub mismatch and missing reusable mappings; **Medium before scale** — manual gallery authoring, query/cache capacity unmeasured, media lifecycle; **Low** — CSS duplication, repeated CTA names, heading hierarchy and mobile chip scrollbar. Old low-resolution heroes are editorial quality limitations, not broken image delivery.

Primary technical references used for recommendations: [WordPress WP_Query taxonomies/pagination](https://developer.wordpress.org/reference/classes/wp_query/) and [Google noindex/crawl requirements](https://developers.google.com/search/docs/crawling-indexing/block-indexing). These explain supported mechanisms, not evidence of CM capacity or a promise of ranking.
