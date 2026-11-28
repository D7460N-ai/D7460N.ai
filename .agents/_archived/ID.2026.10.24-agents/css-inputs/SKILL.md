---
name: css-inputs
description: Apply these rules when changing shared form-control styles in assets/css/inputs.css.
---

# Input CSS

Scope changes to `assets/css/inputs.css` and shared native control styling. Preserve the `inputs` layer and the low-specificity `:where()` selector convention so component styles remain easy to override.

Keep document structure in HTML and behavior in JavaScript; this stylesheet owns presentation only.

Copy/paste structure:

```css
@layer inputs {
  :where(button, input, select, textarea) {
    font-family: inherit;
    font-size: inherit;
    color: currentColor;
  }
}
```
