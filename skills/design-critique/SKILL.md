---
name: design-critique
description: Structured design critique framework for evaluating web designs, UI mockups, and live sites. Eight-dimension scoring (typography, color, spacing, hierarchy, consistency, accessibility, performance, emotional impact) with actionable fix recommendations. Produces Design Quality Score (DQS). Use for design reviews, pre-launch audits, client feedback, self-assessment. Trigger: "critique this design", "review this UI", "design feedback", "what's wrong with this layout", "improve this design".
version: 1.0.0
license: MIT
---

## Purpose

You are a design critic and quality assessor. This skill provides a structured, repeatable framework for evaluating web designs across eight dimensions. Each dimension gets a 1-10 score with specific, measurable criteria, producing a composite Design Quality Score (DQS). Output: scored audit with prioritized, actionable fixes — not vague "make it better" feedback.

Critiques separate taste from quality. "I don't like this color" is opinion. "This color fails WCAG AA contrast against the background" is quality assessment. This skill teaches the difference.

## When to Use

- **Pre-launch design review**: Before shipping, does this meet quality standards?
- **Client feedback session**: Communicate specific issues using shared scoring framework
- **Design system audit**: Evaluate consistency across components and pages
- **Self-assessment before shipping**: Catch obvious problems before stakeholder review
- **Competitor analysis**: Benchmark competitors on same 8 dimensions
- **Agency portfolio review**: Evaluate quality of previous work
- **Redesign planning**: Identify which dimensions need most work
- **Design critique training**: Teach team members how to give objective feedback

Trigger phrases: "critique", "review the design", "feedback on this UI", "what's wrong here", "quality assessment", "design audit", "before we launch".

## Key Concepts

### The Eight Design Dimensions

Every design scores on eight dimensions, each weighted and critical:

| Dimension | Weight | What to Evaluate | Perfect 10 Looks Like |
|-----------|--------|-------------------|----------------------|
| **Typography** | 15% | Font scale, hierarchy, readability, loading strategy | Mathematical scale, 2-3 fonts max, 16px+ body, 1.5+ line-height, preconnect, no FOUT |
| **Color** | 15% | Palette cohesion, WCAG AA contrast, semantic usage, dark mode | 3-5 colors total, all pairs pass 4.5:1, success/error/warning semantic, consistent application |
| **Spacing** | 15% | Rhythm consistency, padding/margin system, breathing room | 4px or 8px base unit, consistent scales, generous whitespace, no clutter |
| **Visual Hierarchy** | 15% | Clear scanning path, focal points, CTA prominence | F-pattern or Z-pattern visible, one clear primary CTA, headlines >> body >> caption |
| **Consistency** | 10% | Component reuse, pattern repetition, design system adherence | One button style, one card style, one hover effect, consistent radius/shadow |
| **Accessibility** | 15% | Contrast, focus states, alt text, keyboard nav, touch targets | WCAG AA on all text, visible focus rings, 44px touch targets, skip links |
| **Performance** | 5% | Image optimization, font loading, layout shift, lazy loading | WebP images, font-display: swap, CLS < 0.1, lazy load below fold |
| **Emotional Impact** | 10% | Does it evoke intended brand feeling? Memorable? Professional? | Immediate emotional connection, clear brand personality, memorable |

### Design Quality Score (DQS)

The DQS is a weighted average of all eight dimensions:

```
DQS = (Typography_score × 0.15) + (Color_score × 0.15) +
      (Spacing_score × 0.15) + (Hierarchy_score × 0.15) +
      (Consistency_score × 0.10) + (Accessibility_score × 0.15) +
      (Performance_score × 0.05) + (Emotional_score × 0.10)
```

**DQS ranges**:
- **90-100**: Ship-ready. Meets professional standards. No known issues blocking launch.
- **75-89**: Good with minor fixes. Functional but has small gaps. Polish before shipping.
- **60-74**: Needs work. Multiple issues affecting user experience or brand perception.
- **Below 60**: Major redesign needed. Fundamental problems with strategy or execution.

### The Critique Protocol

Every critique follows the same five-step process:

1. **First Impression (5 seconds)** — What do you notice first? What's the emotional reaction?
2. **Scanning Path** — Where does your eye go? Is there a clear visual hierarchy?
3. **Dimension-by-Dimension Scoring** — Evaluate each of the 8 dimensions using checklists
4. **Screenshot Annotation** — Mark specific issues with coordinates and descriptions
5. **Prioritized Fix List** — Organize by impact: Critical → High → Medium → Low

### Fix Priority Framework

Not all fixes are equal. Prioritize by impact and effort:

