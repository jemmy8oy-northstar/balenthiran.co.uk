using Balenthiran.Abstractions.Models.DataModels;
using Balenthiran.Abstractions.Models.DomainModels;

namespace Balenthiran.Abstractions.Services;

public interface IStatusService
{
    Task<IDomainStatus> GetSystemStatusAsync();
}
