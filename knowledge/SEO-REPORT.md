# SEO-звіт — точка продовження
Оновлено 26.10.2026. Відновлений конспект великого аналізу 8–12 жовтня; повний оригінал звіту не знайдено у доступному пошуку файлів. Не видавати цей конспект за оригінальний звіт.

## Підтверджений контекст
Користувач повідомив, що основні зміни сайту були у вересні; бот-трафік блокували через Cloudflare. Тому до/після без очищення періодів і перевірки GA4 не доводить ефект SEO.
12.10 baseline порівнював 13.09–10.10 з 16.08–12.09. Джерела: GSC, GA4, BrightLocal, HTML-аудит.
Числові приватні аналітичні експорти не внесено до публічного репозиторію. Для нового аналізу потрібні актуальні джерела, однакові періоди та фільтри.

## Погоджений фокус
- Чотири міста: Glenview, Evanston, Wilmette, Winnetka.
- Спочатку baseline, потім дослідження Glenview.
- Не просто загальний чекліст: знайти закономірність, сформулювати гіпотезу, зробити обмежену зміну, виміряти ефект.
- BrightLocal — вимірювання; саме створення grid/campaign не є SEO-покращенням.
- Не змінювати production settings без відповідного дозволу користувача. Поточні конкретно авторизовані зміни виконувати в межах їхнього обсягу.

## /find-near-me/
Історичний висновок 12.10: зберегти URL, індексацію, self-canonical, H1 “TV Mounting Near Me in Chicago”; розвивати Service Area Hub, а не замінювати ним міські сторінки.
Канібалізацію не було доведено. Низький CTR не доводить, що проблема лише у title.
Сторінка історично містила райони/передмістя/ZIPs/мапу/CTA та лінки на чотири міста, quote, prices, same-day.
Пропозиції focused refinement: перевірити claims, зменшити зайвий voice-search/same-day текст, корисно пояснити coverage/ZIP. Не робити rebuild за інерцією.
Висновки з давнього файлу — не live-перевірка 26.10.

## Історичний технічний статус
08.10 асистент звітував про виправлений www → non-www HTTP 301 через Cloudflare; GSC 5xx Validate Fix ще потребував дії. Повторно не перевірено.
Date Archives із noindex мали залишатися без масових блокувань/редиректів.
Історія WooCommerce filters / robots є, але точні чинні правила невідомі.
ZIP Checker README нині описує v0.2.3 та staging-ready статус; старі згадки v0.2.0 не є поточною версією.

## План продовження — реконструйований, не дослівний оригінальний P0/P1/P2
1. Відновити оригінальні GSC/GA4/BrightLocal/HTML експорти; зафіксувати дати, зміни трекінгу і бот-фільтрації.
2. Перевірити lead-конверсії: quote submit, booking і call click; не підміняти реальні leads переглядами/кліками.
3. Зафіксувати незмінні параметри geo grid, device/location, п’ять цільових keywords. Точний попередній список keywords не відновлено — не вигадувати його.
4. Glenview: порівняти Top-3 конкурентів за однаковим запитом/локацією, relevance, proximity, відгуками, локальними згадками/посиланнями й сторінками.
5. Для кожної гіпотези записати підставу, очікуваний результат, сторінку/місто, дату, реалізовану зміну, метрику і обмеження.
6. Перевірити ролі й перелінковку homepage / services / city pages / coverage hub, реальні локації кейсів і статус ZIP Checker.
7. Порівняти ефект через 6–8 тижнів від фактичної зміни за сумісними періодами; не пояснювати будь-яку різницю лише SEO.
8. У старій розмові наступний повний аудит пропонували на 9–10 листопада. Це історична пропозиція, не створене нагадування і не гарантія достатності даних.

## Що записувати для кожного наступного SEO-кроку
Дата | місто/URL | джерело | baseline | гіпотеза | погоджена дія | фактична зміна | перевірка | результат/період | невизначеність.
Оновлювати WORK.md і CHANGELOG.md. Не оголошувати загальне SEO-зростання без відповідних даних.