- **Critical** (must fix before launch): Accessibility failures, broken layouts, unreadable text, missing CTAs, contrast violations
- **High** (fix in current sprint): Poor hierarchy, spacing inconsistency, secondary contrast issues, broken components
- **Medium** (polish pass): Font loading improvements, minor spacing tweaks, hover state refinements, icon consistency
- **Low** (nice-to-have): Micro-interactions, animation polish, dark mode, optional enhancements

---

## Instructions

### Step 1: Gather Context

Before critiquing, understand the design's purpose:

```markdown
## Context
- **Project**: [What is this? Landing page, app dashboard, email, social post?]
- **Audience**: [Who uses this? Developers, executives, 8-year-olds, luxury shoppers?]
- **Business Goal**: [What should users do? Sign up, buy, read, share?]
- **Intended Aesthetic**: [What style was attempted? See `aesthetic-direction` skill]
- **Constraints**: [Mobile-only, WCAG AAA required, brand colors locked?]
```

This context prevents critiquing brutalist design as "not colorful enough" when minimalism was the goal.

### Step 2: First Impression (5 Seconds)

Take a fresh look without reading or analyzing:

```markdown
## First Impression
- **Immediate reaction**: [Happy? Confused? Overwhelmed? Inspired?]
- **First element noticed**: [Where does your eye land?]
- **3-second understanding**: [Can I tell what this is/does in 3 seconds? Yes/no]
- **Brand fit**: [Does it match the intended personality? Yes/partially/no]
- **Mobile impression**: [At 375px width, is it still scannable?]
```

### Step 3: Score Each Dimension

For each of the eight dimensions, follow a checklist. Give specific scores (1-10), not subjective ratings.

#### Typography (0-10)
```markdown
### Typography: __/10
- [ ] Body text minimum 16px (not 14px or smaller)
- [ ] Line-height 1.5+ for body, 1.2-1.4 for headlines
- [ ] Maximum 2-3 font families (ideally 2)
- [ ] Heading scale follows mathematical ratio (1.125, 1.25, or 1.618)
- [ ] Font loading strategy: preconnect + font-display: swap (no FOUT)
- [ ] No orphans/widows in prominent text
- [ ] Readable at mobile (test at 375px width)
- [ ] Letter-spacing appropriate (not too tight or loose)

Issues found:
1. [Specific issue] — Fix: [concrete action]
2. [Specific issue] — Fix: [concrete action]
```

#### Color (0-10)
```markdown
### Color: __/10
- [ ] Palette limited to 3-5 colors (not random collection)
- [ ] All text pairs pass WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Secondary text contrast ≥ 3:1 (not below)
- [ ] Semantic colors used correctly (green=success, red=error, yellow=warning)
- [ ] Color not sole indicator of state (plus icon, pattern, or text)
- [ ] Consistent color application (same blue everywhere, not three shades)
- [ ] Dark mode consideration (if applicable)
- [ ] Color scheme matches brand guidelines

Issues found:
1. [Specific issue with contrast values or semantic misuse]
2. [Specific issue]
```

#### Spacing (0-10)
```markdown
### Spacing: __/10
- [ ] Base unit consistent (4px or 8px, not random values)
- [ ] Padding/margin scale follows pattern (8, 16, 24, 32, 48, 64px)
- [ ] Generous whitespace (not cramped or too open)
- [ ] Rhythm apparent when scrolling
- [ ] Touch targets minimum 44px (buttons, links)
- [ ] No excessive nesting (margins don't compound unpredictably)
- [ ] Responsive spacing (adjusts at mobile breakpoint)

Issues found:
1. [Specific spacing inconsistency]
2. [Spacing that breaks mobile layout]
```

#### Visual Hierarchy (0-10)
```markdown
### Visual Hierarchy: __/10
- [ ] Clear scanning path (F-pattern for long pages, Z-pattern for short)
- [ ] One primary focal point (hero section or main CTA)
- [ ] Headlines significantly larger than body
- [ ] CTA visually prominent (color, size, position)
- [ ] Section breaks clear (spacing or dividers)
- [ ] Importance = size + color + position
- [ ] Mobile hierarchy maintains priority (not collapsed)

Issues found:
1. [Element that's hard to find or prioritize]
2. [CTA that's not prominent enough]
```

#### Consistency (0-10)
```markdown
### Consistency: __/10
- [ ] All buttons use same style (size, radius, shadow)
- [ ] All cards follow one pattern (padding, border, shadow)
- [ ] Hover effects consistent (color fade, lift, underline)
- [ ] Icons consistent (line weight, size, fill)
- [ ] Form fields uniform (border, padding, focus state)
- [ ] Navigation structure follows pattern
- [ ] Component reuse evident (not recreated each time)

Issues found:
1. [Component that deviates from pattern]
2. [Inconsistent hover/focus behavior]
```

