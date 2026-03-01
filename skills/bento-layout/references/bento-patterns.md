# Bento Grid Patterns — Production Tailwind CSS Code

Complete copy-paste patterns for 8+ bento grid layouts with mobile/tablet/desktop variants.

## Pattern 1: 2×2 Equal Grid (4 Features)

**Use case**: 4 equal-priority features, SaaS pricing tiers, service offerings, team members.

**Grid structure**: `grid-cols-2` → 2 cols × 2 rows = 4 equal cells

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-blue-600 text-lg">🎨</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900">Feature One</h3>
    <p class="text-gray-600 text-sm mt-2">Description of first feature goes here.</p>
  </div>

  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-green-600 text-lg">⚡</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900">Feature Two</h3>
    <p class="text-gray-600 text-sm mt-2">Description of second feature goes here.</p>
  </div>

  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-purple-600 text-lg">🔧</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900">Feature Three</h3>
    <p class="text-gray-600 text-sm mt-2">Description of third feature goes here.</p>
  </div>

  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
      <span class="text-orange-600 text-lg">📊</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900">Feature Four</h3>
    <p class="text-gray-600 text-sm mt-2">Description of fourth feature goes here.</p>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile (0-768px)**: `grid-cols-1` (single column stack)
- **Tablet (768px+)**: `md:grid-cols-2` (2 columns)
- **Desktop (1024px+)**: `lg:grid-cols-2` (maintain 2×2)

---

## Pattern 2: 1 Large + 2 Small (3 Features)

**Use case**: Feature showcase with hero feature, pricing with recommended tier, portfolio with featured project.

**Grid structure**: 1 cell spans 2×2, 2 cells span 1×1

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <!-- Large Hero Cell (spans 2×2 on desktop) -->
  <div class="col-span-1 md:col-span-2 md:row-span-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
    <h3 class="text-3xl font-bold mb-4">Featured Feature</h3>
    <p class="text-blue-100 mb-6">This is the hero feature that gets the most emphasis and visual priority.</p>
    <button class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
      Learn More
    </button>
  </div>

  <!-- Small Cell 1 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Supporting Feature 1</h4>
    <p class="text-gray-600 text-sm mt-2">Secondary feature supporting the hero.</p>
  </div>

  <!-- Small Cell 2 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Supporting Feature 2</h4>
    <p class="text-gray-600 text-sm mt-2">Another supporting feature for balance.</p>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: Hero takes full width, supporting features stack below
- **Tablet**: Hero spans 2 columns, features stack on right
- **Desktop**: Hero is 2×2, features are 1×1 beside it

---

## Pattern 3: L-Shape Hero (5 Items)

**Use case**: Content showcases with 1 hero + 4 supporting items.

**Grid structure**: 1 hero (2×2) top-left, 2 items right column (1×1 each), 2 items bottom row (1×1 each)

