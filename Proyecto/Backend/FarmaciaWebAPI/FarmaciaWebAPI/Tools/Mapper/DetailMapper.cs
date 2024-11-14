using DataAccess.Context;
using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Tools.Mapper
{
    public class DetailMapper : MapperBase<DetailDTO,T_Detalles_Venta>
    {
        public override T_Detalles_Venta? Set(DetailDTO? dto)
        {
            if(dto == null) { return null; }
            var entity = new T_Detalles_Venta()
            {
                Id = dto.Id,
                NroDetalle = dto.NroDetalle,
                Producto = dto.Producto,
                Precio = dto.Precio,
                Cantidad = dto.Cantidad,
                TotalDetalle = dto.TotalDetalle
            };
            return entity;

        }

        public override DetailDTO? Get(T_Detalles_Venta? entity)
        {
            if(entity == null) { return null; }
            var dto = new DetailDTO
            {
                Id = entity.Id,
                NroDetalle = entity.NroDetalle,
                Producto = entity.Producto,
                Precio = entity.Precio,
                Cantidad = entity.Cantidad,
                TotalDetalle = entity.TotalDetalle
            };
            return dto;
        }
        public  ICollection<T_Detalles_Venta>? Set(List<DetailDTO>? dtoList)
        {
            var lst = new List<T_Detalles_Venta>();
            if(dtoList == null || dtoList.Count == 0) { return null; }
            foreach(DetailDTO dto in dtoList)
            {
                var item = Set(dto);
                if(item == null) { continue; }
                lst.Add(item);
            }
            return lst;
        }

        public List<DetailDTO>? Get(ICollection<T_Detalles_Venta>? entityList)
        {
            var lst = new List<DetailDTO>();
            if (entityList == null || entityList.Count == 0) { return null; }
            foreach (T_Detalles_Venta entity in entityList)
            {
                var item= Get(entity);
                if(item == null) { continue; }
                lst.Add(item);
            }
            return lst;
        }
    }
}
