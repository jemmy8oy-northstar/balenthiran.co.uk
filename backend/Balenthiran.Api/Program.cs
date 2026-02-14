using Balenthiran.Api;
using Balenthiran.Api.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container (Centralized DI)
builder.Services.AddBackendServices(builder.Configuration);

// Standard API setup
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Register Route Groups
app.MapStatusRoutes();
app.MapNewsletterRoutes();

app.Run();
