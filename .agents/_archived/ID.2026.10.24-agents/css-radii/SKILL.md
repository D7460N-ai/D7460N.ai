---
name: css-radii
description: Apply these rules when changing spacing and radius tokens in assets/css/radii.css.
---

# Radius CSS

Scope changes to `assets/css/radii.css` and its spacing/radius system. Preserve the `radii` layer, the relationship between `--inner-radius`, `--padding`, and `--outer-radius`, and the existing semantic container selectors unless the request specifically changes them.

Copy/paste structure:

```css
@layer radii {
  :root {
    --inner-radius: 0.5rem;
    --padding: 1rem;
    --outer-radius: calc(var(--inner-radius) + var(--padding));
  }
}
```
