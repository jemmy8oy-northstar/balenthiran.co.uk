using Balenthiran.Abstractions.Models.DataModels;
using Balenthiran.Abstractions.Models.DomainModels;
using Balenthiran.Abstractions.Services;
using Balenthiran.DomainModels.Models;

namespace Balenthiran.Services;

public class StatusService : IStatusService
{
    public Task<IDomainStatus> GetSystemStatusAsync()
    {
        IDomainStatus model = new DomainStatus
        {
            Version = "1.1.0-alpha",
            LastUpdated = DateTime.UtcNow
        };
        
        return Task.FromResult(model);
    }
}
