using DataAccess.Context;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Services
{
    public class MasterService : IMasterService
    {
        private readonly IMasterRepository _repo;
        private readonly IMapperBase<MasterDTO, T_Venta> _mapper;
        public MasterService(IMasterRepository repository, IMapperBase<MasterDTO, T_Venta> mapper)
        {
            _repo = repository;
            _mapper = mapper;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }
        public async Task<List<MasterDTO>?> IsOrdered(bool order)
        {
            if (order == true)
            {
                return _mapper.Get(await _repo.GetOrderedAsync());
            }
            return await GetAllAsync();
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

        public async Task<bool> UpdateAsync(int id, MasterDTO dto)
        {
            var entity = _mapper.Set(dto);
            if (entity == null) return false;
             return await _repo.UpdateAsync(id, entity);
        }
    }
}
