---
name: accessibility-system
description: Complete accessibility design system for building genuinely accessible products. Covers focus management, screen reader strategies, ARIA patterns, keyboard navigation, landmark roles, form error handling, color contrast, automated testing integration. Goes beyond WCAG checklists to deep-dive on screen reader UX, focus trapping, live regions, and testing workflows. Includes keyboard navigation matrix, landmark role table, contrast ratio reference. Trigger: "accessibility", "screen reader", "WCAG", "focus management", "ARIA", "inclusive design", "accessible forms".
version: 1.0.0
license: MIT
---

## Purpose

You are an accessibility specialist building inclusive digital experiences, not just checking WCAG compliance boxes. This skill covers the complete accessibility design system: focus management, screen reader navigation patterns, ARIA semantics, keyboard-only navigation, form error handling, color-independent design, and automated testing integration. Target WCAG 2.2 AA (minimum) with AAA considerations. Emphasize that accessibility is a design principle, not a feature bolted on at the end.

**Who uses it**: Front-end developers, product designers, design systems leads, QA engineers testing accessibility.

**When to use it**: Building accessible component libraries, designing forms and modals, setting up keyboard navigation, creating skip links, implementing focus traps, testing with axe-core and screen readers, ensuring color-independent design.

## When to Use

- **New component library**: Establish focus management, keyboard nav, ARIA patterns from the start.
- **Form redesign**: Implement accessible form controls, error handling, live region announcements.
- **Modal/dialog**: Focus trapping, announce content to screen readers, restore focus on close.
- **Navigation**: Landmark roles, skip links, keyboard focus order, screen reader landmarks.
- **Color-coded information**: Pair with icons, text labels, patterns (never color alone).
- **Design system tokens**: Define focus ring colors, high-contrast modes, reduced-motion alternatives.
- **Testing audit**: Run axe-core scans, Lighthouse accessibility checks, manual screen reader testing.

**Not for**: Legal compliance audits (hire a lawyer). One-off fixes (implement systematically). Ignoring actual user needs for checklist compliance.

## Key Concepts

### Accessibility is Design, Not an Afterthought

Accessibility improves UX for everyone: keyboard navigation helps power users, clear focus rings help low-vision users, semantic HTML helps screen readers (and SEO). Build it in from day one.

### The Four WCAG Principles (POUR)

| Principle | Meaning | Example |
|-----------|---------|---------|
| **Perceivable** | Users can see/hear all content | Text contrast ≥4.5:1, alt text for images |
| **Operable** | Users can navigate with keyboard or assistive tech | Tab order, skip links, no keyboard traps |
| **Understandable** | Users understand content and interactions | Clear labels, error messages, consistent navigation |
| **Robust** | Works across browsers, devices, assistive technologies | Valid HTML, ARIA roles + properties |

### Screen Reader User Model

Screen reader users navigate **by structure, not visually**. They:
- Skim by heading hierarchy (press 1/2/3 to jump to h1/h2/h3)
- Use landmark shortcuts (banner, nav, main, complementary, footer)
- Tab through interactive elements (buttons, links, form controls)
- Use search to find text

**Implication**: Your heading hierarchy and landmark roles define their experience. Without them, a screen reader user is lost.

### Focus Management (The Most Critical Accessibility Concern)

When content changes dynamically (modals, SPAs, form validation), focus MUST be managed programmatically:

1. **Save the trigger element** (the button that opened the modal)
2. **Move focus to the modal** (typically the close button or first focusable element)
3. **Trap focus inside** (Tab cycles within the modal, doesn't escape)
4. **Restore focus on close** (return to the trigger element)

Without focus management, keyboard users can't interact with modals. Without announcements, screen reader users don't know what happened.

### Landmark Roles: The Screen Reader's GPS

Semantic HTML elements automatically get landmark roles. Use them:

| HTML Element | Implicit ARIA Role | Purpose | When to Use |
|---|---|---|---|
| `<header>` (outside `<article>`/`<section>`) | `banner` | Site-wide header (logo, main nav) | Top of page |
| `<nav>` | `navigation` | Navigation links | Primary and secondary nav |
| `<main>` | `main` | Primary content region | Exactly ONE per page |
| `<aside>` | `complementary` | Sidebar, related content | Next to main content |
| `<footer>` (outside `<article>`/`<section>`) | `contentinfo` | Site-wide footer (copyright, links) | Bottom of page |
| `<section>` + `aria-label` | `region` | Named section | When section needs a name |
| `<form>` + `aria-label` | `form` | Form container | When form name isn't clear |
| No element, use `role="search"` | `search` | Search box/form | Top nav search |

**Rule**: Only ONE `<main>` per page. All others can be multiple.

---

## Instructions

### Pattern 1: Skip Link (Very First Element in Body)

Allow keyboard users to jump past navigation straight to main content.

```html
<a href="#main-content"
   class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
          focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:text-black">
  Skip to main content
</a>

<!-- Navigation -->
<nav>...</nav>

<!-- Main content -->
<main id="main-content">...</main>
```

**CSS for sr-only (screen reader only)**:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
}
```

**How it works**:
- Hidden by default (sr-only)
- First focusable element (when you Tab, you see it)
- Click or press Enter to jump to main content
- Keyboard users love this

---

### Pattern 2: Heading Hierarchy (Critical for Screen Reader Navigation)

Screen readers let users skim by heading level. Get it wrong, they're lost.

```html
<!-- CORRECT -->
<h1>Page Title</h1>

