# State Machines (HTML perspective)

The HTML side of the state-machine pattern. The CSS side is in `../../css/references/state-machines.md`.

## Form-action button substitute

```html
<label>
  Save
  <input type="checkbox" aria-hidden="true" />
</label>
```

- `<label>` supplies the accessible name (its text). Never `role="button"` on it (AGENTS.md §3): the button role makes every descendant presentational, erasing the input role and checked state.
- `<input type="checkbox">` holds the state.
- `aria-hidden="true"` removes the input from the accessibility tree (the label already conveys the role and state).

## Mutually exclusive selection (navigation, tabs, radio groups)

```html
<nav>
  <label>
    Home
    <input type="radio" name="nav" aria-hidden="true" />
  </label>
  <label>
    About
    <input type="radio" name="nav" aria-hidden="true" />
  </label>
  <label>
    Contact
    <input type="radio" name="nav" aria-hidden="true" />
  </label>
</nav>
```

- `name="nav"` groups the radios. The browser ensures only one is checked at a time.
- The currently-checked one carries the active state. CSS reads it via `:has(input:checked)`.

## Toggle (single binary state)

```html
<label>
  Theme
  <input type="checkbox" aria-hidden="true" />
</label>
```

A single checkbox is a toggle. CSS reads via `:has(input:checked)`.

## Multi-state selection

```html
<label role="radiogroup" aria-label="View mode">
  <input type="radio" name="view" value="grid" aria-hidden="true" checked />
  <input type="radio" name="view" value="list" aria-hidden="true" />
  <input type="radio" name="view" value="table" aria-hidden="true" />
  View
</label>
```

CSS reads each via `:has(input[value="grid"]:checked)` etc.

## Nav menu collapse pattern

The last label in the nav holds the menu-toggle checkbox. When narrow containers, all other items collapse behind it.

```html
<nav>
  <label>Home <input type="radio" name="nav" aria-hidden="true" /></label>
  <label>About <input type="radio" name="nav" aria-hidden="true" /></label>
  <label>Contact <input type="radio" name="nav" aria-hidden="true" /></label>
  <label aria-label="Menu">
    <input type="checkbox" aria-hidden="true" />
  </label>
</nav>
```

The CSS in the nav handles the responsive collapse — see `../../css/references/state-machines.md`.

## What HTML state machines never do

- Never use `<button>` with `onclick` in markup — `on*=` is forbidden
- Never use `<button>` with JS-attached handler when the label/input pattern fits — UI state belongs in CSS
- Never omit `aria-label` when the label content is non-textual or stylized
- Never omit `aria-hidden="true"` on the input — the input is a state holder, not an announceable element

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `:has()` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has

**AutoCSS Architecture:** serves CSS-read interactive state via hidden radio/checkbox inputs inside labels, with no JS event handlers. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## Reference

- HTML `<label>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
- HTML `<input type="checkbox">`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
- HTML `<input type="radio">`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
- ARIA `role="button"`: https://www.w3.org/TR/wai-aria-1.2/#button
- ARIA `aria-hidden`: https://www.w3.org/TR/wai-aria-1.2/#aria-hidden
