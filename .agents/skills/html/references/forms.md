# Forms

`<fieldset>` wraps fields. `<legend>` titles the fieldset. `<label>` wraps each input. Schema and rules come from JSON.

## The canonical form pattern

```html
<form>
  <fieldset>
    <legend>Contact</legend>

    <label>
      Name
      <input type="text" name="name" required />
    </label>

    <label>
      Email
      <input type="email" name="email" required />
    </label>

    <label>
      Message
      <textarea name="message" required></textarea>
    </label>

    <label>
      Send
      <input type="checkbox" />
    </label>
  </fieldset>
</form>
```

- `<form>` carries the form. It does not need an `action` if submission is handled by the `oninput` lifecycle (CRUD via `fetch-json.js` and its sibling write functions).
- `<fieldset>` groups related fields. Always use one.
- `<legend>` titles the group. The accessibility tree announces it as the group name.
- `<label>` wraps each input. The implicit association (label-as-parent) provides the accessible name without a `for` attribute.
- The submit action uses the state-machine pattern, not `<button type="submit">`.

## Multi-fieldset forms

Forms with logical sub-groups use multiple `<fieldset>`s:

```html
<form>
  <fieldset>
    <legend>Contact</legend>
    <label>Name <input type="text" name="name" required /></label>
    <label>Email <input type="email" name="email" required /></label>
  </fieldset>

  <fieldset>
    <legend>Message</legend>
    <label>Subject <input type="text" name="subject" /></label>
    <label>Body <textarea name="body" required></textarea></label>
  </fieldset>

  <fieldset>
    <legend>Actions</legend>
    <label>
      Send
      <input type="checkbox" />
    </label>
    <label>
      Cancel
      <input type="checkbox" />
    </label>
  </fieldset>
</form>
```

## Validation

Use native validation attributes:

- `required`
- `type="email"`, `type="url"`, `type="number"`, `type="date"`, `type="time"`, etc.
- `pattern="..."` for regex constraints
- `minlength`, `maxlength`, `min`, `max`, `step`

CSS reads validity via `:user-invalid` / `:user-valid`. See `../../css/references/inputs.md`.

## Contract-driven forms (schema optional)

By default an edit form is built from the record it edits — for a data table, the **selected row's own cells**. Each cell's key becomes a field `<label>`, and the input type is **inferred from the value** (id/UUID and ISO date-time → read-only; everything else editable). No separate schema is required — the contract is the source. `oninput.js`/the table module renders the fieldset by iterating the record's cells, creating each `<label>` with its `<input>`. The HTML stays semantic; the dynamic part is the contents of the fieldset. See the `data-flow` skill.

A schema is optional — reach for one only where external validation warrants declaring fields explicitly:

```json
{
  "fields": [
    { "name": "name", "type": "text", "required": true, "label": "Name" },
    { "name": "email", "type": "email", "required": true, "label": "Email" },
    { "name": "message", "type": "textarea", "required": true, "label": "Message" }
  ]
}
```

## What forms never contain

- `<button onclick="...">` — `on*=` is forbidden
- `<button>` for non-intrinsic actions — use the label/checkbox state machine
- Inline `style` attributes
- `class` or `id` (except where required by external integration, in which case surface to user first)
- `<br>` for layout — use CSS Grid

## Baseline & support

_Checked against MDN as of 2026-07-16._

- `:user-invalid` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid
- `:user-valid` — **Baseline Widely available** — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-valid

**AutoCSS Architecture:** serves native, JS-free form validation over semantic fieldset/label form structure. Canonical rules: https://github.com/D7460N-ai/D7460N.ai/blob/main/AGENTS.md

## Reference

- HTML `<form>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
- HTML `<fieldset>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
- HTML `<legend>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
- HTML `<label>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
- MDN form validation: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
- WCAG 3.3 Input Assistance: https://www.w3.org/WAI/WCAG22/Understanding/input-assistance.html
