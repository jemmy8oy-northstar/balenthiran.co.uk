using Balenthiran.Abstractions.Models;
using Balenthiran.Data.Models;

namespace Balenthiran.Domain.Models;

public class StatusDomainModel : StatusDataModel, IStatusDomainModel
{
    public string GetFriendlyStatus()
    {
        return $"System is running version {Version} (Updated: {LastUpdated:g})";
    }
}
