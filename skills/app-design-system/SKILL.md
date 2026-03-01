---
name: app-design-system
description: Design system wizard for applications (SaaS, mobile apps, web apps, PWAs) covering navigation architecture, state management UI, form systems, notification hierarchies, and platform-specific adaptations. Distinct from marketing site design systems. Use for app redesigns, component library definition, and multi-platform consistency.
version: 1.0.0
license: MIT
---

## Purpose

Application design systems differ fundamentally from marketing site systems in navigation patterns, state handling, data density, and user authentication models. This skill guides you through building a design system specifically for interactive applications—dashboards, productivity tools, e-commerce, mobile apps, PWAs—rather than static marketing sites. The outcome is a navigation architecture, component token library, state pattern system, form specification, and notification hierarchy tailored to application UX patterns.

## When to Use

- Building a new SaaS or app design system from scratch
- Redesigning legacy application interfaces
- Establishing consistency across web + mobile platforms
- Defining form systems for complex data entry
- Creating notification and feedback hierarchies
- Planning dark mode and accessibility adaptations
- Scaling component libraries across teams
- Converting marketing site design systems to application patterns

## Key Concepts

**Marketing vs. Application Design Systems:**

| Concern | Marketing Site | Application |
|---|---|---|
| Navigation | Top nav + footer (2 levels) | Sidebar, tabs, command palette, breadcrumbs (4+ levels) |
| Content Model | Static, read-only | Dynamic, interactive, user-generated, real-time |
| States | Page load | Loading, empty, error, success, partial, offline |
| Forms | Contact form, newsletter | Complex multi-step, validation, file upload, conditional fields |
| Notifications | Banner, toast | Toasts, in-app banners, push, email, severity hierarchy |
| Density | Spacious, high whitespace | Compact, data-dense, scannable, info-rich |
| User Model | Anonymous visitor | Authenticated, with preferences, permissions, history |
| Performance | Page-level optimization | Real-time updates, partial loads, infinite scroll |

**5 Application States Every Component Handles:**
1. **Loading:** Skeleton screens (preserve layout), not spinners
2. **Empty:** Illustration + message + primary action
3. **Error:** Error message + retry action + fallback
4. **Partial:** Some data loaded, some pending
5. **Success:** Confirmation, then transition or dismiss

**Navigation Patterns by App Type:**

| Type | Pattern | Why |
|---|---|---|
| Dashboard / SaaS | Sidebar + top bar | Many sections, need persistent nav |
| E-commerce | Top nav + bottom tabs (mobile) | Browse-oriented, frequent tab switching |
| Social Network | Bottom tabs | Thumb-zone optimization, quick switching |
| Productivity | Sidebar + command palette | Power users need keyboard shortcuts |
| Internal Tool | Sidebar + breadcrumbs | Deep hierarchy, many views, orientation matters |

## Instructions

### Phase 1: App Context Assessment

Ask the user:
1. **App Type?** (Dashboard, SaaS, e-commerce, social, productivity, internal tool, PWA, native mobile)
2. **Primary Platform?** (Web, iOS, Android, cross-platform, PWA hybrid)
3. **User Density Preference?** (Spacious / Balanced / Compact)
4. **Primary User Actions?** (List 3-5 most common tasks)
5. **User Profile?** (Novice / Power User / Admin)
6. **Data Volume?** (Low / Medium / High — affects density)
7. **Real-time Needs?** (None / Updates / Collaboration)

*Document answers in a brief context summary.*

### Phase 2: Navigation Architecture Selection

Based on Phase 1 answers, recommend a navigation pattern:

**Dashboard / SaaS Pattern:**
```
┌─────────────────────────────────────┐
│ Logo     Search    User    Settings  │  ← Top bar (search, account, tools)
├──────────┬─────────────────────────┤
│          │                         │
│ Sidebar  │   Main Content Area     │
│ (nav)    │                         │
│          │                         │
└──────────┴─────────────────────────┘
```
- Collapsible sidebar (save space on mobile)
- Top bar for global actions + account menu
- Breadcrumbs for deep pages
- Current section highlighted in sidebar

