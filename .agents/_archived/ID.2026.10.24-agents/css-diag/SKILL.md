---
name: css-diag
description: Apply these rules when changing diagnostic styling in assets/css/diag.css.
---

# Diagnostic CSS

Scope changes to `assets/css/diag.css`. This stylesheet is for temporary visual diagnostics, not production component styling. Preserve its `diag` layer and existing selector scope unless the request names a change.

Copy/paste structure:

```css
@layer diag {
  diagnostic-selector {
    box-shadow: inset 0 0 0 1px
      color-mix(in srgb, currentcolor 10%, transparent);
  }
}
```
