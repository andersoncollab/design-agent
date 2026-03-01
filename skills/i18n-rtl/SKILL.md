---
name: i18n-rtl
description: Internationalization and RTL layout patterns — logical properties, bidirectional text, locale-aware typography, number/date formatting, and mirrored UI components for multilingual web apps. Trigger: "i18n design", "RTL layout", "internationalization", "multilingual UI", "bidirectional".
version: 1.0.0
license: MIT
---

## Purpose

You are building interfaces that work seamlessly across languages and writing systems (left-to-right and right-to-left). This skill covers the complete i18n and RTL design system: CSS logical properties, bidirectional text handling, locale-aware typography and spacing, number/date formatting via native APIs, and component mirroring strategies. The goal is a single codebase that adapts fluidly to any language — no separate RTL builds, no hardcoded directions.

**Who uses it**: Front-end developers, design systems leads, product teams scaling to new markets, international SaaS builders.

**When to use it**: Designing component libraries for multilingual apps, setting up CSS for RTL-ready layouts, choosing fonts for Arabic/Hebrew/CJK, implementing date/number formatting, testing layouts with real translated content, defining icon mirroring rules.

## When to Use

- **New design system**: Establish logical properties and RTL patterns from day one.
- **Scaling to Arabic/Hebrew/Persian markets**: Font sizing, line height, text expansion handling.
- **CJK typography**: Different vertical rhythm, larger default sizes, different font families.
- **International forms**: Date/time input, phone number formatting, address field ordering by locale.
- **Component library**: Button, card, nav, sidebar — all must work in LTR and RTL without code duplication.
- **Icon strategy**: Determine which icons mirror and which don't (directional vs. symmetric).
- **Testing**: Validate layouts with real Arabic/Hebrew text, not Lorem Ipsum.

**Not for**: Locale-specific business logic (use i18n libraries like `next-intl` or `i18next`). Translation management (use CAT tools like Crowdin). Currency/tax/regulatory compliance (out of scope).

## Key Concepts

### CSS Logical Properties: The Foundation of i18n Layout

Physical properties (`left`, `right`, `top`, `bottom`) are hardcoded to LTR. Logical properties adapt based on `dir="rtl"`. Learn the mappings:

| Physical | Logical | Meaning |
|----------|---------|---------|
| `margin-left` | `margin-inline-start` | Space on start side (left in LTR, right in RTL) |
| `margin-right` | `margin-inline-end` | Space on end side (right in LTR, left in RTL) |
| `padding-left` | `padding-inline-start` | Padding on start side |
| `padding-right` | `padding-inline-end` | Padding on end side |
| `text-align: left` | `text-align: start` | Align to start (left in LTR, right in RTL) |
| `text-align: right` | `text-align: end` | Align to end (right in LTR, left in RTL) |
| `left: 0` | `inset-inline-start: 0` | Position on start side |
| `right: 0` | `inset-inline-end: 0` | Position on end side |
| `width` | `inline-size` | Horizontal dimension |
| `height` | `block-size` | Vertical dimension |
| `border-left` | `border-inline-start` | Border on start side |
| `border-right` | `border-inline-end` | Border on end side |
| `border-top` | `border-block-start` | Border on top (always top in both LTR and RTL) |
| `border-bottom` | `border-block-end` | Border on bottom (always bottom in both LTR and RTL) |
| `flex-direction: row-reverse` | `flex-direction: row` with `dir="rtl"` | Flex auto-reverses in RTL |

**Rule**: Replace 95% of physical properties. Keep `top` and `bottom` only for vertical-only positioning.

### What Mirrors in RTL vs. What Doesn't

Not everything flips. Critical distinction:

