using AutoMapper;
using Balenthiran.Abstractions.Models;
using Balenthiran.Abstractions.Services;
using Balenthiran.Database;
using Balenthiran.Entities;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.Services;

public class NewsletterService(BalenthiranDbContext dbContext, IMapper mapper) : INewsletterService
{
    public async Task<bool> IsSubscribedAsync(string email)
    {
        return await dbContext.Subscribers.AnyAsync(s => s.Email == email);
    }

    public async Task<IDomainSubscriber?> SubscribeAsync(IDomainSubscriber subscriber)
    {
        if (!subscriber.IsValid())
        {
            return null;
        }

        if (await IsSubscribedAsync(subscriber.Email))
        {
            // Already subscribed, returning the existing one or null depending on requirements
            // For now, let's treat it as a success/noop
            return subscriber;
        }

        var entity = mapper.Map<SubscriberEntity>(subscriber);
        entity.SubscribedAt = DateTime.UtcNow;

        dbContext.Subscribers.Add(entity);
        await dbContext.SaveChangesAsync();

        return mapper.Map<DomainModels.Models.DomainSubscriber>(entity);
    }
}
