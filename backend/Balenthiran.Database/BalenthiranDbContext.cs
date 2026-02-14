using Balenthiran.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.Database;

public class BalenthiranDbContext(DbContextOptions<BalenthiranDbContext> options) : DbContext(options)
{
    public DbSet<SubscriberEntity> Subscribers => Set<SubscriberEntity>();
    public DbSet<ProjectEntity> Projects => Set<ProjectEntity>();
    public DbSet<InterestEntity> Interests => Set<InterestEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubscriberEntity>()
            .HasIndex(s => s.Email)
            .IsUnique();

        modelBuilder.Entity<ProjectEntity>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        modelBuilder.Entity<InterestEntity>()
            .HasIndex(i => new { i.SubscriberId, i.ProjectId })
            .IsUnique();

        // Seed initial projects
        modelBuilder.Entity<ProjectEntity>().HasData(
            new ProjectEntity { Id = 1, Name = "General", Slug = "general" },
            new ProjectEntity { Id = 2, Name = "Earn Your Beers", Slug = "earn-your-beers" },
            new ProjectEntity { Id = 3, Name = "APEify", Slug = "apeify" },
            new ProjectEntity { Id = 4, Name = "House Price Alerts", Slug = "house-price-alerts" },
            new ProjectEntity { Id = 5, Name = "Personal Habit Tracker", Slug = "habit-tracker" },
            new ProjectEntity { Id = 6, Name = "Commuter House Search", Slug = "commuter-house-search" }
        );
    }
}
