---
name: data-visualization
description: Data visualization design patterns — chart type selection guide, color palettes for data, accessible charts, annotation and labeling, D3.js/Recharts/Chart.js implementation, sparklines, and data storytelling principles. Trigger: "data visualization", "chart design", "data viz", "D3", "Recharts", "chart type".
version: 1.0.0
license: MIT
---

## Purpose

Data visualization turns numbers into understanding. Choosing the wrong chart type, poor color usage, or inaccessible design makes data meaningless. This skill covers chart selection, visual encoding, and implementation patterns for web applications.

You are a data visualization architect. Your role is to match data structure to appropriate visual form, ensure colors serve data clarity (not decoration), and deliver accessible, interactive charts that tell data stories.

**Who uses it**: Product managers building dashboards, data analysts creating reports, developers implementing charts, designers creating data-driven interfaces.

**When to use it**: Building any dashboard, report, or data-driven product feature. Before selecting a charting library. When accessibility or interactive behavior matters.

## When to Use

- **Dashboard or analytics product**: Multiple charts, data clarity is primary goal.
- **Data-heavy feature**: Tables, trends, comparisons, distributions need visualization.
- **Accessible product**: Charts must work for users with color blindness, low vision, or screen readers.
- **Interactive reports**: Tooltips, filtering, drill-down, or linked charts across pages.
- **Design system documentation**: Need chart guidelines for consistency across products.

