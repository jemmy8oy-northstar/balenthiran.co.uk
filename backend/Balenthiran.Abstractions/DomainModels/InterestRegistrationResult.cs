namespace Balenthiran.Abstractions.DomainModels;

public enum RegistrationStatus
{
    Success,
    AlreadyRegistered,
    NotFound,
    Invalid
}

public record InterestRegistrationResult(RegistrationStatus Status, IDomainSubscriber? Subscriber);
