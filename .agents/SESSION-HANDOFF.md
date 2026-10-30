# Session Handoff — `Autocss-com/ai`

_Last updated: 2026-09-04 — session: accuracy-first guidelines + canon optimization._

## Repo role (never drift from this)
`Autocss-com/ai` is THE single source of truth for **all** AI agents and **all** AutoCSS
projects. **Vendor-agnostic AND project-agnostic — zero exceptions.** Canon =
`AGENTS.md` (Response Integrity Charter `C0–C8` + AutoCSS Architecture `§1–15`) plus
`.agents/skills/**`. Nothing project- or vendor-specific may live in canon. Per-repo
`CLAUDE.md` / `.cursorrules` / Copilot files are thin vendor stubs that point here.

## This session — completed, all merged to `main`
- Charter self-references corrected `CLAUDE.md` → `AGENTS.md` (`dbf2986`); header
  "(no tool named)" → "(no tool-specific rules)" (`564fe16`).
- Quarantined 8 non-canonical build/analysis docs (DHCP/starter/autocss/framework demos)
  to `.agents/_archived/` with per-file banners + a folder `README` (`af5d435`).
- **#1** `SESSION-HANDOFF.md`: stripped 762 lines of carried-over **`autocss`** project
  data (a duplicate of files that live authoritatively in `autocss`; structured data as
  prose) — 257 KB → ~10 KB.
- **#3** 54 skill footers collapsed to a uniform `**Canonical rules:** <URL>` back-link
  (removed restated summaries that can drift). (both `93095dc`)
- **C8** gained the **reinforcement ≠ duplication** exception (`7219e2f`): deliberate
  repetition of a rule's *rationale* (the "why") at contextual intervals is
  accuracy-reinforcement, kept on purpose; where DRY conflicts with sustained consistent
  accuracy, **accuracy wins**.
- **#2** (Charter↔§1 behavioral dedup) deliberately **NOT** done — the repetition is
  load-bearing reinforcement, now protected by the C8 exception. Do not re-attempt it.

## Constraint Lock — re-assert before ANY change
- **Accuracy > time > brevity > cost.** Never guess/assume. Stop and ask on ambiguity.
  Better to not do a thing than do it wrong. Do exactly what is asked — no more, no less.
- This repo is **project- AND vendor-agnostic.** No project name (DHCP, starter, autocss,
  vue/angular/react), no vendor rule (Claude/Cursor/Copilot) in canon.
- **Memory is project-specific.** This handoff, `PROGRESS.json`, and shards belong to
  each repo. Never copy another repo's memory into `ai` (that was the #1 defect fixed
  this session).
- **Architecture air-gap is absolute:** HTML = structure, CSS = UI runtime, JS = data
  transport only; the route/shape lives in the DATA, never in markup or CSS.
- **Repetition of a rule's "why" is intentional** (C8 exception). Never "DRY" it away.
- Commit as `D7460N <80736+dragontheory@users.noreply.github.com>`. Dev branch
  `claude/accuracy-first-guidelines-r85dyc`. `ai` `main` is unprotected (FF merge ok);
  `autocss` `main` is branch-protected (PR required).

## Provenance note
This file previously held (a) `D7460N/starter`'s 2026-03-03 runtime handoff and (b) the
2026-07-19 docs-rename/`.agents`-consolidation handoff and carried-over `autocss` build
state. All are superseded and preserved in git history and in their own repos
(`D7460N/starter`, `Autocss-com/autocss`) — not reproduced here, by the project-agnostic
rule above.

---

# NEXT SESSION PROMPT — `scrapify` → AutoCSS JSON-contract → rebuilt site

## Read first (no implementation decision before this)
1. `Autocss-com/ai/AGENTS.md` — canon (Charter `C0–C8` + Architecture `§1–15`).
2. This `SESSION-HANDOFF.md` (above) + the `session` skill; re-assert the Constraint Lock.
3. Task-owning skills: `json`, `data-flow`, `javascript`, `architecture`.
   `.agents/_archived/` is NON-canonical history — never treat it as rules.

## The vision this serves
Feed an AI a URL → it scrapes the site → emits a **static JSON contract in the AutoCSS
shape** → the zero-dependency AutoCSS presentation layer renders that JSON, and the
scraped site reappears "rebuilt" as AutoCSS (semantic HTML + CSS-driven UI, no framework,
no third-party deps). `scrapify` is the data/business layer; **AutoCSS renders.** This is
just a DRY, deterministic, reused workflow applied per-site with different values — the
same architecture, not a new one.

## Repo to bring in
`github.com/D7460N/scrapify` is NOT yet in session scope. `add_repo` (D7460N/scrapify),
clone, register, then READ it end-to-end before proposing anything.

## Tasks (in order — propose, do not mass-edit; nothing ships without approval)
1. Map `scrapify` AS-IS vs. the vision: what it scrapes, what it emits, the gaps.
2. Define the **AutoCSS JSON contract** precisely, grounded in the `json` + `data-flow`
   skills — the exact static JSON shape the AutoCSS UI consumes (shell keys, page keys
   `pageTitle/intro/body/rows`, `navItems`, schema-driven form fields) so ANY scraped
   site normalizes into it. The contract IS the air-gap boundary: scraper writes it,
   AutoCSS reads it, neither knows the other.
3. Frame `scrapify` as a **custom agent**: URL in → scrape → normalize to the contract →
   validate against the contract → hand to AutoCSS. Keep it project/vendor-agnostic;
   nothing scrapify-specific leaks into `Autocss-com/ai`.
4. **Determinism substrate (proposal only):** evaluate a golden-snippet catalog — one
   verbatim, ID'd, copy-paste code block per rule so agents PLACE code, never synthesize
   it. This is the mechanism that makes both the AutoCSS build and scrapify's emitted
   output reproducible. Propose a catalog format + one worked example; do not touch the
   skills yet.

## Business intent (guides trade-offs)
Good/Fast/Cheap is normally pick-2. The strategy breaks it by PRE-PAYING "Fast" once, up
front: the canon + reusable snippets + the AutoCSS reference are a built-once asset
amortized across every customer. Customer gets **Good + Cheap**; speed comes from REUSE
of proven pre-written code — never from shortcuts (shortcuts violate the Charter).

## Definition of done
A written, reviewed spec of (a) the AutoCSS JSON contract and (b) scrapify's agent
pipeline against it, plus a go/no-go on the golden-snippet catalog. No code merged without
approval. End with the session-end ritual: update `PROGRESS.json` (if present) → append a
shard → update this `SESSION-HANDOFF.md` → write the next prompt.
