// Claude Code hook entry: node enforce.js <Event>, hook JSON on stdin.
// Mechanical rules only. Data lives in rules.json. Rule text is read from
// AGENTS.md at runtime, never restated here. Zero dependencies.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const RULES = JSON.parse(fs.readFileSync(path.join(__dirname, "rules.json"), "utf8"));
const ROOT = path.join(__dirname, "..", "..");
const AGENTS = path.join(ROOT, "AGENTS.md");
const slash = (p = "") => String(p).replace(/\\/g, "/");
const read = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return null; } };
const sh = (cmd, cwd) => { try { return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 1 << 26 }); } catch { return ""; } };
const out = (o) => console.log(JSON.stringify(o));
const inactive = (f) => /_+\.\w+$/.test(f);

function kindOf(file) {
  const f = slash(file);
  if (inactive(f)) return null;
  return Object.keys(RULES.scope).find((k) => new RegExp(RULES.scope[k], "i").test(f)) ?? null;
}

const noCssNoise = (t) => t.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/url\([^)]*\)/gi, "url()").replace(/"[^"\n]*"|'[^'\n]*'/g, '""');
const noHtmlNoise = (t) => t.replace(/<!--[\s\S]*?-->/g, " ");
const noJsComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
const noJsStrings = (t) => t.replace(/`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g, '""').replace(/\/(?![*/])(?:\\.|[^/\n\\])+\/[gimsuy]*(?=\s*[.,);])/g, '""');
const hits = (list, text) => list.filter(([re, , fl]) => new RegExp(re, fl).test(text)).map(([, why]) => why);

function jsViolations(added, whole) {
  const code = noJsComments(added);
  const found = hits(RULES.js.deny, code);
  const bare = noJsStrings(code);
  for (const m of bare.matchAll(/\.([A-Za-z_$][\w$]*)\s*=(?![=>])/g)) {
    if (!RULES.js.assign.includes(m[1])) found.push(`JS allowlist: assignment to .${m[1]} is not on the functional allowlist`);
  }
  return found;
}

function violations(kind, added, whole = added, isNew = false) {
  if (kind === "css") {
    const found = hits(RULES.css, noCssNoise(added));
    return isNew && !/@layer\b/.test(added) ? [...found, "AGENTS 4: all CSS belongs to a @layer"] : found;
  }
  if (kind === "html") {
    const t = noHtmlNoise(added);
    const found = hits(RULES.html.deny, t);
    for (const m of t.matchAll(/<([a-zA-Z][\w-]*)/g)) {
      const tag = m[1].toLowerCase();
      if (!RULES.html.elements.includes(tag)) found.push(`html allowlist: <${tag}> is not permitted`);
    }
    return found;
  }
  if (kind === "js") return jsViolations(added, whole);
  if (kind === "json") return hits(RULES.json, added);
  return [];
}

function transcript(p) {
  const lines = (read(p) ?? "").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const cut = lines.map((e) => e.subtype === "compact_boundary" || e.isCompactSummary === true).lastIndexOf(true);
  return lines.slice(cut + 1);
}
const toolUses = (e) => (e.type === "assistant" && Array.isArray(e.message?.content) ? e.message.content.filter((c) => c.type === "tool_use") : []);

function fullyRead(entries, suffix) {
  return entries.some((e) => toolUses(e).some((u) => u.name === "Read" && slash(u.input?.file_path).endsWith(suffix) && u.input?.offset == null && u.input?.limit == null));
}

function toolsSinceLastPrompt(entries) {
  let n = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    const e = entries[i];
    if (e.type === "user" && !e.isMeta) {
      const c = e.message?.content;
      if (typeof c === "string" || (Array.isArray(c) && !c.some((x) => x.type === "tool_result"))) break;
    }
    n += toolUses(e).length;
  }
  return n;
}

function diffAdded(cwd) {
  const added = {};
  let file = null;
  for (const line of sh("git diff -U0 HEAD --", cwd).split("\n")) {
    if (line.startsWith("+++ ")) file = line.slice(4).replace(/^b\//, "").trim();
    else if (line.startsWith("+") && file && kindOf(file)) (added[file] ??= []).push(line.slice(1));
  }
  for (const f of sh("git ls-files -o --exclude-standard", cwd).split("\n").filter(Boolean)) {
    if (kindOf(f)) added[f] = (read(path.join(cwd, f)) ?? "").split("\n");
  }
  return added;
}
const baselineFile = (id) => path.join(os.tmpdir(), `claude-hooks-${String(id).replace(/\W/g, "")}.json`);

const section = (heading) => {
  const m = (read(AGENTS) ?? "").match(new RegExp(`^${heading}[\\s\\S]*?(?=^#{1,2} |$(?![\\s\\S]))`, "m"));
  return m ? m[0].trim() : "";
};

function poolDrift(cwd) {
  const tags = (s) => [...(s.match(/<template[^>]*>([\s\S]*?)<\/template>/)?.[1] ?? s).matchAll(/<([a-z][\w-]*)/g)].map((m) => m[1]).sort().join();
  const a = read(path.join(cwd, "index.html"));
  const b = read(path.join(cwd, "assets", "pool.html"));
  return a && b && /<template[^>]*>\s*</.test(a) && tags(a) !== tags(b);
}

function preToolUse(j) {
  const deny = (r) => out({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: r } });
  const ask = (r) => out({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "ask", permissionDecisionReason: r } });
  const i = j.tool_input ?? {};
  const cwd = j.cwd ?? process.cwd();

  if (j.tool_name === "Bash" || j.tool_name === "PowerShell") {
    const c = i.command ?? "";
    if (new RegExp(RULES.bash.deny, "i").test(c)) return deny("Blocked: symlinks, --no-verify and disabling hooks are forbidden (naming skill; owner rule).");
    if (new RegExp(RULES.bash.protected, "i").test(c) && new RegExp(RULES.bash.write, "i").test(c.replace(/\d?>&?\s*(\/dev\/null|\$null|nul|\d)\b/gi, " "))) return ask("Changes hook or settings files. Owner approval required.");
    if (/\bgit\s+push\b/.test(c) && read(path.join(cwd, "test", "package.json")) && read(path.join(cwd, "assets", "pool.html"))) {
      if (poolDrift(cwd)) return deny("cdn handoff: inline <template> and assets/pool.html differ. Make them identical before pushing.");
      try { execSync("npm test", { cwd: path.join(cwd, "test"), stdio: "pipe", timeout: 540000 }); }
      catch (e) { return deny(`cdn handoff: test gate failed. ${String(e.stdout ?? "").slice(-800)}`); }
    }
    if (new RegExp(RULES.bash.ask, "i").test(c)) {
      const email = sh("git config user.email", cwd).trim();
      const note = /\bgit\s+commit\b/.test(c) && email !== RULES.commitEmail ? ` Commit identity is ${email}, handoff requires ${RULES.commitEmail}.` : "";
      return ask(`External state change. Plan first, owner OK required.${note}`);
    }
    return;
  }

  const file = i.file_path ?? i.notebook_path ?? "";
  const f = slash(file);
  const edits = i.edits ?? (i.new_string != null ? [i] : []);
  const existing = read(file);
  const incoming = i.content ?? edits.map((e) => e.new_string ?? "").join("\n");

  for (const s of RULES.secrets) if (new RegExp(s).test(incoming)) return deny("security skill: secret-like value in file content.");
  if (new RegExp(RULES.protectedPaths, "i").test(f)) return ask("Changes hook or settings files. Owner approval required.");
  if (/(^|\/)\.agents\/skills\/[^/]+\//.test(f) && !/\.agents\/skills\/[a-z0-9_-]+\//.test(f)) return deny("naming skill: skill names are lowercase letters, numbers, hyphens.");
  if (/(^|\/)(utils?|helpers?)\.\w+$/i.test(f)) return deny("naming skill: ambiguous file name.");

  const kind = kindOf(f);
  if (kind) {
    const entries = transcript(j.transcript_path);
    const skill = `.agents/skills/${RULES.concernSkill[kind]}/SKILL.md`;
    if (!fullyRead(entries, skill)) return deny(`Read the entire ${skill} (no offset or limit) before editing ${path.basename(f)}.`);
    const handoff = path.join(cwd, ".agents", "SESSION-HANDOFF.md");
    if (read(handoff) != null && !fullyRead(entries, ".agents/SESSION-HANDOFF.md")) return deny("session skill: read the entire .agents/SESSION-HANDOFF.md before any implementation decision.");

    const have = new Set((existing ?? "").split("\n").map((l) => l.trim()));
    const added = i.content != null ? i.content.split("\n").filter((l) => !have.has(l.trim())).join("\n") : incoming;
    const whole = `${existing ?? ""}\n${incoming}`;
    const v = [...new Set(violations(kind, added, whole, existing == null))];
    if (v.length) return deny(`Blocked. Fix and retry, or surface a conflict to the owner:\n- ${v.join("\n- ")}`);
  }

  if (/(^|\/)SESSION-HANDOFF\.md$/.test(f) && existing != null) {
    const kept = i.content != null ? i.content.includes(existing.trim()) : edits.every((e) => (e.new_string ?? "").includes((e.old_string ?? "").trim()));
    if (!kept) return ask("Handoff is append-only: this removes text. Owner written OK required.");
  }
  if (new RegExp(RULES.canon.repo, "i").test(f) && !/\/\.agents\/(_archived|hooks)\//.test(f)) {
    if (/\/CLAUDE\.md$/.test(f)) return ask("CLAUDE.md is pointer-only. Owner approval required.");
    if (/\/(AGENTS\.md|\.agents\/skills\/.*)$/.test(f) && new RegExp(RULES.canon.names).test(incoming)) return ask("Canon is vendor- and project-agnostic: new text names a vendor or project.");
  }
  if (/(^|\/)index\.html$/.test(f)) return ask("HTML is the contract and the outer structure never changes. Owner approval required.");
  if (existing == null && slash(path.resolve(cwd, file)).startsWith(slash(cwd) + "/")) return ask("New file: entropy. AGENTS 1 requires the owner to say so.");
}

