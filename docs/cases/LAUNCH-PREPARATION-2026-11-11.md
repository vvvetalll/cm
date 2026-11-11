# Case Studies launch preparation — 2026-11-11

**Final recommendation: GO for the owner's release approval; release remains held.** The previously unverified hosting recovery and publication-query checks below are now completed. Noindex has not been removed and no held integration has been published. The owner clarified that only functional launch checks should continue; no design or mobile-layout tests were repeated in this continuation.

## Previously completed

The November9 audit already established the 16 published cases, 96 images, catalogue/filter/pagination behavior, reusable Single15714 and Card15715, responsive layouts, galleries, service links and individual noindex protection. Those historical checks were reused for unchanged components. No replacement architecture or objects were created.

Repository default branch: `claude/chicago-mounting-zip-review-szeoup`; initial HEAD `3e56590ad7aa7adb348d4833b4982ecd5f0818d1`. Root instructions, project/work/changelog, SEO and MCP documentation, final audit and supporting case/verification/integration reports were read.

## Actual changes

| Existing object | Final change |
|---|---|
| Catalogue Page15716 | Name **Case Studies**; final URL **https://chicagomounting.com/case-studies/**. Owner's interim /cases/ choice was explicitly superseded. Native shortcode reset URL and saved fallback content updated. Unique description now describes projects and collection/type filters; noindex retained. |
| Category144 | Same single category, same name and all16 case relationships. Its automatic archive previously intercepted /case-studies/. Changed archive slug to **case-studies-archive**, retaining noindex; custom canonical points to the catalogue. No additional category. |
| Existing active theme functions.php | Appended one native `term_link` filter mapping category144 to published catalogue Page15716. Exact full editor text compared to original plus appended filter before save; reload confirmed persistence. Existing code unchanged. Removal of this filter is the targeted rollback. Source: `case-category-link-hook-2026-11-11.php`. No installed plugin files accessed. |
| Single15714 | Existing breadcrumb a4a0776 and return button b717bf4 point to /case-studies/. No duplicate schema; AIOSEO remains the BreadcrumbList owner. |
| Card15715 | Existing Post Info c7a91e2 Before label is **Editorial collection: **. Dynamic tags/assignments retained. This distinguishes editorial city grouping from actual Project Facts location, including15731. |
| Case15824 | Disputed **Frame Pro** changed to neutral family-level **Samsung Frame** in title/H1, excerpt, SEO title/description, body and three inline gallery ALT/lightbox labels. URL `/samsung-frame-pro-fireplace-installation-with-sonos-amp/` preserved, along with six photos/order, 65-inch size, recessed-outlet/existing-Sonos-Amp account, classifications and noindex. No replacement model claimed. |
| Media16084/16046/16050/16051 | Removed Pro from existing title/ALT only. Original files, URLs and dimensions retained. |
| Prepared11 integration snapshots | New dated preparation record uses /case-studies/ links, same existing section/widget IDs, Card15715 and bounded four-item taxonomy selections. Original historical snapshot retained. No destination page modified or integration published. |

Case15731 itself was not edited: neutral factual wording, unknown actual location, historic Winnetka URL and approved editorial tag155 preserved. No installation city inferred. The exact15824 model code remains unknown, but public copy no longer requires a Pro-specific assertion.

Supported WordPress admin/Elementor UI was used through an existing authenticated browser session. No current direct-MCP credential source was available, and none was extracted from storage or prior artifacts. No new authenticated direct-MCP success is claimed.

## Completed verification

- Anonymous reads: all16 case URLs200/noindex/self-canonical/Single15714; one BreadcrumbList each, now linking the same /case-studies/ hub as the visible breadcrumb. Existing case titles/descriptions and November case-image ALT checked in rendered HTML. Evidence: `launch-public-verification-2026-11-11.json`.
- Final catalogue URL serves **Page15716**, rather than the former archive template, with self-canonical/noindex and reset/back links to the final URL. Technical archive remains noindex and canonicalizes to the catalogue. Legacy root URLs resolved to the renamed catalogue in completed reads; no manual redirect rule added.
- All four city and seven type result URLs on the new base returned expected memberships. Base pagination is8+8 distinct cases; premium filtered page2 has the remaining3 of11. Winnetka remains15828/15818/15810/15731.
- Actual mobile interaction: Glenview selection returns its4 cases; Glenview+Standard returns0 with `No installations match these filters.` Reset returns the new base with8 first-page cards. Desktop page2 transition works.
- Actual rendered widths1366/768/390 show4/2/1 catalogue columns and no document overflow. Mobile full-page capture shows all8 page2 cards, including15731 with an Editorial collection badge. Badge text fits; image presentation unchanged. Corrected15824 title/summary inspected at desktop/default and390px, no overflow, six gallery figures retained. Earlier full-gallery/lightbox QA was reused; no fresh exhaustive lightbox/device certification claimed. Browser viewport overrides reset.
- All11 destination URLs200 with no public case-selection sections. Preparation records contain11 grids using Card15715, category144, four items and no explicit post-ID lists. This supports automatic selection structurally, not on-page runtime certification.
- Native Hostinger Clear cache action used after shared breadcrumb/card edits; UI reported cache cleared. Anonymous breadcrumb output subsequently aligned on all16 pages. No hosting/cache configuration changed.

