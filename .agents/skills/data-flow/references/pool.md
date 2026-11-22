# Pool-materialization and the two rendering mechanisms

The `<template>` element is a pool of inert, pre-authored prototypes. Two
distinct mechanisms use it. Keep them separate — conflating them is a recurring
defect.

## Mechanism A — pool-materialization (component loading)

When array data needs more elements of a tag than the DOM was seeded with, the
renderer grows the DOM by **cloning the allow-listed prototype from the
`<template>` pool** — never by cloning a live, already-populated DOM element
(that carries stale content and, worse, silently renders nothing when the tag
was seeded zero times).

- **The pool IS the allow-list.** It bounds what data may create. A tag with no
  prototype in the pool and no seed in the DOM cannot be materialized.
- **Never fail silently.** If data needs N of a tag but neither a seed nor a
  pool prototype exists, emit a `console.warn` naming the tag and the shortfall.
  A missing element that renders nothing with no diagnostic is the exact failure
  mode this guards against — "no console error" is not "nothing is broken."
- The prototype is inert until cloned, so a page may ship one of each element
  (or none) and let the data drive the count. What differs between pages is the
  **order and frequency** of components, not the components themselves.

## Mechanism B — data-table cells (see the main skill)

Inside a data table, each `<li>` row's cells are custom elements **generated
from the record's JSON keys** via `toTagName()` + `createElement`, injected with
their paired value. Columns are dynamic and per-record; they are NOT cloned from
the pool. This is a separate path from Mechanism A and must not be folded into
it.

## Delivering the pool: inline vs. served-from-host

The pool may live inline in each page's `<template>`, or be **served once from
the shared front-end host and fetched into an empty `<template>` at boot** — the
App Shell model, so the pool is "called, not copied" (one source for every
consuming site). A boot step populates an empty `<template>` from the host
(resolved from the module's own URL, e.g. `import.meta.url`); a page that still
ships an inline pool is left untouched (backward-compatible).

- **Inert = flash-free.** `<template>` content never renders until cloned, so
  fetching the pool after first paint costs no visible flash.
- **Deploy order is load-bearing.** The host's pool must be live **before** any
  consuming site ships an emptied `<template>` — an empty pool with nothing to
  fetch renders blank. Host first, then consumers.

## Verifying a change to any of the above

Structure, heuristics, and data are air-gapped; a change to the renderer or the
pool must not alter what any site renders. Gate every such change with a
**hermetic, headless-browser DOM diff against a golden baseline** captured from
the known-good render (all routes, per site). "It renders without errors" is
never sufficient evidence — diff the DOM. The canonical regression case: an
array injected into a container that seeds no prototype for that element must
still materialize from the pool (its absence is silent without a diff).

## Baseline & support

_Checked against MDN as of 2026-09-07._

- `<template>` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template
- `import.meta.url` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta
- `fetch()` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch

**Canonical rules:** https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md
