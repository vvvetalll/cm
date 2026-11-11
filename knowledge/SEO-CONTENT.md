# SEO and content
Updated: 2026-10-26.

## Agreed direction
- Focus geo work on Glenview, Evanston, Wilmette and Winnetka.
- Keep a clear distinction between general services, model/service-specific pages and actual city installations.
- Real installation location is mandatory for video titles, descriptions and city-page placement.
- Use corresponding service/city links and a clear quote or booking CTA.
- Never claim all installations are same-day; scheduling depends on availability and location.
- Current live content is authoritative. Search snippets, cached pages and historical audits cannot prove a present discrepancy.

## Premium & large TV
Live page: https://chicagomounting.com/premium-large-tv-installation/
H1 observed: Premium & Large TV Installation in Chicago.
Content direction from earlier work: large/high-end TVs, including 85/98/100-inch examples, mounting support, hidden cables, recessed solutions and careful installation. Do not claim a specific model, size or project detail without evidence.
One video currently observed: CorXHd53U5M. A second suitable premium TV installation can be added after inspecting existing layout and avoiding duplicates.
User authorized finding pages lacking a second relevant video, including this page. This is not authorization to falsify installation cities.

## Shorts format
1. Title: clear model/service + actual city when confirmed. No hashtags in the title.
2. Description: factual project summary, relevant service/city URL, phone 224.519.8272, service-area wording.
3. Hashtags: a few relevant model/service/geo terms at the end; no #foryou.
4. Tags: separate field; model, installation/mounting, relevant city, Chicago Mounting.
5. Preserve existing thumbnails/visibility and unrelated settings.
6. Category observed on recent edited videos: Howto & Style.
7. Do not change unknown AI/promotion declarations by guessing.

User's coverage target: at least two Shorts with each target city in the title, using real work from that city. This is a content coverage goal, not a ranking guarantee.

## Current geo title coverage (52 Shorts reviewed 2026-10-26)
| City | Count | Examples |
|---|---:|---|
| Glenview | 1 | TV Installation in Glenview, IL — Frame TV & Recessed Box |
| Evanston | 1 | TV Installation in Evanston, IL — Clean Wall Mount |
| Wilmette | 2 | Clean Wall Mount; Samsung Frame TV Installation in Wilmette, IL — Unboxing |
| Winnetka | 2 | Frame TV Setup on Tile; 100-inch LG QNED installation |

Counts refer to YouTube titles, not the number embedded on city pages.
Details and video IDs: VIDEOS.md.

## Historical work requiring verification
- /find-near-me/: coverage hub and ZIP checker placement; preserve useful URL/intent and avoid bloated keyword text.
- Lead/conversion analytics validation and internal links were proposed SEO priorities; completion unknown.
- Blog metadata, content updates and font styling were discussed; no complete approved style sheet or article inventory recovered.
- Premium AV expansion was explored. Treat a broader AV/rebranding strategy as research until the user approves specific work.
- No new performance, traffic or ranking claims have been verified in this consolidation.

## 2026-11-06 — Geo pages and projects system: assessment and proposed start

**User request:** assess how to implement the GCPRO-style geo/project/filter system on Chicago Mounting. Assessment complete; implementation, plugin installation and migration have not started. Preserve the September redesign and current city URLs.

### Evidence read in this session
- GitHub default branch confirmed as `claude/chicago-mounting-zip-review-szeoup`; recursive tree contains ZIP Checker source/tests/releases and knowledge, but no complete WordPress/Elementor export or Projects implementation.
- Fresh anonymous HTTP on 2026-11-06: /find-near-me/ and all four /tv-installation-in-{glenview,evanston,wilmette,winnetka}/ routes returned 200 with their self-canonicals. Hub H1 is now “TV Mounting Service Areas in Chicago”. This supersedes the historical H1 expectation only; no page text was changed.
- /projects/ returned 404. Public /wp-json/wp/v2/types and /taxonomies returned 200, exposing no project type or project service/location taxonomy. This is evidence about public REST visibility, not a full authenticated inventory of registered types/plugins.
- Hub HTML references cm-zip-checker assets. This does not certify its runtime/version/coverage or remove the documented production-readiness caution.
- Existing case /samsung-frame-tv-pro-fireplace-installation-with-mantelmount-mm815-and-rb100-recessed-box/ returned 200/self-canonical. Public posts API identifies it as Post10089. Search-service text describes Chicago; direct HTTP confirms route/type, not independent job provenance. Retain its URL/content; do not create a duplicate indexable case or assign it to a suburb.
- GCPRO reference: repository main tree eb08384e51ba78eeffbe100d1e70742cfd477c49; docs/components/projects-acf-prototype.md and docs/projects/projects-catalogue-facets.json. Latest documented architecture uses ACF Free Projects CPT, service/location/sector taxonomies, shared Single2231/Card2233/Archive2232, Elementor Loop Grid and WP Grid Builder with official Elementor add-on. Service/location/property facets, reset and Load More are documented. Newer records use /projects/, superseding earlier /portfolio/ history. This session reviewed repository evidence, not GCPRO runtime.
- Important reuse limit: GCPRO has later scoped PHP for Atomic metadata and numbered-pagination/Load More coordination. Do not copy its site-specific IDs, hooks, CSS, redirects or assumptions into CM. Earlier native-filter-only notes are historical.

### Proposed architecture — not yet implemented
| Owner | Proposed CM responsibility |
|---|---|
| Projects content type | One record per real installation; candidate key cm_project, candidate archive /projects/ after authenticated route/rewrite checks |
| Location taxonomy | Confirmed actual city; one project location initially; not a coverage entitlement or office claim |
| Installation/service taxonomy | Relevant installation categories aligned to existing service pages; multi-assignment permitted; do not mix TV brand, mount mechanism and municipality into one taxonomy |
| Standard project content | Native title, excerpt, featured image and body; optional short card title/video URL/equipment details only where needed; no client address/name |
| Single Project template | One dynamic opening, concise verified work description, photos/video and quote CTA |
| Project Card template | One shared image/title/location/link presentation reused in archive, city and service queries |
| Project archive | Elementor Loop Grid + WPGB official Elementor integration for matching GCPRO-style combined facets; begin with City and Installation Type, Clear filters and one pagination owner |
| Existing city Pages | Retain current URLs, metadata and useful copy; add automatic published-project query constrained to that city's term |
| Existing service Pages | Reuse the card with a service-term query; no manually maintained project-ID lists |
| /find-near-me/ | Preserve existing coverage hub and ZIP checker; city links and coverage confirmation remain distinct from project inventory |

Use ACF Free for the content model, subject to checking existing installed owners first. Use the existing supported Elementor architecture rather than assuming CM uses GCPRO's Atomic version. WPGB licensing/installation and version compatibility on CM are unverified; no purchase made. Do not introduce Residential/Commercial, brand, screen-size or mount filters until populated material makes them useful.

For a minimal global gallery, test the existing Elementor attachment-gallery pattern first. An attachment has one parent: do not silently reassign media from existing articles/pages. If curated reusable ordered galleries are necessary, reassess the field implementation then; no ACF PRO purchase is presumed.

