using Scalar.AspNetCore;
using Balenthiran.WebApi;
using Balenthiran.WebApi.Routes;

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
}

app.UseHttpsRedirection();

// Register Route Groups
app.MapStatusRoutes();
app.MapNewsletterRoutes();

app.Run();
