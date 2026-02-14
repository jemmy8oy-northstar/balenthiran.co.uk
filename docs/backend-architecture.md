# Northstar .NET Backend Architecture Guide

This document outlines the architectural decisions for the Balenthiran .NET backend. This structure is intended to be used as a template for future projects in the ecosystem.

## Project Structure (7-Project Pattern)

```text
Balenthiran/
├── Balenthiran.WebApi        # Entry point, Routes, Dependency Injection
│   ├── Routes/               # Grouped Minimal API route definitions
│   ├── Mapper.cs             # Mappings: DataModels <-> DomainModels
│   └── ServiceRegistration.cs # DI orchestration
├── Balenthiran.Services      # Business Logic implementations
│   └── Mapper.cs             # Mappings: EntityModels <-> DomainModels
├── Balenthiran.DomainModels  # Domain Logic, Model extensions (Rich Domain Model)
├── Balenthiran.Database      # DbContext, Migrations
├── Balenthiran.DataModels    # API DTOs / POCOs (Data Models)
├── Balenthiran.EntityModels  # EFCore Database Entities (Anemic/POCO)
└── Balenthiran.Abstractions  # Interfaces for Services and Domain/Data Models
```

## Core Architectural Principles

### 1. DRY through Model Extension
Domain Models in `Balenthiran.DomainModels` extend Data Models from `Balenthiran.DataModels` to avoid redundancy while keeping a clean public API contract.

### 2. Route Grouping (Minimal API)
Routes are organized into `Routes/` and registered in `Program.cs` via extension methods to prevent a bloated startup file.

### 3. Layered Mapping Isolation
- **API Mapping** (`Api/Mapper.cs`): Only handles `DataModel <-> DomainModel`.
- **Service Mapping** (`Services/Mapper.cs`): Only handles `Entity <-> DomainModel`.

### 4. Dependency Injection (DI) & AutoMapper
- **Registration**: All services are registered in `ServiceRegistration.cs`.
- **AutoMapper Flow**: 
    1. `services.AddAutoMapper(...)` scans assemblies for classes inheriting from `Profile`.
    2. Controllers/Services inject `IMapper mapper`.
    3. Use `mapper.Map<Target>(source)` for transformation.

### 5. interface-Driven Development
The `Api` project only interacts with service **interfaces** defined in `Abstractions`. Service methods accept and return interfaces.

### 6. Deterministic Codegen
The `Api` project acts as the single source of truth for the frontend via OpenAPI generation.
