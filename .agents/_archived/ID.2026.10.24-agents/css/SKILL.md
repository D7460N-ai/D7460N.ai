---
name: css
description: Apply these requirements whenever creating, changing, reviewing, or explaining CSS in this Pen.
---

# CSS requirements

CSS files contain CSS only. Keep document structure and content in HTML files, and behavior in JavaScript files.

## Mandatory boundaries

- Do not put HTML markup or JavaScript in CSS files.
- Do not put CSS in HTML or JavaScript: no `<style>` blocks, style attributes, JavaScript style strings, or runtime style assignments.
- Keep visual presentation, layout, states, and responsive rules in separate CSS files.
- Follow the existing stylesheet's organization. For a new CSS module, use the canonical structure below and include only declarations needed for its responsibility.
- Preserve existing selectors, values, ordering, formatting, and unrelated styles unless the request requires a change.

## Canonical CSS module

```css
/* MARK: MODULE-NAME
*/
@layer layer-name {
  selector {
    /* declarations */
  }
}
```
