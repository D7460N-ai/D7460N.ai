---
name: architecture
description: Entry point for projects following the air-gapped, browser-native, declarative-first architecture. Defines the layer separation (html, css, javascript, json) and routes to the concern skill for any task. Use when starting any work, when in doubt which concern owns a task, or when about to mix concerns.
license: MIT
metadata:
  version: "1.0.0"
---

# Architecture

The browser is the SDLC single source of truth, framework, and IDE. The web platform — HTML, CSS, JavaScript — is mature enough on its own to do everything frameworks do, and to do it better, because it is not burdened by the layers of complexity, over engineering, forced "happy paths", and vendor-lock that frameworks and libraries add. Every concern is separation of concerns air-gapped and independent from every other concern. There is exactly one way to do each thing, which minimizes guessing, mistakes, and rework, while remaining compatible/interoperable with all framewors and libraries. 

## Philosophy

The AutoCSS Architecture respects developers as professionals, not try to control them through complexity and abstraction.

Frameworks control code through complexity and abstraction. They assume developers cannot be trusted to write clean efficient HTML, will reach for `<div>` everywhere, will couple together and mix concerns, will not study the platform. They wrap the platform in abstractions that hide it, then teach developers the abstraction instead of the platform. The result is a wall of unknowable complexity — "mystery meat" — that produces tech debt, a long O&M tail by default, and entrenches weakness while simultaneously over-engineering virtually everything to artificially raise cognitive barriers of entry.

**AutoCSS Architecture** goes the other way. It respects and meets developers where they are as studious, diligent, hard workers that care for and respects their craft. It **establishes standards** — HTML, CSS, JavaScript — done well — **as the default**. The **AutoCSS Architecture** is easier and faster to pick up than a framework because it is **simple by design**. That simplicity is the point: it is what _lowers cognitive barriers of entry_ and produces clean output, predictable (intuitive) behavior, and a system any qualified developer can easily and intuitively read end-to-end. Usability is not just for end-users, but for developers as well. 

The **AutoCSS Architecture** is _authoritative_ in that it is what you get when you combine the best of both modern **W3C/WCAG/508 compliance standards** and **modern UI/UX/A11Y best practices and techniques**. As the AI, you must ensure that coding practices and designs that fall outside of these standards and best practices and techniques must be re-engineered until the AutoCSS Architecture standard is met and or exceeded. As part of the air-gapped separation of concerns, to "bake-in" semantic markup by default, and to stay out of the way of frameworks, libraries, or other additional word, classes, IDs, data-attributes, `div`s, and `span`s are _strictly forbidden_ for AI use. Proper design shall always be preferred over complexity or abstraction. The fix is the better design.

A few practical notes:

- HTML is **div-less and span-less.** If a semantic element does not fit the intent's main meaning, the design must be rejected — go to the parent and re-engineer. (See the `html` skill.)
- CSS is **the UI runtime**, not just styling. It must replace all JS equivalents. CSS owns everything in the presentation layer except the API CRUD data transport. This includes layout, state, transitions, themes, visibility, loading, etc. Anything that can be expressed in CSS is expressed in CSS. (See the `css` skill.)
- JavaScript is **API CRUD data transport only**, on a single `oninput` lifecycle. No event listeners, no click events, no UI logic, no DOM manipulation for presentation. (See the `javascript` skill.)
- JSON is **data only.** No markup, no styling, no flags. Data presence drives UI; absence hides it. (See the `json` skill.)

## End-user customization is a feature, not an edge case

Users — especially those who work with the same surface every day — earn the right to see their data their way. The **AutoCSS Architecture** treats this as a primary design goal:

- Data tables are rendered as `<ul>` / `<li>` (see the `data-flow` skill) so CSS (never JavaScript) can present them as list view, card view, or other views without rebuilding the DOM.
- A consistent **zen-mode (full-screen)** affordance is planned across the architecture so users can promote the section they're working in to a full viewport, not a modal overlay.
- Color-scheme follows system preference by default, with optional user override (see `css/references/themes.md`). [Color-scheme and color-themes have been split into two different documents sothis needs to be updated.]
- Color-themes are selectable via the (as yet to be built) native HTML color-theme color-picker.
- All UI state is in the DOM, which means the user's choices persist naturally with storage utilities, not with framework state managers.

This is the inverse of the framework approach. Frameworks ship one rendering and harden it. The **AutoCSS Architecture** ships the data and lets CSS reshape it on the user's terms.

## Air-gapped Separation of Concerns principle