### First implementation sequence
1. Inspect authenticated CM plugins/versions, Theme Builder, global styles, existing project-like Posts/Pages, media relationships and staging availability. Preserve recoverable affected configuration before changes. Public REST visibility is insufficient to skip this inventory.
2. On staging, register the minimal model and build one Single, one Card and one archive. Pilot Winnetka because repository VIDEOS.md already records two distinct local videos (kO1vrsAiCkw, CorXHd53U5M). These are candidate evidence, not two ready project records; verify provenance, source photos, scope and duplication before publication.
3. Populate a small set of verified installations spanning enough cities/services to test combined filtering. Each job is entered once. Keep incomplete records Draft; omit unsupported fields.
4. Add an automatic Winnetka selection and one relevant service selection. A newly Published matching project must appear without editing either page; returning it to Draft must remove it.
5. Verify City + Service intersection, empty-state/reset, keyboard/focus, mobile, full-size images/video, and pagination without duplicates. Test direct page 2 plus Load More if both exist; do not transplant GCPRO's workaround without reproducing a need. Check guest responses, canonical/indexing rules and draft exclusion.
6. Extend the proven selection to Glenview, Evanston and Wilmette using only real local cases. An empty local collection should not present another city's work as local. No city×service mass page generation.
7. Preserve Post10089 and any other indexed case URLs during initial pilot. Before any migration, inventory IDs/URLs/SEO/media and choose one canonical owner per case; test redirects only if an explicit later move requires them. Geo landing URLs do not need migration.
8. Before production launch, check links/forms, archive and case SEO, filter URL indexing and rollback. Candidate policy: index useful archive/case/city/service owners, keep arbitrary filter combinations out of the sitemap and avoid indexable facet duplicates; validate implementation against the actual SEO plugin.

**Next concrete task:** authenticated environment/content inventory, followed by a staging prototype with Winnetka as the first city consumer. No website writes, new plugins, migrations, visual QA, filtering tests or ranking claims occurred in this assessment.


## 2026-11-06 — MCP connection and pilot readiness check
Verified local Codex configuration at ~/.codex/config.toml; added chicago-mounting-elementor for https://chicagomounting.com/wp-json/elementor/mcp/ while preserving existing servers. Credentials remain only in private local configuration. No mcp-config.json created. Initial initialize returned HTTP 403; retry with explicit client User-Agent completed initialize (Elementor MCP v1.0.0, protocol 2025-11-25), notifications/initialized and tools/list. Authenticated read-only elementor-list-posts confirmed published Winnetka Page9888 at https://chicagomounting.com/tv-installation-in-winnetka/; also Premium15342, Evanston9987, Glenview9833, Wilmette9701, hub6213. Direct protocol verification succeeded; tool activation in a fresh Codex session remains unverified.
Authenticated elementor-list-site-parts returned existing Elementor-owned templates including Loop11436, Product Card10278, product archives10769/10767/10276, product10701, POST HEADER9516, BLOG CTA8985 and global popups10978/10974/10965/10957/10937. These are existing owners, not approved Projects templates; no conditions or designs changed. Global style owner/kit and full template bodies remain unverified.
Authenticated GET /wp-json/wp/v2/plugins succeeded once; observed active WooCommerce11.2.1, WP Rocket3.23.5.1, Real Media Library4.23.7, Redirection5.10.1, WPForms Lite2.0.3.1. Follow-up inventory request returned HTTP503, interrupting compact version inventory and page-structure inspection. ACF/WPGB/license compatibility and exact Elementor versions remain unverified; do not infer absence from this partial record. ZIP Checker code stays at cm-zip-checker/, packages dist/, tests tests/; no code changed.
Read repository AGENTS.md, README.md, knowledge/PROJECT.md, WORK.md, SEO-CONTENT.md and CHANGELOG.md. GitHub authenticated metadata confirms push permission and default branch claude/chicago-mounting-zip-review-szeoup.
Readiness: NOT READY for first Winnetka staging pilot. Staging URL/access, backup/rollback, global style ownership, full plugin/dependency inventory, candidate job provenance/media and shared Single/Card/archive owners remain to be established. Next: restore stable read access, finish inventory and obtain verified staging URL/access, then follow the existing SEO-CONTENT rollout. No site writes, installations, URL changes, design changes or runtime filter tests performed. This entry is saved in its file's Git history; remote readback verifies persistence.


### 2026-11-06 — Checkpoint continuation: maintenance blocker
Continued from the preceding checkpoint; no audit restart or site writes. Current session tool registry contains gcpro-restoration-elementor only, not chicago-mounting-elementor: automatic loading is NOT confirmed and no native CM read tool is available. GCPRO was not used as a substitute.
Two bounded authenticated requests, one attempt each:
- GET https://chicagomounting.com/wp-json/wp/v2/plugins?_fields=plugin,name,version,status → HTTP503.
- POST https://chicagomounting.com/wp-json/elementor/mcp/ with JSON-RPC initialize (protocol 2025-11-25) → HTTP503.
Both returned exactly: `{"code":"wp_die","message":"Briefly unavailable for scheduled maintenance. Check back in a minute.","data":{"status":503},"additional_errors":[]}`. Stopped further site requests; no retry loop. This supersedes the earlier assumption of an unexplained intermittent 503 with an observed WordPress maintenance response; cause/duration are unknown.
Remaining unverified: installed Elementor/Pro versions, ACF and WP Grid Builder/add-on presence, active Global Kit ID, actual global/page/custom CSS owners and relevant template bodies. Previously read template IDs remain historical checkpoint evidence, not newly verified.
Staging/backup: repository search for staging backup returned no matches; docs/REVIEW-REPORT.md contains a proposed staging/backup procedure, not evidence of an existing hosted staging site or completed backup. No verified staging URL or backup timestamp/restore point is available. Absence of either is NOT established; hosting dashboard access is needed. Production must not substitute for staging.
Pilot reuse: existing Winnetka Page9888 and original URL /tv-installation-in-winnetka/, existing design and documented candidate videos kO1vrsAiCkw/CorXHd53U5M; content provenance/media still need validation. Existing Elementor product templates remain untouched and must not become case templates. Still to create on verified staging after dependency checks: minimal Projects model and location/service taxonomies, dedicated Project Single/Card/archive, filters and automatic Winnetka query. No existing case template is certified reusable.
Next concrete step: obtain hosting-panel read access or verified staging URL plus latest completed backup/restore-point evidence; after maintenance ends and CM tools load in a fresh session, make one small plugin inventory read and inspect Kit/template owners before any prototype. Readiness remains blocked. No configuration or site changes in this continuation.


## 2026-11-06 — Native Chicago Mounting MCP verified
Current client session now exposes chicago-mounting-elementor tools. Native elementor_get_page_structure(post_id=9888) succeeded, returning Winnetka HERO/INTRO/VIDEO/PHOTO/FAQ sections, video widgets10546bbf and d108f5d, and gallery165f03d6. This supersedes the prior native-tool-unavailable checkpoint; the tested read no longer returns503. It does not establish all endpoints are healthy. Existing shared/global/template references remain intact; no site writes. Requested ~/mcp-config.json and actual ~/.codex/config.toml were read back: CM URL and authorization agree, with no secret included here. Restart is unnecessary for this session because the native tool already executed successfully. Work targets Chicago Mounting only; GCPRO is conceptual reference only. Plugin versions, active Kit/style ownership, staging and backup remain pending; next step is the previously requested bounded read-only inventory.

## 2026-11-06 — CM implementation decision: geo-linked installation cases

### Scope and verified delta
Research only; no WordPress writes, installations or migrations. Continue prior checkpoint. Native CM MCP read the remaining city trees (9833 Glenview,9987 Evanston,9701 Wilmette); reuse prior verified9888 Winnetka tree. All have HERO, INTRO, ADVANTAGES, STEPS, VIDEO, PHOTO, reviews/TVs, CTA, FAQ and SEO sections; ordering varies. Add one dynamic case block near VIDEO/PHOTO; do not rebuild geo pages or remove useful content.
Frontend HTML of all four uses elementor-kit-8. Shared rendered documents include Header7491, Footer5085, Steps4290, CTA3092, Product Card10278, plus2164/2157/12405/12415/11040 (precise roles of those remaining IDs not established). MCP confirms Article4432 condition include/singular/post and Blog4420 include/archive. Product templates10278/10701/10276/10767/10769 are not case owners and must remain unchanged.
Style owners: Kit8; page-local Elementor settings; shared template settings; WordPress Additional CSS (wp-custom-css). WP Rocket outputs wpr-usedcss, a generated delivery layer, not the editing source. MCP Atomic global-variables returned total0; this does NOT mean classic global styles are absent. Exact per-property cascade and all custom CSS rules remain implementation-time inspection; no design rewrite justified.
Authenticated small plugins GET now succeeded: Elementor4.3.6, Pro4.3.3, ACF Free6.8.11, Filter Everything/PRO1.9.8, AIOSEO/Pro5.0.5, ZIP Checker0.2.2. WP Grid Builder and its Elementor add-on absent from returned installed-plugin list. Installed license entitlement and runtime integration not certified. Prior WPGB-first proposal is superseded: reuse existing Filter Everything PRO; install no filter plugin now.