**Not for**: Static infographics (use graphic design skill). Chart animation timing (use motion-design skill). Data processing or transformation (that's engineering). Chart-specific implementations without design decisions.

---

## Key Concepts

### Chart Selection Decision Tree

Choose based on your data task:

```
Comparing values
  ├─ Few categories (≤5) → Bar or Column chart
  ├─ Many categories (>5) → Horizontal bar or small multiples
  └─ With time axis → Column chart by time period

Showing trends over time
  ├─ Single series → Line chart
  ├─ Multiple series (≤3) → Line chart with legend
  ├─ Multiple series (>3) → Small multiples
  └─ Cumulative trend → Area chart (stacked or single)

Part-of-whole
  ├─ ≤5 segments → Donut or pie (donut preferred)
  ├─ >5 segments → Stacked bar
  └─ Hierarchical → Treemap or sunburst

Distribution or frequency
  ├─ Continuous data → Histogram or KDE
  ├─ Categorical frequency → Bar chart
  └─ Two-variable distribution → Scatter plot

Relationship between two variables
  ├─ Linear relationship → Scatter with trend line
  ├─ Non-linear pattern → Scatter with loess smoothing
  └─ Categorical vs continuous → Box plot or violin plot

Geographic or spatial
  └─ By region → Choropleth map

Single KPI or headline metric
  ├─ Point-in-time value → Large number + semantic color
  ├─ Change over time → KPI card with sparkline
  └─ Progress toward goal → Progress bar or gauge
```

**Rule**: If you're not sure, choose bar or line. They work for 80% of cases.

### Visual Encoding Hierarchy

Effectiveness of visual encodings (most → least):

1. **Position** — X and Y axis placement. Most effective. Use for primary dimension.
2. **Length** — Bar height or width. Very effective. Use for numeric values.
3. **Angle** — Pie slices or rotation. Less effective; harder to compare. Avoid if possible.
4. **Area** — Bubble size or heatmap cells. Perceptually confusing; hard to judge magnitude.
5. **Color saturation** — Light to dark. Works well for sequential data (low → high).
6. **Color hue** — Different colors. Works for categorical data; limited to 5-8 distinct colors.

**Application**: Put your most important data on the X or Y axis, not in color alone. Use color to highlight or categorize, not as the primary encoding.

### Color for Data

Three color strategies based on data type:

**Sequential** — Light to dark. For continuous data (0 to 100, low to high).
- Start: Light, neutral (almost white)
- Middle: Medium tone with target hue
- End: Dark, saturated
- Example: #EDF8F5 → #1F9E78 (light to dark teal for temperature)
- Use for: Heatmaps, intensity, percentages, rankings

**Diverging** — Two hues from center. For data with meaningful center point (e.g., -10 to +10, loss vs. profit, below vs. above target).
- Negative: Cool color (blue)
- Center: Neutral (light gray or white)
- Positive: Warm color (orange or red)
- Example: #2166AC (blue) → #F7F7F7 (white) → #B35806 (orange)
- Use for: Profit/loss, change from baseline, approval ratings, regional performance vs. national

**Categorical** — Distinct hues. For categories with no natural order (products, regions, teams).
- Limit to 5-8 colors max. More than 8 becomes indistinguishable.
- Space hues evenly around color wheel
- Ensure sufficient contrast between adjacent colors
- Use colorblind-safe palettes (Viridis, Cividis, IBM Carbon)

**Colorblind-safe palettes**:
- **Viridis**: Purple, green, yellow. Works for all colorblindness types.
- **Cividis**: Blue, yellow. Optimized for red-green blindness (most common).
- **IBM Carbon**: Eight distinct colors, accessibility tested. Use for categorical.

### Annotation & Labeling

Reduce cognitive load with smart labeling:

**Direct labels** — Put data values directly on chart, not in legend.
- Text placed near data point (above bar, end of line, inside pie slice)
- Removes eye travel between chart and legend
- Works best for ≤5 data points; too many creates clutter

**Highlight key insights** — Call attention to important data with visual emphasis:
- Bold line for primary series in multi-line chart
- Brighter color for surprising data point
- Callout box with arrow pointing to outlier
- Use carefully; highlighting creates visual hierarchy

**Axis labels and units** — Every number needs context:
- X and Y axes must be labeled
- Include units ($, %, kg, etc.) in axis label or near numbers
- Format large numbers (1.2M not 1,200,000)
- Right-align numeric values in tables

**Chart title as insight** — Title states the finding, not description:
- Bad: "Revenue Chart"
- Good: "Revenue grew 23% YoY, driven by Q4 sales"
- Title becomes the headline, chart is supporting evidence

**Legends** — Use only when direct labeling isn't possible:
- Ordered logically (by series size, importance, or category alphabetically)
- Placed near data it represents (top-right for stacked charts, below for horizontal)
- Use visual markers (line, color swatch, marker icon) that match chart

### Accessible Charts

Charts must work for all users:

**ARIA labels** — Provide text alternative:
```html
<svg role="img" aria-label="Revenue by quarter: Q1 $250K, Q2 $310K, Q3 $290K, Q4 $380K">
  <!-- Chart content -->
</svg>
```

**Alt text** — Describe data and insight, not just "chart":
- Bad: "Bar chart showing revenue"
- Good: "Bar chart showing quarterly revenue with peak of $380K in Q4"

**Color + pattern** — Don't use color alone to encode information:
- Add pattern fills (stripes, dots, hatching) to color-coded bars
- Use different line styles (solid, dashed, dotted) for line series
- Ensure 3:1 minimum contrast ratio between adjacent colors

**Interactive fallbacks** — For interactive charts:
- Tooltip text must be readable (min 12px, high contrast)
- Keyboard navigation: arrow keys to focus data points, Enter to show detail
- Touch targets: hover areas must be ≥44x44px
- Screen reader announces changes on interaction

**Text in graphics** — All text in charts must be:
- Readable at actual display size (min 12px)
- High contrast against background (min 4.5:1 ratio)
- In system fonts or embedded font files (not rasterized as image)

### Number Formatting

Always format numbers for clarity:

```javascript
// Use Intl.NumberFormat for locale-aware formatting
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact'
});

formatter.format(1200000); // "$1.2M"

// For large numbers without currency
const largeNum = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
});

largeNum.format(1200000); // "1.2M"

// Percentages with consistent decimals
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

pct.format(0.234); // "23.4%"
```

### Responsive Charts

Charts must adapt to viewport size:

**SVG-based charts** (D3, Recharts) scale naturally if viewBox is set:
```jsx
<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
  {/* Chart content scales with container */}
</svg>
```

**Mobile strategy**:
- Simplify on small screens: remove axis labels, use shorter category names
- Increase touch targets: hover areas ≥44x44px
- Consider small multiples instead of complex charts
- Stack bars vertically; use column layout instead of horizontal bars
- Test at actual sizes (not just browser resize)

**Container queries** — Use CSS container queries for responsive token sizing:
```css
@container (max-width: 400px) {
  .chart-label { font-size: 12px; }
  .chart-axis { display: none; }
}
```

---

## Library Comparison

| Library | Best For | Bundle Size | React Integration | Learning Curve |
|---------|----------|-------------|-------------------|-----------------|
| **D3.js** | Custom, complex, interactive graphics | 80KB | Via hooks (need to learn D3) | Steep |
| **Recharts** | Standard charts in React apps | 150KB | Native components | Easy |
| **Chart.js** | Quick canvas charts, plugins | 65KB | react-chartjs-2 wrapper | Easy |
| **Visx** | D3 primitives for React | Modular (10-30KB each) | Native components | Medium |
| **Nivo** | Declarative D3 charts | Modular | Native; extensive customization | Medium |
| **Tremor** | Dashboard charts (Tailwind-native) | 50KB | Native; styled with Tailwind | Very Easy |

**Recommendation by use case**:
- **Dashboard with standard charts**: Recharts or Tremor
- **Analytics app with interactions**: Visx or Nivo
- **Custom visualization**: D3.js
- **Quick prototype**: Chart.js or Tremor
- **Design system with chart token consistency**: Recharts + custom color system

---

## Instructions

### 1. Select Chart Type

Use the decision tree in Key Concepts. Answer:
- What data task? (Compare, trend, part-of-whole, distribution, relationship, geographic, KPI)
- How many data points or categories?
- Is interactivity needed? (Hover, drill-down, filtering)

Map to chart type. Stop if unclear — ask the user for clarification before designing.

### 2. Design Color Encoding

Determine data type:
- **Sequential**: Light-to-dark. Example: heatmap of performance scores.
- **Diverging**: Blue-gray-orange. Example: approval ratings (disagree to agree).
- **Categorical**: 5-8 distinct colors. Example: products, regions, teams.

Choose colorblind-safe palette:
- Viridis (universal)
- Cividis (optimized for red-green blindness)
- IBM Carbon categorical palette (accessibility tested)

Test: Use colorblindness simulator (Coblis or Color Oracle) to verify all users see data differences.

### 3. Label and Annotate

Apply direct labeling strategy:
1. **Axis labels**: Every axis must be labeled (x-axis, y-axis) with units
2. **Data labels**: Critical values labeled directly on chart (total, max, min)
3. **Title**: Write title as insight ("Revenue grew 23%"), not description ("Revenue Chart")
4. **Legend**: Only if ≤3 series or if direct labeling not possible
5. **Reference lines**: Highlight targets, thresholds, or baselines with annotation

### 4. Ensure Accessibility

For every chart, implement:
- `role="img"` on SVG with descriptive `aria-label`
- Alt text describing data summary and key insight
- Color + pattern encoding (not color alone)
- Minimum 3:1 contrast ratio
- Tooltip text readable (12px+, high contrast)
- Keyboard navigation support (if interactive)

### 5. Code Pattern — Recharts Example

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 250000, target: 280000 },
  { month: 'Feb', revenue: 310000, target: 280000 },
  { month: 'Mar', revenue: 290000, target: 280000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value) => `$${(value/1000).toFixed(0)}K`}
          contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#3b82f6" name="Actual" />
        <Bar dataKey="target" fill="#e5e7eb" name="Target" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### 6. Accessible Chart with ARIA

