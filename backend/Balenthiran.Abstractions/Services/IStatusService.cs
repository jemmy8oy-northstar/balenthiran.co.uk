using Balenthiran.Abstractions.DataModels;
using Balenthiran.Abstractions.DomainModels;

namespace Balenthiran.Abstractions.Services;

public interface IStatusService
{
    Task<IDomainStatus> GetSystemStatusAsync();
}