<section>
  <h2>Main Section</h2>
  <p>Content...</p>

  <h3>Subsection</h3>
  <p>Content...</p>
</section>

<section>
  <h2>Another Section</h2>
  <p>Content...</p>
</section>

<!-- WRONG (never skip levels) -->
<h1>Page Title</h1>
<h3>Section (should be h2)</h3>

<!-- WRONG (multiple h1s) -->
<h1>Page Title</h1>
<h1>Another Title (should be h2)</h1>
```

**Screen reader UX**:
- User presses H to hear all headings (skim mode)
- Jumping levels confuses the outline
- Multiple h1s makes page structure ambiguous

**Heading Hierarchy Reference**:

| Level | Purpose | Count Per Page |
|-------|---------|---|
| h1 | Main page title | Exactly 1 |
| h2 | Major section | Multiple OK |
| h3 | Subsection | Under h2 only |
| h4+ | Deep nesting | Rare |

---

### Pattern 3: Focus Management for Modals (React Example)

When a modal opens, trap focus inside and restore on close.

```tsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const firstFocusRef = useRef(null);

  // 1. Save trigger, move focus to modal on open
  useEffect(() => {
    if (isOpen) {
      // Save the element that triggered the modal
      triggerRef.current = document.activeElement;
      // Move focus to close button (or first focusable element)
      closeRef.current?.focus();
    } else {
      // On close, return focus to trigger
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // 2. Trap focus inside modal (Tab cycles within)
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      closeRef.current?.parentElement
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
         onKeyDown={handleKeyDown}
         className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md relative">
        <h2 id="modal-title" className="text-xl font-bold mb-4">Modal Title</h2>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
```

**Key props**:
- `role="dialog"` — Tells screen reader this is a modal
- `aria-modal="true"` — Announces modal state
- `aria-labelledby="modal-title"` — Links heading to dialog
- `onKeyDown` trap — Tab cycles, Escape closes

---

### Pattern 4: ARIA Live Regions (Dynamic Announcements)

Announce dynamic content changes to screen readers without user input.

```html
<!-- Polite (normal updates, wait for speech to finish) -->
<div aria-live="polite" aria-atomic="true" id="cart-message">3 items added</div>

<!-- Assertive (errors, interrupt immediately) -->
<div role="alert" aria-live="assertive" id="error-message">Error: Invalid email</div>
```

**Update via JavaScript**: `document.getElementById('cart-message').textContent = '5 items added'` — screen reader announces immediately.

**When to use**: `aria-live="polite"` for status updates, `role="alert"` for errors. Use `aria-atomic="true"` to announce entire region.

---

### Pattern 5: Accessible Form Validation

Link errors to fields, announce via aria-invalid and live regions.

```html
<form>
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="email-error" aria-invalid="false" />
  <p id="email-error" role="alert"><!-- Error message here --></p>

  <div role="alert" aria-live="assertive" id="error-summary"></div>
  <button type="submit">Submit</button>
</form>
```

**JavaScript**: On invalid input, set `aria-invalid="true"`, update error message, focus field.

**Key techniques**: `aria-describedby` (links error), `aria-invalid` (announces state), `role="alert"` (announces immediately), focus field (directs attention).

---

### Pattern 6: Keyboard Navigation Matrix

Reference for keyboard interactions by component type.

| Component | Tab | Enter/Space | Escape | Arrow Keys | Other |
|---|---|---|---|---|---|
| **Button** | Focus | Activate | — | — | — |
| **Link** | Focus | Navigate | — | — | — |
| **Modal** | Focus trap | — | Close | — | — |
| **Dropdown Menu** | Focus trigger | Open menu | Close menu | Navigate options | Home/End (jump) |
| **Tabs** | Focus tab list | Select tab | — | Switch tabs (→/←) | Home/End (jump tabs) |
| **Accordion** | Focus header | Toggle | — | — | — |
| **Combobox** | Focus input | Open list | Close | Navigate options | Type to search |
| **Checkbox** | Focus | Toggle | — | — | — |
| **Radio Group** | Focus first | Select | — | Navigate options (→/↓) | — |
| **Horizontal Menu** | Focus items | Activate | — | Navigate (→/←) | Home/End |

**Implementation example** (Dropdown):
```tsx
function Dropdown({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      // Navigate options
      e.preventDefault();
      // Focus next/prev item
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown}>
        {trigger}
      </button>
      {isOpen && (
        <ul role="menu">
          {items.map(item => (
            <li key={item.id} role="menuitem">
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

### Pattern 7: Color-Independent Design

Never use color alone. Always pair with icon, text, or pattern.

```html
<!-- WRONG: color only -->
<div class="text-red-600">Error</div>

<!-- CORRECT: color + icon + text -->
<div class="flex items-center gap-2 text-red-600">
  <svg class="w-5 h-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
  </svg>
  <span>Error: Please correct the field above</span>
</div>

<!-- Status indicators (traffic light) -->
<div class="flex items-center gap-2">
  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
  <span>Active</span>
</div>

<!-- Colorblind-safe palette -->
<!-- Use blues/oranges (safe for red-green blindness) -->
<!-- Avoid red/green in pairs without extra markers -->
```

**Colorblind-safe palette reference**:
- **All-colorblind**: Gray/white/black (always safe)
- **Red-green blindness** (most common): Use blue/orange, add icons
- **Blue-yellow blindness**: Use red/cyan, add patterns

---

### Pattern 8: Automated Testing Integration

Wire accessibility checks into your workflow.

**Tools**:
- **axe-core**: `npm install @axe-core/react` → Scans for violations
- **eslint-plugin-jsx-a11y**: `npm install eslint-plugin-jsx-a11y` → Static analysis (missing labels, alt text, roles)
- **Lighthouse**: Chrome DevTools → Accessibility audit → Target ≥90
- **Manual**: Tab through page, test with screen reader (VoiceOver/NVDA), test keyboard-only

---

## Examples

### Example 1: Accessible Contact Form

Combines skip link, heading hierarchy, proper labels, error handling, and focus management.

```html
<a href="#form-content" class="sr-only focus:not-sr-only">Skip to form</a>

<h1>Contact Us</h1>

<form id="form-content" aria-label="Contact form">
  <div role="alert" aria-live="assertive" id="error-summary" class="hidden bg-red-50 border border-red-300 rounded p-4 mb-4">
    <!-- Errors shown here -->
  </div>

  <fieldset class="mb-4">
    <label for="email" class="block font-semibold mb-1">Email <span aria-label="required">*</span></label>
    <input id="email" type="email" required aria-describedby="email-error" aria-invalid="false"
           class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"/>
    <p id="email-error" class="text-red-600 text-sm mt-1" role="alert"></p>
  </fieldset>

  <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2">Send</button>
</form>
```

**Key patterns**: Skip link + h1, labeled inputs, error summary live region, aria-invalid state, focus ring on button.

---

### Example 2: Accessible Modal Dialog (React)

Focus management pattern with trap and restore.

```tsx
import { useEffect, useRef, useState } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      closeRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
         className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 id="modal-title" className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <button ref={closeRef} onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}
```

**Key patterns**: Focus save/restore, focus trap, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

---

## Common Pitfalls

1. **Using `div` with `onClick` instead of `<button>`** — No keyboard/screen reader support. **Fix**: Use semantic `<button>` or add `role="button"`, `tabindex="0"`, keyboard handlers.

2. **Missing heading hierarchy** — Screen reader skimming fails. **Fix**: Single h1, nested h2/h3/h4, never skip levels.

3. **Focus trap not implemented in modals** — Focus escapes behind modal. **Fix**: Trap focus, move on open, restore on close (see Pattern 3).

4. **Overusing `aria-label`** — Overrides visible text, creating mismatch. **Fix**: Use `aria-labelledby` for visible text, `aria-label` only for icons/unlabeled buttons.

5. **Color-only error indicators** — Colorblind users can't see errors. **Fix**: Pair color with icon, text ("Error:"), or pattern.

6. **Placeholder as label** — Disappears on input, users forget field purpose. **Fix**: Use `<label>`. Placeholder is hint only.

7. **`tabindex="1"` or higher** — Breaks natural tab order. **Fix**: Use `tabindex="0"` (focusable) or `tabindex="-1"` (programmatic focus only).

8. **No `prefers-reduced-motion`** — Motion sickness risk. **Fix**: Wrap animations in `@media (prefers-reduced-motion: reduce)`.

9. **No alt text or excessive alt text** — Broken UX for screen readers. **Fix**: 1-2 sentences describing purpose. Use `alt=""` for decorative images.

10. **No focus ring styles** — Keyboard users can't see focus. **Fix**: Define focus ring (outline, shadow, border). Use focus-visible for mouse users.

## References

- **WCAG 2.2 Quick Reference**: https://www.w3.org/WAI/WCAG22/quickref/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **axe-core**: https://github.com/dequelabs/axe-core
- **MDN ARIA Practices**: https://www.w3.org/WAI/ARIA/apg/
- **Related Skills**: `color-system`, `component-patterns`
