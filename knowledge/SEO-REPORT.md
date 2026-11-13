# SEO-звіт — точка продовження
## 2026-11-13 — Site-wide GSC indexing audit and confirmed requests

Continuation from1240c5f and Issue#1; expanded from Case Studies to the whole current site. This supersedes the earlier “GSC coverage not obtained” limitation for the bounded evidence below, not a claim of exhaustive Google index enumeration or completed indexing. Production AIOSEO/canonicals/robots/sitemap generation/Cloudflare settings unchanged.

**Evidence and URL register:** [96 important sitemap URLs, individual statuses/actions](../docs/GSC-2026-11-13-url-ledger.md), [171 known URLs including technical exclusions, CSV](../docs/GSC-2026-11-13-url-ledger.csv), [33 individual Inspection records](../docs/GSC-2026-11-13-inspections.json). Source labels distinguish report examples from individual URL Inspection. Search Analytics impressions were not substituted for indexing proof.

### Whole-site coverage and sitemap reconciliation

Native GSC domain property chicagomounting.com → Pages / All known pages, displayed last update **2026-11-08**:77 indexed,77 not indexed. All77 indexed examples and all77 exclusion examples across the seven populated reasons were read (including pagination of the tables).

| GSC reason | URLs | Interpretation / actual examples |
|---|---:|---|
| Indexed |77|Historical report examples; individual Inspection can be newer |
| Excluded by noindex |31|Brands, product tags, feeds, date archives, cart and some facet routes; no requests |
| Page with redirect |24|www/home variants and legacy routes, including /bose-wall-mounting/; no requests |
| Not found404 |4|/?page_id=10264, /product-category/tvs/, /product-tag/t/, /wp-*.php; not current valuable sitemap pages |
| Other4xx |1|/wp-admin/admin-ajax.php?action=rest-nonce, a technical endpoint; not a customer landing page |
| Blocked by robots.txt |1|/wp-admin/*, intentional technical protection |
| Crawled — currently not indexed |15|Mix of seven valuable current URLs and technical/feed/legacy/pagination examples; inspect individually |
| Discovered — currently not indexed |1|Terrace installation article in the dated aggregate; current individual Inspection also identifies the Case Studies catalogue as Discovered |
| Redirect error /5xx |0/0|Shown with zero examples |
| Indexed though blocked by robots |0|Shown with zero examples |
| Duplicate / Alternate canonical |Not listed|No separate populated reason shown in this report. This does not establish absence of every duplicate or solve the independently verified Shop pagination duplication |

Current XML sitemap index200 has five children: **post33, page36, product24, category1, product_cat3**.97 entries represent **96 unique URLs** because /blog/ appears in post and category sitemaps; this repeated identical canonical URL is not another filter combination or duplicate content URL. All96 unique URLs were fetched anonymously, max2 concurrent requests:95 return200 directly/indexable/self-canonical, while /bose-wall-mounting/ follows two301 hops (/brand/ then /brands/) and finishes200/canonicalBrands. No current sitemap page has a noindex in the fetched final HTML. All24 product URLs and all3 valuable product categories are intact. Root robots has no ordinary homepage/service/city/product/category/Case path disallow; existing /shop/product_category_filter-* and technical restrictions remain. No Cloudflare setting changed.

Seventy current sitemap URLs occur in the77 indexed examples.26 are absent from those examples:16 new cases, their catalogue, six articles, two products and the Bose redirect. **All25 eligible nonredirect candidates received individual URL Inspection**; the redirect was deliberately not submitted. One missing-from-examples case, /65-inch-samsung-frame-pro-with-a-recessed-outlet/, is already **Indexed** in current Inspection; therefore absence from the older examples was not treated as proof of nonindexing. Seven further high-value Inspection checks confirmed Indexed: homepage, all four city landing pages, /services/ and /tv-installation-and-mounting/.

The96-URL register consequently contains **71 Indexed,15 URL unknown to Google,2 Discovered,7 Crawled not indexed,1 redirect**.These combine dated report and fresher individual evidence; they are not a newly refreshed aggregate GSC total. Of the16 new cases:1 Indexed,15 unknown. Existing17th case remains in the indexed report examples. Other important service/landing pages, blog landing,22 products and all3 product categories are represented in indexed examples; source and crawl dates remain explicit in CSV rather than claiming individual Inspection for every page.

### Requests actually accepted and daily quota

Exactly **11 request confirmations** were observed: “Indexing requested” and URL added to a priority crawl queue. They cover the catalogue plus these ten case URLs (all relative to chicagomounting.com):

- /case-studies/
- /77-inch-lg-g6-installation-on-a-stone-fireplace/
- /55-inch-samsung-oled-on-tile-with-mantelmount-max1/
- /77-inch-lg-g6-with-a-legrand-recessed-media-box/
- /85-inch-sony-bravia-and-sonos-arc-ultra-installation/
- /100-inch-lg-qned-installation-with-home-audio/
- /samsung-frame-pro-fireplace-installation-with-sonos-amp/
- /85-inch-samsung-frame-tv-on-a-full-motion-mount/
- /77-inch-lg-w6-fireplace-installation-with-sonos-arc-ultra/
- /85-inch-neo-qled-and-soundbar-on-a-brick-fireplace/
- /65-inch-samsung-oled-and-bose-soundbar-on-stone/

**Not accepted:** requests for /77-inch-lg-c6-and-samsung-q990h-soundbar-installation/ and /85-inch-samsung-neo-qled-installation-evanston/ returned **Quota Exceeded**: “Sorry--we couldn't process this request because you've exceeded your daily quota. Please try submitting this again tomorrow.” No further Request Indexing attempts were made. Eleven confirmations is the observed session count, not an inferred fixed quota for every account/property. No CAPTCHA was solved, no bulk/indexing-API workaround used, no recurring automation created.

After reset, prioritize those two rejected case requests and the three still-unrequested cases: /outdoor-tv-brick-installation-glenview/, /tv-wall-mounting-case-wilmette/, /samsung-frame-tv-installation-on-tile-in-winnetka/. Then the two products and six useful articles listed in the register. These11 eligible URLs were inspected but **not attempted** after the quota rejection. All indexed, intentionally noindex, filter combinations, redirects, feeds/technical archives were excluded from requests. Accepted requests remain **not indexed until later Inspection confirms otherwise**; do not submit them repeatedly.

### Diagnosed exclusions and limits

The two products Samsung R95H and Samsung S90H plus five articles (How high to mount, Smart device benefits, Surround sound setup, Fireplace mistakes, Wall-mounted speakers) have current Inspection status Crawled — currently not indexed. Recorded Googlebot smartphone crawls (Aug–Oct2026) show **crawl allowedYes, fetchSuccessful, indexing allowedYes, user canonical self, Google canonical Inspected URL**. Current public HTML also remains200/indexable/self-canonical. No technical indexing block is shown by this evidence. Google's exact content/selection reason is not exposed; do not call these a Cloudflare block or assert a quality diagnosis. Follow up with content distinction, contextual internal links and later recrawl evidence if exclusion persists; no production content/canonical change here.

The catalogue and Terrace article are Discovered without a recorded crawl;15 new cases are unknown with no crawl/referring sitemap in Inspection. Existing sitemap membership and links are verified, but current Google discovery/processing is incomplete. Eleven native request confirmations are useful crawl requests, not proof that verified search Googlebot can bypass every security rule or that Google will index them.

Seven report-indexed URLs are outside current sitemaps: brand LG/Samsung/Sonos, Uncategorized product category, and three product-tag archives (samsung_top/top/tv_top). Current AIOSEO taxonomy exclusion policy is retained. Individual Samsung-brand Inspection still says Indexed with last Googlebot smartphone crawl **2026-09-26** and then-allowed indexing; that historical state does not override today's noindex policy. Fresh scripted requests to these seven return403, so they do not establish current origin robots. Do not request indexing or add broad bot exceptions. Later verify recrawl/deindexing through trusted GSC evidence; no removal request or security change made.

### Sitemap submission and exact proposed cleanup

Before resubmission, native GSC showed sitemap.xml **Success**, submitted2025-06-09, last read2026-11-12,81 discovered. Its child post-sitemap was last read2026-11-09 with17URLs, while current XML has33 after the16-case launch; page36/product24/category1/product_cat3 succeeded. The connected read-only tool reported submitted397 while the native UI reported discovered81. These are differently named fields/historical snapshots, not interchangeable index counts; their discrepancy is not resolved. Use the native discovered count and actual XML for this reconciliation, not the deprecated indexed field. The connector exposes Search Analytics and Sitemaps fields but no Page Indexing reasons, URL Inspection or Request Indexing write action; those tasks used authenticated native GSC. Its history request outside30days was refused by the trial; the bounded recent request succeeded. No upgrade or account change.

**Authorized action:** resubmitted the same existing **https://chicagomounting.com/sitemap.xml once**, because its post child snapshot predates the new cases. Native confirmation **Sitemap submitted successfully** observed and screenshot saved; subsequent reload shows submission dateNov13 and index last-readNov13, with81 discovered. The index reread is confirmed; **post-child reread33/new child processing is not verified**. No sitemap URL/content/generation/indexing policy changed, no technical sitemap was added.

**Proposal only, requires separate owner approval and exact native object/control verification:** exclude only redirect source **https://chicagomounting.com/bose-wall-mounting/** from page-sitemap.xml through existing AIOSEO sitemap exclusions. Preserve its existing redirect, /brands/ target, canonicals, robots and all other sitemap members. Removing one redirect entry is not a recommendation for blanket noindex or robots blocking. Object ID/control and before/after XML diff must be verified before implementation. Rollback any later approved exclusion by removing only that exclusion and confirming this one entry returns. No cleanup save performed now.

Existing Shop e-page2 self-canonical/legacy301 issue remains the separately held §13–14 proposal. Do not combine its unverified native mapping with GSC submission work or alter filters/Case rules.

### Saved result, rollback and next action

New GSC request/submission confirmations are external actions with no normal withdrawal/backdating control observed; do not use Removals or delete the working sitemap to “undo” them. No production SEO configuration requires rollback. AIOSEO access preference rollback is merely collapsing its metabox; schema Product pilot remains unsaved with native default/serialization limitations in [Woo audit§14](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md).

Next after quota reset: re-inspect remaining five cases, request only still-eligible unindexed ones, then products/articles. Recheck accepted URLs later without equating request with Indexed; confirm post-sitemap reread33 and monitor important-page coverage. No exact ranking, indexing date, CPU/speed gain or universal crawler-access guarantee. All33 Inspection texts,171-URL CSV,96-URL readable register, current XML lists/live HTML metadata, report examples, quota/submission screenshots and reconciliation totals saved. Downloaded text evidence has normalized line endings/trailing whitespace; production robots.txt was not edited. Live Google index cannot be exhaustively enumerated through these example lists; undetected/unlinked/unknown URLs and complete historical crawl logs remain outside verified coverage.

References: [Google URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en), [Page Indexing definitions and example-list limits](https://support.google.com/webmasters/answer/7440203?hl=en). Their distinctions are why index requests, discovered, crawled-not-indexed and Indexed are recorded separately.

## 2026-11-13 — AIOSEO перевірено; попередній noindex-висновок уточнено

**Прямий Document GET200** для /shop/product_category_filter-tv/?e-page-19cf30b=2 повертає в самому HTML noindex,follow/canonicalShop. Попередній DOM-only висновок про відсутній серверний noindex був надто сильним; він більше не є підставою для нової SEO-правки. AJAXPOST фільтра залишає базовий head; причина старого page2-знімка (timing/cache) не доведена. Окремі scriptedGET403 не показують origin metadata. Збережено чинні FE restrictions/robots/CF; фактичний robots уже блокує /shop/product_category_filter-*, попри вимкнений FE generated-block toggle.

Fresh42HTTP/schema:24товари200/self-canonical/Product0/24, по2BreadcrumbList; sitemap24/3. Owner підтвердив реальні товарні ціни. Точна пропозиція: пілот Sanus11217 Product+Offer199USD, без непідтвердженого stock/ratings; глобальний schema default лишаєтьсяWebPage/ItemPage до пілоту. Product metabox порожня, причина не встановлена, native omissionavailability потрібно перевірити. Звичайна e-page2 має8іншихтоварів, алеcanonicalShop; пропозиція selfcanonical та потім точнийempty-query301 /shop/page/2/→e-page2, без глобальнихправил. Native scopedcanonical не підтверджений — не готово до deployment. [§13: точні поля/URL/risks/rollback/evidence](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md). Жодного SEO save/indexing/canonical/robots/sitemap/Cloudflare change. Немає GSCcoverage/RichResultsTest або гарантії ранжування.

## 2026-11-13 — Нативна пагінація Shop відновлена

24товари доступні16+8 без повторів; старий /shop/page/2/ тепер теж8, збережені noindex,nofollow/canonicalShop. Штатний Individual Pagination створює /shop/?e-page-19cf30b=2:8товарів/canonicalShop/без noindex. TV facet /shop/product_category_filter-tv/?e-page-19cf30b=2 має1останнійTV/canonicalShop, але також без noindex у фактичному DOM. Не узагальнювати mount/audio noindex на всі комбінації; попередній category origin head не був підтверджений через challenge. Це точний випадок для наступної окремої AIOSEO задачі, без зміни правил зараз.33HTTP200;24товари self-canonical; категорії збережено. Reset all видимий/працює desktop/mobile. [Докази/rollback §11](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md). Product schema не змінювалася.

## 2026-11-13 — P1 виконано, SEO/Cloudflare лише перевірено

Нативні виключення preload для п’яти товарних фасетів та Order Attribution off збережено окремо.24товари/3категорії/17Case Studies об’єктів залишилися200/indexable/self-canonical; sitemap24/3. AIOSEO вже виключає Brands/Tags/Attributes; Products default WebPage→ItemPage, Product schema відсутня24/24. Filter Everything: AJAX/crawler link protection увімкнені, robots blocking вимкнений; автоматично запропоновані robots правила зачіпали б і Case Studies, тому не застосовані. Збережено чинні noindex/canonical політики; жодного SEO save.

Cloudflare rulesetv4/BFM/WAF/виняток власника збережені.131 verified Amzn-SearchBot blocks на facet-комбінаціях; Google/Bing0 подій не доводить успішний crawl. Нормальні URL у BFM challenge подіях потребують ідентифікації відвідувача/Ray/outcome перед висновком про false positives. Точні рекомендації, URL patterns, ризики, rollback та обмеження: [розділи8–10 чинного звіту](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md). Зміни індексації/robots/canonical/sitemap/Cloudflare потребують попереднього показу власнику й дозволу. Shop page2 дублює16товарів ще до P1; не виправлялося. Не заявляти збереження позицій або CPU/speed виграш без вимірів.

## 2026-11-13 — Поточний аудит товарного каталогу

Read-only: усі24 товарні URL, Shop і три категорії200/indexable/self-canonical; товари/категорії в XML sitemaps. Sample mount facet200/noindex,follow/canonicalShop; category/brand facets anonymous403 Cloudflare challenge, тому їх origin head не перевірено. Orderby/min_price canonicalShop; Shop page2noindex,nofollow/canonicalShop. Політики не змінено, Case Studies release збережено.

GSC14Oct–10Nov:11productURLs/34impressions/0clicks;Shop7/0. Це Search Analytics, не Index Coverage/Crawl Stats. Ahrefs7Nov flags24missingProductschema; currentSanus підтверджує один приклад і два різні breadcrumb trails. Не робити масових index/schema змін без окремого рішення. Головна підтверджена зайва URL-робота — WP Rocket preload фасетних комбінацій. [Повний звіт і докази](../docs/WOOCOMMERCE-AUDIT-2026-11-13.md).

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
