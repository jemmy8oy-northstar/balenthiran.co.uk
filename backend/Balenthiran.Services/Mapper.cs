using AutoMapper;
using Balenthiran.DomainModels.Models;
using Balenthiran.Entities;

namespace Balenthiran.Services;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Entity <-> DomainModel
        CreateMap<SubscriberEntity, DomainSubscriber>().ReverseMap();
    }
}
