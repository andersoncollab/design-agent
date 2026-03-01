---
name: component-patterns
description: Best practices for 60+ UI components from component.gallery (95 design systems, 2,676 examples). Covers anatomy, states, accessibility, and anti-patterns. Trigger: "component best practices", "design system", "UI pattern", "component accessibility", "state management".
version: 1.0.0
license: MIT
---

# Component Patterns Skill

## Purpose

This skill provides production-ready best practices for building accessible, consistent, well-designed UI components. It synthesizes guidance from 95+ design systems (Shopify Polaris, IBM Carbon, Atlassian, Material Design, Radix, shadcn/ui) and covers the 20 most-used components across 7 categories. Each component includes anatomy, states, accessibility requirements, and anti-patterns to avoid.

## When to Use

- **Designing a new component**: Build anatomy, define states, ensure accessibility
- **Reviewing component code**: Check against state machine and ARIA requirements
- **Building a design system**: Use these patterns as baseline for consistency
- **Component library selection**: Evaluate against accessibility and anatomy standards
- **Documenting components**: Reference states, roles, and keyboard behavior
- **QA testing**: Verify all states exist and keyboard navigation works

Trigger phrases: "what states should this have?", "component accessibility", "ARIA roles", "keyboard navigation", "component anatomy".

## Key Concepts

### Component Anatomy
Every component has discrete parts (slots):
- **Container/Root**: Outer wrapper with sizing, padding, background
- **Label**: Text describing the component (often associated via `htmlFor`)
- **Control/Input**: Interactive element (button, input, etc.)
- **Icon/Visual**: Optional icon or indicator
- **Help Text**: Descriptive text or error message
- **Feedback State**: Visual indicator (checkmark, error icon, loading spinner)

**Example**: A text input has label, input field, help text slot, error text slot, and optional icon.

### Component States
Every interactive component must have these states defined:

| State | When | Visual | Keyboard | ARIA |
|-------|------|--------|----------|------|
| **Default** | Renders normally | Base styling | Focusable | No special role |
| **Hover** | Mouse over (not touch) | Subtle color/shadow change | N/A | No change |
| **Focus** | Keyboard/programmatic focus | Visible focus ring (2-3px) | Via Tab/click | `aria-focus` implicit |
| **Active/Pressed** | Currently selected or toggled | Pressed appearance | Via Enter/Space | `aria-pressed="true"` |
| **Disabled** | Cannot interact | Muted color, no pointer | Cannot focus | `disabled` attr + `aria-disabled="true"` |
| **Error/Invalid** | Validation failure | Red border, error icon | N/A | `aria-invalid="true"` |
| **Loading** | Async operation in progress | Spinner, dimmed input | Cannot interact | `aria-busy="true"` |
| **Readonly** | Cannot change value | Muted appearance | Can focus, cannot edit | `readonly` attr |

