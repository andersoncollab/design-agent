---
name: design-handoff
description: Designer-to-developer handoff workflow — spec documentation, interactive annotations, asset export checklists, responsive behavior specs, animation specs, and state documentation that eliminates implementation guesswork. Trigger: "design handoff", "dev handoff", "design specs", "implementation specs", "design documentation".
version: 1.0.0
license: MIT
---

# Design-to-Developer Handoff Workflow

## Purpose

The gap between design and development is where most quality is lost. This skill codifies the handoff process into a structured workflow that gives developers everything they need to implement pixel-perfect, interactive, responsive interfaces without guesswork, approvals cycles, or back-and-forth questions.

## Core Principle

Complete specs eliminate developer assumptions. Incomplete specs generate questions that delay work and introduce unintended variations.

---

## Key Concepts

### Spacing Grid

All spacing uses a 4px base unit:
- `space-1` = 4px
- `space-2` = 8px (default gap)
- `space-3` = 12px
- `space-4` = 16px (standard padding)
- `space-6` = 24px (large padding)
- `space-8` = 32px (section spacing)
- `space-12` = 48px
- `space-16` = 64px

Document every gap, padding, and margin as a named value, not a pixel amount. This creates reusable token names across components.

### Color System

Every color in the design needs:
1. **Name**: semantic (primary, surface, error-light) or role-based (button-bg, text-secondary)
2. **Hex value**: e.g., `#1A3A16`
3. **Opacity variants**: if used at 80%, 60%, 40% transparency — document each as separate token
4. **Light/dark versions**: name both (e.g., primary-light: #2D5A27, primary-dark: #1A3A16)
5. **Usage context**: where it appears (button text, card border, hover state)

### Typography Scale

Document every text style as:
- **Style name**: e.g., `heading-1`, `body-md`, `caption`
- **Font family**: e.g., Roboto, Rubik, system stack
- **Weight**: 400, 500, 600, 700, 800
- **Size**: 12px, 16px, 20px, 24px, 32px (in rem where possible)
- **Line height**: 1.2, 1.5, 1.75 (as multipliers)
- **Letter spacing**: if non-default (usually for headlines)
- **Color**: which color token from system

Create a type scale table. Never say "use a larger font" — reference the scale.

### Component State Matrix

Every interactive component needs a state specification table:

| State | Description | Style Changes | Interactive |
|-------|-------------|---|---|
| default | Initial state | base colors | no |
| hover | Mouse over | darken/highlight | yes |
| focus | Keyboard focus | border or ring | yes |
| active | Pressed/selected | compressed/inverted | yes |
| disabled | Not available | 40% opacity, no pointer | no |
| loading | Processing | spinner overlay, disabled | no |
| error | Validation fail | error color, icon | no |
| empty | No data | placeholder text, neutral | no |

Spec every state. Developers will implement them; missing specs = missing states = quality loss.

### Responsive Behavior Specs

Document behavior at 5 breakpoints:
- **320px** (mobile)
- **375px** (iPhone)
- **768px** (tablet)
- **1024px** (small desktop)
- **1440px** (large desktop)

For each breakpoint, document:
- What reflows (grid columns, flex wrap)
- What hides (desktop nav, sidebar)
- What changes size (typography, padding, gaps)
- What stays fixed (never "responsive design" without specifics)

### Animation Specs

Every animation needs:
- **Property**: `opacity`, `transform`, `max-height`, etc.
- **Duration**: 200ms, 300ms, 500ms (choose from: 150, 200, 300, 500, 800)
- **Easing curve**: `ease-out`, `ease-in`, `cubic-bezier(0.4, 0, 0.2, 1)` (use design system tokens)
- **Delay**: 0ms (or stagger pattern for list animations)
- **Trigger**: `on-load`, `on-hover`, `on-click`, `on-scroll`

Example: "Button hover: background-color animates with 200ms ease-out, no delay."

### Asset Export

Every image, icon, and illustration needs:
- **Format**: SVG (icons, logos), WebP (photos), PNG (complex graphics)
- **Size variants**: @1x, @2x for raster; fixed size in px for SVG
- **Naming**: `icon-chevron-right`, `hero-image-mobile`, `illustration-empty-state`
- **Color mode**: RGB, CMYK (if print), or single-color vs. multi-color
- **Transparency**: include alpha channel or opaque background

---

## Workflow Phases

### Phase 1: Inventory

List every unique component, layout pattern, and interaction on the page/screen.

**Deliverable**: Component checklist
- Navigation (header nav, mobile menu, breadcrumb)
- Buttons (primary, secondary, icon, loading state)
- Forms (text input, select, checkbox, radio, textarea)
- Cards (feature card, product card, empty state card)
- Modals (success, error, confirmation)
- Typography (all unique text styles)
- Images (all unique photos/illustrations)
- Sections (hero, features, testimonials, CTA, footer)

### Phase 2: Spec Components

For each component from Phase 1, create a spec sheet:

**Component Spec Sheet Template**:
```
## Button (Primary)

### Dimensions & Spacing
- Height: 44px (space-11)
- Horizontal padding: space-4 (16px)
- Min-width: 120px
- Gap between icon & text: space-2 (8px)

### Typography
- Style: heading-sm (500 weight, 16px, 1.5 line-height)
- Color: white

### Colors
- Background: primary (#2D5A27)
- Hover background: primary-dark (#1A3A16)
- Active background: primary-darker (#0D2A0B)
- Disabled background: neutral-200 (#E0E0E0)
- Disabled text: neutral-500 (#666666)

### States
| State | Background | Text | Cursor | Notes |
|-------|-----------|------|--------|-------|
| default | primary | white | pointer | — |
| hover | primary-dark | white | pointer | scale 98% |
| focus | primary | white | pointer | 2px ring, offset 2px |
| active | primary-darker | white | pointer | pressed 2px inset |
| disabled | neutral-200 | neutral-500 | not-allowed | 40% opacity |

### Animation
- Hover: background-color, 200ms ease-out
- Focus: outline ring, 150ms ease-in-out
- Active: box-shadow inset, 100ms ease-in
```

### Phase 3: Responsive Specifications

Create a responsive behavior table for each major section:

**Responsive Behavior Template**:
```
## Hero Section

| Aspect | 320px | 375px | 768px | 1024px | 1440px |
|--------|-------|-------|-------|--------|--------|
| Layout | single column | single column | grid 2 col | grid 2 col | grid 2 col |
| Padding | space-3 | space-4 | space-6 | space-8 | space-8 |
| Heading size | heading-2 | heading-1 | heading-lg | heading-xl | heading-xl |
| Image | hidden | hidden | 50% width | 50% width | 50% width |
| CTA buttons | stack | stack | inline | inline | inline |
```

### Phase 4: Interaction Specifications

Document every user interaction with animation specs:

**Interaction Spec Template**:
```
## Accordion Open/Close

### Interaction
- Trigger: click on accordion header
- Current state: closed (chevron pointing right)
- After click: opens (chevron points down), content slides in

### Animation
- Property: max-height, opacity
- Duration: 300ms
- Easing: ease-out (cubic-bezier(0.0, 0.0, 0.2, 1))
- Delay: 0ms
- Details: max-height animates from 0 to auto, opacity from 0 to 1

### Reverse
- Closing: same timing, reverse direction
```

### Phase 5: Asset Export

Create an asset manifest:

**Asset Export Checklist**:
```
## Images
- [ ] hero-bg@1x.webp (1440x600, RGB)
- [ ] hero-bg@2x.webp (2880x1200, RGB)
- [ ] hero-mobile.webp (375x300, RGB)
- [ ] feature-icon-1.svg (64x64, single-color, primary)
- [ ] feature-icon-2.svg (64x64, single-color, primary)

## Icons
- [ ] icon-chevron-right.svg (24x24)
- [ ] icon-search.svg (20x20)
- [ ] icon-menu.svg (24x24)
- [ ] logo.svg (160x40, multi-color)

## Naming Convention
- Format: `{type}-{name}[-{variant}][@{density}].{ext}`
- type: icon, hero, illustration, bg, etc.
- name: chevron-right, feature-card, etc.
- variant: mobile, dark, hover (optional)
- density: @1x, @2x (raster only)
```

### Phase 6: Edge Cases & Error States

Document every non-happy-path scenario:

**Edge Cases Template**:
```
## Empty State
- Headline: "No results found"
- Illustration: empty-state-search.svg
- Body text: "Try adjusting your filters or search term"
- CTA: "Clear filters" button

## Error State
- Border: error color (#E53E3E), 2px
- Icon: alert triangle (error)
- Text: error message in error color
- Duration: shown until dismissed or corrected

## Loading State
- Component: disabled (pointer-events: none)
- Spinner: centered, primary color, 24px
- Duration: fade in 150ms, spin at 1 rotation per second
- Alternative: skeleton loader if content can be estimated

## Long Content
- Heading: truncate after 2 lines with ellipsis
- Body: truncate after 3 lines (for card view), unlimited for full view
```

### Phase 7: Review & Sign-Off

Developer checklist:
- [ ] All component states have specs (no guessing)
- [ ] All breakpoints documented (no assumptions about mobile)
- [ ] All animations timed and eased (no placeholder durations)
- [ ] All colors named (no referencing screenshots)
- [ ] All spacing documented as tokens (no measuring pixels)
- [ ] All assets named and formatted (no confusion about versions)
- [ ] All edge cases specified (empty, error, loading, long content)
- [ ] No outstanding questions (specs are complete)

---

## Common Pitfalls

1. **Only speccing the happy path** — Design shows success. Developers need error, loading, empty states too. Spec them.

2. **"Responsive" without specifics** — "Stacks on mobile" is not a spec. Document exactly what changes at each breakpoint.

3. **Missing animation specs** — Say "it fades in" but don't specify duration/easing. Developers guess and get it wrong.

4. **No spacing tokens** — Saying "24 pixels" instead of `space-6`. Developers won't use consistent spacing across components.

5. **Colors referenced from screenshot** — "Use the blue from the hero." Provide hex values and semantic names.

6. **Speccing desktop only** — "Mobile just wraps." Mobile is 70% of traffic. Document every breakpoint.

7. **Interactive states undocumented** — No specs for hover, focus, disabled, loading. Developers ship without them.

8. **Asset chaos** — No naming convention, mixed formats, wrong export density. Developers use wrong assets.

9. **Typography without specs** — "Large text" is not a spec. Reference the type scale.

10. **Forgetting form validation** — Error states, helper text, character counts. These need specs too.

---

## Tools & References

- **Figma Dev Mode**: Inspect colors, spacing, typography directly in Figma. Use it to auto-generate specs.
- **Zeplin**: Annotation and handoff platform. Generates spacing measurements automatically.
- **Storybook**: If components exist, use it as the source of truth for interactive states.
- **Design tokens**: Use a token JSON file as the single source of truth for spacing, colors, typography.

---

## Related Skills

- `figma-pipeline` — Figma to production workflow
- `design-critique` — Review process for design completeness
- `design-qa` — QA checklist for handoff quality
- `component-patterns` — Component library architecture
