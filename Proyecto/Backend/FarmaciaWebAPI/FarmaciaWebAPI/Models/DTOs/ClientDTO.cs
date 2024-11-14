using DataAccess.Context;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace FarmaciaWebAPI.Models.DTOs
{
    public class ClientDTO
    {
        [SwaggerSchema(ReadOnly =true)]
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public int? Dni { get; set; }

        public int? Telefono { get; set; }

        public DateOnly? Fecha_nac { get; set; }

        public string ObraSocial { get; set; }



    }
}
