# Project Facts native refinement — 2026-11-08

## Delivered scope

Refined only the existing Facts subtree cmcs001 in Single Case15714. Existing canonical template, sidebar width24%, sticky logic, dynamic content, case bodies/galleries, URLs, noindex, related cases and final CTA preserved. No global Kit changes, new fields, templates, plugins, scripts or custom CSS.

Before-change metadata backup: before-facts-refinement-2026-11-08.json, committed89cbd822588d825a6953dedb356bdfd93421922b before structural edits.

## Before and after

Actual before screenshot on15830 showed the installation icon centered against a loose three-line label/value block, large heading/body text and oversized paragraph spacing before the quote button.

Native changes:
- cmcs001: existing Global Light green8fcd26f/radius10px retained; native padding24px on desktop/tablet/mobile, gap20px; width24% unchanged.
- cmcs002 heading: semantic H2 retained, existing Kanit H3 typography role c569f17 gives a more compact heading than the previous H2 typography role.
- cffa001: native vertical facts group,16px row gap.
- cffl001 and cfft001: native horizontal rows,nowrap/flex-start,12px icon-to-text gap. Icon widgets cffl001i/cfft001i:16px green Accent,2px top alignment. Existing map-pin and TV symbols retained.
- cffl001t/cfft001t: native text columns,4px label-to-value gap. Native headings cffl001l/cfft001l supply uppercase LOCATION/INSTALLATION TYPE labels.
- Existing cmcb001 and83d0898 post-info widgets moved intact into their respective rows, retaining cm_location and cm_installation_type bindings, unlinked values, same terms and omission behavior. Removed inline prefixes/duplicate icons because the native row supplies them.
- Labels and values use existing Inter Text S role5d02c94, line-height1.5, without new font sizes. The label casing and separate line establish hierarchy.
- First row has native1px Global Light divider and16px bottom padding. Existing cm-case-location omission selector now hides the entire row when no location exists.
- cffc001: native CTA group with Global Light top divider,20px top padding and12px gap. cmcs003 supporting text now a native Heading with div tag/Text S; same wording, no paragraph-margin workaround. cmcs004 retains quote target/button classes/global button typography; native justify alignment fills the card's content width.
- CTA group and children retain native hidden-mobile. Existing global fixed mobile CTA untouched.
- Future optional Equipment can use the same native row pattern when a supported source exists. No field or speculative Equipment row added.

Legacy V3 editing used registered WordPress REST meta after current direct MCP verification (initialize200,22 tools,Single read200/isError=false), then native MCP document save/publish. Existing cache clear endpoint returned200 after each final save; no cache configuration changed.

## Verification performed

Before/after actual public15830 screenshots inspected. Responsive overrides used only for requested tests, then reset.

| View | Actual result |
|---|---|
| Normal desktop (~1718 CSS px) | Card278.390625px wide;24px padding;10px radius;rgb(239,242,239);sticky. Heading Kanit22px/25.3px line-height; labels/values Inter12.885px/19.3275px; both icons16x16/green. No card overflow. |
| Desktop1366x900 | Full card visually aligned with top of right content, compact facts, consistent icon columns and complete full-width quote button. Long Fireplace & Specialty Mounting value readable without awkward wrapping; no horizontal page overflow observed. |
| Tablet768x1024 |708px full-width card;24px padding;10px radius;Light green;static;322.40625px height. CTA grouped with divider, no excess empty block; page overflow=false. |
| Mobile390x844 |330px available card width in actual370px client width;199.40625px card height;24px padding;Light green;static. CTA group display:none. Existing fixed Get a Free Quote/Call Us visible. Full card, rows and right content inspected;scrollWidth=clientWidth370. |

Desktop actual scroll: card becomes sticky at120px with admin bar. Existing15731 (no assigned actual Location) inspected: complete Location row display:none, no empty label/icon/divider. At the content bottom, Facts top=-18.609375 and bottom235.953125; Related section top235.953125. Card correctly exits with the content section before the Related heading/cards, with no overlay.

Final saved tree equals intended tree. Replacing only Facts subtree with its before version makes the complete tree equal beforeTree; all other Elementor elements unchanged. Page settings/custom CSS unchanged. No case Post Content, taxonomy, SEO or media write occurred.

All16 anonymous original public URLs:HTTP200/noindex/new rows/dynamic term markup/quote target present. Current authenticated browser responsive views were used for visual QA; not an exhaustive16-page screenshot, keyboard or lightbox recertification. Those are outside this focused card task. Existing broader photo/source and integration-launch limits remain as previously documented; no integrations published.

Screenshots were inspected directly in browser output; no screenshot files containing account toolbar information were added to this public repository.

## Recovery

Restore only cmcs001 subtree from the before backup to undo this refinement. Preserve all unrelated current template changes. No per-case maintenance needed: the two existing taxonomy bindings continue to populate the same reusable card.
