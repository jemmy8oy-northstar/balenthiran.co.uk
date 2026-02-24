using Balenthiran.Abstractions.DomainModels;
using Balenthiran.DataModels.Models;
using System.Text.RegularExpressions;

namespace Balenthiran.DomainModels.Models;

public partial class DomainSubscriber : Subscriber, IDomainSubscriber
{
    public bool IsValid()
    {
        if (string.IsNullOrWhiteSpace(Email)) return false;
        
        // Basic email regex
        return EmailRegex().IsMatch(Email);
    }

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")]
    private static partial Regex EmailRegex();
}
