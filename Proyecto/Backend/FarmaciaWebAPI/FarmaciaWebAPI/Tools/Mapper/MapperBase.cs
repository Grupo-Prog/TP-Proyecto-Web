using FarmaciaWebAPI.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using System.Reflection;

namespace FarmaciaWebAPI.Tools.Mapper
{
    public class MapperBase<Input, Output> : IMapperBase<Input, Output>
        where Input : new()
        where Output : new()
    {


        private void TransferProperty(PropertyInfo property, object fromValue, object whereToValue)
        {
            try
            {
                string propName = property.Name;
                var propValue = property.GetValue(fromValue);
                //las propiedades de ambas clases deben tener el mismo nombre
                // y mismo tipo
                whereToValue.GetType().GetProperty(propName).SetValue(whereToValue, propValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Output Set(Input dto)
        {
            if (dto == null) { return default; }
            Output entity = new Output();
            PropertyInfo[] properties = typeof(Input).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                TransferProperty(property, dto, entity);
            }
            return entity;
        }
        public Input Get(Output entity)
        {
            if (entity == null) { return default; }
            Input dto = new Input();
            PropertyInfo[] properties = typeof(Output).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                TransferProperty(property, entity, dto);
            }
            return dto;
        }
        public List<Output> Set(List<Input> dtoList)
        {
            if (dtoList == null || dtoList.Count == 0) { return default; }
            List<Output> lst = new List<Output>();
            foreach (Input entity in dtoList)
            {
                lst.Add(Set(entity));
            }
            return lst;
        }
        public List<Input> Get(List<Output> entityList)
        {
            List<Input> lst = new List<Input>();
            foreach (Output dto in entityList)
            {
                lst.Add(Get(dto));
            }
            return lst;
        }
    }
}
