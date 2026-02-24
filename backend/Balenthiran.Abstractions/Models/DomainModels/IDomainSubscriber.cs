namespace Balenthiran.Abstractions.Models.DomainModels;

using Balenthiran.Abstractions.Models.DataModels;

public interface IDomainSubscriber : ISubscriber
{
    bool IsValid();
}
