using DataAccess.Context;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Tools.Mapper
{
    public class ClientMapper : MapperBase<ClientDTO,T_Cliente>
    {
        public T_Cliente Set(ClientDTO dto)
        {
            if (dto == null) { return null; }
            return base.Set(dto);
        }
        
        public ClientDTO Get(T_Cliente entity)
        {
            if(entity == null) { return null; }
            return base.Get(entity);
        }
        public List<T_Cliente> Set(List<ClientDTO> dtoList)
        {
            if (dtoList == null || dtoList.Count == 0) { return null; }
            return base.Set(dtoList);
        }

        public List<ClientDTO> Get(List<T_Cliente> entityList)
        {
            if (entityList == null || entityList.Count == 0) { return null; }
            return base.Get(entityList);
        }
    }
}