**E-commerce Pattern:**
```
┌─────────────────────────────────────┐
│ Logo     Search       Cart    Menu   │  ← Top nav (sticky on scroll)
├─────────────────────────────────────┤
│         Main Content Area            │
│                                     │
├────────┬──────────┬─────────┬───────┤
│ Home   │ Browse   │ Account │ More  │  ← Bottom tab bar (mobile)
└────────┴──────────┴─────────┴───────┘
```
- Top navigation (logo, search, cart, account)
- Bottom tab bar on mobile (5 max tabs, current tab active)
- Sticky top bar on scroll
- Category navigation (horizontal scroll or dropdown)

**Sidebar with Command Palette Pattern:**
```
┌──────────────────────────────────────┐
│ Logo          [Cmd+K Search...]      │  ← Command palette trigger
├─────────┬────────────────────────────┤
│ •Home   │                            │
│ •Tasks  │   Main Content Area        │
│ •Notes  │                            │
│ •Saved  │                            │
│ •Share  │                            │
│         │                            │
└─────────┴────────────────────────────┘
```
- Left sidebar with main sections
- Command palette (Cmd+K) for power users
- Quick search that shows recent + favorites
- Keyboard shortcuts visible in menus

**Bottom Tab Pattern (Mobile-first Social):**
```
┌──────────────────────────────────────┐
│         Main Content Area            │
│                                     │
├─────────┬──────────┬───────┬───────┤
│ Timeline│ Discover │ Create│ Profile│
└─────────┴──────────┴───────┴───────┘
```
- 4-5 primary tab destinations
- Center tab is primary CTA (e.g., "Create")
- Active tab shows icon filled + label
- No sub-navigation within tabs (drill-down with detail views)

Provide React/Tailwind code for chosen pattern.

### Phase 3: Application State System

Define state handling for every component:

```tsx
// State wrapper pattern
function AsyncComponent({ loading, error, empty, data, onRetry, children }) {
  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (empty) return <EmptyState action={primaryCTA} />;
  return children(data);
}
```

**State specifications:**

| State | Pattern | Duration | Interaction |
|---|---|---|---|
| **Loading** | Skeleton screen (match content shape) | Until loaded | No interaction, show progress |
| **Empty** | Illustration + headline + subtext + CTA | Persistent | One primary action button |
| **Error** | Icon (⚠️) + error message + retry button | Persistent | Retry / Dismiss |
| **Partial** | Show loaded data + skeleton for pending | Live | Interactive with pending indicator |
| **Success** | Checkmark + message (auto-dismiss in 3s) | 3 seconds | Can dismiss early |

**Implementation checklist:**
- [ ] Skeleton screens use actual component structure (not spinners)
- [ ] Empty states have illustration + messaging + action
- [ ] Error states show actionable message (not "Error 500")
- [ ] Partial loading shows what's ready, marks what's pending
- [ ] Success confirmation doesn't block continued work
- [ ] Loading cancel option available for long operations

### Phase 4: Form System Specification

**Input Types & Patterns:**

| Type | Component | Validation | Example |
|---|---|---|---|
| Text | Input[type=text] | On blur → feedback | Name, email, URL |
| Textarea | Textarea | Character count | Description, bio |
| Select | Dropdown (native or custom) | On blur | Category, country |
| Checkbox | Checkbox group | On blur | Permissions, filters |
| Radio | Radio group | On blur | Single choice options |
| Toggle | Switch component | Immediate | Feature flags, settings |
| Date | Date picker (calendar) | On blur | Birthdate, deadline |
| File | File input | On select | Upload profile pic |

**Validation Strategy:**
- **On Blur:** Primary validation trigger (user leaves field)
- **Real-time:** Secondary validation (e.g., username availability)
- **On Submit:** Form-level validation (interdependent fields, required groups)
- **Error Display:** Inline below field + error summary at top

**Form Patterns:**

*Single-step form:*
```
Form Title
Description text

[ ] Field 1 error message    ← inline error
[ ] Field 2
[ ] Field 3

[Cancel] [Save]              ← actions at bottom
```

*Multi-step form:*
```
Step 1 of 3: Basic Info
[Progress bar showing 33%]

[ ] Name (error if invalid)
[ ] Email

[Back] [Next]
```

**Accessibility checklist:**
- [ ] All inputs have `<label>` elements (not just placeholder)
- [ ] Error messages linked via `aria-describedby`
- [ ] Required fields marked with `aria-required="true"`
- [ ] Form error summary at top with focus management
- [ ] Keyboard navigation flows top-to-bottom
- [ ] Submit button disabled during submission + shows loading state

