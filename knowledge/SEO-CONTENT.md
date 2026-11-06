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
