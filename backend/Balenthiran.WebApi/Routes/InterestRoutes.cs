using Balenthiran.Abstractions.DomainModels;
using Balenthiran.Abstractions.DataModels;
using Balenthiran.Abstractions.Services;
using Balenthiran.DataModels.Models;
using Balenthiran.DomainModels.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Balenthiran.WebApi.Routes;

public static class InterestRoutes
{
    public static void MapInterestRoutes(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/interest/register", async (Subscriber subscriber, [FromQuery] string projectSlug, IInterestService interestService, IMapper mapper) =>
        {
            var domainSubscriber = mapper.Map<DomainSubscriber>(subscriber);
            
            var result = await interestService.RegisterInterestAsync(domainSubscriber, projectSlug);
            
            if (result == null)
            {
                return Results.BadRequest("Invalid registration request.");
            }
            
            return Results.Ok(mapper.Map<Subscriber>(result));
        })
        .WithName("RegisterInterest")
        .WithOpenApi();
    }
}
