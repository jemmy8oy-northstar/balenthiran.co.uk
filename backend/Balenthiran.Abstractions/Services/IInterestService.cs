using Balenthiran.Abstractions.Models;

namespace Balenthiran.Abstractions.Services;

public interface IInterestService
{
    Task<IDomainSubscriber?> RegisterInterestAsync(IDomainSubscriber subscriber, string projectSlug);
    Task<bool> IsVerifiedAsync(string email);
}
