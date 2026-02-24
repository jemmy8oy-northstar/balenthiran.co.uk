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
│   ├── Balenthiran.WebApi/  # Minimal API
│   ├── Balenthiran.Database/ # EFCore & Postgres
│   ├── Balenthiran.Abstractions/ # Service & Model interfaces
│   │   ├── DataModels/
│   │   ├── DomainModels/
│   │   └── Services/
│   └── Balenthiran.slnx
├── docs/                 # Shared documentation
└── README.md             # Local setup instructions (Local Postgres)
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
   - Use the existing local PostgreSQL instance on Mac.
   - Configure connection strings in `appsettings.Development.json`.

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

## Model Sovereignty: Requests vs. Data Models

To maintain a secure and clean API, we distinguish between how data enters the system and how it is represented:

### 1. Request DTOs (The "Question")
- **Naming**: `*Request` (e.g., `RegisterInterestRequest`)
- **Location**: `Balenthiran.DataModels/Models/`
- **Purpose**: Minimal set of fields required from the client.
- **Rules**: Never include server-generated fields (`Id`, `CreatedAt`) or security-sensitive fields (`IsVerified`).

### 2. Data Models (The "Answer")
- **Naming**: Simple noun (e.g., `Subscriber`)
- **Location**: `Balenthiran.DataModels/Models/`
- **Purpose**: Public representation of an entity, often returned by the API.
- **Rules**: Can include all public fields. Used by the frontend to display data.

### 3. Domain Models (The "Logic")
- **Naming**: `Domain*` (e.g., `DomainSubscriber`)
- **Location**: `Balenthiran.DomainModels/Models/`
- **Purpose**: Internal rich models containing business logic and transformation helpers.

### 4. Entity Models (The "Storage")
- **Naming**: `*Entity` (e.g., `SubscriberEntity`)
- **Location**: `Balenthiran.EntityModels/`
- **Purpose**: Direct mapping to database tables via EFCore.
