# LeaguePilotUI

A full-featured youth sports team management UI built with React, Vite, and Tailwind CSS. Covers three roles — Parent, Coach, and Administrator — with 24+ pages and demo data throughout.

## Stack

- **React 18** + JSX
- **Vite 4** — dev server on port 5000
- **React Router DOM 6** — client-side routing
- **Tailwind CSS 3** (PostCSS)
- **Iconify** (solar icon set) — `<iconify-icon>` web component
- All data is static demo data — no backend required

## Running the app

```bash
npm run dev
```

Dev server on port 5000 (`vite.config.js` sets `host: "0.0.0.0"`, `allowedHosts: true`).

## Architecture

```
src/
  App.jsx              # React Router setup — all 24+ routes
  main.jsx             # Entry point
  index.css            # Tailwind base + custom animations
  context/
    AppContext.jsx      # Role/user context (role switcher)
  components/
    Layout.jsx          # Page shell (ticker + sidebar + main)
    Sidebar.jsx         # Desktop nav (role-aware)
    MobileHeader.jsx    # Mobile nav + drawer
    Ticker.jsx          # Top scrolling announcement bar
    StatusBadge.jsx     # Reusable status chip (30+ states)
  data/
    demo.js             # All demo data (events, roster, messages, etc.)
  pages/
    parent/             # Home, Schedule, RSVP, Messages, Roster,
    │                   # Photos, Volunteers, Replay, Wallet
    coach/              # Dashboard, Calendar, Attendance, Messages,
    │                   # ParentReplay, RookieAssist, AIWorkspace,
    │                   # Roster, Weather
    admin/              # Overview, Registrations, FamilyAccess, Teams,
                        # Imports, Invitations, Schedule, Communications,
                        # Safety, Media, Sponsors, Branding, Reports, Security
```

## Role switching

The sidebar has Parent / Coach / Admin tabs that switch the active role and navigate to the correct root route. All three roles share the same demo user (`Sarah Mitchell`).

## Design system

- Dark background: `bg-gray-950` / `bg-black`
- Emerald palette: `emerald-400/500/600/800` for accents
- Cyan highlights: `cyan-400` for primary actions
- Cards: `rounded-xl border border-emerald-800 bg-black`
- Icons: Iconify `solar:*-linear` set
- Fonts: Inter (body), Plus Jakarta Sans (headings)

## User preferences

- Maintain existing file structure and stack.
- All interactions are local-state only (useState) — no backend calls.
- Demo data lives in `src/data/demo.js` — extend it there.
