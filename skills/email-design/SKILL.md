---
name: email-design
description: Email template design for campaigns, transactional, and newsletters. Covers rendering constraints across Gmail, Outlook, Apple Mail, Yahoo. Triggers: "email template", "email design", "email HTML", "email rendering", "email campaign layout", "transactional email".
version: 1.0.0
license: MIT
---

# Email Design Skill

## Purpose

This skill provides production-ready email templates and HTML best practices for rendering reliably across the 4 major email clients (Gmail, Outlook, Apple Mail, Yahoo). Email is fundamentally different from web design: Outlook uses Word's HTML renderer (not a browser), most clients strip CSS stylesheets, dark mode requires special handling, and images may be blocked. This skill teaches the constraints, patterns, and templates to ship emails that look consistent across 95%+ of inboxes.

## When to Use

- **Building campaign emails**: Newsletter, promotional, product launch
- **Designing transactional emails**: Receipts, password resets, order confirmations
- **Debugging email rendering**: Email looks broken in Outlook or Gmail
- **Testing dark mode**: Apple Mail and Gmail have dark mode; need CSS strategy
- **Building email templates**: Base structure, component patterns, responsive behavior
- **Email CMS setup**: Reviewing MJML, email builders, or custom templates

Trigger phrases: "email template", "Outlook rendering", "email dark mode", "responsive email", "email HTML best practices", "email compatibility".

## Key Concepts

### The Outlook Problem

Outlook (desktop, not Outlook.com) uses Microsoft Word's HTML renderer, not a browser. This means:
- **Tables are the ONLY reliable layout method**. No flexbox, no CSS grid, no modern CSS.
- **CSS support is ~2005 era**. Flexbox, CSS Grid, modern shadows, transforms do not work.
- **VML (Vector Markup Language)** is required for backgrounds, borders, rounded corners.
- Workaround: Use inline CSS for color/padding, tables for layout, MSO conditionals for Outlook-specific code.

**Example MSO conditional**:
```html
<!--[if mso]>
  <style>table{border-collapse:collapse;}</style>
<![endif]-->
```

### Inline CSS Only

Many email clients (Gmail, Yahoo older versions, corporate proxies) strip `<style>` tags from the `<head>`. All critical styles MUST be inline on the element itself.

**Bad**:
```html
<style>
  .button { background: blue; padding: 10px; }
</style>
<a class="button">Click</a>
```

**Good**:
```html
<a style="background: blue; padding: 10px; display: inline-block;">Click</a>
```

### Max Width & Responsive

Standard email max-width is **600px** (some go 640px). Mobile viewport is 320-375px, so responsive design must:
- Use percentage widths as fallback
- `<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">`
- Use `@media (max-width: 480px)` for mobile overrides (where supported)
- Stack 2-column layouts to 1 column on mobile

### Image Blocking

Many corporate clients block images by default. Email will render with a blank space unless you:
- **Always include alt text** on images (`<img alt="Product image">`)
- **Use background color fallback** on image containers
- **Never rely on images for critical content** (text, CTAs, data)
- Provide text-based equivalent of image content

### Dark Mode

Apple Mail, new Outlook, and Gmail all have dark mode. Handle it with:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode overrides */
}
```

Use both `bgcolor` attribute (fallback) AND `style="background-color"` (dark mode). Light backgrounds need white/light gray text; use `color: #ffffff;` inline.

### Rendering Compatibility Matrix

| Feature | Gmail | Outlook | Apple Mail | Yahoo |
|---------|-------|---------|-----------|-------|
| `<style>` in `<head>` | Yes | Partial | Yes | Yes |
| Inline styles | Yes | Yes | Yes | Yes |
| Media queries | Yes (web) | No | Yes | Yes |
| Flexbox | No | No | Yes | No |
| CSS Grid | No | No | Yes | No |
| Web fonts | Yes | No | Yes | Yes |
| Background images | Partial | VML only | Yes | Yes |
| SVG | No | No | Yes | No |
| Dark mode | Yes | Partial | Yes | No |
| MSO conditionals | No | Yes | No | No |

## Instructions

### 1. Base Email Structure

