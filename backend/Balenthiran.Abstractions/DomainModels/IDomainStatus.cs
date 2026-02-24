namespace Balenthiran.Abstractions.DomainModels;

using Balenthiran.Abstractions.DataModels;

public interface IDomainStatus : IStatus
{
    string GetFriendlyStatus();
}
