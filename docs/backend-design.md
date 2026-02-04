# Balenthiran Backend Design & Migration Plan

## Overview
Migration of the [Balenthiran.co.uk](file:///Users/jamesbalenthiran/coding/balenthiran) project from a static/Vite site to a full-stack monorepo with a .NET backend.

## Architecture
- **Language**: C#
- **Framework**: .NET 8 (Minimal API)
- **Data Persistence**: EFCore with PostgreSQL
- **API Documentation**: Swashbuckle / OpenAPI
- **Frontend Integration**: Deterministic React codegen (OpenAPI -> TypeScript Service)

## Repository Structure (Monorepo)
```text
balenthiran/
├── frontend/             # Existing Vite project
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/              # New .NET project
│   ├── Balenthiran.Api/  # Minimal API
│   ├── Balenthiran.Data/ # EFCore & Postgres
│   └── Balenthiran.sln
├── docs/                 # Shared documentation
└── docker-compose.yml    # Local development (Postgres)
```

## Migration Steps
1. **Preparation**:
   - Create `frontend/` directory and move all existing Vite-related files (src, public, index.html, package.json, vite.config.ts, etc.) into it.
   - Update `deploy.sh` and `Dockerfile` to reflect the new structure.
2. **Backend Initialization**:
   - Create `backend/` directory.
   - Run `dotnet new webapi -minimal -o Balenthiran.Api`.
   - Setup `Balenthiran.Data` with EFCore and Postgres.
3. **OpenAPI & Codegen**:
   - Configure Swashbuckle in `Program.cs`.
   - Setup `nswag` or `openapi-generator` in the `frontend` to watch the backend's `openapi.json` and rebuild the client services.
4. **Local Dev Environment**:
   - Create a `docker-compose.yml` in the root to spin up a local PostgreSQL instance.

## Deterministic Hallucination-Reduction
- **Strict OpenAPI Contracts**: The backend serves as the source of truth for the API shape.
- **Automated Client Generation**: No manual fetching logic in React; instead, we use a code generator to ensure types align perfectly with the compiled backend. This eliminates "hallucinated" fields or incorrect endpoint paths during development.

## Initial Scope: Newsletter Signup
- **Endpoint**: `POST /api/newsletter/subscribe`
- **Model**:
  ```csharp
  public class Subscriber {
      public Guid Id { get; set; }
      public string Email { get; set; }
      public DateTime SubscribedAt { get; set; }
  }
  ```
- **Validation**: Ensure email is valid and unique in the database.

## Template Considerations (Northstar .NET)
- **Shared Libraries**: Extract common patterns into a `Northstar.Core` or similar if multiple projects emerge.
- **CI/CD Integration**: Document the GitHub Actions / K8s deployment YAMLs for the .NET backend.
- **Logging & Monitoring**: Consistent Serilog or industry standard setup.
