---
name: css-layout
description: Apply these rules when changing page or component layout in assets/css/layout.css.
---

# Layout CSS

Scope changes to `assets/css/layout.css` and layout behavior only. Preserve the `layout` layer, grid-based page structure, existing custom-element selectors, and nested component organization unless the request specifically changes them.

Keep colors, typography, accessibility treatment, and decorative effects in their dedicated stylesheets. Preserve existing overflow and responsive behavior when changing layout.

Copy/paste structure:

```css
@layer layout {
  component-selector {
    display: grid;
    /* layout declarations */

    child-selector {
      /* child layout declarations */
    }
  }
}
```
