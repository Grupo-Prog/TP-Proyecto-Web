using DataAccess.Context;
using DataAccess.Interfaces;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Services
{
    public class MasterService : IManager<MasterDTO>
    {
        private readonly IRepository<T_Venta> _repo;
        private readonly IMapperBase<MasterDTO, T_Venta> _mapper;
        private readonly IManager<ClientDTO> _managerClient;
        public MasterService(IRepository<T_Venta> repository, IMapperBase<MasterDTO, T_Venta> mapper,
            IManager<ClientDTO> manager)
        {
            _repo = repository;
            _mapper = mapper;
            _managerClient = manager;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<List<MasterDTO>?> GetAllAsync()
        {
            return _mapper.Get(await _repo.GetAllAsync());
        }

        public async Task<MasterDTO?> GetByIdAsync(int id)
        {
            return _mapper.Get(await _repo.GetByIdAsync(id));
        }

        public async Task<bool> SaveAsync(MasterDTO dto)
        {
            var entity = _mapper.Set(dto);
            if (entity == null) return false;
            return await _repo.SaveAsync(entity);
        }

        public Task<bool> UpdateAsync(int id, MasterDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
