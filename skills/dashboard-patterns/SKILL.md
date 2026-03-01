---
name: dashboard-patterns
description: Dashboard layout patterns, chart selection, and state management for data-heavy interfaces. Covers KPI cards, data tables, charts, filters, and 4-state component handling (loading, empty, error, data). Triggers: "dashboard design", "analytics dashboard", "admin panel", "data visualization", "chart selection", "dashboard layout".
version: 1.0.0
license: MIT
---

# Dashboard Patterns Skill

## Purpose

This skill provides production-ready layouts and component patterns for dashboards, admin panels, analytics interfaces, and data-heavy applications. Dashboards require special handling: progressive data loading (skeleton states), empty states (no data yet), error states (API failed), and chart selection (pick the right visualization). The skill covers information architecture (hierarchy), chart selection guide (which visualization for which data), component patterns (KPI cards, data tables, filters), and the critical 4-state pattern that prevents blank screens and confused users.

## When to Use

- **Building a new dashboard**: Admin panel, analytics interface, CRM view, client reporting
- **Selecting a chart type**: How to visualize trends, distributions, comparisons
- **Designing for loading states**: Skeleton screens, progressive enhancement
- **Empty state design**: What to show when there's no data yet
- **Error state design**: API failed; show clear message + retry option
- **Data table patterns**: Sorting, filtering, pagination, responsive behavior
- **Responsive dashboard**: Desktop vs mobile data density
- **Dark mode dashboard**: Ensure contrast, readability in dark mode

Trigger phrases: "dashboard layout", "which chart should I use?", "empty state", "loading skeleton", "data table design", "KPI card", "admin panel".

## Key Concepts

### Information Architecture

Dashboard hierarchy from top to bottom:

```
Navigation (sidebar or top bar)
        ↓
Page Header (title + filters + action buttons)
        ↓
KPI Cards (top-level metrics: 4-6 cards)
        ↓
Charts / Visualizations (detail: line chart, bar chart, heatmap)
        ↓
Data Table (full detail: sortable, filterable, paginated)
        ↓
Activity Feed (recent events, audit log)
```

**Sidebar Navigation**:
- Icon + label (both visible, not icon-only)
- Active state (highlight current page)
- Collapse/expand for mobile (icon sidebar on 320px screens)
- Nested sections (expandable groups of related pages)

**Page Header**:
- Bold title (h1, large font)
- Date range or time period selector
- Key filters (status, team, category)
- Action buttons (export, download, create)
- Last updated timestamp

**KPI Cards**:
- Large number (48-56px font)
- Label (what the number means)
- Trend indicator (↑ 12% or ↓ 5%)
- Optional sparkline (tiny line chart)
- Color-coded: green (up/good), red (down/bad), gray (neutral)

### Chart Selection Guide

Choose visualization based on data type and story:

| Data Type | Best Chart | Why | Example |
|-----------|-----------|-----|---------|
| **Trend over time** | Line chart | Shows direction and rate of change clearly | Revenue per month over 12 months |
| **Part of whole** | Donut chart (≤5 segments) | Pie is hard to compare; donut easier to read | Budget allocation: 40% salaries, 30% marketing, 20% infrastructure, 10% other |
| **Comparison** | Horizontal bar chart | Easy to label, easy to rank | Sales by region: East > West > Central |
| **Distribution** | Histogram or violin plot | Shows frequency and spread | Score distribution: 50% A, 30% B, 15% C, 5% D |
| **Correlation** | Scatter plot | Reveals relationship between 2 variables | Customer lifetime value vs account age |
| **Composition change** | Stacked area chart | Shows how parts change over time | Traffic source: organic vs paid vs direct |
| **Performance ranking** | Bullet chart | Shows actual vs target vs benchmark | Q4 sales vs target vs last year |
| **Single metric** | Big number + sparkline | Quick glance value + trend | Total customers: 1,234 (↑ 5% this week) |
| **Multiple metrics, same category** | Grouped bar chart | Easy comparison side-by-side | Product A vs Product B: sales, profit, units |
| **Hierarchical data** | Treemap | Shows part-to-whole AND size | Disk usage by folder |

**Anti-patterns**:
- Pie chart with >5 segments (hard to compare sizes)
- 3D charts (distorts proportions)
- Dual-axis chart (confusing scaling)
- Rainbow colors (hard to distinguish)

### Data Density & Progressive Disclosure

