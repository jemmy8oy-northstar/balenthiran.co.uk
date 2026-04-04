# balenthiran.co.uk - Personal Portfolio

Welcome to the home of "all things me" (James Balenthiran). This project is a modern, React-based portfolio designed to showcase personal coding projects, ongoing app ideas, and professional work.

## Project Purpose
The goal of this website is to provide a comprehensive look at my professional and personal journey in tech. It features:
- **Project Showcase**: A portfolio of completed and ongoing coding projects.
- **App Ideas Nursery**: A space for documenting new ideas and gauging interest.
- **Personal Background**: Information about who I am, my goals, and my modeling work.

## Tech Stack
- **Frontend**: React (Vite) + TypeScript
- **Styling**: Vanilla CSS (Premium, modern aesthetic)
- **Backend**: (Planned) To handle email interest registration.

## Documentation & Design Decisions
In-depth documentation and design decisions are stored in the `docs/` directory:
- [Vision & Goals](docs/vision.md): High-level project objectives and content strategy.
- [AI Instructions](docs/ai-instructions.md): Specific guidelines for Antigravity AI interactions.
- [Task Tracking](.gemini/antigravity/brain/6f6d2989-8706-4bdb-9db5-1086ddabf68b/task.md): Current development tasks and progress.

## Deployment

Merging to `main` triggers a GitHub Actions workflow that builds and pushes both Docker images to Oracle Container Image Registry (OCIR). Versioning is handled automatically by GitVersion in Mainline mode (patch bump per merge).

### Required GitHub secrets & variables

| Type | Name | Value |
|---|---|---|
| Secret | `OCIR_USERNAME` | OCI username (`<tenancy>/<user>`) |
| Secret | `OCIR_AUTH_TOKEN` | OCI auth token |
| Variable | `OCIR_REGISTRY` | `LHR.ocir.io` |
| Variable | `OCIR_NAMESPACE` | OCI namespace |

### After the action completes

Rollout restarts are manual until the webhook deployment server is in place:

```bash
kubectl rollout restart deploy balenthiran-balenthiranhelm-main -n balenthiran
kubectl rollout restart deploy balenthiran-balenthiranhelm-backend -n balenthiran
```

## Installation & Running Locally

### Prerequisites
- Node.js (Latest LTS recommended)
- .NET SDK (Latest LTS recommended)

### Setup

**Frontend**
```bash
cd frontend && npm install && npm run dev
```

**Backend**
```bash
cd backend && dotnet run --project Balenthiran.WebApi
```

## File Structure
- `frontend/src/`: React application source.
  - `components/`: Reusable UI components.
  - `pages/`: Page-level components.
  - `data/`: Static board metadata (JSON).
- `backend/`: .NET Web API.
- `docs/`: In-depth documentation and design plans.
- `helm/`: Kubernetes deployment manifests.
- `scripts/`: Sprint board maintenance scripts.
- `.github/workflows/`: CI/CD pipelines.

## High-Level Design Decisions
- **Modern Aesthetic**: Focused on a premium feel with vibrant colors, glassmorphism, and smooth animations.
- **Lifecycle Visualization**: App ideas are categorized by their stage (Idea, Candidate, In Development, MVP, etc.).
- **Media-Ready**: Built to accommodate various levels of video content, from single demos to full YouTube series.
