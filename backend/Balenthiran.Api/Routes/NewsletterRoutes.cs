using Balenthiran.Abstractions.Services;
using Balenthiran.DataModels.Models;
using Balenthiran.DomainModels.Models;
using AutoMapper;

namespace Balenthiran.Api.Routes;

public static class NewsletterRoutes
{
    public static void MapNewsletterRoutes(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/newsletter/subscribe", async (Subscriber subscriber, INewsletterService newsletterService, IMapper mapper) =>
        {
            // Map DataModel to DomainModel
            var domainSubscriber = mapper.Map<DomainSubscriber>(subscriber);
            
            var result = await newsletterService.SubscribeAsync(domainSubscriber);
            
            if (result == null)
            {
                return Results.BadRequest("Invalid subscriber data or already subscribed.");
            }
            
            // Map DomainModel back to DataModel for response
            return Results.Ok(mapper.Map<Subscriber>(result));
        })
        .WithName("SubscribeToNewsletter")
        .WithOpenApi();
    }
}
