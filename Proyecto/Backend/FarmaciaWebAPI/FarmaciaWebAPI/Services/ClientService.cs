using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Repositories;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;
using FarmaciaWebAPI.Tools.Mapper;

namespace FarmaciaWebAPI.Services
{
    public class ClientService : IManager<ClientDTO>
    {
        private readonly IRepository<ModeloCliente> _repo;
        private readonly IMapperBase<ClientDTO,ModeloCliente> _mapper;

        public ClientService(IRepository<ModeloCliente> clientRepository, 
            IMapperBase<ClientDTO,ModeloCliente> clientMapper)
        {
            _repo = clientRepository;
            _mapper = clientMapper;
        }
        //TO DO
        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ClientDTO>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<ClientDTO> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save(ClientDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(int id, ClientDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
