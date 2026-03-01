# Nursery Template Blueprint

The "Build-in-Public" extension of the Web Template, specifically designed for managing an app nursery.

## 1. Relationship to Web Template
The Nursery Template **inherits** from the Web Template but adds the "Nursery" layer.

## 2. Additional Components

### "Big Board" Engine
- **Data**: `backend/.../Data/projects.json` and `sprints.json`.
- **Logic**: `ProjectRoutes` and `SprintRoutes`.
- **Integrations**: `ProjectSyncService` (JSON -> DB synchronization).

### Nursery UI
- **Components**: `KanbanBoard`, `SprintHistory`, `ProjectTile`, `InterestForm`.
- **Pages**: Portfolio Home, Project Detail templates.

### Agentic AI Capabilities
- **Skills**: `sprint-management` skill.
- **Workflows**: `/move-task`, `/update-task`, `/plan-next-sprint`, `/validate-sprints`.

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
