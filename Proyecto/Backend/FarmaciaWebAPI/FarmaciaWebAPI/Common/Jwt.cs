namespace FarmaciaWebAPI.Common
{
    public class Jwt
    {
        //clase utilizada para inyectar la clave secreta
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience{ get; set; }
        public string Subject{ get; set; }
    }
}
