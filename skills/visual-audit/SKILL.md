---
name: visual-audit
description: Systematically audit existing website or design visual quality across 7 dimensions (typography, color, spacing, layout, components, motion, accessibility) using DFII scoring framework. Output scored report with per-dimension breakdown, specific issues, and Quick Wins. Use when evaluating design inconsistencies, comparing against brand standards, or planning redesigns. Trigger: "audit the design", "visual quality check", "design inconsistency", "brand standard compliance", "accessibility audit".
version: 1.0.0
license: MIT
---

# Visual Audit Skill

## Purpose

A visual audit systematically evaluates design quality across seven critical dimensions: typography, color, spacing, layout, components, motion, and accessibility. The audit uses a scoring framework (Design Feasibility & Impact Index — DFII from Anthropic's frontend-design skill) to quantify improvements and prioritize fixes. Output: scored report with specific issues, impact levels, and quick wins.

Unlike subjective design reviews ("this looks bad"), audits are objective and actionable. Each dimension scores 1-5, then combines using the DFII formula: (Impact + Fit + Feasibility + Performance) − Consistency Risk, yielding a −5 to +15 score. Below 5 = needs major work. 5-10 = solid. 10+ = exceptional.

## When to Use

- **Existing website audit**: Evaluate design consistency and quality of live site
- **Brand compliance check**: Verify visual adherence to brand guidelines
- **Redesign planning**: Identify highest-impact improvements before building
- **Comparative analysis**: Benchmark against competitors in same industry
- **Accessibility review**: Systematically check WCAG AA compliance
- **Component library audit**: Assess component consistency and coverage
- **Mobile responsiveness check**: Validate design at all breakpoints
- **Design system health**: Ensure design tokens used consistently across product
- **Post-launch QA**: Catch visual regressions before going live
- **Design handoff verification**: Confirm developer implementation matches comps

Trigger phrases: "audit", "visual review", "quality assessment", "brand consistency check", "design system evaluation", "accessibility check".

## Key Concepts

### DFII Scoring Framework

The DFII score combines four metrics, then subtracts consistency risk:

```
DFII Score = (Impact + Fit + Feasibility + Performance) − Consistency Risk
Range: −5 to +15
```

**Impact** (1-5): How much does the fix improve user experience or brand perception?
- 5 = Major impact (fixes critical usability or brand issues)
- 4 = Significant impact
- 3 = Moderate impact (noticeable to users)
- 2 = Minor impact
- 1 = Negligible impact

**Fit** (1-5): How well does the change align with brand/product strategy?
- 5 = Perfect alignment with strategy
- 4 = Strong alignment
- 3 = Neutral (doesn't conflict or enhance)
- 2 = Minor misalignment
- 1 = Major misalignment

**Feasibility** (1-5): How easy is the fix to implement?
- 5 = Trivial (CSS variable update, font swap)
- 4 = Easy (component refactor, spacing adjustment)
- 3 = Moderate effort (multi-component update)
- 2 = Complex (requires new component, significant rewrite)
- 1 = Very difficult (new feature, major architecture change)

**Performance** (1-5): Does this fix improve performance or reduce technical debt?
- 5 = Major performance win (faster load, fewer DOM nodes, better Lighthouse)
- 4 = Noticeable improvement
- 3 = Neutral (no perf impact either way)
- 2 = Minor regression
- 1 = Significant performance cost

**Consistency Risk** (0-5): How likely is this change to introduce inconsistency elsewhere?
- 5 = Extremely high risk (breaks across 10+ components)
- 4 = High risk (impacts 5-10 components)
- 3 = Moderate risk (2-4 components affected)
- 2 = Low risk (1-2 edge cases)
- 1 = Negligible risk (isolated change)

### Seven Audit Dimensions

1. **Typography**: Font family consistency, hierarchy clarity, scale rhythm, readability
2. **Color**: Palette cohesion, WCAG AA contrast compliance, semantic usage (error=red), dark mode
3. **Spacing**: Rhythm consistency (4px/8px base units), padding/margin patterns, breathing room, alignment grid
4. **Layout**: Structure clarity, responsive behavior at 3+ breakpoints, content hierarchy, visual flow
5. **Components**: Consistency across similar elements, state coverage (hover/focus/active/disabled), reusability
6. **Motion**: Animation purpose and restraint, reduced-motion support, timing consistency, performance
7. **Accessibility**: Focus states visible, color contrast > WCAG AA, keyboard navigation, screen reader support

### Scoring Each Dimension

Each dimension rates overall quality on 1-5, then breaks into specific issues with DFII scores:

```
Dimension: Typography
Overall: 3/5 (needs work)

Issue 1: Heading scale inconsistent (h1-h6 ratios jump randomly)
  - DFII: (Impact:4 + Fit:4 + Feasibility:5 + Performance:4) − 1 = 16 (exceptional)

Issue 2: Body line-height too tight (< 1.5 at mobile)
  - DFII: (Impact:3 + Fit:4 + Feasibility:5 + Performance:3) − 1 = 14 (exceptional)
```

## Instructions

### Phase 1: Gather Context

Before auditing, understand:
- **Target audience**: Who uses this site? (E-commerce customers, B2B buyers, investors?)
- **Industry norms**: What do competitors look like?
- **Brand guidelines**: Do brand standards exist?
- **Device/breakpoints**: Desktop, tablet, mobile? Minimum width?
- **Accessibility requirements**: WCAG AA or AAA?

### Phase 2: Audit Each Dimension

For each of the 7 dimensions, follow this protocol:

**Step 1**: Take screenshots at 3+ breakpoints (375px mobile, 768px tablet, 1440px desktop)

**Step 2**: Document observations in the dimension
- List every visual inconsistency or standard violation
- Screenshot specific problem areas
- Note affected components (count how many elements break the pattern)

**Step 3**: Score each issue using DFII
- Assign Impact (1-5)
- Assign Fit (1-5)
- Assign Feasibility (1-5)
- Assign Performance (1-5)
- Subtract Consistency Risk (0-5)
- Calculate final score

**Step 4**: Rate overall dimension quality (1-5)
- Combine all issue scores to estimate dimension health
- Example: Mostly 3/5 issues = 3/5 dimension

### Phase 3: Identify Quick Wins

Quick Wins are fixes with DFII ≥ 12 that take < 1 hour to implement. Common examples:

- Adjust CSS variable (color, font, spacing) across design system
- Update font-weight or letter-spacing site-wide
- Fix color contrast in one reusable component
- Add focus ring to all interactive elements
- Adjust gap/padding to match base unit (8px)
- Update motion-reduce media query

### Phase 4: Compile Report

Structure output as:

```
# Visual Audit Report
## Executive Summary
- Overall DFII score (average of all dimensions)
- 3-5 key findings
- Estimated effort to fix all issues
- Recommended priority: (Quick Wins first, then high-impact/low-effort)

## Dimension Breakdown
### 1. Typography — 3/5
Issue 1: [Specific problem]
  - Impact: What users experience
  - DFII: [score]
  - Fix: [concrete action]

### 2. Color — 4/5
[Issues with DFII scores]

... [continue for all 7 dimensions]

## Quick Wins (Highest ROI)
1. [Fix] — DFII 14, 15 minutes
2. [Fix] — DFII 13, 30 minutes
3. [Fix] — DFII 12, 45 minutes

## Full Roadmap (Prioritized by DFII)
All issues sorted by DFII score, highest first

## Resources & Next Steps
- If redesign needed, run `design-to-code` skill
- If brand audit needed, run `brand-identity-system`
- If color audit needed, run `color-system`
- If type audit needed, run `typography-pairing`
```

## Examples

### Example 1: E-Commerce Site Audit

**Context**: Mid-size fashion retailer, desktop-primary, no formal brand guidelines.

**Dimension: Color — 2/5**

Issue 1: Accent color inconsistent (3 different blues used: #0066FF, #0070F3, #0052CC)
- Impact: 4 (Users see "different" buttons, reduces trust)
- Fit: 5 (All wrong, no spec)
- Feasibility: 5 (Replace with CSS variable)
- Performance: 4 (Reduces CSS size slightly)
- Consistency Risk: 2 (Only in buttons)
- **DFII: (4+5+5+4)−2 = 16 (EXCEPTIONAL)**

Issue 2: Error red (#FF0000) doesn't pass WCAG AA on white background (contrast 3.9:1, need 4.5:1)
- Impact: 5 (Accessibility failure, legal risk)
- Fit: 5 (Must fix)
- Feasibility: 5 (Change one color)
- Performance: 4 (No perf impact)
- Consistency Risk: 1 (Isolated to form validation)
- **DFII: (5+5+5+4)−1 = 18 (EXCEPTIONAL)**

**Quick Wins**: Consolidate blues + fix error red = 2 edits, 10 minutes, +34 DFII points.

### Example 2: SaaS Dashboard Audit

**Context**: Internal tool, heavy component reuse, design system exists but not enforced.

**Dimension: Spacing — 3/5**

Issue 1: Padding inconsistent (mix of p-2, p-3, p-4, p-6 on similar cards)
- Impact: 3 (Visual jarring but not functional)
- Fit: 4 (Design system says p-4 everywhere)
- Feasibility: 4 (Update 12 components)
- Performance: 3 (No perf impact)
- Consistency Risk: 2 (Cards are isolated)
- **DFII: (3+4+4+3)−2 = 12 (QUICK WIN)**

Issue 2: Margin between sections random (8px, 12px, 16px, 24px, 32px all used)
- Impact: 4 (Breaks visual rhythm)
- Fit: 5 (Design system specifies 8px base)
- Feasibility: 5 (CSS refactor)
- Performance: 5 (Fewer classes)
- Consistency Risk: 3 (Across entire page)
- **DFII: (4+5+5+5)−3 = 16 (EXCEPTIONAL)**

### Example 3: Accessibility Audit (Government Site)

**Context**: Public health site, WCAG AA requirement, mobile-heavy audience.

**Dimension: Accessibility — 2/5**

Issue 1: No visible focus ring on links (keyboard users can't navigate)
- Impact: 5 (Complete blocker for keyboard users)
- Fit: 5 (Legal requirement)
- Feasibility: 5 (Add focus:ring-2 to all buttons/links)
- Performance: 5 (No perf cost)
- Consistency Risk: 1 (Isolated styling)
- **DFII: (5+5+5+5)−1 = 19 (CRITICAL WIN)**

Issue 2: Form errors announced but not read aloud (aria-live missing)
- Impact: 5 (Screen reader users miss errors)
- Fit: 5 (Required by standard)
- Feasibility: 4 (Add aria-live to error containers)
- Performance: 5 (No perf impact)
- Consistency Risk: 1 (Form-specific)
- **DFII: (5+5+4+5)−1 = 18 (EXCEPTIONAL)**

## Common Pitfalls

### Antipattern 1: Auditing Without Context
**Bad**: Score colors as "bad" without knowing audience or industry. Red is bad on healthcare sites but fine on sports sites.
**Good**: Start with context gathering (audience, industry, brand guidelines, competitor analysis).

### Antipattern 2: Ignoring Mobile
**Bad**: Audit desktop only. Spacing that works at 1440px fails at 375px (text becomes illegible, buttons too small).
**Good**: Always test at 375px (mobile), 768px (tablet), 1440px (desktop).

### Antipattern 3: Scoring Opinions, Not Issues
**Bad**: "This color is ugly. Score: 1/5."
**Good**: "This color (#FF00FF) doesn't appear in color system, used in 3 places, has no semantic meaning. Recommend consolidating."

### Antipattern 4: Forgetting Accessibility
**Bad**: Design looks consistent but links have 2:1 contrast, violating WCAG AA.
**Good**: Always check contrast, focus states, and keyboard navigation.

### Antipattern 5: No Quick Wins Section
**Bad**: Overwhelm stakeholders with 200 fixes, no clear priority.
**Good**: Lead with 3-5 Quick Wins (DFII ≥ 12, < 1 hour). Show ROI.

### Antipattern 6: Inconsistent Dimension Scoring
**Bad**: Rate dimension 4/5 but all issues inside are 1/5.
**Good**: Dimension score should reflect average of all issues within it. 4/5 issues = 4/5 dimension.

### Antipattern 7: No Responsive Testing
**Bad**: Typography looks fine on desktop; haven't tested line-length at mobile.
**Good**: Measure line-length at 3+ breakpoints (should be 40-75 characters at body text size).

## References

- **DFII Framework**: Anthropic's frontend-design skill (Impact, Fit, Feasibility, Performance, Consistency Risk)
- **WCAG AA Contrast**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — test every color pair
- **Responsive Testing**: Chrome DevTools → Toggle Device Toolbar (375px, 768px, 1440px)
- **Typography Scale**: [Type Scale Tool](https://www.typescale.com/) — validate heading ratios (1.125x, 1.25x, 1.618x)
- **Spacing Scale**: [Spacing Scale Tool](https://spaceandlayout.com/) — reference standard base units (4px, 8px, 16px)
- **Component Library Audit**: [Component.gallery](https://www.component.gallery/) — benchmark against 95 design systems
- **Accessibility Auditing**: [Lighthouse](https://developer.chrome.com/docs/lighthouse/) — built-in WCAG checks
- **Related Skills**: `design-critique`, `competitive-design-intel`, `accessibility-system`
