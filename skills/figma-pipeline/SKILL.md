---
name: figma-pipeline
description: End-to-end Figma-to-production pipeline using Figma MCP tools. Extract design context, extract design tokens/variables, map components via Code Connect, and generate stack-specific production code. Input: Figma URL (fileKey + nodeId). Output: React/Astro/Next.js/Vue components with design tokens applied. Trigger: "Extract from Figma", "build component from design", "convert design to code", "sync Code Connect mappings".
version: 1.0.0
license: MIT
---

## Purpose

Figma-Pipeline is a structured workflow that transforms Figma designs into production-ready component code. This skill orchestrates five core steps: extracting design context via the Figma MCP server, parsing design variables and tokens, matching components to existing codebase components via Code Connect, and adapting the output to your target framework and design system. Unlike manual hand-coding from screenshots, this pipeline preserves design intent while respecting your project's stack conventions and component library.

Use this skill when you have a Figma design (component or entire frame) that needs to become code, and you want design tokens (colors, spacing, typography) automatically mapped and component references resolved.

## When to Use

- **Design handoff to development** — Designer created a component in Figma; you need production code
- **Component library sync** — Figma component should map to existing codebase component via Code Connect
- **Design token extraction** — Pull colors, spacing, typography from Figma design variables
- **Rapid prototyping** — Convert design quickly to code without manual pixel-by-pixel recreation
- **Multi-framework consistency** — Same design needs to be built in React, Vue, and Astro; leverage design context across all three
- **Refactoring with design reference** — Redesigning a component; use Figma as source of truth

## Key Concepts

### Figma MCP Tools

| Tool | Purpose |
|------|---------|
| `get_design_context` | Extract code + screenshot + Code Connect hints (primary tool) |
| `get_variable_defs` | Extract design variables (colors, spacing, typography) |
| `get_code_connect_map` | Retrieve existing component mappings |
| `add_code_connect_map` | Create new component-to-code mapping |
| `send_code_connect_mappings` | Sync mappings back to Figma |

### URL Parsing and Node IDs

Figma URLs come in multiple formats. Always extract `fileKey` and `nodeId`:

```
# Standard file URL
https://figma.com/file/{fileKey}/MyProject?node-id={nodeId}

# Branch URL
https://figma.com/file/{fileKey}/MyProject?node-id={nodeId}&branch={branchKey}

# Node ID format: use colon, not dash
figma.com node-id=123:456   (correct: nodeId="123:456")
figma.com node-id=123-456   (WRONG: must convert to "123:456")
```

**Conversion rule**: Replace hyphens with colons in nodeId before calling MCP tools.

### Code Connect: Component Mapping

Code Connect allows you to map Figma components to codebase components. Once mapped, Figma's `get_design_context` will include references to your code components instead of generating new code.

**Flow**:
1. Call `get_code_connect_map` → see what's already mapped
2. If a Figma component isn't mapped and exists in codebase, call `add_code_connect_map` to create the mapping
3. Call `send_code_connect_mappings` to sync back to Figma (so teammates see the mapping)

**Benefit**: Designers and developers stay in sync. "Use Button from src/components/Button.tsx" instead of generating duplicate button code.

### Design Variables and Tokens

Figma design variables are the source of truth for design tokens. Call `get_variable_defs` to extract all variables in the file:

```json
{
  "colors": {
    "primary": "#0066FF",
    "secondary": "#FF6600",
    "neutral-50": "#F8F9FA"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px"
  },
  "typography": {
    "display-lg": { "font": "Inter", "size": "32px", "weight": "700" }
  }
}
```

Map these to your project's token system (Tailwind `theme`, CSS custom properties, design system scale).

### Stack Adaptation

Figma output is **reference code**. Adapt to your stack:
- **React + Tailwind**: Hardcoded colors → `className` + Tailwind utilities + design tokens
- **Astro**: `.astro` syntax + scoped styles + Tailwind classes
- **Next.js**: App Router conventions + `tailwind.config.ts` + `@/components` imports
- **Vue**: JSX → template syntax + `class:` bindings

## Instructions

### Step 1: Parse Figma URL

Extract `fileKey` and `nodeId` from the Figma URL:

```
URL: https://figma.com/file/abc123def456/MyProject?node-id=789:101
→ fileKey = "abc123def456"
→ nodeId = "789:101"
```

If nodeId contains hyphens, convert to colons:
```
node-id=789-101 → nodeId="789:101"
```

### Step 2: Extract Design Context

Call the MCP tool `get_design_context` with fileKey + nodeId:

```
Tool: get_design_context
Inputs: fileKey, nodeId
Output: {
  "code": "React component code (reference)",
  "screenshot": "PNG data URL",
  "codeConnect": ["src/components/Button.tsx", ...],
  "annotations": ["Use design token --color-primary", ...],
  "variables": {...}
}
```

