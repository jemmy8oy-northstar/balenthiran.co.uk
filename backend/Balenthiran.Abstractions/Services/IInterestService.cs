using Balenthiran.Abstractions.Models.DataModels;
using Balenthiran.Abstractions.Models.DomainModels;

namespace Balenthiran.Abstractions.Services;

public interface IInterestService
{
    Task<IDomainSubscriber?> RegisterInterestAsync(IDomainSubscriber subscriber, string projectSlug);
    Task<bool> IsVerifiedAsync(string email);
}