function stop(j) {
  const raw = j.last_assistant_message ?? "";
  const text = raw.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ").replace(/"[^"\n]*"|“[^”\n]*”/g, " ").replace(/^>.*$/gm, " ");
  const problems = [];
  for (const b of RULES.reply.banned) if (new RegExp(b, "i").test(text)) problems.push(`Banned phrasing /${b}/ (AGENTS C5). Remove it.`);
  if (new RegExp(RULES.reply.refusal, "i").test(text) && !/^\s*\d+[.)]\s/m.test(text)) problems.push('"No/I can\'t" is never an endpoint (AGENTS C2): state the blocker, then numbered steps to fix it.');
  const entries = transcript(j.agent_transcript_path ?? j.transcript_path);
  if (new RegExp(RULES.reply.claim, "i").test(text) && toolsSinceLastPrompt(entries) === 0) problems.push("Claim of completed work with no tool call this turn (AGENTS 1). Do the work with a tool, or withdraw the claim.");

  if (j.hook_event_name !== "SubagentStop") {
    const cwd = j.cwd ?? process.cwd();
    const base = new Set(JSON.parse(read(baselineFile(j.session_id)) ?? "[]"));
    for (const [file, lines] of Object.entries(diffAdded(cwd))) {
      const fresh = lines.filter((l) => !base.has(`${file}\0${l}`));
      if (!fresh.length) continue;
      const v = [...new Set(violations(kindOf(file), fresh.join("\n"), read(path.join(cwd, file)) ?? ""))];
      if (v.length) problems.push(`${file} (written outside Edit/Write or left in the diff):\n  - ${v.join("\n  - ")}`);
    }
  }
  if (problems.length) out({ decision: "block", reason: problems.join("\n") });
}

