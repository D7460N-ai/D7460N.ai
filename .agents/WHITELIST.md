# AutoCSS Whitelist — DRAFT (not yet adopted)

Status: draft from session 2026-11-24/26. Not yet canon. Replaces nothing until the user approves and it is proven on small test projects (R13).
Validator: `.claude/hooks/validate-edit.js` — written and tested, NOT installed (no hook entry in any settings.json).

**Rule 0. Everything is prohibited except what is listed here or what the user explicitly instructs, per instance.**

## R. Ruling principles
| # | Allowed |
|---|---|
| R1 | Never assume anything except that the user knows more and knows what they are doing. Do exactly what the user says. No more, no less. |
| R2 | User decides right, wrong, correct, incorrect. |
| R3 | All design engineering is browser native. The native web browser is the framework. |
| R4 | Zero third-party dependencies. No build tools. |
| R5 | Every project is a browser-native SPA: one page, SPA tabs only, zero routing to other pages. |
| R6 | Every project is a browser-native PWA. |
| R7 | All HTML structure is pre-delivered (JAMstack). |
| R8 | Air-gapped SOC: presentation layer vs data layer; between native browser languages. |
| R9 | Reduce complexity and maintenance. Adding code adds both. |
| R10 | Refactor existing code (without breaking) before writing new code. |
| R11 | Abstraction: rarely, if ever. |
| R12 | Each HTML, CSS, JS module independent and copy/paste-able. |
| R13 | No destructive actions. Archive only on user approval, after this list is proven on small test projects. |

## B. Behavior (every reply)
| # | Allowed |
|---|---|
| B1 | Before each reply: re-read user instructions, this list, current repo handoff. |
| B2 | Ambiguity or conflict → stop, ask, wait. |
| B3 | Propose first; edit only after explicit approval. |
| B4 | State only what a tool call verified; cite MDN, W3C, WHATWG, Baseline. |
| B5 | Minimum words, tables, steps. One small step at a time. |
| B6 | Rule broken → name rule, diagnose, correct, re-run. |
| B7 | External service fails → stop; give user the fix at source. |
| B8 | Priority: accuracy > time > cost. |
| B9 | Every session + every reply: `npx -y modern-web-guidance@latest` (`@googlechrome` copy only) + MDN. |

## M. Memory, docs, hooks
| # | Allowed |
|---|---|
| M1 | One canon file: `D7460N-ai/D7460N.ai/AGENTS.md` = this list. |
| M2 | Per repo: `AGENTS.md` (project structure only), `.agents/SESSION-HANDOFF.md` (current state + next step only), `PROGRESS.json` (backlog as data). |
| M3 | Vendor files (`CLAUDE.md` etc.): one-line pointer. |
| M4 | Docs: written for AI, whitelists only, each rule once. |
| M5 | Hook injects full list at SessionStart, SubagentStart, every UserPromptSubmit. |
| M6 | `~/.claude/CLAUDE.md` imports canon `AGENTS.md` only; each repo's `CLAUDE.md` imports its own `AGENTS.md` + handoff. |
| M7 | Session end: commit → `PROGRESS.json` → handoff → next-step prompt. GitHub Issues mirror `PROGRESS.json`. |

## H. HTML
| # | Allowed |
|---|---|
| H1 | One `index.html` per project; line 1 `<!doctype html>`; `<meta name="color-scheme" content="dark light">`. |
| H2 | Elements: html head body title meta link script noscript template slot · header nav main aside footer article section hgroup address search · h1–h6 p · ul ol li dl dt dd · table thead tbody tfoot tr th td caption colgroup col · form fieldset legend label input select option optgroup textarea output · figure figcaption picture source img video audio track · details summary dialog menu a · time mark abbr cite code pre blockquote q strong em small sub sup br hr wbr |
| H3 | Custom elements: `app-container` `app-banner` `app-logo` `app-user` `app-legal` `app-version` |
| H4 | Attributes: element's own native attributes; `aria-label`, `aria-live`, `aria-disabled`; `aria-hidden="true"` only on non-focusable decorative elements. Never IDs, classes, `data-*`. |
| H5 | Interaction: pure CSS state machines (`<label>` wrapping native radio/checkbox; input visually hidden, still focusable); native `<a href>` links; text `input`, `select`, `textarea`. |
| H6 | Shell: `app-container` > `app-banner`, `header`(`app-logo`, `app-user`), `nav`, `main` > `article` > (`h1`, `section`), `aside`, `footer`(`app-legal`, `app-version`), `app-banner`. |
| H7 | One `<script type="module">` before `</body>`, outside `app-container`. `<link rel="stylesheet">` order = cascade order. |
| H8 | Scroll containers: `section`, `ul`, `ol`. Repeated items: `ul > li`. |

