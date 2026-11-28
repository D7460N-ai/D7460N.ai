---
name: css-transitions
description: Apply these rules when changing shared transitions or motion preferences in assets/css/transitions.css.
---

# Transitions CSS

Scope changes to `assets/css/transitions.css` and shared transition behavior. Preserve the `transitions` layer, root transition tokens, discrete-transition behavior, and reduced-motion support unless the request specifically changes them.

Do not add transitions to individual components here when their behavior belongs in a component stylesheet.

Copy/paste structure:

```css
@layer transitions {
  :root {
    --transition-property: color, opacity, background-color;
    --transition-timing-function: ease-in;
    --transition-duration: 250ms;
  }

  @media (prefers-reduced-motion) {
    * {
      transition-duration: 0ms;
    }
  }
}
```
