using Balenthiran.Entities;
using Microsoft.EntityFrameworkCore;

namespace Balenthiran.Database;

public class BalenthiranDbContext(DbContextOptions<BalenthiranDbContext> options) : DbContext(options)
{
    public DbSet<SubscriberEntity> Subscribers => Set<SubscriberEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubscriberEntity>()
            .HasIndex(s => s.Email)
            .IsUnique();
    }
}
