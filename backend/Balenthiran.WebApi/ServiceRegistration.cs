using Balenthiran.Abstractions.Services;
using Balenthiran.Services;
using Balenthiran.Database;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.WebApi;

public static class ServiceRegistration
{
    public static void AddBackendServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Database
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<BalenthiranDbContext>(options =>
            options.UseNpgsql(connectionString, b => b.MigrationsAssembly("Balenthiran.Database")));

        // AutoMapper
        services.AddAutoMapper(cfg => cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies()));

        // Business Services
        services.AddScoped<IStatusService, StatusService>();
        services.AddScoped<IInterestService, InterestService>();
    }
}
