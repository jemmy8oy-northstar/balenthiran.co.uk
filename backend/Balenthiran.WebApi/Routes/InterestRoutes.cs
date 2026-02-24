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
    public static RouteGroupBuilder MapInterestRoutes(this RouteGroupBuilder parentGroup)
    {
        var group = parentGroup.MapGroup("/interest");

        group.MapPost("/register/{projectSlug}", async (string projectSlug, RegisterInterestRequest request, IInterestService interestService, IMapper mapper) =>
        {
            var domainSubscriber = new DomainSubscriber { Email = request.Email };
            
            var result = await interestService.RegisterInterestAsync(domainSubscriber, projectSlug);
            
            if (result == null)
            {
                return Results.BadRequest("Invalid registration request.");
            }
            
            return Results.Ok(mapper.Map<Subscriber>(result));
        })
        .WithName("RegisterInterest")
        .WithOpenApi();

        group.MapPost("/register-general", async (RegisterInterestRequest request, IInterestService interestService, IMapper mapper) =>
        {
            var domainSubscriber = new DomainSubscriber { Email = request.Email };
            
            var result = await interestService.RegisterInterestAsync(domainSubscriber, "general");
            
            if (result == null)
            {
                return Results.BadRequest("Invalid registration request.");
            }
            
            return Results.Ok(mapper.Map<Subscriber>(result));
        })
        .WithName("RegisterGeneralInterest")
        .WithOpenApi();

        return parentGroup;
    }
}
