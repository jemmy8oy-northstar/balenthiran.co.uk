using Balenthiran.Abstractions.Models;
using Balenthiran.DataModels.Models;

namespace Balenthiran.DomainModels.Models;

public class DomainStatus : Status, IDomainStatus
{
    public string GetFriendlyStatus()
    {
        return $"System is running version {Version} (Updated: {LastUpdated:g})";
    }
}