function sessionStart(j) {
  const cwd = j.cwd ?? process.cwd();
  const seen = [];
  for (const [file, lines] of Object.entries(diffAdded(cwd))) lines.forEach((l) => seen.push(`${file}\0${l}`));
  try { fs.writeFileSync(baselineFile(j.session_id), JSON.stringify(seen)); } catch {}
  const notes = [];
  const global = read(path.join(os.homedir(), ".claude", "CLAUDE.md"));
  if (!global || !global.includes("@~/D7460N.ai/AGENTS.md") || !read(path.join(os.homedir(), "D7460N.ai", "AGENTS.md"))) notes.push("WARNING: ~/.claude/CLAUDE.md does not import ~/D7460N.ai/AGENTS.md. Canon is NOT loaded. Tell the owner now.");
  if (read(path.join(cwd, ".agents", "SESSION-HANDOFF.md")) != null) notes.push("Read the entire .agents/SESSION-HANDOFF.md and re-assert its Constraint Lock before any implementation decision.");
  if (j.source === "compact") notes.push("Context was compacted. Re-read AGENTS.md in full before continuing.");
  if (notes.length) out({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: notes.join("\n") } });
}

function userPromptSubmit(j) {
  const card = RULES.injectSections.map(section).filter(Boolean).join("\n\n");
  const prior = /\b(before|previous|earlier|last time|again|already|prior|you said|we did|remember)\b/i.test(j.prompt ?? "");
  const text = (card || "WARNING: AGENTS.md could not be read. Tell the owner now.") + (prior ? "\n\nThis prompt references prior work: check the handoff, PROGRESS.json and memory before answering (C3)." : "");
  out({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: text.slice(0, 9900) } });
}

if (require.main === module) {
  let input = "";
  process.stdin.on("data", (d) => (input += d)).on("end", () => {
    const j = JSON.parse(input || "{}");
    ({ SessionStart: sessionStart, UserPromptSubmit: userPromptSubmit, PreToolUse: preToolUse, Stop: stop }[process.argv[2]])(j);
  });
}
module.exports = { violations, kindOf };
