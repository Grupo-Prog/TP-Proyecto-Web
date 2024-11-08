using FarmaciaWebAPI.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using System.Reflection;

namespace FarmaciaWebAPI.Tools
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
        public Output Set(Input entity)
        {
            if (entity == null) { return default; }
            Output dto = new Output();
            PropertyInfo[] properties = typeof(Input).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                TransferProperty(property, entity, dto);
            }
            return dto;
        }
        public Input Get(Output dto)
        {
            if (dto == null) { return default; }
            Input entity = new Input();
            PropertyInfo[] properties = typeof(Output).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                TransferProperty(property, dto, entity);
            }
            return entity;
        }
        public List<Output> Set(List<Input> entitylist)
        {
            if (entitylist == null || entitylist.Count == 0) { return default; }
            List<Output> lst = new List<Output>();
            foreach (Input entity in entitylist)
            {
                lst.Add(Set(entity));
            }
            return lst;
        }
        public List<Input> Get(List<Output> dtoList)
        {
            List<Input> lst = new List<Input>();
            foreach (Output dto in dtoList)
            {
                lst.Add(Get(dto));
            }
            return lst;
        }
    }
}
