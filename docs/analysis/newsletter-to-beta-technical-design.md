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
    public string Status { get; set; } = "Requested"; // Requested, Invited, Accepted, Full

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? InvitedAt { get; set; }

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

### 2. `BetaManagementService` (New Service)
- **Responsibility**: Business logic for beta recruitment.
- **Methods**:
    - `RequestBetaAccess(int subscriberId, int projectId)`: Creates the `BetaInvitationEntity` and triggers the automation if slots are available.
    - `SyncTesterStatus()`: (Optional) Background task to check if testers accepted invites.

### 3. Updated Routes
- `POST /projects/{slug}/interest`: Update to accept an optional `includeBeta` boolean.
- `GET /projects/{slug}/beta-status`: Returns the remaining spots for the active beta group.

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
