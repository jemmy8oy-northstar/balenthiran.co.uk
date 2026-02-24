namespace Balenthiran.Abstractions.DataModels;

public interface ISubscriber
{
    string Email { get; set; }
    bool IsVerified { get; set; }
    DateTime CreatedAt { get; set; }
}
