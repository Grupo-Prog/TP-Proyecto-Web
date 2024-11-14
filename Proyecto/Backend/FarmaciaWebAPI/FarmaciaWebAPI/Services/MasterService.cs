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
        public MasterService(IRepository<T_Venta> repository, IMapperBase<MasterDTO, T_Venta> mapper)
        {
            _repo = repository;
            _mapper = mapper;
        }
        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<MasterDTO>?> GetAllAsync()
        {
            return _mapper.Get( await _repo.GetAllAsync());
        }

        public async Task<MasterDTO?> GetByIdAsync(int id)
        {
            return _mapper.Get(await _repo.GetByIdAsync(id));
        }

        public Task<bool> SaveAsync(MasterDTO entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(int id, MasterDTO entity)
        {
            throw new NotImplementedException();
        }
    }
}
