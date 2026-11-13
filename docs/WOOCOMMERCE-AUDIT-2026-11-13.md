# Chicago Mounting — WooCommerce catalogue audit

**2026-11-13 · America/Chicago · [Issue #1](https://github.com/vvvetalll/cm/issues/1)**

**Recommendation: keep WooCommerce and optimize its catalogue configuration. No production changes made.** The strongest confirmed issue is WP Rocket preloading combinations of product filters. Replacing WooCommerce would not inherently fix that interaction and would require rebuilding working catalogue dependencies. No measured migration benefit currently justifies that risk.

## Scope and evidence

This is an investigation and remediation plan, not a completed optimization. Read AGENTS/README/PROJECT/WORK/CHANGELOG/SEO/MCP records and the [existing Cloudflare investigation](CLOUDFLARE-BOT-REMEDIATION-2026-11-11.md). Verified default branch `claude/chicago-mounting-zip-review-szeoup`; fast-forwarded the initially clean checkout to1538b14. Current-session MCP Page15716 read succeeded. Read Woo page assignments,24 products, Theme Builder, Product10701, Card10278 and request popup10937. Template `is_active:false` metadata was not treated as disuse: public HTML actually renders10701/10276/10278.

Read-only administration covered Woo settings/status/scheduler, Filter Everything, WP Rocket, Site Health and Hostinger resources/access logs. Also queried Cloudflare, GSC and Ahrefs. Anonymous GETs covered eight page classes, all24 products, categories, a brand, facet/query/pagination samples, robots and XML sitemaps; maximum three concurrent requests, no load test. Two browser resource snapshots used an existing logged-in Chrome profile with warm cache and pre-existing cookies; they are not anonymous baselines.

Installed plugin source was not opened/downloaded for analysis. Normal page loading and public asset references were observed, without fetching plugin response bodies through diagnostic tools. No orders, submissions, job retries, cache purges, preload runs, settings saves or security exceptions performed.

Evidence: [admin/hosting/browser](woocommerce-audit-2026-11-13-admin.json), [HTTP baseline](woocommerce-audit-2026-11-13-http.json), [24 products](woocommerce-audit-2026-11-13-products.json), [product/category/query HTTP](woocommerce-audit-2026-11-13-products-http.json), [facets/sitemaps](woocommerce-audit-2026-11-13-routes.json), [analytics/security samples](woocommerce-audit-2026-11-13-analytics.json). Admin evidence is a selected transcription, not a raw settings dump. Credentials, cookie values, visitor IPs, customer records and the full private GSC export omitted.

**Remaining limits:** no per-request CPU/SQL profiling, named autoload-option ownership, full historical access/error-log investigation, complete anonymous interaction HAR across every page class, GSC Index Coverage/Crawl Stats or verified Googlebot crawl test. These do not invalidate the concrete queue/asset findings.

## 1. Architecture and dependencies

| Component | Current evidence | Decision |
|---|---|---|
| Products |24 published; all24 anonymous200/self-canonical/no noindex; all24 in product sitemap |Essential; preserve IDs, URLs, media, SKU, prices and characteristics |
| Categories |TV17, Audio3, Mounts4; all three archives200/indexable/self-canonical and in sitemap |Preserve navigation/indexing |
| Brands |Samsung, LG, Sonos, Sanus, SunBrite, Sony, Neptune; sampled `/brand/samsung/`200/noindex/self-canonical |Useful navigation; preserve current noindex policy |
| Attributes |Eight registered: Audio Type, Color, Display Type, Mount Type, Outdoor Environment, Screen Size, Series, Usage |Specifications/filtering; registration alone does not establish indexable attribute archives |
| Shop/archives |Assigned Shop10263; archive10276 rendered; category archive10767 assigned;10769 exists without conditions |Keep working objects; unassigned does not prove safe deletion |
| Single Product10701 |Woo breadcrumbs/images/title/meta/short description/additional information/price/related widgets; ordinary button and content tabs |Direct Woo data/widget dependency |
| Card10278 |Woo title/price, dynamic image, REQUEST |Also appears on service1682/city9888; not every non-Shop Woo asset is waste |
| Filter Everything |10596 Shop,10773 categories,11019 brands target Products;15744 Case Studies targets Posts |Preserve all four; Case Studies is not Woo products |
| Shop facets |Category, Brand, Display Type, Mount Type, Audio Type; checkbox OR selections/path prefixes; AJAX on |Useful visitor filtering; combinations need not be preloaded |
| Price request10937 |Elementor form60a079d; card/single links open popup |Essential lead flow; retain form email/SMTP |
| Quote/booking |`/quote/`4986 uses Cost Calculator; booking popup5890 uses Jobber |Separate from Woo checkout; hidden calculator payment integrations not fully audited |
| Cart/checkout/account |MCP resolves null; Status says assigned IDs reference absent pages; selectors empty |No working assigned pages; this does **not** disable backend cart/APIs |
| Orders/payments |Orders UI empty; WooPayments/PayPal offer Install; all three offline gateways offer Enable |No active Woo order/payment workflow found; deleted historical orders not independently audited |
| Woo REST keys/webhooks |Native lists empty |No configured Woo integration found; preserve WordPress/Elementor/Jobber APIs |
| Tax/accounts |Taxes off; default location Shop country; checkout/account registration off; guest checkout on |Existing disabled settings fit catalogue use |
| Stock/shipping/coupons |Manage stock on, hold60minutes; shipping on with no methods; coupons on |Cleanup candidates, subject to manual inventory/quote dependencies |
| Attribution/analytics/email/reviews |Attribution/Analytics on; most core emails enabled; reviews on |Attribution has visible frontend cost; enabled flags alone do not prove expensive execution |

Current UI versions: Woo11.3.0/DB11.3.0-1, WordPress7.1.4, Elementor4.4.0, Filter Everything1.9.8, Rocket3.24, PHP8.3.36/LiteSpeed. Version metadata is not a vulnerability diagnosis. Woo reports no declared theme Woo support or template overrides, while Elementor widgets render publicly.

## 2. Performance findings

### Anonymous baseline

Headers time includes client network/TLS/DNS, not PHP execution. `cfOrigin` is an edge-reported origin duration, not CPU/SQL time. Bytes are decoded HTML, not total compressed page transfer. One measurement is not a controlled comparison.

| URL | HTTP | Headers ms | HTML bytes | cfOrigin ms |
|---|---:|---:|---:|---:|
| `/` |200|896|637776|167|
| `/tv-installation-and-mounting/` |200|889|667996|166|
| `/tv-installation-in-winnetka/` |200|888|728421|175|
| `/case-studies/` |200|412|467125|184|
| `/blog/` |200|210|327780|75|
| `/quote/` |200|318|356140|163|
| `/shop/` |200|232|594013|82|
| `/product/sanus-outdoor-tilt-mount/` |200|308|501061|168|

All eight HTML documents reference six Woo JS assets: `wc-jquery-blockui`, `wc-add-to-cart`, `wc-js-cookie`, `woocommerce`, `sourcebuster-js`, `wc-order-attribution`. Exact URLs/attributes in evidence. BlockUI is deferred; most others Rocket-delayed in this anonymous baseline. **Six references are not six immediate requests.**

- `sourcebuster/sourcebuster.min.js` and `frontend/order-attribution.min.js` are concrete removal candidates for this catalogue. The native attribution feature is enabled.
- `frontend/add-to-cart.min.js` appears on Blog/Quote; AJAX archive add-to-cart is enabled, while sampled cards/single use Request Pricing. Actual removal from a setting change still requires verification.
- Service/city Product Cards and product-gallery zoom/flexslider/photoswipe/single-product scripts are real dependencies. Blanket Woo asset removal is unsafe.
- No cart-fragments or Store API reference in these eight HTML responses, or corresponding request in two browser snapshots. `wc-ajax` occurs twice in configuration: **not two executed AJAX requests**. Full interaction behavior is untested.
- No Set-Cookie in the eight anonymous responses. Existing browser Woo cart/Sourcebuster cookie names cannot establish creation by this test; server session count/age unmeasured.
- Logged-in homepage:9 Woo resource entries (6JS/3CSS), transferSize0/warm cache, navigation TTFB1128.8ms/duration2264.9ms. Product:22 Woo-matched entries including Elementor Woo CSS, TTFB1430.9ms/duration6341.8ms. Zero transfer does not mean zero parsing/execution. Neither snapshot is anonymous LCP or estimated savings.
- Rocket Delay JS/Remove Unused CSS are enabled. Anonymous standalone styles differ from logged-in loading; Woo's share of inline used CSS was not measured.

### Background work and database

Status13Nov12:26:26−06:00: **5284 complete,37 failed,63 pending,12 cancelled**. Shared Action Scheduler counts are not Woo-only.

1. **Confirmed facet preload timeout:** action1014564, `rocket_preload_job_preload_url`, URL `/shop/product_category_filter-audio/product_brand-lg/product_display_type-ips-led-or-micro-rgb-or-mini-led-or-neo-qled-or-oled-or-qd-oled-or-qled`. Created17:43:07Z, started17:46:15Z, failed17:52:00Z on13Nov. Log says in-progress≥300seconds: elapsed timeout, **not300seconds CPU**. Exact timeout cause remains unknown.
2. **Current queue:** pending1015053–1015062, ten visible multi-facet preload jobs created18:26:14Z. Rocket Preload on, Exclude URLs blank. Real local preload activity is established independently of Cloudflare UA strings.
3. Historical `fetch_patterns` failures, groupWooCommerce: no callbacks registered. Actions498353/543313 on6/9Oct say another instance will not be scheduled. Not proof of a current retry loop; do not Run All.
4. Hostinger notification jobs579470/581461/983788 also show≥300second failures. Site Health flags overdue `rocket_saas_on_submit_jobs`. Different components require separate diagnosis.

Database **703.21MB**: posts242.74MB including index + postmeta399.26MB =642MB, **91.30%**. There are13,096 revisions; byte ownership per revision not measured. This suggests edit-history investigation, not proof that all642MB are revisions or Woo data. Sessions0.20MB; options5.77MB; Action Scheduler actions4.82MB + logs2.24MB≈7.06MB. One snapshot cannot establish growth rate.

Site Health: **815 autoloaded options, displayed size1MB**; owners unknown. External object cache absent. No options/revisions/sessions/actions deleted.

### Hosting and logs

Hostinger dashboard Last24h: CPU3–40%, memory210–284MB. Detailed displayed13Nov11:32–12:32 chart: CPU0–40%, PHP workers0–1 of60, memory0–284MB against displayed3.1kMB limit, processes0–3 of120, I/O peak305KB/s. UI timezone not independently established; latest zero buckets may be incomplete. **No resource saturation demonstrated in this sample, no component-specific CPU attribution.** Audit requests affect the window.

Traffic UI showed2054requests/89.02MB with06:30–12:30 chart; not called a daily total. Five newest access rows inspected: two Hostinger challenge GETs; two admin-ajax POSTs674.197/724.66ms; one wc-site-health GET905.592ms. Consistent with current diagnostics, not attack evidence. Full historical access/error logs and SQL profiling remain unexamined.

## 3. SEO and URL generation

**Preserve legitimate canonical catalogue URLs:** Shop,24 products, three categories pass HTTP/robots/canonical and sitemap checks. Brand navigation remains useful; sampled Samsung archive noindex retained. Catalogue value includes assisted sales, not just organic clicks.

GSC Search Analytics14Oct–10Nov:11 product URLs,34 total impressions/0clicks; Shop7impressions/0clicks. No faceted URLs in65returned page rows. **Not index coverage/crawl data:** absence does not establish no crawl waste or justify removing indexing. The11Nov Case Studies launch is outside this reporting window.

| Tested route | Current observation | Interpretation |
|---|---|---|
| `/shop/product_category_filter-audio/` |Anonymous403/`cf-mitigated:challenge`, challenge noindex/nofollow |Origin SEO head invisible; challenge robots are not AIOSEO output |
| `/shop/product_brand-samsung/` |Anonymous403 challenge |Not proof of canonical defect |
| `/shop/product_mount_type-tilt/` |200/noindex,follow/canonical `/shop/`; cfOrigin1569ms |Sampled facet policy works; one slow response is not PHP profiling |
| `/shop/?orderby=price` |200/canonical `/shop/`, no explicit noindex |Canonical consolidation; preserve policy |
| `/shop/?min_price=100` |200/canonical `/shop/`, no explicit noindex |Synthetic GET; price-filter UI generation not established |
| `/shop/page/2/` |200/noindex,nofollow/canonical `/shop/` |Existing pagination policy retained |

Authenticated Audio filter selection changed URL and displayed three soundbars. AJAX kept the base head/canonical in the existing DOM; not direct-origin robots verification. Checkbox helper reported checked-state wait failure, but subsequent DOM verified changed results/URL. No full mobile/reset certification.

Filter Everything UI: all7 Indexed Filters checkboxes off; Post/Product Indexing Depth blank; Disable filter links for crawlers ON; AJAX ON; automatic robots blocking OFF. Checkboxes expose `data-wpc-link` rather than ordinary anchors, but generated paths remain reachable and observed in traffic.

Current robots blocks `/shop/product_category_filter-*`, with no equivalent facet rules for brand/display/mount/audio or category-based combinations. **Partial coverage, not authorization to change indexing.** Robots disallow can prevent reading noindex; global settings also affect approved Case Studies. Preserve17 approved indexable launch objects and existing facet/pagination policies.

Cloudflare challenge covers category/brand/display prefixes; mount/audio outside that expression. Scope difference is not proof of vulnerability. OR selections generate many near-duplicate/empty-result possibilities;90 distinct paths in five minutes proves actual requests, not total possible URLs.

Rocket Cache Query Strings blank: no demonstrated separate cached ordering/pricing variants. **Path-facet preload proven.** Actual facet cache file count/size unknown; a queued URL does not prove successful cache creation. Sitemaps contain24products/3categories, no facet sitemap observed.

Ahrefs project10403453 last completed crawl7Nov18:39:57Z:606 internal URLs, Health100,2URLs with errors. It flags24 products missing Product schema. Current Sanus HTML confirms **one live instance**: AIOSEO ItemPage/WebPage and two BreadcrumbLists, no Product JSON-LD. Trails differ: Home→Shop→Sanus→Product versus Home→Mounts→Product.24 is historical, not24fresh schema validations. Missing Product schema limits rich-result eligibility, not proven ranking loss. Never invent Offer/reviews/availability.

## 4. Security and bots

The11Nov investigation used capped samples and did not authenticate Rocket egress. Historical counts are not current totals. Owner-IP exception untouched; no new Allow or crawler-UA exemption.

Current ruleset80f45448e225460db730c72bb28e3ebf/version4:

- a82a51d8352642d09a006b057b82dece: challenge category/brand/display facet paths, non-verified bots, methods other than POST.
- a9140a1de39d4d88ad8e211aefbd4c9b: block verified bots only on `product_category_filter` paths, an existing narrow crawl policy. Not widened/removed; not a sitewide search-engine block or proof of successful Google crawling.
- Current API reads: BIC on, security medium, Bot Fight Mode on, JS detections on. No weakening.

12Nov18:00Z–13Nov18:00Z broad latest-events query hit1000cap:896challenge/45solved/45bypassed/14managedblocks. **Not daily totals or unique requests/people.** Do not add overlapping queries.

Narrow13Nov17:55–18:00Z (11:55–12:00Chicago):180events below cap,90 distinct paths;172challenges edge403/origin0, four solved and four bypassed origin200.156 carried Rocket UA. Some traffic reaches origin, **not necessarily PHP/SQL**: origin page cache can answer200. Origin0 events show no origin response. Sampling/multiple challenge events remain limitations; no daily-rate extrapolation.

Native queue proves local facet preloading, but **does not authenticate every Cloudflare Rocket-UA event**. Need egress/time/URL correlation, not spoofable UA allowlisting. Facet activity may be crawling/preload/automation; not all confirmed attacks.

Separate managed-WAF query for same24h:24events below cap, all edge403/origin0:18homepage,2`/wp-config.php`,1`/wp-config.php.bak`,1`/index.php`,1`/wp-json/batch/v1`,1`/wp-admin/wp-config.php`. Config probes are consistent with hostile scanning. Homepage payloads unavailable; exploit validity/false positives unresolved. No successful compromise or Woo-specific exploit established. Config paths were read from events, not requested by this audit.

## 5. Evidence-status table

| Status | Finding | Evidence / limit |
|---|---|---|
| **Verified problem** |Facet preload waste |Ten pending jobs, one elapsed timeout, blank exclusions |
| **Verified overhead** |Attribution JS outside Shop |Two of six references across eight pages, native feature on |
| **Verified configuration** |Unused-looking commerce flags |Stock/shipping/coupons on, Orders empty, no shipping methods; savings unmeasured |
| **Verified; owner unknown** |Autoload1MB/815 |Site Health, no named option sizes |
| **Verified failures** |Shared scheduler |Woo historical callbacks, Hostinger/Rocket examples; not one cause |
| **Verified sampled SEO gap** |Schema/breadcrumbs |One current product,24historical Ahrefs products |
| **Suspected** |Preload/WAF contributes to CPU |Mechanisms observed; cost/correlation absent |
| **Suspected** |Revision-driven DB growth |13096revisions/posts+meta91.30%; ownership/growth unknown |
| **Not reproduced** |Global cart-fragment storm |No references in eight responses/calls in two snapshots |
| **Not established** |Woo causes slow homepage |Sampled cfOrigin167ms; historical GTmetrix Hero issue is not Woo attribution |
| **Additional data** |Anonymous runtime/cookies/full filter QA |Complete interaction HAR/clean context absent |
| **Additional data** |Index coverage/Googlebot |Search Analytics is not Crawl Stats/URL Inspection |
| **Additional data** |Historical attack root cause |Full logs/payloads not analyzed |

## 6. Prioritized remediation — separate production approval required

| Priority / correction | Impact and native support | Dependencies / side effects | Rollback | Verification |
|---|---|---|---|---|
| **P1: exclude five product-facet prefixes from Rocket preload** |Native Preload→Exclude URLs; expected less queue/network work; CPU saving unknown |Keep Shop/products/categories/Case Studies; preload exclusions, not cache rejection or WAF exception; cold facet first visit possible |Restore recorded empty `preload_excluded_uri`, Save |No new matching jobs after normal preload cycles; canonical URLs still preload; compare equal hosting/event windows |
| **P1: disable Order Attribution** |Native Woo Settings→Advanced→Features; expected removal of two JS references/new attribution cookies |Lose Woo order-channel attribution; preserve other lead tracking |Restore feature on, Save, normal invalidation |Fresh anonymous eight-page HTML/runtime; two references absent; request/quote/booking/filter preserved; measure before claiming speed gain |
| **P2: AJAX archive add-to-cart off** |Native Products→General; script removal not guaranteed |Verify product types/hidden cart entry points; not complete catalogue/security mode |Restore checked state |Compare assets/network; test cards/single/related/filter/requests |
| **P2: shipping/coupons off; stock only if unused** |Native General/Products→Inventory |Confirm manual inventory/calculator needs; stock status/schema visibility may depend on data; no bulk product edits |Restore shipping prior scope, coupons/stock on, hold60 if changed |Warning gone, prices/status/counts/quote intact; compare load/jobs; savings may be small |
| **P2: autoload owners and overdue Rocket cron** |Read-only diagnostics first; repair depends on owner |No unknown-option deletion or WP-Cron disabling; inspect server cron/loopback/vendor callback |No mutation during diagnosis; later repair needs its own before-state |Named byte ownership, late-event status and comparable TTFB |
| **P2: investigate specific failed hooks** |Native scheduler/status, vendor-supported repair |No Run All for missing callbacks, no deleting37failures to hide symptoms |Later deletions require backup restoration plan |Track new failure timestamps/hooks, not old accumulated count |
| **P3: Product schema/breadcrumb ownership** |Existing AIOSEO/Elementor controls where available; verify exact control before saving |Validate24current products; truthful prices/availability, intended hierarchy; no new plugin |Restore scoped SEO/widget settings |JSON-LD/rich-result validation and visible-data match; preserve robots/canonical; not ranking proof |
| **P3: facet crawl coverage review** |Native robots/Filter Everything/AIOSEO; separate SEO decision |Coverage/logs first; disallow can prevent reading noindex; globals affect Case Studies |Restore exact prior rules |Base/facet/page2 HTTP/head/sitemap and legitimate crawler access |
| **P3: revision retention investigation** |Ownership/bytes/backup review before cleanup |Revisions protect active Elementor work; no blanket database cleanup |Verified DB backup restore, separately planned |Demonstrate byte/growth benefit and preserved editing recovery |

Concrete proposed **preload-only** patterns for current prefixes under Shop/category/brand contexts:

```text
/(.*)product_category_filter-(.*)
/(.*)product_brand-(.*)
/(.*)product_display_type-(.*)
/(.*)product_mount_type-(.*)
/(.*)product_audio_type-(.*)
```

**Proposed, not applied or behavior-tested.** Preserve existing12cache-purge paths, calculator Delay JS exclusions and Case Studies policies. Rocket preload exclusion does not prohibit visitor-triggered caching; no promise existing cache files disappear. Vendor describes removal from preload database on a subsequent run. No helper plugin/custom filter needed for an existing UI control.

For approved work: record before-values; change one component; Save/read back; test anonymous prices/images/related/REQUEST form without submission/quote readiness/Jobber/five facets/reset/pagination at desktop/mobile; preserve17indexable Case Studies objects; compare equivalent queue/security/hosting windows. Roll back only the changed component on regression. No WAF weakening. A later24h measurement is follow-up verification, not an automation created here.

## 7. Architectural decision

1. **Necessary?** Not the only theoretical catalogue platform, but required by current product data, Elementor Woo widgets, related queries and three Product filter sets.
2. **Lightweight catalogue possible?** Yes: request-based presentation already exists and native controls address confirmed overhead. Missing cart pages are not a backend purchase lock. Purchasability/Store API exposure needs a separate non-transactional check; no verified universal native catalogue kill-switch found.
3. **Native settings?** Attribution/analytics/AJAX buttons/coupons/shipping/stock/individual emails exist. Prioritize proven work; enabled flags without orders are not automatically performance defects. Do not block shared scheduler/REST APIs wholesale.
4. **Without code?** Both P1 actions use existing controls. Complete selective Woo asset removal outside Shop not found as a native control; service/city cards need Woo. No optimizer plugin/custom dequeue proposed.
5. **Replace?** Native pages alone do not reproduce product fields/prices/related queries. Replacement entails data/taxonomy/template/filter/URL/SEO migration and does not inherently prevent OR-facet crawl/preload. No demonstrated net benefit outweighs these dependencies.

**Keep and optimize.** Reconsider replacement only if profiling after native cleanup demonstrates material unavoidable Woo CPU/DB/maintenance cost and a replacement has a quantified net advantage. Neither established now.

## Official references checked

- [Rocket preload exclusions](https://docs.wp-rocket.me/article/1721-exclude-urls-from-being-preloaded): native box, wildcards, preload/cache distinction.
- [Rocket preload behavior](https://docs.wp-rocket.me/article/8-preload-cache): queue and query-string limitations.
- [Woo settings](https://woocommerce.com/document/configuring-woocommerce-settings/), [General](https://woocommerce.com/document/configuring-woocommerce-settings/general/), [Inventory](https://woocommerce.com/document/configuring-woocommerce-settings/products/), [Advanced](https://woocommerce.com/document/configuring-woocommerce-settings/advanced/): supported controls; saved values came from current UI.
- [Cart fragments guidance](https://developer.woocommerce.com/2023/06/16/best-practices-for-the-use-of-the-cart-fragments-api/): Woo presence does not prove global fragment execution.

## Record / next step

WORK/CHANGELOG/PROJECT/SEO-REPORT link this report. Commit and verified remote SHA recorded in Issue#1 after push. No optimization applied or declared successful. Next decision: separately authorize concrete P1 changes, not removal/migration/indexing/security edits. Issue remains open for remediation and listed measurement gaps.