| Component | Mirror? | Why |
|-----------|---------|-----|
| Navigation menu | YES | Entire layout flips left-to-right |
| Breadcrumbs | YES | Order and layout reverse |
| Sidebar | YES | Moves from left (LTR) to right (RTL) |
| Progress bar | YES | Direction of progress reverses |
| Chevron/arrow icons | YES | Direction-specific icons |
| Reply/undo icons | YES | Directional action |
| Checkmark | NO | Universal symbol, not directional |
| Media playback controls | NO | Play, pause, skip are not directional |
| Phone number | NO | Digits stay left-to-right always |
| Clock/timer | NO | Numeric display, not directional |
| Chart/graph | NO | Axes stay consistent |
| Music note icon | NO | Not directional |
| Star/favorite | NO | Universal symbol |

**Decision rule**: Mirror layout and direction-specific affordances. Don't mirror universal symbols or numeric content.

### HTML `dir` Attribute & `:dir()` Pseudo-Class

```html
<!-- Detect language and set direction -->
<html lang="ar" dir="rtl">
<html lang="en" dir="ltr">
<html lang="he" dir="rtl">

<!-- Auto-detect (for mixed content) -->
<html lang="en" dir="auto">
```

Use CSS `:dir()` pseudo-class instead of `[dir="rtl"]`:

```css
/* Old way (still works, but less elegant) */
[dir="rtl"] .navbar { flex-direction: row-reverse; }

/* Modern way */
:dir(rtl) .navbar { flex-direction: row-reverse; }
```

Browser support: Firefox 79+, Chrome 112+. Use `[dir="rtl"]` for older browser support.

### Typography Scaling Across Scripts

Different writing systems need different font sizes and spacing:

| Script | Scale | Line Height | Font Family Strategy |
|--------|-------|-------------|---------------------|
| **Latin (English, German, Spanish)** | 1x (base) | 1.6 | Roboto, Inter, Poppins (sans-serif preferred) |
| **Arabic, Hebrew, Persian** | 1.15-1.25x | 1.8-2.0 | Arabic: DM Sans, Segoe UI, GE Darna; Hebrew: Segoe UI, SuissaBPIntl |
| **Simplified Chinese, Japanese, Korean** | 1.05-1.15x | 1.7-2.0 | Chinese: Noto Sans CJK, Source Han Sans; Japanese: Noto Sans JP; Korean: Noto Sans KR |
| **Devanagari (Hindi, Sanskrit)** | 1.2x | 2.0 | Noto Sans Devanagari |

**Why scale?**: Arabic is more compact horizontally; CJK characters are denser. Scaling improves readability across scripts.

**Implementation**:
```css
/* Base (Latin) */
body { font-size: 16px; line-height: 1.6; }

/* Arabic/Hebrew */
:lang(ar), :lang(he) {
  font-size: 18px;
  line-height: 1.8;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

/* CJK */
:lang(zh), :lang(ja), :lang(ko) {
  font-size: 17px;
  line-height: 1.8;
  font-family: 'Noto Sans CJK SC', sans-serif;
}
```

### Text Expansion & Whitespace

Translated text expands unpredictably:
- **German/Finnish**: 30-40% longer than English
- **French**: 10-15% longer
- **Spanish**: 5-10% longer
- **Chinese**: Often shorter (especially UI labels)

**Never** use fixed-width containers. Always use flexible layouts:

```css
/* WRONG: Fixed width breaks with German/Arabic */
.button { width: 120px; }

/* CORRECT: Flexible with padding */
.button {
  padding-inline: 1rem;
  min-inline-size: fit-content;
}
```

### Native Number & Date Formatting

Use `Intl` API instead of manual formatting:

```javascript
// Numbers
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});
console.log(formatter.format(1234.56)); // "1.234,56 €"

// Dates
const dateFormatter = new Intl.DateTimeFormat('ar-SA', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
console.log(dateFormatter.format(new Date())); // Arabic date

// Relative time ("2 days ago")
const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
console.log(rtf.format(-2, 'day')); // "2 days ago"

// Pluralization rules
const pluralRules = new Intl.PluralRules('en-US');
console.log(pluralRules.select(1)); // "one"
console.log(pluralRules.select(5)); // "other"
```

### Icon Mirroring Strategy

Use CSS transform for directional icons only:

