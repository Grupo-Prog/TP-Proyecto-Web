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
        private readonly IMapperBase<ClientDTO,T_Cliente> _mapper;

        public ClientService(IRepository<T_Cliente> clientRepository, 
            IMapperBase<ClientDTO,T_Cliente> clientMapper)
        {
            _repo = clientRepository;
            _mapper = clientMapper;
        }
        //TO DO cambiar el context
        public async Task<bool> Delete(int id)
        {
            return await _repo.Delete(id);
        }

        public async Task<List<ClientDTO>> GetAll()
        {
            var lst = await _repo.GetAll();
            if(lst == null || lst.Count == 0) return null;
            return _mapper.Get(lst);
        }

        public async Task<ClientDTO> GetById(int id)
        {
            var value = await _repo.GetById(id);
            if (value == null) return null;
            return _mapper.Get(value);
        }

        public async Task<bool> Save(ClientDTO dto)
        {
            var entity = _mapper.Set(dto);
            if(entity == null) return false;
            return await _repo.Save(entity);
        }

        public async Task<bool> Update(int id, ClientDTO dto)
        {
            var entity = _mapper.Set(dto);
            if(entity == null) return false;
            entity.Id = id;
            return await _repo.Update(entity);
        }
    }
}
