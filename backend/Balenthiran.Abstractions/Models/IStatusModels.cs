namespace Balenthiran.Abstractions.Models;

public interface IStatus
{
    string Version { get; set; }
    DateTime LastUpdated { get; set; }
}

public interface IDomainStatus : IStatus
{
    string GetFriendlyStatus();
}
