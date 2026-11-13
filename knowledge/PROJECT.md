# Chicago Mounting — project knowledge
## GSC indexing and native Schema access — 2026-11-13 continuation

Whole-site GSC audit covers96unique current sitemap URLs plus171knownURL register and33individualInspections.11accepted indexing requests(catalogue+10cases), twoquota-rejected, othereligible requests held after quota; request≠Indexed. One newFrameProcase alreadyIndexed. Existing sitemap.xml resubmission confirmed; index rereadNov13/discovered81, post-child reread33 not verified. No production SEO policy edits. [Existing SEO report/register](SEO-REPORT.md).

Product11217 AIOSEO “blank” panel was a collapsed native metabox, now expanded/persisted. Unsaved manual199USD Product pilot prepared/discarded; emptyAvailability available, unverified default audience/empty-group serialization remains a pilot gate. Shop conditional canonical not natively solved; no partialredirect. Chips focus clipping is innerUL ownoverflow; no native innerstylecontrol, noCSS/layoutwrite. [Woo audit§14–15](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md). These findings supersede older unresolved metabox notes below.

## Catalogue SEO proposal — 2026-11-13

Owner confirmed Starting at prices are confirmed prices of specific products. Product schema missing24/24; proposed bounded11217 Product+Offer199USD pilot, not a global schema switch, no unverified stock/reviews. Fresh TVfacet Page2 serverHTML has noindex,follow: supersedes earlier DOM-only missing-noindex inference. Normal Shop Page2 canonical-to-Page1 and duplicate route remain a separate scoped-native proposal. No SEO production changes. [Audit§13](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md).

## Permanent CSS ownership — owner instruction 2026-11-13

All custom styles centralized in existing active theme style.css. Inspect native controls/shared ownership first; use sufficient native controls, otherwise correct owning shared rule; reusable widget CSS is a separately approved technical exception, never one-off scattering. No duplicate/masking overrides. Rule#1 new-code approval preserved in AGENTS. Shared Steps4290 cm-step::before green accent source block removed, desktop/mobile verified; badges/responsive/card borders and Chips focus retained. [Exact change/rollback](../docs/CSS-OWNERSHIP-2026-11-13.md).

## Shop native repair — 2026-11-13

Archive10276 Loop19cf30b now Numbers + Individual Pagination; source Latest Products/Date DESC/16items/Card10278 unchanged. Native Chips778063b scoped10596/mobileYes precedes grid.24products reachable16+8 without duplicates; TV17 paginates16+1, Reset all functional desktop/mobile. Supersedes prior duplicate/hidden-reset findings. No protected SEO/security/Case/P1 settings changed. Focus indicator and exact TV facet e-page2 noindex gap remain recorded for separate approval/review; Product schema next separately. [Audit §11](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md).

## Native catalogue P1 update — 2026-11-13

The two approved changes are now live: five product-facet prefixes excluded only from Rocket preload; Woo Order Attribution off. Separate saves/readbacks, anonymous desktop/mobile tests and60HTTP checks recorded in [audit implementation appendix](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md). This supersedes “after separate approval/no production change” below for these two fields. No indexing, security, Case Studies or other caching configuration changes. Existing Shop page2 duplication/hidden Reset all remain separate work; no CPU/speed improvement measured. AIOSEO/Filter Everything/Cloudflare review and approval boundaries documented; Issue#1 open.

## Current catalogue architecture — verified 2026-11-13

WooCommerce currently supplies24 published catalogue products, category/brand/attribute data, Elementor Product10701/Card10278/archive10276, three Product Filter Everything sets and request-pricing popup10937. Card10278 also appears on service/city pages. Quote4986 uses Cost Calculator; booking5890 uses Jobber. Current Orders UI empty; no active gateways/keys/webhooks found; cart/checkout/account assigned IDs reference absent pages. This is not a backend API disablement. Recommendation: keep Woo, first address confirmed Rocket facet preload and attribution assets through native settings after separate approval. No production change. Full evidence/limits: [audit](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md).

Updated: 2026-10-26 (America/Chicago).

## Scope and evidence
This is an initial consolidation of available project context, direct browser observations on 2026-10-26, and the repository README. It is not a complete export of all past conversations, source files or website settings.
Labels: **Live** = observed directly on that date; **User decision** = explicit instruction in conversation; **Historical** = older context, not reverified; **Repository** = documented in the existing repo, not newly tested.

