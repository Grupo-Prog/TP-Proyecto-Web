using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FarmaciaWebAPI.Models.DTOs
{
    public class DetailDTO
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }

        public int? NroDetalle { get; set; }

        public string Producto { get; set; }

        public decimal? Precio { get; set; }

        public int? Cantidad { get; set; }

        [SwaggerSchema(ReadOnly = true)]
        public decimal? TotalDetalle { get; set; }
        public DetailDTO()
        {
            Id = 0;
            NroDetalle = 0;
            Producto = string.Empty;
            Precio = 0;
            Cantidad = 0;

        }
        public decimal? CalcualteTotal()
        {
            return Precio * Cantidad;
        }

    }
}
