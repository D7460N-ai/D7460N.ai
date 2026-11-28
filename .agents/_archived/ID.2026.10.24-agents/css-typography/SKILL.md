---
name: css-typography
description: Apply these rules when changing font and text styling in assets/css/typography.css.
---

# Typography CSS

Scope changes to `assets/css/typography.css` and typography only. Preserve the `typography` layer, root font setup, and existing text selector groupings unless the request specifically changes them.

Keep layout, colors, and interaction behavior in their dedicated files. Load or change fonts only when the request requires it.

Copy/paste structure:

```css
@layer typography {
  :root {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
  }

  h1, h2, h3 {
    letter-spacing: 0.125rem;
    text-wrap: balance;
  }
}
```
