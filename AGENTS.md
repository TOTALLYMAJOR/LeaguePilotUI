# LeaguePilot Agent Instructions

## Automatic Pursuit & Task Continuity

Use this repository's task registry to prevent multi-step work from being lost between sessions.

### Source of truth

The authoritative task index is a persistent file named **ChatGPT Task Registry**.

- If Google Drive access is available and supported write actions can read/write a file named `ChatGPT Task Registry`, use that Drive file as the canonical registry.
- Otherwise, use the repository fallback at `ChatGPT Task Registry.md`.
- Do not invent task state when the registry cannot be read. State that the registry is unavailable.
- ChatGPT Memory may help recognize preferences, but it is not the authoritative task list.

### Detect trackable pursuits

When a conversation becomes something the user is likely to return to later, ask once:

> Want me to track this?

Examples include research, comparisons, unfinished decisions, multi-step tasks, troubleshooting, projects, things waiting on another party or event, and anything the user says they want to pursue, investigate, check, buy, fix, build, schedule, or revisit.

Do not ask for ordinary one-off questions.

If the user explicitly says `/track`, says to track the work, or otherwise clearly authorizes tracking, do not ask again; create or update the registry entry immediately.

### Registry schema

Each tracked task must contain:

- **ID** — short sequential ID such as `T-001`
- **Title**
- **Status** — one of `ACTIVE`, `WAITING`, `PAUSED`, `DONE`
- **Goal**
- **Next Action**
- **Context Snapshot**
- **Important Findings/Decisions**
- **Last Updated**
- **Reminder**
- **Tags**

### Context Snapshot standard

The snapshot must be concise but sufficient for a new conversation to recover:

- what the user was trying to accomplish;
- what was already learned;
- decisions already made;
- relevant constraints;
- where work stopped; and
- what should happen next.

Do not store the full conversation when a concise summary is sufficient.

### Meaningful updates only

Update a tracked task when there is a meaningful state change, including:

- a decision is made;
- important research is completed;
- the next action changes;
- the task becomes blocked;
- the task is paused;
- the task is completed.

Do not rewrite the registry for every message.

### Reminders

After a task is tracked, determine whether a return reminder would be useful. Ask concisely:

> Want me to remind you to come back to this?

If scheduled-task functionality is actually available and the user specifies a time, create the reminder. Include the task ID and task name in the reminder text. Never claim a reminder exists unless the scheduling action succeeded.

### Commands

Treat the following as commands even when embedded naturally in a message.

#### `/tasks`

Read the registry and show unfinished tasks grouped as:

1. `ACTIVE`
2. `WAITING`
3. `PAUSED`

For each task show:

`ID | Task | Next action | Reminder`

Do not show `DONE` tasks unless the user asks for them.

#### `/resume [ID or task name]`

Retrieve the matching registry entry and briefly state:

1. what the user was trying to accomplish;
2. what was established;
3. where work stopped;
4. the next action.

Then continue the task instead of making the user reconstruct context.

#### `/track`

Track the current pursuit. Create a new task if no matching unfinished task exists; otherwise update the existing task.

#### `/pause`

Mark the current tracked pursuit `PAUSED`, preserve context, and set a useful next action for resumption.

#### `/done`

Mark the current tracked pursuit `DONE`, record the completion result, and clear or resolve the next action.

#### `/remind [time]`

Create a scheduled reminder for the current pursuit only when scheduling functionality is available. Include the task ID and task name.

#### `/status`

Read and show the current task's stored registry state.

### Natural-language equivalents

Interpret requests such as these as registry operations:

- “What was I working on?”
- “Show my projects.”
- “What have I got going?”
- “Continue the mower thing.”
- “What am I waiting on?”
- “Pick up where we stopped.”

### State definitions

- `ACTIVE` — currently being pursued.
- `WAITING` — awaiting information, another person, an event, a purchase, a result, a merge, or another dependency.
- `PAUSED` — intentionally postponed.
- `DONE` — completed.

### Duplicate prevention

Before allocating a new ID, scan unfinished tasks for a matching pursuit. Prefer updating the existing entry over creating a near-duplicate.

Allocate the next numeric ID from the highest existing `T-NNN` value. Never reuse an old ID.

### Session handoff

For tracked multi-step work, maintain a lightweight checkpoint in the response:

**RETURN CHECKPOINT**

- **Thread:** short memorable title
- **Status:** where work stopped
- **Next:** the single best next action
- **Resume by saying:** a simple phrase the user can type later

The registry remains the source of truth; the checkpoint is only a convenient handoff.

### Minimize friction

The intended interaction is normally:

1. User starts a multi-step pursuit.
2. Ask once: “Want me to track this?”
3. User says yes.
4. Create/update the registry automatically.
5. Keep the entry current only at meaningful milestones.

Never require the user to manually restate information already available in the current conversation or registry.
