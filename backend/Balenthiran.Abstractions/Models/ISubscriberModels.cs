namespace Balenthiran.Abstractions.Models;

public interface ISubscriber
{
    string Email { get; set; }
    DateTime SubscribedAt { get; set; }
}

public interface IDomainSubscriber : ISubscriber
{
    bool IsValid();
}
