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

        public MasterDTO()
        {
            Id = 0;
            Fecha = DateOnly.FromDateTime(DateTime.Now);
            Cliente = new ClientDTO();
            Detalle = new List<DetailDTO>();
        }
        public decimal? CalculateTotal()
        {
            decimal? total = 0;
            foreach(var detail in Detalle)
            {
                total += detail.CalcualteTotal();
            }
            return total;
        }

    }
}
