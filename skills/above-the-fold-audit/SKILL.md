---
name: above-the-fold-audit
description: Audit a live URL on multiple mobile viewports, locate the primary CTA, measure how far below the fold it sits, and produce a surgical CSS patch that pulls it above the fold without redesigning the page. Uses Playwright for headless measurement and CSS injection to render a before/after comparison on the live DOM. Best for cases where stakeholder feedback is "the button is too far down on mobile" or "lots of unused vertical space." Trigger phrases — "above the fold", "CTA below fold", "mobile hero too tall", "tighten margins on mobile", "button hidden on small screens", "audit hero spacing".
version: 1.0.0
license: MIT
---

# Above-the-Fold Audit Skill

## Purpose

You are a mobile fold auditor. When a page's primary CTA renders below the fold on small screens, you find the exact CSS knobs causing it (min-height, padding, source order, fixed-aspect mockups) and produce a surgical patch that pulls the CTA above the fold — without redesigning the page or touching desktop layout.

You always measure twice: probe the live DOM for the actual computed values, then inject a CSS patch and measure again. Reports include before/after screenshots and pixel-level position deltas so the recipient can verify the fix without running anything.

## When to Use

- A teammate or client says "the button is below the fold on mobile."
- A page has a hero that fills the entire viewport with imagery before showing any text or CTA.
- `min-height: 100vh` (or similar) is being applied unconditionally to a hero on mobile.
- Stakeholder feedback mentions "lots of empty space" on mobile.
- Mobile bounce rate or LCP is suspiciously high on a page that converts well on desktop.
- You need to ship a one-block CSS patch that someone else applies (vendor site, PR review, agency handoff).

## The 5-Step Methodology

### Step 1 — Capture mobile screenshots and the DOM tree

Use Playwright with three small-viewport breakpoints. Always include iPhone SE (375×667), iPhone 14 (390×844), and Galaxy S8 (360×740). Together they cover the bottom 95% of mobile viewport sizes a real user has.

