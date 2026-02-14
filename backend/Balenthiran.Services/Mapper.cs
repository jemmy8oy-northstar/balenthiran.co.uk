using AutoMapper;
using Balenthiran.DomainModels.Models;
using Balenthiran.EntityModels;

namespace Balenthiran.Services;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Entity <-> DomainModel
        CreateMap<SubscriberEntity, DomainSubscriber>().ReverseMap();
    }
}