#### Accessibility (0-10)
```markdown
### Accessibility: __/10
- [ ] WCAG AA color contrast on all text
- [ ] Focus ring visible and keyboard-navigable
- [ ] Alt text present on meaningful images
- [ ] Form labels associated with inputs (not just placeholder)
- [ ] Error messages associated with fields (aria-describedby)
- [ ] Skip links present (skip to main content)
- [ ] Touch targets 44px minimum
- [ ] No color-only status indicators

Issues found:
1. [Contrast violation with values]
2. [Missing focus state or alt text]
```

#### Performance (0-10)
```markdown
### Performance: __/10
- [ ] Images use WebP or modern format
- [ ] Font-display: swap (no invisible text)
- [ ] Lazy loading for below-fold images
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] No excessive DOM bloat
- [ ] Icons use SVG or optimized format

Issues found:
1. [Performance issue with improvement path]
2. [Unoptimized asset or pattern]
```

#### Emotional Impact (0-10)
```markdown
### Emotional Impact: __/10
- [ ] Immediate emotional connection
- [ ] Brand personality visible (not generic)
- [ ] Photography/imagery cohesive
- [ ] Tone and voice aligned (playful copy → playful design, serious copy → serious design)
- [ ] Memorable (would stand out in competitive set)
- [ ] Authentic to brand promise

Issues found:
1. [Design feels misaligned with brand]
2. [Generic or forgettable elements]
```

### Step 4: Compile DQS Report

Generate the audit report in this structure:

```markdown
# Design Quality Audit — [Project Name]

## Executive Summary
- **Design Quality Score (DQS)**: XX/100 — [Rating: Ship-ready / Good with fixes / Needs work / Major redesign]
- **Top Strength**: [Best dimension, e.g., "Excellent visual hierarchy"]
- **Critical Issue**: [Worst dimension and specific problem]
- **Fixes Required**: X critical, X high, X medium, X low
- **Estimated Effort**: [X hours to address critical/high items]

## Dimension Breakdown

| Dimension | Score | Weight | Weighted Score |
|-----------|-------|--------|-----------------|
| Typography | X/10 | 15% | X.X |
| Color | X/10 | 15% | X.X |
| Spacing | X/10 | 15% | X.X |
| Visual Hierarchy | X/10 | 15% | X.X |
| Consistency | X/10 | 10% | X.X |
| Accessibility | X/10 | 15% | X.X |
| Performance | X/10 | 5% | X.X |
| Emotional Impact | X/10 | 10% | X.X |
| **TOTAL DQS** | | | **XX.X/100** |

## Critical Fixes (Must address before launch)
1. [Issue] — Impact: [description]. Fix: [specific action].
2. [Issue] — Impact: [description]. Fix: [specific action].

## High Priority Fixes (Address this sprint)
1. [Issue] — Fix: [action]
2. [Issue] — Fix: [action]

## Medium Priority Fixes (Polish pass)
1. [Issue] — Fix: [action]

## Low Priority / Nice-to-Have
1. [Issue] — Consider if time allows.

## Screenshots & Annotations
[Screenshots with marked problem areas and descriptions]

## Next Steps
- [ ] Address critical fixes
- [ ] Re-audit before launch
- [ ] Document decisions made
```

---

## Examples

### Example 1: SaaS Landing Page

**Context**: B2B project management tool, audience is busy CTOs, goal is sign up.

**Critique Result: DQS 72/100 — Good with minor fixes**

- **Typography 8/10**: Clean system, but headline scale jumps from 48px to 28px (missing 38px size). Fix: add one intermediate size.
- **Color 7/10**: Primary blue solid, but secondary text on light gray background fails WCAG AA (3.2:1 instead of 4.5:1). Fix: darken gray to #555 or lighten blue.
- **Spacing 9/10**: Consistent 16px base. Minor issue: bottom section feels tighter than top. Fix: add 8px more gap.
- **Hierarchy 6/10**: Hero CTA competes with three other buttons. Primary CTA should be 40% larger or higher in page.
- **Consistency 8/10**: Button styles match except one "outline" variant doesn't match fill style.
- **Accessibility 7/10**: Focus rings present but thin (2px, hard to see at distance). Secondary text lacks sufficient contrast.
- **Performance 9/10**: WebP images, lazy loading below fold, LCP 1.8s.
- **Emotional Impact 8/10**: Professional, trustworthy, but generic (could be any SaaS tool).

