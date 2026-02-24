namespace Balenthiran.Abstractions.Models.DomainModels;

using Balenthiran.Abstractions.Models.DataModels;

public interface IDomainStatus : IStatus
{
    string GetFriendlyStatus();
}
