---
name: brand-identity-system
description: Complete brand identity creation from discovery through all touchpoints (digital, social, advertising, print). Seven phases: Discovery (brand audit + research) → Strategy (personality + positioning) → Visual Identity (logo + colors + type) → Digital (web guidelines) → Social (platform templates) → Advertising (ad specs) → Print (collateral). Output: comprehensive Brand Guidelines document with all visual standards. Master skill orchestrating 8+ companion skills. Trigger: "build a brand from scratch", "create brand guidelines", "rebrand company", "establish visual identity", "brand identity audit".
version: 1.0.0
license: MIT
---

# Brand Identity System Skill

## Purpose

A brand identity system is the complete visual, verbal, and experiential expression of an organization across all touchpoints. This skill orchestrates the full lifecycle of brand creation: discovery, strategy definition, visual identity design, and implementation guidelines across web, social, advertising, and print.

Unlike a single design task, building a brand identity is a **systems-level challenge** requiring coherence across 50+ use cases (website, LinkedIn profile, email templates, social posts, ads, business cards, signage, etc.). The output is a comprehensive Brand Guidelines Document serving as the single source of truth for consistency.

**This is the "master skill"** — it references and orchestrates almost every other skill in the repository (brand-research, aesthetic-direction, color-system, typography-pairing, design-system-generator, bento-layout, component-patterns, social-media-design, ad-creative-design, print-design).

## When to Use

- **Startup launch**: New company with no existing brand
- **Company rebrand**: Modernizing identity for acquisition, market shift, or growth milestone
- **Brand acquisition**: Integrating multiple brands into holding company
- **Brand refresh**: Updating logo/colors/typography without full rebrand
- **Agency work**: Building brand for client from scratch
- **Design system foundation**: Establishing visual system that guides 100+ pages
- **Cross-functional alignment**: Getting marketing, design, engineering on same page
- **Multi-market entry**: Adapting brand for new geographies (colors, typography cultural sensitivity)

**Scope**: Small startup (1-5 pages) to large enterprise (500+ pages). Works for any industry.

## Key Concepts

### The Seven Phases

1. **Discovery** — Brand audit: name, mission, values, audience, USP, 3-5 competitors
2. **Strategy** — Define brand personality, voice, positioning, market differentiation
3. **Visual Identity** — Logo usage rules, color system (RGB + CMYK), typography system
4. **Digital** — Web design guidelines, component library, responsive rules
5. **Social** — Platform-specific templates (Instagram, LinkedIn, TikTok, etc.)
6. **Advertising** — Campaign visual guidelines, ad creative specs, platform dimensions
7. **Print** — Collateral specifications (business cards, letterhead, signage, packaging)

### Brand Identity Hierarchy

```
Brand Strategy (Foundation)
  ├─ Mission & Values
  ├─ Positioning Statement
  ├─ Brand Personality
  └─ Target Audience

Visual Identity (Expression)
  ├─ Logo System
  ├─ Color System
  ├─ Typography System
  ├─ Imagery Style
  └─ Iconography

Application Guidelines (Implementation)
  ├─ Digital (Web + App)
  ├─ Social Media
  ├─ Advertising
  └─ Print Collateral
```

### Competency Coverage

This skill draws on and orchestrates 8+ companion skills:

| Phase | Companion Skills | Output |
|-------|-----------------|--------|
| Discovery | `brand-research` (competitors) | Competitive analysis, market positioning |
| Strategy | `aesthetic-direction` (personality) | Visual direction, mood board |
| Visual | `color-system`, `typography-pairing`, logo guidelines | Color palettes (RGB + CMYK), font stacks |
| Digital | `design-system-generator`, `bento-layout`, `component-patterns` | Web guidelines, component library |
| Social | `social-media-design` | Instagram/LinkedIn/TikTok templates, sizing specs |
| Advertising | `ad-creative-design` | Banner ads, Google Ads, Meta Ads specs |
| Print | `print-design` | Business cards, letterhead, signage, packaging |

## Instructions

### Phase 1: Discovery (4-6 hours)

Run `brand-research` on 3-5 competitors. Conduct internal audit:

1. **Brand Fundamentals**: Company name, logo, founding year, team size, products/services
2. **Positioning**: Target audience, pain point solved, unique value prop, market niche
3. **Values & Voice**: Mission, 3-5 core values, communication tone, 3-5 key messaging pillars
4. **Competitive Analysis**: Document competitor visual identity, positioning, messaging, and market gaps

**Checkpoint**: Define your "striking distance" — the specific visual/verbal differentiation from competitors. See `references/discovery-worksheet.md` for detailed template.

### Phase 2: Strategy (3-4 hours)

Choose a brand archetype (Sage, Innovator, Caregiver, Lover, Everyman, etc.). Define personality in 3-5 adjectives.

Run `aesthetic-direction` with discovery + personality to get:
- Aesthetic direction (minimalist, maximalist, brutalist, playful, luxe)
- Color palette inspirations
- Typeface recommendations
- Visual metaphor or key visual system

