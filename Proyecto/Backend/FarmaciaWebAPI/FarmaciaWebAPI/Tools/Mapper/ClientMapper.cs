using DataAccess.Models;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Tools.Mapper
{
    public class ClientMapper : MapperBase<ClientDTO,ModeloCliente>
    {
        public ModeloCliente Set(ClientDTO dto)
        {
            if (dto == null) { return null; }
            return base.Set(dto);
        }
        
        public ClientDTO Get(ModeloCliente entity)
        {
            if(entity == null) { return null; }
            return base.Get(entity);
        }
        public List<ModeloCliente> Set(List<ClientDTO> dtoList)
        {
            if (dtoList == null || dtoList.Count == 0) { return null; }
            return base.Set(dtoList);
        }

        public List<ClientDTO> Get(List<ModeloCliente> entityList)
        {
            if (entityList == null || entityList.Count == 0) { return null; }
            return base.Get(entityList);
        }
    }
}
