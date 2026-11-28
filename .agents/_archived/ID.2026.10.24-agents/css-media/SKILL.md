---
name: css-media
description: Apply these rules when changing image and media element defaults in assets/css/media.css.
---

# Media CSS

Scope changes to `assets/css/media.css` and media-element sizing behavior. Preserve the `media` layer and its forgiving selector-list approach unless the request specifically changes them.

Do not add layout rules for unrelated components here.

Copy/paste structure:

```css
@layer media {
  img, picture, video, canvas, svg {
    display: block;
    max-inline-size: 100%;
    block-size: auto;
  }
}
```
