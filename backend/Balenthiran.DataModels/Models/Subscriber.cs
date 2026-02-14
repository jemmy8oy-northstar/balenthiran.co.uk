using Balenthiran.Abstractions.Models;

namespace Balenthiran.DataModels.Models;

public class Subscriber : ISubscriber
{
    public string Email { get; set; } = string.Empty;
    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
}
