using Microsoft.AspNetCore.Mvc;

namespace Balenthiran.WebApi.Routes;

public static class SprintRoutes
{
    public static RouteGroupBuilder MapSprintRoutes(this RouteGroupBuilder parentGroup)
    {
        var group = parentGroup.MapGroup("/sprints");

        group.MapGet("/", async () =>
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Data", "sprints.json");
            if (!File.Exists(path))
            {
                return Results.NotFound("Sprints data not found.");
            }
            
            var json = await File.ReadAllTextAsync(path);
            return Results.Content(json, "application/json");
        })
        .WithName("GetSprints");

        return parentGroup;
    }
}
