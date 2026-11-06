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
