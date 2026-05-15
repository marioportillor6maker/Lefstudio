# Skill Registry — lef-frontend

Generated: 2026-05-15

## User Skills

| Name | Trigger | Path |
|------|---------|------|
| judgment-day | "judgment day", "review adversarial", "dual review", "doble review", "juzgar" | ~/.claude/skills/judgment-day/SKILL.md |
| go-testing | Go tests, Bubbletea TUI testing | ~/.claude/skills/go-testing/SKILL.md |
| skill-creator | Creating new AI skills | ~/.claude/skills/skill-creator/SKILL.md |
| branch-pr | PR creation, opening a PR, preparing changes for review | ~/.claude/skills/branch-pr/SKILL.md |
| issue-creation | Creating GitHub issues, reporting bugs, requesting features | ~/.claude/skills/issue-creation/SKILL.md |
| graphify | /graphify — any input to knowledge graph | ~/.claude/skills/graphify/SKILL.md |

## System Skills (built-in)

| Name | Trigger |
|------|---------|
| caveman | /caveman, "caveman mode", "less tokens" |
| cavecrew | "delegate to subagent", "use cavecrew", "save context" |
| frontend-design | frontend design tasks |
| update-config | configure harness, hooks, settings.json |
| simplify | review changed code for reuse/quality |
| claude-api | code importing `anthropic`/`@anthropic-ai/sdk` |
| review | review a pull request |
| security-review | security audits |

## Project Conventions

| File | Purpose |
|------|---------|
| AGENTS.md | Next.js breaking changes notice — read `node_modules/next/dist/docs/` before writing code |
| CLAUDE.md | Global + project rules, personality, SDD orchestrator config |

## Compact Rules

### AGENTS.md — MANDATORY before any Next.js code
- This Next.js version (16.2.4) has **breaking changes** from training data
- Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`
- Heed all deprecation notices — APIs, conventions, and file structure may differ

### Stack Context
- Next.js 16.2.4 + React 19 + TypeScript 5 + Tailwind CSS v4
- App Router, Screaming Architecture (`_components/`, `_data/`, `_types/` per feature)
- Test runner: Vitest (`vitest run`) — unit tests only
- Linter: ESLint via `eslint-config-next`
- No formatter configured (no Prettier)
