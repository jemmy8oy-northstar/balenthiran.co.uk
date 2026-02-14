using AutoMapper;
using Balenthiran.DataModels.Models;
using Balenthiran.DomainModels.Models;

namespace Balenthiran.Api;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // DataModel <-> DomainModel
        CreateMap<Status, DomainStatus>().ReverseMap();
        CreateMap<Subscriber, DomainSubscriber>().ReverseMap();
    }
}
