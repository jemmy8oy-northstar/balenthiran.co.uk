---
description: Move a task between columns and log it to sprint history
---

This workflow uses the `sprint-move.js` script to update a task's status in the current sprint snapshot and automatically record the movement in the historical log.

// turbo
1. Run the move command:
   `node scripts/sprint-move.js <task-id> "<new-status>"`

### Available Statuses
- **Projects**: `Backlog`, `Planning`, `On Hold`, `On Going - Active`, `On Going - Passive`, `Complete`, `Retired`
- **DevOps/Admin**: `Backlog`, `In Progress`, `Done`
- **YouTube**: `Backlog`, `Needs Editing`, `Needs Thumbnail`, `Uploaded`

### Example
`node scripts/sprint-move.js cd-pipeline "In Progress"`