### Reference: current versus historical GCPRO
Read current main docs/components/projects-acf-prototype.md (blob d4486cf4d2881fd5c56f98beee8b05f806c38181) and docs/projects/projects-catalogue-facets.json (22d5046e49c8f966d2061fc2d93c1d812c94f734). This is repository evidence, not a new GCPRO live test.
Current pattern: ACF gcpro_project; separate project_service, project_area and project_sector; native title/excerpt/cover/body; term-based city queries; one Single2231/Card2233/Archive2232; shared attachment-based gallery. WPGB2.3.6 + Elementor add-on1.4.0 own service/location/property filters, reset and Load More. Later /projects/ routing supersedes /portfolio/ and /projects-prototype/. Initial free-text location, native-only filter experiments and prototype clones are historical. Latest integration0.4.7 includes Atomic metadata/service SVG work; earlier scoped pagination fixes coordinate current query and load-more. Do not transplant IDs, styles, property-sector taxonomy, SVG mappings, code or pagination fixes into CM.
Retain the principle: one record, taxonomy membership, shared presentation and automatic selections. CM already has case-like Posts and another filtering plugin; copying the GCPRO CPT is unnecessary for the first implementation.

### One recommended CM architecture — preserve Posts and their URLs
Use existing WordPress Posts with a dedicated Case Studies category as the case discriminator, rather than a new CPT plus migration. This supersedes the earlier candidate cm_project CPT for this pilot. Keep informational blog posts outside that category. A case is still one native post, not a shadow record or duplicate article.
ACF Free defines case-only fields and two taxonomies attached to Posts:
- cm_location: one verified city term per case; term name is the sole structured city label. Each term has one optional geo_page Post Object (Page ID). Winnetka→9888, Glenview→9833, Evanston→9987, Wilmette→9701. Other real cities (Chicago, Plainfield) are permitted without creating geo pages. No page link if no confirmed destination.
- cm_installation_type: multiple terms allowed. Each term has one service_page Post Object mapping to an existing service Page. Never store duplicate hand-entered URLs or city text in each case.
- mounting_surface: optional controlled ACF select initially: drywall, brick, tile, stone, other, unknown. It is NOT a public facet at launch. It describes visible mounting surface; stud/substrate details belong in the factual description, not inferred from photographs.
Native title/excerpt/featured image/body remain. Optional ACF fields: video URL, TV size, TV model, mount model, cable-concealment description, recessed-box model; omit unknowns. Photos use native media IDs in a WordPress Gallery block in the existing body. Preserve media parents and reuse original attachments; do not use GCPRO attachment-parent reassignment on CM. A shared case template controls the overall shell and scoped gallery styles; each case owns photo selection/order. This avoids buying ACF PRO or writing a gallery renderer for the pilot.

### Editing and small integration owner
Editors manage cases under Posts→Case Studies; select city once, installation types, body/gallery and optional details. Editors manage city→Page and type→service Page mappings on taxonomy term edit screens. Reject duplicate page mappings and require one location before publishing a case; no publication of guessed location.
Create one dedicated Elementor Single Case (condition includes Case Studies category), one Case Card and one /projects/ catalogue Page containing Loop Grid. Existing Article4432 must exclude Case Studies when the new Single is enabled, preserving informational articles. Blog membership can remain editorially intentional; multiple listings of one canonical post are not duplicate documents. Do not change Blog4420 globally.
A small versioned CM integration plugin is proposed at cm-case-links/ in this repository (not created): scoped Elementor Query ID cm_related_cases resolves current Page ID against term geo_page/service_page mappings and applies publish + Case Studies + matching taxonomy constraints. If no valid mapping, return zero results, never every case. A shortcode/dynamic output in Single renders escaped get_permalink links to the mapped city and all mapped services. Case Card uses native Post URL/title/image. This code handles relationships only, not layout or a separate filtering engine. ACF exports proposed at docs/config/cm-cases.json; no scattered Code Snippets or edits to parent theme.
City/service blocks reuse that query and the same Card; adding a Published matching case requires no page edits. Draft/unpublish removes it. City text is derived from its term; reverse links use the same mapping. Where the city has no geo Page, show city text without a fabricated link.

### Classification and filters
Public catalogue: exactly two initial filters, Location and Installation Type; AND across them. Cases can have several installation types. Start with a single choice per filter and Clear filters, avoiding complex multi-select semantics. Filter Everything PRO set scoped ONLY to /projects/ and its case Loop Grid query/container; never target product queries. Use one conventional pagination owner, no combined numbered + Load More experiment. Compatibility must pass on staging before launch.
Installation Type vocabulary aligned with current services:
- TV Wall Mounting → /tv-installation-and-mounting/ (general applicable type)
- Frame TV Installation → /frame-tv-mounting-chicago/
- Fireplace TV Installation → /fireplace-or-brick-wall-mounting/
- Large & Premium TV Installation → /premium-large-tv-installation/
- Outdoor TV Installation → /outdoor-tv-installation/
- Soundbar Installation → /soundbar-installation/ (activate public term only with an evidenced case)
Frame TV is retained as an established service category, not a general list of TV brands. One Frame-over-fireplace installation may receive TV Wall Mounting + Frame + Fireplace. Brick is not an installation type even though the existing combined service URL mentions brick; surface and service mapping stay distinct.
Third possible filter: Mounting Surface. Defer until several verified cases populate at least two surface groups and the choice meaningfully narrows results; current evidence does not establish useful drywall/brick/stone coverage. Tile is supported for the Winnetka Frame candidate. Do not derive material from a filename or classify stone versus tile visually without evidence.
TV size/model, Samsung/LG, mount/MM815, concealed cables and recessed box remain case details, not launch filters. No equipment/location/type mixed list. General advice posts about wall materials do not prove completed installations.

### Actual content inventory and pilot
MCP lists18 Posts (including drafts/pending), distinguishing case narratives from guides:
- Published10089 Samsung Frame TV Pro Fireplace / MantelMount MM815: keep /samsung-frame-tv-pro-fireplace-installation-with-mantelmount-mm815-and-rb100-recessed-box/. Existing video LA-eZGLSrxE has recorded Chicago evidence; confirm article/video describe the same job before linking. Never assign to Winnetka.
- Published11299 Samsung The Terrace Full Sun Outdoor TV Installation in Chicago: /samsung-the-terrace-full-sun-outdoor-tv-installation-in-chicago/. Chicago is explicit in title; detailed scope/media not reread, so category candidate pending review.
- Published8012 LG G5 OLED Fireplace Installation in Chicago: /lg-g5-oled-fireplace-mount/. Same limitation.
- Draft5654 TCL Frame TV installation: not a published case; location unverified. Pending7419 is a test/advice article, not a case.
- Guides7147/4490 discuss materials, not case evidence. Other pricing/safety/how-to Posts stay editorial.
City PHOTO gallery widgets: Winnetka165f03d6, Glenview552df27c, Evanston670c2540, Wilmette473d68e. These are candidate source pools, not verified one-gallery=one-job mappings; attachment-to-job attribution still needed.
Start with two documented Winnetka candidates: kO1vrsAiCkw (Frame TV on tile; title evidence) and CorXHd53U5M (100-inch LG QNED84B; title/description evidence). Existing page9888 video widgets10546bbf/d108f5d are already present; do not duplicate placements. Determine distinct jobs, select matching original photos from the gallery/media library and confirm factual scope before drafting. Assign first Frame/TV Wall Mounting + tile; second Large & Premium/TV Wall Mounting, surface unknown unless sourced. Do not infer fireplace, hidden cables or recessed box from these titles. Prior Studio inventory also supports Wilmette xvrjoKvFsw8 and Plainfield7ZOvPcatxrU; not substitutes for Winnetka. Glenview/Evanston additional real cases remain unconfirmed.

