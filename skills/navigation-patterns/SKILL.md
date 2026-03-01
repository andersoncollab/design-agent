---
name: navigation-patterns
description: Navigation architecture patterns — responsive navbars, mobile bottom tabs, sidebar navigation, command palettes, breadcrumbs, mega menus, tab interfaces, and mobile drawer menus with accessibility and keyboard navigation. Trigger: "navigation", "navbar", "sidebar", "bottom tabs", "command palette", "breadcrumbs", "mega menu".
version: 1.0.0
license: MIT
---

# Navigation Patterns Skill

## Purpose

Navigation is the backbone of usability. Bad navigation loses users. This skill covers every major navigation pattern with clear decision criteria for when to use each, accessibility requirements, and responsive behavior from 375px to 4K displays.

You'll learn when to use top navbars vs. sidebars vs. bottom tabs, how to build keyboard-accessible command palettes, and how to structure mega menus without overwhelming users. Every pattern includes ARIA requirements, focus management, keyboard support, and mobile-specific considerations.

## When to Use

- **Designing app or website navigation**: Choose the right pattern for your product type and user context
- **Building a navigation component**: Implement accessibility, keyboard support, focus management
- **Migrating from one pattern to another**: Understand tradeoffs and loss of existing user mental models
- **Auditing navigation for accessibility**: Test focus order, keyboard navigation, ARIA attributes
- **Mobile-first redesign**: Adapting desktop navigation to thumb-zone bottom bars
- **Complex apps with deep hierarchies**: Organize 3+ levels without cognitive overload

Trigger phrases: "how should I structure navigation?", "navbar accessibility", "mobile navigation", "sidebar vs. bottom tabs", "keyboard navigation in menus".

## Key Concepts

### Navigation Hierarchy

Users expect navigation in layers:
- **Primary**: Main sections (Home, Products, About). Visible on every page. 3-7 items max.
- **Secondary**: Subsections, filters, tabs. Context-dependent. Show only related items.
- **Tertiary**: Breadcrumbs, pagination, skip links. Wayfinding only, not main nav.

**Rule**: Never show more than one layer at once (except mega menus, which are exceptions). More than 7 primary items → Hick's law violation (users take longer to decide).

### Mobile-First Navigation Strategy

Mobile constraints (375px width, touch-only, no hover) drive different patterns:

| Context | Desktop Pattern | Mobile Pattern | Touch Target |
|---------|-----------------|----------------|--------------|
| Casual browsing (marketing site) | Top navbar | Hamburger drawer | 44×44px min |
| Product browsing (e-commerce) | Top navbar + mega menu | Hamburger + bottom tabs | 48×56px buttons |
| App with tabs (mobile app) | Sidebar | Bottom tab bar | 48×56px buttons |
| Dashboard (SaaS admin) | Sidebar (collapsible) | Hamburger or bottom nav | 44×48px |

**Key principle**: Bottom tab bars (48-56px tall) are faster to reach on mobile (thumb zone) than top hamburger menus. Reserved for apps with 3-5 core sections.

### Accessibility Requirements

All navigation patterns must satisfy:

- **Keyboard navigation**: Tab reaches all links/buttons. Arrow keys navigate within menus.
- **Focus management**: Visible 2-3px focus ring. Focus moves logically (left-to-right, top-to-bottom).
- **ARIA attributes**: `aria-label`, `aria-expanded`, `aria-current`, `role="navigation"`.
- **Semantic HTML**: `<nav>`, `<ul>`, `<a>`, `<button>` — not divs.
- **Color contrast**: 4.5:1 minimum. Don't rely on color alone for active state.
- **Focus trap**: When menus open, focus stays inside. Escape closes menu and returns focus.

---

## Pattern 1: Top Navbar (Desktop + Responsive Collapse)

### When to Use
Marketing sites, content blogs, e-commerce product pages. Users scan horizontally. Most familiar pattern.

### Structure
- **Logo/brand** (left): Clickable, returns to homepage
- **Primary links** (center): 4-6 items max
- **CTA button** (right): Sign up, Buy, Contact
- **Secondary actions**: Search, user menu, language picker

