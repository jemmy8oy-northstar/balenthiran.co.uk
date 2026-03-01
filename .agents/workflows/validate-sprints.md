---
description: Validate that sprint snapshots are in sync with movement logs
---

This workflow runs the validation script to ensure that the `boardSnapshots` in `sprints.json` perfectly match the derivation from the `changes` history.

// turbo
1. Run the validation:
   `node frontend/scripts/validate-sprints.mjs`

If errors are found, the script will point to the exact mismatch between logs and snapshots.
