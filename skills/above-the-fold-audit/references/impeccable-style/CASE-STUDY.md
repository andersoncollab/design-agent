# impeccable.style — Mobile Hero Fix

**Reported by:** Jake — "lots of unused vertical space, button below the fold on smaller screens"
**Audited via:** Playwright at iPhone SE (375×667), iPhone 14 (390×844), Galaxy S8 (360×740)
**Live URL:** https://impeccable.style/

## What's wrong (measured)

| Constraint | Live value | Effect |
|---|---|---|
| `#hero.hero-combined { min-height }` | **844px** | Forces the hero to fill viewport even on phones |
| `#hero.hero-combined { padding }` | **32px / 80px** | Adds 112px of empty vertical space |
| `.hero-combined-container` flow | mockup-first on mobile | Pushes the headline + CTA below the fold |
| `#lens-comparison.split-comparison` | 496px tall, no max-height | Eats the entire viewport on small screens |

**Result on iPhone SE:** total hero height = **1246px** on a **667px** viewport. Primary "Get Started" CTA renders at **y=1011px** — 344px below the fold. User has to scroll past a giant device mockup to find the action.

## Recommended fix

Single CSS block. Drop into the site's mobile stylesheet (or scoped under a `@media (max-width: 768px)` rule in the existing hero CSS). Uses the actual class names from the live DOM, no JS changes needed.

```css
@media (max-width: 768px) {
  /* 1) Stop forcing hero to viewport height */
  #hero.hero-combined {
    min-height: 0;
    padding-top: 16px;
    padding-bottom: 32px;
  }

  /* 2) Reorder: text + CTA first, mockup second */
  .hero-combined-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .hero-combined-left  { order: 1; padding-bottom: 0; }
  .hero-combined-right { order: 2; padding-top: 0; }

  /* 3) Tighten the version-link below the CTA */
  .hero-version-link { margin-top: 12px; }

  /* 4) Cap the BEFORE/AFTER mockup so it doesn't dominate the screen */
  #lens-comparison.split-comparison {
    max-height: 60vh;
    margin: 0;
    padding: 16px;
  }
  #lens-comparison .split-container { max-height: 50vh; }

  /* 5) Tighten "what's included" box and CTA-group spacing */
  .hero-included-box { margin: 4px 0 0; padding: 8px; }
  .hero-cta-group    { margin-top: 12px; }
  .hero-cta-combined { padding: 14px 16px; }
}
```

## Validated impact (Playwright, applied via injected stylesheet on the live site)

| Viewport | Hero height (before → after) | Primary CTA position (before → after) | Above fold? |
|---|---|---|---|
| iPhone SE (375×667) | **1246px → 1030px** (-216px) | 1011 → **427px** | ❌ → **✓** |
| iPhone 14 (390×844) | **1201px → 1069px** (-132px) | 966 → **402px** | ❌ → **✓** |
| Galaxy S8 (360×740) | **1246px → 1093px** (-153px) | 1011 → **447px** | ❌ → **✓** |

Before/after screenshots are saved at:
- `impeccable-iphone-se-BEFORE.png` / `impeccable-iphone-se-AFTER.png`
- `impeccable-iphone-14-BEFORE.png` / `impeccable-iphone-14-AFTER.png`
- `impeccable-galaxy-s8-BEFORE.png` / `impeccable-galaxy-s8-AFTER.png`

## What the user sees AFTER the fix (iPhone SE)

Above the fold, in this order:
1. Nav (Designing / Docs / Slop / Live + GitHub icon)
2. "Impeccable" wordmark headline
3. "Design fluency for AI harnesses" tagline
4. "Impeccable teaches your AI real design and gives you 23 commands to steer the result." hook
5. "WHAT'S INCLUDED" box (skill + commands + CLI + Chrome extension)
6. **Primary "GET STARTED" CTA — fully visible**
7. "Works with" tool logos row
8. Version-link

The BEFORE/AFTER device mockup still appears, just below the CTA — exactly where it should be: as proof, not as a gate.

## Why this works

- Removing `min-height: 844px` was the single biggest win (it was forcing the hero to fill the viewport regardless of content).
- Reordering with `order: 1 / order: 2` is a one-property mobile-only change. Desktop layout is untouched (the media query scopes it to ≤768px).
- Capping the mockup at `60vh` keeps it generous on tablets but stops it from owning the entire screen on small phones.
- Padding tightening (32/80 → 16/32) reclaims another 64px without making the hero feel cramped.

## Notes

- All selectors used here exist on the live site (verified via DOM inspection).
- No JS changes. No layout shifts on desktop (≥768px stays as-is).
- Source is not in our repos — this is a vendor product page (the marketing site for the Impeccable design-skills product). Hand this CSS block to whoever owns the build.