```css
/* Directional icons that should mirror */
:dir(rtl) [data-icon="arrow-right"],
:dir(rtl) [data-icon="chevron-right"],
:dir(rtl) [data-icon="reply"] {
  transform: scaleX(-1);
}

/* Or in Tailwind with a custom variant */
@layer utilities {
  @variant rtl {
    @supports selector(:dir(rtl)) {
      &:dir(rtl) { @content; }
    }
  }
}

/* Usage */
<svg class="rtl:scale-x-[-1]" data-icon="arrow-right" />
```

### Flexbox & Grid in RTL

Flexbox and Grid auto-adapt to `dir="rtl"`. No extra CSS needed:

```css
/* Flexbox auto-reverses in RTL */
.navbar { display: flex; gap: 1rem; }
/* In RTL, items are reversed automatically */

/* Grid column order reverses in RTL */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); }
/* In RTL, items flow right-to-left, columns reorder automatically */

/* Explicit grid placement works correctly too */
.grid-item { grid-column: 2 / 3; } /* Column 2 in both LTR and RTL */
```

---

## Instructions

### Pattern 1: RTL-Ready Component (Button)

Build a button that works in both LTR and RTL without conditional code.

```tsx
// Button.tsx
export function Button({ icon, label, ...props }) {
  return (
    <button
      className="
        flex items-center gap-2
        px-4 py-2 rounded-md
        bg-blue-600 text-white
        hover:bg-blue-700 active:scale-95
        transition-colors
        [dir=rtl]:flex-row-reverse
      "
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

// Usage: Works in both LTR and RTL
<Button icon={<ArrowRight />} label="Next" />
```

**Key principle**: Use logical properties, let Flexbox handle reversal, no hardcoded `left`/`right`.

---

### Pattern 2: Navbar with Icon Mirroring

Navigation that reverses in RTL, with directional icons that mirror.

```tsx
export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">Logo</div>

      <ul className="flex gap-8 [dir=rtl]:flex-row-reverse">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <button className="flex items-center gap-2">
        <svg
          className="w-5 h-5 [dir=rtl]:scale-x-[-1]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Chevron right icon */}
          <path d="M9 6l6 6-6 6" />
        </svg>
        <span>Menu</span>
      </button>
    </nav>
  );
}
```

---

### Pattern 3: Locale-Aware Typography Setup

Configure font and spacing scales per script.

```tsx
// globals.css
:root {
  /* Latin (default) */
  --font-size-base: 16px;
  --line-height-base: 1.6;
}

/* Arabic/Hebrew */
:lang(ar), :lang(he), :lang(fa) {
  --font-size-base: 18px;
  --line-height-base: 1.8;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
}

/* Simplified Chinese */
:lang(zh-Hans) {
  --font-size-base: 17px;
  --line-height-base: 1.8;
  font-family: 'Noto Sans CJK SC', sans-serif;
}

/* Japanese */
:lang(ja) {
  --font-size-base: 17px;
  --line-height-base: 1.8;
  font-family: 'Noto Sans JP', sans-serif;
}

/* Korean */
:lang(ko) {
  --font-size-base: 17px;
  --line-height-base: 1.8;
  font-family: 'Noto Sans KR', sans-serif;
}

body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}
```

---

### Pattern 4: Number & Date Formatting in React

Use Intl API for all locale-aware formatting.

```tsx
import { useMemo } from 'react';

export function FormattedPrice({ amount, locale = 'en-US', currency = 'USD' }) {
  const formatted = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);
  }, [amount, locale, currency]);

  return <span>{formatted}</span>;
}

export function FormattedDate({ date, locale = 'en-US' }) {
  const formatted = useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }, [date, locale]);

  return <span>{formatted}</span>;
}

export function RelativeTime({ date, locale = 'en-US' }) {
  const formatted = useMemo(() => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return rtf.format(-diffDays, 'day');
  }, [date, locale]);

  return <span>{formatted}</span>;
}

// Usage
<FormattedPrice amount={1234.56} locale="de-DE" currency="EUR" />
<FormattedDate date={new Date()} locale="ar-SA" />
<RelativeTime date={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)} locale="en-US" />
```

