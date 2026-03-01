---
name: form-design
description: Form UX design patterns — input types, inline validation, multi-step wizards, error recovery, accessible labels, autofill optimization, and mobile-first form architecture for high completion rates. Trigger: "form design", "form UX", "form validation", "multi-step form", "form accessibility".
version: 1.0.0
license: MIT
---

# Form Design Skill

## Purpose

Forms are where conversions happen—signups, checkouts, contact requests. Bad forms kill conversion rates. This skill covers input patterns, validation strategies, multi-step flows, and accessibility for forms that people actually complete.

## Key Concepts

### Input Type Selection
Use correct HTML5 input types. They trigger appropriate mobile keyboards and enable browser autofill.

- `email` — triggers @-keyboard on mobile, validates email format
- `tel` — triggers numeric keypad with + symbol
- `url` — triggers URL keyboard with . and / keys
- `number` — spinners for incrementing (use `inputmode="numeric"` for phone/card instead)
- `date` — native date picker on mobile/Chrome
- `search` — clears button, rounded styling, semantic
- `password` — masks input, enables password managers
- Text-only fields: Use `type="text"` with `inputmode` for fine-grained control

### Autofill Optimization
Proper `autocomplete` attributes reduce completion time by 30%.

```html
<input type="text" name="fullName" autocomplete="name">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="address-line1">
<input type="text" autocomplete="address-line2">
<input type="text" autocomplete="address-level1"> <!-- state/region -->
<input type="text" autocomplete="postal-code">
<input type="text" autocomplete="country-name">
<input type="text" autocomplete="organization">
<input type="text" autocomplete="cc-number">
<input type="text" autocomplete="cc-name">
<input type="text" autocomplete="cc-exp-month">
<input type="text" autocomplete="cc-exp-year">
<input type="text" autocomplete="cc-csc">
```

### Label Patterns
Always visible labels. Never use placeholder text as label.

- Floating labels are acceptable if implemented correctly
- Label MUST be associated via `for` attribute or by wrapping the input
- Label remains visible when field is focused or filled
- Floating label should move above field and stay there

```html
<!-- Correct: wrapped label -->
<label>
  Email
  <input type="email" name="email" autocomplete="email">
</label>

<!-- Correct: associated label -->
<label for="email-input">Email</label>
<input id="email-input" type="email" name="email" autocomplete="email">

<!-- Wrong: placeholder as label -->
<input type="email" placeholder="Email">
```

### Validation Strategy
Validate on blur (after user leaves the field), not on every keystroke.

- Show errors inline below the field
- Use `aria-describedby` to connect error message to input
- Display green checkmark for valid fields (optional, use sparingly)
- Never clear the field on error
- Allow user to submit invalid form and see all errors at once (form submission) OR use real-time on blur after first blur

```html
<div>
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    name="email"
    aria-describedby="email-error email-hint"
  >
  <p id="email-hint" class="hint">We'll never share your email.</p>
  <p id="email-error" class="error" role="alert"></p>
</div>
```

### Error Messages
Specific, actionable, never generic.

- "Email must include @" instead of "Invalid input"
- "Password must be 8+ characters" instead of "Password too short"
- "This email is already registered" instead of "Error"
- Red border + icon + text message
- Message appears below field in red
- Use `role="alert"` for dynamic error announcement

### Multi-Step Forms
Progress indicator, save progress, validate per step.

- Show "Step X of Y" or progress bar (visual + numeric)
- Allow back navigation with "Back" button
- Validate current step before advancing
- Disable "Next" button until step is valid
- Save progress (localStorage or server) so user can resume
- Show submitted steps as complete (checkmark icon)
- Option to edit previous steps

### Field Grouping
Related fields in `<fieldset>` with `<legend>`.

```html
<fieldset>
  <legend>Personal Information</legend>
  <label for="fname">First Name</label>
  <input id="fname" type="text" name="firstName" autocomplete="given-name">

  <label for="lname">Last Name</label>
  <input id="lname" type="text" name="lastName" autocomplete="family-name">
</fieldset>

<fieldset>
  <legend>Address</legend>
  <!-- address fields -->
</fieldset>
```

### Form Layout
Single column outperforms multi-column by 20%+ completion rate.

- Full-width single column on all screen sizes
- Mobile: full-width inputs, full-width buttons
- Desktop: consider narrow width (400–600px max) for readability, not full-width
- Input height: 44px minimum (mobile thumb target)
- Spacing: 24px vertical gap between fields

### Required Fields
Mark optional fields, not required.

- Most fields should be required—mark the exceptions
- Use "Optional" label suffix for optional fields
- Or use "(required)" for required fields if marking exceptions is unclear
- Never use only asterisks without explanation—users miss them

```html
<label for="phone">Phone Number <span class="optional">(optional)</span></label>
```

### Loading and Submit States
Prevent double submissions and provide feedback.

- Disable button during submission
- Show spinner or progress indicator
- Button text: "Sign Up" → "Signing up..." → "Done!" or "Success"
- Error state: red button or error message below button
- Success state: show confirmation or redirect

### Password Fields
Balance security with usability.

