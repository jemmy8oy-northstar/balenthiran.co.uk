using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace Balenthiran.Tests;

/// <summary>
/// The integration gate: proves the whole host wires up and answers. `/api/status` is the route
/// the front end polls for its health banner, so a failure here is a red banner on the live site.
/// </summary>
public class StatusApiTests
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    [Fact]
    public async Task Get_status_returns_ok_with_a_version()
    {
        using var factory = new ApiFactory();
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/status");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var payload = await response.Content.ReadFromJsonAsync<StatusResponse>(Json);
        Assert.NotNull(payload);
        Assert.False(string.IsNullOrWhiteSpace(payload!.Version));
        Assert.Contains(payload.Version, payload.FriendlyStatus);
    }

    [Fact]
    public async Task An_unknown_route_is_a_404_rather_than_a_crash()
    {
        using var factory = new ApiFactory();
        var client = factory.CreateClient();

        var response = await client.GetAsync("/api/does-not-exist");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    private sealed record StatusResponse(string Version, string FriendlyStatus, DateTime Timestamp);
}