### Preservation, empty states and acceptance
Existing geo URLs/content/FAQ/video/gallery/SEO remain. Add a scoped dynamic block rather than replace the page structure. Keep article post IDs/slugs/permalinks/SEO/media; classify actual existing cases in place only after review, with no new copy of the same job. For new Winnetka jobs search existing content/media first, then create one post each. New /projects/ Page is a listing, not a duplicate article. No automatic city×service pages, taxonomy landing pages or indexable filter combinations; configure scoped filter SEO and verify canonicals/sitemap with AIOSEO without changing unrelated product policy.
Empty city: omit the empty case grid/heading and retain its useful page content and quote CTA; optional neutral link “Browse all installations” points to catalogue, never presents another city as local. Catalogue empty intersection: explicit no-results message + Clear filters.
Acceptance on staging: classify an existing case without changing URL; one new matching Published case enters city + every matching service + catalogue; Draft removes it; no unrelated products/guides; Location×Type intersection/reset/empty/pagination/guest behavior; one Single/Card owner; all mapped links correct; media preserved; desktop/mobile/focus and SEO checked. No tests claimed run here.
Staging URL and completed backup remain unverified from prior checkpoint; this research does not resolve those gates. First implementation step: obtain verified staging clone + restore point, then create the Case Studies category, two taxonomies and term→Page mappings on staging and use one Winnetka draft to validate the relationship/query contract before building the catalogue. No production prototype.

Sources: CM native MCP and authenticated plugin REST; four fresh geo HTML reads; knowledge/VIDEOS.md historical evidence; current GCPRO files above. Filter integration documentation: https://filtereverything.pro/resources/filter-set/ (scope, target query, AJAX container); Elementor query hook: https://developers.elementor.com/docs/hooks/custom-query-filter . Installed integration behavior remains to be tested, not certified by documentation.


## 2026-11-06 — Shared system preparation; production safeguards
Latest user scope supersedes earlier rollout steps: build reusable case system only; no insertion into existing city/service pages. English documentation/content. Production confirmed. User authorizes unassigned drafts while backup is unresolved, but prohibits taxonomy registration, code activation, published conditions or catalogue publication until recovery is verified and release approved.
Read Hostinger WordPress Tools screen: no backup list/restore point or staging URL exposed. User also has neither confirmed. No hosting-panel session available in inspected browser inventory. Recovery NOT verified; no restore test or full export claimed.
Created new unassigned draft Single15714, Case Card15715 and draft catalogue Page15716. Single contains dynamic title/excerpt and exactly one Post Content slot. Card composition returned 'Could not save document', yet fresh get-page-structure returns its Card/title/summary/link tree; persistence/rendering is not fully certified. Catalogue has heading/introduction only, not a functioning filter catalogue. Both site parts verified draft, no conditions, inactive. Existing Article4432 remains published with include/singular/post. No public page/template/global/product/filter/form/cache/SEO changes, no taxonomy creation, no PHP installed or activated. Draft design is preliminary; no visual or responsive QA claimed, no cover media yet.
Saved docs/cases/preparation-2026-11-06.json: offline field/taxonomy/relationship design manifest and exact attempted compositions. It is NOT a native ACF import export and must not be imported blindly. No real sample case created: Winnetka video evidence exists but matching original photographs and scope still need validation. Existing posts/media untouched.
Remaining independent preparation: verify card save through native editor; finish existing-design Single/Card and draft Loop Grid; prepare native ACF configuration offline; inspect source photos and draft one verified sample; export/readback drafts and visual QA. Classic Loop Grid absent from MCP supported-widget list, so use native editor for Filter Everything integration, not an unverified Atomic loop substitute. Relationships prepared as schema only; no active custom integration. No release approval requested yet because reviewable implementation is incomplete.
Rollback of this preparation: new isolated drafts only; retain unpublished/unassigned or move these three new objects to Trash after verifying no consumers. This is not a verified full-site recovery method. Before activation, obtain completed file+database backup and demonstrated accessible restore workflow, preserve affected configuration, and present exact changes/rollback for approval. Never perform public test publish/unpublish experiments.


## 2026-11-06 — Draft layouts, CM Hero reuse and sample preparation
This checkpoint supersedes the preliminary draft status above. No production activation or publication.
- Single15714 remains draft/unassigned. Copied Page9888 HERO5631e52e through the native editor into local HERO0bae6cd. Preserved cm-hero classes, divider, typography and responsive settings; title59cad9c binds Post Title and subtitle0981606 binds Post Excerpt. Quote/booking reference607f408 still uses existing Template12415 (not modified). Removed the copied review instance, pricing strip and fixed city/video link from this draft only. Global review9466 was not edited. Native featured-image592c353d and exactly one Post Content5870cef0 render sample15731. Corrected image width after finding mobile overflow; recheck: body clientWidth=scrollWidth=340. Page9888 Elementor data compared equal to private pre-change snapshot; Article4432 remains published with include/singular/post.
- Card15715: no replacement card created. Reopened in Elementor, repaired cover rendering by using native Featured Image72ff773, enabled excerpt fallback capped at28 words, retained dynamic title1462210c and post link6ba5141c. Native Save Draft succeeds; reopened content and persisted settings verified. Preview context15731, desktop preview width400px. MCP build/manage/settings still return “Could not save document” / “Could not save document settings” despite persisted writes; connector error is NOT root-cause resolved. Use native Save Draft and verify readback, not repeated blind MCP retries.
- Catalogue15716: draft layout uses CM Kanit/Inter, #292B26/#343434/#4E9D05/#EFF2EF, rounded panels. Separate responsive Location and Installation Type areas are plain explanatory text, not fake filter controls. Native Loop Grid52200b7 exists under containerc692a81, unconfigured. Native template search for CM returned no results for the unpublished Card; it was not published to bypass this. No active filter set, live query, pagination or automatic selections claimed.
- New unpublished standard Post15731: “Samsung Frame TV Installation on Tile in Winnetka”. No matching Winnetka post found before creation. Title/scope supported by existing video kO1vrsAiCkw; embedded player also displays “TV Installation in Winnetka, IL | Frame TV Setup on Tile”. Body/excerpt deliberately minimal; TV size, exact model/year, bracket, cable concealment, recessed box and fireplace scope left unknown. Media9963 is a TEMPORARY preview photo explicitly permitted by the user; same-job/location attribution is unverified. Its existing filename says Chicago while alt says Winnetka; neither resolves provenance. No media metadata changed. Do not publish until photo/content review. No duplicate of existing published case10089 was created.
- Working dynamic bindings: Single title/excerpt/featured image/body; Card title/excerpt/featured image/post URL. Post10089 was first used as preview data only, then replaced with draft15731. Existing article/media unchanged. Pending: cm_location/cm_installation_type term bindings, mapped city/service links, optional ACF attribute display and catalogue results/filter wiring. No production taxonomies or fields were registered.
- Planned sample classification remains in offline manifest only: Winnetka -> Page9888; TV Wall Mounting + Frame TV Installation; tile attribute. Do not independently maintain duplicate city fields. Mounting Surface is not a launch filter.
- Sources saved in docs/cases/draft-15714-2026-11-06.json, draft-15715-2026-11-06.json and draft-15716-2026-11-06.json; current decisions/provenance in preparation-2026-11-06.json. These are review snapshots, NOT a full backup or guaranteed cross-site import package. Historical compositions in the manifest are superseded by those snapshots. Private before snapshots remain in local private storage.
- Backup/Hostinger restore evidence and staging remain unresolved. No custom code activation, condition assignment, public page insertion, product/filter/form/cache/global/SEO change. Rollback for preparation is to retain the isolated drafts unpublished or restore their saved prior draft content. This is not full-site recovery.
Next: review the Single/Card layouts and temporary sample photo; verify Hostinger file+database restore point and accessible recovery workflow before activation. Then prepare a concrete narrowly scoped classification/filter change and obtain approval before registering taxonomies, assigning public conditions or publishing anything. Catalogue integration and functional acceptance remain pending.

