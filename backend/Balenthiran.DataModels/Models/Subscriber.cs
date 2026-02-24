using Balenthiran.Abstractions.DataModels;

namespace Balenthiran.DataModels.Models;

public class Subscriber : ISubscriber
{
    public string Email { get; set; } = string.Empty;
    public bool IsVerified { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
