# AutoCSS Whitelist

Status: live (owner approved 2026-11-28). Injected by `.claude/hooks/autocss-law.sh` at SessionStart, SubagentStart and every UserPromptSubmit (M5). Open items below stay open until ruled.
Validator: `.claude/hooks/validate-edit.js` — installed as a PreToolUse hook (Write|Edit|Bash) in `~/.claude/settings.json`.

**Rule 0. Everything is prohibited except what is listed here or what the user explicitly instructs, per instance.**

## R. Ruling principles
| # | Allowed |
|---|---|
| R1 | Never assume anything except that the user knows more and knows what they are doing. Do exactly what the user says. No more, no less. |
| R2 | User decides right, wrong, correct, incorrect. |
| R3 | All design engineering is browser native. The native web browser is the framework. |
| R4 | Zero third-party dependencies. No build tools. Web fonts allowed where appropriate: Google Fonts `@import` or self-hosted `@font-face`. |
| R5 | Every project is a browser-native SPA: one page, SPA tabs only, zero routing to other pages. |
| R6 | Every project is a browser-native PWA. |
| R7 | All HTML structure is pre-delivered (JAMstack). |
| R8 | Air-gapped SOC: presentation layer vs data layer; between native browser languages (JS uses CSS selectors and their logic to select elements). |
| R9 | Reduce complexity and maintenance. Adding code adds both. |
| R10 | Refactor existing code (without breaking) before writing new code. |
| R11 | Abstraction: rarely, if ever. |
| R12 | Each HTML, CSS, JS module independent and copy/paste-able. |
| R13 | No destructive actions. Archive only on user approval, after this list is proven on small test projects. |
| R14 | Least Power: HTML first, then CSS. CSS always preferred over JS; replace JS with CSS unless there are qualifying circumstances (state them). Least JS possible. |

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
| H2 | Elements: all valid semantic HTML elements. Never `div`, `span`. |
| H3 | Custom elements: `app-container` `app-banner` `app-logo` `app-user` `app-legal` `app-version`, plus every custom element in the `<template>` pool. |
| H4 | Attributes: element's own native attributes; `aria-label`, `aria-live`, `aria-disabled`; `aria-hidden="true"` only on non-focusable decorative elements; `role="list"` on `ul`. Never IDs, classes, `data-*`. |
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
| C4 | One concern per file; whole file in one `@layer <filename>`. Theme files `color-theme-<hex>.css` use `@layer color-theme`. `@scope` allowed. |
| C5 | Selectors: element names, native attributes, H4 `aria-*`, universal `*`, all pseudo-classes and pseudo-elements. |
| C6 | Layout: CSS Grid. Prefer the implicit grid; explicit `grid-template-*` and numeric placement allowed where needed. Goal: fluid, flexible, non-brittle layouts that don't break when children are added or removed — avoid numbers that must be maintained. |
| C7 | Sizes: all CSS units and sizing functions; custom properties, `@property`, `@function`, `if()`. |
| C8 | Responsive: `@container`; media range syntax in `ch`; `prefers-*` media features. |
| C9 | Color: `color-scheme: light dark` on `:root`; `light-dark()`; all CSS color types. |
| C10 | Logical properties where content direction matters (RTL/LTR languages); physical properties allowed elsewhere. Padding/margin only on `p`, `h1`–`h6`, `label` (more on instruction). |
| C11 | Motion: transitions on named properties; `@keyframes` animations; reduced under `prefers-reduced-motion`. |
| C12 | Popover/hover placement: anchor positioning. |
| C13 | `@supports`; `content-visibility` + `contain-intrinsic-size`. |
| C14 | Vendor prefixes only for non-Baseline features. |

## J. JS — three stand-alone, independent, reusable functions
| # | Allowed |
|---|---|
| J1 | `check`: on load, reads browser memory for the position of the nav radio selected last session. Identity = position among the nav radios (page order, any nesting, found with `querySelectorAll`). Tab text is for people only, never an identity; no `value`. |
| J2 | `set`: selects the radio at that position; none or out of range → first nav radio. Then dispatches `new Event("input", { bubbles: true })` on it, so its own `oninput` runs. This is the only event JS fires, and only on load. |
| J3 | `oninput`: a user's selection fires `input` natively — no JS fires it (sole exception: J2 on load). One line in JS connects the function: `document.oninput = oninput`. Never an `oninput` attribute in HTML. `oninput` saves the selected radio's position to browser memory, then fetches `assets/data/NNN.json` for that position (3 digits: `001`, `002` …). |
| J4 | Events: only `input`. Exception (P6): `sw.js` may use `self.oninstall`, `self.onactivate`, `self.onfetch`. All other JS events prohibited unless noted per feature. |
| J5 | API base URL declared once; only suffix varies. Failed fetch → detailed console error; no fallback, no mock. |
| J6 | Reach elements with CSS selector syntax and logic (`querySelector`, `querySelectorAll`, `closest`, `matches`) as much as possible. JS node-walking (e.g. `parentNode`, `childNodes`) only where CSS can't do it, with the justification in a code comment beside it. Never `getElementById` or `getElementsBy…`. |
| J7 | No JS DOM manipulation (hard rule). The scaffolding and layout are pre-delivered in the HTML and never change. Sole exception: a generic JS loop adds or removes only the HTML that directly wraps content, as the data requires (e.g. `ul`/`li` table rows, nav labels and their radio inputs, dropdown-menu items, content paragraphs, custom elements that wrap content), and writes data into elements (text, incl. `textContent`; `src`/`alt`). Never `innerHTML` (HTML in JS), never inline styles, never JS-driven presentation. |

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
| T5 | Security headers: CSP `'self'` (plus the Google Fonts origins when they are used), no `unsafe-*`; HSTS; nosniff; Referrer-Policy; Permissions-Policy; COOP/COEP/CORP. |

## Open — not ruled by the user
| # | Item | Fact on record |
|---|---|---|
| P4 | `<template>` pool + `pool.html` | Keep for now; investigate (security, custom elements). |
| P5 | `<app-notice>` + `showPopover()` | Preserve for now; investigate. |
| P9 | JSON keys / mapping content to elements / reuse vs replace / future `contentEditable` | Investigate. |
| P3 | Data tables, forms | Later; one way only. |
| V2 | Validator: allowed by inference | Remote origin `https://autocss-com.github.io/`. (`@font-face` ruled: R4.) |
