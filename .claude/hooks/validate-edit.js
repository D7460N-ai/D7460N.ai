#!/usr/bin/env node
// MARK: VALIDATE-EDIT
// Claude Code PreToolUse hook for Write | Edit | Bash.
// Blocks an edit that ADDS anything outside the AutoCSS whitelist.
// Violations already in a file never block an edit; only new ones do.
// Exit 0 = allowed. Exit 2 = blocked; stderr says why and is shown to Claude.
// Node built-ins only. Everything not listed below is prohibited.

const fs = require("node:fs");
const path = require("node:path");

// MARK: WHITELIST (rule IDs refer to the AutoCSS whitelist)
const ELEMENTS = words(`
  html head body title meta link script noscript template slot
  header nav main aside footer article section hgroup address search
  h1 h2 h3 h4 h5 h6 p ul ol li dl dt dd
  table thead tbody tfoot tr th td caption colgroup col
  form fieldset legend label input select option optgroup textarea output
  figure figcaption picture source img video audio track
  details summary dialog menu a
  time mark abbr cite code pre blockquote q strong em small sub sup br hr wbr
  app-container app-banner app-logo app-user app-legal app-version`); // H2 H3
const ARIA = words("aria-label aria-live aria-disabled aria-hidden"); // H4
const AT_RULES = words("layer container media supports property function starting-style font-face"); // C4 C8 C13 C7 C2 S2
const PSEUDO_CLASSES = words("checked has not empty focus-visible user-valid user-invalid disabled popover-open root"); // C5 C9
const EVENTS = words("input"); // J4
const SW_EVENTS = words("install activate fetch"); // P6
const ORIGINS = ["https://autocss-com.github.io/"]; // R4: the only remote origin
const EXTENSIONS = words(".html .css .js .json");
const SKIP = /\/(node_modules|\.git|\.claude|test|_archived)\/|_\.[a-z]+$|(^|\/)package(-lock)?\.json$/;

// MARK: HOOK
function main() {
  const { tool_name: tool, tool_input: args = {} } = JSON.parse(fs.readFileSync(0, "utf8"));
  const problems = tool === "Bash" ? shellWrites(args.command ?? "") : editProblems(tool, args);

  if (!problems.length) return 0;

  const counts = new Map();
  problems.forEach((p) => counts.set(p, (counts.get(p) ?? 0) + 1));
  const lines = [...counts].map(([p, n]) => `- ${p}${n > 1 ? ` (x${n})` : ""}`);

  process.stderr.write(
    [`BLOCKED by AutoCSS whitelist: ${args.file_path ?? "shell command"}`, ...lines,
     "Everything not on the list is prohibited. Ask the user for an exception."].join("\n") + "\n"
  );
  return 2;
}

function editProblems(tool, args) {
  const file = String(args.file_path ?? "").replaceAll("\\", "/");
  if (!inScope(file)) return [];

  const before = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const after =
    tool === "Write" ? String(args.content ?? "") :
    tool === "Edit" ? applyEdit(before, args) :
    null;

  return after === null ? [] : added(check(file, before), check(file, after));
}

function applyEdit(text, { old_string = "", new_string = "", replace_all = false }) {
  if (replace_all) return text.split(old_string).join(new_string);
  const i = text.indexOf(old_string);
  return i < 0 ? text : text.slice(0, i) + new_string + text.slice(i + old_string.length);
}

// Violations in `after` that `before` did not already have.
function added(before, after) {
  const left = new Map();
  before.forEach((p) => left.set(p, (left.get(p) ?? 0) + 1));
  return after.filter((p) => (left.get(p) ?? 0) > 0 ? (left.set(p, left.get(p) - 1), false) : true);
}

function check(file, text) {
  if (!text) return [];
  const ext = path.extname(file);
  if (ext === ".html") return htmlProblems(text);
  if (ext === ".css") return cssProblems(text, file);
  if (ext === ".js") return jsProblems(text, file);
  if (ext === ".json") return jsonProblems(text);
  return [];
}