Each concern is air-gapped and completely independent. A change in one concern produces no change in any other. Each concern correlates to a CSS or JS file. Each file must be able to be copy/pasted into a Codepen for independent inspection and testing and should work as designed without any other CSS or JS file.

| Concern | Owns | Knows nothing about |
|---|---|---|
| html | Structure, semantics | Style, behavior, data shape |
| css | All UI: layout, state, themes, visibility, transitions, loading | JavaScript, network, data shape |
| javascript | Data transport, oninput lifecycle, storage | UI, layout, presentation, state |
| json | Data shape and types | HTML, CSS, JavaScript, presentation |

Air-gap is enforced two ways:
- **No cross-references.** HTML never names a CSS class. CSS never reads JavaScript state. JavaScript never writes presentation. JSON never contains markup.
- **Each layer reads only its own concern.** CSS reads the DOM tree (semantic elements, native attributes, `:empty`, `:has()`). JavaScript reads JSON. HTML is static.

## Principle of Least Power

For any given task, use the least powerful technology that expresses the intent declaratively. HTML before CSS, CSS before JS, declarative attributes before scripted behavior. Reaching for a more powerful tool requires that the less powerful tool genuinely cannot express the intent — and the design is re-engineered before that conclusion is accepted.

## Cross-browser compatibility is not a concern

The architecture targets evergreen browsers and the platform's leading edge. Cutting-edge experimental features are used without regard for older or non-evergreen browsers. The platform is the framework; the platform's latest is what we use.

## Working principles

- **Reuse existing functions before creating new ones.** Each skill catalogues every permitted utility. New utilities are added only with explicit user instruction.
- **Never create new coding patterns.** All patterns in this architecture are already established and documented in the relevant skill. If a task seems to require a new pattern, the design is wrong — re-engineer until an existing pattern fits.
- **Adding code or files always increases entropy.** Code and files are added only when the user explicitly states to. The default is to use what already exists.

## Image assets

Static image assets are split:

- `assets/images/app/` — project-functional assets unrelated to branding (icons, illustrations, UI imagery)
- `assets/images/brand/` — brand assets (logos, brand marks, color-bound imagery)

## Routing

Pick the concern skill for the task before doing anything else. If a task touches more than one concern, do each part inside its own skill.

| Task | Skill |
|---|---|
| Page structure, regions, custom elements | `html` |
| Layout, theme, state visualization, transitions, any UI behavior | `css` |
| API call, oninput lifecycle, storage, startup | `javascript` |
| Data shape, schema, content payload | `json` |
| JSON-to-element rendering for data tables | `data-flow` |
| Naming files, tags, skills | `naming` |
| Headers, CSP, hosting | `security` |
| Manifest, service worker, install behavior | `pwa` |
| SPA shell, radio-nav routing, view lifecycle, view transitions | `spa` |
| Choosing an approach, trade-offs, "which tool / why this design" | `principles` |
| Verifying a change before it ships | `testing` |
| Session start/end, handoff, backlog, board, docs | `session` |

If the task is "make X visible when data arrives" → `css` (uses `:empty` / `:has()`), not `javascript`.
If the task is "fetch data when nav changes" → `javascript` (uses `oninput.js`), not `html`.

## Project shell

The single SPA entry point is `index.html` at project root. Layout regions:

```
app-container
├── app-banner (optional; hidden when :empty)
├── header (app-logo, app-user)
├── nav    (radio inputs inside labels)
├── main   (article > h1 + section)
├── aside
├── footer (app-legal, app-version)
└── app-banner (optional; hidden when :empty)
```

One `<script type="module">` before `</body>`, outside `app-container`.

## Standards alignment

This skill set follows the Agent Skills open standard at agentskills.io. Each skill is independently loadable, each follows the YAML frontmatter spec, each uses progressive disclosure (frontmatter ~100 tokens always loaded; SKILL.md body loaded on activation; references/ loaded only when the agent reads them).

## When in conflict

Conflicts in declared rules are surfaced to the user. The agent never resolves a contradiction silently. The user is the sole arbiter of what is correct.

## Air-gap test

Before any change ships, the change must pass:

1. Does this HTML change require any CSS or JS change? If yes, the air-gap is broken — fix the design.
2. Does this CSS rule require any JS, any specific data, or any class/id? If yes, fix the design.
3. Does this JS function touch the DOM for presentation? If yes, fix the design.
4. Does this JSON contain HTML or styling? If yes, fix the design.

The architecture exists to make these answers always "no."

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `:has()` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/CSS/:has

**Canonical rules:** https://github.com/Autocss-com/ai/blob/main/AGENTS.md