```html
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- Large Hero Top-Left (2×2 on desktop) -->
  <div class="col-span-1 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden shadow-lg bg-gray-900 relative">
    <img src="/hero-image.jpg" alt="Hero" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
      <h3 class="text-2xl font-bold text-white">Hero Content</h3>
    </div>
  </div>

  <!-- Top Right Items (1×1 each) -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <img src="/item-2.jpg" alt="Item 2" class="w-full h-32 object-cover rounded-md mb-3">
    <h4 class="font-semibold text-gray-900 text-sm">Item 2</h4>
  </div>

  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <img src="/item-3.jpg" alt="Item 3" class="w-full h-32 object-cover rounded-md mb-3">
    <h4 class="font-semibold text-gray-900 text-sm">Item 3</h4>
  </div>

  <!-- Bottom Row Items (1×1 each) -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <img src="/item-4.jpg" alt="Item 4" class="w-full h-32 object-cover rounded-md mb-3">
    <h4 class="font-semibold text-gray-900 text-sm">Item 4</h4>
  </div>

  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <img src="/item-5.jpg" alt="Item 5" class="w-full h-32 object-cover rounded-md mb-3">
    <h4 class="font-semibold text-gray-900 text-sm">Item 5</h4>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: Single column, all items stack
- **Tablet**: Hero spans 2 cols, items arrange below
- **Desktop**: L-shape with hero 2×2, items in remaining grid positions

---

## Pattern 4: Dashboard 4-Panel (5 Items)

**Use case**: Metrics dashboards, admin panels, analytics overviews.

**Grid structure**: 1 large metric (2×2), 4 small metrics (1×1)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- Primary Metric (2×2) -->
  <div class="col-span-1 md:col-span-2 md:row-span-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
    <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Revenue</h3>
    <p class="text-5xl font-bold text-blue-600 mt-4">$124,567</p>
    <p class="text-blue-600 text-sm mt-4">↑ 12.5% from last month</p>
  </div>

  <!-- Secondary Metric 1 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="text-xs font-semibold text-gray-500 uppercase">Active Users</h4>
    <p class="text-3xl font-bold text-gray-900 mt-3">2,456</p>
    <p class="text-green-600 text-xs mt-2">↑ 8.2%</p>
  </div>

  <!-- Secondary Metric 2 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="text-xs font-semibold text-gray-500 uppercase">Conversion Rate</h4>
    <p class="text-3xl font-bold text-gray-900 mt-3">3.24%</p>
    <p class="text-green-600 text-xs mt-2">↑ 0.5%</p>
  </div>

  <!-- Secondary Metric 3 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="text-xs font-semibold text-gray-500 uppercase">Avg Order Value</h4>
    <p class="text-3xl font-bold text-gray-900 mt-3">$187.50</p>
    <p class="text-red-600 text-xs mt-2">↓ 2.1%</p>
  </div>

  <!-- Secondary Metric 4 -->
  <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
    <h4 class="text-xs font-semibold text-gray-500 uppercase">Churn Rate</h4>
    <p class="text-3xl font-bold text-gray-900 mt-3">2.3%</p>
    <p class="text-green-600 text-xs mt-2">↓ 0.8%</p>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: All metrics single column
- **Tablet**: Primary metric spans 2 cols, others stack
- **Desktop**: Primary is 2×2, 4 secondary metrics arranged around it

---

## Pattern 5: 3-Column Magazine (7 Items)

**Use case**: Blog homepage, product grids, content showcases.

**Grid structure**: 1 hero (1×2), 2 standard (1×1 each), 3 small (1×1 each)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <!-- Large Featured Article (spans 2 rows on desktop) -->
  <div class="col-span-1 md:row-span-2 rounded-lg overflow-hidden shadow-lg group">
    <div class="relative h-64 md:h-full overflow-hidden bg-gray-300">
      <img src="/featured.jpg" alt="Featured" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
    </div>
    <div class="p-6 bg-white">
      <span class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">Featured</span>
      <h3 class="text-xl font-bold text-gray-900 line-clamp-2">Featured Article Title</h3>
      <p class="text-gray-600 text-sm mt-3">Brief description of the featured article.</p>
    </div>
  </div>

  <!-- Standard Articles (1×1 each) -->
  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-2.jpg" alt="Article 2" class="w-full h-40 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 line-clamp-2">Article 2 Title</h4>
      <p class="text-gray-600 text-xs mt-1">Brief excerpt here.</p>
    </div>
  </div>

  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-3.jpg" alt="Article 3" class="w-full h-40 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 line-clamp-2">Article 3 Title</h4>
      <p class="text-gray-600 text-xs mt-1">Brief excerpt here.</p>
    </div>
  </div>

  <!-- Small Articles (1×1 each) -->
  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-4.jpg" alt="Article 4" class="w-full h-32 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 text-sm line-clamp-2">Small Article 4</h4>
    </div>
  </div>

  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-5.jpg" alt="Article 5" class="w-full h-32 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 text-sm line-clamp-2">Small Article 5</h4>
    </div>
  </div>

  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-6.jpg" alt="Article 6" class="w-full h-32 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 text-sm line-clamp-2">Small Article 6</h4>
    </div>
  </div>

  <div class="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">
    <img src="/article-7.jpg" alt="Article 7" class="w-full h-32 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900 text-sm line-clamp-2">Small Article 7</h4>
    </div>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: All items single column, featured on top
- **Tablet**: Featured spans 2 rows, articles beside it
- **Desktop**: 3-column layout, featured tall on left, 6 articles arranged right

---

## Pattern 6: Asymmetric Showcase (8 Items)

**Use case**: Portfolio grids, service showcases, feature highlights.

**Grid structure**: Mix of 1×1, 1×2, 2×1, 2×2 cells

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- 2×2 Hero -->
  <div class="col-span-1 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden shadow-lg">
    <img src="/hero.jpg" alt="Hero" class="w-full h-full object-cover">
  </div>

  <!-- 2×1 Wide Block -->
  <div class="col-span-1 md:col-span-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white flex items-center">
    <div>
      <h3 class="text-xl font-bold">Wide Feature</h3>
      <p class="text-pink-100 text-sm mt-1">Takes full width on tablet and up.</p>
    </div>
  </div>

  <!-- 1×1 Standard -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Item 1</h4>
  </div>

  <!-- 1×1 Standard -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Item 2</h4>
  </div>

  <!-- 1×2 Tall Block -->
  <div class="col-span-1 row-span-1 md:row-span-2 rounded-lg bg-yellow-50 border border-yellow-200 p-6">
    <h4 class="font-bold text-yellow-900">Tall Item</h4>
    <p class="text-yellow-700 text-sm mt-2">This spans 2 rows on desktop.</p>
  </div>

  <!-- 1×1 Standard -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Item 3</h4>
  </div>

  <!-- 1×1 Standard -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Item 4</h4>
  </div>

  <!-- 1×1 Standard -->
  <div class="rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
    <h4 class="font-semibold text-gray-900">Item 5</h4>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: Single column, items stack naturally
- **Tablet**: 2-column layout, hero spans 2 cols/rows, wide block spans 2 cols
- **Desktop**: Full 4-column asymmetric layout with varied spans

---

## Pattern 7: Metrics Bar + Content (6 Items)

**Use case**: Homepage stats sections, KPI dashboards followed by content.

**Grid structure**: 1 row of 3 stat boxes (1×1), followed by 3 content cards (1×1)

```html
<div class="space-y-8">
  <!-- Metrics Row -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
    <div class="rounded-lg bg-blue-50 p-6 border border-blue-200">
      <p class="text-blue-600 text-sm font-semibold uppercase tracking-wide">Metric 1</p>
      <p class="text-4xl font-bold text-blue-900 mt-2">2.5M</p>
      <p class="text-blue-700 text-xs mt-2">↑ 15% increase</p>
    </div>

    <div class="rounded-lg bg-green-50 p-6 border border-green-200">
      <p class="text-green-600 text-sm font-semibold uppercase tracking-wide">Metric 2</p>
      <p class="text-4xl font-bold text-green-900 mt-2">94%</p>
      <p class="text-green-700 text-xs mt-2">↑ 3% increase</p>
    </div>

    <div class="rounded-lg bg-orange-50 p-6 border border-orange-200">
      <p class="text-orange-600 text-sm font-semibold uppercase tracking-wide">Metric 3</p>
      <p class="text-4xl font-bold text-orange-900 mt-2">$48B</p>
      <p class="text-orange-700 text-xs mt-2">↑ 22% increase</p>
    </div>
  </div>

  <!-- Content Cards Below -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
      <h4 class="font-semibold text-gray-900">Content 1</h4>
      <p class="text-gray-600 text-sm mt-2">Supporting content here.</p>
    </div>

    <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
      <h4 class="font-semibold text-gray-900">Content 2</h4>
      <p class="text-gray-600 text-sm mt-2">Supporting content here.</p>
    </div>

    <div class="rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
      <h4 class="font-semibold text-gray-900">Content 3</h4>
      <p class="text-gray-600 text-sm mt-2">Supporting content here.</p>
    </div>
  </div>
