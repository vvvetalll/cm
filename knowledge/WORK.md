# Work — current state
Updated: 2026-10-26. Read AGENTS.md before acting.

| Task | Status | Next action / evidence needed |
|---|---|---|
| Three newest Shorts metadata | Done, checked in Studio | See VIDEOS.md |
| Second Wilmette Shorts title | Done, checked after reload | xvrjoKvFsw8 |
| Second Winnetka website video | Published; two distinct embeds verified live | Editor desktop/mobile layout measured; full playback testing pending |
| Second Wilmette website video | Pending | Inspect current city embed; add xvrjoKvFsw8 if absent |
| Second Premium page video | Pending | Existing CorXHd53U5M confirmed; choose distinct relevant premium installation and inspect layout |
| Glenview second geo Short | Blocked on real project/location | Identify actual Glenview video; no invented city |
| Evanston second geo Short | Blocked on real project/location | Identify actual Evanston video; no invented city |
| ZIP Checker production readiness | Not approved per existing README | Read actual review/release docs, verify unresolved blockers and staging/live behavior |
| Consolidate project knowledge | Initial consolidation | Maintain these files after each task; recover missing source exports when needed |

## Resume website edit
Winnetka edit recovered, published and live embed IDs checked. Browser failed again before inspecting Wilmette. Continue Wilmette and Premium without duplicating the completed Winnetka placement.

## Recording workflow
Before work: read this state and relevant topic files.
After work: update status + append CHANGELOG; record exact URLs/IDs, verification and remaining blockers; commit and push.
When handing off: include the repository URL and instruct the next Work session to read AGENTS.md and this file.

## Next major task — user request 2026-10-26
After finishing outstanding video placement, assess current site and business against recovered redesign/SEO history. Inspect live site, forms/quote behavior, mobile/accessibility, technical indexing, GSC/GA4/BrightLocal/GBP and available lead evidence. Separate traffic, leads, actual jobs and revenue; no business-growth claims without appropriate data. Preserve comparisons and follow-up tasks here. This audit has not started beyond the limited live video/page observations already logged.

## Repository access
2026-10-26: user confirmed adding cm to ChatGPT Codex Connector selected repositories. Saved through GitHub UI; successful file commits verified through GitHub connector. Knowledge docs now persisted on existing default branch; no plugin code changed.

## Performance review — 2026-10-26
Started: original GSC monthly and GA4 email reports reviewed. Partial conclusions and precise next steps: AUDIT-2026-10-26.md. Direct current GSC/GA4/BrightLocal and conversion/job data not obtained because browser connection failed. No SEO success/failure or revenue-growth verdict established. Private analytical figures kept out of this public repository.

## Direct SEO review progress — 2026-10-26
GSC comparison completed at aggregate and page level for 27 Sep–24 Oct vs 30 Aug–26 Sep; all four cities reviewed. Indexing summary/current examples inspected. Ahrefs overview, organic keyword table and referring-domain sample inspected. Findings appended to AUDIT-2026-10-26.md.
BrightLocal remains at sign-in wall; tab retained for user login. No local grid/rank trend verdict yet. No settings or website content changed.

## BrightLocal reviewed — 2026-10-26
Login blocker resolved. Read Rank Tracker, regional Local Search Grid, its prior run/settings, Citation Tracker and linked Analytics Summary/Conversions/Events. No changes saved and no paid/manual runs triggered.
Latest ranking/grid report visible: 16 Oct; citation report 23 Oct. Specialty local visibility improved; current aggregate organic clicks in GSC declined. Exact causal/business impact remains unproven. See AUDIT-2026-10-26.md.
Next: inspect real GA4 property/event definitions and late Direct traffic anomaly; attribute homepage/find-near-me query losses; retain the grid configuration when collecting next snapshot.

