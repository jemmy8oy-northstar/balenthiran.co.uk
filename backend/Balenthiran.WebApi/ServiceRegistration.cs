using Balenthiran.Abstractions.Services;
using Balenthiran.Services;
using Balenthiran.Database;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.WebApi;

public static class ServiceRegistration
{
    public static void AddBackendServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Database. Registered only when a connection string exists, so the host can boot
        // without Postgres — that is what lets the test project exercise the real HTTP
        // pipeline in-process. Same shape as web-template's ServiceRegistration.
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            Console.WriteLine("[WARNING] No database connection string configured — database features are disabled.");
        }
        else
        {
            services.AddDbContext<BalenthiranDbContext>(options =>
                options.UseNpgsql(connectionString, b => b.MigrationsAssembly("Balenthiran.Database")));
        }

        // AutoMapper
        services.AddAutoMapper(cfg => cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies()));

        // Business Services
        services.AddScoped<IStatusService, StatusService>();
        services.AddScoped<IInterestService, InterestService>();
    }
}