### Desktop Code
```html
<nav role="navigation" aria-label="Main navigation" class="sticky top-0 z-40 bg-white shadow-sm">
  <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="text-xl font-bold text-gray-900" aria-label="Brand home">
      Logo
    </a>

    <!-- Desktop links -->
    <ul class="hidden md:flex gap-8">
      <li><a href="/about" class="hover:text-blue-600 transition" aria-current="page">About</a></li>
      <li><a href="/products" class="hover:text-blue-600 transition">Products</a></li>
      <li><a href="/blog" class="hover:text-blue-600 transition">Blog</a></li>
      <li><a href="/contact" class="hover:text-blue-600 transition">Contact</a></li>
    </ul>

    <!-- CTA -->
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
      Get Started
    </button>

    <!-- Mobile hamburger (hidden on desktop) -->
    <button aria-label="Toggle menu" aria-expanded="false" id="menu-toggle" class="md:hidden p-2 hover:bg-gray-100">
      ☰
    </button>
  </div>
</nav>
```

### Mobile Hamburger (Drawer)
```html
<!-- Hidden drawer, shown when hamburger clicked -->
<div id="mobile-menu" class="hidden fixed inset-0 z-30 md:hidden" role="dialog" aria-labelledby="menu-title">
  <!-- Overlay (closes on click) -->
  <div class="absolute inset-0 bg-black/50" id="overlay"></div>

  <!-- Drawer content (slides from left) -->
  <nav class="absolute left-0 top-0 w-full max-w-xs h-full bg-white flex flex-col">
    <div class="flex items-center justify-between p-4 border-b">
      <h2 id="menu-title" class="text-lg font-bold">Menu</h2>
      <button aria-label="Close menu" id="close-btn" class="p-2 hover:bg-gray-100">
        ✕
      </button>
    </div>

    <ul class="flex flex-col gap-2 p-4">
      <li><a href="/about" class="block py-2 px-4 hover:bg-gray-100">About</a></li>
      <li><a href="/products" class="block py-2 px-4 hover:bg-gray-100">Products</a></li>
      <li><a href="/blog" class="block py-2 px-4 hover:bg-gray-100">Blog</a></li>
      <li><a href="/contact" class="block py-2 px-4 hover:bg-gray-100">Contact</a></li>
      <li class="border-t pt-2">
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Get Started
        </button>
      </li>
    </ul>
  </nav>
</div>
```

### Accessibility
- `aria-label="Main navigation"` on `<nav>`
- `aria-current="page"` on active link
- `aria-expanded="false/true"` on hamburger button
- Focus trap: Tab cycles within drawer, Escape closes, focus returns to hamburger
- Sticky position + backdrop blur for scroll context

---

## Pattern 2: Mobile Bottom Tab Bar

### When to Use
Apps with 3-5 core sections (Home, Search, Messages, Profile). Maximum thumb reach. Never use for >5 items.

### Structure
- 3-5 icon + label buttons
- 48-56px height (thumb target zone)
- Fixed position, always visible
- Collapse labels on ultra-narrow screens (show icons only with tooltip)

### Code
```html
<nav role="navigation" aria-label="Bottom navigation" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 z-10">
  <ul class="flex h-full">
    <!-- Item 1 -->
    <li class="flex-1">
      <a
        href="/"
        class="flex flex-col items-center justify-center h-full gap-1 text-gray-600 hover:text-blue-600 focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600"
        aria-label="Home"
        aria-current="page"
      >
        <span class="text-xl">🏠</span>
        <span class="text-xs font-medium">Home</span>
      </a>
    </li>

    <!-- Item 2 -->
    <li class="flex-1">
      <a
        href="/search"
        class="flex flex-col items-center justify-center h-full gap-1 text-gray-600 hover:text-blue-600 focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600"
        aria-label="Search"
      >
        <span class="text-xl">🔍</span>
        <span class="text-xs font-medium">Search</span>
      </a>
    </li>

    <!-- Item 3 -->
    <li class="flex-1">
      <a
        href="/messages"
        class="flex flex-col items-center justify-center h-full gap-1 text-gray-600 hover:text-blue-600 focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600"
        aria-label="Messages (3 unread)"
      >
        <span class="text-xl">💬</span>
        <span class="text-xs font-medium">Messages</span>
        <span class="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
      </a>
    </li>

    <!-- Item 4 -->
    <li class="flex-1">
      <a
        href="/profile"
        class="flex flex-col items-center justify-center h-full gap-1 text-gray-600 hover:text-blue-600 focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600"
        aria-label="Profile"
      >
        <span class="text-xl">👤</span>
        <span class="text-xs font-medium">Profile</span>
      </a>
    </li>
  </ul>
</nav>

<!-- Page content must have bottom padding to avoid overlap -->
<main class="pb-16">
  <!-- Content -->
</main>
```

