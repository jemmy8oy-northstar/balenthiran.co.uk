---
description: Move a task between columns and log it to sprint history
---

This workflow uses the `sprint-move.mjs` script to update a task's status in the current sprint snapshot and automatically record the movement in the historical log. It also performs an immediate data integrity check.

// turbo
1. Run the move command:
   `node scripts/sprint-move.mjs <task-id> "<new-status>"`

### Available Statuses
- **Projects**: `Backlog`, `Planning`, `On Hold`, `On Going - Active`, `On Going - Passive`, `Complete`, `Retired`
- **DevOps/Admin**: `Backlog`, `In Progress`, `Done`
- **YouTube**: `Backlog`, `Needs Editing`, `Needs Thumbnail`, `Uploaded`

**Note**: This script automatically runs `node scripts/validate-sprints.mjs` after completion to ensure parity.
