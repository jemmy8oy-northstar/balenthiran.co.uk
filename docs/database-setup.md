# Local Database Setup (PostgreSQL)

This project uses **Entity Framework Core (EFCore)** with **PostgreSQL**.

## Connection String
The local development connection string is configured in `backend/Balenthiran.WebApi/appsettings.Development.json`.

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=balenthiran;Username=tenbeerplan;Password=password"
}
```

## How to Apply Migrations

### 1. Automatic Migration (Recommended)
When running in **Development** mode, the application will automatically apply any pending migrations on startup.
```bash
dotnet run --project backend/Balenthiran.WebApi
```

### 2. Manual Migration (CLI)
You can manually update the database using the .NET EF tool:
```bash
dotnet ef database update --project backend/Balenthiran.Database --startup-project backend/Balenthiran.WebApi
```

## Local Configuration Notes
If you are using a different local user or password, update the `DefaultConnection` in `appsettings.Development.json`. This file is ignored by Git to prevent leaking local credentials, but a template is provided in `appsettings.json`.

---
> [!NOTE]
> Ensure PostgreSQL is running locally on port `5432` before starting the application.
