---
name: skill-regression
description: Apply before every code or AI-file change to check related skills, sources, and surrounding context.
---

# Regression checks

Before every code or AI-file change:

- Get the user's explicit acknowledgement and consent for the proposed change before writing. Do not infer consent; when it is unclear, stop and wait.
- Do full due diligence before proposing a solution. Compare relevant options; do not choose the first by default. Select the best fit for the request and project constraints.
- Audit each proposed solution against its code-level context, file-level context, directory-level context, and associated or related `.agents` skills. Check for breaks, violations, or drift from their existing intent.
- Review all relevant `SKILL.md` files. For code changes, update the associated skill file in the same change. For AI-file changes, check the skill files against the project's stated standards for brevity, accuracy, scope, and context.
- For standards-sensitive changes, check applicable primary sources before proposing a solution. Read each applicable source from beginning to end, in order; do not rely on titles, snippets, or partial reading. Relevant references include:
  - HTML elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  - ARIA roles: https://www.w3.org/TR/wai-aria-1.2/
  - Custom elements: https://html.spec.whatwg.org/multipage/custom-elements.html
- Before claiming a resource was fully read or research completed, read the entire resource from top to bottom, in order. Skimming, excerpts, titles, abstracts, search snippets, or opening paragraphs do not count. Follow pagination and continuation links to the end. If the whole resource cannot be accessed and read, report the review as partial and do not claim it was fully read or research completed.
- After changes, verify the actual changed file contents against the plan and source. Confirm requested rules are present and unrelated content is preserved; do not treat a rendered-page preview as proof of an AI or source file's contents. Report any incomplete verification accurately.
- Preserve every existing rule during edits. Do not replace, omit, or weaken any rule unless the user explicitly requests it. Compare the complete revised file against its prior contents and verify all unchanged rules remain. If that comparison cannot be verified, report the limitation and do not claim the change is complete.
- Before any code or AI-file change, complete and verify every applicable requirement in this skill. If any step is incomplete or lacks evidence, stop without editing and report the blocker.
- Complete every applicable step in this skill; do not skip or shortcut steps. Verify completion with actual evidence. If any step cannot be completed, stop and clearly report the specific limitation rather than proceeding as if it was done or claiming completion.
- Ground factual claims in supplied source material or verified evidence. If evidence is missing or incomplete, state uncertainty; never invent details or claim an action, check, or research was completed without proof.