### Accessibility
- **Always include labels** (not icon-only). Icons alone require users to learn them.
- `aria-label` for screen reader context
- `aria-current="page"` on active tab
- Active state: Color change + underline or background highlight
- Focus ring: visible 2-3px outline

### Behavior
- **Hide on scroll down**: Optional. Advanced apps hide bottom bar to gain space. Show on scroll up.
- **Badges**: Add unread count with `aria-label` for screen readers.

---

## Pattern 3: Sidebar Navigation (Desktop + Collapsible)

### When to Use
SaaS dashboards, admin panels, content management. Persistent navigation. Great for deep hierarchies.

### Structure
- Left sidebar: 240-280px wide (collapsed: 64px)
- Icon + label for items
- Nested sections with expand/collapse
- Active indicator (left border or background)
- Collapsible on mobile

### Code
```html
<div class="flex">
  <!-- Sidebar -->
  <aside role="navigation" aria-label="Sidebar" class="sticky top-0 h-screen w-64 bg-gray-900 text-white p-4 flex flex-col gap-4 overflow-y-auto">
    <!-- Logo -->
    <div class="text-xl font-bold">App</div>

    <!-- Navigation items -->
    <nav>
      <ul class="space-y-1">
        <!-- Simple link -->
        <li>
          <a
            href="/dashboard"
            class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 focus:outline-2 focus:outline-blue-400"
            aria-current="page"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </a>
        </li>

        <!-- Collapsible section -->
        <li>
          <button
            aria-expanded="false"
            aria-controls="settings-menu"
            class="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 focus:outline-2 focus:outline-blue-400 text-left"
            id="settings-btn"
          >
            <span>⚙️</span>
            <span>Settings</span>
            <span class="ml-auto transform transition-transform" id="chevron">›</span>
          </button>

          <!-- Submenu (hidden by default) -->
          <ul id="settings-menu" class="hidden pl-8 mt-1 space-y-1">
            <li>
              <a href="/settings/account" class="block px-4 py-2 rounded hover:bg-gray-800">
                Account
              </a>
            </li>
            <li>
              <a href="/settings/security" class="block px-4 py-2 rounded hover:bg-gray-800">
                Security
              </a>
            </li>
            <li>
              <a href="/settings/billing" class="block px-4 py-2 rounded hover:bg-gray-800">
                Billing
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Collapse toggle (bottom) -->
    <button aria-label="Toggle sidebar" class="mt-auto px-4 py-2 rounded hover:bg-gray-800 focus:outline-2 focus:outline-blue-400">
      ‹›
    </button>
  </aside>

  <!-- Main content -->
  <main class="flex-1">
    <!-- Page content -->
  </main>
</div>
```

### Accessibility
- `role="navigation"` + `aria-label="Sidebar"`
- `aria-expanded="true/false"` on collapsible buttons
- `aria-controls="menu-id"` links button to submenu
- Keyboard: Tab navigates items, Enter expands sections, Arrow keys within sections
- Active indicator: `aria-current="page"` on current page link

---

## Pattern 4: Breadcrumbs

### When to Use
Show user location in hierarchy. Not main navigation, but wayfinding aid.

### Structure
- Current page NOT linked
- Separator: `/` or `>`
- Truncate on mobile (show first + last 2 items)
- Schema.org BreadcrumbList markup

### Code
```html
<nav aria-label="Breadcrumb" class="bg-gray-50 px-6 py-3 text-sm">
  <ol class="flex items-center gap-2">
    <li>
      <a href="/" class="text-blue-600 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
        Home
      </a>
    </li>

    <li aria-hidden="true" class="text-gray-400">/</li>

    <li>
      <a href="/products" class="text-blue-600 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600">
        Products
      </a>
    </li>

    <li aria-hidden="true" class="text-gray-400">/</li>

    <!-- Current page (not linked) -->
    <li aria-current="page" class="text-gray-900 font-medium">
      Laptop
    </li>
  </ol>
</nav>
```

