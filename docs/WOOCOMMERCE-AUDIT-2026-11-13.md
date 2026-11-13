# Chicago Mounting — WooCommerce catalogue audit

**2026-11-13 · America/Chicago · [Issue #1](https://github.com/vvvetalll/cm/issues/1)**

**Recommendation: keep WooCommerce and optimize its catalogue configuration.** The original read-only audit below is preserved as a historical baseline. The two owner-authorized P1 native changes were subsequently applied and verified; see the implementation appendix. No indexing or Cloudflare changes were made. Replacing WooCommerce would require rebuilding working catalogue dependencies; no measured migration benefit justifies that risk.

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


## 8. Authorized P1 implementation and expanded SEO/security review — 13 November 2026

This appendix supersedes the earlier “not applied / next authorization” statements for **these two P1 actions only**. Owner authorized native preload exclusions and attribution off, followed by verification and repository/Issue updates. Later instructions expanded read-only SEO and Cloudflare review and explicitly reserved approval of indexing and security changes. No P2/P3 implementation, custom production code, new plugin, product edit, SEO save or Cloudflare mutation occurred.

### Exact changes, save/readback and rollback

Applied separately through authenticated native WordPress controls:

| Component | Original | Saved and reloaded value | Rollback |
|---|---|---|---|
| WP Rocket → Cache → Preload → Exclude URLs, field `preload_excluded_uri` | Empty | Five lines below; native “Settings saved” notice, then exact reload/readback | Remove only these five lines, Save Changes, reload/read back; native Clear and Preload Cache if propagation needed |
| WooCommerce → Settings → Advanced → Features → Order Attribution, `woocommerce_feature_order_attribution_enabled` | Checked / true | Unchecked / false; Save changes, reload/readback | Recheck only Order Attribution, save/reload; native cache clear/preload and repeat anonymous script checks |

```text
/(.*)product_category_filter-(.*)
/(.*)product_brand-(.*)
/(.*)product_display_type-(.*)
/(.*)product_mount_type-(.*)
/(.*)product_audio_type-(.*)
```

Before saving, tested the proposed wildcard expressions against **58 real affected URLs** from the current filter links and observed queue/security routes; all matched. **37 control URLs** did not match: all24 products, three categories, normal Shop/service/city/blog/quote/catalogue pages, Case Studies pagination and its separate facet prefixes. This is a reproducible expression-match check, complemented by actual native queue behavior below; it is not an assertion that every eligible URL has completed preload.

The complete non-sensitive Rocket form comparison changed only `preload_excluded_uri`. Preloading/link preloading remain on; cache exclusions/query strings remain unchanged, as do the existing12 purge paths, calculator Delay JS exclusions, optimization and Cloudflare integration settings. Woo feature comparison changed only attribution; the other23 checkboxes remained identical. Native controls remain owner-editable. No scheduler jobs were manually canceled, retried or deleted.

Initial anonymous checks after the attribution save still returned the old two scripts from cached HTML. Recorded this unsuccessful propagation checkpoint, then used Rocket's native **Clear and Preload Cache** once; UI confirmed “Cache cleared. (November13,2026 @12:58pm)” (18:58Z). No Cloudflare purge or caching configuration change. New canonical queue jobs were created19:01:12Z. Final public responses and anonymous browser checks then showed attribution absent.

Evidence: [native before/after/settings/filter/queue JSON](P1-2026-11-13-native-verification.json), [pattern validation](P1-2026-11-13-pattern-validation.json), [Rocket screenshot](P1-2026-11-13-rocket.jpg), [Woo features screenshot](P1-2026-11-13-woo-features.jpg). Screenshots show settings, not measured performance gains.

### Anonymous frontend and asset verification

A real anonymous in-app browser (no WordPress admin bar) was tested at1366×900 and390×844, alongside low-concurrency public HTTP requests. No form was submitted, CAPTCHA solved, booking made or customer data entered.

| Test | Observed result |
|---|---|
| Five Shop filters, desktop and mobile | Audio category3 cards; Samsung8; OLED3; Tilt3; Soundbar3. Expected facet URL and prices shown; all ten interactions worked. Mobile has no horizontal overflow. |
| Reset | Unchecking each selected filter returned to `/shop/` and16 cards. “Reset all” anchor exists but is hidden/zero-size: a visible one-click reset was **not** verified; no styling change made. |
| Product | Sanus199price, gallery links/images, product details and related products rendered on both sizes. Product REQUEST Pricing opened popup10937 with phone/email required. Shop-card REQUEST also opened the same form on mobile. |
| Quote / booking | Cost Calculator TV-size/options/summary rendered on desktop and mobile. BOOK NOW opened popup5890 with Jobber iframe;11 textboxes available. Shop BOOK NOW also loaded the iframe on desktop and remained accessible after mobile resize. Loading was asynchronous; the first immediate check preceded iframe insertion. |
| Case Studies pagination | Page1→`/case-studies/2/` worked;8 cards, preserved noindex/nofollow on page2; desktop and mobile, mobile overflow false. |
| Shop pagination — existing defect | No pagination link on the16-card Shop grid. Direct `/shop/page/2/` returns the same16 products, canonical Shop/noindex/nofollow. The product-link set is identical to the **pre-change audit** response. This is not a passing pagination test; left unchanged for separate authorized work. |

Final [60-response HTTP evidence](P1-2026-11-13-final-http.json): all200; all24 product pages remain indexable/self-canonical; all three category pages remain indexable/self-canonical; product sitemap24 URLs and category sitemap3 URLs. All16 case posts plus the catalogue remain indexable/self-canonical. No challenge marker on those final responses. These checks establish accessibility from the test clients, not every crawler/network.

Equivalent eight-page HTML comparison, Woo JavaScript references (before→after): homepage6→4, Shop8→6, service6→4, city6→4, Case Studies8→6, blog6→4, quote6→4, Sanus product11→9. Exactly the two sourcebuster/order-attribution references disappeared on every sample; other Woo references remain. Final60 responses contained zero attribution references. Anonymous browser Shop/product checks likewise found none. No new Set-Cookie names in final HTTP responses; existing browser cookies were not erased, so no historical-cookie removal claim. [Before](P1-2026-11-13-before-http.json), [stale checkpoint](P1-2026-11-13-after-http.json), [final](P1-2026-11-13-final-http.json).

### Queue comparison and measurement limits

Immediately before save: shared scheduler All5287/Complete5193/Failed38/In-progress1/Pending43; ten visible pending Rocket jobs1015250–1015259 all contained multi-facet OR combinations, created18:53:21Z. Immediately after saving exclusions those old pending jobs were still visible: saving did not instantly erase existing work.

After native clear/preload and propagation, ordinary blog/service/city/product jobs were observed (e.g.1015278 onward, created19:01:12Z). Five separate native pending searches for `product_category_filter-`, `product_brand-`, `product_display_type-`, `product_mount_type-`, `product_audio_type-` each returned **0 items**. Four are in the saved JSON; category search was separately observed at0. A later shared snapshot had Pending69/Failed39, with counts changing during processing/retention. These are mixed-plugin totals: **do not describe their variation as a Woo speed improvement or a successful completion of all cache jobs**. No before/after CPU, SQL, throughput, CWV or controlled speed measurement was obtained. Longer-term queue/security/hosting monitoring remains necessary.

## 9. Additional URL-generation and SEO review — no changes applied

### Current native settings and actual URL evidence

AIOSEO Search Appearance: Products shown in search, title Product Title + separator + Site Title, description Product Short Description. Product schema default is **Web Page → Item Page**. Final HTML confirms all24 product URLs have no Product schema, matching the prior Ahrefs finding. Do not confuse the homepage's unrelated Product schema with catalogue Product markup.

Taxonomies: post Categories Yes; post Tags No; Product Brands No; Product Categories Yes; Product Tags No; Product Attributes No. XML sitemap enabled with indexes; Include All post types/taxonomies on, but AIOSEO explicitly omits the taxonomies disabled from search. Date/author archives disabled. Products24 and product categories3 are present. No sitemap or metadata save.

Filter Everything PRO1.9.8: AJAX on, results container `#shop-results`; mobile collapsed/expanded with sidebar on top. **Disable filter links for crawlers on** (anchor→span protection); **Block filter URLs in robots.txt off**. The displayed proposed robots text includes all five product prefixes **and both Case Studies prefixes**. It is a generated preview, not proof those directives are active. Enabling it wholesale would affect Case Studies, and has not been authorized. Existing SEO indexed-filter/depth restrictions from the original audit remain; no Filter Everything save.

Observed URL families:
- Single category facet duplicates a valuable category archive in intent; brand facet duplicates a brand archive; attributes subdivide small existing product sets. Multi-select OR values and cross-category combinations can grow far beyond24 products; real queue examples combine mounts/TV, unrelated brands and multiple display types.
- Facets also appear underneath `/shop/embed/`, `/product-category/tv/`, `/brand/sunbrite/` and `/brand/sanus/` in actual security events. These are observed requests, not evidence that all are linked or useful. Valid filters must remain available to visitors.
- Existing sampled mount/audio facet responses are noindex with canonical Shop. Category/brand/display direct GETs may be challenged before origin, so their origin directives cannot universally be certified from those GETs. All five visitor AJAX interactions did work.
- `/shop/?orderby=price` and `/shop/?min_price=100` are200, canonical Shop, no noindex. Canonical is a consolidation signal, not a crawl prohibition. Do not extrapolate this to every possible parameter or claim an indexed-URL count without Index Coverage data.
- Shop page2 duplicate is documented above. Case page2 contains different useful cards; keep its existing separate policy.

### Concrete recommendations presented for owner review

| Exact scope | Proposed decision | Evidence, risk and rollback |
|---|---|---|
| `/product/<existing-slug>/` (the24 URLs in inventory) and `/product-category/{tv,audio,mounts}/` | **Keep** current indexability, self-canonicals and sitemap inclusion. No change requested. | Valuable destination pages; no basis for blanket noindex. |
| Any observed product facet segment `product_category_filter-`, `product_brand-`, `product_display_type-`, `product_mount_type-`, `product_audio_type-` under Shop/category/brand | **Retain existing noindex/base canonical policy**, crawler-link protection and new preload exclusions. Do not enable global robots blocking now. | Low-value combinatorial sets; noindex requires crawler access to be seen. A Cloudflare block can prevent reading the directive. Need verified origin-head coverage before any policy change; preserve visitor AJAX. |
| `/shop/?orderby=price`, `/shop/?min_price=100` | **Keep canonical Shop now**; no new noindex or robots change proposed on two samples alone. | Need actual linked/query traffic and broader parameter evidence first. Do not blanket-block every query, UTM or search parameter. |
| AIOSEO Product schema default for the24 existing product URLs | Future separately approved native change: **Web Page / Item Page → Product**, after verifying truthful catalogue fields/offers. | Missing Product markup confirmed24/24. “Starting at” request pricing must not be misrepresented as an immediately purchasable offer; no invented availability/reviews. Rollback restore Web Page/Item Page, save and clear native cache; verify original graph. Not implemented (P3). |
| Brands, Tags, Attributes | **Keep existing No/search exclusion and sitemap omission.** | Already prevents those archive families from being promoted into the sitemap; does not stop filter URL generation. |
| `case-installation-`, `case-city-`, catalogue and16 case posts | **No change.** | Separate approved Case Studies release/pagination/facet policies; excluded from the new Rocket patterns. |

There is therefore **no pending indexing/robots/canonical/sitemap mutation in this implementation**. Any later alteration requires an exact diff, affected URL examples and owner authorization first. No rank/indexing preservation guarantee is inferred from short-term HTTP tests; GSC coverage/crawl data and comparable time windows remain missing.

## 10. Cloudflare coordination and restriction review — no changes applied

Reviewed the [11November security report](CLOUDFLARE-BOT-REMEDIATION-2026-11-11.md) and Issue history before interpreting current API reads. Preserved the existing owner-only zone IPv4 exception; private address omitted. That report documented capped daily samples and unverified home-browser success, so its event counts are not whole-traffic false-positive rates.

Current custom ruleset `80f45448e225460db730c72bb28e3ebf`, version4, last updated11September, has:
1. `a82a51d8352642d09a006b057b82dece` Managed Challenge:
```text
(path contains "product_category_filter"
 or path contains "/product_brand-"
 or path contains "/product_display_type-")
and not cf.client.bot
and method ne "POST"
```
2. `a9140a1de39d4d88ad8e211aefbd4c9b` Block:
```text
path contains "product_category_filter" and cf.client.bot
```

These rules use mutually exclusive verified-bot conditions, so they are not duplicate matches. Their scope is asymmetric: verified-bot block covers category-facet paths only; unverified challenge covers three of five product prefixes. Both use broad path-contains checks, including nested category/brand/embed requests. No scope expansion or narrowing was applied.

Bot Fight Mode true/JS detections true; existing BIC on/security medium retained. Managed Free WAF and automatic L7 DDoS rulesets present. Zone rate-limit phase entrypoint404; legacy rate-limit endpoint410/deprecated. No custom zone rate-limit entrypoint found; this does not establish absence of account-level/automatic protections. Managed phase entrypoint404 does **not** mean WAF off: managed rulesets and actual block events exist.

### Actual security evidence and identity limits

Read-only Cloudflare [sanitized evidence](P1-2026-11-13-cloudflare.json), window12November19:00Z–13November19:00Z:
- Verified facet block rule:131 events below query cap, all Amzn-SearchBot UA, origin0. The rule requires `cf.client.bot`, providing Cloudflare verified classification beyond the spoofable UA. Contexts106 Shop/embed,22 category/TV,2brand/Sunbrite,1brand/Sanus; all category-facet combinations. This is intentional denial to a legitimate verified crawler on nonvaluable combinations, not proof of malicious traffic.
- Googlebot-UA and Bingbot-UA targeted queries returned0 security events. **Absence from Security Events is not proof of successful crawling**; allowed traffic may be missing, and a UA alone does not authenticate identity.
- Bot Fight Mode query294 events below cap. Many random PHP-path probes consistent with scanning, but also normal service/city pages, homepage8, Shop1, Case catalogue1 and one Samsung Terrace product challenge. No independently established human identity or confirmed Google/Bing/Rocket identity for this subset. A normal URL alone does not establish a false positive.
- Targeted valuable-path security query29 events:19 managed-WAF homepage blocks/origin0;8 BFM homepage challenges,1 Shop,1 Case catalogue. No sampled three-category/Sanus/quote events; not a universal accessibility guarantee. Origin0 identifies edge intervention, not a Woo origin fault.
- Original audit17:55–18:00Z180events/156Rocket-UA versus checkpoint18:55–19:00Z5events/1Rocket-UA (2challenge+3block, all origin0). The latter overlaps cache clear and is not a controlled post-only interval. Do not infer CPU, security or speed improvement from these unequal work windows.

Rocket UA is spoofable; no broad UA/IP/ASN allowlist is justified. Excluding needless preload work at source resolves the demonstrated coordination issue without weakening WAF. Visitor AJAX uses POST, already excluded by the custom challenge expression; real five-filter anonymous tests succeeded. Direct filtered GETs can still challenge visitors or deny verified bots; no claim that every direct filter landing is frictionless.

### Security recommendation / approval boundary

**Retain existing protections for now; no Cloudflare rule-change proposal is ready for implementation.** Evidence establishes blocked verified Amzn facet crawling and historical Rocket friction, but not Google/Bing denial on valuable core pages or confirmed human false positives. BFM challenge observations on normal pages warrant follow-up with actual visitor Ray IDs, challenge outcome and verified crawler/access logs before deciding on a narrow exception. Do not allow by crawler UA, disable BFM globally, extend blocks to all parameters, or broaden the existing owner exception.

If a specific false positive is later confirmed, present the exact rule expression/action/order diff, affected paths and verified identities, expected security loss, test plan and rollback to the captured ruleset before saving. BFM runs outside the custom-WAF Skip pipeline; a custom Skip is not a universal BFM exemption ([official behavior](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/)). Current rollback for this task concerns only the two WordPress controls above; Cloudflare requires none because it was not changed.

Remaining limitations: no complete edge access logs/crawl coverage, no reliable false-positive denominator, no authenticated identity for Rocket-UA events, no controlled long-term hosting comparison, no real form submission/booking, hidden reset-all UI and pre-existing Shop pagination defect. Security and SEO recommendations remain recorded for a separate owner decision; Issue#1 stays open.


## 11. Shop pagination and Reset all — native repair, 13 November 2026

Continued from commit6887367 and Issue#1; did not repeat the broad audit. Owner explicitly authorized native repairs and frontend verification, with no new plugins/templates/custom code or SEO/security policy changes.

### Inspected objects and root causes

- **Shop Page10263**: native WordPress editor opens, published Shop URL, empty content. It is the Shop destination, not the editable Elementor product listing. MCP returned “not allowed to edit this document”; authenticated WordPress UI successfully inspected it. No page save.
- **Archive10276, Loop Grid19cf30b**: renders the actual catalogue. Products template10278;16 items/page;3desktop/2tablet/2mobile columns. Query **Latest Products**, include Term with no selected restriction, **Date DESC**. Pagination **None**, individual pagination off. These native UI values explain the16-item ceiling and why the secondary Elementor query did not advance on the original paged route.
- **Card10278**: MCP structure confirms existing image/product title/installation/starting-price/REQUEST button widgets; reused unchanged. Service/city placements preserved.
- **Product Filter Set10596**: Products; location Pages→Shop; selected query “Posts list «Products» – Elementor”, value `3d3cb0e93c3b3a23eb704b5a0d8368e6`; five existing checkbox filters retained. The query selector initially displayed a loading placeholder, then resolved to the existing query: it was not a missing binding. No set save.
- **Reset**: the existing reset link was inside `.wpc-filters-widget-top-container`, whose ancestor had `display:none` and zero dimensions. The rendered matching rule includes `.wpc-filters-widget-top-container:not(.wpc-show-on-desktop)`; the container lacked that desktop class. No standalone Chips widget existed in10276, and the Loop Grid does not render the Woo hooks selected for automatic chips integration. Therefore the link existed only in the hidden built-in panel. This was not a missing reset URL or broken checkbox behavior.

Native MCP successfully read10276/10278; legacy V3 Loop settings were unavailable through that API, so native Elementor UI supplied the actual settings. No installed plugin source files accessed.

### Exact production changes and save/readback

**Only archive10276 changed.**
1. Existing Loop Grid19cf30b: **Pagination None→Numbers**.
2. Same widget: **Individual Pagination off→on**. Kept **Page Reload**, page limit5,16items/page, Latest Products/Date DESC, template10278 and all card/layout settings.
3. Added one standard **Filter Everything “Chips” widget778063b** inside existing results container6b4fa01, immediately **before** Loop Grid19cf30b. Title empty; Set IDs **10596**; Show on mobile **Yes**. This is a native widget in the existing template, not a new template or custom code. Existing HTML filter widget94ed707 and its content remain unchanged.

Changes saved through Publish, followed by editor reload and control readback. MCP saved-tree read independently confirms778063b immediately precedes19cf30b. Original settings and frontend results are in [browser verification](SHOP-2026-11-13-browser-verification.json). Native settings screenshots: [pagination](SHOP-2026-11-13-native-pagination.jpg), [Chips](SHOP-2026-11-13-native-chips.jpg).

Intermediate verification matters: Numbers alone with individual pagination off emitted `/shop/2/`, which returned to Shop; this did not advance the secondary query. Enabling Individual Pagination produced `/shop/?e-page-19cf30b=2` and advanced correctly while preserving source/order. No unneeded switch to Current Query or global Woo sorting change. One native Rocket Clear and Preload Cache was used after publishing the first pagination/Chips changes; final native save subsequently propagated on reload. No Cloudflare purge or cache configuration changes.

### Actual anonymous results

Real anonymous browser, desktop1366×900/mobile390×844; viewport reset afterward. Public HTTP checks used two concurrent requests, not a load test.

| Verification | Result |
|---|---|
| Base Shop pagination | Page1 **16**, Page2 **8**; **24 distinct product URLs**, zero overlap, exactly matching the24-product inventory. Native links back to Page1 work. Explicit desktop1366 and mobile390 Page2 checks pass without horizontal overflow. |
| Original paged URL | Final public `/shop/page/2/` now returns the **same correct8** as the native e-page link, not the original16. `/shop/2/` still resolves to Shop; it is no longer emitted by the final pagination control. |
| Filtered pagination | Category TV17: page1 **16**, page2 **1**, zero overlap/17unique. Filter retained in URL and checked state, native e-page link retains facet path. Verified mobile16→1 as well. Reset from filtered Page2 clears filter and page state, returning Shop16. |
| All five filters | At both sizes: Audio category3, Samsung8, OLED3, Tilt3, Soundbar3, expected URLs/prices and visible Reset all. Each reset returns unfiltered Shop16. |
| Multiple selected values | Samsung+OLED gives two checked filters; removing OLED individually leaves Samsung; restoring OLED then Reset all clears both, checked0, base URL and16cards. Existing checkbox removal behavior preserved. |
| Reset appearance/access | Visible native reset link above products on both sizes,77×31.8px in measured state; mobile no horizontal overflow. Link accessible by Tab and activated with Enter. Hover leaves the native visual treatment unchanged. **Focus-visible matches, but computed outline none/box-shadow none: no distinct focus indicator is claimed.** See limited follow-up below. |
| Cards/products/REQUEST | Existing prices/design/source/order retained; card link to Sanus navigates to its actual product page. LG G6 product1899price/details/related content/mobile overflow verified. Product REQUEST on desktop/mobile and Shop-card REQUEST load popup10937 with required phone/email, without submission. |
| Quote/Jobber | Cost Calculator “TV Size” content loads at both sizes without overflow; BOOK NOW opens5890, Jobber iframe11textboxes on desktop and after mobile resize. No booking/form submission or CAPTCHA completion. |

Screenshots: [desktop reset](SHOP-2026-11-13-reset-desktop.jpg), [mobile reset](SHOP-2026-11-13-reset-mobile.jpg), [desktop Page2](SHOP-2026-11-13-page-two-desktop.jpg), [mobile Page2](SHOP-2026-11-13-page-two-mobile.jpg). Mobile panel can remain expanded; Reset all sits above the result cards below that panel, so reaching it may require scrolling. It is not a sticky control.

### SEO and preserved P1 regression checks

[33 final public HTTP responses](SHOP-2026-11-13-http.json) all200 after redirects:
-24product URLs remain self-canonical/indexable;3categories retain200 and their existing canonicals/directives. No product permalink/content/schema save.
-`/shop/`: canonical Shop, robots max-image-preview:large.
-`/shop/?e-page-19cf30b=2`: correct8products, **existing canonical generation remains Shop**, robots max-image-preview:large. Distinct pagination content is accessible; canonical consolidates to Shop. This native pagination parameter was introduced by the approved control, but no AIOSEO rule was edited.
-`/shop/page/2/`: correct8products, existing **noindex,nofollow / canonical Shop** retained.
-TV facet Page2 explicitly returned canonical Shop but robots **max-image-preview:large only, no noindex** in the recorded browser DOM. Do not extrapolate the original sampled mount/audio noindex to every facet/query combination. The original category-facet GET was challenged, so its pre-change origin head was not established. This is an unresolved SEO coverage finding, not proof that this repair changed a rule. Different URL forms can represent the same Page2; no canonical/robots/redirect policy fix is included without separate approval. Carry this exact `/shop/product_category_filter-tv/?e-page-19cf30b=2` case into the separate AIOSEO task.
-`?orderby=price` still responds200/canonical Shop; existing widget's Date DESC configuration preserved. This task does not claim to add a sorting control or fix previously ignored sorting parameters.

Rocket native readback retains the exact five preload exclusion lines, preloading on. Woo native readback retains Order Attribution **false**. All33 HTTP responses contain zero sourcebuster/order-attribution references. No CF/AIOSEO/robots.txt/sitemap changes, Case Studies template/filter edits, custom CSS/JS/PHP, plugin or new template. No measured CPU/speed improvement claimed.

### Rollback and remaining limitation

Rollback through existing Elementor archive10276:
1. Set19cf30b Pagination **None**, Individual Pagination **Off**; keep source/date/order/16/card settings unchanged.
2. Remove only native widget778063b from6b4fa01.
3. Publish, reload/read back, refresh native Rocket cache if needed and repeat Shop/filter checks. Do not restore an entire old template revision that could overwrite unrelated edits; do not roll back the P1 Rocket/attribution controls.

The two functional success criteria are achieved: all24 products reachable without duplicate page results; Reset all visible/functional desktop/mobile with filters working. **Keyboard focus styling remains an accessibility limitation**, rather than being silently declared passed. Chips exposes Title/Set IDs/Mobile and Advanced controls, without a native focus-state style control; changing global theme focus would broaden scope.

Smallest proposed follow-up, **not applied**: in the existing active theme shared `style.css`, append one rule scoped only to Chips778063b in archive10276:

```css
.elementor-10276 .elementor-element-778063b a:focus-visible {
  outline: 2px solid #292B26;
  outline-offset: 3px;
}
```

This reuses the recorded site Secondary color and affects keyboard-focused native chip links only. Risk: outline could be clipped by an ancestor; verify desktop/mobile keyboard focus and Reset/individual-chip activation after publication. Rollback remove only this rule, save and refresh native cache. Owner's explicit no-custom-code instruction requires separate approval before implementation. No approval is inferred from authorizing the native repairs.

Product schema/AIOSEO optimization remains the **separate next task**, as requested. Source guidance: [Elementor native pagination](https://elementor.com/help/paginate-loop/), [Filter Everything Chips](https://filtereverything.pro/resources/chips-widget/), [native chips/shortcode behavior](https://filtereverything.pro/resources/shortcodes/). These vendor docs guide control choice; actual frontend evidence above establishes the results.
