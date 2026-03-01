# Web Template Blueprint

A generic, high-performance monorepo template for .NET backends and React frontends.

## 1. Project Naming Convention

**Template Variable**: `Company` (e.g., `Balenthiran`)
**Template Variable**: `Project` (e.g., `Apeify`)

**Resulting Structure**:
- `backend/Company.Project.Abstractions/`
- `backend/Company.Project.DomainModels/`
- `backend/Company.Project.DataModels/`
- `backend/Company.Project.EntityModels/`
- `backend/Company.Project.Services/`
- `backend/Company.Project.Database/`
- `backend/Company.Project.WebApi/`

## 2. Included Components

### Backend (Clean Architecture)
- **WebApi**: Native OpenAPI (Swagger/Scalar), Health Checks, Route Grouping pattern.
- **Services**: Dependency Injection patterns, AutoMapper profiles.
- **Database**: PostgreSQL / EF Core setup, Migrations folder, `DbContext` base.
- **Entities/Models**: Base interfaces (e.g., `IEntity`, `IBaseModel`).

### Frontend (Modern React)
- **Core**: Vite, React, TypeScript, ESLint.
- **State**: Redux Toolkit + RTK Query base.
- **Integration**: `rtk-query-codegen-openapi` configuration for deterministic client generation.
- **Proxy**: Vite proxy set up to talk to the Backend.

### DevOps (Scaleable Infrastructure)
- **Docker**: Multi-stage Dockerfiles for both Frontend and Backend.
- **Helm**: A genericized Helm chart in `helm/` using values for naming and scaling.
- **Deploy**: Root `deploy.sh` that targets a specific K8s namespace based on the project slug.

## 3. Exclusion Rules (Strip to Generic)
- **REMOVE**: All `Interest` logic, entities, and routes.
- **REMOVE**: All project-specific detail pages (`EarnYourDrinksDetail`, etc.).
- **REMOVE**: Specific image assets and content in `public/`.
- **RESET**: `README.md` to a generic "Getting Started" guide.

## 4. Hybrid Onboarding Process

### Step 1: `dotnet new web-template`
- Replaces namespaces and file names.
- Updates solution references.

### Step 2: `scripts/init.mjs`
- **Database**: Interactive prompt for Postgres credentials.
- **Environment**: Generates `.env` and `appsettings.Development.json` with fresh GUIDs.
- **Docker**: Sets up local image registry tags.
- **K8s**: (Optional) Creates the initial K8s namespace and secrets for the first deployment.

---

# Maintenance
The Web Template should be updated whenever the core architecture in the main repository (Balenthiran) improves (e.g., adding a new global error handler or performance fix).
