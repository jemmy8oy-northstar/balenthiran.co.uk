# Newsletter-to-Beta Technical Design

## Database Entities

Based on the existing schema (`SubscriberEntity`, `ProjectEntity`, `InterestEntity`), we need to add the following entities to `Balenthiran.EntityModels`:

### 1. `BetaGroupEntity`
This entity stores the configuration for a specific TestFlight (or Google Play) beta group.

```csharp
public class BetaGroupEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ProjectId { get; set; }

    [Required]
    public string AppStoreConnectId { get; set; } = string.Empty; // Group ID from Apple

    [Required]
    public string Name { get; set; } = string.Empty; // e.g., "Early Adopters"

    public int MaxTesters { get; set; } = 10000;

    public bool IsActive { get; set; } = true;

    // Navigation property
    [ForeignKey(nameof(ProjectId))]
    public virtual ProjectEntity Project { get; set; } = null!;
}
```

### 2. `BetaInvitationEntity`
Tracks the relationship between a subscriber and their beta access status.

```csharp
public class BetaInvitationEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int SubscriberId { get; set; }

    [Required]
    public int BetaGroupId { get; set; }

    [Required]
    public string Status { get; set; } = "Requested"; // Requested, Verified, Added, Failed

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? AddedAt { get; set; }

    // Navigation properties
    [ForeignKey(nameof(SubscriberId))]
    public virtual SubscriberEntity Subscriber { get; set; } = null!;

    [ForeignKey(nameof(BetaGroupId))]
    public virtual BetaGroupEntity BetaGroup { get; set; } = null!;
}
```
## Email Infrastructure (Missing Plumbing)

Currently, the backend lacks a centralized email service. To support automated invitations, we need:

1. **`IEmailService` Interface**:
   - `Task SendBetaInviteAsync(string email, string projectTitle, string inviteUrl)`
2. **Implementation**:
   - Initial version can use a simple SMTP client or integrate with a provider like Postmark/SendGrid/AWS SES.
3. **Templates**:
   - HTML/Text templates for the invitation email, focusing on the "First Come First Serve" urgency.

---

## Backend Components

### 1. `AppStoreConnectService` (New Service)
- **Responsibility**: Interface with Apple's API.
- **Methods**:
    - `Task<int> GetGroupTesterCount(string groupId)`
    - `Task AddTesterToGroup(string email, string groupId)`
- **Tech**: Uses `HttpClient` with JWT authentication (Private Key .p8).
- **JWT Signing**: 
    - Requires `Microsoft.IdentityModel.Tokens` and `System.IdentityModel.Tokens.Jwt`.
    - Token lifespan should be short (e.g., 20 mins) as per Apple's requirements.
    - Payload must include `iss` (Issuer ID), `iat` (Issued at), `exp` (Expiration), `aud` (`appstoreconnect-v1`), and `bid` (Bundle ID - optional but good).
- **Error Mapping**:
    - `409 CONFLICT`: User already exists or is already in the group. (Action: Update local DB to "Invited").
    - `422 UNPROCESSABLE_ENTITY`: Invalid email format at Apple's level. (Action: Log and notify Admin).
    - `401 / 403`: JWT signing issues or permission shifts. (Action: Critical Alert).

### 2. `BetaManagementService` (New Service)
- **Responsibility**: Business logic for beta recruitment.
- **Methods**:
    - `RequestBetaAccess(int subscriberId, int projectId)`: Creates the `BetaInvitationEntity` and triggers the automation if slots are available.
    - `ProcessPendingInvitations()`: A simple background worker that picks up `Verified` requests and pushes them to Apple.

### 3. Updated Routes
- `POST /projects/{slug}/interest`: Update to accept an optional `includeBeta` boolean.
- `GET /projects/{slug}/beta-status`: Returns the remaining spots for the active beta group.

---

## State Management (Simplified)

We will adopt a **"Fire and Forget"** approach for the Apple integration:

1. **Local State**: We track our *intent* and the *result* of the API call.
2. **Success**: Once `AppStoreConnectService.AddTesterToGroup` returns success, we mark the local invitation as `Added`.
3. **No Polling**: We will **not** poll Apple to see if the user opened the email or accepted the invite. We assume that if the API call succeeded, Apple's infrastructure will handle the rest.
4. **Re-runs**: If an invitation is in `Failed` state, the Admin can manually trigger a retry.

---

## Data Flow Diagram (Draft)

1. **User** submits Form -> `balenthiran.co.uk`
2. **Web API** creates `Subscriber` & `Interest`.
4. **Verification Guard**:
    - Backend validates `Subscriber.IsVerified`.
    - If `false`, sends a specialized verification email with CTA: *"Verify your email to secure your beta spot"*.
    - The UI informs the user: *"Check your email to verify your account and proceed to the beta program."*
    - Upon `IsVerified` update, resumes the beta invitation flow.
5. **Background Service**:
    - Calls `AppStoreConnectService.AddTesterToGroup`.
    - Updates `BetaInvitation(Status: Invited, InvitedAt: Now)`.
6. **Apple** sends email to user.

---

## Future Extension: User Self-Service (Backlog)

To put the user in control, we will implement a **Subscriber Profile Page** where users can:
- **View All Interests**: See which apps they are currently "Watching".
- **Manage Beta Access**: Opt-in or out of specific TestFlight groups.
- **Unsubscribe**: Centralized management for all project-specific newsletters.
- **Security**: Access will be controlled via unique, single-use magic links sent to their verified email (leveraging the existing verification infrastructure).
