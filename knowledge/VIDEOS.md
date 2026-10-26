# Video inventory and placement
Updated: 2026-10-26. Sources: YouTube Studio fields and live site DOM inspected in this session.
A Studio location field is recorded evidence; it is not independent verification of the filming address.

## Confirmed video references
| ID | Subject / title | Location evidence | Site placement |
|---|---|---|---|
| LA-eZGLSrxE | Samsung Frame Pro + MantelMount MM815 Installation in Chicago | Existing title + Studio Chicago | Not audited |
| 7ZOvPcatxrU | Samsung Frame TV Installation in Plainfield — Legrand Box | Existing title + Studio Plainfield | Not audited |
| rVnWK4rLhcI | Samsung S95H OLED TV Installation in Chicago | Studio Chicago | Not audited |
| xvrjoKvFsw8 | Samsung Frame TV Installation in Wilmette, IL — Unboxing | Studio Wilmette | Pending check/add on Wilmette |
| kO1vrsAiCkw | TV Installation in Winnetka, IL — Frame TV Setup on Tile | Existing title | Existing Winnetka video widget |
| CorXHd53U5M | 100-inch LG QNED evo Mini LED (QNED84B) Installation in Winnetka | Existing title/description | Existing Premium page; second Winnetka placement pending |

YouTube URL form: https://www.youtube.com/watch?v=VIDEO_ID

## Changes actually saved and verified in YouTube Studio
- LA-eZGLSrxE, 7ZOvPcatxrU, rVnWK4rLhcI: title, description, relevant URL/phone, hashtags and separate tags.
- xvrjoKvFsw8: Wilmette title, description, city-page URL and additional city tags; saved values checked after reload.
- First three videos had no made-for-kids selection; changed to “not made for kids” during the edit.
- No new video was uploaded. Existing videos were edited.

## Candidate screening
Additional generic-title Shorts were checked through Studio location fields. Most were Chicago, Lincoln Park, River North, Lake View, Naperville, Highland Park or One Bennett Park.
No additional Glenview/Evanston installation was established among the screened candidates. One One Connect Box video had no location; do not assign a city without evidence.
Videos explicitly titled Chicago/Park Ridge/Plainfield must retain their actual geography.

## Interrupted Winnetka Elementor edit — important recovery
- Page ID: 9888.
- Existing widget 10546bbf is inside container 777175ea, inside row a939fd4.
- Existing link: https://youtube.com/shorts/kO1vrsAiCkw
- Container 777175ea was duplicated through the UI.
- New container 434af22 contains Video widget d108f5d.
- The attempt to select d108f5d failed because the navigator child was collapsed.
- No new URL was entered and Publish was NOT clicked.
- Browser connection then failed. Unsaved editor state/autosave may or may not persist.
- On resume, inspect before creating anything. If the duplicate remains, set its URL to CorXHd53U5M, verify row/column/mobile sizing, and then publish. Do not publish two copies of kO1vrsAiCkw.
- Existing container width was shown as 100%; inspect responsive layout before accepting two sibling containers.

## Further placement
- Wilmette: inspect existing embed; add xvrjoKvFsw8 only if absent, retaining the existing city video.
- Winnetka: add CorXHd53U5M beside/within the existing video section after layout QA.
- Premium: already has CorXHd53U5M. A second distinct premium installation may be appropriate, e.g. Samsung Frame Pro/MantelMount, if confirmed by page review.
- Glenview/Evanston: do not fill a second slot using a project from another city presented as local.
- Website playback, hover/focus and mobile QA of new placements are still pending.
