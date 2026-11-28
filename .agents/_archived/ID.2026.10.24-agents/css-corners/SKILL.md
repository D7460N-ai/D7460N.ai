---
name: css-corners
description: Apply these rules when changing corner and line effects in assets/css/corners.css.
---

# Corner and line effects

Scope changes to `assets/css/corners.css` and its decorative corner/line effects. Preserve the `corners` layer, registered custom properties, geometry variables, pseudo-element construction, state transitions, and entry animation unless the request specifically changes them.

Keep the effect driven by CSS custom properties on the existing component selectors. Do not move markup, add JavaScript, or replace the pseudo-element approach as an incidental change.

Copy/paste structure:

```css
@layer corners {
  component-selector {
    --corner-color: var(--corner-rest-color);
    --line-color: var(--line-rest-color);

    &::before {
      /* line decoration */
    }

    &::after {
      /* corner decoration */
    }
  }
}
```
