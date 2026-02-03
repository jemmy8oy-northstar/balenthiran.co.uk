---
description: Update a task's title or description and log it to sprint history
---

This workflow uses the `sprint-update.mjs` script to change a task's title or description in both the master data file and the sprint snapshot. It automatically records the change in the sprint log.

**Why this exists**: The sprint system uses frozen snapshots for historical accuracy. When you update a task's name or description, you must update:
1. The master data file (e.g., `devops.json`)
2. The current sprint's snapshot
3. Log the change for visibility

This script handles all three automatically.

// turbo
1. Run the update command:
   `node scripts/sprint-update.mjs <task-id> <field> "<new-value>"`

### Fields
- `title` - The task's display name
- `description` - The task's short description

### Examples
```bash
# Rename a task
node scripts/sprint-update.mjs cd-pipeline title "Local Continuous Deployment"

# Update a description
node scripts/sprint-update.mjs cd-pipeline description "Script-based deployments for rapid iterations."
```

**Note**: This script automatically runs validation after completion to ensure data integrity.
