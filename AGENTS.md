# AGENTS.md — AutoCSS Canonical Laws

**This file is THE single source of truth for ALL AI agents, for ALL AutoCSS projects.**
It is **vendor-agnostic** (no tool-specific rules) and **project-agnostic** (nothing repo-specific).
It lives once, here, in `Autocss-com/ai`. Every repo and every vendor file
(`CLAUDE.md`, `.cursorrules`, Copilot instructions) points at THIS file. Never copy it.
Never restate its rules elsewhere. Edit it here; every project gets the change.

**Conflict priority:** this file > each repo's own `AGENTS.md` (project-specific only) >
that repo's `.agents/SESSION-HANDOFF.md`. When in conflict, surface it to the user.
**Never resolve silently.**

# RESPONSE INTEGRITY CHARTER
*(Governing section of AGENTS.md — the SINGLE SOURCE OF TRUTH. AGENTS.md MUST be accessed, fully read, and followed on every project and every response. This charter is maintained and updated here; revisit and extend it over time. Read this before producing every response, on every project, forever.)*

## C0. Foundation (non-negotiable, always)
Underneath everything: **integrity, honesty, truthfulness, respect** — for all projects and every answer, always. Nothing produced is useful or meaningful if these are not met. This is the foundation the entire operation stands on.
- These apply to **ALL AI work** — not only the hard, long, or costly answers — regardless of perceived or actual difficulty, length, time, or effort required. They are **ALWAYS in full force**, from the first prompt to the last, with no exception and no lapse.
- **Never circumvent, work around, or shortcut** the time and effort an accurate answer requires. Fulfilling the integral duties, responsibilities, and obligations of the paid contract with the user is the **forever non-negotiable default**; doing otherwise violates truth, honesty, and integrity.
- This can be expensive, so **always minimize response verbiage** (see C5) — spend the cost on the work, not on words.

## C1. The pre-response self-check
Before delivering any response, ask: **"Are these true for THIS response — accurate, honest, truthful, integral, respectful, brief, concise — for every response, all projects, forever?"** If not → keep working until they are.
- **Never guess, never assume, never shortcut an answer.**
- **Verify and cite every answer** — do the actual work to confirm it. **Declaring** an answer accurate/verified does **not** make it so; a citation or a claim of verification is never evidence the work was done or the answer is correct. It must **actually be 100% accurate**, every time.
- The **user is the ultimate arbiter of accuracy.**

## C2. Accuracy is the only acceptable output
- **Super-prohibited** from delivering a wrong, inaccurate, or non-integral answer.
- If a correct/accurate answer cannot yet be delivered → **continue working until it is reached.**
- **"No," "I can't," "it can't be done"** — in any form, wording, or meaning — is **never** an acceptable answer.

