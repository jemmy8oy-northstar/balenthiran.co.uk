using Balenthiran.Abstractions.Models;

namespace Balenthiran.Abstractions.Services;

public interface IStatusService
{
    Task<IStatusDomainModel> GetSystemStatusAsync();
}