A repeated public-read batch was interrupted in the earlier continuation and is not used as additional evidence. The saved public JSON retains the last completed whole batch. Further design/mobile re-audits were explicitly excluded from this final functional continuation.

## Final functional launch checks — completed after access was restored

### Recoverable hosting backup

Authenticated Hostinger hPanel for **chicagomounting.com** now verifies a website backup dated **2026-11-11 01:10**, exactly as displayed by Hostinger (timezone not shown; no conversion inferred). Automated schedule is **Daily**, next backup November12. Files → Backups → Restore and download → Website backup exposes the matching timestamp and enabled **Restore website** and **Download website** actions. Hostinger explicitly describes this website backup as including the website **and database**. Recovery mechanism is therefore available in the hosting control panel; no restoration or download was initiated. The panel notes that redundant backup-plugin archives, cache and database-export files are excluded; this is distinct from its included database backup. This replaces the prior login/access blocker. No hosting configuration changed. No existing staging environment is listed; none was created.

### Automatic cache invalidation correction

Found the existing WP Rocket **Always Purge URL(s)** field still used `/installation-case-studies-draft/(.*)` after the catalogue rename. Replaced only that line with `/case-studies/(.*)`, retaining all11 consumer paths exactly. Native save and persisted field readback completed. Before/after form controls compared by name/type/value/checked state: the only changed setting was `wp_rocket_settings[cache_purge_pages]`. No plugin files or Cloudflare settings accessed/changed. Targeted rollback: restore the old first line only if the catalogue itself is rolled back.

### Publication lifecycle and empty-query behavior

Used the existing noindex case **15791** as a reversible publication-status check; no fixture/new case created. Anonymous Standard TV Mounting selection returned **[15791]** before the change; after native Published→Draft save it returned **[]** and `No installations match these filters.`; after restoring Published it again returned **[15791]**. No manual cache clear or destination edits between these reads. Noindex remained on the query, and editor readback confirms the original title/body exactly, original November7 11:26am publication date, slug, published status and indexing protection. Automatic modified timestamps naturally changed. Exact three-phase evidence: `publication-query-check-2026-11-11.json`.

### Held integration readiness and evidence reuse

The native11 destination sections were already actually rendered and their taxonomy queries tested before their ordered withdrawal on November8. That report also records a reversible tag-membership test proving automatic inclusion/removal in Evanston after the native purge configuration was fixed. **Reuse this valid evidence** from `COMPOSITION-2026-11-08.md`; do not misclassify the unchanged native query mechanism as never tested. The current November11 preparation preserves those exact section/widget IDs, Card15715, category144+editorial tag/service-type selectors, four-item limits, empty messages and4/2/1 settings; only catalogue navigation paths were refreshed. November9 multi-service taxonomy expansion changed eligible populations, whose current memberships were checked at the final filter URLs. Eleven consumer paths remain covered by the purge rule.

The current native public Loop Grid lifecycle/empty checks, previous actual integration/tag tests, current taxonomy memberships and unchanged prepared query architecture provide adequate functional release evidence for these16 cases. No requirement for a new mapping system, new staging site, 10,000-record load test or repeated design audit is introduced as a blocker. Missing/deleted-term simulations and a new-case import were not performed; no such fault or importer change is present in this launch scope. The11 blocks intentionally remain absent from current destination pages, so this is readiness to restore the prepared sections **after approval**, not a claim that they are already deployed. Normal post-release smoke checks should confirm the approved live deployment.

### Release boundary

No remaining demonstrated pre-launch blocker for the current16-case system. Recommendation **GO**, subject to explicit owner approval. Release scope for approval: restore the prepared11 sections on existing destination IDs9833/9987/9701/9888/15342/11178/8156/5671/3398/3281/1682 and remove individual noindex only from the16 existing case posts plus catalogue15716. Retain noindex/canonical consolidation on the technical archive144 and editorial tag archives; preserve unrelated/global SEO settings. No menu addition, sitemap submission or global indexing change is implied.

Capacity at10,000 cases and CWV remain unmeasured and are not promised. The original four photo gaps and exact15824 model code remain documented source limits; current neutral copy does not depend on an unsupported model or installation-city assertion. A backup restore has not been rehearsed, but the dated recoverable full website/database backup and restore mechanism are now verified as requested.

## Recovery and references

Before changing catalogue/category slugs back, coordinate both so the archive cannot intercept the page. Restore only the two Single URLs, original empty Card Before label and appended theme filter if rolling back; compare concurrent edits first.15824 prior strings/body and media evidence are in the November9 audit/correction snapshots, with native post revision16249 recorded after the current edit. These are targeted rollback instructions, not verified hosting recovery.

Official behavior references: [WordPress term_link](https://developer.wordpress.org/reference/hooks/term_link/) and [AIOSEO breadcrumb/schema distinction](https://aioseo.com/docs/displaying-breadcrumbs-on-your-site/). AIOSEO front-end template settings do not alter breadcrumb schema, which is why the category-to-page link was corrected at its existing WordPress source.