- Always allow show/hide toggle (most users prefer to see what they type)
- Show password strength meter (weak → strong) with real-time feedback
- List requirements clearly: "8+ characters, 1 uppercase, 1 number"
- Confirm password field for signup (not needed for password change)
- Autocomplete password managers via `autocomplete="password"`

### Select, Radio, and Combobox
Choose the right control.

- **< 5 options**: Use radio group (all visible, easier to scan)
- **5–15 options**: Select dropdown (compact, familiar)
- **> 15 options**: Combobox with search/filter (accessible autocomplete)
- Always include a blank first option in selects: `<option value="">Select an option</option>`

## Component Templates

### Accessible Input Component
```html
<div class="form-field">
  <label for="field-id" class="form-label">
    Field Label
    <span class="required" aria-label="required">*</span>
  </label>

  <input
    id="field-id"
    type="text"
    name="fieldName"
    class="form-input"
    aria-describedby="field-hint field-error"
    required
  />

  <p id="field-hint" class="form-hint">Optional helper text.</p>
  <p id="field-error" class="form-error" role="alert"></p>
</div>
```

### Multi-Step Progress Indicator
```html
<div class="form-progress">
  <div class="steps">
    <div class="step step--completed">
      <span class="step-number">1</span>
      <span class="step-label">Personal Info</span>
    </div>
    <div class="step step--active">
      <span class="step-number">2</span>
      <span class="step-label">Address</span>
    </div>
    <div class="step step--pending">
      <span class="step-number">3</span>
      <span class="step-label">Payment</span>
    </div>
  </div>
  <p class="step-indicator">Step 2 of 3</p>
</div>
```

### Error Summary Component
```html
<div class="error-summary" role="region" aria-labelledby="error-title">
  <h2 id="error-title">Fix these errors before continuing:</h2>
  <ul>
    <li><a href="#email-error">Email is invalid</a></li>
    <li><a href="#password-error">Password must be 8+ characters</a></li>
  </ul>
</div>
```

### Submit Button States
```html
<button
  class="btn btn--primary"
  type="submit"
  data-state="idle" <!-- idle, loading, success, error -->
>
  <span class="btn-text">Sign Up</span>
  <span class="btn-spinner" hidden aria-hidden="true"></span>
  <span class="btn-icon" hidden aria-hidden="true"></span>
</button>
```

## Common Pitfalls

1. **Placeholder text as labels** — Disappears on focus, fails accessibility. Always use visible `<label>`.

2. **Validating on every keystroke** — Annoying while typing. Validate on blur (after user leaves field) or on submit.

3. **Generic error messages** — "Invalid field" is useless. Tell user what's wrong: "Email must include @".

4. **Multi-column layouts on mobile** — Narrow columns force smaller inputs and more scrolling. Single column only.

5. **No loading state on submit** — Users click twice thinking first click didn't register. Disable button + spinner.

6. **Missing `autocomplete` attributes** — Password managers and autofill won't work. Reduces completion time by 30%.

7. **Clearing fields on validation error** — Forces user to re-type everything. Keep field value, show error message below.

8. **Required asterisks with no explanation** — Many users miss `*` symbol. Use "required" or "(optional)" label.

9. **Using `type="number"` for phone/card numbers** — Breaks keyboard formatting and validation. Use `type="tel"` for phone, keep as text for card numbers.

10. **No confirm password field** — High typo rate in passwords. Include confirm field for signup (skip for password change/reset).

## Instructions for Implementation

1. **Input component**: Always wrap with label, include helper text and error placeholder, use correct `type` and `autocomplete`.

2. **Validation**: Validate on blur for real-time feedback. Show error below field with `aria-describedby`. Never clear field on error.

3. **Multi-step wizard**: Show progress bar or step indicator. Validate per step. Allow back navigation. Save to localStorage between steps.

4. **Error summary**: List all form errors at top with anchor links to each invalid field. Use `role="region"` and `aria-labelledby`.

5. **Mobile optimization**: Single column, full-width inputs (44px height min), full-width submit button. Use correct input types for mobile keyboards.

6. **Submit button**: Disable during submission, show spinner, prevent double-submit. Show success state briefly before redirecting.

7. **Accessibility**: Use `<label>` with `for`/`id`. Use `aria-describedby` for hints and errors. Use `role="alert"` for dynamic errors. Test with keyboard only (Tab, Space/Enter to submit).

8. **Testing**: Test on mobile (iOS Safari, Chrome Android). Test with password managers. Test keyboard navigation. Test screen reader (VoiceOver, NVDA).

## References

- [Web.dev: Learn Forms](https://web.dev/learn/forms)
- [Baymard: Inline Form Validation](https://baymard.com/blog/inline-form-validation)
- [W3C: Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [MDN: HTML Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
- [Smashing Magazine: Form Design Patterns](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)

## Related Skills

- `component-patterns` — Reusable UI components and patterns
- `accessibility-system` — WCAG compliance, semantic HTML, ARIA
- `micro-interactions` — Loading states, hover effects, feedback animations
- `landing-page-patterns` — CTA buttons, form conversion optimization