</div>
```

**Responsive behavior**:
- **Mobile**: Metrics stack single-column, content stacks below
- **Tablet**: 3-column metrics, content stacks 2-column below
- **Desktop**: 3-column metrics, 3-column content, good visual separation

---

## Pattern 8: Masonry-Style (9+ Items)

**Use case**: Photo galleries, testimonials, case studies (when content height varies naturally).

**Note**: True CSS masonry requires `column-count` (not Grid). Use this for variable-height content.

```html
<div class="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4">
  <!-- Item 1 (tall) -->
  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-1.jpg" alt="Item 1" class="w-full h-64 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Tall Item 1</h4>
      <p class="text-gray-600 text-sm mt-1">Content for item 1.</p>
    </div>
  </div>

  <!-- Item 2 (short) -->
  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-2.jpg" alt="Item 2" class="w-full h-40 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Short Item 2</h4>
    </div>
  </div>

  <!-- Item 3 (medium) -->
  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-3.jpg" alt="Item 3" class="w-full h-48 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Medium Item 3</h4>
      <p class="text-gray-600 text-sm mt-1">Content for item 3.</p>
    </div>
  </div>

  <!-- Repeat pattern for items 4-9+ -->
  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-4.jpg" alt="Item 4" class="w-full h-56 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 4</h4>
    </div>
  </div>

  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-5.jpg" alt="Item 5" class="w-full h-44 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 5</h4>
    </div>
  </div>

  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-6.jpg" alt="Item 6" class="w-full h-52 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 6</h4>
    </div>
  </div>

  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-7.jpg" alt="Item 7" class="w-full h-40 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 7</h4>
    </div>
  </div>

  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-8.jpg" alt="Item 8" class="w-full h-48 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 8</h4>
    </div>
  </div>

  <div class="break-inside-avoid rounded-lg overflow-hidden shadow-md bg-white">
    <img src="/item-9.jpg" alt="Item 9" class="w-full h-44 object-cover">
    <div class="p-4">
      <h4 class="font-semibold text-gray-900">Item 9</h4>
    </div>
  </div>
