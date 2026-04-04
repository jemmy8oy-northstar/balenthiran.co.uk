# CLAUDE.md — balenthiran.co.uk

Personal portfolio and build-in-public platform for James Balenthiran.

## Project Overview

The site tracks app ideas through a lifecycle (Idea → Candidate → In Development → MVP → Ongoing/Retired), documents progress via sprint boards, and embeds YouTube content. The north star is 100k monthly active users.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Backend | .NET C# Web API (Minimal APIs) |
| Database | PostgreSQL (via EF Core) |
| Deployment | Kubernetes on Oracle Cloud (Helm) |

## Repository Structure

```
/
├── frontend/               React + TypeScript app
│   └── src/
│       ├── data/           Static board metadata (JSON) — see below
│       ├── pages/          Page components (Board, Home, About, detail pages)
│       ├── components/     Reusable UI (KanbanBoard, SprintGoals, etc.)
│       └── context/        SprintContext (active sprint state)
├── backend/
│   └── Balenthiran.WebApi/
│       ├── Data/           sprints.json, projects.json (served via API)
│       ├── Routes/         Minimal API route groups
│       └── BackgroundServices/  ProjectSyncService
├── docs/                   Design docs, specs, plans, analysis
├── scripts/                Sprint board maintenance scripts
└── helm/                   Kubernetes deployment manifests
```

## Sprint Board Data Model

### Authoritative files

| File | Purpose |
|---|---|
| `backend/Balenthiran.WebApi/Data/sprints.json` | All sprint history, goals, changes, and board snapshots |
| `frontend/src/data/devops.json` | Engineering board item metadata |
| `frontend/src/data/youtube.json` | Content board item metadata |
| `frontend/src/data/admin.json` | Platform board item metadata |
| `frontend/src/data/repos.json` | Repo slug → `{ url, displayName }` mapping for repo tags |

The backend serves `sprints.json` raw via `GET /api/sprints`. The frontend `data/` JSON files are the item registry used by the Kanban board.

### Sprint JSON structure

```jsonc
{
  "id": "26Q2W1/2",            // Quarter + week-pair identifier
  "startDate": "2026-03-30",
  "endDate": "2026-04-12",
  "standupUrl": "...",          // Optional YouTube link
  "goals": [
    "[x] Completed goal",       // [x] = done, [-] = missed, bare text = in progress
    "[-] Missed goal"
  ],
  "changes": [
    // New item (from: null means it didn't exist before)
    { "itemId": "some-id", "board": "devops", "from": null, "to": { "status": "Done", "title": "...", "description": "..." } },
    // Status move
    { "itemId": "some-id", "board": "youtube", "from": "Backlog", "to": "Uploaded", "timestamp": "..." }
  ],
  "boardSnapshots": {
    "project": [ /* full item list with current status */ ],
    "devops":   [ /* sorted alphabetically by id */ ],
    "youtube":  [ /* sorted alphabetically by id */ ],
    "admin":    [ /* sorted alphabetically by id */ ]
  }
}
```

**Key rules:**
- Board snapshots must be kept in sync with the changes log — run `node scripts/validate-sprints.mjs` after any edit.
- Items in snapshots are sorted alphabetically by `id`.
- When adding a new item, add it to: (1) the relevant `frontend/src/data/*.json` registry file, (2) as a `from: null` change in the sprint's `changes` array, AND (3) the same sprint's `boardSnapshots` — the snapshot must reflect the state *after* all changes for that sprint are applied.
- New sprints inherit the previous sprint's board snapshots as their starting point.

### Boards

| Board key | Display name | Source file |
|---|---|---|
| `project` | Project Board | `backend/Balenthiran.WebApi/Data/projects.json` |
| `devops` | Engineering Board | `frontend/src/data/devops.json` |
| `youtube` | Content Board | `frontend/src/data/youtube.json` |
| `admin` | Platform Board | `frontend/src/data/admin.json` |

## Available Scripts

```bash
# Move an item to a new status in the current sprint
node scripts/sprint-move.mjs <itemId> <newStatus>

# Update an item's title or description
node scripts/sprint-update.mjs <itemId> <field> "<value>"

# Validate all sprint data integrity (run after any sprints.json edit)
node scripts/validate-sprints.mjs

# Create a new sprint (advances to next sprint, carries forward snapshots)
python3 scripts/new-sprint.py
```

## Running Locally

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && dotnet run --project Balenthiran.WebApi
```

## Coding Conventions

- **Frontend**: Small, focused components. Vanilla CSS with glassmorphism aesthetic. No utility frameworks.
- **Backend**: Minimal API style (route groups, no controllers). EF Core for DB access.
- **Sprint data edits**: Always run `validate-sprints.mjs` after touching `sprints.json`. Use the scripts over hand-editing where possible.
- **New board items**: Add to the `frontend/src/data/*.json` registry file first, then reference by id in sprint changes.
- **Repo tags**: Add a `repos: ["slug"]` array to any board item (except youtube). Register the slug in `frontend/src/data/repos.json`. If an item has exactly one repo and no `path`/`youtubeUrl`, the whole card links to it; otherwise only the chips link out.
