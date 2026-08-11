using System.Text.Json;
using Balenthiran.Database;
using Balenthiran.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.WebApi.BackgroundServices;

public class ProjectSyncService(IServiceProvider serviceProvider, ILogger<ProjectSyncService> logger) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("ProjectSyncService is starting...");

        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetService<BalenthiranDbContext>();
        if (dbContext is null)
        {
            logger.LogWarning("Skipping project sync — no database configured.");
            return;
        }

        var dataPath = Path.Combine(AppContext.BaseDirectory, "Data", "projects.json");
        if (!File.Exists(dataPath))
        {
            logger.LogWarning("Projects data file not found at {Path}", dataPath);
            return;
        }

        try
        {
            var systemProjects = new List<ProjectJsonModel>
            {
                new() { Id = "general", Guid = "F8A77272-6F9C-403E-9862-1872AAC4E194", Title = "General" }
            };

            var json = await File.ReadAllTextAsync(dataPath, cancellationToken);
            var projects = JsonSerializer.Deserialize<List<ProjectJsonModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new();

            // Merge system projects with JSON projects
            var allProjects = systemProjects.Concat(projects).ToList();

            foreach (var proj in allProjects)
            {
                if (!Guid.TryParse(proj.Guid, out var projectGuid))
                {
                    logger.LogWarning("Invalid GUID for project {Id}", proj.Id);
                    continue;
                }

                var existing = await dbContext.Projects.FirstOrDefaultAsync(p => p.Guid == projectGuid, cancellationToken);

                if (existing == null)
                {
                    logger.LogInformation("Adding new project: {Title} ({Guid})", proj.Title, projectGuid);
                    dbContext.Projects.Add(new ProjectEntity
                    {
                        Guid = projectGuid,
                        Slug = proj.Id, // 'id' in JSON is the slug
                        Title = proj.Title,
                        LastSyncAt = DateTime.UtcNow
                    });
                }
                else
                {
                    // Update metadata if changed
                    if (existing.Slug != proj.Id || existing.Title != proj.Title)
                    {
                        logger.LogInformation("Updating project: {Title} ({Guid})", proj.Title, projectGuid);
                        existing.Slug = proj.Id;
                        existing.Title = proj.Title;
                        existing.LastSyncAt = DateTime.UtcNow;
                    }
                }
            }

            await dbContext.SaveChangesAsync(cancellationToken);
            logger.LogInformation("Project sync completed successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred during project sync.");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private class ProjectJsonModel
    {
        public string Id { get; set; } = string.Empty;
        public string Guid { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
