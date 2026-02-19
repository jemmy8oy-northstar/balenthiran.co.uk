---
description: Proactively create the next sprint container in sprints.json
---

When the current sprint is nearing completion or at the user's request, use this workflow to ensure the "Big Board" has a future container.

1.  Identify the ID and dates for the next sprint (usually 2-week intervals).
2.  Locate the `boardSnapshots` of the *most recent* sprint in `frontend/src/data/sprints.json`.
3.  Add a new entry to the end of the JSON array:
    *   Set the `id`, `startDate`, and `endDate`.
    *   Initialize `goals` and `changes` as empty arrays `[]`.
    *   Copy the `boardSnapshots` from the previous sprint to represent the starting state of the next.
4.  Proactively ask the user for the high-level goals of this new sprint.
