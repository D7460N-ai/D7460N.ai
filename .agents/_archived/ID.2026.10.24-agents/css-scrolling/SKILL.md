---
name: css-scrolling
description: Apply these rules when changing scroll behavior and scrollbar styling in assets/css/scrolling.css.
---

# Scrolling CSS

Scope changes to `assets/css/scrolling.css` and scrolling behavior only. Preserve the `scrolling` layer, targeted scroll containers, and existing scrollbar and scroll-snap behavior unless the request specifically changes them.

Keep overflow rules attached to the intended scrollable elements rather than applying them broadly to the page.

Copy/paste structure:

```css
@layer scrolling {
  target-selector {
    scrollbar-width: thin;
    scrollbar-color: var(--fg-accent) transparent;

    &:not(:hover) {
      scrollbar-color: transparent transparent;
    }
  }
}
```
