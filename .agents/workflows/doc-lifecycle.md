---
description: how to manage the documentation lifecycle (Analysis -> Plan -> Spec)
---

This workflow ensures our documentation remains accurate and relevant as features evolve.

### 1. Analysis Phase
- **Action**: Create a new document in `docs/analysis/[feature-name].md`.
- **Purpose**: Tackle unknowns, research APIs, define high-level design, and provide estimates.
- **Rule**: Stay in this phase until the "What" and "How" are clear.

### 2. Planning Phase
- **Action**: Create a document in `docs/plan/[feature-name].md`.
- **Purpose**: Break the feature into granular tasks and commit checkpoints.
- **Rule**: This acts as the checklist during the execution phase.

### 3. Specification (Spec) Phase
- **Action**: Once the feature is code-complete and verified, consolidate the Analysis and Planning notes into `docs/specs/[feature-name].md`.
- **Purpose**: Document the final, as-built state for future reference.
- **Rule**: Delete the original files from `analysis/` and `plan/` once consolidated into `specs/`.

### 4. Global Documents
- Core vision, architecture overviews, and AI instructions remain in the `docs/` root for immediate visibility.