## Geo/project/filter system — 2026-11-06
User requested the GCPRO-style system for CM and an assessment of how to start. Read startup/topic files and current GCPRO project/facet records; inspected CM repository tree and fresh public HTTP/REST. Assessment and proposed architecture/rollout are in [SEO-CONTENT.md](SEO-CONTENT.md#2026-11-06--geo-pages-and-projects-system-assessment-and-proposed-start).
Confirmed: four existing city routes and hub 200/self-canonical; /projects/ 404; public REST exposes no project model; existing MantelMount case is Post10089 at its original 200 URL. Public REST does not establish the full installed-plugin/type inventory. Hub references ZIP Checker assets, without new functional certification.
Next: authenticated plugin/template/content/media/staging inventory, then one staging Projects model + Single/Card/archive and Winnetka pilot; preserve existing city and article URLs. Proposed stack ACF Free + existing Elementor Pro + WPGB Elementor integration, subject to installed-owner/license/compatibility inspection. No production edits/installations or runtime filter tests. Previous unfinished work remains open.


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


## 2026-11-06 — Geo/case research complete; implementation pending
Read current checkpoint and CM instructions, current GCPRO implementation records, remaining three CM city trees, template inventory and all18 Posts. Fresh authenticated plugin inventory: Elementor4.3.6/Pro4.3.3, ACF6.8.11, Filter Everything PRO1.9.8; no WPGB installed. All four geo pages render Kit8. Full evidence and chosen plan in SEO-CONTENT.md section 'CM implementation decision'. Supersedes prior candidate CPT/WPGB-first plan: keep case Posts/URLs in Case Studies category, two taxonomies with term→existing Page mappings, dedicated Single/Card/catalogue and existing Filter Everything PRO. Proposed small cm-case-links integration owns automatic reverse query/link mapping; not created. Public filters Location + Installation Type; surface is a case attribute initially. Pilot candidates are two recorded Winnetka videos; matching photos/job provenance need confirmation. No site writes/installations or live filter tests. First implementation step: verify staging clone and completed backup, then create category/taxonomies/mappings there and validate one Winnetka draft before catalogue work. Style cascade details, media attribution and existing filter integration remain bounded implementation checks. Product templates untouched.


## 2026-11-06 — Shared system preparation; production safeguards
Latest user scope supersedes earlier rollout steps: build reusable case system only; no insertion into existing city/service pages. English documentation/content. Production confirmed. User authorizes unassigned drafts while backup is unresolved, but prohibits taxonomy registration, code activation, published conditions or catalogue publication until recovery is verified and release approved.
Read Hostinger WordPress Tools screen: no backup list/restore point or staging URL exposed. User also has neither confirmed. No hosting-panel session available in inspected browser inventory. Recovery NOT verified; no restore test or full export claimed.
Created new unassigned draft Single15714, Case Card15715 and draft catalogue Page15716. Single contains dynamic title/excerpt and exactly one Post Content slot. Card composition returned 'Could not save document', yet fresh get-page-structure returns its Card/title/summary/link tree; persistence/rendering is not fully certified. Catalogue has heading/introduction only, not a functioning filter catalogue. Both site parts verified draft, no conditions, inactive. Existing Article4432 remains published with include/singular/post. No public page/template/global/product/filter/form/cache/SEO changes, no taxonomy creation, no PHP installed or activated. Draft design is preliminary; no visual or responsive QA claimed, no cover media yet.
Saved docs/cases/preparation-2026-11-06.json: offline field/taxonomy/relationship design manifest and exact attempted compositions. It is NOT a native ACF import export and must not be imported blindly. No real sample case created: Winnetka video evidence exists but matching original photographs and scope still need validation. Existing posts/media untouched.
Remaining independent preparation: verify card save through native editor; finish existing-design Single/Card and draft Loop Grid; prepare native ACF configuration offline; inspect source photos and draft one verified sample; export/readback drafts and visual QA. Classic Loop Grid absent from MCP supported-widget list, so use native editor for Filter Everything integration, not an unverified Atomic loop substitute. Relationships prepared as schema only; no active custom integration. No release approval requested yet because reviewable implementation is incomplete.
Rollback of this preparation: new isolated drafts only; retain unpublished/unassigned or move these three new objects to Trash after verifying no consumers. This is not a verified full-site recovery method. Before activation, obtain completed file+database backup and demonstrated accessible restore workflow, preserve affected configuration, and present exact changes/rollback for approval. Never perform public test publish/unpublish experiments.
