# Chicago Mounting — instructions for Work and other coding agents

## Start every task
1. Read README.md, knowledge/PROJECT.md, knowledge/WORK.md and the relevant topic file.
2. Inspect the actual code or current live page before deciding what to change. Historical notes are context, not proof of current behavior.
3. Preserve existing ZIP Checker source, releases, reports and tests. Read nested AGENTS.md files if present.
4. Use the simplest change that fully solves the requested task. No unrequested architecture, dependencies or features.

## Direct Elementor MCP access — standing user instruction (2026-11-07)

For Chicago Mounting WordPress tasks, use **direct authenticated HTTPS** to `https://chicagomounting.com/wp-json/elementor/mcp/` through **ANY available runtime**, including local Windows with Node.js `fetch` or PowerShell. **Cloud runtime is not required.** The user explicitly authorized read-only connection verification from the current local runtime: do not ask for this same authorization again.

1. Use HTTP Basic with the WordPress username and Application Password available in the authorized session context. Do not output, log or save credentials or Authorization headers.
2. MCP sequence: `initialize` → preserve the returned `Mcp-Session-Id` → `notifications/initialized` → `tools/list` → `elementor-get-page-structure` with `post_id: 15716` (or the task-relevant read).
3. **Attempt the actual HTTPS request before claiming access is blocked**, unless no HTTP-capable runtime or authorized credentials are available. Missing native tools or a ChatGPT-plugin `not_installed` status is NOT a direct-HTTP failure.
4. Do not use OAuth, ChatGPT plugins, alternative servers, proxies, or local MCP configuration files for this workflow. Do not access installed WordPress plugin files.
5. Only report connected/readiness after a successful read in the **current** session. User shared a separate Work result on 2026-11-07: direct local Node.js fetch → HTTP 200 → 22 tools → Page 15716 read. This prior result does not substitute for current verification.
6. Standing authorization covers the **read-only connection check**, not unrestricted production edits. Obtain authorization for changes according to the current task scope.

See `knowledge/MCP-CONNECTION.md`. This instruction supersedes older cloud-only and plugin-install connection instructions.

## Case Studies — canonical object guardrails (2026-11-07)

- Existing Case Studies production objects: catalogue Page **15716**, Loop Card template **15715**, Single Case **15714**, Filter Everything set **15744**, Case Studies Posts in category term **144**. Additional draft/review objects: catalogue experiment **15781**, proposed Single **15839**, static 4x4 editorial review **15878**. General Article **4432** currently serves twelve cases and should not be treated as the intended Case Studies Single.
- **Do not create new pages, posts, templates, previews, duplicate filters or CSS/JS architectures for a case-design iteration unless the user explicitly approves a new object after inventorying the existing IDs.** Reuse the existing canonical objects and draft previews. Do not delete or republish prototypes by guess.
- **User-approved status:** all sixteen case posts were intentionally published for visual catalogue review; retain publication, but keep them **noindex** until approved. A separate read-only audit found missing noindex on posts **15791, 15792, 15793**. Fix only those via supported WP admin/SEO settings and verify anonymous HTML before considering indexing protection complete.
- Scaling goal: adding future case posts should require populating content, media and taxonomy, **not** new Elementor templates or per-post PHP/CSS/JS. Resolve hardcoded Single display conditions and catalogue's fixed posts_per_page=16 safely via existing Elementor/plugin controls; protect working AJAX filters and mobile responsive design.
- The four editorial city groups in draft **15878** are proposed placements, not independently verified actual job cities. Do not present editorial mappings as proved geographic facts. Never overwrite confirmed taxonomy locations to fit a design experiment.
- Work handoff and evidence: `docs/cases/RECOVERY-AUDIT-2026-11-07.md`. Records there are Work-reported as of 2026-11-07, not a guarantee of the future live state. Before any site edit, inspect actual current WordPress state, change the minimum necessary objects and perform before/after tests. After the edit, record exact IDs, settings, checks, limits and GitHub commit.

## Accuracy
- Never invent facts, locations, test results, completed work or production readiness.
- Record evidence, date and limits. Distinguish verified live observations, user decisions, repository documentation, historical reports and proposals.
- Never repeat the earlier unverified claim that live prices are outdated. Check the current page first.
- Do not infer installation location from a room, skyline or filename. Preserve the real city. A Chicago project must not be relabeled as a suburb for SEO.
- Do not publish exact pricing, service coverage, same-day availability, equipment models or technical guarantees without current evidence.
- Do not treat another AI's report as your own verification.

## Website and code
- Examine existing Elementor layout, styles, responsive settings and global/shared templates first.
- Do not modify global/shared templates to solve a page-specific task.
- Preserve working functionality. Use semantic markup, accessible focus/hover states and responsive layout.
- For code requests, provide only the necessary replacement/insertion block unless the user requests a full file.
- Verify behavior, not merely syntax. Visual changes require desktop and mobile inspection; verify hover/focus where relevant.
- Do not claim live playback, mobile QA or successful deployment unless actually checked.
- Never leave a duplicated widget with an unchanged video URL and report it as complete.
- Existing production/staging cautions in ZIP Checker reports remain until specifically resolved with evidence.

