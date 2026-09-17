# DESIGN.md — The Emergency Food Playbook

Design system for the ebook, generated with the **design-inspiration-mcp** toolchain and adapted
from web conventions to U.S. Letter print/PDF layout.

## Toolchain used (from this repository's MCP server)

| Step | MCP tool | Output |
|---|---|---|
| System scaffold | `generate_design_md` | Baseline DESIGN.md (adapted below for print) |
| Tokens | `generate_design_tokens` (brand `#122B4E`, light mode, major-third scale, minimal rounding) | `design/tokens.json` — 65 tokens; palette extended with the brief's cream/tomato/amber |
| Type | `get_typography_pairings` (style: editorial) | "Academic Gravitas" + "Editorial Power" pairings → final choice below |
| Layout | `get_layout_patterns` | "Magazine Two-Column" adapted for chapter prose; bento grids adapted for comparison pages |
| Taste baseline | `get_premium_taste` | No emoji, no pure black, desaturated accents, grid over flex, deterministic type |
| Accessibility | `get_accessibility_guide` (contrast, AA) | All text pairs verified ≥ 4.5:1 (see table below) |

## 1. Visual theme

- **Mood:** calm, trustworthy, civic. Household resilience — never apocalypse aesthetics.
- Variance: 6 · Density: 5 (tables and checklists are first-class citizens) · Motion: 0 (print).
- No clip art, no fear imagery, no military motifs, no emoji. All iconography is a single-weight
  inline-SVG stroke set (see `Icon` in `book.css` doc comments).

## 2. Palette (all pairs verified for WCAG 2.1 AA)

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--navy` | `#14304F` | Headings, chapter openers, tables | 13.4:1 on white |
| `--ink` | `#20293A` | Body text (never pure black) | 14.6:1 on white |
| `--cream` | `#FAF6EE` | Callouts, worksheets, part dividers | ink 13.5:1 on cream |
| `--tomato` | `#B5402F` | Safety callouts, warnings | 5.6:1 on white, 5.2:1 on cream |
| `--amber` | `#C98A2B` | Decorative rules, large numerals only (2.9:1 — decorative use) |
| `--amber-ink` | `#8F5D15` | Small amber-family text (5.6:1 on white) |
| `--gray` | `#5A6472` | Secondary text | 6.0:1 on white, 5.6:1 on cream |
| `--line` | `#E3DCCB` | Table/border rules | decorative |

## 3. Typography

- **Display / headings / tables / labels:** Libre Franklin (700–900) — bold modern sans.
- **Body:** Source Serif 4 (400/600) — highly readable humanist serif, 10.5pt print / 16px screen.
- **Scale:** major third (1.25), from `generate_design_tokens`: 13 / 16 / 20 / 25 / 31 / 39 / 49.
- **Print:** body 10.5pt, line-height 1.45; headings with `break-after: avoid`; `widows: 3; orphans: 3`.

## 4. Page geometry (U.S. Letter portrait)

- `@page { size: 8.5in 11in; margin: 0.75in 0.8in; }`
- One `.sheet` = exactly one printed page; `page-break-after: always` per sheet.
- Running header (book title / chapter title) and page numbers are part of the sheet footer.
- Front matter numbered in roman numerals; body in arabic starting at Chapter 1.
- Content grid: 12 columns; prose ≤ 68ch per column; tables max 100% of text column.

## 5. Component specs

- **Callouts:** `.callout--safety` (tomato bar + cream fill), `.callout--tip` (navy bar),
  `.callout--note` (gray bar). 1px left rule + tinted background; label above text.
- **Recipe cards:** header row (name + meta chips), 2-column ingredients/prep, fixed spec strip
  (method · water · fuel · dishes), footer note line. Card avoids page splits (`break-inside: avoid`).
- **Tables:** navy header row with cream text, zebra cream rows, `--line` rules, compact 9.5pt sans.
- **Worksheets:** hairline input rules, generous 0.4in row height, print-friendly checkboxes.
- **Icons:** 1.5px stroke, currentColor, 16px grid — water drop, flame, pot, clock, dish, protein,
  child, cart, box, alert triangle. No filled/decorative icon styles.

## 6. Accessibility & quality gates (from `get_accessibility_guide`)

- Body text ≥ 4.5:1, large text ≥ 3:1 — verified for every pair above.
- No color-only meaning: warnings pair color with "SAFETY" label + icon.
- Focus styles preserved for the on-screen reader; semantic headings h1→h4 order.
- Never remove `:focus-visible`; all interactive nav has visible labels.

## 7. Implementation checklist

- [x] Tokens as CSS custom properties (`book/book.css`)
- [x] Typographic scale applied deterministically
- [x] Sheet-per-page print model with page numbering
- [x] AA contrast on all text pairs
- [x] No emoji anywhere in content
- [x] Recipe card spec strip identical across all recipes
- [x] Widow/orphan control + `break-inside: avoid` on cards/tables
