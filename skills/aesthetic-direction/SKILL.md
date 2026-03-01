---
name: aesthetic-direction
description: Interactive Q&A to discover your project's visual direction. Answer questions about project type, industry, and brand personality. Receive 3-5 curated aesthetic directions with rationale, reference sites, fonts, colors, and layout philosophy. Trigger: "what's our aesthetic", "pick a design direction", "design direction for", "aesthetic guidance".
version: 1.0.0
license: MIT
---

## Purpose

You are a visual strategist. This skill guides projects toward intentional, cohesive aesthetic directions by asking about context, then presenting curated options with full design briefs. Instead of letting aesthetics emerge accidentally, you shape them deliberately using proven frameworks: industry patterns, audience expectations, brand personality, and technical constraints.

**Who uses it**: Product designers starting greenfield projects, brand designers refreshing identity, creative directors leading campaigns, founders establishing visual language.

**When to use it**: At project kickoff before any design work begins. Before competitor research, before color selection, before tool decisions.

## When to Use

- **Design kickoff**: "Here's our brief. What should we look like?"
- **Brand confusion**: Multiple team members want different aesthetics. Align on one direction.
- **Competitor saturation**: Everyone in your space looks the same. You need differentiation strategy.
- **Rebrand project**: Current aesthetic no longer fits. Pick a new direction intentionally.
- **Multi-brand system**: Each brand needs distinct visual identity rooted in strategy, not taste.
- **Stakeholder alignment**: Present 3-5 directions. Let decision-maker choose, not argue about vague "modern" concepts.

**Not for**: Detailed design system specification (see `design-system-generator`). Custom aesthetic invention. Logo or wordmark design. Copywriting or messaging strategy.

## Key Concepts

### The Aesthetic Framework

An aesthetic is not taste — it's a strategic choice with:

- **Visual characteristics**: Line weight, form (geometric vs. organic), use of whitespace, color saturation
- **Industry fit**: Does it match audience expectations? Does it break category conventions intentionally?
- **Emotional territory**: What feeling does it create? (calm, energetic, trustworthy, playful, luxurious)
- **Technical implications**: Does it work at scale? On mobile? At small sizes? With lots of text or minimal copy?
- **Differentiation strategy**: How does it stand apart in your competitive set?

### The Four Decision Drivers

When choosing an aesthetic, four factors matter:

1. **Project Type** (website, app, brand identity, social media, packaging)
2. **Industry & Audience** (B2B SaaS, luxury, healthcare, entertainment, nonprofit)
3. **Brand Personality** (bold, refined, playful, authoritative, warm, edgy)
4. **Competitive Context** (what are others doing? where's the gap?)

### 15+ Aesthetic Directions

This skill references a catalog of 15+ directions. See `references/aesthetic-catalog.md` for full details on each:

- Brutalist (raw, honest, demanding)
- Editorial/Magazine (authoritative, narrative-driven)
- Luxury/Refined (elegant, precious, exclusive)
- Organic/Natural (flowing, botanical, hand-drawn)
- Retro-Futuristic (80s nostalgia + digital optimism)
- Maximalist Chaos (busy, textured, personality-heavy)
- Playful/Toy-like (rounded, colorful, friendly)
- Art Deco/Geometric (symmetry, gold, structured)
- Industrial/Utilitarian (technical, minimal, functional)
- Soft/Pastel (gentle, calm, trendy-safe)
- Dark Mode Cinematic (moody, dramatic, intimate)
- Swiss/International Grid (order, clarity, legibility)
- Memphis/Postmodern (ironic, colorful, anti-serious)
- Japanese Minimal (wabi-sabi, emptiness as design)
- Neo-Brutalism (rounded forms + bold colors + constraint)

---

## Instructions

### Step 1: Ask About Project Type

Present options and get clarity:

```
What are you designing?
  a) Website (homepage + product pages)
  b) Mobile app (touch-first, icon-heavy)
  c) Brand identity (logo, colors, typography)
  d) Social media campaign (feed ads, stories, reels)
  e) Packaging or print (physical product)
  f) SaaS dashboard (data visualization, UI)
```

**Why it matters**: Websites value storytelling. Apps need touch-friendly spacing. Brands need iconic simplicity. Social needs scroll-stopping contrast. Dashboard design prioritizes scannability.

### Step 2: Ask About Industry and Audience

```
What industry are you in / who's your audience?
  a) B2B SaaS (enterprises, decision-makers)
  b) E-commerce (D2C, impulse buyers)
  c) Healthcare / wellness (trust-focused, regulated)
  d) Luxury / high-end (premium, exclusive)
  e) Entertainment / media (narrative, visual)
  f) Nonprofit / education (mission-driven)
  g) Creative / agency (self-promotional)
  h) Finance / legal (authoritative, serious)
  i) Hospitality / lifestyle (experiential)
```

**Why it matters**: Industry sets baseline expectations. B2B SaaS expects minimal, clean. Luxury expects refinement. Entertainment expects bold personality. Don't violate category conventions unless **intentional differentiation** is your strategy.

### Step 3: Ask About Brand Personality

```
How should your brand feel?
  a) Bold, energetic, rebellious (statement-making)
  b) Refined, elegant, understated (premium)
  c) Playful, warm, approachable (friendly)
  d) Authoritative, trustworthy, serious (leadership)
  e) Edgy, experimental, provocative (rule-breaking)
  f) Natural, organic, authentic (grounded)
```

**Why it matters**: Personality drives aesthetic choice. Bold → Brutalist, Neo-Brutalism, Memphis. Refined → Luxury, Minimal, Art Deco. Playful → Playful, Maximalist. Authoritative → Swiss Grid, Editorial.

### Step 4: Synthesize Context

Combine answers into recommendation statement:

```
Based on your inputs:
  Project: [TYPE]
  Audience: [INDUSTRY] audience
  Personality: [PERSONALITY]
  Competitive context: [GAP you identified]

I'm recommending [1-2 PRIMARY DIRECTIONS] as your best fit.
But here are [3-5 TOTAL OPTIONS] with trade-offs:
```

### Step 5: Present 3-5 Options with Full Briefs

For each direction, provide:

- **Direction name** + one-liner
- **Visual characteristics** (5-7 concrete attributes)
- **When to use it** (project types, industries, brands)
- **Reference websites** (real examples from craftwork.design)
- **Recommended Fontshare fonts** (display + body pair)
- **Color temperature and mood** (warm/cool, saturation level)
- **Layout philosophy** (grid density, white space, text treatment)
- **Why this fits your brief** (specific callout to your answers)
- **Trade-offs** (what this direction gives up, what it demands)

Example structure:

```markdown
## Option 1: Brutalist (Raw, Honest, Demanding)

**Visual**: Stark contrast, thick typography, generous whitespace, no gradients, monochrome or primary colors only

**Best for**: B2B SaaS, design agencies, technical companies, rebels in their category

**Reference sites**: [Real examples with URLs]

**Fonts**: [Fontshare display pair], [Fontshare body pair]

**Color mood**: High contrast, often monochrome + one accent color

**Layout**: Grid-based, lots of breathing room, text-heavy, intentionally sparse

**Why this fits**: You're a [PERSONALITY] brand in [INDUSTRY]. Brutalism will make you stand out against the [DIRECTION competitors use]. It signals [BENEFIT].

**Trade-off**: Brutalism demands strong content — it won't hide mediocre copy. It also reads as "serious/demanding" which works if your audience respects that but fails if you need warmth.
```

### Step 6: Guide Decision and Output Brief

Ask user to pick one:

```
Which direction resonates most?
```

Once chosen, output complete design brief:

```markdown
# [Project Name] — Visual Direction Brief

## Aesthetic Direction: [CHOSEN]

### Visual Identity
- [5-7 visual characteristics]

### Color Palette
- Primary: [Hex + mood]
- Secondary: [Hex + mood]
- Accent: [Hex + mood]

### Typography
- Display: [Fontshare font]
- Body: [Fontshare font]
- Type scale: [Major third 1.25 or perfect fourth 1.333]

### Layout Principles
- [Grid system]
- [Whitespace approach]
- [Component philosophy]

### Reference Sites
- [URL 1]: [Why it exemplifies this direction]
- [URL 2]: [...]

### Next Steps
1. Run `design-system-generator` to build tokens from this direction
2. Use `typography-pairing` to refine font selection
3. Use `color-system` to generate full palette and CSS variables
```

---

## Examples

### Example 1: SaaS Startup Kickoff

**User answers**:
- Project: Website + App
- Industry: B2B SaaS (HR tech)
- Personality: Bold but trustworthy

**Recommendation**: Neo-Brutalism or Swiss Grid (two opposite ends)

**Neo-Brutalism brief**:
- Bold, rounded forms + primary colors (not gray)
- Says: "We're modern, not sterile"
- Fonts: Cabinet Grotesk + Inter
- Color: Teal primary + cream background + coral accent
- Layout: Generous spacing, bold headlines, illustrated diagrams

**Swiss Grid brief**:
- Geometric, grid-locked, minimal color
- Says: "We're organized, reliable"
- Fonts: Satoshi + Inter
- Color: Navy + white + single accent
- Layout: Strict 8px grid, lots of whitespace, data-visualization heavy

**Why both?** Neo-Brutalism feels more startup-y and energetic. Swiss Grid feels more enterprise-ready. Pick based on whether you want to feel "scrappy" or "established."

---

### Example 2: Luxury Brand Refresh

**User answers**:
- Project: Brand identity (website + print)
- Industry: Luxury / high-end fashion
- Personality: Refined, elegant

**Recommendation**: Luxury / Editorial

**Luxury brief**:
- Serif typefaces, generous margins, minimal color
- Reference: Hermès, Patek Philippe websites
- Fonts: Boska (serif) + Erode (sans)
- Color: One primary color + gold + cream
- Layout: Lots of negative space, photography-first, minimal text

**Editorial brief** (alternative):
- High-contrast photographs, long-form storytelling
- Reference: Fashion magazine websites (Vogue, i-D)
- Fonts: Clash Display + General Sans
- Color: Cream background + one bold color + rich blacks
- Layout: Bold headlines, grid-breaking image placement, narrative flow

---

### Example 3: Nonprofit Website Rebrand

**User answers**:
- Project: Website
- Industry: Nonprofit (education)
- Personality: Warm, authoritative, mission-driven

**Recommendation**: Organic/Natural or Editorial

**Organic/Natural brief**:
- Hand-drawn illustrations, botanical colors, flowing layouts
- Says: "We care, we're human, we're grounded"
- Fonts: Clash Display (rounded) + General Sans
- Color: Earth tones (sage, terracotta, cream)
- Layout: Curved sections, illustrated key points, generous breathing room

---

## Common Pitfalls

### ❌ Pitfall 1: Picking Aesthetic Because "It Looks Cool Right Now"

**Problem**: You choose Soft/Pastel because it's trending on Dribbble. In 18 months it looks dated. Your site needs a rebrand.

**Fix**: Choose aesthetics rooted in **audience expectations or differentiation strategy**, not trend cycles. Ask: "Why this direction?" If the answer is "it's pretty," you haven't aligned on strategy yet.

Defensible reasons:
- ✓ "Brutalism stands out in a category full of soft pastels"
- ✓ "Luxury is expected for our high-end audience"
- ✓ "Playful matches our brand personality"
- ✗ "It looks cool on Dribbble"
- ✗ "I just like it"

### ❌ Pitfall 2: Mixing Conflicting Aesthetics

**Problem**: You combine Brutalist (stark, minimal) + Maximalist Chaos (busy, textured). Result: confused, doesn't know what it wants to be.

**Fix**: **Pick ONE aesthetic and stick to it.** Secondary directions can add texture, but primary aesthetic should be pure. Mixing confuses your audience.

Bad example:
```
Primary: Swiss Grid (minimal, ordered)
Secondary: Memphis (chaotic, colorful)
Result: Looks like two different websites fighting
```

Good example:
```
Primary: Neo-Brutalism (bold + rounded)
Secondary: Playful details (friendly illustrations)
Result: Bold but approachable
```

### ❌ Pitfall 3: Ignoring Industry Conventions Then Wondering Why Sales Drop

**Problem**: You work in enterprise SaaS but design like a D2C startup (bright colors, playful). Enterprises don't trust you. You look unprofessional to your actual audience.

**Fix**: Understand **category conventions**, then decide: Do you want to follow them (safer) or deliberately break them (risky but differentiated)?

If breaking conventions:
- Have a strategic reason ("Everyone else is boring, we'll be bold")
- Test with target audience first
- Ensure it still communicates trust/credibility in ways that matter to them

### ❌ Pitfall 4: Choosing Aesthetic Without Considering Content Reality

**Problem**: You pick Brutalist (text-heavy, demands strong content). Your site has mediocre copy and generic images. Brutalism exposes every weakness.

**Fix**: Match aesthetic to your **content capability**:
- **High-quality photography?** → Luxury, Editorial, Photography-first
- **Mediocre stock photos?** → Playful (illustration-heavy), Soft/Pastel (less photo-dependent)
- **Strong copywriting?** → Brutalist, Editorial, Swiss Grid
- **Limited copy?** → Playful, Art Deco (more visual)

### ❌ Pitfall 5: Not Thinking About Implementation Cost

**Problem**: You pick an aesthetic that requires custom illustration, bespoke photography, hand-coded components. Budget runs out 80% through project.

**Fix**: Consider **design system lift** for each option:
- **Low lift**: Swiss Grid, Minimal (standard components, grids work)
- **Medium lift**: Editorial, Luxury (custom photography needed, but standard components)
- **High lift**: Brutalist (demands perfect content), Playful (custom illustration), Organic (hand-drawn elements)

### ❌ Pitfall 6: Choosing Based on Personal Preference Not Audience

**Problem**: Designer loves Memphis (playful, postmodern). Client is a B2B legal firm. Memphis signals "not serious." Project flops.

**Fix**: **Separate personal taste from strategy.** Ask:
- What does our audience expect?
- Where is the opportunity to differentiate?
- What aesthetic best serves our brand promise?

Then, have your personal taste influence *implementation details* (specific fonts, specific colors within palette), not the primary direction.

---

## References

- **Aesthetic Catalog**: See `references/aesthetic-catalog.md` for detailed breakdown of all 15+ directions
- **Reference Websites**: craftwork.design — 1000+ curated design examples, filterable by aesthetic
- **Font Resource**: `typography-pairing` skill for pairing recommendations by aesthetic
- **Next Skills**: `design-system-generator` (workflow that uses this as first phase), `color-system`, `brand-research`
- **Industry Benchmarking**: Use `brand-research` skill to analyze competitor aesthetics and find gaps
- **Figma Inspiration**: component.gallery for UI component patterns by aesthetic type
- **Related Skills**: `color-system`, `typography-pairing`, `motion-design`