With schema markup:
```html
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/products">
        <span itemprop="name">Products</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Laptop</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

### Mobile Truncation
On screens <640px, show only: Home / ... / Current Page

---

## Pattern 5: Command Palette (Cmd+K)

### When to Use
Complex apps (VS Code, Linear, Figma). Keyboard power users. Search + action discovery.

### Structure
- Global hotkey: Cmd+K (Ctrl+K on Windows)
- Search input + filterable results
- Keyboard navigation: Arrow up/down, Enter selects, Escape closes
- Recent items section

### Code Snippet
```html
<div role="dialog" aria-modal="true" class="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50">
  <input
    type="text"
    placeholder="Search commands..."
    role="combobox"
    aria-expanded="true"
    aria-controls="results"
    autofocus
    class="w-full px-4 py-3 border-b text-lg focus:outline-none"
  />
  <ul id="results" role="listbox">
    <li role="option" aria-selected="true" class="px-4 py-2 bg-blue-100">New project</li>
    <li role="option" class="px-4 py-2 hover:bg-gray-100">Open file</li>
    <li role="option" class="px-4 py-2 hover:bg-gray-100">Settings</li>
  </ul>
</div>
```

### Accessibility
- `role="dialog"` + `aria-modal="true"` on container
- `role="combobox"` on input, `aria-controls="results"`
- `role="listbox"` on results, `role="option"` on items
- `aria-selected="true/false"` on selected
- Arrow key navigation (up/down), Enter to select, Escape to close
- Focus trap: Keep within palette until Escape

---

## Common Pitfalls

1. **More than 7 primary nav items** → Violates Hick's law. Users take longer to decide. Solution: Use mega menu or hierarchical categories.

2. **Icon-only navigation without labels** → Users don't intuitively understand icons. Solution: Include labels or tooltips (`title` attribute, `aria-label`).

3. **Hamburger menu hiding critical CTAs** → Mobile users can't find Sign Up. Solution: Keep CTA outside drawer or at top of drawer.

4. **No visible focus indicators** → Keyboard users lost. Solution: Add 2-3px focus ring, never remove without replacement.

5. **Missing `aria-current="page"`** → Screen readers don't announce current page. Solution: Add `aria-current="page"` to active link.

6. **Bottom tab bar with more than 5 items** → Overflow or text truncation. Solution: Use max 5 items or move to sidebar.

7. **Nested navigation >3 levels deep** → Cognitive overload. Solution: Flatten, use tabs, or separate pages.

8. **Menu doesn't close on Escape** → Keyboard users trapped. Solution: Add Escape handler everywhere (modals, drawers, dropdowns).

9. **Focus lost after menu selection** → Disorienting. Solution: Move focus to next logical element or return to trigger.

10. **No mobile navigation strategy** → Desktop nav breaks at 375px. Solution: Plan mobile-first, test at all breakpoints.

---

## Decision Matrix

Choose your navigation pattern based on context:

| Product Type | Primary Nav | Secondary | Mobile |
|---|---|---|---|
| Marketing site | Top navbar | None / Mega menu | Hamburger drawer |
| Blog | Top navbar | Category sidebar | Hamburger |
| SaaS dashboard | Sidebar (collapsible) | Tabs | Bottom tabs OR hamburger |
| Mobile app | Bottom tabs | Tabs / Filters | Bottom tabs (persistent) |
| E-commerce | Top navbar | Mega menu / Filters | Hamburger + bottom "Shop" tab |
| Admin panel | Sidebar | Nested collapse | Hamburger with sidebar |
| Documentation | Sidebar + search | Right toc (table of contents) | Hamburger with toc modal |

---

## References

- **W3C ARIA Navigation**: https://www.w3.org/WAI/ARIA/apg/patterns/navigation/
- **Material Design Navigation**: https://m3.material.io/components/navigation-bar/overview
- **Accessibility in Focus**: Keyboard navigation patterns https://smashingmagazine.com/focus
- **Schema.org BreadcrumbList**: https://schema.org/BreadcrumbList

## Related Skills

- `component-patterns` — Button, link, menu item states
- `responsive-patterns` — Mobile-first breakpoints
- `accessibility-system` — Focus management, ARIA roles
- `app-design-system` — Tab interface, bottom navigation
