---
name: Sprint Management
description: "Guidelines and tools for managing the 'Build-in-Public' data (sprints.json and projects.json)."
---

# Sprint Management Skill

This skill provides the necessary context and tools to maintain the integrity of the `sprints.json` and `projects.json` files, which drive the "Big Board" and "Sprint History" on the website.

## Core Data Locations

- **Sprints**: `backend/Balenthiran.WebApi/Data/sprints.json`
- **Projects**: `backend/Balenthiran.WebApi/Data/projects.json`

## Commands

Use the following scripts to perform common operations. These scripts automatically handle data integrity and log movements.

### 1. Move a Task
Move a task between columns in the current sprint.
```bash
node scripts/sprint-move.mjs <task-id> "<new-status>"
```
*Note: This automatically records the 'change' in the current sprint history.*

### 2. Update Task Metadata
Update the title or description of a task.
```bash
node scripts/sprint-update.mjs <task-id> <field> "<newValue>"
# field: title | description
```

### 3. Validate Consistency
Ensure all snapshots are in sync with the historical change logs.
```bash
node scripts/validate-sprints.mjs
```

## Best Practices

1. **Always use the scripts**: Never edit `sprints.json` manually unless absolutely necessary. The scripts ensure that `changes` are logged and `boardSnapshots` are updated correctly.
2. **Identify the Active Sprint**: The active sprint is typically the last item in the array.
3. **Status Consistency**: Use the correct status strings for the respective board categories (see `.agent/workflows/move-task.md` for the list).
4. **Project Status Sync**: If a project's status changes in `sprints.json`, the script will attempt to update the corresponding entry in `projects.json` as well.
