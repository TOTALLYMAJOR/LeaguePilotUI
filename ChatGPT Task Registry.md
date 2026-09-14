# ChatGPT Task Registry

This file is the repository fallback source of truth for tracked pursuits when a writable Google Drive registry is not available.

## ACTIVE

_No active tasks._

## WAITING

### T-001 — LeaguePilot automatic pursuit continuity system

- **ID:** T-001
- **Title:** LeaguePilot automatic pursuit continuity system
- **Status:** WAITING
- **Goal:** Establish a persistent, low-friction task continuity system so multi-step research, decisions, troubleshooting, builds, purchases, and other pursuits can be recovered after leaving ChatGPT.
- **Next Action:** Review and merge the `feat/task-continuity-registry` pull request so the registry and agent instructions become part of the default branch.
- **Context Snapshot:** The user asked for an automatic continuity system centered on a persistent `ChatGPT Task Registry`. Trackable pursuits should be detected once with “Want me to track this?”, then stored without manual re-entry. The system must support `/tasks`, `/resume`, `/track`, `/pause`, `/done`, `/remind`, and `/status`, plus natural-language equivalents. Task entries preserve enough concise context for another conversation to resume accurately. The LeaguePilot repository is `TOTALLYMAJOR/LeaguePilotUI`, a React/Vite UI. The continuity mechanism was intentionally kept separate from application UI state because the current app context is ephemeral and the AI workspace explicitly uses demo/non-persisted state. A root `AGENTS.md` now defines task detection, task schema, state transitions, duplicate prevention, reminder rules, commands, source-of-truth behavior, and return checkpoints. This registry file is the repository fallback when writable Google Drive access is unavailable.
- **Important Findings/Decisions:**
  - Do not use React `AppContext` as the task registry; it is in-memory UI state.
  - Keep ChatGPT Memory secondary; the persistent registry is authoritative.
  - Prefer a Google Drive file named `ChatGPT Task Registry` when writable Drive access is available; otherwise use this repo file.
  - Only update entries on meaningful state changes, not every message.
  - Do not create duplicate tasks when an unfinished matching pursuit already exists.
- **Last Updated:** 2026-09-14
- **Reminder:** Not set
- **Tags:** continuity, agent-system, task-registry, chatgpt, leaguepilot

## PAUSED

_No paused tasks._

## DONE

_No completed tasks._