- **Desktop (1920px+)**: Show 4-6 KPI cards, 2 charts, full data table
- **Tablet (768px)**: Show 2-3 KPI cards, 1 chart, scrollable table
- **Mobile (320px)**: Show 2 KPI cards stacked, 1 chart, vertical scroll table with horizontal scroll for columns

Use **progressive disclosure**: tap to expand, click row to see full details, expandable sections.

### Number Formatting

- **Large numbers**: Use abbreviations — 1.2M (not 1,200,000), 45K, 3.5B
- **Currency**: Always 2 decimals — $1,234.56 (not $1,234 or $1,234.5)
- **Percentages**: 1 decimal — 12.5% (not 12.54% or 12%)
- **Trend direction**: Always show arrow — ↑ 12.3%, ↓ 5.2%, → 0% (no change)
- **Date format**: Relative first — "2 hours ago", fallback to "Feb 28, 2:45 PM"

### 4-State Pattern (CRITICAL)

Every dashboard component MUST handle these 4 states:

**1. Loading State**
- Show skeleton placeholder (gray pulse animation)
- Don't show 0 values (confusing)
- Show subtle text: "Loading..."
- Duration: show skeleton for 200-800ms (feel natural, not too fast)

**2. Empty State**
- Show illustration or icon
- Headline: "No data yet"
- Subheading: "Try adjusting your filters" or "Check back later"
- Primary action: "Create your first item" or "Reset filters"
- Don't show error color (it's not an error)

**3. Error State**
- Show error icon (red)
- Clear error message: "Failed to load data. Reason: API timeout"
- Retry button: "Try again"
- Optional: technical details in small text
- Auto-retry: some dashboards retry after 5-10 seconds

**4. Data State**
- Normal display
- Show all states (default, hover, active)
- Loading indicator for real-time updates

## Instructions

### 1. Sidebar Navigation Layout

```tsx
<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
  {/* Sidebar */}
  <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-200 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}>

    {/* Logo */}
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <img src="logo.svg" alt="Logo" className="w-8 h-8" />
    </div>

    {/* Navigation items */}
    <nav className="p-4 space-y-2">
      {[
        { icon: 'BarChart3', label: 'Dashboard', href: '/' },
        { icon: 'TrendingUp', label: 'Analytics', href: '/analytics' },
        { icon: 'Settings', label: 'Settings', href: '/settings' }
      ].map(item => (
        <a
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive(item.href)
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
        </a>
      ))}
    </nav>

    {/* Toggle button */}
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="absolute bottom-4 left-4 p-2 rounded hover:bg-gray-100"
    >
      {sidebarOpen ? '←' : '→'}
    </button>
  </aside>

  {/* Main content */}
  <main className="flex-1 overflow-y-auto p-6">
    {/* Dashboard content */}
  </main>
</div>
```

**Key patterns**:
- `transition-all duration-200` for smooth collapse/expand
- Active state with background color + text color
- Relative icons (no label on mobile)
- Dark mode colors with `dark:` prefix

### 2. KPI Card Component

**Basic card**:
```tsx
function KPICard({ label, value, trend, sparkData }) {
  const trendColor = trend > 0 ? 'text-green-600' : 'text-red-600';
  const arrow = trend > 0 ? '↑' : '↓';

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:bg-gray-800 p-6">

      {/* Label */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>

      {/* Value */}
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>

      {/* Trend */}
      <p className={`mt-2 text-sm font-medium ${trendColor}`}>
        {arrow} {Math.abs(trend)}% vs last month
      </p>

      {/* Sparkline (optional) */}
      {sparkData && (
        <div className="mt-4 h-8">
          <Sparkline data={sparkData} />
        </div>
      )}
    </div>
  );
}
```

**Loading state**:
```tsx
function KPICardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-9 w-40 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
```

**Usage with 4-state pattern**:
```tsx
if (loading) return <KPICardSkeleton />;
if (error) return <KPICardError onRetry={refetch} />;
if (!data) return <KPICardEmpty />;
return <KPICard {...data} />;
```

### 3. Data Table

**Responsive table with sort + filter + pagination**:

```tsx
function DataTable({ columns, data, onSort, sortKey, sortDir }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full">

        {/* Header */}
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => onSort(col.key)}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && (
                    <span className="text-gray-400">
                      {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '◇'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex}-{endIndex} of {totalRows}
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border hover:bg-gray-50 dark:hover:bg-gray-700">Previous</button>
          <button className="px-3 py-1 rounded border hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
}
```

