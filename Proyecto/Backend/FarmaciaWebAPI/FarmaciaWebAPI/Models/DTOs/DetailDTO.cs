using System.ComponentModel.DataAnnotations.Schema;

namespace FarmaciaWebAPI.Models.DTOs
{
    public class DetailDTO
    {
        public int Id { get; set; }

        public int? NroDetalle { get; set; }

        public string Producto { get; set; }

        public decimal? Precio { get; set; }

        public int? Cantidad { get; set; }

        public decimal? TotalDetalle { get; set; }

    }
}