### Phase 5: Notification Hierarchy

Define notification types by severity and context:

| Level | Component | Duration | Trigger | Example |
|---|---|---|---|---|
| **Info** | Toast (bottom-right) | 5s auto-dismiss | FYI, non-critical | "Saved to drafts" |
| **Success** | Toast (green) | 5s auto-dismiss | Action completed | "Payment processed" |
| **Warning** | Banner (yellow, top) | Manual dismiss | Urgent but not blocking | "Trial expires in 3 days" |
| **Error** | Inline + toast (red) | Manual dismiss | Action failed | "Failed to save. Retry?" |
| **Critical** | Modal (blocking) | Requires action | System issue | "Session expired. Login again?" |

**Notification Rules:**
- Max 1 toast visible at a time (queue extras)
- Warnings and errors never auto-dismiss
- Modals only for critical blocking issues (session, permissions)
- Success notifications don't need copy (icon + 2-3 word message)
- Error notifications always show what failed + how to fix

**Implementation pattern:**
```tsx
const notificationQueue = [];

function notify(message, type = 'info', duration = 5000) {
  const id = Date.now();
  notificationQueue.push({ id, message, type });
  if (duration) {
    setTimeout(() => dismiss(id), duration);
  }
}

function dismiss(id) {
  notificationQueue = notificationQueue.filter(n => n.id !== id);
}
```

### Phase 6: Platform Adaptations

Show how the design system adapts across platforms:

**Web (Desktop/Tablet):**
- Sidebar or top navigation (context-dependent)
- Hover states on interactive elements
- Right-click context menus
- Keyboard shortcuts (Cmd+K, Cmd+/, etc.)
- Desktop-optimized forms (wider inputs, side-by-side fields)

**iOS:**
- Tab bar at bottom (Apple HIG standard)
- Swipe gesture to go back
- System fonts (SF Pro) and colors
- Safe area insets for notch + home indicator
- Full-width forms (no side-by-side)
- iOS-specific pickers (date, time, select)

**Android:**
- Bottom nav bar or nav drawer (Material Design 3)
- Material ripple animations
- System fonts (Roboto) and colors (Material colors)
- Swipe to navigate (Material back navigation)
- Full-width forms
- Android-specific components (snackbar, bottom sheet)

**PWA (Hybrid):**
- Web patterns (sidebar/top nav) + mobile patterns (touch targets)
- App shell architecture (offline-first structure)
- Install prompt (add-to-home-screen)
- Offline state handling + sync queue
- Push notifications (Web Push API)

**Cross-platform Consistency:**
- [ ] Core interaction patterns match (button behavior, form validation)
- [ ] Color palette identical across platforms
- [ ] Typography scale consistent (different base font, same scale ratio)
- [ ] Navigation available on all platforms (labeled consistently)
- [ ] State indicators (loading, error) follow same pattern
- [ ] Notification hierarchy matches across platforms

## Examples

### Example: Project Management SaaS Design System (Linear)

**Phase 1 Answers:**
- App Type: Productivity SaaS
- Primary Platform: Web (desktop-first, mobile secondary)
- Density: Compact (power users want data-dense)
- Actions: Create issue, search, filter, comment, link issues

**Phase 2 Navigation:**
Sidebar + command palette pattern (power users)
```
┌────────────────────────────────┐
│ [Cmd+K] Search...              │  ← Command palette
├──────────┬───────────────────┤
│ Linear   │                   │
│ • Inbox  │   Main Issue      │
│ • Backlog│   View            │
│ • Active │                   │
│ • Done   │                   │
│ ⚙️ Prefs │                   │
└──────────┴───────────────────┘
```

**Phase 3 States:**
- Loading: Skeleton of issue card (title, description height, metadata)
- Empty: "No issues in Backlog. Create one?" + button
- Error: "Failed to load issues. Check your connection." + retry
- Partial: Show loaded issues, skeleton for ones still loading
- Success: Issue created → quick toast → focus on new issue

**Phase 4 Forms:**
- Single-step: Issue creation (title required, description optional)
- Multi-step: Issue import (select source → map fields → preview → confirm)
- Validation: Title required (on submit), URL valid format (on blur)

**Phase 5 Notifications:**
- Success: "Issue #123 created" (toast, 5s)
- Error: "Can't add to closed issue" (inline near field + toast)
- Warning: "You're out of seats. Add more?" (banner, yellow)
- Critical: "Session expired. Login again?" (modal, blocking)

