using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Balenthiran.Tests;

/// <summary>
/// Boots the real WebApi in-process, so the HTTP routes are exercised end to end — routing, DI,
/// model binding, status codes, serialisation — with no external dependency. Running outside the
/// Development environment means no appsettings.Development.json connection string is picked up,
/// so the app skips its database registration and starts DB-free.
/// </summary>
public sealed class ApiFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
    }
}
