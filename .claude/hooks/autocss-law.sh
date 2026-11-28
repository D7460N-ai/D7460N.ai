#!/usr/bin/env bash
# Injects AGENTS.md sections "C1", "No Dead-Ends" and "Architecture Tests" — the single source of truth in
# D7460N-ai/D7460N.ai. No rule text lives here. Reads the local clone
# (~/D7460N.ai, the same clone ~/.claude/CLAUDE.md imports); falls back to GitHub.
# Usage: autocss-law.sh <HookEventName> [whitelist]
# With "whitelist": injects the full .agents/WHITELIST.md instead (whitelist M5). Run as its own hook
# so each injection stays under Claude Code's ~10,000-character hook-output limit (over it, only a preview is shown).
event="$1"
if [ "$2" = "whitelist" ]; then
  label="AutoCSS whitelist (D7460N-ai/D7460N.ai .agents/WHITELIST.md)"
  src="$HOME/D7460N.ai/.agents/WHITELIST.md"
  if [ -r "$src" ]; then
    section=$(cat "$src")
  else
    section=$(curl -fsSL --max-time 5 https://raw.githubusercontent.com/D7460N-ai/D7460N.ai/main/.agents/WHITELIST.md) || exit 0
  fi
else
  label="Canonical AutoCSS law (D7460N-ai/D7460N.ai AGENTS.md)"
  src="$HOME/D7460N.ai/AGENTS.md"
  if [ -r "$src" ]; then
    text=$(cat "$src")
  else
    text=$(curl -fsSL --max-time 5 https://raw.githubusercontent.com/D7460N-ai/D7460N.ai/main/AGENTS.md) || exit 0
  fi
  section=$(printf '%s\n' "$text" | awk '/^## (C1\.|[0-9]+\. (No Dead-Ends|Architecture Tests))/{f=1; print; next} f && /^#{1,2} /{f=0} f')
fi
[ -n "$section" ] || exit 0
esc=$(printf '%s\n' "$section" | awk 'BEGIN{ORS=""} {gsub(/\r/,""); gsub(/\\/,"\\\\"); gsub(/"/,"\\\""); gsub(/\t/,"\\t"); print $0 "\\n"}')
printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s:\\n%s"}}\n' "$event" "$label" "$esc"
