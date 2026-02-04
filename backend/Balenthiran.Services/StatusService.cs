using Balenthiran.Abstractions.Models;
using Balenthiran.Abstractions.Services;
using Balenthiran.Domain.Models;

namespace Balenthiran.Services;

public class StatusService : IStatusService
{
    public Task<IStatusDomainModel> GetSystemStatusAsync()
    {
        // In a real scenario, we might fetch from DB here
        IStatusDomainModel model = new StatusDomainModel
        {
            Version = "1.1.0-alpha",
            LastUpdated = DateTime.UtcNow
        };
        
        return Task.FromResult(model);
    }
}
