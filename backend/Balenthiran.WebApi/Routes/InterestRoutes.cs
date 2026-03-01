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
            
            return result.Status switch
            {
                RegistrationStatus.Success => Results.Created($"/api/interest/{result.Subscriber?.Email}", mapper.Map<Subscriber>(result.Subscriber)),
                RegistrationStatus.AlreadyRegistered => Results.Ok(new { message = "Already registered", subscriber = mapper.Map<Subscriber>(result.Subscriber) }),
                RegistrationStatus.NotFound => Results.NotFound(new { message = "Project not found" }),
                _ => Results.BadRequest(new { message = "Invalid registration request" })
            };
        })
        .WithName("RegisterInterest");

        group.MapPost("/register-general", async (RegisterInterestRequest request, IInterestService interestService, IMapper mapper) =>
        {
            var domainSubscriber = new DomainSubscriber { Email = request.Email };
            var result = await interestService.RegisterInterestAsync(domainSubscriber, "general");
            
            return result.Status switch
            {
                RegistrationStatus.Success => Results.Created($"/api/interest/{result.Subscriber?.Email}", mapper.Map<Subscriber>(result.Subscriber)),
                RegistrationStatus.AlreadyRegistered => Results.Ok(new { message = "Already registered", subscriber = mapper.Map<Subscriber>(result.Subscriber) }),
                _ => Results.BadRequest(new { message = "Invalid registration request" })
            };
        })
        .WithName("RegisterGeneralInterest");

        return parentGroup;
    }
}
