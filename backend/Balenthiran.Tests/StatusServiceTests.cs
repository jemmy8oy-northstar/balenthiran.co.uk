using Balenthiran.Services;

namespace Balenthiran.Tests;

/// <summary>
/// Unit tests for the one service with no dependencies. Cheap, but they are the tests that
/// fail first if the DomainStatus/IDomainStatus seam is broken by a refactor.
/// </summary>
public class StatusServiceTests
{
    [Fact]
    public async Task Reports_a_version_and_a_recent_timestamp()
    {
        var before = DateTime.UtcNow;

        var status = await new StatusService().GetSystemStatusAsync();

        Assert.False(string.IsNullOrWhiteSpace(status.Version));
        Assert.InRange(status.LastUpdated, before.AddSeconds(-5), DateTime.UtcNow.AddSeconds(5));
    }

    [Fact]
    public async Task Friendly_status_quotes_the_version_it_reports()
    {
        var status = await new StatusService().GetSystemStatusAsync();

        Assert.Contains(status.Version, status.GetFriendlyStatus());
    }
}
