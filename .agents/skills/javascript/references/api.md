# API

The single transport surface: [`implementation/fetch-json.js`](./implementation/fetch-json.js). JSON in, parsed data out.

## The shape of `fetch-json.js`

```javascript
// MARK: FETCH-JSON
// GET one JSON file. Returns parsed data, or null on any failure.
// Transport only. Knows no element, no state machine, no route name.

export async function fetchJson(path = "") {
  if (!path) return null;

  try {
    const response = await fetch(path);
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}
```

Callers pass the full path: `fetchJson("assets/data/shell.json")` (`onload.js`), `` fetchJson(`assets/data/${route}.json`) `` (`oninput.js`).

## Error handling

A non-OK response or a thrown error returns `null`; `inject(null)` is a no-op. Nothing is logged. The architecture does not invent fallback data, redirect to a local mock, or retry against a different endpoint (AGENTS.md §8).

## CRUD verbs

`fetchJson` is GET. For POST / PUT / PATCH / DELETE, add one function per file (e.g. `post-json.js`). Never a class.

## What transport never does

- Never has more than one base declaration
- Never inlines the base into call sites
- Never silently retries
- Never mocks data
- Never touches the DOM
- Never depends on UI state

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `fetch` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- `Response.ok` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
- `Response.json()` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Response/json

**AutoCSS Architecture:** serves the single API transport surface — base declared once, name-only suffix, JSON parsing, and error handling. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## Reference

- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN `Response.ok`: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
- MDN `Response.json()`: https://developer.mozilla.org/en-US/docs/Web/API/Response/json
- MDN HTTP status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