### 2026-11-06 — Final draft visual check
Reopened Single15714, Card15715 and catalogue15716 in Elementor. Desktop and mobile layouts inspected; at340px mobile body clientWidth and scrollWidth both340 for all three. Single Hero/title/summary, temporary featured photo and source-video embed rendered; Card sample title/excerpt/image/link rendered; catalogue panels stacked on mobile. This is visual preview verification only, not public filtering, playback, booking/form submission or full accessibility certification. Catalogue still shows an unconfigured native Loop Grid in the editor; no working results are claimed. Review screenshots saved locally. All three remain drafts; Single/Card conditions empty. Next review: shared Single/Card design and sample photo, then resolve verified recovery before approved activation.

### 2026-11-06 — Catalogue15716: intact CM Hero correction; functional integration pending
Latest requested structure is exactly: existing CM Hero, Location + Installation Type + Clear Filters, dynamic case grid. No additional introduction or explanatory panels.
Completed on existing draft15716 only: copied the entire native Hero from Winnetka page9888 (source root5631e52e) to Hero3d9b938, retaining all seven direct children, responsive settings, CSS classes, typography, backgrounds, buttons, global review reference9466, CTA template12415 and pricing template12405. Changed only title, subtitle, browse-CTA heading and caption. Deleted former title58598eae, introduction3fade980 and explanatory panel3f1d77b2. Existing wrapper7cb19457 now display:contents to avoid constraining the copied Hero. Existing grid containerc692a81 has CSS ID video, matching the copied Hero's unchanged #video link. No source Hero/global template edits.
Verification: native Save Draft and editor reopen showed the new text and removal of panels; authenticated REST readback confirmed status draft, four exact new text values and grid anchor. Source9888 Elementor data compared exactly equal to its private pre-change snapshot. Desktop/mobile editor screenshots saved; inherited Trustindex review renders as shortcode text in the editor, so its frontend rendering is not claimed verified. Existing Loop Grid52200b7 remains unconfigured, not working results.
Blocking dependencies confirmed: authenticated taxonomy inventory contains neither cm_location nor cm_installation_type. Native grid picker did not offer unpublished Card15715. Existing Filter Everything sets11019/10773/10596 target products and were not changed. Inspecting Add New allocated an unsaved filter-set auto-draft15744; no filters configured, saved or published there. Do not mistake it for an operational catalogue filter set.
No fake filter controls added. Working Location/Installation Type/Clear Filters and case-result links are NOT completed. Backup/recoverability and staging remain unverified; no taxonomy/PHP activation, template publication/conditions, public catalogue publication or changes to existing public pages. Single15714, Card15715 and sample15731 unchanged this stage.
Source snapshot: docs/cases/draft-15716-2026-11-06.json. Private before/after snapshots are draft rollback aids, not a full-site backup.
Next: verify a completed Hostinger files+database backup and actual restore access; then present the scoped taxonomy/filter/grid activation and rollback for approval. Configure catalogue-only filters immediately below this Hero and connect reusable Card15715 only through the approved release path. Preserve existing product filter sets.

### 2026-11-06 — Working Elementor catalogue technical demonstration
User explicitly authorized required taxonomy/template/filter activation and technical publication with noindex; separately approved temporary demo-post visibility in the blog. This supersedes the prior activation hold for this scoped demonstration. Hostinger full backup/recovery and staging remain unverified; no claim of full-site recoverability.
Live catalogue: https://chicagomounting.com/installation-case-studies-draft/ (Page15716, published, noindex).
Live case: https://chicagomounting.com/samsung-frame-tv-installation-on-tile-in-winnetka/ (Post15731, published, noindex).
Implementation:
- ACF taxonomy records15751 Location (cm_location) and15752 Installation Type (cm_installation_type): active, attached only to Posts, REST exposed, nonhierarchical, publicly_queryable disabled, permalink rewrite disabled. No public taxonomy archive pages created. Location single-assignment is an editorial rule; native nonhierarchical control does not enforce it programmatically.
- Case Studies category144. Winnetka term145. TV Wall Mounting146, Frame TV Installation147, Outdoor TV Installation148. Post15731 assigned144/145/146/147 only. Outdoor is a real service classification with zero demo cases; not a fabricated installation.
- Card15715 published and bound to native Loop Grid52200b7 on15716. Grid source Posts, category constraint144, 9 per page, default desktop3 columns. No ordinary articles/products included.
- Single15714 published with exact condition include/singular/post/15731. Article4432 retains include/singular/post unchanged. Frontend HTML confirms15714 renders for demo. Sample-specific hide_title=yes suppresses the theme's duplicate title; one page H1 verified.
- Reused Filter Set15744, now published as CM Cases Catalogue. Posts; location Pages→15716 only; correct detected query Posts #1 - Elementor (fa84d59b7d802e8b71ff685edca5380a); AJAX result container #video. Posts #2 was wrong and was replaced after a negative-result test proved it did not filter the grid.
- Location and Installation Type dropdowns use separate taxonomies and URL prefixes case-location / case-installation. Horizontal layout; counters on; empty terms visible for honest zero-case selection. Existing product sets11019/10773/10596 not edited.
- Native Shortcode widget111a2a4 sits in its own container immediately after untouched copied Hero and before grid: [fe_widget id="15744" horizontal="yes" columns="2"], persistent Clear Filters link to catalogue base URL plus #video, and [fe_chips id="15744" mobile="yes" reset="no"]. Clear uses normal navigation, native dropdown filtering uses AJAX; no custom PHP/JS, theme edits or new plugin. Mobile uses existing plugin Filters expander with stacked dropdowns.
- Native Nothing Found Message enabled: "No installations match these filters." Hero unchanged this stage; inherited reviews render correctly on actual frontend.
Verified:
- Desktop browser and mobile390×844: baseline1 card; Winnetka1; Winnetka+Frame1; Outdoor0 with empty message; Clear Filters restores1 and clears both selections. Negative selection checked through actual UI without reload and via anonymous HTTP.
- Card link opened live case; Single template content/title/image/source-video embed rendered. Mobile catalogue and Single document clientWidth/scrollWidth both370 (390px viewport including scrollbar); no horizontal overflow. Video playback/form submission not tested.
- Anonymous HTTP baseline and combined route each contain exactly one Card15715; Outdoor route contains zero and empty message; all tested catalogue routes and case output robots noindex. Case HTML identifies Single15714.
- Catalogue and case not added to menus or existing geo/service pages. Demo Post may appear automatically in blog, specifically authorized by user.
Current limits: one sample; temporary photo9963 attribution still unverified, unknown equipment details remain empty. This is a technical demonstration, not final content approval. Single condition currently targets demo only; future category-wide conditions need a deliberate later change. No pagination behavior claimed tested with one record.
Rollback: unpublish technical catalogue/demo, return15714/15715 to previous draft states and remove demo-only condition, disable only Filter Set15744; preserve taxonomy/term data unless explicitly asked to remove. Private preactivation snapshots and repo source snapshots support object restoration, not full-site recovery.
Next: user review of working URLs and sample photo/content, then approve the final content/layout and expansion to additional genuine cases. No existing city/service block insertion in this phase.


