using DataAccess.Context;
using DataAccess.Interfaces;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Interfaces
{
    public interface IMasterService : IManager<MasterDTO> , IOrderable<MasterDTO>
    {

    }
}
