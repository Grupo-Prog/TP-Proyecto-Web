namespace FarmaciaWebAPI.Models.Response
{
    // respuesta utilizada por los controladores
    public class RequestResponse
    {
        // 1 = exito, 0 = error
        public int Success { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }

        public RequestResponse()
        {
            Success = 0;
            Message = string.Empty;
            Data = null;
        }
    }
}