</div>
```

**Key utilities for masonry**:
- `columns-1 md:columns-2 lg:columns-3` — responsive column count
- `break-inside-avoid` — prevents card breakage across columns
- `space-y-4` — gap between items
- Vary `h-*` heights to create natural flow

**Responsive behavior**:
- **Mobile**: `columns-1` (single column)
- **Tablet**: `md:columns-2` (2 columns, items flow naturally)
- **Desktop**: `lg:columns-3` (3 columns, staggered layout)

---

## Quick Reference: Which Pattern to Use?

| Items | Pattern | Use Case |
|-------|---------|----------|
| 4 | 2×2 Equal | 4 features, pricing tiers, team members |
| 3-5 | 1 Large + Small | Hero feature, featured project, recommended tier |
| 5-6 | L-Shape Hero | Content showcase, portfolio grid |
| 5-6 | Dashboard 4-Panel | Metrics, admin panel, KPIs |
| 7-10 | 3-Column Magazine | Blog homepage, product listing |
| 8-10 | Asymmetric | Portfolio, service showcase, varied importance |
| 6 | Metrics Bar + Content | Stats section + supporting content |
| 9+ | Masonry | Photo gallery, testimonials, variable-height content |

---

## Tips for Success

1. **Mobile first**: Test on 375px width first, then scale up
2. **Consistent gaps**: Use same `gap-*` throughout to maintain visual alignment
3. **Line clamp long titles**: Use `line-clamp-2` to prevent text overflow in constrained cells
4. **Hover effects**: Add subtle `hover:shadow-lg transition-shadow` for interactivity
5. **Reset spans on small screens**: Always use `col-span-1 md:col-span-*` pattern
6. **Image aspect ratios**: Use `object-cover` with fixed heights (`h-40`, `h-64`) to avoid layout shift
7. **Accessibility**: Ensure link/button targets are at least 44×44px for touch targets