## 2026-11-09 — BrightLocal ranking investigation and cross-platform audit

Investigation date: November 9, 2026, America/Chicago (execution host already November 10 UTC). Status: evidence checkpoint; the reporting discontinuity is established, but a causal attribution of all residual movement to Google or BrightLocal is NOT established. Investigation only: no website, GBP, SEO, tracking, or report configuration was changed; no paid scans were run.

### Dedicated SEO workspace

Branch inventory returned one branch, `claude/chicago-mounting-zip-review-szeoup`, also confirmed as the current default. Created `seo` from default commit `3e56590ad7aa7adb348d4833b4982ecd5f0818d1`. Ongoing SEO audits, monitoring and optimization planning belong on `seo`. No default-branch update or merge is authorized. This section preserves the historical report above; newer evidence does not retroactively verify old claims.

Read AGENTS.md, README.md, PROJECT.md, WORK.md, SEO-REPORT.md, WEBSITE-HISTORY.md, SEO-CONTENT.md, recent CHANGELOG entries and the relevant AUDIT-2026-10-26.md. The older audit already warned that October 9 had different coverage and that the five keywords were not constant across the earliest runs.

### Sources and verification

| ID | Source and date | Evidence and limits |
|---|---|---|
| B1 | [Authenticated Local Search Grid](https://app.brightlocal.com/locations/4173610/lsg), inspected Nov 9 | Chicago Mounting location4173610; historical date menus, rendered point values, competitors and four geographically selected points inspected. Each report section has independent keyword/date controls. |
| B2 | [Original report history](https://tools.brightlocal.com/seo-tools/admin/locations/4173610/lsg/reports/485676/runs/list), inspected Nov 9 | Six stored runs: Oct9 twice, Oct10, Oct16, Oct30, Nov6. No Oct23 run appears. Oct16/30/Nov6 are scheduled. |
| B3 | [Oct16 original run](https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/4173610/lsg/view?runId=01a14534-0ae6-7384-b709-03d3f86fa58b&keyword=Fireplace+TV+mounting) | Generated Oct16 9:53AM CDT. Keyword list and original competitor table checked, including Chicago Mounting rating5/reviews381. |
| B4 | [Read-only grid settings](https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/4173610/lsg/edit) | Custom36/49 selected points; 1mile spacing; five exact keywords below; Friday09:00–12:00 Central, within recorded08:00–20:00 opening hours. Nothing saved. |
| B5 | [Location settings](https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/4173610/edit) | Tracked Google CID18385212719512896326, Chicago Mounting, matching phone/site; service-area business enabled. BrightLocal address is city-level Chicago/60601, not a verified office or ranking origin. |
| M1 | [Official October2026 release notes](https://help.brightlocal.com/hc/en-us/articles/40475732070162-October-2026-Release-Notes), read Nov9 | LSG switched Local Finder→Maps on both platforms; depth20→100; change comparisons held until two Maps runs. Exact account migration date not supplied. |
| M2 | [Current grid documentation](https://help.brightlocal.com/hc/en-us/articles/37025102315666-How-do-I-understand-Local-Search-Grid-New-Platform), read Nov9 | Dash counts101 in current mean. Individual-point lists show up to100 businesses. |
| M3 | [Average calculation article](https://help.brightlocal.com/hc/en-us/articles/360019011800-How-is-my-average-rank-calculated-in-a-Local-Search-Grid-report), read Nov9 | Opened current page says101 for dash/102 for NF. Search's older cached excerpt still says21/22; do not mistake it for current documentation. |
| G1 | [Actual GBP](https://maps.google.com/?cid=18385212719512896326), Google owner interface inspected Nov9 | Public visibility, owner controls, categories, service areas, Google name-update notice and monthly Performance tables read. |
| S1 | [GSC comparison](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Achicagomounting.com&start_date=20261025&end_date=20261107&compare_start_date=20261011&compare_end_date=20261024) | Domain property; Web; all countries/devices; two equal14-day periods; observed Nov9, last update4hours ago. |
| A1 | [Ahrefs dashboard](https://app.ahrefs.com/dashboard), inspected Nov9 | Correct Chicagomounting project; Last30days trend preset. Dashboard estimates and technical summary only, not a new crawl or per-keyword history. |
| A2 | [GA4](https://analytics.google.com/analytics/web/#/a190928786p498944746/reports/intelligenthome), inspected Nov9 | Chicago Mounting property498944746, Traffic acquisition, equal14-day comparison set/read back. All users/countries; Organic Search kept separate from Direct. |
| B6 | [Local Rank Tracker](https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/4173610/lsrc/view), inspected Nov9 | Generated Nov6 9:04AM CST; comparison Oct30; single Chicago,IL origin, different keywords/result types from regional grid. |

### Historical versus current averages — directly verified

| Exact keyword | Oct10 | Oct16 | Oct30 | Nov6 | Nov6 recapped at21 | Nov6 top20 points |
|---|---:|---:|---:|---:|---:|---:|
| Samsung Frame TV installation |11.9|4.3|27.9|28.7|20.58|5/36|
| TV mounting |17.2|15.6|92.3|92.9|21.00|0/36|
| Outdoor TV installation |7.8|8.2|70.5|60.6|21.00|0/36|
| Fireplace TV mounting |17.6|12.8|40.8|37.3|20.58|2/36|
| TV installation |not in exact-case keyword list|15.2|93.6|89.1|20.53|2/36|

Sources B1/B2/B3. Confidence high for displayed report values. The often-cited approximately4 was real for Samsung Frame on Oct16, not a five-keyword overall average. The five Oct16 means average11.22, not4; this derived figure is not a BrightLocal headline metric. Samsung Frame's36 old points were all4–7, so expanding depth cannot alter those old values. Outdoor's old36 points were all within20. Both old and current Samsung Frame snapshots have no top3 point.

First observed discontinuity: Oct30, bounded by the stored Oct16 and Oct30 runs. There is no evidence to identify an exact day within that interval. Oct9's initial25-point map view centered roughly41.848601,-87.863678 is visibly different from the North Shore configuration. Two Oct9 Samsung entries are13.0 and13.3. Do not use these as unchanged North Shore baselines.

Oct16 and Nov6 North Shore overview maps show the same visible footprint,36points and map center42.072242,-87.760681. Current settings match the historical Oct26 record36/49/1mile. Exact per-point latitude/longitude exports and a settings-change log were not obtained; a center in a Google map link is a viewport center, not proof of the GBP's hidden physical origin.

### What the methodology change explains

Calculated from all36 rendered Nov6 point values, replacing a current dash with101 reproduces every displayed average after rounding. TV mounting has28 dashes and eight ranks58–70: total3344/36=92.8889. Thus92.9 is not an observed rank at one point, and a dash is not zero or a failed scan. All four inspected point panels contained actual competitor results; no NF appeared in the five current grids.

A depth-only normalization is mean(min(pointRank,21)), assigning21 to current dashes. It is an analytical comparison, not an edit or a reconstructed Local Finder scan. The recapped values above show how dramatically deeper measurement enlarges the numbers. TV mounting changes15.6→21.0 on the capped scale, rather than15.6→92.9; Samsung Frame still changes4.3→20.58; Outdoor8.2→21.0; Fireplace12.8→20.58; TV installation15.2→20.53.

Confirmed with high confidence: expanded depth greatly exaggerates the raw numerical gap and cannot explain all of it. Source-switch effects remain confounded with actual temporal changes: capping Maps does not turn it into Local Finder. It is not defensible to conclude either “all a BrightLocal artifact” or “Google visibility collapsed by the full raw rank difference.” The account run records inspected did not expose an explicit source-version flag; Oct30 as the first post-switch report is strongly consistent with the timing/depth, but is not an independently proven migration timestamp.

Nov6 versus Oct30 is the closer post-break comparison: Samsung+0.8positions worse, TV mounting+0.6worse, Outdoor9.9better, Fireplace3.5better, TV installation4.5better. There is no fresh across-the-board collapse between these two runs.

### Geographic competition — Nov6 stored Maps results

One map point near each city was selected visually; these are representative points near the labels, not certified municipal centers or complete city averages. Exact point coordinates were not exposed in the panels.

| Point area / keyword | Chicago Mounting | Leading returned businesses | Source / confidence |
|---|---|---|---|
| Glenview / TV mounting |outside top100|1 Put My Stupid Thing Together (5/141reviews);2 Home Systems,Inc. (5/87);3 Ben's TV Repair Service (4.8/260)|B1 point near Glenview; high for ranking, moderate for city-label assignment|
| Winnetka / TV mounting |outside top100|1 r:home (4/4);2 Paul's Winnetka TV Services (5/9);3 Enfuze Chicago (5/24)|B1 point near Winnetka; high/moderate|
| Wilmette / TV mounting |64|1 Chicago TV Installer (4.9/70);2 Village Audio Video (1/2);3 Fix Pro Solutions (5/22)|B1 point near Wilmette; high/moderate|
| Evanston / TV mounting |58|1 Chicago TV Installer (4.9/70);2 Minas Electronics (4.3/82);3 Lakeside Handyman LLC (5/8)|B1 point near Evanston; high/moderate|

Competitors genuinely outrank the tracked listing in these stored Maps results. This was not a fresh manual Google Maps search from each coordinate. Public storefront categories and closer-looking city names do not establish measured distance; no verified distance table was available. Relevance/proximity are hypotheses, not proven causes. See [Google's ranking factors](https://support.google.com/business/answer/7091?hl=en-en): relevance, distance and prominence interact; review count alone is not decisive.

For Samsung Frame across the regional grid, Nov6 competitor means include Chicago TV Installer1.2, Royal Home Entertainment4.0, R&R5.0, HDInstalls9.4, Chicago Mounting28.7. Chicago TV Installer and Chicago Mounting share primary Home cinema installation, yet have70vs389reviews and4.9vs5rating in that snapshot. A lack-of-reviews or wrong-primary-category diagnosis is unsupported by this comparison. Additional categories differ; this does not authorize copying irrelevant categories.

### Actual GBP findings

| Finding | Evidence/date | Confidence and interpretation |
|---|---|---|
| Listing currently visible/manageable |Google public profile and “You manage this Business Profile,” Nov9; correct CID/phone/site|High. No suspension/reverification banner seen in inspected owner views; formal verification-status/appeal history not retrieved. BrightLocal's “Active” is not proof of Google verification. |
| Categories |Owner Business information: Home cinema installation primary; Audio visual consultant additional|High current. BrightLocal also displays Service establishment, an interface/data-source difference, not a demonstrated category removal. No historical category-change log. |
| Business location/service area |Owner interface: no location, deliveries/home services only; Cook,Kane,Lake,Will,DuPage,Kendall,McHenry counties|High current. Hidden address/origin not recovered and not published; service-area list does not establish proximity. |
| Google edited business name |Owner notice current Chicago Mounting; previous Chicago Mounting LLC|High that change exists; date unknown, causal role unknown. Do not automatically revert or acknowledge it. |
| Reviews |Oct16 original table381/5; Nov6 grid389/5; Nov9 live393/5|High per-source snapshots. No aggregate review-loss signal; dates of newest individual reviews not inspected. |
| Duplicates/restrictions |No duplicate established; manager inventory attempt blocked before completion|Unresolved. Do not report a clean duplicate/verification audit. |

### Independent performance evidence

These are aggregate metrics specifically authorized for this SEO report, not raw analytics exports or customer data.

**GSC S1 — later Oct25–Nov7 versus earlier Oct11–24; Web/all countries/all devices:**

| Metric | Earlier14days | Later14days |
|---|---:|---:|
| Clicks |107|127|
| Impressions, exactly as UI displayed |12.2K|13.6K|
| CTR, rounded UI |0.9%|0.9%|
| Average organic position |20.7|19.2|

Confidence high for UI values; unrounded impression totals were not retrieved. Clicks increased18.69%. The exact query “chicago mounting” accounts for17 of the20 net extra clicks. Excluding only that exact query leaves90→93; this is not a complete branded/nonbranded classification.

| GSC exact query | Earlier clicks | Later clicks | Earlier impressions | Later impressions |
|---|---:|---:|---:|---:|
| chicago mounting|17|34|37|57|
| tv mounting chicago|3|4|89|128|
| tv installation chicago|1|3|79|113|
| chicago tv mounting|6|3|18|14|
| tv mounting service|5|2|314|435|
| chicago tv mounting service|0|2|9|13|
| tv wall mount installation near me|1|1|864|318|
| tv wall mounting service|0|1|78|87|
| tv mounting service near me|0|1|41|67|
| tv wall mounting|0|1|14|65|

These rows show mixed query movement, not uniform growth. Current page-level comparative rows were not inspected; no page-level November numbers are fabricated. Historical page-level findings remain in AUDIT-2026-10-26.md and are not reverified here. No causal success attribution to September optimization, November case edits or any other intervention is established. GSC Web average position is not a Maps ranking.

**GA4 A2 — same later and earlier14days, all users/countries, Traffic acquisition:**

| Metric | Earlier | Later |
|---|---:|---:|
| Organic Search sessions|146|176|
| Organic Search engaged sessions|87|116|
| Organic Search engagement rate|59.59%|65.91%|
| Organic Search key events, all configured events|18|27|
| Organic Search session key-event rate|8.22%|9.66%|
| Direct sessions|4,231|10,134|
| All sessions|4,534|10,628|

Organic sessions+20.55%; no aggregate organic traffic collapse in this period. Large Direct totals and low engagement make total traffic a poor local-SEO proxy. Event definitions, deduplication, US-only performance, GBP campaign attribution and CRM jobs/revenue were not validated.27key events do not mean27genuine leads.

**GBP G1 — complete September versus October, plus partial November through inspection:**

| Metric | September | October | November partial |
|---|---:|---:|---:|
| Profile interactions|46|50|9|
| Website clicks|38|48|6|
| Call-button interactions|8|2|3|

Monthly interactions/site clicks did not collapse; call interactions fell on a very small base. These monthly periods cannot isolate a late-October break and November is incomplete. No closed-job or revenue inference.

**Ahrefs A1 — exact displayed dashboard metrics on Nov9, Last30days trend preset:**

| Metric | Displayed current | Displayed change | Limitation |
|---|---:|---:|---|
| Estimated organic traffic|135|+36|Estimated traffic, not measured site visits; card shows value$406|
| Organic keywords|29|-5|US row29/-4 has a different displayed delta; preserve both rather than invent a reconciliation|
| Domain Rating|2|not shown as delta|A proprietary authority score|
| Referring domains|895|-22|Raw count, not link quality|
| Health Score|100|not shown|Existing crawl summary, not a fresh crawl|
| Crawled|606|+77|Existing snapshot|
| Redirects|6|not shown|Not inherently errors|
| Broken|0|not shown|Not a new all-URL HTTP check|
| Blocked|111|+6|Reasons/individual URLs not inspected|

The trend preset did not expose exact start/end timestamps in the inspected dashboard. Do not infer precise calendar bounds or technical cause from it. Card sparklines also show unlabeled endpoints; these are not alternative verified current totals. No Ahrefs keyword-level/page-level comparative table was inspected in this session. The historical Oct26 Ahrefs findings remain historical, including its old SERP-inconsistency warning.

**BrightLocal Rank Tracker B6:** Nov6 vsOct30 summary Average Google Position7.5, change2; Local Pack Coverage50%, displayed change12.5%. Movement direction for those summary glyphs was not robustly extracted, so no sign is invented. It still contains Local Finder and Organic Desktop/Mobile columns for a single Chicago,IL search origin. This is not an equivalent36point Maps series. Do not transpose keyword rank stacks in its dense comparison table into unsupported individual ranks.

### Eight required answers and justified next steps

| Question | Answer | Source/date/confidence |
|---|---|---|
| Was approximately4 real/comparable? |Real4.3 for Samsung on Oct16; not all keywords and not an equivalent pre/post Maps baseline.|B1/B3 Oct16; high|
| When did decline begin? |First observed Oct30; exact onset between stored Oct16/30 cannot be dated.|B2; high for bound|
| Did methodology cause/exaggerate it? |Depth demonstrably magnifies the numerical jump; large residual remains after capping. Finder→Maps may explain some/all residual, but share cannot be separated from real change.|M1/M2+B1 normalization; high for amplification, unresolved causality|
| Did Maps visibility actually decline? |Poor Nov6 Maps visibility is established; historical change in Maps under identical collection conditions is not. Oct30→Nov6 is mixed, with three keywords improving.|B1; high current, unresolved pre-break causal trend|
| Settings/profile changed? |EarlyOct grids/keywords changed; Oct16/Nov6 visible North Shore geometry aligns with current36/49/1mile. Correct current CID confirmed. Complete point export/source-version/GBP-ID-change audit log absent.|B1–B5; moderate continuity|
| Are competitors ahead in priority cities? |Yes at the four inspected stored TV mounting points; no exhaustive city averages or fresh coordinate-controlled Maps validation claimed.|B1 Nov6; high/moderate geography|
| GBP issue? |Visible/manageable, rising snapshot review counts, relevant primary category; Google name edit confirmed without date. No observed suspension, but formal status/history/duplicates checks incomplete.|G1/B3 Nov9/Nov6/Oct16; high observed, incomplete audit|
| What corrective actions are justified? |Correct the measurement baseline/interpretation first. No redesign, mass rewrite, category/address edits or indexing changes justified by these data.|Combined evidence; high|

Remaining evidence collection, not implemented changes:
1. Obtain BrightLocal's source-version/migration timestamp for report485676 and Oct16/Oct30 run IDs, point-coordinate/settings history, missingOct23 explanation and whether historical Finder data were transformed. Prepare a support question; do not send without explicit communication authorization.
2. Compare already stored Maps runs on unchanged points using top3/top10/top20 shares, capped means and exact CID. Obtain parallel Finder/Maps evidence at identical coordinates/time if available without paid scan credits. Source equivalence is the key unresolved root-cause test.
3. Finish formal GBP verification/restrictions/duplicate inventory; date Google's name edit and any location/category changes. Do not change profile data to test a hypothesis.
4. Complete GSC page/query attribution and US/device segmentation, Ahrefs dated keyword/page histories and exact unrounded GSC impressions; maintain the earlier optimization history without attributing performance causally.
5. Validate GBP-tagged GA4 sessions and genuine lead events/CRM outcomes for equivalent periods, especially lateOctober. No paid scan, configuration change, merge or publication authorized by this research task.

**Screenshot and access limitation:** historical Samsung4.3 and current TVmounting92.9 map screenshots were captured and inspected in the conversation, but no persistent screenshot files were saved or attached to this GitHub checkpoint. Report screenshots remain an unfinished deliverable. A later attempt to open the GBP manager was blocked because another Chrome extension UI was open; that inventory was not completed or bypassed. No definitive Google-algorithm diagnosis, full source-equivalent before/after comparison, full duplicates audit or verified business-lead decline is claimed.
