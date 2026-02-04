using Balenthiran.Abstractions.Services;
using Balenthiran.Services;
using Balenthiran.Abstractions.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI Setup
builder.Services.AddScoped<IStatusService, StatusService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Routes
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

app.Run();