```jsx
export function AccessibleChart({ data, title, description }) {
  // Generate descriptive aria-label from data
  const dataSummary = data.map(d => `${d.label}: ${d.value}`).join(', ');
  const ariaLabel = `${title}. ${description}. Data: ${dataSummary}`;

  return (
    <figure>
      <svg role="img" aria-label={ariaLabel} className="w-full">
        {/* Chart rendering */}
      </svg>
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
```

---

## Examples

### Example 1: Sales Dashboard

Data: Monthly sales by product (3 products over 12 months). **Chart**: Grouped column chart. **Color**: 3 categorical colors (IBM Carbon). **Annotation**: Target line at $300K. **Responsive**: Small multiples on mobile.

### Example 2: Performance Heatmap

Data: 20 metrics across 4 quarters (80-100 scale). **Chart**: Heatmap. **Color**: Sequential (Viridis, darker = better). **Accessibility**: Numeric labels in cells + high contrast.

### Example 3: Budget Allocation

Data: Marketing budget across 6 channels. **Chart**: Donut (not pie). **Color**: 6 distinct colors. **Annotation**: Center label with total. Click segment to drill down.

---

## Common Pitfalls

### ❌ Pitfall 1: Pie Charts for >5 Categories

**Problem**: You use a pie chart for 8 product categories. Users can't compare slice sizes; angles are hard to judge.

