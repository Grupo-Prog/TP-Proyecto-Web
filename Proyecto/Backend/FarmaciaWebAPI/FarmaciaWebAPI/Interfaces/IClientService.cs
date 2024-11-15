using DataAccess.Interfaces;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Services
{
    public interface IClientService : IManager<ClientDTO> , IOrderable<ClientDTO>
    {
    }
}