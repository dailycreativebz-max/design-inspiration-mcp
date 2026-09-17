# The Emergency Food Playbook — build & deliverable notes

This directory contains the complete U.S. ebook **"The Emergency Food Playbook"** by **Food Opsec**,
designed with this repository's `design-inspiration-mcp` toolchain and rendered as print-ready
U.S. Letter (8.5 × 11 in) HTML pages.

## Contents

| Path | What it is |
|---|---|
| `book/` | The built ebook — 75 Letter-size pages + full-book file + reader home |
| `book/index.html` | Reader home: positioning, table of contents, page jump |
| `book/book.html` | Entire book in one file — open it and **Print → Save as PDF** (Letter, margins: none) |
| `book/*.html` | Individual pages (cover, front matter, 13 chapters, worksheets, indexes) |
| `book/book.css` | Design system implementation (see `DESIGN.md`) |
| `DESIGN.md` | Design system spec + which MCP tools produced each decision |
| `RESEARCH.md` | Source verification, accuracy corrections, completeness additions |
| `SALES_COPY.md` | Commercial positioning and sales copy |
| `data/*.mjs` | Content sources of truth: prose pages, 70 recipes, playbooks |
| `build.mjs` | Static site generator (run `node ebook/build.mjs` from the repo root to rebuild) |
| `tools/mcp-client.mjs` | Minimal stdio client used to call this repo's MCP server during design |
| `design/*.json` | Raw MCP outputs (tokens, typography, layouts, a11y) that informed the design |

## Reading & printing

- **On screen:** open `book/index.html` (or any page) in a browser; use the top select or prev/next links.
- **PDF:** open `book/book.html` → Print → destination "Save as PDF" → paper: U.S. Letter → margins: none.
  Page numbering, headers and sheet breaks are baked into the layout.

## Rebuilding after edits

```bash
node ebook/build.mjs
```

The builder re-renders every page, reassigns folios (roman front matter / arabic body), regenerates the
table of contents and the recipe index from `data/recipes.mjs`, and rewrites all HTML.

## Fact-check policy

All safety-critical claims (power-outage timelines, water treatment, carbon monoxide, shelf life, infant
feeding, date labels) were verified against USDA/FSIS, FEMA/Ready.gov, EPA, CDC, FDA, CPSC and university
extension sources in September 2026 — see `RESEARCH.md` for the full audit trail. Nutrition values are never
fabricated; recipes direct readers to their own product labels.
