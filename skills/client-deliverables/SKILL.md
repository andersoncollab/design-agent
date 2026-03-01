---
name: client-deliverables
description: Automated workflow for generating professional design deliverables (design systems, brand guidelines, audit reports, competitive analyses). Orchestrates design-system-generator, visual-audit, typography-pairing, brand-identity-system, color-system, design-tokens, component-patterns. Trigger: "create deliverable", "design system PDF", "audit report", "brand guidelines", "client presentation".
version: 1.0.0
license: MIT
---

## Purpose

You are the output layer for design systems and client work. This workflow orchestrates all other design-agent skills to produce professional, branded deliverables that tell a story: Problem → Analysis → Recommendation → Next Steps. Instead of dumping raw design data, you package design work into three key formats: **structured markdown** (for hosting as web pages), **PDF exports** (for email/archival), and **XLSX reports** (for metrics-driven clients). Each deliverable follows Anderson Collaborative brand standards (Roboto titles, Rubik body, Dark Navy headers, Teal accents). Clients understand them. Stakeholders act on them.

**Who uses it**: Design systems leads, agency designers, in-house design teams creating client proposals, audit reports, and brand refreshes.

**When to use it**: Completing a design audit, launching a design system, presenting competitive analysis, handing off brand guidelines, creating style guide decks.

## When to Use

- **Design system completion**: You've designed colors, typography, components. Need a comprehensive document.
- **Brand refresh delivery**: Client refresh is done. Need a 50-page brand guidelines PDF.
- **Audit report to client**: Completed visual/UX audit. Need a branded report with executive summary, findings, and recommendations.
- **Competitive analysis presentation**: Researched competitors. Need formatted comparison matrix and insight deck.
- **Component library spec**: Built 20 components. Need documentation per component with anatomy, states, accessibility.
- **Ongoing client reporting**: Monthly/quarterly design health reports with metrics and trends.

**Not for**: Single one-off documents. Internal working docs. Unbranded analysis.

## Key Concepts

### Deliverable Types

Five core deliverable types cover 95% of use cases:

| Type | Use Case | Pages | Output |
|------|----------|-------|--------|
| **Design System Doc** | Complete design system w/ colors, typography, components, tokens | 15-30 | Markdown + PDF |
| **Brand Guidelines** | Logo, colors, typography, imagery, social templates, do's/don'ts | 30-50 | PDF (printed quality) |
| **Visual Audit Report** | Design quality assessment across 6 dimensions (typography, color, layout, imagery, motion, hierarchy) | 8-12 | Markdown + PDF |
| **Competitive Analysis** | Design comparison of 3-5 competitors + white space opportunities | 10-15 | Markdown + PDF |
| **Component Library Spec** | Per-component documentation with anatomy, variants, states, a11y, code | 20-40 | Markdown (hosted on Storybook or similar) |

### Deliverable = Story, Not Data Dump

Every deliverable has a narrative arc:

```
1. Executive Summary (page 1)
   ├─ One sentence: what is this?
   ├─ Top 3 findings (bulleted)
   └─ One recommended action

2. Analysis / Findings (pages 2-N)
   ├─ Dimension-by-dimension breakdown
   ├─ Visual examples (not just text)
   └─ Specific, actionable recommendations

3. Priority Actions (page N+1)
   ├─ Critical (fix immediately)
   ├─ High (fix within sprint)
   ├─ Medium (plan for next quarter)
   └─ Low (nice to have)

4. Next Steps (final page)
   ├─ Owner assignments
   ├─ Timeline
   └─ Success metrics
```

Non-technical stakeholders read page 1. Designers read pages 2-N. Decision-makers want page N+1. Everyone needs page N+2.

### AC Brand Standards

All deliverables use consistent branding:

- **Logo**: AC logotype (black, minimum 0.5")
- **Fonts**: Roboto (titles, headers, totals), Rubik (body, subtitles)
- **Colors**: Dark Navy #00161F (headers), Slate #4A5568 (body), Teal #3BCEBF (accents/highlights), Alt stripe #F3F5F6 (table rows)
- **Paper**: Prefer off-white (#F9F8F5) over pure white for printed PDFs
- **Margins**: 1" on all sides for print
- **Spacing**: 12px base unit (headers: 24px, body: 12px, captions: 8px)

See `/research/ac-design-standards.md` for full spec.

### Quality Checklist

Before delivering:

- [ ] Executive summary on page 1 (non-technical)
- [ ] Branded header/footer with AC logo and client name
- [ ] All scores/metrics explained (rubric documented)
- [ ] Action items prioritized (critical/high/medium/low)
- [ ] Visual examples included (not just text)
- [ ] Next steps section with ownership
- [ ] Date and version number
- [ ] Table of contents (if >5 pages)
- [ ] Page numbers
- [ ] Consistent typography (Roboto/Rubik)
- [ ] Contrast meets WCAG AA minimum

---

## Instructions

### Setup: Orchestration Pattern

Each deliverable uses a pipeline:

```
Define Scope
    ↓
Collect Data (via skill-specific tools)
    ↓
Synthesize Findings (create narrative)
    ↓
Create Markdown Template
    ↓
Apply AC Brand Standards
    ↓
Export to PDF/XLSX
    ↓
QA Checklist
```

Use this pattern for every deliverable type.

---

### Deliverable 1: Design System Document

**Orchestrates**: `design-system-generator`, `typography-pairing`, `color-system`, `component-patterns`, `design-tokens`

**Sections** (in order):
1. Executive Summary (1 page): System overview + key metrics
2. Brand Foundation (1 page): Design principles, brand values
3. Color System (2 pages): Primary, secondary, accent, semantic, WCAG validation
4. Typography (1 page): Font families, type scale, line heights
5. Spacing & Layout (1 page): Spacing scale, grid system, breakpoints
6. Components (2 pages): Button, form, card, navigation, feedback states
7. Design Tokens (1 page): DTCG format, CSS variables, Tailwind config
8. Appendix (1 page): Methodology, maintenance guidelines

**Template**: See `/references/design-system-template.md`

---

### Deliverable 2: Visual Audit Report

**Orchestrates**: `visual-audit`, `design-critique`, `color-system`, `typography-pairing`

**Sections** (in order):
1. Executive Summary (1 page): DQS score, top 3 strengths, top 3 issues, next steps
2. Scoring Methodology (1 page): 6-dimension rubric, grading scale (A-F)
3. Dimension Scores (1 page): Scorecard table, individual dimension findings
4. Priority Actions (2 pages): Critical (1 week), High (2 weeks), Medium (quarter), Low (backlog)
5. Success Metrics (1 page): Re-audit targets after fixes
6. Appendix (1 page): Detailed scoring rubric for each dimension

**Key formula**:
```
DQS = Typography (20%) + Color (20%) + Layout (20%) + Imagery (15%) + Motion (15%) + Hierarchy (10%)
```

**Template**: See `/references/visual-audit-template.md`

---

### Deliverable 3: Competitive Analysis Report

**Orchestrates**: `competitive-design-intel`, `color-system`, `typography-pairing`, `brand-research`

**Sections** (in order):
1. Executive Summary (1 page): Key findings, market clusters, recommendation
2. Competitors Analyzed (1 page): Logo, colors, fonts, DQS score for each
3. Dimension Comparison (1 page): 6-dimension matrix (Typography, Color, Layout, Imagery, Motion, Hierarchy)
4. Differentiation Opportunities (2 pages): Color white space, typography gaps, layout strategy
5. Recommended Direction (1 page): Specific colors, fonts, imagery style, layout grid
6. Next Steps (1 page): Design brief, timeline, success metrics

**Output**: Positioned design direction between market clusters (not a clone of competitors)

**Template**: See `/references/competitive-analysis-template.md`

---

### Deliverable 4: Component Library Spec

**Orchestrates**: `component-patterns`, `accessibility-system`, `design-tokens`

**Per-component documentation** (20-40 pages total):

For each component (Button, Input, Card, etc.):
- Anatomy: SVG with labeled parts
- Variants: All visual states and configurations
- States: Default, hover, active, disabled, focus
- Accessibility: ARIA, keyboard, screen reader, contrast
- Code: React/HTML/CSS implementation
- Usage: Do's and don'ts, when to use, when NOT to use
- Figma link, GitHub issue link

**Template**: See `/references/component-spec-template.md`

**Hosted on**: Storybook, Zeroheight, or similar component documentation system

---

## Common Pitfalls

### ❌ Pitfall 1: Data Dump Instead of Story

**Problem**: You export raw audit data (12 color variants found, typography scale uneven, 47 spacing inconsistencies). Stakeholders don't know what to do.

**Fix**: Frame as story:
- Page 1: Here's what we found (summary)
- Pages 2-5: Here's the detail (findings by dimension)
- Page 6: Here's what to do about it (priority actions)
- Page 7: Here's the timeline (next steps)

Non-technical readers skip to page 1. Stakeholders want page 6. Everyone sees the overall narrative.

### ❌ Pitfall 2: No Executive Summary

**Problem**: Detailed 40-page design system. C-suite executive sees length and doesn't read it.

**Fix**: Always lead with 1-page executive summary:
- One sentence describing the system
- Top 3 benefits (consistency, speed, accessibility)
- Key metrics (# components, # tokens, WCAG compliance)

Decision-makers make decisions on page 1. Details come later.

### ❌ Pitfall 3: Inconsistent Branding

**Problem**: Design system is pristine, but report uses Comic Sans headers and clipart. Credibility destroyed.

**Fix**: Apply AC brand standards to EVERY deliverable:
- Use Roboto (titles), Rubik (body)
- Dark Navy headers, Teal accents
- AC logo on every page
- Consistent margins and spacing

Your deliverables reflect your design quality.

### ❌ Pitfall 4: Missing Actionable Recommendations

**Problem**: Audit says "typography is inconsistent." Client doesn't know what to fix.

**Fix**: Be specific:
- What's wrong: "5 different font sizes for headings"
- What's right: "H1 44px, H2 32px, H3 24px"
- How to fix: "Update 12 heading elements to new scale"
- Time estimate: "2-4 hours"

Actionable recommendations sell.

### ❌ Pitfall 5: No Ownership or Timeline

**Problem**: Report says "Fix color palette." But who? When?

**Fix**: Add section:
```
Priority Action: Standardize Color Palette
├─ Owner: [Name]
├─ Timeline: 1 week
├─ Effort: 8 hours
└─ Success metric: All colors use 5-token palette
```

Accountability drives execution.

### ❌ Pitfall 6: Not Showing Visual Examples

**Problem**: "Color contrast is an issue." No screenshots.

**Fix**: Always include screenshots:
- Current state (showing problem)
- Recommended state (showing fix)
- Side-by-side comparison

Visual examples are worth 1,000 words.

### ❌ Pitfall 7: Metrics Without Rubric

**Problem**: "Design Quality Score: 68/100." Client asks "Is that good?"

**Fix**: Include rubric:
```
90-100: Excellent (A+)
80-89: Good (B)
70-79: Fair (C) ← You are here
60-69: Poor (D)
<60: Critical (F)
```

Rubric provides context.

---

## References

- **design-system-generator** — Full workflow for creating design systems
- **visual-audit** — Audit methodology and scoring framework
- **typography-pairing** — Font selection and pairing principles
- **color-system** — Color harmony, WCAG validation
- **component-patterns** — Component documentation specs
- **accessibility-system** — WCAG guidelines, a11y testing
- **brand-identity-system** — Brand system frameworks
- **design-tokens** — Token format (DTCG), export formats
- **AC Brand Standards** — `/research/ac-design-standards.md`
- **WCAG 2.1 Guidelines** — https://www.w3.org/WAI/WCAG21/quickref/
- **Figma to HTML** — Design handoff documentation