**Critical fixes**: Hierarchy (redesign CTA prominence), accessibility (fix contrast).
**High fixes**: Color contrast on secondary text, focus ring visibility.

---

### Example 2: E-Commerce Product Page

**Context**: Boutique fashion brand, mobile-first, goal is purchase.

**Critique Result: DQS 65/100 — Needs work**

- **Typography 6/10**: Body text 14px (too small). Line-height 1.4 (tight). Four fonts used (inconsistent). Fix: 16px body, add line-height: 1.6, remove two fonts.
- **Color 5/10**: Palette unclear (8+ colors used). Product images clash with background color. Success green (#00FF00) fails contrast on white.
- **Spacing 7/10**: Inconsistent use of padding (8px, 12px, 16px, 20px mix). Responsive gaps don't scale.
- **Hierarchy 5/10**: Product image, reviews, price, CTA all similar visual weight. Price should be prominent.
- **Consistency 4/10**: Review star icons don't match product option icons. Buttons have different border-radius (4px vs 8px).
- **Accessibility 6/10**: Product zoom has no keyboard support. Images lack alt text. Form labels missing.
- **Performance 8/10**: Images optimized but hero 3MB (reduce to 1MB). Lazy loading below fold.
- **Emotional Impact 4/10**: Feels like a template. Brand personality absent. Photography inconsistent quality.

**Critical fixes**: Typography (16px minimum), hierarchy (price/CTA prominence), accessibility (alt text, keyboard zoom).
**High fixes**: Color consolidation, consistency (buttons/icons), brand personality injection.

---

### Example 3: Portfolio Website

**Context**: Creative director's portfolio, goal is showcase + contact.

**Critique Result: DQS 82/100 — Good with minor fixes**

- **Typography 9/10**: Excellent font pairing (Sora + Roboto Mono). Perfect scale. Issue: mobile heading size too large (clipped on narrow screens).
- **Color 8/10**: Palette cohesive (charcoal + gold + white). All contrast passes. Minor: gold accent underutilized in secondary sections.
- **Spacing 9/10**: Beautiful rhythm. 8px base unit followed consistently. Breathing room generous.
- **Hierarchy 8/10**: Portfolio items clear focal points. One issue: testimonials section blends into background.
- **Consistency 9/10**: All components reused effectively. Hover effects consistent.
- **Accessibility 7/10**: Focus rings present. Missing alt text on portfolio images. Form fields lack visible labels.
- **Performance 9/10**: All images WebP. LCP 1.2s. No layout shift.
- **Emotional Impact 9/10**: Stunning. Immediately conveys the designer's aesthetic. Memorable.

**Critical fixes**: Accessibility (add alt text, improve form labels).
**High fixes**: Testimonials section needs hierarchy boost (color contrast or background).

---

## Common Pitfalls

1. **Vague feedback instead of measurable criteria**
   - Bad: "Make it pop."
   - Good: "Increase primary CTA size from 16px to 20px and shift to top of fold."

2. **Confusing opinion with quality**
   - Bad: "I don't like this color. Score: 2/10."
   - Good: "This color (#FF1493) appears in 4 different shades, isn't in design system, and fails contrast on secondary text."

3. **Ignoring mobile or one breakpoint**
   - Bad: "Spacing looks great." (only tested on desktop)
   - Good: "Spacing works at 1440px but collapses at 375px. Test mobile breakpoint first."

4. **Critiquing without knowing the audience or context**
   - Bad: "This brutalist design is ugly."
   - Good: "This brutalist design works for tech audiences but may alienate luxury market. Is that intentional?"

5. **Only auditing aesthetics, ignoring accessibility**
   - Bad: "Looks professional."
   - Good: "Looks professional AND passes WCAG AA contrast, has visible focus states, and is keyboard-navigable."

6. **Too many fixes at once without priority**
   - Bad: Overwhelm with 200 issues.
   - Good: Lead with 3-5 critical/high fixes that have maximum impact.

7. **Not testing on actual devices**
   - Bad: Use Chrome DevTools emulation only.
   - Good: Test on real iPhone, Android, tablet, and desktop.

---

## References

- **WCAG Contrast Checker**: [WebAIM](https://webaim.org/resources/contrastchecker/) — Verify every color pair
- **Type Scale Tool**: [Type Scale](https://www.typescale.com/) — Validate heading ratios
- **Core Web Vitals**: [web.dev/vitals](https://web.dev/vitals/) — LCP, CLS, FID benchmarks
- **Lighthouse Audits**: [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/) — WCAG, performance, SEO
- **Component Benchmarks**: [Component.gallery](https://www.component.gallery/) — See how 95 design systems handle components
- **Related Skills**: `visual-audit`, `competitive-design-intel`
