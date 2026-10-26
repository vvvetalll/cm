# Chicago Mounting
База знань, історія оновлення сайту, SEO, поточна робота та код проєкту.

## Початок роботи у Work
Прочитай [AGENTS.md](AGENTS.md), [стан роботи](knowledge/WORK.md) і відповідний тематичний файл. Після кожної задачі онови стан, журнал і релевантні знання та зроби commit/push.
Ці інструкції працюють для агента, який відкрив репозиторій; автоматичної синхронізації всіх чатів немає.

| Матеріал | Зміст |
|---|---|
| [PROJECT](knowledge/PROJECT.md) | Бізнес, URL, технології, обмеження достовірності |
| [WEBSITE-HISTORY](knowledge/WEBSITE-HISTORY.md) | Відновлена історія повного оновлення сайту |
| [SEO-REPORT](knowledge/SEO-REPORT.md) | Продовження великого SEO-аналізу 8–12 жовтня |
| [SEO-CONTENT](knowledge/SEO-CONTENT.md) | Гео, Premium TV, Shorts і контент |
| [VIDEOS](knowledge/VIDEOS.md) | Відео, реальні локації, embeds, перервана правка |
| [WORK](knowledge/WORK.md) | Виконане, поточне, blockers і наступні дії |
| [IDEAS](knowledge/IDEAS.md) | Ідеї окремо від погоджених задач |
| [CHANGELOG](knowledge/CHANGELOG.md) | Датований журнал робіт |

Ініціальна консолідація 26.10.2026 охоплює знайдений контекст, а не всі оригінали розмов/файлів. Старі звіти не доводять поточний стан live-сайту.

## Chicago Mounting ZIP Checker — existing project
WordPress plugin: ZIP service-area checker with CSV-managed coverage list, Elementor-compatible shortcodes and a popup.

| Path | What |
|---|---|
| cm-zip-checker/ | Plugin source, documented current version v0.2.3. First commit holds v0.1.0 as received. |
| dist/cm-zip-checker-v0.2.3.zip | Installable package; older packages kept for rollback. |
| docs/RELEASE-v0.2.2.md | Styling release, recorded tests and limits. |
| docs/RELEASE-v0.2.1.md | Theme classes/site stylesheet release. |
| docs/theme-patch/ | Optional theme CSS patch for button.btn — previously not applied, not needed since v0.2.2. |
| docs/REVIEW-REPORT.md | Review findings, fixes, coverage, Elementor/quote-form notes and deployment plan. |
| docs/test-results/ | Existing recorded runs/screenshots. |
| tests/ | Disposable local WordPress + Playwright suites; see tests/README.md. |

Existing documented status: **ready for staging, not yet approved for production**. No new plugin tests or deployment approval are implied by these documentation changes.
