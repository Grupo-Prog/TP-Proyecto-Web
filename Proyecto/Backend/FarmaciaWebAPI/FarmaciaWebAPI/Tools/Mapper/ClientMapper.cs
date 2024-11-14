using DataAccess.Context;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Tools.Mapper
{
    public class ClientMapper : MapperBase<ClientDTO,T_Cliente>
    {
        public T_Cliente? Set(ClientDTO entity)
        {
            return base.Set(entity);
        }
        
        public ClientDTO? Get(T_Cliente entity)
        {
            return base.Get(entity);
        }
        public List<T_Cliente>? Set(List<ClientDTO> entityList)
        {
            return base.Set(entityList);
        }

        public List<ClientDTO>? Get(List<T_Cliente> entityList)
        {
            return base.Get(entityList);
        }
    }
}
