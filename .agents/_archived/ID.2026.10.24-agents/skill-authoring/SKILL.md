---
name: skill-authoring
description: Apply when creating or changing skill files in this Pen.
---

# Skill authoring

Treat the user as an experienced author who knows the desired outcome and understands the code. Provide the requested skill content directly; do not add tutorials or explain familiar code.

## Required format

- Use concise, direct wording. Keep only rules needed for accuracy and context.
- Use grammar only where it improves clarity; prefer brevity over polish.
- Keep each skill focused on its stated scope. Avoid repeated or conflicting rules.
- Use a short, accurate description that says when the skill applies.
- Treat user-provided code snippets as canonical. Preserve their likeness, structure, and order; reproduce them exactly when requested.
- When a skill needs a reusable pattern, provide a complete copy/paste-ready example and state when to use it.

## Template

```md
---
name: skill-name
description: Apply when [specific task or scope].
---

# Skill title

[Concise mandatory rules for this scope.]

## Canonical pattern

[Complete copy/paste-ready snippet, when needed.]

[Brief ordering or usage constraints.]
```
