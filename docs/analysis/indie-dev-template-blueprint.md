# Indie Dev Home & Sprint Boards Template

The "Build-in-Public" extension of the Web Template, specifically designed for managing an indie-dev portfolio and agile-style boards.

## 1. Relationship to Web Template & Distribution
The Indie Dev Template is a **Superset** of the Web Template:
- **Web Template (Base)**: Provides the 7-project .NET backend, React frontend, and infrastructure.
- **Indie Dev Template (Extension)**: Adds the "Build-in-Public" engine, Kanban boards, and Agentic AI workflows.
- **Distribution**: This is a **Template Repository on GitHub**. Users "Use this template" or clone it to get the full environment including the `.agent/` folder and git history.

## 2. Additional Components

### "Big Board" Engine
- **Data**: `backend/.../Data/projects.json` and `sprints.json`.
- **Logic**: `ProjectRoutes` and `SprintRoutes`.
- **Integrations**: `ProjectSyncService` (JSON -> DB synchronization).

### Indie Dev Home UI
- **Components**: `KanbanBoard`, `SprintHistory`, `ProjectTile`, `InterestForm`.
- **Pages**: Portfolio Home, Project Detail templates.

### Agentic AI Capabilities
- **Skills**: `sprint-management` skill.
- **Workflows**: `/move-task`, `/update-task`, `/plan-next-sprint`, `/validate-sprints`.

## 3. Accessible Deployment & Hosting
To ensure subscribers can get live quickly without a K8s cluster:
- **Easy Mode Guide**: Create `docs/deployment/easy-mode.md` covering Vercel/Railway.
- **Vercel**: Pre-configured `vercel.json` for the frontend.
- **Railway/Fly.io**: Instructions for deploying the .NET `backend/Dockerfile` as a standalone service.
- **Database**: Guide for connecting a free-tier Supabase/Neon Postgres instance.

## 4. Kubernetes (Pro Path)
- **Note**: Kubernetes support and Helm charts are included but marked as **"Pro / Coming Soon"** for tutorial purposes. Beginners should stick to "Easy Mode".

## 3. Nursery-Specific Onboarding (`scripts/init-nursery.mjs`)
Extends the generic `init.mjs` with:
- **YouTube Integration**: Prompts for Channel ID and API keys.
- **Initial Backlog**: Interactive prompt to add the first project to the Board.
- **Socials**: Prompts for TikTok, Instagram, and Substack IDs to populate the `admin` board.

## 4. Scaling the Deploy Script
For the Nursery, the `deploy.sh` must:
1.  Verify that the `nursery-<slug>` K8s namespace exists.
2.  Set `helm` values specifically for the nursery ecosystem (e.g., shared ingress controller or cert-manager settings).

---

# Vision
The Nursery Template is what allows a developer to move from "Idea" to "Live Public Board" in under 15 minutes. It turns the meta-work of "building in public" into a standardized, zero-friction process.
