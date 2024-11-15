using DataAccess.Context;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Tools.Mapper;

namespace FarmaciaWebAPI.Services
{
    public class ClientService : IManager<ClientDTO>
    {
        private readonly IRepository<T_Cliente> _repo;
        private readonly IMapperBase<ClientDTO, T_Cliente> _mapper;

        public ClientService(IRepository<T_Cliente> clientRepository,
            IMapperBase<ClientDTO, T_Cliente> clientMapper)
        {
            _repo = clientRepository;
            _mapper = clientMapper;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<List<ClientDTO>?> GetAllAsync()
        {
            return _mapper.Get(await _repo.GetAllAsync());
        }

        public async Task<ClientDTO?> GetByIdAsync(int id)
        {
            return _mapper.Get(await _repo.GetByIdAsync(id));
        }
        public async Task<bool> SaveAsync(ClientDTO dto)
        {
            var entity = _mapper.Set(dto);
            if (entity == null) return false;
            return await _repo.SaveAsync(entity);
        }

        public async Task<bool> UpdateAsync(int id, ClientDTO dto)
        {
            var entity = _mapper.Set(dto);
            if (entity == null) return false;
            return await _repo.UpdateAsync(id, entity);
        }
    }
}
