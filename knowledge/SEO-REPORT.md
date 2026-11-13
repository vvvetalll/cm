# SEO-звіт — точка продовження
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