Create brand voice + tone guide (permanent voice vs. contextual tone per channel).

**Checkpoint**: Does voice reflect personality? Do brand promise and values align? See `references/brand-strategy-framework.md` for personality archetypes and voice templates.

### Phase 3: Visual Identity (5-7 hours)

Define logo variations (full, icon, horizontal, vertical, monochrome, reversed). Specify clear space, minimum size, and prohibited uses.

Run `color-system` skill to create primary (primary, secondary, accent) + semantic (success, error, warning, info) + neutral (grays, dark, light) palettes. Output RGB + CMYK for print. Verify WCAG AA contrast on all color pairs.

Run `typography-pairing` skill to choose display font (H1-H3), body font (16px+), and monospace font. Specify scale ratios, weights, and CDN sources.

Define imagery style (photography approach, color grading, aspect ratios) and illustration style (minimal line art, flat color, 3D).

**Checkpoint**: Do color + type + imagery together communicate brand personality? See `references/visual-identity-specs.md` for detailed logo, color, and typography templates.

### Phase 4: Digital Guidelines (4-5 hours)

Run `design-system-generator` with colors/typography from Phase 3 to produce design tokens (CSS variables), Tailwind config, and component variants (buttons, cards, inputs with states).

Run `bento-layout` to specify standard page layouts (hero, feature grid, pricing, social proof, footer sections). Responsive breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large).

Using `component-patterns`, document component library (buttons, cards, inputs with states, navigation). Define spacing base unit (8px or 4px), border radius (8px default), shadows, and touch targets (44×44px minimum).

**Checkpoint**: Can a developer build pages from guidelines alone? See `references/digital-guidelines-template.md` for detailed component specs and layout patterns.

### Phase 5: Social Media Guidelines (3-4 hours)

Run `social-media-design` to create platform-specific templates. Specify dimensions for Instagram (1080×1080px feed, 1080×1920px story), LinkedIn (1200×627px), Facebook (1200×628px), TikTok (1080×1920px), Twitter/X (1024×512px).

Create 5 reusable content templates (quote post, educational carousel, testimonial, behind-the-scenes, event announcement). Define hashtag strategy (branded + campaign + community) and emoji guidelines.

**Checkpoint**: Can community manager execute templates in Figma/Canva? See `references/social-media-specs.md` for detailed dimensions and template designs.

### Phase 6: Advertising Guidelines (3-4 hours)

Run `ad-creative-design` to document platform dimensions (Google Search, Google Display, Google Shopping, Meta, TikTok, LinkedIn). Specify visual style (brand colors, approved fonts, imagery style), CTA button standards (text, color, contrast), and compliance rules (no false claims, transparent sponsored labels).

Create campaign brief template with objective, target audience, budget, creative variants, messaging framework, and success metrics.

**Checkpoint**: Can paid media manager launch campaigns using these specs? See `references/advertising-specs.md` for full platform dimensions and creative briefs.

### Phase 7: Print Collateral Guidelines (3-4 hours)

