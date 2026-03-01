# Anderson Collaborative — Design Standards

Brand standards for all AC client work. These rules apply when building for AC or its clients.

## AC Brand Typography

| Usage | Font | Size | Weight | Color |
|-------|------|------|--------|-------|
| Titles | Roboto | 16pt | Bold | #00161F (Dark Navy) |
| Subtitles | Rubik | 11pt | Normal | #4A5568 (Slate Gray) |
| Section headers | Roboto | 12pt | Bold | #2563EB (Blue) or #00161F |
| Table headers | Roboto | 11pt | Bold | #FFFFFF on #00161F bg |
| Body text | Rubik | 10pt | Normal | #4A5568 |
| Bold labels | Rubik | 10pt | Bold | #00161F |
| Totals row | Roboto | 10pt | Bold | #00161F on #3BCEBF bg |
| Notes/footnotes | Rubik | 9pt | Normal | #666666 |

## AC Brand Colors

| Usage | Hex | Name |
|-------|-----|------|
| Primary dark / header bg | #00161F | Dark Navy |
| Body text | #4A5568 | Slate Gray |
| Header text | #FFFFFF | White |
| Total/summary row bg | #3BCEBF | Teal Accent |
| Alternating row stripe | #F3F5F6 | Alt Row |
| Positive indicator | #D1FAE5 | Green Badge |
| Negative indicator | #FEE2E2 | Red Badge |
| Section headers | #2563EB | Blue Accent |

## Layout Rules

- Title row: merged across all columns, height 35px
- Subtitle format: "Prepared by Anderson Collaborative | [Date] | [Account ID]"
- Blank row between title block and first table
- Dark navy header rows with white text, center-aligned
- Alternating white/#F3F5F6 row striping (never skip)
- Teal accent totals rows with Roboto bold
- Number formats: `$#,##0.00` (currency), `#,##0` (counts), `0.00%` (percentages), `0.00x` (ROAS)

## Prohibitions

- Never use Calibri, Arial, or system default fonts
- Never skip alternating row striping
- Never use raw unstyled cells
- Never use colors outside the brand palette
- Never create reports without the AC subtitle row

## Client Project Design Standards

When building client websites (not AC internal reports), use the client's brand — not AC's. The AC standards above apply ONLY to:
- Internal reports and dashboards
- XLSX exports and data presentations
- AC-branded proposals and documents

For client sites, create a unique design system using the `design-system-generator` skill.

## Existing Client Palettes (Reference)

| Client | Primary | Accent | Background | Stack |
|--------|---------|--------|------------|-------|
| Barking Goods | #2D5A27 (Forest Green) | #E8871E (Orange) | #FFF8F0 | Astro + Tailwind |
| Meowing Goods | #1E5F74 (Deep Teal) | #E8871E (Orange) | #FFF9F2 | Astro + Tailwind |
| Nativz | #0A1628 (Navy) | #00ADEF (Electric Blue) | — | Next.js + Tailwind |
| Retro Modern Records | Dark/HSL | Cyan accents | Black | Vite + React + shadcn/ui |
