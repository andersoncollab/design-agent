# Component Patterns — Extended Catalog (Components 11-20)

### 11. Accordion

**Purpose**: Show/hide related content sections (FAQs, settings, help docs).

**Anatomy**:
- Header button (trigger, shows expand/collapse icon)
- Trigger text
- Expand/collapse icon (chevron, plus/minus, etc.)
- Body content (hidden until expanded)
- Optional nested accordion

**States**:
- Collapsed (header visible, body hidden)
- Expanded (header visible, body visible)
- Hover header
- Focused header
- Disabled (cannot expand)

**Accessibility**:
- `<button>` for trigger (or `role="button"`)
- `aria-expanded="true/false"` on trigger
- `aria-controls="content-id"` links trigger to body
- Body has `id="content-id"` to be referenced
- Keyboard: Enter/Space to toggle, arrow keys to navigate between accordions
- Focus visible on header button

**Anti-patterns**:
- Multiple sections open (defeats accordion purpose, use custom layout)
- Nested accordion too deep (confusing)
- Icon and text both clickable (separate targets)
- No keyboard navigation

**Design System Examples**: Radix Accordion, Polaris Collapsible, Material Accordion.

---

### 12. Tabs

**Purpose**: Switch between related content sections without leaving page.

**Anatomy**:
- Tab list (horizontal strip of tab buttons)
- Tab buttons (labeled, one active)
- Tab panels (content, one visible)
- Optional close button on tab (for closable tabs)
- Optional scroll buttons if tabs overflow

**States**:
- Unselected tab (visible, unemphasized)
- Selected tab (highlighted, active)
- Hover tab
- Focused tab (focus ring)
- Disabled tab (grayed out, cannot select)

**Accessibility**:
- `role="tablist"` on container
- `role="tab"` on tab buttons, `role="tabpanel"` on panels
- `aria-selected="true"` on active tab
- `aria-controls="panel-id"` on tab, panel has `id="panel-id"`
- `aria-labelledby="tab-id"` on panel, tab has `id="tab-id"`
- Keyboard: Arrow keys to navigate tabs, Enter/Space to select
- **Active tab must be focusable** (not all tabs in tab order)

**Anti-patterns**:
- All tabs in tab order (should be just active one)
- Clicking tab doesn't change panel
- Focus ring hidden
- Overflow tabs scroll without visible button

**Design System Examples**: Radix Tabs, Polaris Tabs, Material Tabs.

---

### 13. Breadcrumb

**Purpose**: Show user location in hierarchy (Home > Products > Electronics > Laptops).

**Anatomy**:
- Breadcrumb list (`<ol>`)
- Breadcrumb items (`<li>`)
- Links (not last item) or text (last item, current page)
- Separators (/, >, →) between items
- Optional "Back" link for mobile

**States**: default, hover link, focused link, current

**Accessibility**:
- `<nav aria-label="Breadcrumb">` wrapper
- `<ol>` list structure (not comma-separated)
- Current page should be plain text (not link) or `aria-current="page"`
- Links focusable and underlined
- Keyboard: Tab through links, Enter to navigate

**Anti-patterns**:
- Current page is link (confusing, user can "go to" current page)
- Separators in HTML (use CSS `content: "/"`)
- No `<nav>` landmark
- Non-semantic structure (divs instead of ol/li)

**Design System Examples**: Polaris Breadcrumbs, Material Breadcrumbs.

---

### 14. Tooltip

**Purpose**: Show additional info on hover/focus (keyboard shortcut, icon explanation).

**Anatomy**:
- Trigger element (icon, underlined text)
- Tooltip container (small box, arrow pointing to trigger)
- Tooltip text (always brief)

**States**: hidden, visible (hover/focus), positioning (top/bottom/left/right)

**Accessibility**:
- `aria-describedby="tooltip-id"` on trigger
- Tooltip has `id="tooltip-id"` and `role="tooltip"`
- Shown on hover AND focus (not hover-only)
- Never hide info in tooltip only (should be available elsewhere)
- Keyboard: Tab to trigger shows tooltip, any key hides it

