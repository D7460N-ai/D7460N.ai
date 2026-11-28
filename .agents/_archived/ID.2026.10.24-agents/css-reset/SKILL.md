---
name: css-reset
description: Apply these rules when changing baseline reset rules in assets/css/reset.css.
---

# Reset CSS

Scope changes to `assets/css/reset.css` and baseline browser-default normalization only. Preserve the `reset` layer and universal selector coverage unless the request specifically changes them.

Keep component styling and layout out of the reset.

Copy/paste structure:

```css
@layer reset {
  *,
  * *,
  *:before,
  *:after,
  ::after,
  ::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}
```
