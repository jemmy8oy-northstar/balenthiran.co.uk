# Implementation Plan: Newsletter-to-Beta Automation

This plan follows the "Behavioral Flow First" strategy, focusing on a working skeleton before introducing complex external infrastructure.

## Phase 1: The Skeleton (Behavioral Flow)

Goal: Verify the core orchestration and state machine using mock services.

### [ ] Step 1: Database Entities & Migration
- **Tasks**:
    - Add `BetaGroupEntity` to `Balenthiran.EntityModels`.
    - Add `BetaInvitationEntity` to `Balenthiran.EntityModels`.
    - Add `DbSet` properties to `BalenthiranDbContext`.
    - Generate and apply EF Core migration.
- **Checkpoint**: `Commit: persistence: add beta group and invitation entities`

### [ ] Step 2: Interfaces & Mock Services
- **Tasks**:
    - Define `IEmailService` in `Balenthiran.Abstractions`.
    - Define `IAppStoreConnectService` in `Balenthiran.Abstractions`.
    - Implement `ConsoleEmailService` in `Balenthiran.Services` (logs to console).
    - Implement `ImitationAppleService` in `Balenthiran.Services` (simulates API delay/success).
- **Checkpoint**: `Commit: services: add mock email and apple services`

### [ ] Step 3: Core Logic (BetaManagementService)
- **Tasks**:
    - Implement `BetaManagementService.RequestBetaAccessAsync`.
    - Implement `BetaManagementService.ProcessPendingInvitationsAsync`.
    - Add basic unit tests for status transitions (`Requested` -> `Verified` -> `Added`).
- **Checkpoint**: `Commit: logic: implement beta management service skeleton`

### [ ] Step 4: API Integration (Interest Registration)
- **Tasks**:
    - Update `POST /projects/{slug}/interest` to accept `includeBeta`.
    - Trigger `BetaManagementService` from the interest controller.
- **Checkpoint**: `Commit: api: integrate beta recruitment into interest flow`

### [ ] Step 5: Verification Flow Integration
- **Tasks**:
    - Update `SubscriberService` or `VerificationService` to trigger beta processing upon successful email verification.
    - Specialized email CTA: "Verify to secure your beta spot".
- **Checkpoint**: `Commit: flow: bridge email verification and beta onboarding`

---

## Phase 2: Authentication & Plumbing

Goal: Replace mocks with real infrastructure and security.

### [ ] Step 6: Secret Management & JWT Signing
- **Tasks**:
    - Implement `ISecretService` for secure `.p8` key retrieval.
    - Implement JWT signing logic for App Store Connect.
- **Checkpoint**: `Commit: platform: implement secure jwt signing for apple api`

### [ ] Step 7: Real Email Service
- **Tasks**:
    - Implement a real `IEmailService` (SMTP or Provider-based).
    - Configure templates for beta recruitment.
- **Checkpoint**: `Commit: infrastructure: implement real email delivery`

---

## Phase 3: Live Integration & UX

Goal: Connect to Apple and polish the user experience.

### [ ] Step 8: Live App Store Connect Integration
- **Tasks**:
    - Replace `ImitationAppleService` with real `HttpClient` implementation.
    - Handle 409/422 error codes from Apple.
- **Checkpoint**: `Commit: integration: connect to live app store connect api`

### [ ] Step 9: Frontend UI & Feedback
- **Tasks**:
    - Update the "Register Interest" form with the beta checkbox.
    - Add "Beta Full" and transparency messaging.
- **Checkpoint**: `Commit: ui: add beta opt-in and transparency messaging`
