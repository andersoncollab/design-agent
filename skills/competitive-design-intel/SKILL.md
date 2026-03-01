---
name: competitive-design-intel
description: Automated competitive design analysis workflow. Orchestrates brand research, visual audit scoring, and design critique to produce intelligence reports comparing 2-5 competitors. Use for client proposals, redesign justification, market positioning analysis, and differentiation strategy.
version: 1.0.0
license: MIT
---

## Purpose

Competitive design intelligence automates the process of analyzing 2-5 competitor websites or applications across design dimensions, extracting brand data, scoring quality, and identifying differentiation opportunities. Use this workflow for client proposals (showing competitors and your advantage), redesign justification (benchmarking against industry standards), and market positioning (finding white space in competitor aesthetics). The output is a design intelligence report with comparison matrices, visual critiques, and actionable recommendations.

## When to Use

- Client pitching: Present competitor analysis showing why redesign is needed
- Redesign justification: Quantify design gaps vs. market leaders
- Market positioning: Identify untapped aesthetic/interaction opportunities
- Benchmarking: Establish quality baseline for your own design system
- Brand differentiation: Find ways to zig while competitors zag
- RFP response: Show competitive advantage in design thinking
- Design audit: Understand industry standards and best practices

## Key Concepts

**Design Intelligence ≠ Copying.** The goal is understanding competitor decisions, finding gaps, and identifying differentiation opportunities—not replicating aesthetics.

**5 Core Analysis Dimensions:**
1. **Typography Strategy:** Font families, hierarchy, scale, readability choices
2. **Color Psychology:** Palette harmony, contrast, usage balance, dark mode support
3. **Layout Patterns:** Grid systems, responsive strategy, content density
4. **Interaction Quality:** Animation, transitions, hover states, gesture responsiveness
5. **Mobile Experience:** Thumb zones, touch targets, viewport adaptation

**Competitive Matrix:** Side-by-side scoring table (1-5 per dimension) showing how competitors rank.

**Design Quality Score (DQS):** 0-100 overall quality metric across 8 dimensions: typography, color, spacing, layout, components, motion, accessibility, and performance.

**Differentiation Map:** Visual clustering showing where competitors congregate (saturated) vs. white space (opportunities).

## Instructions

### Step 1: Gather Competitors
- Ask user for 2-5 competitor domains (direct + 1-2 indirect competitors from adjacent industries)
- Validate domains load successfully
- Screenshot each homepage and key pages (pricing, features, etc.)
- Document competitor industry classification and target audience

### Step 2: Pull Brand Data
For each competitor, extract via Brandfetch API or manual inspection:
- **Primary Colors:** RGB/hex values, usage patterns (hero, accent, CTA)
- **Secondary Palette:** Neutral scale, grays, supporting colors
- **Typography:** Font families, font weights used, headings vs. body scale ratio
- **Logo Variations:** Horizontal, vertical, icon-only
- **Industry Class:** B2B SaaS, e-commerce, agency, etc.

Structure as JSON comparison object:
```json
{
  "competitors": [
    {
      "domain": "competitor-a.com",
      "industry": "SaaS",
      "colors": {
        "primary": "#2563eb",
        "secondary": "#64748b",
        "accent": "#f59e0b"
      },
      "typography": {
        "headings": "Inter, sans-serif",
        "body": "Inter, sans-serif",
        "scale_ratio": 1.25
      }
    }
  ]
}
```

### Step 3: Visual Analysis Scoring
For each competitor, evaluate 5 core dimensions on a 1-5 scale:

| Dimension | 1 (Poor) | 3 (Average) | 5 (Excellent) |
|-----------|----------|------------|---------------|
| **Typography** | Generic sans-serif, inconsistent hierarchy | Standard hierarchy, readable | Custom typeface, clear hierarchy, excellent scale |
| **Color** | Clashing, low contrast | Adequate harmony, good contrast | Sophisticated palette, psychology applied |
| **Layout** | Cramped or excessive whitespace | Balanced spacing, readable | Grid-based, responsive, scannable |
| **Interaction** | Static or jarring animations | Subtle transitions, functional | Polished interactions, purposeful motion |
| **Mobile** | Not responsive, broken layout | Functional but not optimized | Touch-optimized, thumb zones, fast |

Document the rationale for each score (e.g., "Typography: 4 — custom serif headings with strong hierarchy, but body font is generic").

### Step 4: Calculate Design Quality Score
Use the 8-dimension rubric:
1. **Typography** (14%)
2. **Color** (14%)
3. **Spacing & Layout** (14%)
4. **Components & Consistency** (14%)
5. **Motion & Animation** (12%)
6. **Accessibility** (12%)
7. **Mobile Responsiveness** (12%)
8. **Performance & Load Time** (8%)

Formula: (T×0.14 + C×0.14 + S×0.14 + Co×0.14 + M×0.12 + A×0.12 + Mo×0.12 + P×0.08) × 20

Example: Competitor A scores 4,4,3,4,3,3,5,4 = (4+4+3+4+3+3+5+4) / 8 = 3.75 avg × 20 = **75 DQS**

### Step 5: Build Comparison Matrix
Create table comparing all competitors on each dimension:

