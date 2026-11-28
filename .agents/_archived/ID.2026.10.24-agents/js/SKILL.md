---
name: js
description: Apply these requirements whenever creating, changing, reviewing, or explaining JavaScript in this Pen.
---

# JavaScript requirements

JavaScript files contain JavaScript only. Keep document structure and content in HTML files, and visual presentation in CSS files.

## Mandatory boundaries

- Do not put HTML markup in JavaScript files; do not build markup with HTML strings or assign to `innerHTML`.
- Do not put CSS in JavaScript files; do not use style strings, `style` attributes, or runtime style assignments.
- Keep behavior in separate JavaScript files and connect them from HTML with external script references.
- Use DOM APIs for required DOM changes. Use semantic HTML for structure and CSS classes or attributes for styling hooks.
- Preserve the existing architecture, naming, behavior, ordering, and formatting unless the request requires a change.

## Canonical JavaScript module

```js
// MARK: MODULE-NAME
// One-sentence responsibility.

export function functionName(input) {
  return result;
}
```
