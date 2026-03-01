---
name: design-qa
description: Design QA and visual regression testing — screenshot diffing, cross-browser checks, responsive spot-checks, Figma-to-code comparison, pre-launch design checklists, and pixel-perfect validation workflows. Trigger: "design QA", "visual regression", "screenshot diff", "pixel perfect", "design review checklist".
version: 1.0.0
license: MIT
---

# Design QA Skill

## Purpose

Systematic design quality assurance before launch. Visual regression testing catches unintended changes, cross-browser checks catch rendering issues, and pre-launch checklists catch everything else. This skill formalizes the QA workflows that separate "looks good on my machine" from "ready for production."

## Key Concepts

### Visual Regression Testing

Visual regression testing captures a baseline screenshot of your design, then compares new screenshots against that baseline. Any pixel differences are flagged for manual review.

Tools:
- **Playwright**: Built-in visual comparison with `page.screenshot()` and `expect(page).toHaveScreenshot()`. Compare baseline images using `toMatchSnapshot()`. Fast, local, no vendor lock-in.
- **Percy**: Cloud-based visual regression. Auto-captures on every commit, handles responsive variants, integrates with CI/CD.
- **Chromatic**: Storybook-native visual regression. Best for component libraries.
- **BackstopJS**: Headless browser screenshot tool with CLI. Good for static site QA.

Workflow: Establish baseline (commit to repo) → code changes → capture new screenshots → diff against baseline → review differences → approve or reject.

### Cross-Browser Matrix

Desktop: Chrome, Firefox, Safari, Edge. Mobile: Safari iOS, Chrome Android. Safari is the bottleneck — new CSS features land in Chrome first, Safari 6-12 months later.

