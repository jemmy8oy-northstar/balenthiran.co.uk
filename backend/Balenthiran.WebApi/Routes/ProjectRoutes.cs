using Microsoft.AspNetCore.Mvc;

namespace Balenthiran.WebApi.Routes;

public static class ProjectRoutes
{
    public static RouteGroupBuilder MapProjectRoutes(this RouteGroupBuilder parentGroup)
    {
        var group = parentGroup.MapGroup("/projects");

        group.MapGet("/", async () =>
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Data", "projects.json");
            if (!File.Exists(path))
            {
                return Results.NotFound("Projects data not found.");
            }
            
            var json = await File.ReadAllTextAsync(path);
            return Results.Content(json, "application/json");
        })
        .WithName("GetProjects");

        return parentGroup;
    }
}
