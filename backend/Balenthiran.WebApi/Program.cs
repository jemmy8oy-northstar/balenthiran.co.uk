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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/scalar/v1");

    // Apply migrations automatically in Dev
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<Balenthiran.Database.BalenthiranDbContext>();
    dbContext.Database.Migrate();
}

app.UseHttpsRedirection();

// Register Route Groups
app.MapGroup("/api")
    .MapStatusRoutes()
    .MapInterestRoutes();

app.Run();
