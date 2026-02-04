using Balenthiran.Abstractions.Models;

namespace Balenthiran.Data.Models;

public class StatusDataModel : IStatusDataModel
{
    public string Version { get; set; } = "1.0.0";
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}