## 2026-11-07 — Catalogue visual polish and user refinements
Implemented on published noindex catalogue Page15716, https://chicagomounting.com/installation-case-studies-draft/, and existing Loop Card15715. Filter Set15744 remains the existing query owner.
- Added page-scoped custom CSS: white rounded floating filter panel, two desktop fields plus right-aligned Clear Filters, stacked mobile fields, 54px controls, coordinated borders/radii and 16px/1.4 Inter text alignment. Removed inherited dropdown width restriction, bottom separator/margins, visible duplicated headings and default placeholder hyphens. Headings remain visually hidden for accessibility. Search input hidden for the current small dropdown lists; zero-count terms subdued, not removed.
- Card: 4:3 cover, rounded corners, subtle border/shadow, Kanit title in normal case, compact excerpt, dynamic native Post Info widget c7a91e2 (cm_location + cm_installation_type, unlinked terms), green location badge and neutral type badges. Final View case study CTA is an outlined green full-width button with solid green hover and focus outline. Existing dynamic title/excerpt/URL/image remain. Catalogue grid uses 3/2/1 columns.
- User explicitly superseded Hero preservation only for removal of Explore Our Cases CTA34d88e2, its icon and subtitle. Removed that subtree only. Other page-tree content, Hero settings/shared references, filter shortcode and Loop query settings preserved. No shared source Hero/global template edits.
- Filter admin changed only dropdown_label for15758 to Select Location and15759 to Select Installation Type. Original values were empty defaults; rollback is clearing those two fields. Query target, taxonomies, URL prefixes, logic, empty-term policy and result container unchanged.
- Verified current direct MCP initialize/read HTTP200,22 tools. Before source snapshot committed d0f2931a741c6238308b7b4a4a8fd71e44ede03c at docs/cases/visual-polish-before-2026-11-07.json. Page tree matched byte-for-byte before the later authorized Hero CTA removal; final REST read matches exactly the expected tree with that subtree removed. Card REST write required native editor Publish to refresh rendered card; MCP card settings still returned Could not save document settings. Native save/read and frontend render confirmed final metadata/text.
- Browser: desktop baseline1, Winnetka1, combined Winnetka+Frame1, Outdoor0 with native empty message, Clear restores1 and base URL. Keyboard Enter opened dropdown. Search field hidden; zero-count visual state and focus rules inspected. Desktop3 columns; tablet820px2 columns; mobile390px1 column with scrollWidth370 (no horizontal overflow). Fields and Clear measured54px each and equal desktop top coordinate. Final badge/outline-button rendering and CTA removal observed; final text styles share font16px,line22.4px and centered alignment.
- Limitations: one demo record, so pagination with multiple records and draft-exclusion were not retested. Full mobile touch/keyboard journey, screen-reader audit, video playback and full-site recovery remain unverified. Latest badge/base-line refinements inspected on desktop; earlier mobile check covered the panel/card layout. No standalone result count added; existing per-option counts retained. Photo attribution remains unverified. No claim of full-site backup.
Source: docs/cases/catalogue-visual-polish-2026-11-07.css and visual-polish-after-2026-11-07.json. CSS is owned by Page15716 custom_css and is scoped to that page; future catalogue reuse should deliberately adopt the styles rather than assume global propagation. No custom filtering JavaScript/PHP, plugin file changes, or new plugins.
Next: user visual/content review; real additional cases needed for multi-card pagination acceptance. Do not re-run completed checks or expand to city/service pages without a new task.


## 2026-11-07 — Unpublished desktop card design test

Created draft page **15781** (CM Case Studies — Desktop Card Design Test) from catalogue 15716. Nothing published. Existing live catalogue 15716 and shared Loop Card template 15715 have byte-equivalent REST metadata before/after this task; Hero and filter configuration were not changed.

Draft-only CSS at min-width 1025px tests a two-column grid (32px gap), larger 3:2 featured image, white location pill with green pin, dark primary-type pill over the image, stronger title, spaced excerpt, and full-width outline CTA. Existing dynamic template 15715 and Winnetka post 15731 are reused. The confirmed Illinois suffix and suppression of secondary type badges are scoped only to pilot post 15731; its first rendered term is Frame TV Installation. General primary-type mapping remains pending before scaling to arbitrary cases.

Verified in authenticated desktop preview: one dynamic Winnetka card, loaded image measuring 572×381px, two 574px grid tracks, title/excerpt, and CTA href to the existing Winnetka case. Readback confirms page 15781 remains draft. Mobile overrides were not added or tested; mobile styling is pending. Multi-card, keyboard, pagination, and filter regression tests were not repeated.

Limitation: Filter Everything set 15744 targets original page 15716 and does not render dropdowns in the new draft. Reset still points to the original catalogue. This is a card-design preview, not a functional replacement catalogue. Original filtering remains untouched. Draft uses a scoped inline-style HTML widget d7c8101 because the unpublished page stylesheet was not generated; remove this preview fallback when approved styling is integrated. No publication is authorized.

Preview (WordPress login required): https://chicagomounting.com/?page_id=15781&preview=true#video

Sources: `docs/cases/desktop-card-test-2026-11-07.css` and `docs/cases/desktop-card-test-2026-11-07.json`.


## 2026-11-07 — Desktop draft card refinement (unpublished)

Continued from b0d63a2 on existing draft 15781. Only its existing HTML widget d7c8101 and page custom_css setting changed. No new page, template, plugin or taxonomy field. Live catalogue15716, shared Loop Card15715 and case15731 were read back unchanged; draft Hero/other Elementor tree branches match the prior checkpoint exactly. Status remains draft.

Preserved approved 3:2 photo, two-column desktop grid, white location pill/pin, dark type pill, Kanit title, white bordered/shadow card and green outline CTA. Added stretch/flex card sizing, minimum two-line title/excerpt space, consistent 16/28px content gaps and bottom-aligned CTA; long labels wrap rather than truncate. All new behavior targets desktop >=1025px. Removed every post-specific CSS selector and the CSS-generated Illinois suffix.

Draft-only JavaScript reads the existing dynamic Post Info terms and case URL. Exact display mapping: Winnetka -> Winnetka, IL (confirmed case content); Frame TV Installation -> Frame TV; Outdoor TV Installation -> Outdoor TV. Unknown locations/types retain their actual text, without an invented state. Duplicate type labels are suppressed. One unique assigned type resolves automatically. Multiple types require an explicit editorial selection; unresolved ambiguity hides the primary pill rather than choosing alphabetical/first-term order. Existing approved Winnetka selection is recorded by its case URL as Frame TV Installation. This is an explicit preview override, not a new primary-taxonomy field or fully automated primary classification. Current REST post and term data expose no primary/state field (ACF empty); broader automatic city/state and primary resolution remain limited by that data model.

Preview-only excerpt: “Watch the installation video for a closer look at this tile-surface TV mounting project.” Supported by the existing post's tile-surface description and YouTube embed. Published post excerpt is unchanged. Other cases retain their native dynamic excerpt. New display code restores native metadata/excerpt below desktop breakpoint; mobile was not tested or redesigned. Filter integration/AJAX re-render support is deferred, as requested.

Styling ownership: consolidated into the existing page-local HTML widget (one named style block plus small display script); removed duplicated page-settings custom_css. A supported MCP page-settings save invalidated Elementor's stale render cache without publishing. This retains the dependable unpublished-preview path rather than introducing global settings or dependencies. The CSS file now includes the complete scoped baseline plus desktop refinements; JS is versioned separately.

Verified rendered desktop: two 574px columns; loaded original image; location exactly Winnetka, IL; one Frame TV pill; unchanged dynamic title in Kanit; new video excerpt; CTA URL https://chicagomounting.com/samsung-frame-tv-installation-on-tile-in-winnetka/. Screenshot visually reviewed. Draft status and protected object comparisons passed. No new records were created. Longer-text/multiple-card rendered fixtures, alternative taxonomy rendering, keyboard journey, mobile and filtering integration remain unverified. An attempted isolated resolver execution was blocked by runtime code-generation restrictions; it is not reported as a passing test.

Review: https://chicagomounting.com/?page_id=15781&preview=true#video (WordPress editor login required). Nothing published.

### 2026-11-07 — Case Studies preview publication and geo data status (recovery audit)
User decision: all sixteen Case Studies posts may remain **published for reviewing the working catalogue**, with **noindex** until approval. This explicit approval supersedes older draft-only instructions. Per read-only Work audit: 15716, 15731, and 15810–15832 had noindex, while **15791, 15792, 15793 lacked it**; corrective implementation not yet performed. Noindex does not restrict direct access.