**Phase 6 Platforms:**
- Web: Sidebar, Cmd+K, rich issue detail, side panel for related
- Mobile Web: Bottom nav (Inbox, Create, Settings), full-width issue detail
- iOS: Tab bar, swipe to dismiss, native date picker
- Android: Bottom nav, Material ripple, bottom sheet for filters

### Example: E-commerce Mobile App Design System

**Phase 1 Answers:**
- App Type: E-commerce
- Primary Platform: Mobile (iOS + Android), secondary web
- Density: Balanced (clear product cards, browsing-focused)
- Actions: Browse, search, add to cart, checkout, account

**Phase 2 Navigation:**
Bottom tab pattern (5 tabs)
```
┌──────────────────────────────────┐
│       Product Images             │
│                                  │
├──────────┬──────┬────┬──────┬───┤
│ Home     │Search│ ♡  │ Cart │Me │
└──────────┴──────┴────┴──────┴───┘
```

**Phase 3 States:**
- Loading: Product card skeleton (image height, title, price)
- Empty: "No products found. Try different filters?" + clear filters button
- Error: Network error icon + "Can't load products. Retry?" + button
- Partial: Show products loaded, show loading indicator for more
- Success: "Added to cart" (toast) + continue browsing enabled

**Phase 4 Forms:**
- Checkout: Step 1 (Shipping address) → Step 2 (Payment) → Step 3 (Confirm)
- Address: Street, city, state, zip (required fields marked)
- Payment: Card number, expiry, CVV (with icons for Visa/MC)
- Validation: Real-time card validation, format checking on blur

**Phase 5 Notifications:**
- Success: "Added to cart" (bottom toast, 4s, green checkmark)
- Info: "Free shipping on orders over $50" (banner at top)
- Warning: "Only 2 left in stock" (inline near quantity)
- Error: "Card declined. Try another?" (modal with action)

**Phase 6 Platforms:**
- iOS: Native tab bar, haptic feedback on tap, safe area aware
- Android: Bottom nav bar, Material elevation, ripple animations
- Web: Top nav + sidebar category menu, sticky cart button

## Common Pitfalls

**Pitfall: Using marketing site patterns for applications**
- *Fix:* Marketing sites use top nav + footer. Apps need persistent navigation (sidebar or bottom tabs). Stop copying marketing patterns.

**Pitfall: No loading, empty, or error states**
- *Fix:* Your app looks broken to new users. Design all 5 states for every data-dependent component. Use skeleton screens, not spinners.

**Pitfall: Notification overload (10+ toast notifications)**
- *Fix:* Queue toasts (only 1 visible). Use hierarchy (info toast vs. warning banner vs. error modal). Not everything is a toast.

**Pitfall: Desktop-only design for a mobile-primary app**
- *Fix:* Start mobile-first. Larger touch targets (48px minimum). Bottom nav for thumb-zone access. Don't squish desktop to mobile.

**Pitfall: Ignoring power users**
- *Fix:* Add command palette (Cmd+K), keyboard shortcuts, advanced search. Power users drive retention.

**Pitfall: Forms without inline validation**
- *Fix:* Users hate submitting to see errors. Validate on blur. Show inline errors below fields. Summary errors at top.

**Pitfall: No offline / slow-network states**
- *Fix:* Design for partial connectivity. Show what's syncing. Queue actions for when online. Inform users about sync status.

**Pitfall: Inconsistent state patterns across platforms**
- *Fix:* Web + mobile + iOS + Android must handle loading/error/empty the same way (different UI, same UX).

## References

- **Skill:** `design-system-generator` — Marketing site design systems (compare & contrast)
- **Skill:** `component-patterns` — Detailed component specifications
- **Skill:** `dashboard-patterns` — Dashboard-specific navigation and layout
- **Skill:** `dark-mode` — App-specific dark mode implementation
- **Skill:** `accessibility-system` — WCAG compliance for applications
- **Resource:** Apple Human Interface Guidelines — iOS patterns
- **Resource:** Material Design 3 — Android patterns
- **Resource:** Web.dev Forms — Form design best practices
- **Tool:** Figma — Prototyping and component systems
- **Tool:** React Storybook — Component documentation
- **Tool:** Zeroheight or Supernova — Design system tools
