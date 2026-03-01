using Balenthiran.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.Database;

public class BalenthiranDbContext(DbContextOptions<BalenthiranDbContext> options) : DbContext(options)
{
    public DbSet<SubscriberEntity> Subscribers => Set<SubscriberEntity>();
    public DbSet<InterestEntity> Interests => Set<InterestEntity>();
    public DbSet<ProjectEntity> Projects => Set<ProjectEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubscriberEntity>()
            .HasIndex(s => s.Email)
            .IsUnique();

        modelBuilder.Entity<ProjectEntity>()
            .HasIndex(p => p.Guid)
            .IsUnique();

        modelBuilder.Entity<ProjectEntity>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        modelBuilder.Entity<InterestEntity>()
            .HasIndex(i => new { i.SubscriberId, i.ProjectId })
            .IsUnique();
    }
}
