using AutoMapper;
using Balenthiran.Abstractions.DomainModels;
using Balenthiran.Database;
using Balenthiran.DomainModels.Models;
using Balenthiran.EntityModels;
using Balenthiran.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace Balenthiran.Tests;

/// <summary>
/// Covers every branch of the newsletter sign-up — the only write path in this app, and the one
/// place a regression is visible to a real visitor. Backed by the EF Core in-memory provider so
/// the suite needs no Postgres; the queries involved are simple equality filters, which that
/// provider models faithfully.
/// </summary>
public class InterestServiceTests
{
    private const string KnownSlug = "germy";

    [Fact]
    public async Task Rejects_an_email_that_is_not_an_email()
    {
        await using var db = NewDatabase();
        var service = NewService(db);

        var result = await service.RegisterInterestAsync(new DomainSubscriber { Email = "not-an-email" }, KnownSlug);

        Assert.Equal(RegistrationStatus.Invalid, result.Status);
        Assert.Null(result.Subscriber);
        Assert.Empty(db.Subscribers);
    }

    [Fact]
    public async Task Reports_not_found_for_a_project_that_does_not_exist()
    {
        await using var db = NewDatabase();
        var service = NewService(db);

        var result = await service.RegisterInterestAsync(new DomainSubscriber { Email = "james@example.com" }, "no-such-project");

        Assert.Equal(RegistrationStatus.NotFound, result.Status);
    }

    [Fact]
    public async Task Registers_a_new_subscriber_against_a_project()
    {
        await using var db = NewDatabase();
        var service = NewService(db);

        var result = await service.RegisterInterestAsync(new DomainSubscriber { Email = "james@example.com" }, KnownSlug);

        Assert.Equal(RegistrationStatus.Success, result.Status);
        Assert.Equal("james@example.com", result.Subscriber?.Email);

        var subscriber = Assert.Single(db.Subscribers);
        Assert.False(subscriber.IsVerified);

        var interest = Assert.Single(db.Interests);
        Assert.Equal(subscriber.Id, interest.SubscriberId);
    }

    [Fact]
    public async Task Signing_up_twice_is_reported_and_does_not_duplicate_the_interest()
    {
        await using var db = NewDatabase();
        var service = NewService(db);
        var subscriber = new DomainSubscriber { Email = "james@example.com" };

        await service.RegisterInterestAsync(subscriber, KnownSlug);
        var second = await service.RegisterInterestAsync(subscriber, KnownSlug);

        Assert.Equal(RegistrationStatus.AlreadyRegistered, second.Status);
        Assert.Single(db.Subscribers);
        Assert.Single(db.Interests);
    }

    [Fact]
    public async Task An_empty_slug_means_the_general_newsletter()
    {
        await using var db = NewDatabase();
        var service = NewService(db);

        var result = await service.RegisterInterestAsync(new DomainSubscriber { Email = "james@example.com" }, string.Empty);

        Assert.Equal(RegistrationStatus.Success, result.Status);

        var generalProjectId = db.Projects.Single(p => p.Slug == "general").Id;
        Assert.Equal(generalProjectId, db.Interests.Single().ProjectId);
    }

    [Fact]
    public async Task The_slug_is_matched_case_insensitively()
    {
        await using var db = NewDatabase();
        var service = NewService(db);

        var result = await service.RegisterInterestAsync(new DomainSubscriber { Email = "james@example.com" }, "GeRmY");

        Assert.Equal(RegistrationStatus.Success, result.Status);
    }

    [Fact]
    public async Task One_subscriber_can_follow_two_projects_without_a_second_row()
    {
        await using var db = NewDatabase();
        var service = NewService(db);
        var subscriber = new DomainSubscriber { Email = "james@example.com" };

        await service.RegisterInterestAsync(subscriber, KnownSlug);
        var second = await service.RegisterInterestAsync(subscriber, "general");

        Assert.Equal(RegistrationStatus.Success, second.Status);
        Assert.Single(db.Subscribers);
        Assert.Equal(2, db.Interests.Count());
    }

    [Fact]
    public async Task Is_verified_only_reports_subscribers_who_confirmed()
    {
        await using var db = NewDatabase();
        db.Subscribers.Add(new SubscriberEntity { Email = "confirmed@example.com", IsVerified = true });
        db.Subscribers.Add(new SubscriberEntity { Email = "pending@example.com", IsVerified = false });
        await db.SaveChangesAsync();
        var service = NewService(db);

        Assert.True(await service.IsVerifiedAsync("confirmed@example.com"));
        Assert.False(await service.IsVerifiedAsync("pending@example.com"));
        Assert.False(await service.IsVerifiedAsync("stranger@example.com"));
    }

    /// <summary>
    /// A fresh in-memory database per test — the name is unique, so tests do not share state —
    /// seeded with the two projects the cases above rely on. `general` is the row
    /// ProjectSyncService inserts on every boot; `germy` stands in for a synced project.
    /// </summary>
    private static BalenthiranDbContext NewDatabase()
    {
        var options = new DbContextOptionsBuilder<BalenthiranDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var db = new BalenthiranDbContext(options);
        db.Projects.Add(new ProjectEntity { Guid = Guid.NewGuid(), Slug = "general", Title = "General" });
        db.Projects.Add(new ProjectEntity { Guid = Guid.NewGuid(), Slug = KnownSlug, Title = "Germy" });
        db.SaveChanges();
        return db;
    }

    private static InterestService NewService(BalenthiranDbContext db)
    {
        var mapper = new MapperConfiguration(
            cfg => cfg.AddProfile<Balenthiran.Services.MappingProfile>(),
            NullLoggerFactory.Instance).CreateMapper();

        return new InterestService(db, mapper);
    }
}
