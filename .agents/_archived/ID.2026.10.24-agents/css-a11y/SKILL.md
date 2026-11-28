---
name: css-a11y
description: Apply these rules when changing accessibility styles in assets/css/a11y.css.
---

# Accessibility CSS

Scope changes to `assets/css/a11y.css` and accessibility styling only. Preserve its `a11y` layer and existing focus, system-color, accent, selection, marker, and form-control rules unless the request specifically changes them.

Keep focus indicators visible and use the existing `--outline` and `--fg-accent` tokens where applicable. Do not remove forced-colors or other preference support as an incidental change.

Copy/paste structure:

```css
@layer a11y {
  selector:focus-visible {
    outline: var(--outline-width, var(--outline-size))
      var(--outline-style, solid) var(--outline-color, currentColor);
    outline-offset: var(--outline-offset, var(--outline-size));
  }
}
```
