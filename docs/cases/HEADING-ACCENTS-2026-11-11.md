# Existing integration heading accents — 2026-11-11

Changed only the Title markup of the eleven existing integration Heading widgets. Existing wording, H2 tags, widget/container IDs, native typography, layout and queries remain. Reused only `<span class="akcent">…</span>` and the site's current green accent rule; no CSS or class definition added. The sixteen individual case posts, their SEO, Card15715, Single15714, catalogue and filters were not edited.

## Exact selection after inspecting surrounding headings

| Page | Existing heading (words unchanged) | Highlighted phrase | Reason |
|---|---|---|---|
| [Glenview — 9833](https://chicagomounting.com/tv-installation-in-glenview/) | Our Recent TV Installation Projects | **Installation Projects** | Matches Installation Projects in the adjacent gallery heading. |
| [Evanston — 9987](https://chicagomounting.com/tv-installation-in-evanston/) | Our Recent TV Installation Projects | **TV Installation Projects** | Uses the project/service phrase, as the neighboring TV Mounting Projects heading does. |
| [Wilmette — 9701](https://chicagomounting.com/tv-installation-in-wilmette/) | Our Recent TV Installation Projects | **TV Installation Projects** | Uses the project/service phrase, matching the neighboring TV Mounting Projects heading. |
| [Winnetka — 9888](https://chicagomounting.com/tv-installation-in-winnetka/) | Our Recent TV Installation Projects | **TV Installation Projects** | Uses the project/service phrase, matching the neighboring TV Mounting Projects heading. |
| [Premium / Large TV — 15342](https://chicagomounting.com/premium-large-tv-installation/) | Our Recent Large TV Installation Projects | **Recent Large TV** | Mirrors Recent Large & Premium TV in the existing gallery heading, without adding any words. |
| [Outdoor TV — 11178](https://chicagomounting.com/outdoor-tv-installation/) | Our Recent Outdoor TV Installation Projects | **Outdoor TV Installation Projects** | Mirrors the outdoor project phrase in the adjacent gallery heading. |
| [Recessed Media Box — 8156](https://chicagomounting.com/recessed-media-box/) | Our Recent Recessed Media Box Projects | **Media Box Projects** | Follows the existing Media Box Options phrase accent. |
| [Frame TV — 5671](https://chicagomounting.com/frame-tv-mounting-chicago/) | Our Recent Frame TV Installation Projects | **Frame TV Installation Projects** | Mirrors the Frame TV project phrase in the existing gallery heading. |
| [Soundbar — 3398](https://chicagomounting.com/soundbar-installation/) | Our Recent TV & Soundbar Installation Projects | **Soundbar Installation** | Matches Soundbar Installation in the existing service heading. |
| [Fireplace / Brick — 3281](https://chicagomounting.com/fireplace-or-brick-wall-mounting/) | Our Recent Fireplace TV Installation Projects | **Fireplace TV Installation** | Uses the fireplace installation phrase highlighted in the preceding video heading. |
| [General TV Installation — 1682](https://chicagomounting.com/tv-installation-and-mounting/) | Our Recent TV Installation Projects | **TV Installation** | Highlights the existing core service phrase in this heading. |

## Verification

Anonymous original public URLs: all eleven HTTP200. Each target H2 has exactly the requested single span; unwrapping that span returns the exact original H2 markup and text. Compared each page's main-content signature (ordered element IDs, all heading text/tags/attributes, paragraphs, links, real image sources/alts and data-settings): unchanged. Existing SVG lazy-load placeholders are excluded from image-source comparison because cache regeneration can add one; actual source images remain identical. Service/city page robots and canonical values also unchanged.

All eleven headings were inspected on actual public pages at1366px desktop and390px mobile. Accent rgb(78,157,5) uses existing .akcent. Span and heading computed font family/size/weight/line-height match, with no horizontal overflow; H2 remains. Native screenshots were visually inspected in session. No typography/layout controls were edited. Native Save/Publish invalidated existing page caches; public results were verified after each save.

Evidence: heading-accents-before-2026-11-11.json records original and neighboring markup, widget IDs and intended spans; heading-accents-public-verification-2026-11-11.json records exact public readbacks; heading-accents-browser-verification-2026-11-11.json records22 viewport observations.

Recovery scope, if needed: remove only the added span from the affected existing Heading Title using its recorded original text. Do not change wording, CSS, queries or SEO.

WORK.md and CHANGELOG.md appended after preserving the concurrent read-only GTmetrix documentation updates. Committed/pushed on the existing default branch; remote SHA equality verified after push.
