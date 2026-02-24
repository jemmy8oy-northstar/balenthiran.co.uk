namespace Balenthiran.Abstractions.DomainModels;

using Balenthiran.Abstractions.DataModels;

public interface IDomainSubscriber : ISubscriber
{
    bool IsValid();
}
