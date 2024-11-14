using DataAccess.Context;

namespace FarmaciaWebAPI.Models.DTOs
{
    public class MasterDTO
    {
        public int Id { get; set; }

        public DateOnly? Fecha { get; set; }

        public ClientDTO? Cliente { get; set; }

        public decimal? TotalVenta { get; set; }
        public List<DetailDTO>? Detalle { get; set; }
        
    }
}
