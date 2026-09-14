# ChatGPT Task Registry

This file is the repository fallback source of truth for tracked pursuits when a writable Google Drive registry is not available.

## ACTIVE

_No active tasks._

## WAITING

_No waiting tasks._

## PAUSED

_No paused tasks._

## DONE

### T-001 — LeaguePilot automatic pursuit continuity system

- **ID:** T-001
- **Title:** LeaguePilot automatic pursuit continuity system
- **Status:** DONE
- **Goal:** Establish a persistent, low-friction task continuity system so multi-step research, decisions, troubleshooting, builds, purchases, and other pursuits can be recovered after leaving ChatGPT.
- **Next Action:** None for the repository setup. For cross-chat use outside repo-aware sessions, connect a writable Google Drive registry or explicitly point ChatGPT at this repository registry.
- **Context Snapshot:** The user asked for an automatic continuity system centered on a persistent `ChatGPT Task Registry`. Trackable pursuits should be detected once with “Want me to track this?”, then stored without manual re-entry. The system supports `/tasks`, `/resume`, `/track`, `/pause`, `/done`, `/remind`, and `/status`, plus natural-language equivalents. Task entries preserve enough concise context for another conversation to resume accurately. The LeaguePilot repository is `TOTALLYMAJOR/LeaguePilotUI`, a React/Vite UI. The continuity mechanism was intentionally kept separate from application UI state because the current app context is ephemeral and the AI workspace explicitly uses demo/non-persisted state. Root `AGENTS.md` defines task detection, task schema, state transitions, duplicate prevention, reminder rules, commands, source-of-truth behavior, and return checkpoints. Pull request #2 was squash-merged into `main` on 2026-09-14. This registry file is the repository fallback when writable Google Drive access is unavailable.
- **Important Findings/Decisions:**
  - Do not use React `AppContext` as the task registry; it is in-memory UI state.
  - Keep ChatGPT Memory secondary; the persistent registry is authoritative.
  - Prefer a Google Drive file named `ChatGPT Task Registry` when writable Drive access is available; otherwise use this repo file.
  - Only update entries on meaningful state changes, not every message.
  - Do not create duplicate tasks when an unfinished matching pursuit already exists.
  - Repository instructions cannot force unrelated ChatGPT conversations to automatically load this GitHub file; global continuity requires either explicit repository access in that conversation or a connected cross-chat registry such as Google Drive.
- **Last Updated:** 2026-09-14
- **Reminder:** Not set
- **Tags:** continuity, agent-system, task-registry, chatgpt, leaguepilot