Twelve new posts 15810–15832 have no Location terms in current reported WordPress data. The 4×4 grouping in static draft preview15878 is an editorial proposed distribution: Glenview 15792/15826/15816/15832; Evanston 15793/15824/15814/15812; Wilmette 15791/15820/15830/15822; Winnetka 15731/15818/15810/15828. It is not verified geographic provenance; avoid statements that actual installations occurred in those cities without adequate evidence. User wants four diverse case examples per city in an easy-to-maintain system, not individual templates per city. See docs/cases/RECOVERY-AUDIT-2026-11-07.md for 16-post inventory and technical defects.

No WordPress edits made by this documentation stage. Future changes require directly checking the current site, with one canonical catalogue15716, Loop Card15715, Filter Set15744 and one existing reusable Single (selection pending).


## 2026-11-07 — Published review cases and editorial placement

All 16 category-144 cases remain published for review with rendered noindex. Catalogue 15716 is also noindex. Only 15791, 15792 and 15793 required noindex corrections; global indexing was not changed. Editorial tag archives also render noindex.

Native WP Tags represent editorial selections separately from actual cm_location:

| Tag ID | Editorial city | Case IDs |
|---|---|---|
| 152 | Glenview | 15792, 15826, 15816, 15832 |
| 153 | Evanston | 15793, 15824, 15814, 15812 |
| 154 | Wilmette | 15791, 15820, 15830, 15822 |
| 155 | Winnetka | 15731, 15818, 15810, 15828 |

Slugs are featured-city-glenview, featured-city-evanston, featured-city-wilmette and featured-city-winnetka. These are editorial selections, not evidence of installation location. Actual locations remain Winnetka/15731, Wilmette/15791, Glenview/15792, Evanston/15793; newer twelve remain unassigned pending verified source information. Existing draft review 15878 already matches this matrix and was not edited. No geographic/service page placements were implemented in this checkpoint; future native queries can use these tags. Relevant existing service links were added to case bodies without inventing product/location claims.

All case pages now use Single 15714 through native category 144 condition. Do not publish draft 15839 as a competing Single. Do not remove review noindex until approval. See docs/cases/IMPLEMENTATION-2026-11-07.md for media limitations and verification scope.


## 2026-11-07 — Native editorial city badges fixed

Loop Card 15715 Post Info c7a91e2, repeater c7a91e3: changed native taxonomy from cm_location to post_tag. This is the only element-tree change. Existing tags 152–155 renamed Glenview, IL / Evanston, IL / Wilmette, IL / Winnetka, IL; IDs, slugs, descriptions and memberships unchanged (four each). No JavaScript, CSS, new components or case edits. Catalogue 15716 tree/settings unchanged; all sixteen case content/tags/actual locations/types/status unchanged.

Verified all sixteen rendered badges across catalogue pages 1/2 at desktop1718px and mobile390px: white background,999px pill radius,green pin rgb(67,137,7),12px inset from image top-left,no horizontal overflow. AJAX TV filter retains8+4 badges and native numeric pagination; Frame filter4 and Outdoor1 badges checked desktop/mobile. Combined Winnetka+TV returns original15731 with badge. Clear resets both selects to0,baseURL without fragment,8 cases and page2.

Location filter15758 in set15744 still uses actual cm_location; it returns one confirmed case per city, not four editorial selections. To return four per city it must deliberately switch to editorial tags and be relabeled/documented accordingly. It was NOT changed. Badge is editorial placement, not verified installation provenance. Native Post Info Tags displays all assigned tags; currently each case has exactly one editorial tag. Keep unrelated tags off case records or deliberately revise the data model before adding them.

Implementation snapshots: docs/cases/card-15715-editorial-badges-2026-11-07.json and editorial-city-terms-2026-11-07.json.


## 2026-11-07 — Single15714 editorial redesign; awaiting visual review

User rejected previous boxed/generic Single design. Reworked existing15714 only: intrinsic photo with no gray background, Kanit400 uppercase title26–38px,native narrow facts-left/wide-story-right layout,mobile stacking,unboxed facts and existing theme btn btn-md btn-outline CTA. Inspected Kit8,wp-custom-css,active theme public stylesheet,template CSS and GitHub style records. Kit/theme/Additional CSS unchanged. Replaced5191-character Single custom CSS with892-character scoped residual rules; native controls own layout/typography,theme owns buttons. No new stylesheet,page,template,prototype or plugin.

Twelve newer post gallery shortcodes remove featured-image repetition and keep the additional photo in one native column with full responsive source; all media/featured relationships and written story preserved. Original4 content unchanged. All16 verified publish/noindex,200,oneH1 and Single15714. Portrait15810 and landscape15791 inspected desktop1718/tablet820/mobile390; natural aspect ratios,no horizontal overflow; square15731 desktop also checked. Actual viewport screenshots shown in chat,not successfully saved as repository files after final browser timeout. Final gallery source large→full checked in source/HTML,not repeated visual pass. User visual approval pending.

Actual implementation/rollback snapshot: docs/cases/single-15714-editorial-2026-11-07.json. Exact styling ownership/tests/limitations: docs/cases/SINGLE-EDITORIAL-2026-11-07.md. Verification: docs/cases/single-editorial-verification-2026-11-07.json.


## 2026-11-08 — Actual locations audited; conflict withdrawn from cm_location

Supersedes historical statements treating15731 as a confirmed Winnetka installation. Current source-backed actual terms:15791 Wilmette, IL (official Chicago Mounting videoCPoIAAo42LI title/author);15792 Glenview, IL (original media9974 caption/description);15793 Evanston, IL (original10248 caption/description). These are existing publisher assertions, not a new customer-address/GPS verification. Do not infer from filenames or editorial placement.

15731 remains unresolved: same photo7316/9963 has Streeterville/Winnetka assertions. Cleared its actual cm_location145 assignment, retained the term and editorial tag, removed city phrase from overview/title/excerpt, preserved URL. Do not set Streeterville without resolving the installation identity. Actual location remains unspecified on all12 newer15810–15832 cases. Thus3 source-backed /13 unknown-or-conflicted.

Single15714 uses native cm_location Post Info for Location: city, IL in facts and Installation in city, IL in introduction; both omitted when empty. Four existing actual term names include IL; IDs/slugs preserved. No per-case hardcoded location text introduced. City/service blocks stay withdrawn until final launch approval. Full16-case evidence/sequence/typography/verification and rollback: docs/cases/SINGLE-REFINEMENTS-2026-11-08.md and refinements-sequence-location-2026-11-08.json.


## 2026-11-08 — Owner-confirmed cities supersede newer-case unknown status

The owner explicitly confirmed using the existing catalogue city tags as actual job locations and requested location-aware headings, descriptions and SEO. This is new owner attribution, not a new finding in original client notes or a photo/filename inference.

Saved existing cm_location terms for twelve newer cases: Glenview15832/15826/15816; Wilmette15830/15822/15820; Winnetka15828/15818/15810; Evanston15824/15814/15812. Original15791 Wilmette,15792 Glenview,15793 Evanston retained. Fifteen Post Titles/H1 and AIOSEO title/meta descriptions now include their city; overview mentions it naturally. Hero excerpts and original URLs unchanged. Editorial tags and cm_location remain distinct data stores. The owner specifically rejected the separate Installation in city Hero line: native cmgeoint removed from15714. Facts cmcb001 still dynamically displays actual Location with native green pin.

Automatic review rejected applying the general confirmation to conflicted15731 because the earlier explicit Winnetka/Streeterville hold requires specific confirmation. No location/title/SEO update executed for15731. Its actual location stays empty; obtain exact-case owner confirmation before changing it.

All16 final public pages retain noindex;15 expected H1/Location/pin and exact title/meta matches verified. No integration blocks republished. Full implementation and limitations: docs/cases/OWNER-LOCATIONS-SINGLE-2026-11-08.md.


