# API

The single transport surface: [`implementation/fetch-json.js`](./implementation/fetch-json.js). Base declared once. Only the name (endpoint suffix) varies. JSON in, parsed data out.

## The shape of `fetch-json.js`

```javascript
const BASE = "assets/data/";

export async function fetchJson(name = "") {
  if (!name) return null;

  const path = `${BASE}${name}.json`;

  try {
    const response = await fetch(path);

    if (!response.ok) {
      console.error(`${new Date().toISOString()} FAIL ${path}`, response.status, response.statusText, response);
      return null;
    }

    const data = await response.json();
    console.log(`${new Date().toISOString()} OK ${path}`);
    return data;
  } catch (error) {
    console.error(`${new Date().toISOString()} FAIL ${path}`, error);
    return null;
  }
}
```

`BASE` is declared once, here. Callers pass only the name: `fetchJson("shell")`, `fetchJson(route)`. A remote API changes `BASE` (and the `.json` suffix if its paths differ) — nothing else.

## Error handling

Success logs one minimal timestamped line. Failure logs verbosely (status, status text, response, or the thrown error) and returns `null`; `inject(null)` is a no-op. The architecture does not invent fallback data, redirect to a local mock, or retry against a different endpoint (AGENTS.md §8).

## CRUD verbs

`fetchJson` is GET. For POST / PUT / PATCH / DELETE, add one function per file (e.g. `post-json.js`) that reuses the same base — export `BASE` from `fetch-json.js` and import it; never declare a second base. Never a class.

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
