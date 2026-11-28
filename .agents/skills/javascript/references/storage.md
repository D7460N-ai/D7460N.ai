# Storage

`localStorage`, one key per state-machine group. Two single-purpose functions: [`implementation/read-storage.js`](./implementation/read-storage.js) and [`implementation/write-storage.js`](./implementation/write-storage.js).

## The shape

```javascript
// read-storage.js
export function readStorage(key = "") {
  if (!key) return "";

  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

// write-storage.js
export function writeStorage(key = "", value = "") {
  if (!key) return;

  try {
    localStorage.setItem(key, value);
  } catch {  }
}
```

Key = the input's group name (`"nav"`, `"color-scheme"`, ...). Value = the selected control's name (its label text). Plain strings — no serialization needed.

Silent on failure by design: storage is unavailable in some privacy modes and must never break the UI. A failed read returns `""`, so `onload.js` falls back to the first control.

## Sensitive data

Never store secrets, tokens, or session credentials in `localStorage`. The browser exposes `localStorage` to any script running on the same origin — including a future XSS. Tokens belong in HttpOnly cookies set by the server.

## What storage never does

- Never stores HTML or DOM references
- Never stores JavaScript functions
- Never stores secrets
- Never breaks the UI when storage is unavailable

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `localStorage` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

**AutoCSS Architecture:** serves the per-group `localStorage` read/write utilities. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## Reference

- MDN `localStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN cookie security: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#security