**Review the output**:
- **code**: Reference implementation; you'll adapt this in Step 5
- **screenshot**: Visual reference for verification
- **codeConnect**: Existing component mappings in your codebase
- **annotations**: Designer notes or constraints
- **variables**: Design tokens used in this component

### Step 3: Extract Design Variables

Call `get_variable_defs` to map all design tokens in the Figma file:

```
Tool: get_variable_defs
Output:
{
  "colors": { "primary": "#0066FF", "error": "#DC3545", ... },
  "spacing": { "xs": "4px", "sm": "8px", ... },
  "typography": { "h1": { "font": "Satoshi", "size": "48px", "weight": "700" } }
}
```

**Map to your project**:
- If using Tailwind, extend `tailwind.config.ts` with these values
- If using CSS variables, add to `:root` or component-scoped `<style>`
- If using design system library, map to that library's token names

### Step 4: Check Code Connect Mappings

Call `get_code_connect_map` to see what components are already mapped:

```
Tool: get_code_connect_map
Output: {
  "Button (primary)": "src/components/Button.tsx",
  "Card": "src/components/Card.tsx"
}
```

**For each mapped component in the design**:
- Use that component directly instead of generating new code
- Import it correctly for your framework
- Pass props to match Figma component properties

**If a component should be mapped but isn't**:
- Call `add_code_connect_map` to create the mapping
- Call `send_code_connect_mappings` to sync back to Figma

### Step 5: Adapt Output to Stack

Take the reference code from Step 2 and adapt to your framework:

#### React + Tailwind Example

**Reference code from Figma**:
```jsx
export const Hero = ({ heading, subheading, cta }) => (
  <div style={{ background: '#001F3F', padding: '48px 16px' }}>
    <h1 style={{ color: '#FFF', fontSize: '48px', fontFamily: 'Satoshi' }}>
      {heading}
    </h1>
    <p style={{ color: '#DEE2E6', fontSize: '18px' }}>{subheading}</p>
    <button style={{ background: '#17A2B8', color: '#FFF' }}>{cta}</button>
  </div>
);
```

**Adapted for React + Tailwind**:
```jsx
import { Button } from '@/components/Button'; // Code Connect mapping

export const Hero = ({ heading, subheading, cta }) => (
  <section className="bg-primary py-12 px-4 sm:py-16 sm:px-6 lg:py-24">
    <h1 className="text-4xl font-display font-bold text-white">
      {heading}
    </h1>
    <p className="mt-4 text-lg text-neutral-300">
      {subheading}
    </p>
    <Button variant="accent" className="mt-8">
      {cta}
    </Button>
  </section>
);
```

**Changes made**:
- Hardcoded colors → Tailwind classes (bg-primary, text-white, text-neutral-300)
- Inline styles → className attributes
- Button element → Button component (from Code Connect)
- Responsive spacing (py-12 sm:py-16 lg:py-24)
- Design token classes (font-display, text-4xl from tailwind.config.ts)

#### Astro Example

**Adapted for Astro**:
```astro
---
import { Button } from '@/components/Button.astro';

interface Props {
  heading: string;
  subheading: string;
  cta: string;
}

const { heading, subheading, cta } = Astro.props as Props;
---

<section class="bg-primary py-12 px-4 sm:py-16 sm:px-6 lg:py-24">
  <h1 class="text-4xl font-display font-bold text-white">
    {heading}
  </h1>
  <p class="mt-4 text-lg text-neutral-300">
    {subheading}
  </p>
  <Button variant="accent" class="mt-8">
    {cta}
  </Button>
</section>

<style>
  /* Scoped styles if needed */
  section {
    @apply bg-primary;
  }
</style>
```

#### Next.js Example

```tsx
import { Button } from '@/components/Button';

interface HeroProps {
  heading: string;
  subheading: string;
  cta: string;
}

export const Hero: React.FC<HeroProps> = ({ heading, subheading, cta }) => (
  <section className="bg-primary py-12 px-4 sm:py-16 sm:px-6 lg:py-24">
    <h1 className="text-4xl font-display font-bold text-white">
      {heading}
    </h1>
    <p className="mt-4 text-lg text-neutral-300">
      {subheading}
    </p>
    <Button variant="accent" className="mt-8">
      {cta}
    </Button>
  </section>
);
```

### Step 6: Integrate Design Tokens

Update `tailwind.config.ts` with design tokens as CSS variables or theme extensions:

```ts
colors: {
  primary: 'var(--color-primary)',
  neutral: { 50: 'var(--color-neutral-50)', 300: 'var(--color-neutral-300)' }
},
fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)' }
```