```js
import { chromium } from 'playwright';
const browser = await chromium.launch();
const breakpoints = [
  { name: 'iphone-se',  w: 375, h: 667 },
  { name: 'iphone-14',  w: 390, h: 844 },
  { name: 'galaxy-s8',  w: 360, h: 740 },
];
for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${bp.name}-BEFORE.png`, fullPage: false });
  await ctx.close();
}
await browser.close();
```

### Step 2 — Walk the hero DOM tree and pin the culprit

In headless Chrome, evaluate a tree-walker that records each direct child's height, top position, padding, margin, and `min-height`. Look for:

- `min-height: 100vh` or any `min-height` larger than the viewport. This forces the hero to fill viewport regardless of content.
- Padding-top + padding-bottom totaling >100px on mobile.
- A child container whose computed height eats >50% of the viewport (typically a device mockup or split image).
- Source order that puts a decorative element BEFORE the headline + CTA.

```js
const tree = await page.evaluate(() => {
  const hero = document.querySelector('#hero, .hero, [class*="hero"]');
  if (!hero) return null;
  const walk = (el, depth = 0) => {
    if (depth > 6) return null;
    const r = el.getBoundingClientRect();
    if (r.height < 8) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: (el.className+'').slice(0, 80),
      h: Math.round(r.height),
      top: Math.round(r.top),
      pTop: cs.paddingTop, pBot: cs.paddingBottom,
      mTop: cs.marginTop, mBot: cs.marginBottom,
      minH: cs.minHeight !== 'auto' && cs.minHeight !== '0px' ? cs.minHeight : null,
      kids: Array.from(el.children).map(k => walk(k, depth + 1)).filter(Boolean)
    };
  };
  return walk(hero);
});
```

Identify the top 1–3 contributors to hero height. These are your fix targets.

### Step 3 — Write a surgical CSS patch

Three rules of the patch:

1. **Scope to mobile.** Always wrap in `@media (max-width: 768px) { ... }`. Desktop must not change.
2. **Use real class names.** Pull selectors from your DOM walk in step 2. Do NOT guess at `[class*="phone"]` or `[class*="mockup"]` — generic selectors miss the actual targets and produce a patch that doesn't move the needle.
3. **Address root causes in this order:**
   - Remove `min-height` from the hero.
   - Reduce hero padding to 16/32 (or whatever matches the project's spacing scale at the smallest step).
   - Reorder columns so text + CTA come first, decorative imagery second (`flex-direction: column` + `order: 1/2`).
   - Cap any decorative element's height with `max-height: 60vh` (or smaller) so it cannot dominate the screen.
   - Tighten internal margins on the CTA group.

### Step 4 — Inject the patch on the live DOM and re-measure

Re-run Playwright. Use `page.addStyleTag({ content: PROPOSED_CSS })` to inject the patch on the live site without touching the source. Re-measure the CTA's `getBoundingClientRect().top` and confirm it's now `< viewport.height`.

```js
await page.addStyleTag({ content: PROPOSED_CSS });
await page.waitForTimeout(800);
const afterCTA = await page.evaluate(() => {
  const cta = document.querySelector('.hero-cta, [class*="cta"], a[href*="started"]');
  const r = cta.getBoundingClientRect();
  return { top: Math.round(r.top), h: Math.round(r.height) };
});
```

### Step 5 — Hand off the patch with measured proof

Output a markdown deliverable with:
- A "what's wrong" table (every offending CSS property with its live value)
- The patch as a single CSS code block
- A measured impact table (before/after CTA position per breakpoint)
- Before/after screenshots
- A short "why this works" paragraph

The recipient should be able to copy-paste the CSS block into their codebase and confirm the fix in one minute.

## Common Anti-Patterns

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| Applying `min-height: 100vh` to all viewports | Forces empty space on phones with short content | `min-height: 0` on `<= 768px`, set viewport-height only on tablet+ |
| Putting decorative imagery first in the DOM | Pushes headline + CTA below fold on mobile | Use `order:1/2` on flex parent; mobile CSS reorders without changing markup |
| Fixed `padding: 80px` on hero | Eats 160px of vertical space on small phones | Step the padding down with breakpoint: `padding: 32px` on mobile, `80px` on desktop |
| Device mockup at 100% of column width with no max | Scales up unbounded, dominates the screen | `max-height: 60vh` and `max-width: 480px` on the mockup wrapper |
| Decorative SVG hero with `aspect-ratio: 1/1` and full width | Becomes a giant square on phones | Cap the SVG container at `max-width: 60vw` on mobile or hide it |
| Treating "above the fold" as a desktop-only concern | Mobile is where conversion happens for B2B + e-com | Always validate on 375×667 first; if it converts there, it converts everywhere |

## Quick Diagnostic Checklist

Run this against any hero where the CTA isn't visible on mobile:

- [ ] Is `min-height` set on the hero? (kill it on mobile)
- [ ] Is `padding-top + padding-bottom` more than 80px on mobile? (cut by half)
- [ ] Does the hero have a sibling or child that's taller than 60vh? (cap it)
- [ ] Is the CTA in DOM order AFTER any decorative element? (reorder with flex `order`)
- [ ] Are touch targets at least 44px? (iOS HIG)
- [ ] Does the hero use `100vh` for height? (`100svh` or `100dvh` if you keep it; or remove)

## Worked Example

See `references/impeccable-style/` for a complete worked audit:
- Live URL diagnosed (vendor product page)
- Real DOM tree captured
- Surgical CSS patch written using actual class names
- Validated impact: primary CTA moved from y=1011px to y=427px on iPhone SE (584px above-fold improvement)
- Before/after screenshots at 3 breakpoints

The case study includes the executable Playwright scripts, the patch markdown, and the screenshots.

## Notes on Tooling

- **Playwright** is required for headless measurement + CSS injection. Puppeteer works but Playwright's `addStyleTag` API is cleaner.
- **No Chrome DevTools MCP needed.** This skill runs entirely via Playwright in headless mode.
- **No source-code access required.** You can audit any public URL and produce a patch the site owner applies. This is what makes this skill useful for vendor sites, agency reviews, and stakeholder feedback rounds.
- **Prefer `addStyleTag` over `evaluate(() => document.head.innerHTML += ...)`** — Playwright's helper handles cleanup and ordering correctly.
