namespace Balenthiran.Abstractions.Models;

public interface IStatusDataModel
{
    string Version { get; set; }
    DateTime LastUpdated { get; set; }
}

public interface IStatusDomainModel : IStatusDataModel
{
    string GetFriendlyStatus();
}
