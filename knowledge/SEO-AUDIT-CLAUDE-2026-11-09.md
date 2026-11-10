# Chicago Mounting — незалежний SEO-аудит і перевірка висновків ChatGPT Work

**Дата:** 9 листопада 2026 (America/Chicago). **Аудитор:** Claude (незалежна перевірка). **Гілка:** `seo-claude-audit`, створена від `origin/seo` @ `457d079`. Гілку `seo` не змінено й не злито.
**Режим:** тільки читання. Сайт, GBP, трекінг, індексація, Case Studies, налаштування BrightLocal/Ahrefs не змінювались. Платних сканів не запускалось.

**Позначки:** **[Факт]** — прочитано мною напряму в джерелі 9.11.2026; **[Розрахунок]** — моя арифметика над цими даними; **[Гіпотеза]** — правдоподібне, але не доведене; **[Не перевірено]** — не вдалося отримати незалежно. Впевненість: High / Medium / Low.

---

## Executive summary

1. **Сайт не «обвалився», але після літа органіка не росте.** GSC: кліки 276 (черв.) → 290 (лип.) → 285 (серп.) → 276 (вер.) → 254 (жовт.); покази впали з піку 34,1K (серп.) до 26,5K (жовт., −22%). Рік до року жовтень: 90 → 254 кліки. Вересневі оптимізації **не дали вимірюваного приросту** ні в кліках GSC, ні в key events GA4 (Google organic: 46/41/35/51/44 за черв.–жовт.). Але й шкоди не видно. (High)
2. **«Слабкість трьох міських сторінок» — артефакт.** 84% падіння показів чотирьох міст у вікні ChatGPT (11–24.10 → 25.10–7.11) дали нерелевантні запити «tv mounting services/installation in **bunker hills, il**» (село за ~250 миль від Чикаго) на позиціях 37–85 з нулем кліків. Це був тимчасовий сплеск глибоких показів у тижні 12 і 19 жовтня; у жовтні всі чотири сторінки мали **найбільше** показів за історію. (High)
3. **Справжня проблема міських сторінок — попит, а не релевантність.** За 6 місяців у GSC запити з назвами чотирьох міст дали **0 кліків**; «tv mounting glenview» — 9 показів. У ручній перевірці Google (персоналізований браузер власника) кожна міська сторінка — №1 органічно за «tv mounting/installation <місто>». Сторінки ранжуються; людей, що так шукають, майже немає. Чотири сторінки дали **2 з 248** органічних key events GA4 за 1.05–7.11 (0,8%). (High для даних; Medium для SERP через персоналізацію)
4. **BrightLocal-«колапс» — переважно зміна методології, а не втрата бізнесу.** Крім глибини 20→100, перехід Local Finder → Google Maps **змінив склад конкурентів**: 5 з топ-10 «TV mounting» 16.10 (TV Mounting Same Day 1.1, Pro TV Mounting, ProMount, Anytime, TechNow) зникли з топ-10 6.11, а на їхнє місце прийшли локальні North Shore бізнеси з фізичною адресою (Minas Electronics, Paul's Winnetka TV, Home Systems, Northshore Fireplace тощо). Це системний зсув для всієї групи service-area бізнесів. До того ж маркер профілю в BrightLocal — у західних передмістях, ~15–20 миль від сітки; в Maps proximity важить більше. (Medium-High)
5. **Maps — малий канал для цього профілю.** GBP за черв.–лист. 2026: 4 350 переглядів профілю, з них **94% з Google Search** і лише **~6% з Google Maps**. Пошукові терміни — «tv mounting service», «tv mounting chicago», бренд; жодного North Shore міста в топ-13. Сітка BrightLocal вимірює вузький канал у географії, де бізнес фізично не присутній. (High)
6. **Реальний сигнал спаду — GBP-взаємодії з червня, не з жовтня.** Приблизно 82 (черв.) → 80 (лип.) → 58 (серп.) → 46 (вер.) → 50 (жовт.). Це збігається з падінням інтересу в Google Trends (Illinois, «tv mounting»: H1-2026 ~66 → лип.–жовт. ~43) і з падінням показів GSC з серпня. Сезонність/попит — правдоподібне пояснення, але не доведене. (Medium-Low)
7. **GA4 для бізнес-рішень зараз непридатний без очищення.** 325K «users» за 1.08–7.11, кастомна подія з URL `/shop/product…` — 319K, realtime-користувачі з Бангладеш/Колумбії/Мексики. Key events = `click_to_book`, `click_to_call`, `generate_lead` — це кліки/наміри, а не підтверджені ліди. (High)
8. **Технічний ризик:** після ~13 швидких запитів з одного IP сайт віддав «Bot Verification» і потім **403 Forbidden** на кілька хвилин. Для Googlebot ознак проблеми немає (5xx = 0, індексація стабільна), але агресивний WAF треба перевірити. Мобільний lab-LCP Glenview — **9,2 с** (PSI perf 55). (High для спостережень)

**Вердикт щодо висновків ChatGPT:** загальна обережність і рамка «методологія + невідома частка» — коректні. Але два пріоритети його плану (/find-near-me/ і «втрати» міських сторінок) спираються на метрики, які при розборі виявились шумом або каналом без кліків; пропущено аналіз складу конкурентів BrightLocal, частки Maps у GBP, proximity та реального попиту на міські запити.

**Головні дії:** (1) виміряти реальні ліди та очистити GA4; (2) перевірити WAF для легітимних краулерів; (3) переосмислити BrightLocal як новий Maps-baseline без порівняння з Finder; (4) зосередити SEO-зусилля на загальних комерційних запитах без міста («tv mounting service» p14.8, «tv mounting» p11.2, «professional tv mounting» p16.6 для головної) і на авторитеті (DR 2, профіль посилань — майже повністю спам). **Виправлення 10.11:** за «tv mounting chicago» головна вже на p1.7 (див. §12); попереднє формулювання «2-га сторінка» було хибним — сайтове середнє розмивали другорядні URL. Міські сторінки не переписувати; додати реальні кейси після погодження власником.

---

## 1. Поточне SEO-здоров’я

| Показник | Значення | Джерело / дата | Впевненість |
|---|---|---|---|
| Кліки GSC, місяці 2026 | січ 154, лют 144, бер 179, кві 205, тра 237, чер 276, лип 290, сер 285, вер 276, жов 254, 1–7.11: 65 | [Факт] GSC, Web, усі країни, сума денних рядків, оновлено «4 години тому» 9.11 | High |
| Покази GSC | чер 21,0K, лип 29,9K, сер 34,1K, вер 30,3K, жов 26,5K | [Факт] там само | High |
| Рік до року (жовтень) | 90 → 254 кліки; 7,8K → 26,5K показів | [Факт] | High |
| 14-денне вікно ChatGPT | 107 → 127 кліків; 12,2K → 13,6K показів | [Факт] повторно підтверджено | High |
| Видимі (неанонімізовані) запити | ~100–115 кліків/міс. з ~254–290; решта ~60% — анонімізований long tail | [Розрахунок] над топ-1000 запитів | High |
| Бренд («chicago mounting» тощо) | чер 33, сер 30, вер 39, жов 41 клік | [Розрахунок] | Medium (тільки видимі запити) |
| Індексація | 81 indexed / 73 not indexed (noindex 27, redirect 24, 404 4, other 4xx 1, robots 1, crawled-not-indexed 15, discovered 1, 5xx 0) | [Факт] GSC Page indexing | High |

**Висновок:** зростання сайту відбулося в січні–липні 2026; з серпня — плато з легким спадом показів. Це не криза, але й не ефект вересневого редизайну.

## 2. Чотири географічні сторінки

### 2.1 Історія (GSC, сторінка = точний URL)

| Місяць | Glenview кл/пок/поз | Evanston | Wilmette | Winnetka |
|---|---|---|---|---|
| Квіт | 3 / 69 / 15.4 | 4 / 71 / 11.4 | 2 / 117 / 35.2 | 9 / 123 / 21.1 |
| Трав | 1 / 96 / 18.9 | 1 / 62 / 16.4 | 2 / 118 / 42.1 | 2 / 135 / 36.0 |
| Черв | 1 / 141 / 21.0 | 0 / 51 / 10.3 | 1 / 160 / 35.9 | 0 / 91 / 22.7 |
| Лип | 3 / 211 / 22.7 | 0 / 57 / 10.7 | 1 / 184 / 36.4 | 1 / 87 / 20.5 |
| Серп | 3 / 272 / 25.8 | 1 / 52 / 13.2 | 0 / 158 / 37.0 | 0 / 79 / 27.7 |
| Вер | 10 / 212 / 31.3 | 1 / 58 / 18.6 | 1 / 74 / 37.9 | 0 / 58 / 20.5 |
| Жовт | 3 / 328 / 41.1 | 1 / 109 / 17.6 | 0 / 216 / 49.4 | 1 / 193 / 51.5 |
| 1–7 лист | 0 / 41 / 39.2 | 0 / 41 / 23.8 | 0 / 29 / 24.8 | 0 / 30 / 32.3 |

[Факт; позиція — середньозважена за показами, мій розрахунок над денними рядками.] Сторінки отримують покази з квітня 2026. Сумарно ~54 кліки за 7 місяців на всі чотири.

### 2.2 Що насправді сталося в жовтні

- Тижні з 12.10 і 19.10: різкий сплеск показів на **глибоких позиціях** (Glenview 81/118 при p45; Wilmette 61/73 при p48–54; Winnetka 51/62 при p54–63), потім повернення до норми. [Факт]
- Запитовий розбір вікна ChatGPT (11–24.10 vs 25.10–7.11): запити «tv mounting services in bunker hills, il» і «tv mounting installation in bunker hills, il» дали 168 → 54 показів (−114) на Glenview/Wilmette/Winnetka; загальне падіння чотирьох міст за ChatGPT — −136. **≈84% «втрати» — ці запити.** Нових — «tv installation burr ridge», «hinsdale», «western suburbs», «mirror tv installation western suburbs» (теж p25–87, 0 кліків). [Факт/Розрахунок] High.
- За 6 місяців сайт отримав 961 показ за «bunker hills»-запитами при 0 кліків. [Факт] Походження (автоматизовані запити, rank-трекери, тести Google) — **[Гіпотеза]**, Low.
- Позиції в «пізньому» вікні **покращились**: Wilmette p54 → p24, Winnetka p63 → p32.

### 2.3 Попит і релевантність

- Запити з назвою міста за 7.05–7.11 (топ-1000): Glenview — «home theater installation glenview» 204 пок. p12.6, «tv mounting glenview» 9 пок.; Evanston — «home theater installation evanston» 127; Wilmette — 80 сумарно, переважно нецільові («film 3m installation», «install drywall»); Winnetka — «home theater installation winnetka» 202. **Кліків — 0.** [Факт] High.
- Ручна перевірка Google 9.11 (браузер власника, персоналізація та локація можливі): «tv mounting glenview il», «tv installation evanston il», «tv mounting winnetka», «tv mounting wilmette» — відповідна сторінка Chicago Mounting **№1 органічно**; поруч tvmountingpromount.com, hdinstalls.com, hellotech, thumbtack, yelp, taskrabbit. [Факт для цього браузера] Medium.
- Контент (WebFetch 9.11): однаковий шаблон з 14 H2, ~1 000–1 200 слів, без мапи, без ZIP/районів, жоден із 10 показаних відгуків не згадує місто; галереї 8–12 фото. Унікальний локальний зміст обмежений (Wilmette — опис старих будинків/камінів). JSON-LD **[Не перевірено]** (прямий HTML отримати не вдалося, див. §5).
- Внутрішні посилання: усі чотири сторінки в меню Areas і в хабі /find-near-me/ (зі ZIP 60025/26, 60091/93, 60201/02). Сирітських сторінок немає.

**Висновок:** причина малого трафіку — мізерний пошуковий попит на «<послуга> + <місто>» і домінування local pack/«near me», де вирішує proximity. Переписування текстів цього не змінить. Кейси (ще не інтегровані) можуть дати довіру й конверсію, але не великий трафік. High.

## 3. Сезонність і локальний попит

| Google Trends, Illinois, «tv mounting» (місячне середнє індексу) | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|
| Червень | 41 | 41 | 51 | 32 | 73 |
| Вересень | 44 | 40 | 31 | 47 | 38 |
| Жовтень | 44 | 37 | 18 | 54 | 48 |
| Листопад | 52 | 51 | 45 | 73 | 49* |
| Грудень | 39 | 49 | 52 | 65 | — |

[Факт] Trends 5 років, *листопад 2026 неповний. Chicago DMA для «tv mounting + tv installation» — той самий напрямок, але дуже шумно (нульові тижні).

- Листопад > жовтень у кожному з 2022–2025 → очікуваний сезонний підйом у листопаді–грудні (покупки TV, свята). **Medium.**
- 2026: січ–черв ~66 проти лип–жовт ~43 (−35%). У 2025 було навпаки (H1 34, H2 51). Тобто H2-2026 — не стандартна сезонність, а або спад попиту, або аномально високе H1. **Low-Medium.**
- Узгоджено: GBP-взаємодії ~82 → ~46–50 з червня по жовтень; покази GSC з піку серпня −22%. Причинність не доведена: Trends — відносний семпльований індекс.

**Висновок:** не можна приписувати жовтень ні алгоритму, ні редизайну; демпінг попиту H2-2026 — правдоподібне спільне пояснення. Перевірка — порівняти листопад–грудень з 2025 і з GBP «Searches».

## 4. BrightLocal і Google Maps

### 4.1 Методологія — [Факт]

[Офіційні release notes жовтня 2026](https://help.brightlocal.com/hc/en-us/articles/40475732070162-October-2026-Release-Notes): Local Search Grid бере дані з Google Maps замість Local Finder; глибина 20 → 100; «average rank … may look different. It's a more complete picture, not a change in your visibility»; rank change призупинено до двох Maps-запусків. Історія запусків звіту 485676: 9.10 (×2, ad hoc), 10.10 (ad hoc), 16.10, 30.10, 6.11 (scheduled). **23.10 відсутній** — збігається з вікном міграції.

Повторно перевірено значення: Fireplace 16.10 = 12.8, 6.11 = 37.3; TV mounting 16.10 = 15.6, 6.11 = 92.9. Сітка та маркер профілю візуально ідентичні на 16.10 і 6.11.

### 4.2 Нове: склад конкурентів змінився для всіх

| «TV mounting», топ-10 | 16.10 (Local Finder) | 6.11 (Maps) |
|---|---|---|
| TV Mounting Same Day LLC (975 відгуків) | 1.1 | поза топ-10 (>25.9) |
| ClearView TV Mounting | 2.3 | 8.5 |
| R&R TV Mounting | 3.1 | 11.6 |
| HDInstalls | 5.2 | 21.2 |
| Pro TV Mounting (976) | 5.3 | поза топ-10 |
| ProMount TV Mounting (559) | 6.9 | поза топ-10 |
| Chicago TV Installer | 7.3 | 5.6 |
| Anytime T.V. Mounting & AV | 7.4 | поза топ-10 |
| TechNow Same Day TV Mounting | 9.1 | поза топ-10 |
| Chicago Mounting | 15.6 | 92.9 |
| Нові в топ-10 6.11 | — | Fix Pro Solutions, Minas Electronics, Put My Stupid Thing Together, Williams Home Theater, Home Systems Inc., Paul's Winnetka TV Services |

«Fireplace TV mounting»: 16.10 №1 — TV Mounting Same Day LLC (1.9); 6.11 №1 — **Northshore Fireplace** (магазин камінів, 2.1), №4 — Hearth & Home Inc. [Факт] High.

**Інтерпретація:** Maps-видача для цієї сітки систематично віддає перевагу бізнесам із фізичною присутністю на North Shore, а не загальночиказьким service-area брендам з сотнями відгуків. Падіння Chicago Mounting відбувається **разом** з усією когортою подібних конкурентів. Це сильний аргумент, що основна частина розриву — зміна джерела, а не специфічна втрата профілю. Залишкову частку саме для CM виміряти неможливо без паралельних даних Finder/Maps. **Medium-High.**

### 4.3 Proximity

- Маркер локації, який BrightLocal показує для відстежуваного профілю, — у західних передмістях, приблизно 15–20 миль на південний захід від сітки North Shore. [Факт: видно на карті] Чи це прихована адреса GBP — **[Не перевірено]**; BrightLocal у налаштуваннях має city-level «Chicago 60601».
- На обох датах найкращі точки — південний край сітки (ближче до маркера): Fireplace 6.11 — 13–14 на південних точках проти 44–52 на північних; 16.10 — 8–9 проти 13–18. [Факт, візуально] Узгоджується з дією proximity, яка в Maps сильніша. **Medium.**

### 4.4 Бізнес-вага Maps

GBP Performance (черв.–лист. 2026, owner view 9.11): 4 350 переглядів — Search mobile 2 954 (68%), Search desktop 1 146 (26%), Maps mobile 147 (3%), Maps desktop 103 (2%); разом Maps 5,7%. Пошукові терміни: tv mounting service 246, tv mounting chicago 193, chicago mounting 179, tv mounting service near me 60, chicago tv mounting 42 … без North Shore міст. [Факт] High.

**Висновок:** сітка BrightLocal на North Shore вимірює ~6% каналу у зоні, де профіль не має фізичної близькості. Корисна як трекер, але не як головний KPI. Органічні ранги ≠ Maps-ранги: GSC-позиції не стосуються цієї сітки.

### 4.5 Що пояснено, а що ні

| Компонент розриву | Оцінка |
|---|---|
| Глибина 20→100 (арифметика підстановки 101) | Пояснює більшість числового стрибка в середньому (напр. TV mounting 92.9 vs 21.0 при капі). High |
| Зміна джерела Finder→Maps (склад видачі, proximity) | Найімовірніше основна причина залишку; підтверджено зсувом усієї когорти SAB. Medium-High |
| Реальна втрата видимості саме CM | Не встановлена й не виключена. GBP-взаємодії в жовтні стабільні (≈50 vs ≈46 у вересні) — проти гіпотези різкої втрати наприкінці жовтня. Medium |
| Перейменування GBP (травень) | Не причина (згоден з ChatGPT). High |

## 5. Технічне SEO

| Перевірка | Результат | Впевненість |
|---|---|---|
| Індексація | 81 / 73; 5xx = 0; manual actions/security — за ChatGPT «no issues», я не відкривав повторно | High / [Не перевірено] |
| 404 (4 URL) | `/?page_id=10264`, `/product-category/tvs/`, `/product-tag/t/`, `/wp-*.php` — неважливі URL; виправлення не пріоритетне | High |
| Crawled – not indexed (15) | Серед них блог: `/diy-vs-professional-tv-mounting/`, `/how-high-to-mount-tv/`, `/wall-mounted-speakers-small-rooms/`, `/top-mistakes-to-avoid-when-mounting-a-tv-above-a-fireplace/`, `/smart-device-integration-home-benefits/`; також товари, `/brand/sony/`, `/wp-json/`, feed | High (список), Medium (причина — якість/дублювання) |
| robots.txt | Дозволяє Googlebot; блокує AI-навчальні боти та GoogleOther/Google-Extended (на Search не впливає); sitemap.xml вказано | High |
| WAF / Bot Verification | ~13 fetch-запитів з одного IP → «Bot Verification», далі 403 Forbidden на кілька хвилин; повторно сторінки отримано іншим IP. Вплив на Googlebot не доведено | High (спостереження), Low (вплив) |
| Core Web Vitals | GSC: недостатньо field-даних. PSI 9.11, Glenview mobile: Perf 55, LCP 9.2 s, TBT 510 ms, CLS 0.033, FCP 2.1 s; SEO 100, A11y 85, BP 96; render-blocking ~1.7 s, unused JS ~363 KiB | High (lab) |
| Структуровані дані | **Перевірено 10.11 (DOM, §12):** головна — HomeAndConstructionBusiness з areaServed (усі 4 міста), без address/sameAs; сервісні й міські сторінки — Organization/WebPage/Breadcrumb + **Product «Chicago Mounting Service» з aggregateRating 5/381 і 20 review** + FAQPage; блог — BlogPosting. LocalBusiness/Service на міських сторінках відсутні | High |
| Можлива конкуренція URL | `/samsung-frame-tv-installation-in-chicago/` (GA4: 7 кл., 374 пок. за 6 міс.) поруч із `/frame-tv-mounting-chicago/`. Канібалізацію не доведено | Low |
| Mobile usability | Окремого звіту GSC немає; PSI мобайл без критичних SEO-помилок. 390px-перевірка Glenview 10.11: без горизонтального переповнення, є липка нижня панель «GET A FREE QUOTE / CALL US»; 19 текстових блоків <14px | Medium |

## 6. Органічні ключі та сторінки

- Головна — двигун: у жовтні 132 з 259 органічних кліків Google (GA4-звіт GSC) і 33 з 44 key events (75%). CTR головної впав з 2,63% (черв.) до 1,41% (жовт.) при погіршенні позиції 13,8 → 20,9 і рості показів. [Факт] High.
- ~~Найбільша небрендова можливість: «tv mounting chicago» p14–23 … друга сторінка~~ **Виправлено 10.11:** то було сайтове середнє по кількох URL. Для самої головної (9.08–7.11): «tv mounting chicago» 25 кл./390 пок./**p1.7**/CTR 6.4%; «tv installation chicago» 8/370/**p1.6**/2.2%; «tv mounting service» 27/2 085/p14.8; «tv mounting» 2/1 993/p11.2; «professional tv mounting» 0/592/p16.6. Реальна можливість — запити без «chicago» і CTR на p1–2 (над органікою реклама та local pack). [Факт] High.
- Ahrefs (US, 10.11 vs 10.10): 45 ключів; **жоден не прив’язаний до міських сторінок**. Ahrefs показує «tv installation chicago» на p2–3 — розбіжність з GSC (p15) через одноточковий семпл Ahrefs проти усередненого GSC. [Факт] High.
- /find-near-me/: покази ~3 700–4 250/тиж. у серпні → ~800/тиж. у листопаді; спад **почався з тижня 21.09**, не в жовтні. 9.08–12.09 vs 4.10–7.11: кліки 2 → 3, покази 17 765 → 4 934; «tv wall mount installation near me» 5 027 → 1 338 при **незмінній** позиції ~25. 54% показів — desktop. Економічна цінність втрати ≈ 0 кліків. [Факт] High. Чому покази на 3-й сторінці зникли (попит, зміни SERP, нелюдські запити) — [Гіпотеза], Low.
- Ahrefs «lost» near-me ключі для /find-near-me/ мають дати оновлення 17.08–24.09 — **збігаються** з початком спаду в GSC (ChatGPT відкинув їх як застарілі).

## 7. Конкуренти

- Органіка (міські запити): tvmountingpromount.com (окремі міські URL), hdinstalls.com, hellotech.com, thumbtack, taskrabbit, yelp, aturservicepros, midwesttvmounting, hitechinstalls, getmediawall. Органічні конкуренти Ahrefs: chicagotvinstaller.com, hdinstalls.com. [Факт]
- Maps: залежить від джерела (§4.2). На North Shore перемагають фізично близькі бізнеси, магазини камінів і AV-компанії.
- Посилання: Ahrefs refdomains, відсортовані за DR, — суцільно SPAM-позначені `.shop`/link-selling домени (factmags.com, buybacklinks.agency, bunero.shop …). DR 2 (за ChatGPT; не перевіряв окремо). Якісних локальних посилань не видно. Disavow без manual action не потрібен; проблема — **відсутність** якісних посилань, а не наявність спаму. Medium.

## 8. GA4, конверсії й бізнес-вплив

| Google organic (GA4 → Search Console report) | Черв | Лип | Серп | Вер | Жовт | 1–7 лист |
|---|---|---|---|---|---|---|
| Кліки Google | 282 | 291 | 287 | 277 | 259 | 65 |
| Active users | 249 | 283 | 232 | 234 | 211 | 69 |
| Key events | 46 | 41 | 35 | 51 | 44 | 11 |

[Факт] High.

- Key events налаштовані: `click_to_book`, `click_to_call`, `generate_lead`; `purchase`, `qualify_lead`, `close_convert_lead` — без даних. [Факт] Це наміри, не підтверджені ліди/роботи.
- Міські сторінки, 1.05–7.11: Glenview 21 кл./1 key event, Wilmette 5/1, Evanston 4/0, Winnetka 4/0. Разом 2 з 248. [Факт]
- Забруднення: 325K «total users» за 1.08–7.11; подія з ім’ям URL `/shop/product…` — 319K; home card «Active users 15K, +1 249%»; realtime — Бангладеш, США, Колумбія, Мексика. Загальні GA4-тотали непридатні як KPI. [Факт] High.
- GBP-взаємодії стабільні у вер.–жовт., спадають з червня (§3). Доходу/закритих робіт не перевірено.

**Висновок:** вимірюваного бізнес-ефекту вересневих оптимізацій немає; міські сторінки комерційно маргінальні; ключовий актив — головна + GBP у Google Search.

## 9. Перевірка висновків ChatGPT Work (гілка `seo` до `457d079`)

| # | Висновок ChatGPT | Класифікація | Обґрунтування |
|---|---|---|---|
| 1 | Немає site-wide органічного обвалу (107→127 кл., 12 182→13 588 пок.) | **Підтверджено** | Повторено. Доповнення: помісячно покази −22% від серпня, кліки плато — це не «зростання». |
| 2 | /find-near-me/ −750 показів (−28,47%) | **Підтверджено числом, але оманливо** | Спад почався 21.09, −72% за 5 тижнів, при ~0 кліках до і після; сторінка не пріоритетна за рішенням власника. |
| 3 | Три міські сторінки слабшають, чотири міста −30% | **Хибно / суперечить доказам** | 84% падіння — «bunker hills, il» на p37–85, 0 кліків; жовтень — рекорд показів; позиції в пізньому вікні кращі. |
| 4 | «Органіка головної маскує слабкість міських сторінок» | **Правдоподібно, але без підстав** | Міські сторінки ніколи не мали суттєвого трафіку; маскувати нічого. |
| 5 | 4.3 — лише Samsung Frame 16.10, не загальне середнє | **Підтверджено** | — |
| 6 | Перший злам 30.10, точна дата невідома | **Підтверджено** | Плюс: 23.10 запуску немає. |
| 7 | Глибина перебільшує розрив, але не пояснює все | **Підтверджено** | — |
| 8 | Частку джерела Finder→Maps vs реальної втрати визначити неможливо | **Правдоподібно, але надто обережно** | Зсув усієї когорти SAB-конкурентів і поява North Shore storefront-бізнесів — сильний доказ домінування джерела. Точна частка все ще невимірна. |
| 9 | Конкуренти випереджають у семплових точках | **Підтверджено**, залежить від методології | — |
| 10 | Зміна назви GBP (травень) не причина | **Підтверджено** | Нюанс: Business Profile Manager 9.11 показує власницьку назву «Chicago Mounting LLC», а публічна — Google-оновлення «Chicago Mounting»; це правдоподібно пояснює лист 24.10 з «LLC». [Гіпотеза] Medium. |
| 11 | GBP-взаємодії не обвалились (вер 46, жовт 50) | **Підтверджено, неповно** | Пропущено спад з червня (~82). |
| 12 | Ahrefs lost near-me не можна прив’язати через старі дати | **Хибно частково** | Дати серп.–вер. узгоджуються з початком спаду в GSC з 21.09. |
| 13 | GA4 organic +20,55%, key events 18→27 | **Не перевірено незалежно** для того самого вікна; напрям узгоджений з моїми місячними даними. «Key events ≠ ліди» — **підтверджено**. |
| 14 | GSC indexing 81/73 і причини; 4×404 треба оглянути | **Підтверджено**; 404 — неважливі URL, низький пріоритет. |
| 15 | Усі 36 координат сітки збігаються (коміт 457d079) | **Не перевірено незалежно** | Візуально сітка й маркер ідентичні — узгоджується. |
| 16 | Дії: пріоритет /find-near-me/ і розбір міських «втрат» | **Не обґрунтовано** | Див. п. 2–3. |
| 17 | Дії: валідація лідів, без rollback назви/категорій/редизайну | **Підтверджено** | — |

**Пропущено ChatGPT:** склад конкурентів до/після; proximity і розташування маркера; частка Maps у GBP (~6%); реальний попит на міські запити (≈0 кліків); сплеск і природа «bunker hills»-показів; масштаб бот-забруднення GA4 (325K users); WAF-блокування; PSI/LCP; спад GBP з червня; сезонність через Trends; блог у «crawled – not indexed».

## 10. Пріоритезований план дій

| Пріоритет | Дія | URL / об’єкт | Доказ | Очікувана користь | Метрика успіху |
|---|---|---|---|---|---|
| **P1** | Зібрати реальні ліди: щомісячний реєстр (дзвінки, форми, бронювання, закриті роботи) з джерелом і містом; звірити з `click_to_call`/`generate_lead`; не змінювати трекінг без окремого дозволу | /quote/, телефон, GBP | Key events = кліки; GA4 бот-шум | Рішення на основі доходу, а не середнього рангу | ≥90% key events співставлено з реальними контактами; ліди/міс. за джерелом |
| **P1** | Підготувати план очищення GA4: фільтр/сегмент ботів, розібрати подію з URL-ім’ям `/shop/product…`, звіти тільки по Google organic + US | GA4 property 498944746 | 325K users, 319K подій | Придатні KPI | Частка non-US/ботів у звітах <5%; стабільні тотали |
| **P1** | Перевірити WAF/Bot Verification (Hostinger/Cloudflare): чи не блокуються Googlebot, Google-InspectionTool, PSI, AdsBot; GSC URL Inspection → Live test для головної і 4 міст | Весь сайт | 403 після ~13 запитів | Захист від тихої втрати сканування | Live test 200; Crawl stats без зростання 403/4xx |
| **P1** | BrightLocal: оголосити 30.10/6.11 новим Maps-baseline; не порівнювати з Finder; звітувати частку точок у топ-3/10/20 замість середнього; запитати підтримку про дату міграції (лише з дозволу на комунікацію) | LSG 485676 | Release notes, когорта конкурентів | Чесний KPI | Тренд частки точок топ-20 за 6–8 тижнів |
| **P2** | Головна: запити без міста («tv mounting service» p14.8, «tv mounting» p11.2, «professional tv mounting» p16.6) — авторитет/посилання, без переписування; за «tv mounting chicago» (p1.7) — лише спостереження за CTR. Див. §12 | / | GSC query×page 9.08–7.11 | Небрендові кліки | «tv mounting service» p<10; кліки головної +20% vs жовтень |
| **P2** | Авторитет: якісні локальні посилання/цитування (асоціації, постачальники, локальні медіа, партнери-забудовники); не купувати посилання | Домен | DR 2, спам-профіль | Ріст позицій на 2-й сторінці | Нові релевантні referring domains/міс.; позиції комерційних запитів |
| **P2** | Інтегрувати Case Studies у міські сторінки **лише після фінального дозволу власника** і без фактичних тверджень про місто, де провенанс не доведено | 4 міські URL | Сторінки вже №1 за міськими запитами; бракує локального доказу | Довіра/конверсія, а не трафік | Key events з міських сторінок; час на сторінці |
| **P2** | Блог у «crawled – not indexed»: оцінити 5 статей; покращити/об’єднати/залишити — без масового noindex | 5 URL з §5 | GSC | Чистіший індекс | Indexed або свідоме рішення по кожному URL |
| **P3** | Продуктивність міських сторінок: render-blocking, unused JS у межах існуючих налаштувань WP Rocket/Elementor | 4 міські URL | LCP 9,2 s lab | Краща UX/конверсія мобайлу | Lab LCP <4 s, далі <2,5 s |
| **P3** | (Замінено рядком P2 «Розвести Frame-сервіс і Frame-пост» — див. §12.3 п.2) | — | — | — | — |
| **P3** | Моніторинг сезонного підйому: листопад–грудень vs 2025 | GSC/GBP | Trends | Відділити попит від рангу | Покази/GBP-пошуки лист.–груд. |
| **P2** | On-page: прибрати Product+aggregateRating/review-розмітку з сервісних/міських/about/reviews сторінок (залишити Organization/LocalBusiness, FAQ, Breadcrumb) | ~20 URL, §12.3 п.1 | DOM JSON-LD 10.11 | Зняти ризик structured-data spam | Rich Results Test: немає Product на сервісних URL; GSC manual actions = 0 |
| **P2** | Звірити провенанс 5 фото галереї Winnetka з alt «Winnetka» | /tv-installation-in-winnetka/ | §12.6 | Відповідність правилу реальних локацій | Кожне фото з містом в alt має підтверджену адресу роботи |
| **P2** | Розвести Frame-сервіс і Frame-пост; консолідувати камінні пости | §12.3 п.2–3 | DOM + GSC | Чіткий власник запиту, індексація | «frame tv installation near me» — один URL; «top mistakes» індексовано або об’єднано |
| **P3** | Контекстні посилання на 5 сервісних сторінок з 2 лінками | §12.3 п.4 | DOM | Краще сканування/релевантність | ≥5 контекстних посилань на кожну |
| **—** | **Не робити:** rebuild /find-near-me/, переписування міських сторінок, нові міські сторінки, rollback назви GBP, зміни категорій/адреси, disavow без manual action | — | Див. §2, §4, §7 | — | — |

## 11. Межі цього аудиту

- Прямий HTML сайту з мого середовища заблоковано (proxy) і потім WAF. 10.11 head/DOM/JSON-LD перевірено у браузері власника повільним послідовним завантаженням (див. §12). WebFetch-копії виявились частково застарілими (/find-near-me/ H1), тому §2.3 у частині контенту поступається §12.
- Ahrefs Keywords Explorer не використовувався (кредити); обсяги міських ключів — непрямо через GSC/Trends.
- GBP: не перевірено приховану адресу, історію полів, дублікати. Нічого не прийнято/не відхилено.
- SERP-перевірки — один персоналізований браузер власника.
- Сирі приватні експорти не комітились; лише агреговані цифри.
- PSI — один lab-прогін одного URL.

## 12. On-Page SEO аудит (сторінка за сторінкою) — 10.11.2026

### 12.1 Метод і статус перевірки

- **Інвентаризація:** XML-sitemap AIOSEO (`page-sitemap.xml` 34 URL, `post-sitemap.xml` 17 URL, product 24, product_cat 3, category 1), GSC Pages (9.08–7.11), меню сайту. Case Studies (16 noindex) у post-sitemap відсутні — узгоджено з рішенням власника.
- **Доступ:** звичайний браузер власника, тільки читання. Кожна сторінка завантажувалась послідовно в прихованому same-origin iframe з паузою ~12 с між сторінками (36 + 12 повторних завантажень за ~20 хв). Нових 403 не було. Elementor MCP, WP admin, керування комп’ютером не використовувались.
- **Що читалось з DOM:** `<title>`, `meta[name=description]`, `link[rel=canonical]`, `meta[name=robots]`, `og:*`, H1–H6 (`textContent`, бо Elementor-анімації ховають текст від `innerText`), внутрішні посилання поза header/footer з анкорами, `img` alt/width/height, усі `application/ld+json`, мобільна 390px перевірка Glenview.
- **Обмеження:** DOM після виконання JS може відрізнятися від сирого HTML (AIOSEO виводить мета/JSON-LD на сервері, тож ризик низький). HTTP-статус і заголовки (X-Robots-Tag) не читались. Кількість слів — оцінка `textContent` без header/footer (включає галереї/товарні картки). WebP-частку не оцінюю: lazy-load ховає `currentSrc`.
- **Позначки:** ✅ перевірено в DOM; 📊 перевірено в GSC; ⚠️ гіпотеза; ⛔ недоступно.

### 12.2 Що вже працює (не чіпати)

| Що | Доказ |
|---|---|
| Головна №1–2 за «tv mounting chicago» (p1.7, CTR 6.4%) і «tv installation chicago» (p1.6) | 📊 GSC query×page 9.08–7.11 |
| Усі перевірені індексовані сторінки: self-canonical, `max-image-preview:large`, без noindex, viewport є, рівно один H1 (крім /quote/) | ✅ 31 сторінка |
| Title 43–65 символів, унікальні; description 127–159 символів, унікальні, з містом/послугою | ✅ |
| Міські сторінки: title/H1/description містять місто й послугу; шаблон однаковий, але це не дубль — Google ранжує кожну за своїм містом | ✅ + 📊 (p1.5–13 за точними міськими запитами) |
| Блог-гайди дають небрендові кліки на p7–11: flat-vs-tilt (79 кл.), MantelMount-кейс (20), recessed-media-box (18, p6.2), LG G5 (13, p6.9) | 📊 |
| Колишні тонкі сторінки вже консолідовані 301: `/led-strip-light-installation/`, `/furniture-and-wall-mounting/`, `/wall-hanging-services/` → `/services/`; `/mantelmounts/`, `/samsung-tv-mounting/` → `/brands/` | ✅ фінальний URL у браузері |
| Мобайл: без горизонтального скролу, липка панель Quote/Call | ✅ 390px |
| Головна має HomeAndConstructionBusiness з телефоном, годинами, areaServed (усі 4 міста) | ✅ JSON-LD |

### 12.3 Перевірені проблеми (✅)

1. **Product-розмітка з відгуками на сервісних і міських сторінках.** На ~20 сторінках є `Product` «Chicago Mounting Service» з `aggregateRating` 5.0/**381** і 20 `review`, без `offers`. Це огортання власного бізнесу/послуги в Product, щоб отримати зірки. Google [не показує self-serving review snippets для LocalBusiness/Organization](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) і забороняє агрегувати відгуки з інших сайтів; така схема — ризик ручної дії за structured-data spam. Також 381 застаріло (на GBP 393). GSC 9.11: manual actions — немає. Факт розмітки: High; ризик санкції: ⚠️ Medium.
2. **Дубль H1 і теми Frame TV.** `/frame-tv-mounting-chicago/` (сервіс) і `/samsung-frame-tv-installation-in-chicago/` (блог) мають однаковий H1 «Samsung Frame TV Installation in Chicago». 📊 «frame tv installation near me»: сервіс p22.5 (244 пок.), пост p14.3 (6 пок.). Канібалізація слабка, але перетин H1/теми підтверджений. High.
3. **Перетин камінного кластера.** Сервіс `/fireplace-or-brick-wall-mounting/` + пости `/tv-installation-over-a-fireplace/` (H1 «TV Installation Over a Fireplace in Chicago») і `/top-mistakes-to-avoid-when-mounting-a-tv-above-a-fireplace/` (649 слів, **crawled – not indexed**) + кейси LG G5 і Frame Pro. Описи LG G5 («Learn how to safely mount an LG TV over a fireplace in Chicago…») і «over a fireplace» («Learn how to safely install a TV over a fireplace in Chicago…») майже однакові. Факт перетину: High; що саме він спричиняє неіндексацію — ⚠️.
4. **Мало контекстних внутрішніх посилань на сервісних сторінках.** Поза header/footer лише **2** внутрішні посилання на `/fireplace-or-brick-wall-mounting/`, `/recessed-media-box/`, `/commercial-tv-display-mounting/`, `/hide-tv-wires/`, `/tv-dismounting/` (порівняно з 17–31 на головній, premium, outdoor, same-day і містах). Ці сторінки не посилаються на кейси/гайди за своєю темою. High.
5. **/quote/ без H1 і майже без тексту** (~16 слів у DOM; калькулятор). Сторінка в sitemap та індексована. Для SEO не ціль; низький пріоритет. High.
6. **/blog/:** title «Blog | Chicago Mounting» (23 символи), H1 «BLOG», немає H2 (пропуск рівня H1→H3), ~163 слова. Low.
7. **/reviews/:** 218 зображень, 35 без alt, 58 без width/height. Medium (CLS/доступність).
8. **Невеликі прогалини alt:** 2–7 зображень без alt на сервісних/міських сторінках (шаблонні елементи). Low.
9. **Комерційний блок «Get The Best Price On most popular TV» з картками товарів** у середині міських і сервісних сторінок — розмиває намір «послуга» (H2 у порядку заголовків). ⚠️ вплив на ранжування не доведено; Low.
10. **`/tv-installation-and-mounting/` проти головної:** title «TV Mounting + Installation in Chicago», H1 «TV Mounting Services in Chicago» — та сама ціль, що й головна. 📊 За «tv mounting chicago» головна p1.7, ця сторінка за основними запитами p37–57; «commercial tv installation» — `/commercial-tv-display-mounting/` p19 і ця сторінка p37. Google вже обирає правильні URL; шкода ⚠️ мала.

### 12.4 Гіпотези (⚠️) і недоступні перевірки (⛔)

- ⚠️ Низький CTR головної на p1–2 (6.4% / 2.2%) пояснюється рекламою та local pack над органікою (видно в SERP 9.11), а не title/description. Переписування сніпета не обґрунтоване.
- ⚠️ Контент-гап міських сторінок проти ProMount: у них є конкретний локальний блок («What we run into in Glenview homes», мікрорайони The Glen, Swainwood, типи будинків). HelloTech (~400 слів) і Midwest TV Mounting (~300 слів, H1 «Evanston») слабші за CM (~1 000 слів, галерея, FAQ). Гап є, але попит на міські запити мізерний (§2.3), тож очікуваний ефект малий.
- ⛔ HTTP-статуси, X-Robots-Tag, сирий HTML до JS, server-timing — не читались (без curl/crawler, щоб не тригерити WAF).
- ⛔ Фактичне місто виконання робіт у галереях міських сторінок — не встановлюється з alt/імен файлів (правило AGENTS.md).
- ⛔ Валідація JSON-LD у Rich Results Test — не запускалась.

### 12.5 Таблиця по сторінках

GSC = 9.08–7.11 (кл./пок./поз.). «✅» = прочитано з DOM 10.11; «📊» = GSC.

| URL | Current title | Meta description | H1 | Target queries (GSC) | Findings | Recommended action | Priority | Verification status |
|---|---|---|---|---|---|---|---|---|
| `/` | TV Mounting Chicago \| Professional TV, Soundbar & AV Installation (65) | Professional TV mounting in Chicago from $129. Soundbar, home theater, and AV installation with hidden wires, upfront pricing, and same-day service. (148) | Professional TV Mounting in Chicago & … | 430 / 28 939 / p19.7; «tv mounting chicago» p1.7, «tv installation chicago» p1.6, «tv mounting service» p14.8, «tv mounting» p11.2 | Працює. 8 H2/6 H3, ~1 250 слів, 23 контекстних посилання, LocalBusiness-схема ок; без `sameAs` на GBP/соцмережі | Не переписувати. Додати `sameAs` (GBP, YouTube, Instagram, Facebook) у схему; рости за запитами без міста через авторитет | P3 | ✅ 📊 |
| `/tv-installation-in-glenview/` | TV Installation in Glenview, IL \| Chicago Mounting (50) | Professional TV installation in Glenview, IL. Clean wall mounting, hidden wires, and same-day service. Call … (142) | TV Mounting & Installation in Glenview… | 15 / 771 / p36.5; «home theater installation glenview» p12.6; «tv mounting glenview» 9 пок. | Мета/H1 коректні; №1 за «tv mounting glenview il» (персоналізовано). ~1 030 слів; H2 «TV mounting project» — загальний; Product+review-схема; немає LocalBusiness/Service для міста; немає локальних деталей/відгуків | Не переписувати. Після дозволу — інтегрувати реальні кейси; прибрати Product-review-схему (п.1). Опційно 2–3 речення реального локального контексту | P2 (схема) / P3 (контент) | ✅ 📊 |
| `/tv-installation-in-evanston/` | TV Installation in Evanston, IL \| Chicago Mounting (50) | Professional TV installation in Evanston, IL with clean wall mounting, hidden wires, and fireplace setups. … (135) | TV Mounting & Installation in Evanston… | 3 / 248 / p18.2; «home theater installation evanston» p17.7 | Як Glenview; найкраща середня позиція з чотирьох; ~970 слів | Як Glenview | P2/P3 | ✅ 📊 |
| `/tv-installation-in-wilmette/` | TV Installation in Wilmette, IL \| Chicago Mounting (50) | Professional TV installation in Wilmette, IL. Clean wall mounting, hidden wires, same-day service. … (148) | TV Mounting & Installation in Wilmette… | 1 / 435 / p41.5; переважно нецільові запити (bunker hills, drywall, film) | Мета/H1 коректні; єдина з описом локальних типів будинків; ~1 170 слів | Як Glenview | P2/P3 | ✅ 📊 |
| `/tv-installation-in-winnetka/` | TV Installation in Winnetka, IL \| Chicago Mounting (50) | Professional TV installation in Winnetka, IL. Clean wall mounting, hidden wires, and fireplace setups. … (142) | TV Mounting & Installation in Winnetka… | 1 / 335 / p40.0; «home theater installation winnetka» p16.3; «tv mounting winnetka» p1.5 | Мета/H1 коректні; галерея — див. 12.6 | Як Glenview; перевірити провенанс фото галереї (12.6) | P2/P3 | ✅ 📊 |
| `/find-near-me/` | TV Mounting Near Me in Chicago \| Chicago Mounting (49) | Looking for TV mounting near you? Chicago Mounting provides professional TV installation across Chicago … (145) | TV Mounting Service Areas in Chicago | 19 / 32 116 / p29.5 | Експериментальна; title «near me» ≠ H1 «Service Areas» — свідомий компроміс; лінкує 4 міста | Без змін (рішення власника) | — | ✅ 📊 |
| `/services/` | TV & Audio Installation in Chicago \| Chicago Mounting (53) | TV and audio mounting services in Chicago. TV installation on drywall, brick, or fireplace walls, … (148) | TV & Audio Mounting Services in Chicago | 4 / 1 515 / p40.2 | Хаб, 4 H2; ціль цієї сторінки — навігація | Без змін | — | ✅ 📊 |
| `/tv-installation-and-mounting/` | TV Mounting & Installation in Chicago \| Chicago Mounting (56) | Professional TV mounting in Chicago for walls, fireplaces, and same-day installs. … (135) | TV Mounting Services in Chicago | 5 / 3 113 / p40.4; «commercial tv installation» p37, «tv mounting» p57 | Та сама ціль, що й головна (12.3 п.10); хаб типів TV-послуг (H3) | Не перейменовувати зараз; зафіксувати роль «хаб типів TV-послуг», моніторити | P3 | ✅ 📊 |
| `/frame-tv-mounting-chicago/` | Samsung Frame TV Mounting in Chicago \| Chicago Mounting (55) | Samsung Frame TV mounting in Chicago with flush, no-gap installation. … (143) | Samsung Frame TV Installation in Chicago | 18 / 1 149 / p19.1; «frame tv installation near me/nearby» p17–22 | H1 збігається з блог-постом (12.3 п.2) | Зробити сервісну сторінку єдиною ціллю «Frame TV installation»; пост — посилатися на сервіс, змінити H1 поста на гайдовий («how-to/what to expect») | P2 | ✅ 📊 |
| `/samsung-frame-tv-installation-in-chicago/` (пост) | Samsung Frame TV Installation in Chicago: Homeowner Guide (57) | A complete guide to Samsung Frame TV installation in Chicago. … (147) | Samsung Frame TV Installation in Chicago | 1 / 144 / p13.7 | Дубль H1; 786 слів; BlogPosting+FAQ | Див. рядок вище | P2 | ✅ 📊 |
| `/fireplace-or-brick-wall-mounting/` | Fireplace & Brick TV Mounting in Chicago \| Chicago Mounting (59) | Fireplace and brick TV mounting in Chicago with secure anchors and hidden wiring. … (130) | Fireplace & Brick TV Mounting in Chicago | 8 / 332 / p11.4 | 2 контекстних посилання; кластер камінів розпорошений (12.3 п.3) | Додати посилання на LG G5, Frame Pro, «over a fireplace», «MantelMount vs» | P2 | ✅ 📊 |
| `/premium-large-tv-installation/` | Premium & Large TV Installation in Chicago \| Chicago Mounting (61) | Professional installation for 85", 98" and 100"+ TVs, OLED and premium displays … (159) | Premium & Large TV Installation in Chicago | 2 / 250 / p36.5 | Добре злінкована (31); Product-review-схема | Лише п.1 (схема) | P2 | ✅ 📊 |
| `/outdoor-tv-installation/` | Outdoor TV Installation for Patios & Decks \| Chicago Mounting (61) | Professional outdoor TV installation in Chicago. … (151) | Outdoor TV Installation in Chicago | 10 / 525 / p15.6 | Працює (Ahrefs: «outdoor tv installation near me» p3) | Без змін, крім схеми | P2 | ✅ 📊 |
| `/recessed-media-box/` | Recessed Media Box Installation in Chicago \| Chicago Mounting (61) | We install recessed media boxes for clean, flush TV mounting … (142) | Recessed Media Box Installation in Chicago | 18 / 606 / p6.2 | Найкращий CTR серед сервісів (3%); 2 контекстних посилання | Додати посилання на Frame/fireplace кейси | P3 | ✅ 📊 |
| `/same-day-tv-mounting/` | Same-Day TV Mounting in Chicago – No Rush Fee \| From $129 (57) | Need your TV up today? Same-day TV mounting across Chicago + suburbs, 7 days a week, 8am–8pm. No rush fee, from $129. 5.0 ★★★★★ (127) | Same Day TV Mounting Services in Chicago | 23 / 4 645 / p16.7; «same day tv mounting near me» 1 210 пок. p8.1 | Працює; ціна/«same-day»/зірки в сніпеті — потрібна актуальна підтвердженість (AGENTS.md) | Власнику підтвердити «from $129», «no rush fee», «7 days 8–8» | P3 | ✅ 📊 |
| `/prices/` | TV Mounting Prices & Cost in Chicago \| Chicago Mounting (55) | See TV mounting prices in Chicago. Transparent pricing … (129) | TV Mounting Prices in Chicago | 13 / 985 / p23.7; «tv mounting cost» p40.5 | Лише 2 H2, ~790 слів; за «tv mounting cost» сильніша стаття (p10.8) — це нормально | Злінкувати prices ↔ cost-статтю; не дублювати | P3 | ✅ 📊 |
| `/quote/` | Free TV Mounting Quote in Chicago \| Chicago Mounting (52) | Get a free quote … see your estimate in minutes. Same-day slots available. (155) | **немає** | — | Без H1, ~16 слів (калькулятор) | Опційно додати H1; не SEO-ціль | P3 | ✅ |
| `/audio-and-media-installation/` | Audio & Media Installation in Chicago \| Chicago Mounting (56) | Professional audio and media installation in Chicago. … (141) | Audio & Media Installation Services in… | 9 / 3 430 / p31.2; «home audio installation chicago» p22, «home theater installation chicago» p44 | Хаб аудіо; запити про home theater ідуть сюди, а не на `/home-theatre-mounting/` (700 пок., p27) | Посилити внутрішній лінк «home theater installation» → `/home-theatre-mounting/` | P3 | ✅ 📊 |
| `/commercial-tv-display-mounting/` | Commercial TV Mounting in Chicago \| Chicago Mounting (52) | Professional commercial TV mounting in Chicago for offices, restaurants, gyms, and retail. … (153) | Commercial Tv Mounting in Chicago | 5 / 2 388 / p21.1; «commercial tv installation» 876 пок. p19 | Правильний власник запиту; 2 контекстних посилання; «Tv» у H1 | Додати кейси/посилання на commercial; виправити регістр H1 | P3 | ✅ 📊 |
| `/hide-tv-wires/` | Hide TV Wires in Chicago \| Chicago Mounting (43) | We hide TV wires inside the wall or with clean cord covers … (137) | Hide TV Wires in Chicago | 10 / 440 / p12.2 | Працює; 2 контекстних посилання | Посилання з сервісів/кейсів | P3 | ✅ 📊 |
| `/tv-dismounting/` | TV Dismounting in Chicago \| Chicago Mounting (44) | Professional TV dismounting in Chicago. … (138) | TV Dismounting in Chicago | 7 / 697 / p22.5 | 2 контекстних посилання | Без змін | — | ✅ 📊 |
| `/flat-vs-tilt-tv-mounts-…/` | Flat vs. Tilt TV Mounts: Which to Choose \| Chicago Mounting (59) | Compare flat and tilt TV mounts for comfort, glare control, and style. … (155) | Flat vs. Tilt TV Mounts: Which Is Right… | 79 / 6 466 / p7.1 | Найсильніша стаття; 8 контекстних посилань | Без змін; додати CTA на сервіс | — | ✅ 📊 |
| `/samsung-frame-tv-pro-fireplace-…/` | Frame TV Pro Fireplace Install with MantelMount \| Chicago … (57) | See a Samsung Frame TV Pro fireplace installation in Chicago using a MantelMount MM815 and RB100 recessed box … (141) | Samsung Frame TV Pro Fireplace Install… | 20 / 717 / p7.7 | Працює (CTR 2.8%) | Без змін | — | ✅ 📊 |
| `/how-much-does-tv-installation-cost-…/` | TV Installation Cost Chicago: Real Prices \| Chicago Mounting (60) | See TV mounting prices in Chicago, including TV size, wall type, cable management, electrical work, and common add-ons. … (153) | How Much Does TV Installation Cost in… | 13 / 2 746 / p9.3; «tv mounting cost» p10.8 | CTR 0.5% на p9–11 | Лінк на /prices/; сніпет — лише після перевірки актуальності цін | P3 | ✅ 📊 |
| `/lg-g5-oled-fireplace-mount/` | LG G5 OLED Over a Fireplace: Flush Mount Install in Chicago (59) | Learn how to safely mount an LG TV over a fireplace in Chicago. … (137) | LG G5 OLED Fireplace Installation in C… | 13 / 911 / p6.9 | Працює | Лінк із fireplace-сервісу | P3 | ✅ 📊 |
| `/tv-installation-over-a-fireplace/` | TV Over Fireplace Installation in Chicago: Safety & Mounts (58) | Learn how to safely install a TV over a fireplace in Chicago. Proper height, heat risks … (134) | TV Installation Over a Fireplace in Ch… | 1 / 97 / p12.6 | Перетин із сервісом і «top mistakes» | Об’єднати з «top mistakes» (301 з меншої) — після рішення власника | P2 | ✅ 📊 |
| `/top-mistakes-to-avoid-…-fireplace/` | TV Above Fireplace: 7 Mounting Mistakes to Avoid \| Chicago … (58) | Too high, too hot, anchors in mortar, wrong mount: the fireplace TV mounting mistakes we fix most often … (143) | Top Mistakes to Avoid When Mounting a… | crawled – not indexed | 649 слів, дублює тему | Див. рядок вище | P2 | ✅ 📊 |
| `/mantelmount-vs-fixed-vs-full-motion-…/` | MantelMount vs Fixed vs Full-Motion TV Mounts \| Chicago … (55) | Fixed, full-motion or MantelMount? How each TV mount works … (148) | MantelMount vs Fixed vs Full-Motion TV… | 14 / 1 283 / p10.5 | Працює | Без змін | — | ✅ 📊 |
| `/reviews/` | TV Mounting Reviews in Chicago \| Chicago Mounting (49) | See why Chicago residents love our TV mounting services. Read real customer reviews … (155) | Customer Reviews | 8 / 274 / p13.6 | 218 img, 35 без alt, 58 без розмірів; Product-review-схема | Alt/розміри для віджета відгуків; схема — п.1 | P3 | ✅ 📊 |
| `/about-us/` | Meet Our Chicago TV Mounting Team \| Chicago Mounting (52) | Learn about Chicago Mounting, our standards, experience, and commitment … (132) | About Us | 5 / 366 / p10.5 | ~440 слів; Product-review-схема | Лише схема | P3 | ✅ 📊 |
| `/blog/` | Blog \| Chicago Mounting (23) | Expert tips on TV mounting, home theater setups, and smart home solutions … (105) | BLOG | 1 / 37 / p8.6 | Немає H2, H1→H3 | Опційно описовий title/H1 | P3 | ✅ 📊 |

Усі значення title/description/H1 зчитані з DOM; «…» — скорочення в цьому звіті, не на сайті.

### 12.6 Галереї міських сторінок: alt і назви файлів

✅ DOM 10.11, посилання лайтбоксу на `/wp-content/uploads/`:

| Сторінка | Фото в галереї | Alt містить місто | Назва файлу містить інше місце |
|---|---:|---:|---|
| Glenview | 8 | 8 | — |
| Evanston | 10 | 7 | — |
| Wilmette | 12 | 0 | — |
| Winnetka | 8 | 8 | **5 з 8**: portage, streeterville, bucktown, hyde-park, park-ridge |

**Перевірена невідповідність:** у Winnetka alt-тексти називають Winnetka, а 5 файлів названі за районами Чикаго/Park Ridge. За AGENTS.md місто роботи **не можна** виводити з імені файлу, тому це не доказ помилки. Але alt із містом без підтвердженого провенансу суперечить правилу «Chicago project must not be relabeled as a suburb». **Дія (P2):** власнику звірити 5 фото з реальними адресами робіт; якщо робота не з Winnetka — змінити alt на нейтральний (без міста) або замінити фото. Wilmette: alt без міста — нейтрально, змін не потрібно.

### 12.7 Висновок on-page

On-page реалізація **в цілому здорова**: унікальні title/description, коректні canonical/robots, один H1, мобільна панель CTA, схема бізнесу на головній. Слабкі позиції міських сторінок і загальних запитів **не пояснюються** проблемами title/H1/текстів — переписування не обґрунтоване. Обґрунтовані on-page дії: (1) прибрати/замінити Product-review-розмітку; (2) звірити провенанс 5 фото галереї Winnetka з alt «Winnetka»; (3) розвести Frame-сервіс і Frame-пост; (4) консолідувати камінний кластер; (5) додати контекстні посилання на сервісні сторінки з 2 лінками; (6) після дозволу — реальні кейси на міських сторінках.

## Джерела

- Google Search Console, властивість `sc-domain:chicagomounting.com`, Performance (16 міс., сторінки, запити, країни, пристрої, порівняння), Page indexing — 9.11.2026.
- GA4 property 498944746: Google organic search traffic (GSC-звіт), Events, Admin → Events (key events) — 9.11.2026.
- Ahrefs Site Explorer (project 10403453): Organic keywords (US, 10.11 vs 10.10), Organic competitors, Referring domains — 9.11.2026.
- BrightLocal: LSG 485676 runs list; 16.10 і 6.11 звіти «TV mounting» і «Fireplace TV mounting» — 9.11.2026.
- [BrightLocal October 2026 Release Notes](https://help.brightlocal.com/hc/en-us/articles/40475732070162-October-2026-Release-Notes).
- Google Business Profile Performance (owner view), Business Profile Manager — 9.11.2026.
- Google Trends: Illinois «tv mounting», Chicago DMA «tv mounting, tv installation», 5 років — 9.11.2026.
- PageSpeed Insights, /tv-installation-in-glenview/, mobile — 9.11.2026.
- Живі сторінки через WebFetch: 4 міські URL і /find-near-me/; robots.txt через браузер — 9.11.2026.
- Репозиторій: AGENTS.md, README.md, knowledge/* на `claude/chicago-mounting-zip-review-szeoup` @ `3e56590`; knowledge/SEO-REPORT.md на `seo` @ `457d079`.
