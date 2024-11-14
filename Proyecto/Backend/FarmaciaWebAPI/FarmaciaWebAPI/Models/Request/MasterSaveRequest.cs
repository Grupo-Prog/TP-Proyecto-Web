using FarmaciaWebAPI.Models.DTOs;

namespace FarmaciaWebAPI.Models.Request
{
    public class MasterSaveRequest
    {
        public MasterSaveDTO Venta { get; set; }

        public MasterDTO Convert(MasterSaveDTO save)
        {
            var dto = new MasterDTO();
            dto.Id = save.Id;
            dto.Fecha = save.Fecha;
            dto.Cliente.Id = save.ClienteId;
            dto.Detalle = save.Detalle;
            return dto;
        }
    }
}