Start with this HTML skeleton for every email:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Email Title</title>
<style type="text/css">
body {
  margin: 0;
  padding: 0;
  min-width: 100% !important;
  mso-line-height-rule: exactly;
}
img {
  outline: none;
  text-decoration: none;
  border: none;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
<!--[if mso]><style>table{border-collapse:collapse;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;-webkit-font-smoothing:antialiased;">
<center>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4;">
<tr>
<td align="center" style="padding:20px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;">

<!-- Email content goes here -->

</table>
</td>
</tr>
</table>
</center>
</body>
</html>
```

**Key points**:
- `role="presentation"` on layout tables (tells screen readers it's not data)
- `cellpadding="0" cellspacing="0"` on all tables (prevents gaps)
- `<center>` wraps main container (Outlook fallback for centering)
- Outer table has 100% width with background (full-width background color)
- Inner table has fixed width + `max-width:600px;width:100%;` (responsive)

### 2. Header with Logo

```html
<tr>
<td style="padding:20px;background-color:#ffffff;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td align="left">
<img src="https://example.com/logo.png" alt="Company Logo" width="200" height="50" style="display:block;border:none;outline:none;">
</td>
</tr>
</table>
</td>
</tr>
```

### 3. Hero Section

```html
<tr>
<td style="padding:0;">
<img src="https://example.com/hero.jpg" alt="Hero image" width="600" style="display:block;width:100%;max-width:600px;">
</td>
</tr>
<tr>
<td style="padding:40px;background-color:#ffffff;font-family:Arial,sans-serif;font-size:24px;font-weight:bold;color:#000000;line-height:1.4;">
Welcome to Our Product
</td>
</tr>
```

### 4. Content Block (Two-Column)

```html
<tr>
<td style="padding:20px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td width="48%" valign="top" style="padding-right:20px;">
<h3 style="margin:0 0 10px 0;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#000000;">Benefit 1</h3>
<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#666666;line-height:1.6;">Description of benefit goes here.</p>
</td>
<td width="48%" valign="top" style="padding-left:20px;">
<h3 style="margin:0 0 10px 0;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#000000;">Benefit 2</h3>
<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#666666;line-height:1.6;">Description of benefit goes here.</p>
</td>
</tr>
</table>
</td>
</tr>
```

**Mobile override** (add to `<style>`):
```css
@media (max-width: 480px) {
  .mobile-full { width: 100% !important; padding-right: 0 !important; padding-left: 0 !important; }
}
```

Then add `class="mobile-full"` to each `<td>`.

### 5. Bulletproof CTA Button

Use a table-based button (NOT an `<a>` with padding, which breaks in Outlook):

```html
<tr>
<td align="center" style="padding:20px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="border-radius:4px;background-color:#007bff;">
<a href="https://example.com/cta" style="display:inline-block;padding:12px 24px;background-color:#007bff;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;border-radius:4px;mso-padding-alt:12px 24px;text-align:center;">
Click Here
</a>
</td>
</tr>
</table>
</td>
</tr>
```

**Notes**:
- `border-radius` on both `<td>` and `<a>` for cross-client support
- `mso-padding-alt` for Outlook (uses padding value directly)
- `display:inline-block;` on link makes padding work
- Test button width on mobile (ensure it doesn't wrap text)

### 6. Footer with Unsubscribe

```html
<tr>
<td style="padding:20px;background-color:#f4f4f4;border-top:1px solid #e0e0e0;text-align:center;font-family:Arial,sans-serif;font-size:12px;color:#666666;line-height:1.6;">
<p style="margin:0 0 10px 0;">
<strong>Company Name</strong><br>
123 Main Street, City, State 12345<br>
<a href="https://example.com" style="color:#007bff;text-decoration:none;">Visit our website</a>
</p>
<p style="margin:0;">
<a href="{{ unsubscribe_link }}" style="color:#999999;text-decoration:none;">Unsubscribe</a> |
<a href="https://example.com/preferences" style="color:#999999;text-decoration:none;">Manage preferences</a>
</p>
</td>
</tr>
```

**Legal requirement**: CAN-SPAM (USA) requires:
- Physical postal address
- Unsubscribe link (functional, not just text)
- GDPR compliance: Preference center link

## Template Types

### Welcome Email
```
Logo (header)
↓
Hero image + large headline
↓
3 value propositions (benefits)
↓
Single CTA button
↓
Footer with address + unsubscribe
```

### Newsletter
```
Logo (header)
↓
"This Month's Top Articles"
↓
Featured article (large image + title + preview + CTA)
↓
3-4 article grid (thumbnail + title + preview + read link)
↓
Footer with archives + preferences
```

### Transactional (Order Receipt)
```
Logo (header)
↓
"Order Confirmation #12345"
↓
Order summary table:
  - Item | Quantity | Price
  - ...
  - Subtotal | Shipping | Tax | TOTAL
↓
Delivery address (left) | Billing address (right)
↓
Tracking link CTA
↓
Footer
```

### Abandoned Cart
```
Logo
↓
Hero: "You left something behind"
↓
Cart image + product name + price
↓
"Complete your purchase" CTA
↓
Trust badges (SSL, returns policy, etc.)
↓
Footer
```

## Dark Mode Strategy

Add this to your `<style>` section:

```css
@media (prefers-color-scheme: dark) {
  body { background-color: #1a1a1a !important; }
  table, td { background-color: #2a2a2a !important; color: #ffffff !important; }
  a { color: #4da6ff !important; }
  .dark-mode-text { color: #e0e0e0 !important; }
  .dark-mode-secondary { color: #999999 !important; }
}
```

Then use **both attributes and styles**:

```html
<td bgcolor="#ffffff" style="background-color:#ffffff;color:#000000;">
  Content
</td>
```

In dark mode:
- Light backgrounds become dark
- Dark text becomes light
- Links become lighter blue

**Test in**: Apple Mail dark mode, new Outlook, Gmail dark mode (web).

## Common Pitfalls

### 1. Div-Based Layout (Breaks Outlook)
**Problem**: Using `<div>` with flexbox for layout.
```html
<!-- WRONG -->
<div style="display:flex;">
  <div>Left</div>
  <div>Right</div>
</div>
```
**Solution**: Use nested tables.
```html
<!-- RIGHT -->
<table>
<tr>
<td width="50%">Left</td>
<td width="50%">Right</td>
</tr>
</table>
```

### 2. CTA as Image
**Problem**: Button text is an image (invisible when images blocked).
```html
<!-- WRONG -->
<a href="/"><img src="button.png" alt="Click"></a>
```
**Solution**: Use live text in a bulletproof button (see section 5).

### 3. Missing Unsubscribe Link
**Problem**: No unsubscribe link (CAN-SPAM/GDPR violation, triggers spam filters).
**Solution**: Include unsubscribe in footer, linked to actual URL.
```html
<a href="{{unsubscribe_url}}">Unsubscribe</a>
```

### 4. No Image Blocking Fallback
**Problem**: Email blank when images disabled. **Fix**: Always include alt text and text-based content alongside images.

### 5. Not Testing in Outlook Desktop
**Fix**: Test in Outlook 2016/2019/365 before every send. Use Litmus or Email on Acid.

### 6. Web Fonts Without Fallback
**Fix**: `font-family: "Custom Font", Arial, sans-serif;` — always include system fallback.

### 7. Missing role="presentation" on Layout Tables
**Fix**: Add `role="presentation"` to all layout tables so screen readers skip table semantics.

## Examples

### Complete Welcome Email

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome!</title>
<style type="text/css">
body { margin: 0; padding: 0; }
img { border: none; }
@media (prefers-color-scheme: dark) {
  body { background-color: #1a1a1a !important; }
  .dark-bg { background-color: #2a2a2a !important; color: #ffffff !important; }
  .dark-text { color: #e0e0e0 !important; }
}
</style>
<!--[if mso]><style>table{border-collapse:collapse;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;">
<center>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4;">
<tr><td align="center" style="padding:20px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;" class="dark-bg">

<!-- HEADER -->
<tr>
<td align="center" style="padding:20px;border-bottom:1px solid #e0e0e0;">
<img src="https://example.com/logo.png" alt="Logo" width="150" style="display:block;">
</td>
</tr>

<!-- HERO -->
<tr>
<td style="padding:40px 20px;text-align:center;font-family:Arial,sans-serif;font-size:32px;font-weight:bold;color:#000000;line-height:1.4;" class="dark-text">
Welcome to Our Platform
</td>
</tr>

<!-- VALUE PROPS (3-column table, each td width="33%") -->
<tr><td style="padding:20px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
<td width="33%" valign="top" align="center" style="padding:10px;font-family:Arial,sans-serif;">
<h3 style="margin:0 0 8px;font-size:16px;color:#007bff;" class="dark-text">Fast</h3>
<p style="margin:0;font-size:13px;color:#666;" class="dark-text">Get started in seconds</p></td>
<td width="33%" valign="top" align="center" style="padding:10px;font-family:Arial,sans-serif;">
<h3 style="margin:0 0 8px;font-size:16px;color:#007bff;" class="dark-text">Secure</h3>
<p style="margin:0;font-size:13px;color:#666;" class="dark-text">Enterprise-grade security</p></td>
<td width="33%" valign="top" align="center" style="padding:10px;font-family:Arial,sans-serif;">
<h3 style="margin:0 0 8px;font-size:16px;color:#007bff;" class="dark-text">Support</h3>
<p style="margin:0;font-size:13px;color:#666;" class="dark-text">24/7 dedicated support</p></td>
</tr></table>
</td></tr>

<!-- CTA -->
<tr>
<td align="center" style="padding:30px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#007bff;border-radius:4px;">
<a href="https://example.com/get-started" style="display:inline-block;padding:14px 32px;background-color:#007bff;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;border-radius:4px;mso-padding-alt:14px 32px;">
Get Started Free
</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- FOOTER (CAN-SPAM: company address + unsubscribe link required) -->
<tr><td style="padding:20px;background:#f9f9f9;border-top:1px solid #e0e0e0;font-family:Arial,sans-serif;font-size:11px;color:#999;text-align:center;">
<p style="margin:0 0 10px;">Example Company, 123 Main St, San Francisco, CA 94105</p>
<p style="margin:0;"><a href="https://example.com" style="color:#007bff;text-decoration:none;">Visit site</a> | <a href="[unsubscribe]" style="color:#999;text-decoration:none;">Unsubscribe</a></p>
</td></tr>

</table>
</td></tr>
</table>
</center>
</body>
</html>
```

## References

- **Can I Email** — caniemail.com (email CSS support checker)
- **MJML** — mjml.io (compiles to Outlook-safe HTML)
- **Related skills**: `color-system`, `dark-mode`, `typography-pairing`
