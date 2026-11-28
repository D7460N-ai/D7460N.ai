---
name: html
description: Apply these requirements whenever creating, changing, reviewing, or explaining HTML in this Pen.
---

# HTML requirements

HTML files contain HTML only. Keep presentation in separate CSS files and behavior in separate JavaScript files.

## Mandatory boundaries

- Do not put CSS in HTML: no `<style>` elements, `style` attributes, or CSS embedded in other markup.
- Do not put JavaScript in HTML: no inline scripts, event-handler attributes, or JavaScript embedded in other markup.
- Link external stylesheets with `<link>` and external scripts with `<script src>`; use explicit relative paths such as `./style.css` and `./script.js`.
- Keep HTML markup and page content in HTML files. Do not place HTML markup in CSS or JavaScript files.
- When adding a stylesheet or script, include its reference in the relevant HTML file.
- Preserve the existing document structure and only change the requested HTML scope.

## Canonical references

```html
<link rel="stylesheet" href="./style.css">
<script type="module" src="./script.js"></script>
```