| Dimension | Competitor A | Competitor B | Competitor C | Your Client |
|-----------|-------------|-------------|-------------|-----------|
| Typography | 4 (Editorial) | 3 (Generic) | 5 (Custom serif) | 2 (System font) |
| Color | 3 (Mono) | 4 (Vibrant) | 3 (Muted) | 2 (Inconsistent) |
| Layout | 4 (Grid-based) | 3 (Standard) | 5 (Innovative) | 2 (Cramped) |
| Interaction | 3 (Functional) | 4 (Polished) | 5 (Delightful) | 1 (Static) |
| Mobile | 5 (Optimized) | 3 (Responsive) | 4 (Good) | 2 (Broken) |
| **DQS Total** | **78** | **65** | **85** | **52** |

### Step 6: Identify Differentiation Opportunities
Plot competitors on 2D axis (e.g., Minimalism ↔ Maximalism vs. Playful ↔ Professional):
- Find clusters (saturated aesthetic space)
- Identify white space (untapped opportunities)
- Show where your client should position themselves
- Recommend specific design direction to stand out

### Step 7: Generate Design Intelligence Report

**Structure:**

**Executive Summary:** 2-3 sentences on key findings. Example: "Competitors cluster around minimalist, tech-forward aesthetics with heavy sans-serif typography. Opportunity exists in humanistic, serif-forward design positioning your client as approachable expertise."

**Competitor Profiles:** For each competitor, include:
- Brand data (colors, typography)
- DQS score + breakdown
- Strengths and weaknesses
- Visual classification (e.g., "Modern SaaS standard")

**Comparison Matrix:** Full dimension scoring table

**Aesthetic Clustering Map:**
- Describe where competitors position themselves
- Note oversaturated vs. open positioning
- Recommend positioning for client

**Differentiation Recommendations:**
1. **Typography Direction:** "Adopt a serif-forward system (EB Garamond for headers, Inter for body) to stand apart from all competitors' sans-serif baseline"
2. **Color Strategy:** "Use a tertiary color (deep purple) as accent to add sophistication while maintaining client's blue primary"
3. **Spacing Philosophy:** "Increase whitespace density by 20% to convey premium positioning vs. competitors' info-dense layouts"
4. **Interaction Approach:** "Implement micro-interactions (icon animations, button states) to add delight—none of competitors do this"
5. **Mobile-First:** "Optimize for mobile-first experience; competitor C only one doing this well"

**Priority Actions:** Top 5 improvements ranked by impact.

## Examples

### Example: Dallas Law Firm Design Intelligence

**Competitors analyzed:** Haynes Boone, Thompson & Knight, Winstead PC

**Key findings:**
- All three use dark blue + gray minimalist approach
- Typography is generic sans-serif (Helvetica, Arial equivalents)
- Layout is dense, reading-heavy, trust-focused
- No animation or microinteractions
- Mobile experience is functional but not optimized

**Differentiation opportunity:**
- Adopt warm earth tones (rust, olive) to humanize the industry
- Use serif typography (Playfair Display) for headings to convey established expertise
- Increase whitespace to improve readability and luxury perception
- Add subtle animations (logo reveal on scroll) to show innovation
- Mobile-first approach with large touch targets for on-the-go consultation requests

**DQS comparison:**
- Haynes Boone: 62 (functional, minimal innovation)
- Thompson & Knight: 58 (outdated design patterns)
- Winstead PC: 71 (best of three, but still generic)
- Recommended direction: 85+ (through positioning recommendations above)

### Example: E-commerce Product Dashboard

**Competitors:** Shopify Admin, WooCommerce, BigCommerce

**Key findings:**
- All use gray sidebar + data-dense layout
- Notification system is overwhelming (badge overload)
- Forms lack inline validation and real-time feedback
- Mobile experience drops significantly in functionality

**Differentiation:**
- Adopt teal + orange color scheme (vs. blue + gray standard)
- Implement smart empty states with illustrations
- Add loading skeleton screens (vs. spinners)
- Introduce command palette for power users
- Design mobile-first with touch-optimized inputs

## Common Pitfalls

**Pitfall: Copying competitor designs instead of finding differentiation**
- *Fix:* After analysis, explicitly ask "Where are competitors NOT going?" Use the differentiation map. Show white space, not crowded territory.

**Pitfall: Only analyzing direct competitors**
- *Fix:* Always include 1-2 indirect competitors from adjacent industries. E.g., for a fintech app, analyze Stripe + Apple Pay (different industry, similar audience).

**Pitfall: Subjective scoring without criteria**
- *Fix:* Always use the defined 1-5 rubric. Document rationale for each score. Make scoring reproducible.

**Pitfall: Ignoring mobile experience**
- *Fix:* Mobile is often primary context. Evaluate mobile first, then desktop. Note responsive breakpoints and thumb-zone optimization.

**Pitfall: Not connecting design recommendations to business goals**
- *Fix:* Every recommendation must answer "Why?" and "For whom?" E.g., "Serif typography conveys premium positioning, appealing to executive buyers."

**Pitfall: Analysis paralysis with 6+ competitors**
- *Fix:* Stop at 5. More competitors add noise, not signal. Diminishing returns after 3-4.

**Pitfall: Forgetting to assess accessibility**
- *Fix:* Include contrast ratios, keyboard navigation, and screen reader patterns in DQS scoring.

## References

- **Skill:** `brand-research` — Extract brand data via APIs
- **Skill:** `visual-audit` — Detailed visual assessment framework
- **Skill:** `design-critique` — DQS scoring system and methodology
- **Skill:** `aesthetic-direction` — Positioning and brand direction strategy
- **API:** Brandfetch — Brand data extraction
- **Tool:** Figma — Create competitive matrix boards
- **Tool:** Color Leap — Color analysis and psychology
- **Reference:** Nielsen Norman Group — Competitive benchmarking methodology