**Anti-patterns**:
- Hover-only (mobile/touch users can't access)
- Complex content in tooltip (should be in full UI)
- Tooltip blocks other content
- No delay (flickers on every hover)

**Design System Examples**: Radix Tooltip, Polaris Tooltip, Material Tooltip.

---

### 15. Badge / Tag

**Purpose**: Label items (status, category, priority level).

**Anatomy**:
- Badge container (small rectangular, rounded)
- Text label
- Optional icon (left or right)
- Optional close button (dismissable tag)

**States**: default, hover, focus (if clickable), disabled

**Accessibility**:
- Plain text (no interaction): no aria-role needed
- Clickable badge: `role="button"` + keyboard support (Space/Enter)
- Dismissable: close button is `aria-label="Remove badge"`
- Color contrast: 4.5:1 with background

**Anti-patterns**:
- Semantic color only (red = error) without text
- No close button for dismissable badges
- Too many badges on one item (10+ looks cluttered)
- Badge text too long (should be 1-3 words)

**Design System Examples**: Polaris Badge, Material Chip, shadcn/ui Badge.

---

### 16. Progress Bar

**Purpose**: Show progress of long operation (file upload, form completion).

**Anatomy**:
- Background track (full width)
- Foreground bar (fills based on percentage)
- Optional label ("50%", "Uploading...")
- Optional secondary text (estimated time)

**States**: 0% (empty), 25/50/75% (partial), 100% (complete), indeterminate (no percent)

**Accessibility**:
- `role="progressbar"`
- `aria-valuenow="50"` (current value 0-100)
- `aria-valuemin="0"` `aria-valuemax="100"`
- `aria-label="Upload progress"` (if label unclear)
- `aria-live="polite"` + `aria-atomic="true"` for updates
- Never hide percentage in label only (show numerically)

**Anti-patterns**:
- Indeterminate progress too long (users think it's stuck)
- No label (users don't know what's loading)
- Jumping back and forth (update `aria-valuenow` smoothly)
- Reaches 100% but operation continues (complete when done)

**Design System Examples**: Material LinearProgress, Polaris ProgressBar.

---

### 17. Spinner / Loading Indicator

**Purpose**: Show async work in progress (data fetching, form submission).

**Anatomy**:
- Rotating icon or animation
- Optional text label ("Loading...")
- Optional size variant (small, large)

**States**: loading (rotating), paused (error), complete (hide or show checkmark)

**Accessibility**:
- `aria-busy="true"` on container being loaded
- `aria-label="Loading"` if spinner appears alone
- `role="status"` + `aria-live="polite"` for status updates
- Never trap focus on spinner (allow user to interact)
- Animate at 60fps (not jerky)

**Anti-patterns**:
- No text label (users unsure what's loading)
- Spinner doesn't actually indicate progress (use progress bar instead)
- Too small to see (min 20×20px)
- Spinner blocks other UI (show inline or overlay with dismiss button)

**Design System Examples**: Material CircularProgress, Polaris Spinner.

---

### 18. Card

**Purpose**: Container for related content (article preview, product, team member).

**Anatomy**:
- Container (white background, rounded corners, shadow)
- Media area (optional image/video, full width)
- Content area (title, description, metadata)
- Footer (optional, actions/tags)
- Hover state (shadow increase, scale slight)

**States**: default, hover, focused (if clickable), disabled

**Accessibility**:
- If clickable: entire card is link or has button role
- `role="article"` if card is article preview
- Focus ring visible on entire card (not just button)
- Avoid card wrapping small `<a>` (make whole card clickable)

**Anti-patterns**:
- Multiple clicks targets in card (confusing, should be one per card)
- Image with no alt text
- Card title is link but card also clickable (confusing)
- No visual feedback on hover (looks static)

**Design System Examples**: Material Card, Polaris Card, shadcn/ui Card.

---

### 19. Alert / Banner

**Purpose**: Communicate important message (warnings, announcements, critical updates).

**Anatomy**:
- Icon (checkmark, warning, error, info)
- Title (short, bold)
- Message (longer explanation)
- Optional action button
- Close button (optional, depends on severity)

**States**: success, warning, error, info, closeable

**Accessibility**:
- `role="alert"` for errors/warnings (auto-announces)
- `role="status"` for info (announces once)
- `aria-live="assertive"` for alerts, `aria-live="polite"` for status
- `aria-atomic="true"`
- Icon has no alt text (text conveys message)
- Close button labeled: `aria-label="Dismiss alert"`

**Anti-patterns**:
- Icon-only (no text message)
- Color-only indicator (red = error, but should add icon/text)
- Auto-dismiss critical alerts (user may miss)
- Alert not dismissable (modal-like, blocks page)

**Design System Examples**: Polaris Banner, Material Alert, shadcn/ui Alert.

---

### 20. Pagination

**Purpose**: Navigate large datasets by page (search results, blog archives).

**Anatomy**:
- Previous button
- Page numbers (1, 2, 3, ..., 10)
- Ellipsis (...) if gap between pages
- Next button
- Optional page size selector (10, 25, 50 items/page)
- Optional "Go to page" input

**States**:
- Default page (page 1)
- Current page (highlighted, not clickable)
- Hover page button
- Previous/Next disabled on first/last page

**Accessibility**:
- `<nav aria-label="Pagination">` wrapper
- Page buttons are `<a>` or `<button>` (reload page or update list)
- `aria-current="page"` on current page number (not clickable)
- `aria-disabled="true"` on disabled prev/next
- Keyboard: Tab through page numbers, Enter to navigate
- Announce page change: `role="status"` + `aria-live="polite"` on results area

**Anti-patterns**:
- No current page indicator
- Ellipsis breaks tab order (skip, don't make focusable)
- Page numbers go off-screen on mobile
- No loading state for next page

**Design System Examples**: Material Pagination, Polaris Pagination.