**Empty state (no rows)**:
```tsx
function TableEmpty() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No data</h3>
      <p className="mt-1 text-sm text-gray-600">Try adjusting your filters or date range.</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Clear filters
      </button>
    </div>
  );
}
```

### 4. Filter Bar

```tsx
function FilterBar({ filters, onFilterChange, onReset }) {
  return (
    <div className="flex flex-wrap gap-3 items-center rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">

      {/* Date range */}
      <input
        type="date"
        value={filters.startDate}
        onChange={e => onFilterChange({ startDate: e.target.value })}
        className="px-3 py-2 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700 text-sm"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={filters.endDate}
        onChange={e => onFilterChange({ endDate: e.target.value })}
        className="px-3 py-2 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700 text-sm"
      />

      {/* Status dropdown */}
      <select
        value={filters.status}
        onChange={e => onFilterChange({ status: e.target.value })}
        className="px-3 py-2 rounded border border-gray-200 dark:border-gray-600 dark:bg-gray-700 text-sm"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Clear button */}
      <button
        onClick={onReset}
        className="ml-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700"
      >
        Clear all
      </button>
    </div>
  );
}
```

### 5. Activity Feed

```tsx
function ActivityFeed({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event, idx) => (
        <div key={idx} className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
          <img src={event.avatar} alt="" className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {event.user} <span className="font-normal text-gray-600 dark:text-gray-400">{event.action}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.timeAgo}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```


## Common Pitfalls

### 1. No Loading/Empty/Error States
**Problem**: Data just disappears while loading, or blank screen on error.
**Solution**: Implement 4-state pattern. Use skeleton screens for loading, empty state UI, error message + retry button.

### 2. Too Many KPI Cards
**Problem**: Dashboard has 10+ cards, overwhelming the user.
**Solution**: Max 4-6 cards per row. Prioritize top 4-8 metrics. Move secondary metrics to detail pages.

### 3. Unlabeled Charts
**Problem**: Chart has no title, legend, or axis labels. User confused what they're looking at.
**Solution**: Always include title, axis labels, legend, units (%, $, units sold), and data point labels on hover.

### 4. No Responsive Strategy
**Problem**: Data table works on desktop but overflows mobile screen.
**Solution**: Use horizontal scroll for tables on mobile. Stack KPI cards 1-2 per row. Hide non-essential columns on mobile.

### 5. Real-Time Updates Without Indicator
**Problem**: Data updates silently; user unaware if they're looking at fresh data.
**Solution**: Show "Last updated: 2 minutes ago" with refresh button. Pulse animation on updated KPI cards. Real-time badge.

### 6. Color-Only Status Indicators
**Problem**: Red/green status column with no icon or text (inaccessible, color-blind users confused).
**Solution**: Use color + icon + text — 🔴 Failed or ✓ Active (not just red or green).

### 7. No Empty State
**Problem**: User creates first item but dashboard shows nothing (thinks app is broken).
**Solution**: Show "No data yet" message + clear action (upload CSV, create first item, check back tomorrow).

## Example: SaaS Analytics Dashboard

A complete dashboard showing KPI row, chart, and data table in a responsive layout:

```tsx
export function AnalyticsDashboard() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Analytics</h1>

      {/* KPI Row - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard label="Revenue" value="$42.5K" trend={12.3} />
        <KPICard label="Signups" value="2,341" trend={5.2} />
        <KPICard label="Churn Rate" value="2.1%" trend={-1.8} />
        <KPICard label="Avg LTV" value="$1,250" trend={8.7} />
      </div>

      {/* Charts - 2 column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>
          <LineChart data={trendData} />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Traffic by Source</h3>
          <BarChart data={sourceData} />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable columns={columns} data={transactions} onSort={handleSort} />
      </div>
    </main>
  );
}
```

This layout prioritizes top KPIs (quick scan), charts (trends), and detailed table (drill-down). Use the 4-state pattern on each section for loading/error/empty/data states.

## References

- **Chart libraries**: Recharts, Tremor UI, Chart.js
- **Accessibility**: WCAG 2.1 AA (4.5:1 contrast), focus management, keyboard navigation
- **Related skills**: `color-system`, `component-patterns`, `dark-mode`