## Installed plugin files — strict no-access rule (user decision, 2026-11-07)
- **Do not open, read, browse, edit, patch, replace, delete or otherwise access files inside existing installed WordPress plugin directories** on Chicago Mounting, including WP Rocket, Elementor/Elementor Pro, WooCommerce, ACF, Filter Everything and other installed plugins. This applies to WordPress Plugin File Editor, Hostinger File Manager, SSH/SFTP, browser tools, agent commands and other access paths.
- Do not patch any vendor/library/dependency files inside installed plugins, including `wp-rocket/vendor/wp-media/mcp-oauth/`. Do not disable security checks, authentication or updates to work around MCP issues.
- For diagnosis, use only plugin admin settings, public documentation, supported APIs, HTTP responses and non-filesystem metadata. Existing repository documentation may be read, but do not inspect installed plugin source on the website.
- **This restriction supersedes the previously considered OAuth resolver-file inspection/patch.** Stop that path. If a future task truly requires installed plugin file access, first explain the exact reason and obtain a new explicit authorization from the user. Do not treat any prior authorization as sufficient.

## Required project record after each meaningful task
- Update knowledge/WORK.md with the current task status, exact next step, blocker and affected URLs/files.
- Append a dated entry to knowledge/CHANGELOG.md: request, actual changes, verification, limitations, commit/link and remaining work.
- Update the relevant knowledge file when a fact or decision changes. Mark superseded information instead of silently preserving contradictions.
- Put optional ideas in knowledge/IDEAS.md, separate from approved work.
- Commit and push documentation with implementation. For browser-only work, still commit the task record before reporting completion.
- If GitHub access fails, disclose that the record was not saved. Never say it was pushed without checking the returned result.
- Never store passwords, cookies, tokens, private customer data, private email excerpts or personal information.
- This repository is public as checked on 2026-10-26; keep project records suitable for public access.
- Do not overwrite concurrent changes: reread the current file/head and preserve unrelated edits.

## Communication and authorization
- Answer in Ukrainian unless requested otherwise. Be concise and concrete.
- Proceed within the user's authorized task; do not repeatedly ask for routine confirmation.
- State blockers plainly and retain incomplete tasks.
- AGENTS.md guides agents that read this repository; it is not a background sync service. A new Work chat must be given this repository and instructed to read this file.

## SEO continuation
Read knowledge/SEO-REPORT.md before further SEO strategy work. Preserve the September redesign. Treat the October baseline and recovered report as historical; obtain current comparable measurements. Do not change production SEO/analytics settings outside the specifically authorized scope.

## Image presentation standards — user decision (2026-11-08)

- Across Chicago Mounting, keep image thumbnails within each grid/group at a consistent aspect ratio, size and gap. Case Study catalogue cards use 16:9; project gallery thumbnails use square 1:1 by default. Other grids follow their existing approved section design; Hero images retain their approved ratio.
- Crop thumbnail **presentation**, not original image files. Use cover and case-appropriate focal positioning so the TV, mounting work, equipment or other key subject remains visible; do not blindly center-crop, stretch or distort. Preserve the full original aspect ratio in gallery lightboxes and retain image order, optimized WebP, responsive sources and truthful alt text.
- Prefer existing native Elementor image and layout controls. Avoid unnecessary per-image files, plugins, scripts and CSS overrides. Check real desktop/tablet/mobile appearance, focal crops, lightbox and overflow after changes.
- Apply these standards to all **new work**. For existing pages, inspect first and correct inconsistent grids only within the authorized task scope; this decision does **not** authorize site-wide redesign or unreviewed production edits.


## Final editorial-city boundary — owner decision (2026-11-08)

- Preserve the approved four-by-four editorial matrix: Glenview/tag152=15792,15826,15816,15832; Evanston/tag153=15793,15824,15814,15812; Wilmette/tag154=15791,15820,15830,15822; Winnetka/tag155=15731,15818,15810,15828.
-15731 belongs to the Winnetka editorial group. Historical photo-label disagreement does not block editorial filters, badges or future city selections.
- Editorial placement is not verified installation provenance. Never derive factual job-city claims from tags, filenames or folder order.
- The owner explicitly stopped unsolicited changes/removal of existing location assignments, approved H1 and SEO metadata. Preserve these during the authorized content/gallery cleanup; do not silently change them to enforce a provenance interpretation. Existing taxonomy values alone are not fresh source verification.
- Latest authorized copy task: rewrite all16 Post Content stories from evidence, remove internal Media Library/development language and standalone unstyled SEO links; preserve H1,URLs,locations,SEO,noindex,photos and canonical Single15714.
- City/service integration sections stay unpublished until final authorization.


## Public Case Studies release — latest owner instruction (2026-11-11)
This supersedes all older Case Studies noindex/integration holds and the temporary launch rollback. Owner explicitly approved the public release and then required all sixteen existing case posts plus catalogue15716 /case-studies/ to remain indexable. Final public verification: all seventeen200/no noindex/no blocking X-Robots-Tag/self-canonical. Technical category144 archive and editorial tag152–155 archives remain noindex. Do not reapply noindex to approved launch objects during unrelated styling, copy or integration work. Preserve existing facet/pagination settings unless separately authorized.

All eleven dynamic modules are public. Use existing Card15715, taxonomy queries and placements recorded in docs/cases/PUBLIC-LAUNCH-2026-11-11.md. Owner rejected customer-facing editorial/provenance explanations and the added Editorial collection prefix: headings/intros corrected and prefix removed. Existing city badges retained at owner's later explicit instruction. Do not add classification disclaimers to commercial pages, substitute other-city cases, change facts or invent provenance. No new objects/templates/filters or structural redesign. Existing style.css TEXT LINKS rules now also cover paragraph/list links in Single15714 Post Content through existing green/hover/focus variables; keep this shared ownership, no per-case CSS.
