# Project Data Synchronization

This document explains how project metadata (titles, slugs, categories) is managed and synchronized between the filesystem and the database.

## Dual-Tier Project Management

The system manages two types of projects to keep the user-facing portfolio clean while maintaining internal infrastructure.

### 1. Portfolio Projects (`projects.json`)
Located at `backend/Balenthiran.WebApi/Data/projects.json`.
- **Purpose**: These are the "real" apps and deep-dives shown on the website's homepage grid.
- **Management**: Developers add or edit entries in this file. Changes are automatically synced to the database on application startup.

### 2. System Projects (Hardcoded)
Managed within `backend/Balenthiran.WebApi/BackgroundServices/ProjectSyncService.cs`.
- **Purpose**: Utility-only projects used for infrastructure, like the "General" newsletter category.
- **Visibility**: These projects do **not** appear as tiles on the homepage grid. They exist in the database only to support background logic (e.g., linking mailing list interests to a valid project ID).
- **Reasoning**: This prevents the homepage from feeling cluttered with placeholder "projects" that only serve as mailing list segments.

## The Sync Process (`ProjectSyncService`)

On application startup, the `ProjectSyncService` background service performs the following:
1.  **Read Filesystem**: Loads all projects from `projects.json`.
2.  **Define System Projects**: Merges hardcoded system projects (like "General") into the list.
3.  **Database Reconciliation**:
    -   **Matches GUID**: Updates existing records if the Title or Slug has changed.
    -   **New GUID**: Inserts a new record into the `Projects` table.
    -   **LastSyncAt**: Updates the timestamp to track when the metadata was last refreshed.

## Key Identifiers
-   **GUID**: The stable, unique identifier for a project. Used as the foreign key for `Interests` and `Sprints`. **Never change this** if you want to preserve history.
-   **Slug (ID)**: The URL-friendly name (e.g., `apeify`). Used for routing and interest registration lookups.
