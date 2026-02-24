namespace Balenthiran.Abstractions.Models.DataModels;

public interface IStatus
{
    string Version { get; set; }
    DateTime LastUpdated { get; set; }
}