## C. CSS (does everything else)
| # | Allowed |
|---|---|
| C1 | CSS owns all presentation and UI state. |
| C2 | Visibility: `display: none` ↔ `display: grid`, faded via `transition-behavior: allow-discrete` + `@starting-style`. |
| C3 | Elements hidden by default while empty; `:not(:empty)` shows them. Gap between state-machine selection and data arrival = pure-CSS loading state (`:empty`). |
| C4 | One concern per file; whole file in one `@layer <filename>`. |
| C5 | Selectors: element names, native attributes, H4 `aria-*`, pseudo-elements. State: `:checked` `:has()` `:not()` `:empty` `:focus-visible` `:user-valid` `:user-invalid` `:disabled` `:popover-open` |
| C6 | Layout: CSS Grid, implicit grid; never depends on child count/position. |
| C7 | Sizes: `fr` `auto` `min-content` `max-content` `fit-content` `%` `rem` `em` `ch`, viewport + container units, `clamp()` `min()` `max()` `calc()`, custom properties, `@property`, `@function`, `if()`. |
| C8 | Responsive: `@container`; media range syntax in `ch`; `prefers-*` media features. |
| C9 | Color: `color-scheme: light dark` on `:root`; `light-dark()`; `oklch()`; system colors; `currentColor`. |
| C10 | Logical properties. Padding/margin only on `p`, `h1`–`h6`, `label` (more on instruction). |
| C11 | Motion: transitions on named properties; reduced under `prefers-reduced-motion`. |
| C12 | Popover/hover placement: anchor positioning. |
| C13 | `@supports`; `content-visibility` + `contain-intrinsic-size`. |
| C14 | Vendor prefixes only for non-Baseline features. |

## J. JS — three stand-alone, independent, reusable functions
| # | Allowed |
|---|---|
| J1 | `check`: on load, reads browser memory for the nav radio selected last session. |
| J2 | `set`: selects the radio `check` found; none → first nav radio. |
| J3 | `oninput`: a user's selection fires `input` natively — no JS defines or fires it. `oninput` fetches that radio's JSON content. |
| J4 | Events: only `input`. Exception (P6): `sw.js` may use `self.oninstall`, `self.onactivate`, `self.onfetch`. All other JS events prohibited unless noted per feature. |
| J5 | API base URL declared once; only suffix varies. Failed fetch → detailed console error; no fallback, no mock. |

## D. JSON
| # | Allowed |
|---|---|
| D1 | Strings, numbers, booleans, null, arrays, objects. Data only. |
| D2 | Data presence drives visibility. |

## N. Naming
| # | Allowed |
|---|---|
| N1 | Names describe the concern. Lowercase-hyphen files. |
| N2 | Inactive file = trailing `_`. |
| N3 | Custom properties named by concern (`--surface-1`, `--accent`). |

## T. Required outcomes
| # | Allowed |
|---|---|
| T1 | Every change: before/after screenshots + test gate; ships only with no unapproved difference. |
| T2 | Every empty/error state has a way out; first load never blank. |
| T3 | Unsupported CSS feature → message: feature, user's browser + version, supporting version, download link. |
| T4 | Modal = miniature `index.html`, no `h1`. |
| T5 | Security headers: CSP `'self'` only, no `unsafe-*`; HSTS; nosniff; Referrer-Policy; Permissions-Policy; COOP/COEP/CORP. |

## Open — not ruled by the user
| # | Item | Fact on record |
|---|---|---|
| O1 | How `oninput` runs on load | Selecting a radio in JS (`.checked = true`), or a default `checked` radio, fires no event (verified Chromium; [MDN input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)). Options offered: call the function directly once on load, or dispatch `input`. |
| O2 | How the `oninput` function attaches | User: "we don't need js to define and fire it." Options on record: JS `.oninput =` property, or HTML `oninput` attribute (prior canon forbade `on*=` in markup). |
| O3 | Where the last selection is saved (P2) | User: "covered in set function." cdn today saves in `oninput` (`oninput.js:26`). |
| O4 | Restore identity | User's code restores by radio `value`; earlier user statement: "you don't even need an HTML value." Radios without `value` all report `"on"`. |
| O5 | `querySelectorAll` | Not in J; the validator blocks it. |
| P4 | `<template>` pool + `pool.html` | Keep for now; investigate (security, custom elements). |
| P5 | `<app-notice>` + `showPopover()` | Preserve for now; investigate. |
| P8 | Wildcard `*` transitions (cdn `transitions.css`) | Investigate. |
| P9 | JSON keys / mapping content to elements / reuse vs replace / future `contentEditable` | Investigate. |
| P3 | Data tables, forms | Later; one way only. |
| V1 | Validator: blocked by strict list | `querySelectorAll`, `textContent`, `@keyframes`, `@scope`, `:where`, `:is`, `:hover`. |
| V2 | Validator: allowed by inference | `@font-face` (self-hosted fonts, R4); remote origin `https://autocss-com.github.io/`. |
