namespace FarmaciaWebAPI.Models.DTOs
{
    public class MasterDTO
    {
        public int Id { get; set; }

        public DateOnly? Fecha { get; set; }

        public int? Cliente { get; set; }

        public decimal? TotalVenta { get; set; }

    }
}
