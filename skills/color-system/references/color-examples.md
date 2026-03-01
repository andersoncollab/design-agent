# Color System — Extended Examples & Pitfalls

## Example 3: Dark Mode with CSS

**Light Mode**:
```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F3F4F6;
  --color-text: #111827;
  --color-primary: #3B82F6;
}
```

**Dark Mode**:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0F172A;
    --color-surface: #1E293B;
    --color-text: #F1F5F9;
    --color-primary: #60A5FA;  /* Lighter blue for contrast */
  }
}
```

Usage:
```html
<style>
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  button {
    background-color: var(--color-primary);
  }
</style>
```

---

## Example 4: WCAG AAA Accessible Palette

**Base**: Dark purple #5E3DB7

**Palette**:
```
Text (AAA 7:1):  #2D1B5E on white
Button (AA 4.5:1): #5E3DB7 on white
Success: #107C10 on white (7.23:1)
Error: #DA3B01 on white (5.13:1)
```

**CSS**:
```css
:root {
  --color-text-primary: #2D1B5E;   /* 7:1 on white */
  --color-primary: #5E3DB7;        /* 4.5:1 on white */
  --color-success: #107C10;        /* 7.23:1 on white */
  --color-error: #DA3B01;          /* 5.13:1 on white */
}
```

**Check contrast** before shipping:
```javascript
checkContrast('#2D1B5E', '#FFFFFF');  // → { ratio: 7.2, aaPass: true, aaaPass: true }
```

---

## Example 5: Color System with Gradients

**Base palette** + gradient recipes (see references):

```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #8B5CF6;
  --color-accent: #EC4899;
}

/* Gradient recipe: Linear gradient */
.gradient-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
}

/* Gradient recipe: Radial (spotlight) */
.gradient-spotlight {
  background: radial-gradient(circle at 30% 20%, var(--color-primary), transparent);
}

/* Gradient recipe: Mesh (see references for SVG) */
.gradient-mesh {
  background: url('data:image/svg+xml,...mesh-gradient-svg...');
}
```

See `references/gradient-recipes.md` for 15+ production CSS recipes.

---

## Pitfall 4: Ignoring Color Blindness

**Problem**: Your error state is pure red #FF0000, but 8% of men are red-green colorblind. Error messages disappear.

**Fix**: **Use color + icon/text combination**. Never rely on color alone:

```html
<!-- Bad: Color only -->
<div style="color: #FF0000;">Error: Invalid email</div>

<!-- Good: Color + icon + text -->
<div style="color: #FF0000;">
  ⚠️ Error: Invalid email
</div>
```

Also test your palette with colorblind simulator: https://www.colorhexa.com/

---

## Pitfall 5: Using Too High Saturation in Large Areas

**Problem**: You fill a large background with highly saturated #FF0000. It vibrates, fatigues eyes, feels unprofessional.

**Fix**: **Reduce saturation for large surfaces**. Use high saturation only for accents:

```css
/* Bad: High saturation background */
.card {
  background-color: #FF0000;    /* 100% saturation, covers 60% of page */
}

/* Good: Desaturated background, high saturation accent */
.card {
  background-color: #FEE2E2;    /* ~20% saturation, easy on eyes */
}

.card button {
  background-color: #DC2626;    /* 100% saturation, small area (10%) */
}
```

---

## Pitfall 6: Not Exporting Tokens for Developers

**Problem**: You create a beautiful color system in Figma, but developers can't find the hex codes. They guess colors and system falls apart.

**Fix**: **Export tokens in multiple formats**:

```json
{
  "colors": {
    "primary-500": {
      "value": "#3B82F6",
      "description": "Primary brand color"
    }
  }
}
```

Then use tools like Figma Tokens, Tokens Studio, or Style Dictionary to sync with code.
