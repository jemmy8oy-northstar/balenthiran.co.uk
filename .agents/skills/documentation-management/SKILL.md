---
name: Documentation Management
description: "Guidelines for the documentation lifecycle (Analysis -> Plan -> Spec)."
---

# Documentation Management Skill

This skill ensures that project documentation evolves in sync with the code, providing a clear audit trail from initial ideation to final specification.

## The Lifecycle

All new features or major changes must pass through these three phases:

### 1. Analysis Phase (`docs/analysis/`)
- **When**: Starting a new task with unknowns.
- **Content**: API research, high-level design, technical spikes, and complexity estimates.
- **Goal**: Resolve all "how" and "what" questions.

### 2. Planning Phase (`docs/plan/`)
- **When**: Implementing a feature that has completed analysis.
- **Content**: Granular task lists, commit-by-commit checkpoints, and verification steps.
- **Goal**: Provide a roadmap for the execution phase.

### 3. Specification Phase (`docs/specs/`)
- **When**: Feature is code-complete and pushed to main.
- **Content**: Consolidated information from Analysis and Plan, documented as the final "as-built" state.
- **Goal**: Long-term reference.
- **Cleanup**: Delete the corresponding files in `analysis/` and `plan/` once the Spec is created.

## Best Practices

1. **Keep Specs Updated**: If a feature changes after it's in `specs/`, update the spec directly or create a new Analysis doc if the change is major.
2. **Directory Hygiene**: Regularly check `analysis/` and `plan/` to ensure completed work has been moved to `specs/`.
3. **Internal Links**: Use relative links between documents in the same phase to maintain context.