Critical testing:
- CSS Grid and Flexbox (Safari mobile lags)
- CSS Variables (older Safari doesn't support)
- Backdrop filters (Safari iOS gaps)
- SVG filters and masks (rendering differences)
- Web fonts (font loading timing, fallback rendering)
- Sticky positioning (iOS Safari has bugs)

Test matrix: 4 desktop × 2 mobile = 6 browser/OS combinations. Focus on Safari first — it breaks most.

### Responsive Spot-Checks

Don't just resize the browser. Test at 5 critical breakpoints:
- **320px**: iPhone SE, older Android phones
- **375px**: iPhone default width
- **768px**: iPad, tablets
- **1024px**: iPad Pro, small laptops
- **1440px**: Desktop, 27" monitors

For each breakpoint, verify:
- Text isn't truncated
- Images scale properly (no stretched/squished)
- Navigation is accessible (menu hidden/collapsed correctly)
- Form inputs have adequate touch targets (min 44px tall)
- White space is balanced (not too cramped, not too loose)

### Figma-to-Code Comparison

Use Figma's Inspect panel to extract exact values. Side-by-side comparison workflow:

1. Open Figma design on left screen, browser DevTools Inspect on right
2. Select element in Figma, read: spacing, font size, line height, color, border radius, shadows, opacity
3. Select corresponding element in browser, compare computed styles
4. Use color picker (browser DevTools, Figma eyedropper) to verify exact color match
5. Measure spacing with grid/ruler tools in Figma vs browser DevTools measurements

Common discrepancies: Line height (Figma uses % or px, CSS uses unitless or px), color space (Figma SRGB vs browser rendering), font weight (CSS 500 vs 600), letter spacing (tight/normal/loose vs px values).

### Component States

Every interactive component has multiple states. QA must verify all:
- **Default**: Base appearance
- **Hover**: Mouse over element
- **Focus**: Keyboard focus (essential for accessibility)
- **Active**: Element is currently selected
- **Disabled**: Grayed out, cursor not-allowed
- **Loading**: Spinner, skeleton, or placeholder
- **Error**: Red border, error message, validation feedback
- **Empty**: No data to display, empty state message
- **Success**: Confirmation state, checkmark icon

Document state coverage in a matrix. Example:
```
Button component:
[x] Default
[x] Hover
[x] Focus (outline visible)
[x] Active (darker background)
[x] Disabled (40% opacity, cursor: not-allowed)
[x] Loading (spinner inside button)
[x] Error (red border on adjacent input)
```

### Dark Mode Verification

Dark mode is not just inverting colors. Verify:
- Text contrast meets WCAG AA (4.5:1 for normal, 3:1 for large)
- Icons change color appropriately (don't stay white on light background)
- Images have appropriate background or frame (no floating on dark)
- Borders are visible (black borders disappear on dark, use gray instead)
- Shadows are appropriate (light shadows on dark, not black)
- Form inputs have visible borders in dark mode
- Code blocks/snippets have syntax highlighting for dark theme
- Charts and graphs are readable in dark mode

Test workflow: Enable dark mode in browser DevTools → scroll entire page → verify every element.

## Instructions

### 1. Playwright Visual Regression Setup

```bash
npm install -D @playwright/test
```

Create `tests/visual-regression.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('homepage should match baseline', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('product page should match baseline', async ({ page }) => {
  await page.goto('http://localhost:3000/products/widget');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('product-page.png');
});
```

Run: `npx playwright test --update` to capture baselines. Then `npx playwright test` to compare future runs.

### 2. Cross-Browser Test Matrix Template

Create `qa/cross-browser-matrix.md`:

```markdown
# Cross-Browser Test Matrix

| Browser | OS | Desktop | Mobile | Status | Notes |
|---------|----|---------| -------|--------|-------|
| Chrome | macOS | ✓ | N/A | PASS | Latest version |
| Chrome | Windows | ✓ | N/A | PASS | Latest version |
| Safari | macOS | ✓ | N/A | PASS | Latest version |
| Safari | iOS | N/A | ✓ | PASS | iPhone 14+ |
| Firefox | macOS | ✓ | N/A | PASS | Latest version |
| Edge | Windows | ✓ | N/A | PASS | Chromium-based |
| Chrome | Android | N/A | ✓ | PASS | Pixel 7+ |

Critical Issues Found:
- Safari iOS: Sticky positioning buggy on header. Use position: fixed alternative.
- Firefox: CSS Grid gap not respecting custom properties. Use margin instead.
```

### 3. Responsive Audit Workflow

Test 5 key pages at 5 breakpoints (25 configurations). Create `qa/responsive-checklist.md`:

```markdown
# Responsive Audit Checklist

## Pages to Test
- [ ] Homepage
- [ ] Product listing
- [ ] Product detail
- [ ] Blog article
- [ ] Contact form

## Breakpoints & Verification

### 320px (iPhone SE)
- [ ] Text readable without horizontal scroll
- [ ] Touch targets ≥ 44px tall
- [ ] Navigation menu collapses to hamburger
- [ ] Images scale without stretching
- [ ] Form fields full width with padding

### 375px (iPhone default)
- [ ] Same as 320px
- [ ] Logo doesn't overflow navbar
- [ ] CTA buttons aligned properly

### 768px (iPad)
- [ ] Grid layouts switch to 2-column
- [ ] Images have breathing room
- [ ] Sidebar appears or menu reorganizes
- [ ] Form inputs accept tablet-sized touch

### 1024px (iPad Pro)
- [ ] 3-column grid appears if designed
- [ ] White space increases appropriately
- [ ] Desktop components start appearing

### 1440px (Desktop)
- [ ] Max-width container centered
- [ ] Full-width elements have padding
- [ ] Hover states work on desktop only
- [ ] Sidebar/aside layout correct
```

### 4. Pre-Launch Design Checklist

Create `qa/pre-launch-checklist.md`. 30+ items across categories:

```markdown
# Pre-Launch Design Checklist

## Typography
- [ ] All body text is readable (16px minimum for desktop, 14px minimum for mobile)
- [ ] Headings have proper hierarchy (h1 > h2 > h3)
- [ ] Line height is 1.5–1.8 (adequate spacing between lines)
- [ ] Letter spacing matches design (no tracking that makes text hard to read)
- [ ] Font weights are consistent (use max 3 weights)
- [ ] Font stacks have fallbacks (serif, sans-serif, monospace)
- [ ] All fonts are loaded (check Network tab for 404s)

## Spacing & Layout
- [ ] Margins and padding are consistent with design system
- [ ] No unexpected gaps or overlaps
- [ ] Whitespace is balanced (not cramped or excessive)
- [ ] Containers have max-width applied
- [ ] Grid and flexbox alignment is correct
- [ ] Elements don't shift on load (layout thrashing)

## Colors & Contrast
- [ ] Text contrast meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Color blindness: test with accessibility tools (Stark, WebAIM)
- [ ] Colors match design system tokens
- [ ] Gradients render smoothly (no banding)
- [ ] Borders are visible against background

## Images & Media
- [ ] All images have alt text
- [ ] Images are optimized (WebP, next-gen formats)
- [ ] No broken images (404s in Network tab)
- [ ] SVGs render correctly in all browsers
- [ ] Images load without layout shift (use aspect-ratio or dimensions)
- [ ] Lazy-loaded images appear on scroll

## Interactions & States
- [ ] Buttons have hover, focus, active, disabled states
- [ ] Links are underlined or otherwise visually distinct
- [ ] Form inputs show focus indicator (outline or border)
- [ ] Disabled form inputs are grayed out
- [ ] Modals have close button and backdrop dismiss
- [ ] Loading states show spinner or skeleton
- [ ] Error messages are visible and readable
- [ ] Success confirmations appear and auto-dismiss or persist

## Accessibility
- [ ] Page is keyboard navigable (Tab order correct)
- [ ] Focus indicators are visible (not just outline: none)
- [ ] Images have alt text (not alt="image" or alt="")
- [ ] Form labels are associated with inputs (for/id)
- [ ] Color isn't the only way to convey information
- [ ] ARIA labels used for icon buttons
- [ ] Skip-to-content link is present and works

## Responsive & Mobile
- [ ] Tested at 5 breakpoints (320px, 375px, 768px, 1024px, 1440px)
- [ ] Touch targets are ≥ 44px tall
- [ ] No horizontal scroll on mobile
- [ ] Mobile menu is accessible and dismissable
- [ ] Form inputs are sized for mobile keyboards
- [ ] Images scale without stretching or pixelation
- [ ] Viewport meta tag is correct (width=device-width, initial-scale=1)

## Dark Mode
- [ ] All text is readable in dark mode
- [ ] Icons change color if needed
- [ ] Borders are visible (use gray, not black)
- [ ] Images don't look washed out
- [ ] Form inputs have visible borders
- [ ] Shadows are appropriate (not too dark)
- [ ] No invisible text on dark backgrounds

## Performance & Technical
- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] Lighthouse Best Practices score ≥ 90
- [ ] No JavaScript errors in console
- [ ] No CSS warnings in console
- [ ] Images are not larger than needed (test on slow network)
- [ ] Fonts load within 3 seconds (check in Network tab)
- [ ] No content shift on load (CLS < 0.1)

## Cross-Browser (Spot-Check)
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest (especially check CSS features)
- [ ] Safari iOS (iPhone, especially viewport and sticky positioning)
- [ ] Chrome Android (Pixel or similar)

## Content & Copy
- [ ] No placeholder text remains (Lorem ipsum)
- [ ] Spelling and grammar are correct
- [ ] Links work and go to correct pages
- [ ] External links open in new tab if intended
- [ ] CTAs are clear and prominent
- [ ] No sensitive data visible

## SEO & Meta
- [ ] Page title is descriptive and unique
- [ ] Meta description is written (150 chars)
- [ ] Open Graph tags are set (for social sharing)
- [ ] Favicon is set
- [ ] No robots.txt blocking important pages

## Final Sign-Off
- [ ] Design lead approved
- [ ] QA lead approved
- [ ] Product owner approved
- [ ] Screenshot captured for before/after
```

### 5. Figma-to-Code Comparison Workflow

1. Open Figma and browser side-by-side
2. Use Figma's Inspect panel (right sidebar) to extract values
3. Create comparison spreadsheet or checklist with columns: Element, Figma Value, Browser Value, Status
4. Use browser DevTools Color Picker to verify exact hex/RGB matches
5. Use DevTools Measure tool to verify spacing (right-click element → Inspect → Styles tab)
6. Document any intentional deviations (e.g., "button padding adjusted for touch targets")

### 6. Component State Coverage Matrix

Create `qa/component-states.md`:

```markdown
# Component State Coverage Matrix

## Button
| State | Expected Behavior | Status |
|-------|-------------------|--------|
| Default | Solid background, black text | ✓ |
| Hover | Darker background, cursor pointer | ✓ |
| Focus | 2px outline, visible on focus | ✓ |
| Active | Even darker background | ✓ |
| Disabled | 40% opacity, cursor not-allowed | ✓ |
| Loading | Spinner appears inside, text hidden | ✓ |

## Form Input
| State | Expected Behavior | Status |
|-------|-------------------|--------|
| Default | White background, gray border | ✓ |
| Focus | Blue outline, blue border | ✓ |
| Filled | Value visible, no placeholder | ✓ |
| Disabled | Light gray background, gray text | ✓ |
| Error | Red border, red text below | ✓ |
| Success | Green checkmark, green border | ✓ |

## Modal
| State | Expected Behavior | Status |
|-------|-------------------|--------|
| Closed | Hidden, no overlay | ✓ |
| Open | Centered, overlay visible | ✓ |
| Loading | Spinner visible, close button disabled | ✓ |
| Success | Confirmation message, auto-close in 3s | ✓ |
```

## Common Pitfalls

1. **Only testing at desktop width**: Breakpoints matter. Test at 320px, 375px, 768px, 1024px, 1440px.

2. **Not testing component states**: Default state is 10% of the user experience. Test hover, focus, active, disabled, loading, error, empty, success.

3. **Skipping Safari/iOS testing**: Safari has different CSS behavior (sticky positioning, Grid gaps, CSS custom properties). Test it early and often.

4. **Using low-quality screenshots**: Capture at 2x device pixel ratio to catch aliasing and font rendering issues. Use `deviceScaleFactor: 2` in Playwright.

5. **No dark mode QA pass**: Dark mode requires separate testing — text contrast, icon colors, image backgrounds, border visibility all change.

6. **Testing with fast networks only**: Users have 3G, satellite, offline. Test with Chrome DevTools throttling (Slow 3G). Check lazy-loaded images actually load.

7. **Not testing with real content**: Use real product names (long), real user avatars, real error messages. Lorem ipsum hides problems.

8. **Forgetting focus indicators**: Keyboard users need visible focus states. Don't remove outline: none without providing an alternative.

9. **Assuming design is correct**: Design might have contrast issues, illegible fonts, or accessibility gaps. Use Lighthouse and axe DevTools to find problems.

10. **No baseline comparison**: Visual regression testing only works if you have a baseline. Establish it early (before launch), commit to repo, update intentionally.

## References

- [Playwright Screenshots & Visual Comparisons](https://playwright.dev/docs/screenshots)
- [Chromatic Visual Testing](https://www.chromatic.com/docs)
- [BackstopJS for Headless Screenshot Testing](https://github.com/garris/BackstopJS)
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Related Skills

- `visual-audit`: Design system compliance and visual consistency audits
- `design-critique`: Design feedback frameworks and critique workflows
- `accessibility-system`: WCAG compliance, ARIA, keyboard navigation
- `responsive-patterns`: Mobile-first design patterns and breakpoint strategies
