---
name: javascript
description: JavaScript rules for projects following the air-gapped, declarative-first architecture. JS is data transport only — it fetches, parses, stores, and injects JSON. It never controls UI state, never manipulates the DOM for presentation, and never uses event listeners. Use whenever writing or reviewing any .js file.
license: MIT
metadata:
  version: "1.0.0"
---

# JavaScript

JavaScript is data transport only. CRUD against an API. Nothing else.

## The only permitted JavaScript responsibilities

1. **API transport** — `fetch()` of JSON, parsing responses
2. **`oninput` lifecycle** — one `document.oninput` handler; every state-machine input enters it
3. **Data injection** — JSON → DOM by key/shape (text, cloned `<template>` slots, allow-listed attributes)
4. **Storage** — localStorage, one key per state-machine group
5. **Startup wiring** — fill the shell, then select a state machine so its own `oninput` fires

Anything else is forbidden.

## Files

One function per file, named for what it does. **No limit on the number of files.**

**Reference implementation (canonical, copy-paste):** [`references/implementation/`](./references/implementation/)

- `app.js` — router: `document.oninput = oninput`, then `onload()`
- `oninput.js` — the single lifecycle: label text → `` fetchJson(`assets/data/<name>.json`) `` → `inject()` into `main`; saves the selection
- `onload.js` — injects `assets/data/shell.json`, selects the saved (or first) nav radio, dispatches its `input` event
- `fetch-json.js` — GET one JSON file by path; `null` on any failure
- `inject.js` — JSON → DOM: key = tag, shape = destination; surplus elements emptied (CSS `:empty` hides them)
- `to-tag-name.js` — JSON key → tag name
- `read-storage.js` / `write-storage.js` — localStorage read/write, silent on failure

## Only these patterns for DOM access

- **`document.querySelector('selector')`** — the only permitted selector method

Forbidden:
- `document.getElementById()`
- `document.getElementsByClassName()` (and there are no classes anyway)
- `document.getElementsByTagName()`
- `document.querySelectorAll()` is permitted only when iterating a known set; prefer `querySelector` chaining
- jQuery, `$()`, any third-party DOM library

## Only these patterns for events

- **`element.addEventListener('input', handler)`** is forbidden in markup-driven flows. The `input` event is bound once via direct property assignment: `document.oninput = oninput` (`app.js`).
- The HTML attribute `oninput=` and every other `on*=` attribute is forbidden in markup. See the `html` skill.
- `addEventListener` is forbidden anywhere in the project, including inside JS files. The `oninput.js` lifecycle uses direct `.oninput` property assignment, which is idempotent.

The reasoning: every event registration is a piece of UI behavior. UI behavior belongs to CSS. The single exception is data transfer triggered by user input, which is the `oninput` lifecycle.

## DOM mutation for data

The architecture pulls all UI state into CSS. JS mutates the DOM only to place data, as `inject.js` does: text via text nodes (`createTextNode`, `prepend`, `removeChild`) so nested state-machine inputs survive; extra slots cloned from the `<template>` pool (`cloneNode`); attributes only from an allow-list (`src`, `alt`) via `setAttribute`. Surplus elements are emptied, never removed — CSS `:empty` hides them.

Also permitted where CSS cannot reach a browser default:

- `removeInlineStyles(element)` — strips any inline `style` attribute that the browser or a third-party may have inserted
- `clearFieldset(fieldset)` — resets a `<fieldset>` to its empty state for a fresh data render

## Constraints on every function

- **Stateless.** No module-level mutable state. No `let` declarations at module scope.
- **Idempotent.** Calling twice produces the same result as calling once.
- **No side effects** beyond the explicit responsibility (fetching, parsing, injecting data, writing to storage).
- **No global state.** No `window.foo`. No globals.

## Lifecycle conventions

- The API base URL is declared **once**. Only the endpoint suffix varies per page (`shell`, `home`, `about`, `products`, `events`, `contact`).
- Initial page load enters the same `oninput` lifecycle by selecting the saved (or first) nav radio, setting `checked = true`, and dispatching `new Event("input", { bubbles: true })` (AGENTS.md §5; `onload.js`). Never `.click()`. There is no separate "boot" path.
- Shell content (header, nav, footer, meta) is fetched and injected once per runtime session, not on every page change.
- The control's own label text names its data file — no index, no list, no lookup (`oninput.js`). The same DOM targets are reused for content injection.
- `console.clear()` runs on startup and on each lifecycle run.

## Console policy

- **Success:** minimal, timestamped, single line.
- **Failure:** verbose, timestamped, full error context.
- `console.clear()` on startup and on each lifecycle run.

## External service failures

When an API call fails (SSL error, network failure, 4xx, 5xx, rate limit), the JS does not retry against a different endpoint, does not redirect to a local fallback, and does not invent data. It surfaces the error to the user with enough detail for them to resolve it. The architecture is never modified to work around external service issues — the user resolves them at the source.

## What JavaScript never does

- Never registers event listeners (`addEventListener`)
- Never reads or writes `class`, `id`, or `data-*` attributes (those don't exist in this architecture's HTML)
- Never injects HTML strings (`innerHTML = '<div>'` etc.)
- Never sets inline styles
- Never controls visibility (CSS does that via `:empty`, `:has()`)
- Never animates (CSS does that)
- Never tracks UI state in JS variables (state lives in DOM via native `checked`, `open`, attributes)
- Never uses `eval`, `Function` constructor, or dynamic code generation

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `fetch` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- ES modules (`import` / `export`) — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
- `console.clear()` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/console/clear_static

**AutoCSS Architecture:** serves the JavaScript data-transport layer — fetch, `oninput` lifecycle, storage, and startup wiring. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## References

- `references/implementation/` — the canonical reference implementation (8 files)
- `references/lifecycle.md` — the canonical `oninput` flow from input event to data injection
- `references/api.md` — fetch, base URL, suffix, error handling
- `references/storage.md` — per-group localStorage read/write
- `references/forbidden.md` — full list of forbidden patterns with reasoning
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- ECMAScript spec: https://tc39.es/ecma262/
