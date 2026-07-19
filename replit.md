# LeaguePilotUI

A youth sports team dashboard UI built with React, Vite, and Tailwind CSS. Designed for parents and coaches to track schedules, RSVPs, messages, photos, and team announcements.

## Stack

- **React 18** with JSX
- **Vite 4** — dev server on port 5000
- **Tailwind CSS 3** (via CDN in dev; PostCSS config also present)
- **Iconify** for icons
- **React Router DOM** (installed, not yet wired up)

## Running the app

```bash
npm run dev
```

The dev server runs on port 5000 and is configured to accept all hosts for Replit's preview proxy.

## Project structure

```
src/
  App.jsx       # Main app component (full UI)
  main.jsx      # React entry point
  index.css     # Global styles
index.html      # HTML shell
vite.config.js  # Vite config (port 5000, host 0.0.0.0)
```

## User preferences

- Keep the existing project structure unless asked to change it.
