---
name: css-color-theme
description: Apply these rules when changing a palette in assets/css/color-theme-*.css.
---

# Color-theme CSS

Scope changes to the active `assets/css/color-theme-*.css` palette. Keep overrides in the `color-theme` layer and use the semantic token names consumed by `color-scheme.css` and the other stylesheets.

Treat the six-digit hex in the filename as the palette's base-color identifier. Keep the filename and palette values synchronized when changing that base. CSS does not derive colors from a filename at runtime: update the palette values in the stylesheet as needed. Preserve `light-dark()` where a token has separate light and dark values, and derive related values from the accent token where the existing palette does so.

Copy/paste structure:

```css
@layer color-theme {
  :root {
    --fg-accent: light-dark(light-value, dark-value);
    --fg: light-dark(light-value, dark-value);
    --bg: light-dark(light-value, dark-value);
    --outline: var(--fg-accent);
  }
}
```
