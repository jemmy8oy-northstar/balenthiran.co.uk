using Balenthiran.Abstractions.DataModels;
using Balenthiran.Abstractions.DomainModels;

namespace Balenthiran.Abstractions.Services;

public interface IInterestService
{
    Task<InterestRegistrationResult> RegisterInterestAsync(IDomainSubscriber subscriber, string projectSlug);
    Task<bool> IsVerifiedAsync(string email);
}
