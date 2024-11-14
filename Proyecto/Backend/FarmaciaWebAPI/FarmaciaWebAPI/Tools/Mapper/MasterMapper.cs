using DataAccess.Context;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.DTOs;


namespace FarmaciaWebAPI.Tools.Mapper
{
    public class MasterMapper : MapperBase<MasterDTO, T_Venta>
    {
        private readonly IMapperBase<ClientDTO, T_Cliente> _mapperClient;
        private readonly DetailMapper _mapperDetail;
        public MasterMapper(IMapperBase<ClientDTO, T_Cliente> mapperClient,
            DetailMapper mapperDetail)
        {
            _mapperClient = mapperClient;
            _mapperDetail = mapperDetail;
        }
        public override MasterDTO? Get(T_Venta? entity)
        {
            if (entity == null) { return null; }
            var dto = new MasterDTO()
            {
                Id = entity.Id,
                Fecha = entity.Fecha,
                TotalVenta = entity.TotalVenta,
                Cliente = _mapperClient.Get(entity.cod_clienteNavigation),
                Detalle = _mapperDetail.Get(entity.Detalles)
            };
            return dto;
        }

        public override List<MasterDTO>? Get(List<T_Venta>? entityList)
        {
            var list = new List<MasterDTO>();
            if (entityList == null || entityList.Count == 0) { return default; }
            foreach (T_Venta entity in entityList)

            {
                var item = Get(entity);
                if(item == null) { continue; }
                list.Add(item);
            }
            return list;
        }

        public override T_Venta? Set(MasterDTO? dto)
        {
            if (dto == null) { return null; }
            var entity = new T_Venta
            {
                Id = dto.Id,
                Fecha = dto.Fecha,
                Detalles = _mapperDetail.Set(dto.Detalle),
                TotalVenta = dto.CalculateTotal(),
                cod_cliente = dto.Cliente.Id
            };
            return entity;
        }

        public override List<T_Venta>? Set(List<MasterDTO>? dtoList)
        {
            if(dtoList == null || dtoList.Count == 0) { return null; }
            var lst = new List<T_Venta>();
            foreach (MasterDTO dto in dtoList)
            {
                var item = Set(dto);
                if (item == null) { continue; }
                lst.Add(item);
            }
            return lst;
        }
    }
}
