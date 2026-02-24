using AutoMapper;
using Balenthiran.Abstractions.DomainModels;
using Balenthiran.Abstractions.Services;
using Balenthiran.Database;
using Balenthiran.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.Services;

public class InterestService(BalenthiranDbContext dbContext, IMapper mapper) : IInterestService
{
    public async Task<bool> IsVerifiedAsync(string email)
    {
        return await dbContext.Subscribers.AnyAsync(s => s.Email == email && s.IsVerified);
    }

    public async Task<IDomainSubscriber?> RegisterInterestAsync(IDomainSubscriber subscriber, string projectSlug)
    {
        if (!subscriber.IsValid())
        {
            return null;
        }

        // 1. Get or Create Subscriber
        var subscriberEntity = await dbContext.Subscribers
            .FirstOrDefaultAsync(s => s.Email == subscriber.Email);

        if (subscriberEntity == null)
        {
            subscriberEntity = mapper.Map<SubscriberEntity>(subscriber);
            subscriberEntity.CreatedAt = DateTime.UtcNow;
            dbContext.Subscribers.Add(subscriberEntity);
            await dbContext.SaveChangesAsync();
        }

        // 2. Link Interest (if not already linked)
        var finalSlug = string.IsNullOrEmpty(projectSlug) ? "general" : projectSlug;
        
        var existingInterest = await dbContext.Interests
            .AnyAsync(i => i.SubscriberId == subscriberEntity.Id && i.ProjectSlug.ToLower() == finalSlug.ToLower());

        if (!existingInterest)
        {
            var interest = new InterestEntity
            {
                SubscriberId = subscriberEntity.Id,
                ProjectSlug = finalSlug,
                CreatedAt = DateTime.UtcNow
            };
            dbContext.Interests.Add(interest);
            await dbContext.SaveChangesAsync();
        }

        return mapper.Map<DomainModels.Models.DomainSubscriber>(subscriberEntity);
    }
}
