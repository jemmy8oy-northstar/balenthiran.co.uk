namespace Balenthiran.Abstractions.Models;

public interface ISubscriber
{
    string Email { get; set; }
    bool IsVerified { get; set; }
    DateTime CreatedAt { get; set; }
}

public interface IDomainSubscriber : ISubscriber
{
    bool IsValid();
}
