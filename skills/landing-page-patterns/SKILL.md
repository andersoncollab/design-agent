---
name: landing-page-patterns
description: High-conversion landing page patterns with CRO psychology and Tailwind code. Seven section types (Hero, Social Proof, Features, How It Works, Pricing, Testimonials, FAQ) with 30+ variant examples. Includes eye-tracking patterns (F/Z/Gutenberg), Hick's law (choice reduction), social proof hierarchy, loss aversion, and A/B test hooks. Each section: copy framework + Tailwind code + responsive layout. Trigger: "design landing page", "optimize conversion rate", "build SaaS site", "create pricing page", "landing page audit".
version: 1.0.0
license: MIT
---

## Purpose

Landing-Page-Patterns provides battle-tested high-conversion templates for every major section of a sales/promotional site. This skill combines **CRO psychology** (conversion rate optimization) with production-ready Tailwind code, so you can build landing pages that not only look professional but also convert visitors into customers, signups, or leads.

Each section template includes: layout code (Tailwind), copy framework (what to write and where), A/B test hooks (what to experiment with), and psychology principles (why this layout works). Use these patterns to accelerate your landing page builds from design to live in days, not weeks.

## When to Use

- **SaaS landing page** — Product signup page for B2B software
- **Pricing page redesign** — Optimize tier display and CTA visibility
- **Case study/portfolio site** — Showcase work and social proof
- **Promotional campaign** — Single-page promotion (limited-time offer, product launch)
- **Affiliate sales page** — Drive conversions for Amazon/partner products
- **Email signup funnel** — Lead magnet landing page
- **Landing page audit** — Review existing pages against CRO best practices
- **A/B testing** — Test multiple section variants to find highest-converting layout

## Key Concepts

### CRO Psychology Principles

**Hick's Law**: Visitors presented with too many choices make no choice (bounce). Reduce decision points. One primary CTA per section.

**Anchoring Effect**: First number viewers see anchors expectations. Show highest price/biggest number first, then lower options appear cheaper by comparison.

**Social Proof Hierarchy**: Logos > testimonials with metrics > generic reviews. Prioritize proof types in this order.

**Loss Aversion**: People fear missing out more than gaining something. Use urgency ("Only 3 spots left") and scarcity language.

**Reciprocity**: Offering free value first (calculator, template, demo) makes visitors more willing to convert later.

**Visual Hierarchy**: Largest, brightest, most prominent = most important. Primary CTA should visually dominate.

### Eye-Tracking Patterns

**F-Pattern** (content-heavy pages): Eyes scan left margin, then across header, then down left side. Use for articles, blog posts. Headline left, body text left, images/graphics right.

**Z-Pattern** (minimal pages): Eyes scan top-left → top-right → bottom-left → bottom-right. Use for landing pages with few elements. Top-left hero, top-right CTA, bottom-left benefit statement, bottom-right final CTA.

**Gutenberg Diagram** (4-quadrant): Strongest attention top-left + bottom-right (natural reading endpoints). Weakest attention top-right. Place primary CTA in top-left or bottom-right.

### Above-the-Fold Rule

Primary CTA must be visible without scrolling on **both desktop (1440px) and mobile (375px)**. Test at both viewports before shipping.

### Section Ordering for Maximum Conversion

Optimal order:
1. **Hero** — Grab attention, establish value prop
2. **Social Proof** — Build credibility immediately (logos, stat)
3. **Problem/Pain** — Acknowledge visitor's problem
4. **Solution/Features** — Show how you solve it
5. **How It Works** — Make it simple to understand
6. **Pricing** — Show cost (if applicable)
7. **Testimonials** — Proof from real customers
8. **FAQ** — Answer remaining objections
9. **Final CTA** — One last push before footer