### Accessibility Requirements
- **Focus management**: Every interactive element must be reachable via Tab key
- **Focus indicator**: Visible 2-3px outline (don't remove browser outline without replacing)
- **ARIA roles**: Use semantic HTML (`<button>`, `<input>`) instead of custom roles when possible
- **ARIA labels**: Hidden text for icon-only buttons (`aria-label`)
- **Keyboard support**: Enter/Space for buttons, arrows for selects, Escape for dismissable
- **Color contrast**: Text must have 4.5:1 contrast (WCAG AA), 7:1 for AAA
- **Semantic HTML**: Use native elements (`<button>`, `<label>`) not `<div>` + custom roles

### Anti-patterns
1. **Custom components when native exists**: Building custom select when `<select>` exists
2. **Removing focus outlines**: Deleting `:focus-visible` styles without replacement
3. **Ignoring disabled state**: No visual difference between disabled/enabled
4. **Icon-only without labels**: Icon buttons without `aria-label`
5. **Color-only feedback**: Relying on color alone for error state (add icon/text)
6. **Inconsistent states**: Button has 4 states, input has 2 — use same state set
7. **Keyboard traps**: Focus can't escape a component (modal without Escape handler)

## 20 Most-Used Components

### 1. Button

**Purpose**: Trigger actions, submit forms, navigate.

**Anatomy**:
- Root container (with hover/active background)
- Icon slot (optional, left or right)
- Text label (required for accessibility)
- Loading spinner (optional, replaces icon during submission)

**States**: default, hover, focus, active, disabled, loading

**Accessibility**:
- Native `<button>` element
- `aria-label` for icon-only buttons
- `aria-disabled="true"` + `disabled` for disabled state
- `aria-busy="true"` during loading
- Keyboard: Enter/Space to activate

**Anti-patterns**:
- `<div onclick="">` instead of `<button>`
- Icon-only without `aria-label`
- No focus ring
- Disabled button that's still clickable

**Design System Examples**: Polaris button variants (primary/secondary/tertiary/danger), Carbon buttons with icons.

---

### 2. Text Input / Input Field

**Purpose**: Capture single-line text (names, emails, searches).

**Anatomy**:
- Label (associated via `htmlFor`)
- Input element with placeholder
- Optional icon (left or right)
- Help text (below input)
- Error message (replaces help text on error)
- Character count (optional)

**States**: default, hover, focus, filled, disabled, error, readonly

**Accessibility**:
- `<input>` with `type="text"`
- `<label htmlFor="input-id">` — required, not placeholder
- `aria-describedby="help-text-id"` to link help text
- `aria-invalid="true"` + error role on error
- Keyboard: Tab to focus, Shift+Tab to blur

**Anti-patterns**:
- Placeholder instead of label (disappears on focus, breaks accessibility)
- No help text (users unsure what to enter)
- Error message floats without association
- No visual focus indicator

**Design System Examples**: Shopify Polaris TextInput, Material TextField.

---

### 3. Select / Dropdown

**Purpose**: Choose one option from a list.

**Anatomy**:
- Label
- Trigger button (shows selected value)
- Dropdown menu/listbox (hidden until opened)
- Menu items (with optional icons)
- Optional search/filter input
- Help text

**States**:
- Default (closed, showing selected)
- Open (menu visible)
- Hover item (in menu)
- Selected (checkmark or highlight)
- Disabled item (unclickable, muted)
- Focused (on trigger or menu item)

**Accessibility**:
- Use native `<select>` for simple lists (no custom role needed)
- For custom dropdowns: `role="listbox"` on menu, `role="option"` on items
- `aria-expanded="true/false"` on trigger
- `aria-selected="true"` on selected item
- Keyboard: Arrow keys to navigate items, Enter to select, Escape to close
- Menu items reachable via Tab (manage focus in menu)

**Anti-patterns**:
- Custom select without arrow key support
- No selected item highlighting
- Focus lost when menu opens
- Overflow menu without scroll

**Design System Examples**: Radix Select, Polaris Select, Carbon Dropdown.

---

### 4. Checkbox

**Purpose**: Select multiple items from a list.

**Anatomy**:
- Checkbox input (visual box)
- Label text (clickable)
- Optional help text

**States**: unchecked, checked, indeterminate (mixed group), disabled, focus

**Accessibility**:
- `<input type="checkbox">` with `<label htmlFor="">`
- `aria-checked="true/false/mixed"` (auto via type="checkbox")
- `aria-label` if no visible label
- Keyboard: Space to toggle

**Anti-patterns**:
- Label not clickable (only checkbox itself)
- No indeterminate state for group select-all
- No focus ring on checkbox itself
- Custom styling breaks pointer target size

**Design System Examples**: Polaris Checkbox, Material Checkbox, shadcn/ui Checkbox.

---

### 5. Radio Button

**Purpose**: Select one item from a mutually exclusive list.

**Anatomy**:
- Radio input (circular, filled when selected)
- Label text
- Optional help text
- Grouped in `<fieldset>` with `<legend>`

**States**: unchecked, checked, disabled, focus

**Accessibility**:
- `<input type="radio">` with `<label htmlFor="">`
- Grouped in `<fieldset>` with `<legend>` describing the group
- `name="group"` same for all in group
- Keyboard: Arrow keys to navigate group, Space to select

**Anti-patterns**:
- Radios not grouped in fieldset/legend
- No legend text (users unsure what they're selecting)
- Focus ring missing
- Custom styling breaks touch target (min 44×44px)

**Design System Examples**: Polaris RadioButton, Material Radio.

---

### 6. Toggle / Switch

**Purpose**: Turn a single setting on/off.

**Anatomy**:
- Circular thumb (slides left/right or up/down)
- Background track (changes color on toggle)
- Optional label (left or right)
- Optional help text

**States**: off, on, disabled, focus

**Accessibility**:
- `<input type="checkbox">` styled as toggle (or `role="switch"`)
- `aria-checked="true/false"` (auto via checkbox)
- `aria-label` if no visible label
- Keyboard: Space to toggle

**Anti-patterns**:
- No focus ring on thumb
- Insufficient color contrast between on/off states
- Too small to tap (min 44×44px)
- No keyboard support

**Design System Examples**: Shopify Polaris Toggle, Material Switch.

---

### 7. Textarea

**Purpose**: Multi-line text input (messages, descriptions, feedback).

**Anatomy**:
- Label
- Textarea element
- Character count (optional, shows "123 / 500")
- Help text
- Error message
- Resize handle (optional)

**States**: default, focus, filled, disabled, error, readonly

**Accessibility**:
- `<textarea>` with `<label htmlFor="">`
- `aria-describedby` for help text
- `aria-invalid="true"` on error
- Keyboard: Tab to navigate, arrows within field, no Enter to submit (unless button)

**Anti-patterns**:
- No character limit (users unsure how much to write)
- No label (placeholder only)
- Resize disabled (users can't adjust)
- No error message space (layout shifts on error)

**Design System Examples**: Polaris TextField with `multiline`, Material TextareaAutosize.

---

### 8. Dropdown Menu (Action Menu)

**Purpose**: Show action options (edit, delete, share) tied to an item.

**Anatomy**:
- Trigger button (often three dots: ⋮)
- Menu container (dropdown list)
- Menu items (with icons, labels, optional keyboard shortcuts)
- Dividers (optional, group related items)
- Disabled items (grayed out)

**States**: closed, open, hover item, focused item, disabled item

**Accessibility**:
- `role="button"` on trigger or native `<button>`
- `role="menu"` on container
- `role="menuitem"` on items
- `aria-expanded="true/false"` on trigger
- `aria-disabled="true"` on disabled items
- Keyboard: Arrow keys to navigate, Enter to activate, Escape to close
- Focus management: Move focus into menu when opened

**Anti-patterns**:
- Menu items not keyboard accessible
- Escape doesn't close menu
- Focus lost after selecting item
- Menu overlaps trigger button with no scroll

**Design System Examples**: Radix DropdownMenu, Polaris ActionList, Material Menu.

---

### 9. Modal / Dialog

**Purpose**: Focus user attention on critical decision or form (delete confirmation, login, settings).

**Anatomy**:
- Backdrop (semi-transparent, closes on click if dismissable)
- Modal container (centered card)
- Header (title, optional close button)
- Body (content, form, text)
- Footer (action buttons: cancel, confirm)
- Close button (top-right, always present or in header)

**States**: closed, open, has-focus-trap, error (form error in modal)

**Accessibility**:
- `role="dialog"` + `aria-modal="true"` on modal
- `aria-labelledby` to header title
- **Focus trap**: Keep focus within modal (Tab cycles through buttons)
- **Escape to close**: Dismissable modals close on Escape
- **Return focus**: Return focus to trigger button after close
- Backdrop click closes only if dismissable
- `role="alertdialog"` for destructive actions (delete confirm)

**Anti-patterns**:
- No focus trap (Tab escapes modal)
- Escape doesn't close
- Focus lost after close
- Scrollable body without visible scroll indicator
- Close button not obvious

**Design System Examples**: Radix Dialog, Polaris Modal, Material Dialog.

---

### 10. Toast / Snackbar

**Purpose**: Brief notification (success, error, info) that auto-dismisses.

**Anatomy**:
- Icon (checkmark, error, info, warning)
- Message text
- Optional action button (e.g., "Undo")
- Close button (optional, always dismissable)
- Auto-dismiss timer

**States**: entering (slide in), visible, exiting (slide out), has-action

**Accessibility**:
- `role="alert"` for errors/warnings (auto-announces)
- `role="status"` for info/success (announces after page loads)
- `aria-live="polite"` (auto-announce to screen readers)
- `aria-atomic="true"` (announce full toast, not just change)
- Auto-dismiss time: min 5 seconds (accessible users need time to read)

**Anti-patterns**:
- Auto-dismiss too fast (< 3 sec)
- No close button
- Multiple toasts stack off-screen
- No role/aria-live (screen reader users miss notification)
- Error toasts not dismissable

**Design System Examples**: Radix Toast, Material Snackbar, Shopify Polaris Toast.

---

### Components 11-20

See `references/component-catalog.md` for full specs on: Accordion, Tabs, Breadcrumb, Tooltip, Badge/Tag, Progress Bar, Spinner, Card, Alert/Banner, Pagination.

---

## References & Design Systems

### 20 Most-Referenced Design Systems
1. **Shopify Polaris** — Comprehensive, e-commerce focused, excellent accessibility
2. **IBM Carbon** — Enterprise, dark mode, strict accessibility
3. **Atlassian Design System** — Clean, practical, product-focused
4. **Material Design 3** — Google, extensive, very detailed
5. **Radix UI** — Headless, accessible primitives, framework agnostic
6. **shadcn/ui** — React + Tailwind, copy-paste components
7. **Ant Design** — Enterprise, Chinese-friendly, 100+ components
8. **Bootstrap** — Lightweight, CSS-first, widely compatible
9. **Chakra UI** — React, accessible, component composition
10. **Mantine** — React, hooks-driven, modern

### Key Resources
- **Component.gallery**: 95 design systems, 2,676 component examples — [component.gallery](https://component.gallery/)
- **WAI-ARIA Authoring Practices**: Keyboard patterns & roles — [w3c.github.io/aria-practices](https://www.w3.org/WAI/ARIA/apg/)
- **WCAG 2.1**: Accessibility guidelines — [wcag.w3.org](https://www.w3.org/WAI/WCAG21/quickref/)
- **Accessible Rich Internet Applications (ARIA)**: Full spec — [w3c.github.io/aria](https://w3c.github.io/aria/)
- **Focus management patterns**: [smashingmagazine.com/focus](https://www.smashingmagazine.com/2020/02/focus-management-care/)

## Example: Card Component

A production-ready card component with proper states, accessibility, and responsive behavior:

```tsx
interface CardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  isSelected?: boolean;
}

export function Card({ title, description, image, href, isSelected }: CardProps) {
  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      href={href}
      className={`group rounded-lg border-2 transition-all ${
        isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
      } ${href ? 'cursor-pointer' : ''}`}
      aria-selected={isSelected}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-sm" />
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        {href && (
          <span className="mt-4 inline-flex text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
            Learn more →
          </span>
        )}
      </div>
    </Tag>
  );
}
```

Implements states (default, hover, selected), accessibility (semantic HTML, aria-selected), responsive behavior (image scaling), and hover animation. The component adapts tag type based on whether it's clickable.

## Testing Checklist

For any new component, verify:

- [ ] **Anatomy**: All parts identified and correctly named
- [ ] **States**: Default, hover, focus, active, disabled, error all defined and distinct
- [ ] **Keyboard**: Tab reaches component, arrow keys work, Enter/Space activates
- [ ] **Focus ring**: Visible 2-3px outline, no outline removed without replacement
- [ ] **ARIA roles**: Semantic HTML used, roles only when needed
- [ ] **Labels**: All inputs have labels (not just placeholders)
- [ ] **Color contrast**: 4.5:1 minimum, 7:1 for large text
- [ ] **Touch targets**: Min 44×44px for touch targets
- [ ] **Mobile**: Component works at 375px width
- [ ] **Screen reader**: Test with NVDA/JAWS/VoiceOver
- [ ] **Error messages**: Clear, associated with input, visible
- [ ] **Loading state**: Async operations show spinner or progress
- [ ] **Disabled state**: Visually distinct, not interactive

## Related Skills

- **Related Skills**: `design-system-generator`, `app-design-system`, `accessibility-system`
