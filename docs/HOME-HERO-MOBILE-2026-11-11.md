# Homepage Hero supporting text — mobile alignment

Date: 2026-11-11 (America/Chicago). Live URL: https://chicagomounting.com/

## Implementation

Inspected homepage16 through the existing Chicago Mounting Elementor MCP connection. Target: existing Heading `fbdb3e7`, below CTA container `3b1b4ba`, in Hero `dbd317c`. MCP returned empty settings/styles for this legacy Heading and its schema was not exposed; used native Elementor controls instead of guessing unsupported MCP fields.

Existing CSS supplied typography token5d02c94, text color and 20px outer Hero gutters. Target had no mobile alignment/padding; widget Custom CSS was empty.

Changed only this Heading: native mobile Alignment=Center; mobile Padding=0px 10px 0px 10px, unlinked. Added one declaration in its existing Custom CSS field because native controls do not provide balanced wrapping:

```css
@media (max-width: 767px) {
  selector .elementor-heading-title {
    text-wrap: balance;
  }
}
```

Native Publish completed (button returned to disabled). Public generated post-16.css?ver=1794432618 includes padding/centering within its existing mobile breakpoint and one scoped balance rule. No theme/global typography/other Hero/cache-setting/plugin changes or duplicate widgets/rules.

## Live verification

Anonymous homepage HTTP200 and published CSS readback. All140 ordered homepage element IDs/widget types/data-settings compare unchanged against pre-edit anonymous HTML. Exact supporting text preserved.

Public responsive browser emulation, screenshots inspected at320/375/390px; not physical-device testing. All show two centered lines, equal10px widget padding, balance wrapping, unchanged Inter12px/18px and rgb(52,52,52). Text starts at x30px: existing20px Hero gutter plus10px widget padding.

With mobile-style non-reserving scrollbars:

| Viewport | Text box width | Text height | Page scrollWidth | Result |
|---|---:|---:|---:|---|
| 320 | 260px | 36px | 323px | Target contained; separate existing review badge overflow remains |
| 375 | 315.33px | 36px | 375px | Centered/balanced; no page horizontal overflow |
| 390 | 330px | 36px | 390px | Centered/balanced; no page horizontal overflow |

Line1: Same-Day Service • Chicago & Suburbs; line2: • Clean • Professional • Reliable. No forced breaks or copy changes.

Additional desktop-scrollbar emulation reserves20px: at viewport320/client300, scrollWidth313. Existing Trustindex Hero badge .ti-widget-container/.ti-header-grid and star extents exceed available width; target text remains contained. No unrelated badge/header/global overflow workaround applied. Full-page absence of overflow at320 is **not** claimed.

Desktop1223 pre/post: identical target rectangle x20/y553.8334/width415.5729/height18, alignment start, Inter12px/18px, rgb(52,52,52). Temporary viewport/scrollbar emulation restored. Screenshots inspected in-session; no exported screenshot artifact included.

## Recovery and remaining work

Undo only by clearing this widget's mobile alignment/padding overrides and removing the above Custom CSS rule, then publishing homepage16. Current text adjustment deployed; separate review-badge overflow at320 remains for separately authorized work. The commit containing this report and WORK/CHANGELOG is the task record.
