---
name: css-color-scheme
description: Apply these rules when changing system color-scheme behavior in assets/css/color-scheme.css.
---

# Color-scheme CSS

Scope changes to `assets/css/color-scheme.css` and the system-driven scheme behavior. Preserve the `color-scheme` layer, the `light dark` default, the Light/Dark/System control behavior, semantic system-color defaults, and preference media queries unless the request specifically changes them.

Keep this file palette-independent. Theme palette overrides belong in the corresponding `color-theme-*.css` file and its `color-theme` layer.

Copy/paste structure:

```css
@layer color-scheme, color-theme;

@layer color-scheme {
  :root {
    color-scheme: light dark;
    --fg: CanvasText;
    --bg: Canvas;
  }
}
```
