using Balenthiran.Abstractions.Services;

namespace Balenthiran.Api.Routes;

public static class StatusRoutes
{
    public static void MapStatusRoutes(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/status", async (IStatusService statusService) =>
        {
            var status = await statusService.GetSystemStatusAsync();
            return Results.Ok(new {
                version = status.Version,
                friendlyStatus = status.GetFriendlyStatus(),
                timestamp = status.LastUpdated
            });
        })
        .WithName("GetStatus")
        .WithOpenApi();
    }
}