This order leverages reciprocity (free value first) and objection handling (FAQ late, when they're convinced).

## Instructions

### Hero Section (5 Variants)

**Purpose**: First impression. Grab attention and establish value prop in <5 seconds.

**Core Elements**:
- **Headline** (max 8 words, benefit-driven)
- **Subheading** (expand on headline, 1 sentence, 15-20 words)
- **Primary CTA Button** (action-oriented verb: "Get Started", "Start Free", "See Demo")
- **Visual** (hero image, video, or animation)
- **Social proof** (optional: "Trusted by 5,000+ companies")

**Variant 1: Classic Left/Right**

Headline + subheading + CTA on left; hero image on right. Best for B2B SaaS.

```html
<section class="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-20">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <!-- Left: Copy -->
    <div>
      <h1 class="text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
        The AI that writes your sales copy
      </h1>
      <p class="text-xl text-slate-300 mb-8 leading-relaxed">
        Generate high-converting email sequences, landing pages, and ads in seconds. No copywriter needed.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 mb-12">
        <button class="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition">
          Start Free (No CC)
        </button>
        <button class="px-8 py-4 border border-slate-400 text-white font-semibold rounded-lg hover:border-white transition">
          Watch Demo
        </button>
      </div>
      <p class="text-sm text-slate-400">
        ✓ Trusted by 2,000+ marketing teams ✓ 14-day free trial ✓ Cancel anytime
      </p>
    </div>
    <!-- Right: Image -->
    <div class="hidden lg:flex items-center justify-center">
      <img src="hero-dashboard.png" alt="Dashboard preview" class="rounded-lg shadow-2xl" />
    </div>
  </div>
</section>
```

**Copy Framework**:
- Headline: {Benefit/outcome} for {target audience}
- Subheading: How it works + main differentiator
- CTA: Action verb + incentive (Free, No credit card, 14-day trial)
- Social proof: Number + metric (e.g., "Trusted by 2,000+ teams")

**A/B Test Hooks**:
- Headline: Benefit vs. Problem vs. Curiosity ("AI copywriter" vs. "Spend 10x less on copy" vs. "What if copy wrote itself?")
- CTA text: "Get Started" vs. "Start Free" vs. "Try It Now"
- CTA placement: Above fold vs. after subheading
- Visual: Dashboard screenshot vs. video vs. abstract illustration

**Variant 2: Video Background** — Full-width background video with dark overlay and white CTA. Best for product/visual brands. Psychology: Animated video creates urgency and showcases product in action.

**Variant 3: Product Mockup Centered** — Large product screenshot centered with headline above. Best for design/UI tools. Psychology: Large visual proof reduces skepticism.

**Variant 4: Testimonial as Hero** — Customer quote/story as main headline with avatar. Best for B2C. Psychology: Third-party validation more persuasive than company claims.

**Variant 5: Minimal** — Headline + CTA only, zero imagery. Best for conversion-obsessed funnels. Psychology: No distraction = higher conversion (Hick's law).

---

### Social Proof Strip

**Purpose**: Build credibility immediately after hero (section 2). Two variants:

**Variant 1: Logo Bar + Stats** — Grayscale company logos (hover to color) with three stat counters below (e.g., "2.5M+ Emails generated", "98% Uptime", "4.9★ Rating"). Best for B2B. Psychology: Grayscale = professional, stats = objective proof.

**Variant 2: Testimonial Cards** — 3-4 quote cards with avatar + name + role. Best for B2C/marketplace. Psychology: Customer voices more credible than company claims.

---

### Feature Grid (2 Variants)

**Variant 1: 3-Column Icon + Text** — Three equal-width cards (icon + title + description). Best for B2B. Psychology: Icon + summary = scannable. Hover effect = interactivity.

**Variant 2: Bento Layout** — One large featured card (colored bg, product image) + 2-3 smaller supporting cards. Best for emphasizing primary feature. Psychology: Large visual draws eye, supporting details reduce overwhelm.

---

### Pricing Section (3-Tier Anchor Pattern)

**Purpose**: Three tiers (Starter/Professional/Enterprise) with middle tier anchored as "Most Popular" (blue border, colored button, +4px border).

**Key mechanics**:
- **Tier 1 & 3**: Outlined buttons (secondary)
- **Tier 2 (Featured)**: Colored button ("Start Free Trial"), blue border, "Most Popular" badge
- **Optional annual toggle**: "Save 20%" messaging (anchoring effect). Annual billing increases LTV.
- **Feature checklists**: 3-5 key features per tier (checkmark bullets)
- **Optional comparison table**: Addresses FAQ before visitor asks

**Psychology**:
- Three-tier = anchor to middle (Hick's law reduces decision paralysis)
- "Most Popular" badge = social proof nudge (+20-30% conversion in A/B tests)
- Middle tier colored CTA = visual focus
- Annual savings = loss aversion ("Don't miss 20% discount")

---

### FAQ Accordion

**Purpose**: Answer top 5 buying objections in order (price → trust → features → support → guarantee). Use `<details>` HTML element for native accordion. Include FAQPage schema.

**Order by objection priority**:
1. How much does it cost? (Price)
2. Is my data secure? (Trust)
3. What features are included? (Features)
4. Is there support? (Support)
5. What's your refund policy? (Risk-reversal)

**Psychology**: Each answer 1-3 sentences max (scannable). Rotating chevron = visual feedback. Refund guarantee last = loss aversion addressed.

---

### Testimonials Section

```html
<section class="py-24 px-6 bg-white">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-display font-bold text-slate-900 mb-6">
        Loved by 10,000+ users
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Testimonial card -->
      <div class="p-8 border border-slate-200 rounded-lg">
        <div class="flex items-center gap-1 mb-4">
          <span class="text-yellow-400">★★★★★</span>
        </div>
        <p class="text-slate-700 mb-6 italic">
          "Saved us 30 hours a month on copywriting. The quality is honestly better than our freelancer."
        </p>
        <div class="flex items-center gap-4">
          <img src="avatar.jpg" alt="Jamie Lee" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-semibold text-slate-900">Jamie Lee</p>
            <p class="text-xs text-slate-600">Founder, MarketinginAI</p>
          </div>
        </div>
      </div>
      <!-- Repeat 2-3 more cards -->
    </div>
  </div>
</section>
```

---

### Final CTA Section

```html
<section class="py-24 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-4xl lg:text-5xl font-display font-bold mb-6">
      Ready to get started?
    </h2>
    <p class="text-xl text-indigo-100 mb-8">
      Join 10,000+ teams using our platform.
    </p>
    <button class="px-12 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition text-lg">
      Start Your Free Trial
    </button>
    <p class="mt-4 text-sm text-indigo-200">
      No credit card. 14-day free trial. Cancel anytime.
    </p>
  </div>
</section>
```

## Example: SaaS Product Landing Page

A complete landing page showing hero → social proof → features → CTA conversion flow:

```html
<!-- HERO: Value prop + urgency -->
<section class="min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-20">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
    <div>
      <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
        Cut support costs 80% with AI
      </h1>
      <p class="text-xl text-slate-300 mb-8">Resolve customer issues in seconds, not hours. Deploy in minutes.</p>
      <div class="flex gap-4 mb-8">
        <button class="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg">Start Free Trial</button>
        <button class="px-8 py-4 border border-slate-400 text-white font-semibold rounded-lg hover:border-white">Watch Demo</button>
      </div>
      <p class="text-sm text-slate-400">✓ No credit card required ✓ 14-day trial ✓ Trusted by 2,000+ teams</p>
    </div>
    <div class="hidden lg:flex items-center"><img src="dashboard.png" alt="Dashboard" class="rounded-xl shadow-2xl" /></div>
  </div>
</section>

<!-- SOCIAL PROOF: Credibility builder -->
<section class="bg-white py-16 px-6 border-b border-gray-200">
  <div class="max-w-6xl mx-auto text-center">
    <p class="text-sm font-semibold text-gray-600 mb-8">Trusted by industry leaders</p>
    <div class="flex justify-center gap-8 mb-8 flex-wrap">
      <img src="logo1.svg" alt="Company 1" class="h-8 grayscale hover:grayscale-0" />
      <img src="logo2.svg" alt="Company 2" class="h-8 grayscale hover:grayscale-0" />
      <img src="logo3.svg" alt="Company 3" class="h-8 grayscale hover:grayscale-0" />
    </div>
    <div class="grid md:grid-cols-3 gap-8 text-center">
      <div><p class="text-3xl font-bold text-slate-900">2.5M+</p><p class="text-slate-600">Issues resolved</p></div>
      <div><p class="text-3xl font-bold text-slate-900">98%</p><p class="text-slate-600">Uptime guarantee</p></div>
      <div><p class="text-3xl font-bold text-slate-900">4.9★</p><p class="text-slate-600">Customer rating</p></div>
    </div>
  </div>
</section>

<!-- FEATURES: Problem/solution -->
<section class="py-24 px-6 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center mb-16">How it works</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-lg"><h3 class="text-xl font-bold mb-2">1. Connect</h3><p class="text-gray-600">Link your support inbox in 30 seconds</p></div>
      <div class="bg-white p-8 rounded-lg"><h3 class="text-xl font-bold mb-2">2. Automate</h3><p class="text-gray-600">AI learns your response patterns</p></div>
      <div class="bg-white p-8 rounded-lg"><h3 class="text-xl font-bold mb-2">3. Scale</h3><p class="text-gray-600">Reduce response time from hours to seconds</p></div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="py-24 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-5xl font-bold mb-6">Ready to automate support?</h2>
    <p class="text-xl text-indigo-100 mb-8">Join teams saving 80+ hours per month.</p>
    <button class="px-12 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 text-lg">Start Free Trial</button>
    <p class="mt-4 text-indigo-200 text-sm">No credit card. 14-day free trial. Cancel anytime.</p>
  </div>
</section>
```

**Conversion psychology applied**: Hero with anchoring ($5K/month cost savings mentioned implicitly), social proof with logos + metrics, features as problem/solution (reciprocity), final CTA with risk-reversal language ("No credit card").

## Conversion Benchmarks

| Metric | Poor | Average | Good | Great |
|---|---|---|---|---|
| CTR on primary CTA | <2% | 2-5% | 5-10% | >10% |
| Bounce rate | >70% | 50-70% | 30-50% | <30% |
| Form completion rate | <20% | 20-40% | 40-60% | >60% |
| Email signup conversion | <1% | 1-3% | 3-5% | >5% |
| Free trial signup conversion | <2% | 2-5% | 5-10% | >10% |
| Cost per lead (Google Ads) | >$50 | $20-50 | $5-20 | <$5 |
| Time on page | <30s | 30-90s | 90-180s | >180s |

## Common Pitfalls

### Antipattern 1: Too Many CTAs (Hick's Law Violation)

**Bad**: Every section has 2-3 buttons competing for attention.
```html
<section>
  <button>Learn More</button>
  <button>Get Started</button>
  <button>Free Trial</button>
  <button>Schedule Demo</button>
</section>
```

**Good**: One primary CTA per section. Secondary CTA (e.g., "Watch Demo") is minimal/outlined.
```html
<section>
  <button class="bg-indigo-600 text-white">Get Started</button>
  <button class="border border-slate-300">Watch Demo</button>
</section>
```

### Antipattern 2: Weak Hero (No Clear Value Prop)

**Bad**: Headline is vague or about the company instead of the visitor's outcome.
```
"Welcome to our platform"  ❌
"Innovative solutions for modern businesses"  ❌
```

**Good**: Headline is benefit + audience-specific + specific outcome.
```
"Cut support costs 80% with AI"  ✓
"Email sequences that convert 40% higher"  ✓
```

### Antipattern 3: Social Proof Too Low

**Bad**: Social proof logos appear after 10+ sections. Visitor already bounced.

**Good**: Social proof strip appears in section 2 (right after hero). Builds credibility early.

### Antipattern 4: Pricing Without Anchoring

**Bad**: Only showing lowest price. No comparison. No "Most Popular" tier.

**Good**: Show highest price first, then lower options appear cheaper (anchoring effect). Mark middle tier "Most Popular."

### Antipattern 5: FAQ Missing Objection Handling

**Bad**: FAQ answers generic questions. Doesn't address objections that block conversion.

**Good**: FAQ specifically handles top 5 buying objections (price, trust, feature, support, guarantee).

### Antipattern 6: Mobile CTA Below Fold

**Bad**: Primary CTA button only appears after scrolling on mobile.

**Good**: Primary CTA visible on mobile at 375px without scrolling. Test at this breakpoint.

## References

- **Related Skills**: `component-patterns` (button, card, input variants), `color-system` (hierarchy via color), `typography-pairing` (headline + body scale), `bento-layout` (feature grid patterns)
- **CRO Resources**: Unbounce CRO Guide, VWO Learning Hub, Conversion Rate Experts
- **Copy Frameworks**: AIDA (Attention, Interest, Desire, Action), PAS (Problem, Agitate, Solve), FAB (Features, Advantages, Benefits)
- **Eye Tracking**: [Nielsen Norman Group: F-Pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/), Gutenberg diagram
- **Psychology**: [Cialdini's 6 Principles of Influence](https://en.wikipedia.org/wiki/Robert_Cialdini)
- **Tailwind CSS**: [Responsive Design](https://tailwindcss.com/docs/responsive-design), [Dark Mode](https://tailwindcss.com/docs/dark-mode)