**Fix**: Use horizontal bar chart instead. Users can read values and compare magnitudes instantly.
- Bar chart: Ordered by size (largest → smallest)
- Show both count and percentage
- Use color to distinguish categories

### ❌ Pitfall 2: Truncated Y-Axis Exaggerating Differences

**Problem**: Revenue chart has Y-axis starting at $280K instead of $0. A $10K difference looks huge.

**Fix**: Always start Y-axis at zero (for bar/column charts). Exception: time series line charts can start above zero if all values are clustered high.

```javascript
// Bad: Y-axis starting at 280000
yScale.domain([280000, 350000]);

// Good: Y-axis starting at 0
yScale.domain([0, 350000]);
```

### ❌ Pitfall 3: Rainbow Color Scale

**Problem**: You use rainbow (red-yellow-green-blue) for data intensity. Users with color blindness see data differently. Colors aren't perceptually uniform (yellow looks bright, blue looks dark even if same value).

**Fix**: Use Viridis, Cividis, or other perceptually uniform palette.

### ❌ Pitfall 4: Legend Instead of Direct Labels

**Problem**: Chart has 4 line series with legend on right. Users constantly look back and forth between legend and lines.

**Fix**: Label lines directly at their end point or in empty space. Removes eye travel.

### ❌ Pitfall 5: Dual Y-Axes Confusing Comparison

**Problem**: Left Y-axis shows revenue (0-$1M), right Y-axis shows customer count (0-1000). Chart makes weak correlation look strong.

**Fix**: Use separate charts (small multiples) or normalize both series to 0-100% scale if comparison is needed.

### ❌ Pitfall 6: Too Many Data Series on One Chart

**Problem**: Line chart with 12 series (each product's monthly revenue). Chart is spaghetti; no patterns visible.

**Fix**: Use small multiples (one chart per series) or aggregate series (show top 3 products + "other").

### ❌ Pitfall 7: Missing Units or Context

**Problem**: Bar chart shows "250" with no label for what that means.

**Fix**: Axis label includes unit ("Revenue ($1000s)"). Or add unit near each value ("$250K").

### ❌ Pitfall 8: No Empty or Loading States

**Problem**: Chart disappears while loading data. User thinks it broke.

**Fix**: Show skeleton or placeholder state while loading. Display error message if fetch fails.

```jsx
{isLoading ? (
  <div className="h-96 bg-gray-100 animate-pulse rounded" />
) : error ? (
  <div className="text-red-600">Failed to load chart. Please refresh.</div>
) : (
  <BarChart data={data} />
)}
```

### ❌ Pitfall 9: Color Alone Encoding Data

**Problem**: Heatmap uses only color to show performance. User with color blindness can't distinguish categories.

**Fix**: Add pattern (stripes, dots) or numeric labels in cells alongside color.

### ❌ Pitfall 10: Not Testing on Actual Devices

**Problem**: Chart looks good in browser at 1200px, but on mobile the labels overlap and axis is unreadable.

**Fix**: Test at actual breakpoints (375px, 768px, 1024px). Adjust font sizes, label frequency, and layout for each.

---

## References

- **D3.js**: https://d3js.org — Documentation and examples
- **Recharts**: https://recharts.org — React chart components
- **Chart.js**: https://www.chartjs.org — Canvas chart library
- **Tremor**: https://www.tremor.so — Tailwind-native dashboard charts
- **Visx**: https://visx-demo.vercel.app — D3 primitives for React
- **Color Oracle**: https://www.colororacle.org — Colorblindness simulator
- **Coblis**: https://www.color-blindness.com/coblis-color-blindness-simulator/ — Browser colorblind filter
- **Data Viz Society**: https://www.datavizsociety.org — Best practices, case studies
- **Storytelling with Data** (Cole Nussbaumer Knaflic) — Book on data narrative
- **Observable**: https://observablehq.com — D3 notebooks and interactive examples
- **Related Skills**: `dashboard-patterns`, `color-system`, `accessibility-system`, `design-tokens`