In globals.css:
```css
:root {
  --color-primary: #001F3F;
  --color-accent: #17A2B8;
  --font-display: 'Satoshi', sans-serif;
}
```

## Examples

### Example 1: Button Component (React + Tailwind)

**Figma URL**: `https://figma.com/file/abc123/DesignSystem?node-id=42:101`

**Step 1: Parse URL**
- fileKey = "abc123"
- nodeId = "42:101"

**Step 2: Extract Design Context**

MCP returns:
```jsx
export const Button = ({ label, variant = 'primary', size = 'md' }) => (
  <button
    style={{
      background: variant === 'primary' ? '#0066FF' : '#FF6600',
      color: '#FFF',
      padding: size === 'md' ? '12px 20px' : '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
);
```

**Step 3: Extract Variables**

`get_variable_defs` returns:
```json
{
  "colors": {
    "primary": "#0066FF",
    "accent": "#FF6600"
  },
  "spacing": {
    "sm": "8px",
    "md": "12px"
  }
}
```

**Step 4: Check Code Connect**

`get_code_connect_map` returns:
```json
{
  "Button": "src/components/ui/Button.tsx"
}
```

Component already exists! Skip generation, use existing.

**Step 5: Adapted Code**

Since Button is already mapped, import and use directly:
```tsx
import { Button } from '@/components/ui/Button';

// Pass variant and size as props
<Button label="Get Started" variant="primary" size="md" />
```

**Step 6: Verify Tokens**

Ensure `src/components/ui/Button.tsx` uses design tokens:
```tsx
const variantStyles = {
  primary: 'bg-primary hover:bg-primary-dark',
  accent: 'bg-accent hover:bg-accent-dark',
};
```

And `tailwind.config.ts` has:
```ts
colors: {
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)',
}
```

**Result**: Button component in code matches Figma design, uses design tokens, and is ready for integration.

### Example 2: Hero Section (Astro)

**Figma URL**: `https://figma.com/file/xyz789/Website?node-id=10:201`

Extract context → design variables. No Code Connect mapping exists.

Adapt to Astro: Replace hardcoded colors with `class` attributes, map typography to design tokens in `tailwind.config.ts`. Final output: `.astro` component using Button component (from Code Connect) with responsive Tailwind classes and design token references.

## Common Pitfalls

### Antipattern 1: Using Figma Output As-Is

**Bad**: Copy-paste the reference code from `get_design_context` without adapting to your project conventions.

```jsx
// Direct output from Figma MCP (hardcoded hex, inline styles)
const Button = ({ label }) => (
  <button style={{ background: '#0066FF', padding: '12px 20px' }}>
    {label}
  </button>
);
```

**Good**: Adapt to your stack. Replace hardcoded values with design tokens and framework conventions.

```tsx
// Adapted for React + Tailwind
const Button = ({ label }) => (
  <button className="bg-primary px-5 py-3 rounded-md font-semibold">
    {label}
  </button>
);
```

### Antipattern 2: Not Converting Node ID Format

**Bad**: Using dashes in nodeId causes MCP tool failures.
```
node-id from URL: "123-456"
Passed to MCP: nodeId = "123-456"  ❌ Tool fails
```

**Good**: Always convert dashes to colons.
```
node-id from URL: "123-456"
Passed to MCP: nodeId = "123:456"  ✓ Correct
```

### Antipattern 3: Ignoring Code Connect Mappings

**Bad**: Generating new button code when `Button.tsx` already exists and is mapped in Code Connect.
**Good**: Check Code Connect first. Import and use existing: `import { Button } from '@/components/Button'`.

### Antipattern 4: Hardcoding Colors Instead of Mapping Tokens

**Bad**: `<div style={{ color: '#0066FF' }}>` — hardcoded hex from Figma.
**Good**: `<div className="text-primary">` — mapped to `var(--color-primary)` in Tailwind config.

### Antipattern 5: Absolute Positioning from Figma Layout

**Bad**: `position: absolute; left: 48px; top: 100px;` — Figma layout breaks responsive.
**Good**: `<section class="px-6 py-12 lg:py-24">` — semantic flow layout.

### Antipattern 6: Skipping the Adaptation Step

Always review adapted code for: component naming (PascalCase), import paths (@/components vs relative), Tailwind class conventions, TypeScript types.

## References

- **Related Skills**: `design-system-generator`, `component-patterns`, `design-to-code`, `bento-layout`
- **Figma API**: https://docs.figma.com/developers/api/intro
- **Code Connect**: https://www.figma.com/developers/api#code-connect
- **Tailwind Theme**: https://tailwindcss.com/docs/theme