## Business and website
- Brand: Chicago Mounting. Website: https://chicagomounting.com/
- Public business phone used in current Shorts and website: 224.519.8272.
- Focus: TV wall mounting, Samsung Frame TV, large/premium TVs, fireplace mounting, recessed media boxes, cable concealment, soundbar/audio installation.
- WordPress + Elementor observed directly. WP Rocket toolbar observed. Hostinger admin page observed. Exact active versions/settings not audited.
- YouTube channel: https://www.youtube.com/@ChicagoMounting ; channel ID UCi0iDN8zzT1YMaCyMUIX2ZA.

## Important page map
| Role | URL |
|---|---|
| Services | /services/ |
| General TV mounting | /tv-installation-and-mounting/ |
| Samsung Frame TV | /frame-tv-mounting-chicago/ |
| Fireplace / brick wall | /fireplace-or-brick-wall-mounting/ |
| Premium / large TV | /premium-large-tv-installation/ |
| Outdoor TV | /outdoor-tv-installation/ |
| Soundbar | /soundbar-installation/ |
| Quote | /quote/ |
| Prices | /prices/ |
| Coverage / ZIP hub | /find-near-me/ |
| Same-day | /same-day-tv-mounting/ |
| Blog | /blog/ |

The premium URL was found through the live Services page. Other URLs are from current/historical project context; check each page before changing it.

## Four active geo targets — user decision
| City | URL |
|---|---|
| Glenview | /tv-installation-in-glenview/ |
| Evanston | /tv-installation-in-evanston/ |
| Wilmette | /tv-installation-in-wilmette/ |
| Winnetka | /tv-installation-in-winnetka/ |

These are the current focused city pages, not the entire service area. Do not add cities or coverage claims merely for keyword expansion.

## Live observations 2026-10-26
- Winnetka page H1: TV Mounting & Installation in Winnetka, IL.
- Winnetka Elementor page ID 9888. One existing Video widget links to kO1vrsAiCkw.
- Premium page H1: Premium & Large TV Installation in Chicago.
- Premium page has one Elementor Video widget, linked to CorXHd53U5M (100-inch LG installation in Winnetka).
- Premium page sections include Large & High-End TV Mounting Done Right and Our Recent Large & Premium TV Installations.
- These observations do not confirm mobile layout or playback.

## Design and implementation history
- User decision: keep Kanit for headings.
- Historical: user disliked Noto Sans body text and requested a new body font. Final selected body font is unknown; inspect actual styles.
- User prefers clamp() for responsive text sizing.
- Do not guess the final global CSS, blog style rules, breakpoint values or font settings: they have not been recovered here.
- Quote calculator on /quote/ historically loaded with delay. Requested optimization/exclusion is not confirmed completed.
- WooCommerce filter/indexing and Cloudflare email-protection URL were discussed; exact final configuration has not been verified.
- Historical Elementor V3/MCP compatibility concerns: prefer inspecting actual legacy widgets and UI before assuming an API can copy them correctly.

## Pricing
Older discussions referenced mounting from $129, a $49 bracket and $119 cable management. These are historical, not an authoritative current price list. Read /prices/ and quote behavior before using figures. The live Winnetka page displayed “From $129” on 2026-10-26; this alone does not verify every package.

## Existing ZIP Checker repository
Original README describes v0.2.3, CSV-managed coverage, Elementor shortcodes and a popup. Status there: ready for staging, not yet approved for production. This consolidation does not change that status or claim new tests.
- cm-zip-checker/: source
- dist/: installable and older rollback packages
- docs/REVIEW-REPORT.md: independent review
- docs/RELEASE-v0.2.2.md and docs/RELEASE-v0.2.1.md: prior release notes
- docs/theme-patch/: optional theme CSS patch, previously not applied
- tests/: disposable local WordPress and E2E suites
- docs/test-results/: prior recorded results
Read those actual files before plugin work; they take precedence over memory summaries.

## Sources and gaps
Sources: this project's conversation history; 2026-10-26 YouTube Studio and site UI; existing repository README read through GitHub.
Historical strategy PDFs and SEO exports have not been reread in full during this consolidation, so their complete contents are not imported as verified facts. No website source export, complete shortcode/API inventory, final ZIP CSV, current SEO metadata inventory or production test report is included.

## Повна історія оновлення
Див. WEBSITE-HISTORY.md: користувач підтвердив повне оновлення сайту; відновлено погоджені структури головної/сервісних сторінок, дизайн і тематичні рішення. Новіші рішення про фокус TV/Audio замінюють старі універсальні згадки furniture/cameras.