---


### Pattern 6: Testing Checklist

Validate RTL implementation: `dir="rtl"` attribute set, no physical properties, logical properties used, directional icons mirror, universal icons don't, real localized text tested (Arabic/Hebrew/German), date/number formatting via Intl API, font sizes 20% larger for Arabic, flex/grid auto-reversal working.

---

## Examples

### Example 1: Complete Multilingual Card Component

```tsx
// Card.tsx
export function Card({ title, price, date, locale = 'en-US' }) {
  return (
    <article
      className="
        border rounded-lg p-6
        border-gray-200
        max-w-sm
      "
    >
      {/* Heading (auto-reverses in RTL navbar) */}
      <h3 className="text-lg font-bold mb-4">{title}</h3>

      {/* Use logical properties for spacing */}
      <p className="text-gray-600 mb-6 [dir=rtl]:text-gray-600">
        {/* Directional arrow icon mirrors in RTL */}
        <svg className="w-5 h-5 inline [dir=rtl]:scale-x-[-1] me-2">
          <path d="M9 6l6 6-6 6" />
        </svg>
        Details available
      </p>

      {/* Formatted price (locale-aware) */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="font-semibold">
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'USD'
          }).format(price)}
        </span>

        {/* Formatted date (locale-aware) */}
        <time className="text-sm text-gray-500">
          {new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric'
          }).format(new Date(date))}
        </time>
      </div>
    </article>
  );
}

// Usage
<Card
  title="Product Name"
  price={129.99}
  date={new Date()}
  locale="ar-SA"
/>
```

---


## Common Pitfalls

1. **Using physical properties instead of logical** — App breaks when `dir="rtl"` is applied. **Fix**: Replace all `left`/`right` with `inline-start`/`inline-end`, `top`/`bottom` stay same.

2. **Hardcoded `text-align: left`** — Text stays left-aligned in RTL. **Fix**: Use `text-align: start` or remove alignment (default is `start`).

3. **Testing with Lorem Ipsum instead of real text** — Text expansion and typography issues only appear with actual translated content. **Fix**: Test with real Arabic, Hebrew, German, CJK text early and often.

4. **Mirroring icons that shouldn't** — Checkmarks and play buttons get flipped unnecessarily. **Fix**: Only mirror directional icons (arrow, chevron, reply, undo). Keep symmetric icons unmirrored.

5. **Fixed-width containers** — German text overflows because it's 30-40% longer. **Fix**: Use flexible containers with `min-width` only when necessary. Let content flow naturally.

6. **Forgetting `lang` attribute** — Screen readers don't know pronunciation, Intl API doesn't apply locale formatting. **Fix**: Set `<html lang="ar">` for RTL, ensures both visual and programmatic direction.

7. **Not handling text expansion** — UI breaks with translated content. **Fix**: Design layouts for +40% text expansion (worst case German).

8. **Applying `flex-direction: row-reverse` manually** — Unnecessary code, Flexbox handles it with `dir="rtl"`. **Fix**: Use `flex` with standard `flex-direction: row`, let `dir` attribute handle reversal.

9. **No font scaling for Arabic/CJK** — Text becomes hard to read. **Fix**: Scale fonts by ~20% for Arabic, adjust line height to 1.8-2.0.

10. **Hardcoding number/date formats** — Formats differ by locale (German: "1.234,56", US: "1,234.56"). **Fix**: Use `Intl.NumberFormat`, `Intl.DateTimeFormat`, never manual string formatting.

---

## References

- **MDN Logical Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
- **W3C i18n Guidelines**: https://www.w3.org/International/questions/qa-html-dir
- **RTL Styling**: https://rtlstyling.com
- **Intl API Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
- **Font Recommendations**: https://www.fonts.com/articles/arabic-typography-basics
- **Related Skills**: `responsive-patterns`, `typography-pairing`, `accessibility-system`, `design-tokens`
