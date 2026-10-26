# Історія оновлення Chicago Mounting
Зібрано 26.10.2026 з доступної історії розмов. Це історичний запис, не повторний live-аудит. Користувач 26.10.2026 прямо підтвердив: сайт повністю оновили. Не починати новий redesign з нуля.

## Погоджена основа після оновлення
### Головна — рішення користувача 18.09.2026
Hero → Pricing → Advantages → 5 Steps → Services → Real Projects → Reviews → CTA → Areas We Serve → Already Have a TV? → FAQ → About/SEO → Brands → Blog → Footer.
Зберегти бренди, компактний NAP/footer і ціновий орієнтир; не додавати декоративні блоки без потреби. Історичне значення ціни не є дозволом публікувати його без актуальної перевірки.
У тодішньому звіті асистента: ілюстровані 5 Steps, Call Now, три реальні фото, Reviews після проєктів, CTA після відгуків, пов’язані service areas, FAQ перед SEO, Blog унизу. Точний поточний DOM кожного блоку тут не перевірений.
Головна продає передусім installation service; Shop не повинен перетворюватися на головний зміст сторінки.

### Сервісні сторінки — рішення користувача 18.09.2026
Hero → Intro H2/image → Advantages → Steps → Video → Gallery → Products/TVs → Reviews → CTA → FAQ → SEO.
Intro короткий; розгорнутий SEO-текст унизу. Під час нинішнього live-перегляду Winnetka така послідовність значною мірою видима.
27.02.2026 користувач вимагав відобразити у звіті виконаний rollout hero на 12 сторінок: “Structural and SEO updates across 12 pages (new hero section implemented).” Поіменний список усіх 12 сторінок не відновлений.

### Позиціонування
15.07.2026 користувач відхилив фокус на камерах і furniture mounting; головне — TV Mounting / TV Installation, TV & Audio.
24.02.2026 користувач визначив голос бренду як командний we/us, а не одноосібний виконавець.
Зберігати різницю між /services/ та окремою послугою. Не повертати ранні універсальні тексти про все підряд.

## Дизайн
- 13.09.2026: зберегти зелений/чорний/білий; проблема була в generic tech-подачі, не в палітрі.
- Hero: замість шуруповертів розглядали двох монтажників із 100-inch Frame TV; це напрям візуалу, не доказ фактичного конкретного монтажу.
- Заголовки Kanit зберегти.
- Body: Noto Sans не подобався; історичний звіт 27.09 вказує на Elementor Global Typography → Text M та Inter. Остаточне live значення потрібно прочитати зі стилів, не вгадувати.
- Тексти під кнопками користувач просив збільшувати адаптивно через clamp().
- Для H3 блогу історично просили глобальні Text M variables, а не довільні px/clamp. Це окрема вимога, не суперечить clamp для іншого тексту.
- About/light hero: обговорювали окремий .cm-hero-about замість каскаду overrides .cm-hero; поточна реалізація не перевірена.
- FAQ: клас cm-faq ставиться на Nested Accordion widget, не секцію. Питання ліворуч, +/− справа; легкі світлі круги, зелений знак, без темної зеленої заливки. Історичні параметри зі звіту: #F1F4F1/#E9EFE8, min-height 58px, padding 14px 18px, mobile overrides. Повний CSS не відновлений; не реконструювати його як нібито оригінал.
- Відгуки динамічні: не прошивати застарілу кількість у текстах.

## Блог
- 29.01.2026: повернути Blog як WordPress Posts Page /blog/. Blog Header для Singular → Page → Blog; All Header виключає Blog; H1 BLOG. Поточні theme-builder conditions потребують перевірки.
- З кожною статтею давати SEO title і meta description.
- 21.09.2026 статтю про вартість монтажу користувач закрив після доопрацювання H1, структури, CTA, title/meta та цін; планували дату 21 Sep 2026.
- Тодішній title: TV Installation Cost Chicago: Prices & Add-Ons | Chicago Mounting.
- Тодішній meta: See TV installation costs in Chicago by TV size, plus cable management, electrical work, wall surface add-ons, and real pricing examples.
- 22.09 асистент називав Outdoor TV article оновленою; fireplace і Samsung Frame + recessed media box ще перевірялися. Була плутанина об’єкта перевірки: не вважати ці статті автоматично закритими.
- Обговорювали Samsung Frame Pro + MantelMount MM815/RB100 case study. URL, підтверджений у поточних Shorts: /samsung-frame-tv-pro-fireplace-installation-with-mantelmount-mm815-and-rb100-recessed-box/.

## Shop / WooCommerce
- 18.06.2026 користувач: /shop/ — головний каталог; категорії TV, Audio, Mounts.
- Історична конфігурація зі звіту: Shop — Latest/All Products; category archives — Current Query; Filter Everything Main Query. Не змінювати без огляду реальних queries.
- Product Image/Featured Image відрізняється від додаткової Product Gallery; проблема головного фото обговорювалася 15.06.
- Структура контенту товару: short description, overview, features, video, FAQ, SEO metadata; dealer pricing/delivery/installation — історичний напрям, не доказ заповнення всіх товарів.
- Обговорювали оптимізацію індексації фільтрів, robots.txt і Cloudflare /cdn-cgi/l/email-protection; фінальні правила не відновлені.
- Get Pricing: запит передавати конкретний товар у форму/кнопку; завершення не підтверджене.

## Гео та Service Area Hub
- Glenview, Evanston, Wilmette, Winnetka — чотири активні міста.
- 06.04.2026: у розмові користувач повідомляв про 8 доданих оптимізованих зображень для Winnetka. Не приписувати фото місту за SEO alt без доказу реальної локації.
- /find-near-me/ не видаляти, не перенаправляти й не ставити noindex за старою порадою. Рішення 12.10 — Service Area Hub, зберегти URL/H1/canonical, спочатку аналіз.
- Smart Tips, зменшення voice-search тексту й same-day акценту були пропозиціями; збережений документ прямо не заявляв виконаних live-змін.
- ZIP Checker: основні заплановані місця /find-near-me/, homepage, /quote/; без вставки всюди.

## Форми, кеш, технічне
- /quote/ — сторінка калькулятора вартості; Book Now та Get a Free Quote були частиною роботи.
- 26.09 обговорювали затримку JS калькулятора та виключення оптимізації; точний script handle / фінальне правило не відновлені.
- WordPress, Elementor, WooCommerce; WP Rocket і Hostinger бачили у поточному браузері. Параметри кешу/CDN не перевірені.
- OG/default image 1200×630 згадували у старому звіті; поточне налаштування не перевірене.
- Не відновлювати старі паролі, логи автентифікації чи історію клієнтських запитів у публічному репозиторії.

## Що ще не відновлено
Повний поіменний список 12 оновлених сторінок; фінальний global/blog CSS; Elementor exports/templates; повний redirect/robots/schema inventory; актуальні metadata всіх сторінок; точні кеш-виключення; повний approval/deployment record ZIP Checker.
Шукати/читати актуальні джерела, коли конкретна задача потребує цих даних. Не переробляти сайт лише через прогалину в нотатках.
