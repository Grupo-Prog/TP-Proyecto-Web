using Swashbuckle.AspNetCore.Annotations;

namespace FarmaciaWebAPI.Models.DTOs
{
    public class MasterSaveDTO
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }

        public DateOnly? Fecha { get; set; }

        public int ClienteId { get; set; }

        public List<DetailDTO>? Detalle { get; set; }

    }
}