## 2026-11-08 — Final editorial distinction and completed case-copy cleanup

The owner's final decision defines the unchanged4x4 tag matrix as editorial/SEO grouping, not physical-job proof. Glenview152=15792/15826/15816/15832; Evanston153=15793/15824/15814/15812; Wilmette154=15791/15820/15830/15822; Winnetka155=15731/15818/15810/15828. Existing catalogue post_tag filter and badges match four per city.15731's photo-label issue does not block its editorial membership or future city query.

Supersedes the prior broad statement that tag confirmation independently verifies actual job cities. The owner explicitly stopped unsolicited removal of existing location/H1/SEO values; ten attempted changes were restored before final content work. Preserve current assignments/approved headings/metadata. Existing cm_location values must not be cited as new source confirmation. No automatic editorial-to-factual rewriting.

All16 Post Content descriptions now use professional we-voice stories and documented technical scope. No internal Media Library/upload/documentation language or standalone unstyled SEO links remains. New stories add no physical city claim based on editorial placement; source-backed older city mentions retain their existing evidence. All approved H1,SEO metadata,locations,URLs and noindex were preserved and checked; useful city/service navigation stays in styled template components.

Four older galleries remain0 after source/Media Library re-audit: no additional verified job photographs. Existing12 galleries retain80 files/order/alt with square presentation and full original-ratio lightbox. Completed implementation/limits: docs/cases/FINAL-CONTENT-GALLERIES-2026-11-08.md. City/service integration launch remains unpublished until explicit authorization.


## 2026-11-09 — Slightly heavier Project Facts labels

User requested slightly heavier headings in the supplied Facts screenshot. Changed only LOCATION (`cffl001l`) and INSTALLATION TYPE (`cfft001l`) in canonical Single Case15714 from Inter400 to500. Cloned the existing Text S native typography into these two widgets (same clamp(12px, 0.75vw, 14px), line-height1.5), preserving color binding. Global Kit, values, Project Facts H2, layout, conditions and all other elements unchanged. Native local typography owns these labels now; values still use global Text S.

Before controls saved in docs/cases/facts-label-weight-before-2026-11-09.json (commit0386a141aa3535f41affc10116d27ab5ffb04f5a). REST save200/exact readback; native Elementor save/publish completed. Existing Hostinger cache-clear returned200/purged=true; regenerated public linked template stylesheet returned200/text-css with font-weight500 on both selectors. Representative public15830 URL https://chicagomounting.com/85-inch-neo-qled-and-soundbar-on-a-brick-fireplace/ returned200/noindex. Complete tree equals intended two-label edit; page settings and conditions unchanged. No case content, media, taxonomy or integration changes.

Visual desktop/mobile inspection NOT completed: desktop browser was being used concurrently, and isolated headless launch was blocked by automatic approval policy. CSS/readback verification is not visual QA. Next: owner visual review of the slight weight change. Existing integration launch hold and source limits remain. Rollback: restore only the two original label settings from the recorded backup, then native save and cache refresh.


### 2026-11-09 — Facts labels increased to600 after owner review

Owner screenshot/review found500 too subtle. Changed only native typography_font_weight500→600 for LOCATION cffl001l and INSTALLATION TYPE cfft001l in Single15714. Fresh before-read and concurrent-tree check performed; exact REST save/readback200, native document save and Hostinger cache refresh200/purged=true. Representative15830 public URL and its actual linked regenerated stylesheet both200; both selectors explicitly font-weight600. Other settings/content/global styles unchanged. No new rendered desktop/mobile QA claimed; owner screenshot establishes the previous500 appearance. Rollback this follow-up by returning only those two weights to500. Next: owner review of600. Integration hold unchanged.


## 2026-11-09 — Final audit evidence and scoped corrections in progress

Read current instructions/default branch and verified default MCP adapter (36 tools; catalogue structure read200). All16 anonymous case URLs200/noindex/self-canonical; canonical Single15714 remains category144 based. Inspected all96 Featured/gallery media records and original delivered images; zero missing alt,95 WebP/one JPEG. Current96 files total14,557,115 bytes;80 gallery images across12 cases, original4 gallery gaps unchanged. All11 prepared integration snapshots/current consumers inspected: absent from public pages. Found indexable category144 /case-studies/ in category sitemap, single-label classifications omitting supported secondary services, technical filename-derived attachment titles and some source-oriented excerpts/descriptions. Exact scoped correction/rollback record: docs/cases/final-audit-corrections-2026-11-09.json. Noindex removal/global SEO/integration launch NOT authorized or performed. Next: apply/verify scoped corrections, complete responsive/filter/schema/scale audit and final GO/NO-GO report; hosting recovery still not independently verified.

## Final Case Studies audit — 2026-11-09

Current evidence and launch decision: [full report](../docs/cases/FINAL-AUDIT-2026-11-09.md), [all 16 cases](../docs/cases/PER-CASE-AUDIT-2026-11-09.md), [all 96 images](../docs/cases/IMAGE-AUDIT-2026-11-09.csv), [test results](../docs/cases/final-audit-verification-2026-11-09.json). This supersedes earlier single-type counts and indexable category-archive status.

- Working objects retained: catalogue15716 / Card15715 / Single15714 / Filter Set15744 / category144. Layout data and template conditions unchanged.
- Installation Type is multi-valued: Frame4, Outdoor1, Fireplace7, Large & Premium11, TV & Soundbar8, Recessed Media5, Standard1. OLED belongs to the existing Premium service scope; outlet-only work is not a recessed media-box job. 15818 remains excluded from Recessed Media because its body explicitly documents blocked wall space.
- Location filter15958 still uses editorial tags152–155, exactly four posts each. Single facts use actual cm_location; these dimensions are not interchangeable. 15731 remains actual-location-empty and neutral in title/body; historic Winnetka URL and editorial tag preserved.
- Corrected five descriptions, two excerpts, 94 media titles and added one existing-phrase service link per case. No new installation facts or customer data. All case URLs/media/alt values preserved.
- All16 + catalogue remain noindex. Category144's previously indexable archive is now individually noindex and absent from category sitemap, verified publicly. Four editorial tag archives also noindex. Visible vs schema breadcrumb hub mismatch remains; do not fix with duplicate schema or an unapproved redirect.
- 96 media reviewed: 16 heroes/80 gallery,95WebP/1JPEG,no missing alt/no exact binary duplicates. Full-size sources total14,557,115 bytes; eight exceed300KB, served with responsive gallery variants. Source quality limitations on16087/15888/16086 remain. No destructive compression/renaming/upload.
- Catalogue pagination, four city and seven type URLs, combined/empty/reset controls and 1366/768/390 renderings verified. Full lightbox navigation/Escape and sticky facts work. No CWV/10,000-case capacity claim.
- Existing 11 integration snapshots inspected; all destinations currently have no public case section. Placements and updated eligible counts are documented in the full report. Do not publish them now.
- Scale preparation should improve gallery authoring/import validation, term→page mapping, bounded queries and measured cache invalidation, not replace the working Posts architecture speculatively. Test missing/deleted mappings and performance on restored staging before scale promises.
- GO for held review, NO-GO for SEO launch. Resolve15731 provenance presentation and15824 model ambiguity; align breadcrumb hub and prepare reusable mappings; verify Hostinger backup/restore. Final approval remains mandatory for indexing and integration release.

Targeted before/after rollback files are committed beside the report; they do not satisfy the unresolved full-site recovery requirement.

## 2026-11-11 — Model neutrality and launch hold
15824 now uses Samsung Frame family wording instead of disputed Frame Pro in saved title/excerpt/body/SEO and inline gallery labels. Exact model unknown; original permalink preserved.15731 retains Winnetka editorial grouping and unknown factual location. All16 cases/catalogue/archive freshly200/noindex;11 integrations absent from public HTML. Backup/breadcrumb/integration readiness still open; see docs/cases/LAUNCH-PREPARATION-2026-11-11.md.

