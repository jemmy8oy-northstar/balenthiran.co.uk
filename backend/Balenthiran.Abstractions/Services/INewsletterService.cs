using Balenthiran.Abstractions.Models;

namespace Balenthiran.Abstractions.Services;

public interface INewsletterService
{
    Task<IDomainSubscriber?> SubscribeAsync(IDomainSubscriber subscriber);
    Task<bool> IsSubscribedAsync(string email);
}
