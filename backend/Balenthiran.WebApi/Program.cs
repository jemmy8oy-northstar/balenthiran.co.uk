using Scalar.AspNetCore;
using Balenthiran.WebApi;
using Balenthiran.WebApi.Routes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container (Centralized DI)
builder.Services.AddBackendServices(builder.Configuration);

// Standard API setup
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddHostedService<Balenthiran.WebApi.BackgroundServices.ProjectSyncService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/scalar/v1");
}

// Apply migrations automatically on startup — unless there is no database configured, in
// which case the app still serves the routes that don't need one.
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetService<Balenthiran.Database.BalenthiranDbContext>();
    if (dbContext is null)
        app.Logger.LogWarning("Skipping database migration — no connection string configured.");
    else
        dbContext.Database.Migrate();
}

app.UseHttpsRedirection();

// Register Route Groups
app.MapGroup("/api")
    .MapStatusRoutes()
    .MapInterestRoutes()
    .MapProjectRoutes()
    .MapSprintRoutes()
    .WithOpenApi();

app.Run();

// Exposed so the test project can boot the real host in-process via
// WebApplicationFactory<Program> (top-level statements make Program internal by default).
public partial class Program;
