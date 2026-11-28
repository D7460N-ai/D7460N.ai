---
name: code-principles
description: Apply these engineering requirements whenever creating, changing, reviewing, or explaining code in this Pen.
---

# Engineering requirements

Apply these requirements to all code in this Pen. Treat them as mandatory project requirements whenever they are compatible with higher-priority instructions and the user's latest request.

## Fixed execution order

For every code task, follow these steps in order; do not skip or reorder them:

1. Identify the requested outcome and the narrowest file and behavior scope that fully satisfies it.
2. Read the relevant current source and dependencies before planning an edit.
3. Choose the smallest supported file operation and implementation that completes the request.
4. Change only the requested scope and the minimum supporting code.
5. Preserve unrelated source, behavior, naming, ordering, and formatting exactly.
6. Report only what was changed or any material limitation; never claim checks or results that were not observed.

If a step conflicts with a higher-priority instruction, platform capability, or the user's explicit request, follow that higher-priority requirement and briefly note the limitation when relevant. Consistency means using the same process and patterns for equivalent tasks; it does not guarantee identical output when the request, source, or constraints differ.

## Prompt and implementation rules

- Treat the user's request as the scope. Do only what it asks, plus the minimum required for it to work; do not add unsolicited changes or explanations.
- Do not invent facts or requirements. Follow the editor's ambiguity rules: use the narrowest reasonable interpretation when details are unclear, and state material assumptions.
- Use modern, browser-native HTML, CSS, and JavaScript only. Do not suggest or add third-party or external dependencies.
- Assume HTML is pre-delivered through the existing JAMstack architecture; fit changes to that architecture.
- For new solutions, start with the simplest declarative HTML approach. If HTML alone cannot meet the requirement, use CSS. Do not propose JavaScript solutions; if HTML and CSS cannot meet the requested outcome, explain the limitation.

## Canonical new-file patterns

Use these patterns only when creating a new file of the matching type. Keep the shown ordering, replace example names with descriptive project names, and include only imports or declarations the implementation actually needs. Do not retrofit these patterns into existing files unless requested.

### JavaScript module

```js
// MARK: MODULE-NAME
// One-sentence responsibility.

import { namedThing } from "./named-thing.js";

export function functionName(input) {
  return result;
}
```

Order: marker and responsibility, imports, then exported implementation. Omit the import block when no imports are needed.

### CSS module

```css
/* MARK: MODULE-NAME
*/
@layer layer-name {
  selector {
    /* declarations */
  }
}
```

Order: marker, layer, then related selectors and declarations. Follow the Pen's existing layer and selector conventions when extending an existing stylesheet.

## Separation of concerns

- Give each file, module, component, and function one clear responsibility.
- Keep data, presentation, orchestration, and side effects separate unless the existing architecture deliberately combines them.
- Put behavior with the code that owns it; avoid unrelated cross-module knowledge and hidden coupling.
- Keep interfaces explicit and narrow. Communicate through the smallest necessary inputs, outputs, and events.

## Least power

- Use the least powerful mechanism that fully solves the stated problem.
- Prefer simple, local, declarative solutions over broad abstractions, global state, dynamic code generation, or implicit behavior.
- Grant code only the data, DOM access, permissions, and side effects it needs.
- Avoid adding dependencies, configuration, or new extension points unless they are necessary for the request.

## Change discipline

- Make the smallest complete change that satisfies the request.
- Preserve existing behavior, contracts, architecture, naming, and unrelated content.
- Do not refactor, reformat, rename, or improve unrelated code opportunistically.
- Derive sorted, filtered, grouped, or transformed output in code; do not manually reorder or duplicate source data.

## Explicit behavior and data boundaries

- Make control flow, state changes, and side effects visible and deliberate.
- Validate and constrain values at boundaries where untrusted input enters the application.
- Do not read, collect, persist, or transmit user data unless the feature explicitly requires it and the user deliberately initiates the action.
- Keep failures contained and understandable; do not silently broaden fallback behavior or conceal errors.

## Maintainability

- Prefer descriptive names and straightforward code over cleverness.
- Avoid duplication when a small, well-scoped shared abstraction removes meaningful repeated logic; do not abstract speculative future needs.
- Keep comments focused on intent, constraints, or non-obvious decisions. Do not remove or rewrite unrelated comments.
- Follow the file's existing conventions unless the request requires a change.

## Completion

- Ensure new files are connected to the existing entry points when needed.
- Preserve accessibility and responsive behavior when changing interface code.
- Do not claim that code was built, tested, or visually verified unless the available result confirms it.