// MARK: HTML
function htmlProblems(text) {
  const out = [];
  const html = text.replace(/<!--[\s\S]*?-->/g, "");

  for (const [, close, tag, attrs] of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g)) {
    const name = tag.toLowerCase();
    if (!ELEMENTS.has(name)) out.push(`H2/H3 element not on list: <${name}>`);
    if (close) continue;

    for (const attr of attrNames(attrs)) {
      if (notAllowedAttr(attr)) out.push(`H4 attribute not on list: ${attr} (on <${name}>)`);
    }
    if (name !== "a") {
      for (const [, url] of attrs.matchAll(/\b(?:src|href|srcset)\s*=\s*["']?([^"'\s>]+)/gi)) {
        if (external(url)) out.push(`R4 third-party resource: ${url}`);
      }
    }
  }

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  if (scripts.length > 1) out.push("H7 more than one <script>");
  for (const [, attrs, body] of scripts) {
    if (!/\bsrc\s*=/i.test(attrs) || body.trim()) out.push("H7 inline script (use <script type=\"module\" src>)");
    else if (!/\btype\s*=\s*["']?module\b/i.test(attrs)) out.push("H7 script must be type=\"module\"");
  }

  if (/<html[\s>]/i.test(html)) {
    if (!/^<!doctype html>/i.test(text)) out.push("H1 line 1 must be <!doctype html>");
    const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([m]) => m);
    const scheme = metas.some((m) => /name\s*=\s*["']color-scheme["']/i.test(m) && /content\s*=\s*["']dark light["']/i.test(m));
    if (!scheme) out.push('H1 missing <meta name="color-scheme" content="dark light">');
  }
  return out;
}

function attrNames(attrs) {
  return attrs
    .replace(/=\s*("[^"]*"|'[^']*'|[^\s>]+)/g, " ")
    .replace(/\/\s*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((a) => a.toLowerCase());
}

function notAllowedAttr(attr) {
  return /^(id|class|style|role)$|^data-|^on/.test(attr) || (attr.startsWith("aria-") && !ARIA.has(attr));
}

// MARK: CSS
function cssProblems(text, file) {
  const out = [];
  for (const [, url] of text.matchAll(/url\(\s*["']?((?:https?:)?\/\/[^"')\s]+)/gi)) {
    if (external(url)) out.push(`R4 third-party resource: ${url}`);
  }

  const css = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/"[^"]*"|'[^']*'/g, '""');
  const decls = css.replace(/[^;{}]*\{/g, "{"); // declarations only, selectors removed

  if (/!\s*important/i.test(css)) out.push("C !important not on list");

  for (const [, rule] of css.matchAll(/@([a-z-]+)/gi)) {
    if (!AT_RULES.has(rule.toLowerCase())) out.push(`C at-rule not on list: @${rule}`);
  }

  const stem = path.basename(file, ".css");
  const layers = [...css.matchAll(/@layer\b([^{;]*)([{;])/g)];
  if (layers.length !== 1 || layers[0][2] !== "{" || layers[0][1].trim() !== stem) {
    out.push(`C4 file must be exactly one @layer ${stem} { … }`);
  }

  for (const [, prelude] of css.matchAll(/(?:^|[;{}])\s*([^;{}@]+?)\s*\{/g)) {
    selectorProblems(prelude.trim(), out);
  }

  for (const [, query] of css.matchAll(/@media([^{]*)\{/g)) {
    if (/\b(min|max)-(width|height)\b|\d(px|rem|em|vw|vh|%)/.test(query)) out.push(`C8 media query not on list: @media${query.trimEnd()}`);
  }

  const rules = [
    [/\bdisplay\s*:\s*(?:inline-)?flex\b|(?:^|[;{\s])flex(?:-[a-z]+)?\s*:/g, "C6 Flexbox (Grid only)"],
    [/(?:^|[;{\s])grid-template(?:-[a-z]+)?\s*:/g, "C6 explicit grid-template (implicit grid only)"],
    [/(?:^|[;{\s])grid-(?:row|column)(?:-start|-end)?\s*:\s*-?\d/g, "C6 numeric grid placement"],
    [/(?:^|[;{\s])(?:(?:margin|padding|border|inset)-(?:left|right|top|bottom)[\w-]*|left|right|top|bottom|(?:min-|max-)?(?:width|height))\s*:/g, "C10 physical property (logical only)"],
    [/#[0-9a-f]{3,8}\b/gi, "C9 hex color"],
    [/\b(?:rgba?|hsla?|hwb|lab|lch|oklab|color-mix|color)\(/gi, "C9 color function not on list"],
    [/\b\d*\.?\d+(?:px|pt|pc|cm|mm|in|Q)\b/g, "C7 unit not on list"],
    [/(?:^|[;{\s])transition(?:-property)?\s*:\s*all\b/g, "C11 transition must name properties"],
  ];
  for (const [re, label] of rules) {
    for (const [m] of decls.matchAll(re)) out.push(`${label}: ${m.trim()}`);
  }
  return out;
}

function selectorProblems(sel, out) {
  if (/(^|[\s>+~,(])\.-?[a-z_]/i.test(sel)) out.push(`C5 class selector: ${sel}`);
  if (/#[a-z_-]/i.test(sel)) out.push(`C5 id selector: ${sel}`);
  if (/(^|[\s>+~,(])\*/.test(sel)) out.push(`C5 universal selector * (P8 pending): ${sel}`);
  for (const [, attr] of sel.matchAll(/\[\s*([\w-]+)/g)) {
    if (notAllowedAttr(attr.toLowerCase())) out.push(`C5 attribute selector not on list: [${attr}]`);
  }
  for (const [, pseudo] of sel.matchAll(/(?<!:):([a-z-]+)/gi)) {
    if (!PSEUDO_CLASSES.has(pseudo.toLowerCase())) out.push(`C5 pseudo-class not on list: :${pseudo}`);
  }
}

// MARK: JS
function jsProblems(text, file) {
  const out = [];
  const js = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const events = path.basename(file) === "sw.js" ? new Set([...EVENTS, ...SW_EVENTS]) : EVENTS;

  const rules = [
    [/\baddEventListener\b/g, "J4 addEventListener not on list"],
    [/\.click\s*\(|\bonclick\b/g, "J4 click not on list"],
    // Allowed (not listed here): querySelectorAll (J6); appendChild, removeChild,
    // cloneNode, setAttribute, .prepend() (J7: content-wrapping HTML + data writes).
    [/\b(?:innerHTML|outerHTML|insertAdjacent\w+|classList|className|dataset|getElementById|getElementsBy\w+|createElement|replaceChild|replaceWith|removeAttribute|toggleAttribute|showPopover|hidePopover|togglePopover|showModal|textContent|innerText|XMLHttpRequest|setTimeout|setInterval|requestAnimationFrame|eval)\b/g, "J3 API not on list"],
    [/\.(?:append|remove|before|after)\s*\(|\.style\b|\bdocument\.write\b|\bnew\s+Function\b|\bimport\s*\(/g, "J3 API not on list"],
    [/^(?:let|var)\s+\w+/gm, "J4 module-level mutable state"],
  ];
  for (const [re, label] of rules) {
    for (const [m] of js.matchAll(re)) out.push(`${label}: ${m.trim()}`);
  }

  for (const [, name] of js.matchAll(/\.on([a-z]+)\s*=(?!=)/g)) {
    if (!events.has(name)) out.push(`J4 event not on list: on${name}`);
  }

  const dispatches = (js.match(/\bdispatchEvent\s*\(/g) ?? []).length;
  const inputDispatches = (js.match(/\bdispatchEvent\s*\(\s*new\s+Event\s*\(\s*["']input["']/g) ?? []).length;
  if (dispatches > inputDispatches) out.push('J3 dispatchEvent only as new Event("input")');

  for (const [, a, b] of js.matchAll(/\bfrom\s*["']([^"']+)["']|\bimport\s*["']([^"']+)["']/g)) {
    const spec = a ?? b;
    if (!/^(\.{1,2})?\//.test(spec) && !ORIGINS.some((o) => spec.startsWith(o))) out.push(`R4 third-party import: ${spec}`);
  }
  return out;
}

// MARK: JSON
function jsonProblems(text) {
  let data;
  try { data = JSON.parse(text); } catch { return ["D1 not valid JSON"]; }

  const out = [];
  (function walk(value) {
    if (typeof value === "string") {
      if (/<\/?[a-z][\w-]*(\s[^>]*)?>/i.test(value)) out.push(`D1 HTML in data: ${value.slice(0, 40)}`);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  })(data);
  return out;
}

// MARK: SHELL
// Best effort: blocks shell writes to project files so every edit goes through Write/Edit.
function shellWrites(command) {
  const targets = new Set();
  for (const [, t] of command.matchAll(/(?:^|[^<>&\d])>>?\s*([^\s;|&<>]+)/g)) targets.add(t);
  for (const [, t] of command.matchAll(/\btee\s+(?:-a\s+)?([^\s;|&]+)/g)) targets.add(t);
  if (/\b(?:sed|perl)\s+[^;|&]*\s-[a-z]*i|\b(?:cp|mv|install|rsync|truncate|patch)\s/.test(command)) {
    for (const [t] of command.matchAll(/[^\s;|&'"<>]+\.(?:html|css|js|json)\b/g)) targets.add(t);
  }
  const hits = [...targets].map((t) => t.replace(/^['"]|['"]$/g, "")).filter(inScope);
  return hits.length ? [`shell write to project file(s): ${hits.join(", ")} — use Write/Edit so the edit is validated`] : [];
}

// MARK: HELPERS
function words(list) {
  return new Set(list.trim().split(/\s+/));
}

function inScope(file) {
  return EXTENSIONS.has(path.extname(file)) && !SKIP.test(file);
}

function external(url) {
  return /^(https?:)?\/\//i.test(url) && !ORIGINS.some((o) => url.startsWith(o));
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`BLOCKED: validator error (${error.message}). Fix or remove the hook.\n`);
  process.exitCode = 2;
}