Run `print-design` to specify dimensions, bleed, and design standards for:
- **Business Card** (3.5" × 2", 0.125" bleed, 350gsm paper)
- **Letterhead** (8.5" × 11", 1" margins, logo top-left or centered)
- **Envelope** (standard #10, return address + postage area)
- **Signage** (storefront 24" minimum, office wayfinding, 7:1 contrast for outdoor)
- **Packaging** (product box, labels, branded inserts if applicable)

Document paper stocks, ink colors (RGB + CMYK verified), and premium finishes (silk, matte, linen).

**Checkpoint**: Do all tangible materials reflect same brand identity? See `references/print-collateral-specs.md` for detailed dimensions and bleed guidelines.

## Examples

### Example 1: SaaS Startup Rebrand

**Phase 1: Discovery** — Fintech onboarding platform founded 2021. Competitors: Stripe, Wise, Plaid. Target audience: 25-40 developers and founders (technical, pragmatic). Pain point: Complex financial APIs made simple. Current brand: Generic blue logo, no personality.

**Phase 2: Strategy** — Choose "Innovator" archetype (cutting-edge, disruptive, forward-thinking). Define personality: innovative, trustworthy, developer-friendly, no-nonsense. Run `aesthetic-direction` → Output: Modern minimalist aesthetic, navy + electric blue + warm orange accent, geometric sans-serif display font (Syne), clean monospace (IBM Plex Mono). Voice: Technical but approachable, no marketing jargon.

**Phase 3: Visual Identity** — Logo: Geometric hexagon symbol (representing API nodes) + "FinNode" wordmark. Icon variant for favicon. Color system: Primary navy #001F3F, secondary electric blue #0070F3, accent orange #FF6B35. CMYK-verified for print. Typography: Syne for headings, Inter for UI, IBM Plex Mono for code blocks. Imagery: Clean product screenshots, no stock photos.

**Phase 4: Digital** — Design tokens: CSS variables for colors, 8px spacing base, 8-24px scale. Tailwind config with token extension. Components: Minimal button styles, clean card variants, form input with validation states. Responsive breakpoints: 375px mobile, 768px tablet, 1440px desktop. Homepage structure: API-first hero, feature grid (3 cols), pricing table, developer testimonials, code snippet showcase.

**Phase 5: Social** — LinkedIn (B2B thought leadership): Share engineering behind APIs, DM-friendly voice. Instagram (developer community): Code snippets, behind-the-scenes team. Twitter/X: Real-time API status, dev tips, launch announcements. All posts: Consistent navy + orange accent colors, consistent sans-serif headings.

**Phase 6: Advertising** — Google Ads (search): "FinNode API" keyword targeting, benefit-focused headlines. Google Shopping (product listings if applicable): Product images 1200×1200px, white background. Meta (retargeting warm leads): 15-30 second video explainers, electric blue CTA button. TikTok (reach younger developers): Educational code tips, 9:16 vertical video.

**Phase 7: Print** — Business cards: Navy background, white text, orange accent line. Letterhead: Logo top-left, 1" margins, navy footer bar. Developer conference signage: "FinNode" 24" width, hexagon grid pattern using navy and orange.

**Output**: 95-page Brand Guidelines covering all 7 phases, Quick Reference Card with logo + colors + fonts, approved Figma component library, Tailwind config file, social media Canva templates, and ad platform briefs.

**Checkpoint**: All touchpoints (website, LinkedIn, Twitter, business card, conference booth) feel like one coherent brand. Logo works at 16px and 16cm. Colors verified WCAG AA. Guidelines live in Notion for easy team access.

See `references/brand-guidelines-template.md` for complete table of contents and assembly guide.

## Common Pitfalls

### Antipattern 1: Building Identity Without Strategy
**Bad**: Start with "let's make the logo blue because blue is good" without understanding positioning.
**Good**: Complete Phases 1-2 (Discovery + Strategy) before touching visual identity.

### Antipattern 2: Inconsistency Across Touchpoints
**Bad**: Website is minimalist, social media is playful, print collateral is formal (three different identities).
**Good**: Design system ensures consistency. Web, social, and print all use same colors, typography, and voice.

### Antipattern 3: Logo Oversimplification
**Bad**: Logo so minimal it's unrecognizable at small sizes (favicon, app icon).
**Good**: Create icon variant for small sizes (e.g., Apple's "A", Nike's swoosh as standalone icons).

### Antipattern 4: Color System Without Print Reality
**Bad**: Design beautiful RGB colors that can't be reproduced in CMYK print (different gamut).
**Good**: Test every color in both RGB and CMYK. Many vibrant digital colors don't print well.

### Antipattern 5: Typography Ignoring Readability
**Bad**: Choose beautiful serif font, but at 12px it's illegible; or use all-caps for body text (harder to read).
**Good**: Test typography at actual sizes. Body text 16px+, 1.5 line-height minimum, mixed case not all-caps.

### Antipattern 6: No Brand Voice Definition
**Bad**: Write marketing copy, then social media, then support docs in three different tones.
**Good**: Define voice (permanent) and tone (contextual) upfront. All communication reflects brand personality.

### Antipattern 7: Skipping WCAG AA Contrast Verification
**Bad**: Choose color combinations that fail accessibility (text too light, unreadable for colorblind users).
**Good**: Use WebAIM Contrast Checker on every color pair before finalizing palette.

### Antipattern 8: Brand Guidelines Gathering Dust
**Bad**: Create 80-page guidelines document. Developers don't read it. Branding drifts immediately.
**Good**: Create one-page Quick Reference Card. Keep full guidelines as "if you need details" reference. Enforce via code (design tokens, Tailwind config).

## References

- **Related Skills**: `brand-research` (competitive analysis), `aesthetic-direction` (visual identity), `color-system` (RGB + CMYK), `typography-pairing` (type scales), `design-system-generator` (design tokens), `bento-layout` (web layout), `component-patterns` (reusable components), `social-media-design` (platform templates), `ad-creative-design` (paid media), `print-design` (collateral)
- **Brand Archetypes**: [12 Brand Archetypes](https://www.gatheringofmydomain.com/marketing-strategy/12-brand-archetypes/) — Jungian archetypes applied to brand personality
- **WCAG AA Contrast**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Color Theory**: [Color & Light by David Beasley](https://www.3dartistonline.com/news/2017/12/the-color-theory/) — gamut, RGB vs. CMYK
- **Typography**: [Type Scale](https://www.typescale.com/) — mathematical font sizing
- **Print Production**: [Bleed and Safe Area Guide](https://blog.signatureprintingservices.com/bleed-and-safe-area/) — industry standards
- **Ad Specifications**: [Google Ads Help](https://support.google.com/google-ads/) + [Meta Ads Specs](https://www.facebook.com/business/ads-guide) + [TikTok Ads Spec](https://ads.tiktok.com/)
- **Packaging Design**: [Printful Packaging Guide](https://www.printful.com/blog/packaging-design-guide/)
- **Related Skills**: `brand-research`, `color-system`, `typography-pairing`
