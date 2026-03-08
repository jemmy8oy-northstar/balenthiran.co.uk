# Newsletter-to-Beta Automation Design

## Overview
Automate the transition from interested newsletter subscribers to active beta testers on TestFlight (iOS) using the App Store Connect API.

## Core Flow
1. **Admin Configuration**:
   - Admin sets up a "Beta Project" in the backend.
   - Links the project to an **App ID** and a **Beta Group ID** (Testing Group) from App Store Connect.
2. **Invitation Campaign**:
   - System sends a targeted email to the `Newsletter` list for that project.
   - Email contains a link to a "Claim Beta Access" page on `balenthiran.co.uk`.
3. **Mandatory Verification**:
   - Backend checks `Subscriber.IsVerified`.
   - **User Transparency**: Form shows a message: *"Note: You will need to verify your email before we can add you to the TestFlight beta."*
   - If not verified, triggers the standard email verification flow.
   - **Refined CTA**: The verification email subject/body specifically says: *"Verify your email to complete your Beta registration"*.
   - Only once `IsVerified == true`, the "Join Beta" button becomes active or the automation proceeds.
4. **The "Handshake" (Web Page)**:
   - User clicks "Join Beta".
   - Backend receives the request (email + project slug).
   - Backend calls the **App Store Connect API**.
4. **App Store Connect Automation**:
   - **Step A**: Ensure the tester exists (`POST /v1/betaTesters`).
   - **Step B**: Add the tester to the specific Beta Group (`POST /v1/betaGroups/{id}/relationships/betaTesters`).
5. **Apple-Side Fulfillment**:
   - Apple automatically sends the TestFlight discovery email.
   - User accepts and downloads via the TestFlight app.

## User Experience Refinements
- **Landing Page Integration**:
  - Convert "Register Interest" form to a dual-purpose "Register Interest & Join Beta" form.
  - **Checkbox**: `[ ] Invite me to the iOS Beta (TestFlight)`
- **Capacity Handing**:
  - Check the current tester count in the Beta Group via API.
  - TestFlight limit is usually **10,000** external testers.
  - **Dynamic UI**: If the group is full, the checkbox is disabled or replaced with "Beta Full - Sign up for Launch Alerts".
- **Confirmation Flow**:
  - Success message: *"Check your inbox! Apple will send a TestFlight invitation to [email] shortly."*

## Technical Requirements
- **App Store Connect API**: Requires a JWT created with an **Issuer ID**, **Key ID**, and **Private Key (.p8 file)**.
- **Backend Service**:
  - A background service or dedicated endpoint to handle the Apple API "handshake".
  - Secure storage for Apple API secrets (Environment Variables/K8s Secrets).
- **Rate Limiting**: Implementation should handle potential Apple API throttling.

## Open Questions & Verification
1. **Tester ID**: Does Apple require the tester's First/Last name? (Often not required, but API allows it).
2. **Group Auto-Invite**: Verify that adding to a relationship automatically triggers the invite email (99% sure it does).
3. **Tester Lifecycle**: Confirm if `POST /v1/betaTesters` is required for every app even if the user is already a tester for another app in the same developer account.
4. **Verification Pre-requisite**: Ensure the system handles users who request alpha/beta access *during* their initial signup (Verification -> Interest -> Beta).

## Why this approach is powerful:
- **Exclusivity**: "Only 10,000 spots" creates a genuine incentive for early signup.
- **Consistency**: Centralizes user management in your own dashboard while leveraging Apple's delivery infrastructure.
- **Automation**: Removes the manual burden of copy-pasting emails into the Apple developer portal.
