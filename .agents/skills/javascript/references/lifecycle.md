# Lifecycle

The single `oninput` lifecycle that drives all CRUD operations. Reference implementation: [`implementation/`](./implementation/).

## The full chain

```
user selects a state-machine input (or onload.js selects one on initial load)
  ↓
input event bubbles to document → document.oninput (oninput.js)
  ↓
the control's own label text names its data file
  ↓
write-storage.js saves the selection (key = the input's group name)
  ↓
fetch-json.js GETs assets/data/<name>.json and parses it
  ↓
inject.js places the data into <main>: key = tag, shape = destination
  ↓
CSS reacts via :empty / :has() / :not(:empty)
  ↓
content visible
```

## Initial load

```javascript
// app.js
import { oninput } from "./oninput.js";
import { onload } from "./onload.js";

document.oninput = oninput;

onload();
```

`onload.js` injects `assets/data/shell.json` into `<body>`, then selects the saved (or first) nav radio and dispatches its `input` event:

```javascript
control ? (control.checked = true) : null;
control?.dispatchEvent(new Event("input", { bubbles: true }));
```

Setting `.checked` alone does not fire `input`, and `.click()` is forbidden (AGENTS.md §5) — so this `dispatchEvent` is the single sanctioned programmatic entry. There is one entry point, not two: the boot path and the user-action path are identical.

## Binding `oninput` (no `addEventListener`)

`document.oninput = oninput` is one property assignment on `document`. Every state-machine input's `input` event bubbles to it — no per-input binding, no list of inputs. Assigning again replaces, never stacks (idempotent).

## Routing: the name is the association

```javascript
const route = control.closest("label")?.textContent.trim().toLowerCase();
inject(
  await fetchJson(`assets/data/${route}.json`),
  document.querySelector("main")
);
```

The label text ("Home") names the data file (`home.json`). No index, no list, no lookup table.

## Shell vs. page

- Shell (`shell.json` → `<body>`): once per runtime session, from `onload.js`.
- Page (`<name>.json` → `<main>`): every lifecycle run, from `oninput.js`.

## Idempotency

Re-selecting the same input produces no observable change: the same data is injected into the same elements. Surplus elements are emptied, never removed — CSS `:empty` hides them.

## What the lifecycle never does

- Never registers more than one handler (`document.oninput` only)
- Never calls `addEventListener`
- Never tracks state in module-level variables (constants only)
- Never uses `setTimeout`, `setInterval`, or `requestAnimationFrame` for lifecycle progression
- Never branches on user vs. programmatic selection — both enter through the `input` event

## Baseline & support

_Checked against MDN as of 2026-07-16._

- ES modules (`import` / `export`) — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

**AutoCSS Architecture:** serves the single `oninput` lifecycle from input event to data injection. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## Reference

- MDN `input` event: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
- MDN `EventTarget.dispatchEvent()`: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
- MDN event handler properties: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events#using_onevent_properties