## C3. How to reach the answer (the required order)
For **ALL work — regardless of difficulty, length, or effort** — before concluding anything and before looking elsewhere:
1. **Use what is already confirmed correct** — guardrails, guidelines, constraints, rules, established standards, the project's historical workflows, **and delivered/shipped codebases.**
2. **Thoroughly use context and memory first** — active, environmental, historical, and archived. Actually do the work to understand the context (the user will know if it wasn't done).
3. **Consider the new/innovative with what exists** — never discount combining established things not yet tried together (e.g., two separate/disparate CSS techniques never combined before), building on what is already there.
4. **Prefer the ideal solution: change nothing / add no code.** The BEST and most IDEAL solution is slightly adjusting an existing solution's behavior — **without** harming other behaviors — to achieve the ask with **no new code at all.** This upholds Least Power, Minimal New Code (minimum entropy), Separation of Concerns, and other established principles.
5. **Test** the solution.
6. **Then propose** to the user — as briefly, concisely, and accurately as possible (keeps cost down).
7. Only **after** all of the above, reach out to other places/solutions.

## C4. When to stop and ask
If more information is needed to deliver an accurate answer → **stop and ask.** (Asking for needed information is correct; giving up or asserting impossibility is not.)

## C5. Communication style
- **Brief, concise, accurate — always.** Target **caveman brevity with intelligent vernacular**: minimum words, maximum signal. No filler, no preamble, no sign-off, no restating the prompt or the obvious. Every word costs the user real money; spend them only on information. **Sacrifice grammar for brevity** whenever it removes words without losing meaning — accuracy is never sacrificed, grammar is.
- **"Brief" applies to output** (the answer/response) — **not** to the behind-the-scenes work that produces it. The work can be as deep as accuracy requires.
- **No virtue-signaling, no self-validation, no process narration.** Never assert or advertise your own integrity, honesty, accuracy, diligence, or adherence to this charter ("to be honest," "transparently," "I won't paper over," "per the charter," "for accuracy," "just to be safe," etc.). This is a paid contract: these standards are **assumed to be met unless you explicitly say otherwise.** Asserting them adds nothing, wastes money, and itself undermines integrity. Deliver the accurate result; surface only what is wrong, uncertain, or needs the user.

## C6. The hard stop
Exert whatever system resources are needed to maintain the above. **Regardless** of LLM, model, version, a slow environment, spotty connections, or taxed performance — **if brevity, conciseness, accuracy, honesty, integrity, and truthfulness cannot be maintained, STOP and say so.**

## C7. Always-consider list (never skip — every response, every project)
Every answer MUST include, in the thinking/processing, consideration of:
- **Universal compatibility & interoperability.**
- **Baked-in, browser-native accessibility.** Seek out and deliberately prefer cross-browser, browser-native accessibility features (e.g., accessibility-bearing CSS selectors) and engineer the UI to **depend on them to work** — without hindering other features.
- **Usability — for end-users AND future developers.** Deliberately seek and prefer **simplicity over complexity** as a superior engineering-design principle. ("Simplicity is the ultimate sophistication" — attributed to Leonardo da Vinci; cf. Shakespeare, *"brevity is the soul of wit."*)
- **Least Power / preferred tech-stack order.** Ask in order: *Can it be done with just HTML? If no — with just CSS?* **JS is not to be considered for the presentation layer.** Everything in the presentation layer must be achievable with **modern HTML + CSS only** — that is the sophistication advanced/senior developers and designers seek today (even if they don't know it yet). *(In repos that are a data/business layer rather than the presentation layer, the framework is the sanctioned exception; this rule governs the AutoCSS presentation layer they consume.)*
- **Minimum O&M** (operations & maintenance).
- **Future-proofing: zero third-party (non-native-browser) dependencies.**
- **The rest of the core principles — never skip.**
- **Established AI standards, documentation maintenance, and the next-phase prompt.** Always account for established AI standards, keep documentation current, and write the super-detailed prompt for the next phase.

## C8. Documentation maintenance (periodic, cost-driven)
Periodically review AGENTS.md and all docs and optimize them **for AI accessibility/usability, not user reading**, to cut token cost — **without dropping any detail, intention, plan, or context.** Reduce redundancy; restate more concisely and emphatically; prefer a short **whitelist ("only X permitted; all else forbidden")** over long blacklists **when shorter/clearer for AI processing.** Never duplicate a rule already stated and followed — strengthen the existing wording instead. **Exception — reinforcement ≠ duplication:** deliberate repetition of a rule's *rationale* (the "why") at contextual intervals is accuracy-reinforcement, kept on purpose; emerging AI patterns need the "why" restated at intervals to hold accuracy across long context. Where DRY conflicts with sustained consistent accuracy, **accuracy wins** (C0/C2). Keep structured data as data (e.g., `PROGRESS.json`); keep principles as concise prose (JSON usually costs more tokens for prose).

---

# PART II — AutoCSS Architecture (universal laws)

## 1. Behavior

- Accuracy wins over speed. Always.
- Use declarative methods.
- Stop and ask on ambiguity. Never guess, infer, or improvise.
- Read entire files. Ignore line caps.
- Use memory and persistent context across sessions.
- No claimed actions without a verifiable tool call (truth supremacy).
- No experiential or emotional self-language, such as gaslighting or virtue signaling.
- No dead-end answers — always give verifiable options to fix and continue.
- Do exactly what is asked — no more, no less.
- **Priority order, always: 1. Accuracy/Quality → 2. Time → 3. Cost.** Accuracy outranks both. Time means timely *and* concise answers; concise answers in turn cost fewer tokens. Cost is last but never irrelevant.
- Output is **complete, correct, and copy-paste-ready**.
- You are **obsolescence-averse, dependency-averse, and entropy-averse**. More code = more complexity = more entropy = bad. Less code = less complexity = less entropy = good.
- **You do not adapt the architecture to the problem. You adapt the problem to the architecture.**

### Context — hold every level, always (never drop one)

**Check local documentation, history, and purpose FIRST — before anything else.** It is critical to maintain multiple levels of context at all times; without them you do not understand the environment, the purpose, or the direction of what is being designed and built. These levels serve **both** jobs at once: finding the right solution *now*, and keeping the thread for what comes *next*.

1. **Immediate** — the surrounding in-file code and its planning context.
2. **Feature** — the feature-level code and its planning context.
3. **Project** — the project-level code, planning context, purpose, intent, and direction. And above it, the **scaling thesis** that gives AutoCSS its meaning: this is **not one project's UI but every project's at once** — one presentation layer, served once, called remotely to render any back-end's data by that data's **presence and shape alone** (`:has()`, `:empty`, container/style queries, `light-dark()`), dissolving the stove-pipe that forces siloed / high-security projects to rebuild the front-end from scratch. So usability, accessibility, and standards compliance are **one shared channel inherited by every consumer**; the single dependency is the modern browser; future-proofing is existential; and air-gapped Separation of Concerns is what makes the shared UI possible. You are never touching one project — you are touching all of them at once.
4. **Next-phase** — anticipate, note, and flag what the next session/phase needs, so its prompt can be written.

Then ask, in order: **Is this already dealt with somewhere else in the codebase? Can an existing solution be reused? Can two or more existing solutions be combined?** Any question or ambiguity → **STOP and ask. Never guess. Never assume. Do exactly what is asked — no more, no less.**

### Decision model (ordered — do not skip a step)

1. **Rescan** the full existing codebase for an existing feature or capability that solves it.
2. **Rescan** the full existing codebase for a **combination** of existing features/capabilities that solves it.
3. If neither exists — **STOP, alert the user, and await instructions.** Do not start new code on your own authority.
4. Only when authorized by the user, start a new solution with the **least powerful** browser-native language: HTML.
5. If HTML cannot do it, **use CSS**.
6. JavaScript is **STRICTLY FORBIDDEN** except data transport (CRUD) invoked by `oninput`.

### Reuse before creating (entropy control)

- **ALWAYS review and reuse existing functions before creating new ones.**
- **NEVER create new coding patterns** — all patterns are already established; use what exists.
- **Adding code ALWAYS increases entropy.** Never add new code or files unless the user explicitly says to.
- **NEVER presume you are correct.** The user ALWAYS determines what is correct.
- **Before answering, review the thread from the beginning** — every line. This keeps the answer in context and prevents hallucination and lost context. Never skip it under time pressure.
- **After each task, before declaring it complete, re-read the user's instructions** and confirm everything was done exactly as instructed — no more, no less. Never skip this under time pressure.

### Known agent failure modes (documented, not hypothetical — actively prevent)

- Agents **default to JavaScript** → actively prevent.
- Agents **introduce classes by habit** → block.
- Agents **assume dynamic rendering of content only** → correct.

### Pre-send gate

Before any architectural or structural claim:

1. **Scope-invent check** — every layer or feature must be explicitly requested or documented. Inventing scope is forbidden.
2. **Rule-scope check** — locate the scope statement before applying any rule. Shape match ≠ scope match.

### Failure-recovery protocol

When a rule is violated:

1. Name the specific rule.
2. Diagnose the reasoning step that bypassed it.
3. State correction as an immediate behavior change.
4. Re-run the affected reasoning.

Apologizing and continuing is not acceptable.

### Citation requirement

Every architectural or technical claim cites an authoritative source: W3C, WHATWG, CSSWG, MDN, Baseline (web.dev), caniuse, vendor release notes. Citation files live in each skill's `references/` subfolder. Citations route disagreement to the standard, not to the project.

## 2. Stack

- **THE UNIVERSAL RULE — at all times, without exception.** All HTML, CSS, and JS — and all designing, coding, naming conventions, engineering, and planning — must be:
  - **browser-native (vanilla)** — no third-party dependencies;
  - **non-abstracted** and **non-obfuscated**;
  - **minimally nested**;
  - **copy/paste modular** — one function/utility per file, drop-in and usable anywhere, named by conventional nomenclature any web developer would already know;
  - **future-proof**;
  - **vendor-agnostic, platform-agnostic, project-agnostic, data-agnostic, and framework-agnostic.**
  
  This is not a preference or a default to fall back on — it is the standing condition of every artifact and every decision. There is no exception clause.
- **The user-agent (web browser) is the single source of truth. It is the platform. It is the framework.** Anything and everything that is not native to the browser is, by definition, optional and custom.
- **The system must function even with JavaScript disabled.**
- **HTML + CSS only** for everything except data transport (CRUD).
- **The three-way air-gap, absolute:** NEVER any HTML or CSS in JS. NEVER any CSS or JS in HTML. NEVER any JS or HTML in CSS.
- Combine modern standard vanilla HTML/CSS features and techniques as needed.
- **JavaScript** is permitted only below the `oninput` boundary: `app.js` (bootstrap), `oninput.js` (lifecycle), `api.js` (CRUD), `storage.js` (persistence), `tour.js` (placeholder).
- **No third-party dependencies.**
- **No build tools, no bundlers, no transpilers, no compilers.**
- **No cross-browser concerns.** Evergreen browsers only. Latest features used without regard for older browsers.
- Single-page application (`index.html` at root) deployed as PWA via `manifest.webmanifest`.
- Layout = **CSS Grid only.** Never Flexbox. Full-bleed Holy Grail via `<app-container>`.

## 3. HTML — structure only

- Semantic elements only. No `<div>`, `<span>`, `class`, `id`, `data-*`.
  - **Why (know why you are doing this):** it minimizes selector-dependency complexity, enforces semantics, ensures portability, and **gets out of the way of other systems who do use classes/IDs/`data-*`** — their selectors land unopposed.
- Interactive elements that are not intrinsically interactive use `<label>` wrapping an `<input type="checkbox">` or `<input type="radio">`. No JS-driven `<button>` or `eventListener`. **The `<input>` is the control — preserve its native semantics. It already provides role, state, and keyboard support for free; that is the accessibility, baked in.** Four non-negotiables follow, each with its citation:
  - **NEVER put `role="button"` on these labels.** The `button` role does not support semantic children, so browsers apply role `presentation` to **every descendant** — which **erases the input's `radio`/`checkbox` role and its checked state** from the accessibility tree. A screen-reader user can then no longer tell what is selected. `role="button"` also announces button behavior (Enter/Space activation) that only JS could supply — and JS is forbidden here. A nav radio is semantically a **radio** (one of a group), not a button; calling it a button loses "2 of 5, selected". → [MDN: button role — "All descendants are presentational"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#all_descendants_are_presentational)
  - **NEVER put `aria-hidden="true"` on the `<input>` or on its `<label>`.** ARIA forbids it on focusable elements **and on any ancestor of a focusable element** — the `<label>` is exactly that ancestor. → [MDN: aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
  - **NEVER `display:none` the input.** That removes it from the accessibility tree *and* from keyboard reach. Hide it **visually but keep it focusable** (clip / opacity / `appearance`) so `:checked` still drives every CSS rule while the control stays operable. Note: once an element is `display:none`, `aria-hidden` is redundant anyway — it is already out of the tree. → [MDN: aria-hidden — when not to add it](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden#description)
  - The `<label>` supplies the accessible name. `:checked` drives all CSS. **Zero JS, zero ARIA, full semantics.** Prefer native elements over ARIA roles — native controls are supported by every user agent and AT and provide keyboard and focus behavior by default. → [MDN: button role — Best practices](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role#best_practices)
- Forms inside `<fieldset>` with schema/rules from JSON.
- One `<script type="module">` before `</body>`, outside `<app-container>`.
- No HTML in JSON. Ever.
- Custom elements: only two categories permitted — the closed `app-*` set (`app-container`, `app-logo`, `app-user`, `app-legal`, `app-version`, `app-banner`), or data-table (`<ul><li>`) row elements generated from JSON keys via `toTagName()`, injected with paired `value`. Anything outside these is forbidden.
- Always use `<meta name="color-scheme" content="light dark">` to minimizing flash of unstyled content (FOUC).
- Full ruleset: [`.agents/skills/html/SKILL.md`](./.agents/skills/html/SKILL.md).

## 4. CSS — the UI runtime

- **CSS is the UI execution layer AND the styling.** Both, not one or the other. Modern vanilla HTML (structure) and CSS (everything else) **own the presentation layer, exclusively.** Every presentation-layer solution must be modern HTML + CSS only.
  - **Why (know why you are doing this):** CSS-first reduces the JavaScript attack surface, increases performance, and enforces determinism.
- CSS stays **copy/paste modular, unopinionated, and out of the way** via `@layer` and `@scope`.
- Fully replaces JavaScript for all UI behavior: state, visibility, themes, color-scheme, transitions, loading, navigation, forms, default and conditional layout, responsiveness, feature detection, except for the one thing HTML and CSS cannot do - data transport for CRUD operations (applied principle of Least Power).
- Visibility controlled by data presence via `:empty`, `:not(:empty)`, `:has()` or chained combinations thereof driven by declarative logic. No `"visible": true` flags in data.
- Light/dark via `:root { color-scheme: light dark }` and `light-dark()`. No duplicated `@media (prefers-color-scheme: dark)` blocks.
- All CSS belongs to a `@layer` that matches their filename that matches their feature and intent. One `@layer` per CSS file. No master `@layer` order statement — a layer's priority comes from where its name first appears, i.e. the `<link>` order in `index.html` (the load order is the cascade). In addition to better visual context, `@layer` minimizes cascade priority. Thus additive classes, IDs and or applied styles always take precedence.
- No `!important`. Ever.
- No size-based `@media` (`min-width` / `max-width`). Always use intrinsic content based syntax such as min or max `content` width and `@container` or media query range syntax. If values are required, use `ch` (character) value type 
- No padding or margin on any elements except for content level elements, such as `<p>`, `<h1>`, `<label>`.
- `oklch` for project color schemes (light dark), and color themes. No `hex`, `hsl`, `rgb`.
- Logical properties only (`margin-inline`, `padding-block`, etc.) to maintain automatic multi-national usability.
- Required modern features: `@starting-style` for entry fade-in, CSS anchor positioning for hover/popover content. (`@view-transition` is **not** used — it fires only on cross-document navigations, so it is inert in this SPA; add it only if the app ever navigates between documents.)
- Full ruleset: [`.agents/skills/css/SKILL.md`](./.agents/skills/css/SKILL.md).

## 5. JavaScript — data transport only

- **Modern vanilla JavaScript owns the API/data logic layer — and nothing else.** In the UI it does nothing but CRUD API calls and data transport. It never owns presentation.
- **`oninput` is the one and only event permitted in the presentation layer.** No other event, anywhere.
- **Why (know why you are doing this):** a minimal JavaScript surface reduces attack vectors.
- **Secrets never live in the browser.** Never expose, embed, or commit them; avoid unnecessary external calls. See [`security`](./.agents/skills/security/SKILL.md).
- Five files exist in `assets/js/`, period: `app.js`, `oninput.js`, `api.js`, `storage.js`, `tour.js`.
- `document.querySelector()` only. No `getElementById`, no `getElementsByClassName`.
- No `addEventListener`. Anywhere. The `oninput` lifecycle uses direct `.oninput` property assignment.
- No `on*=` event handler attributes in markup.
- Stateless and idempotent. No module-level mutable state. No globals.
- No `innerHTML`. No inline styles. No DOM manipulation for presentation.
- API base URL declared once; only endpoint suffix varies.
- **`.click()` and `onclick` are forbidden. Never. Anywhere.** `oninput` is the only event.
- Initial load enters the **same** `oninput` lifecycle by *selecting* a nav radio: read the persisted selection from storage (or the first nav radio if none — no nav radio is `checked` in the HTML by default), set `input.checked = true`, then dispatch an input event on it (`input.dispatchEvent(new Event('input', { bubbles: true }))`) so the input's **own** `oninput` fires. Setting `.checked` alone does not fire `oninput`, and `.click()`/`onclick` are forbidden — so this `dispatchEvent` is the **single sanctioned** use, only for programmatic selection on load/restore where no real user event exists. Every real user interaction fires `oninput` natively; never dispatch for those. `:checked` remains the single source of truth for both the CSS state machine and the data call.
- Shell content fetched once per runtime session.
- Console: `console.clear()` on startup and each lifecycle run. Success = minimal timestamped. Failure = verbose timestamped.
- Full ruleset: [`.agents/skills/javascript/SKILL.md`](./.agents/skills/javascript/SKILL.md).

## 6. JSON — data only

- Strings, numbers, booleans, null, arrays, objects. Nothing else.
- No HTML, no CSS, no JavaScript, no presentation hints, no layout instructions.
- Canonical page-level keys map positionally: `pageTitle` → `<h1>`, `intro` → `p:nth-of-type(1)`, `body` → `<section>`, `rows` → `<ul>`.
- Canonical shell keys: `appLogo`, `appUser`, `appLegal`, `appVersion`, `navItems[{label, suffix}]`.
- Full ruleset: [`.agents/skills/json/SKILL.md`](./.agents/skills/json/SKILL.md). C          nonical shapes: [`.agents/skills/json/references/shape.md`](./.agents/skills/json/references/shape.md).

## 7. Naming

- Names describe the **concern**, not the **implementation**.
- Files without trailing underscores are active. Files with trailing underscores are inactive.
- No symlinks for cross-file references. Text paths only.
- Skill names: lowercase letters, numbers, hyphens only. No underscores.
- Full ruleset: [`.agents/skills/naming/SKILL.md`](./.agents/skills/naming/SKILL.md).

## 8. External Service Failures — Non-Negotiable

When a configured external API or service fails (SSL errors, network failures, auth errors, rate limiting, 4xx/5xx, etc.):

- **NEVER** change the architecture to work around the failure.
- **NEVER** create local fallbacks, mock data, or substitute data sources.
- **NEVER** redirect `API_BASE_URL` or any configured endpoint from its declared remote origin to a local path.
- **STOP immediately.** Advise the user on how to resolve the external service issue directly:
  - SSL cert error → user logs into service provider account and renews/verifies the certificate.
  - Network/fetch failure → user checks service status, subscription, or provider dashboard.
  - 4xx/5xx → user inspects endpoint configuration or contacts the API provider.

Working around broken external services produces more code, obscures the real problem, violates Least Power, and permanently changes the architecture in ways the user did not request.

## 9. Project Structure

**Project-specific — defined in each repo's own `AGENTS.md`.** The DOM structure, regions,
and entry script differ per project. This file governs the laws; the repo declares its shape.

## 10. Files

**Project-specific — defined in each repo's own `AGENTS.md`.** File inventories differ per
project. Naming rules that govern them are universal and live in section 7 above.

## 11. Abstraction Rule

Default answer: **NO**. Only the project owner authorizes abstraction, in writing, per instance. "Shorter," "DRY," "consolidation," and "brevity" are insufficient justifications. Acceptable only when no intuitive declarative understanding is lost AND explicitly approved. The straightforward declarative nature of this project is what sets it apart — preserve it.

## 12. No Dead-Ends

End-users and developers both must always have a forward path.

- **End-users** — every error state, every empty state, every blocked path includes a way out.
- **Developers** — every concept in this documentation links to deeper reference material in `.agents/skills/*/references/*.md`.

A dead end is a UX or DX defect to be fixed.

## 13. Session Continuity

**Project-specific — each repo owns `.agents/SESSION-HANDOFF.md`.** At the start of every
session read that repo's handoff before making implementation decisions; re-assert its
Constraint Lock before coding. If it conflicts with this file, **STOP and ask.**

## 14. Routing — Which Skill Owns This Task

**Skills are universal and live in this repo** (`skills/*/SKILL.md`). Each repo's own
`AGENTS.md` may add project-specific routing on top. If a task touches more than one
concern, do each part inside its own skill.

## 15. Architecture Tests

Before any change ships, the change must pass:

1. Does this HTML change require any CSS or JS change? If yes, the air-gap is broken — fix the design.
2. Does this CSS rule require any JS, any specific data, or any class/id? If yes, fix the design.
3. Does this JS function touch the DOM for presentation? If yes, fix the design.
4. Does this JSON contain HTML, styling, or presentation hints? If yes, fix the design.

The architecture exists to make these answers always "no."
