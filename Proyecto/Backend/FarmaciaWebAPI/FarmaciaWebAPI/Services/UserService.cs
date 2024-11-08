using FarmaciaWebAPI.Common;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.Request;
using FarmaciaWebAPI.Models.Response;
using FarmaciaWebAPI.Tools;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FarmaciaWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly Jwt _jwt;
        public UserService(IOptions<Jwt> appSettingsSection)
        {
            _jwt = appSettingsSection.Value;
        }
        public async Task<UserResponse> Auth(AuthenticationRequest request)
        {
            UserResponse response = new UserResponse();
            // buscar las credenciales en la base de datos
            // usuario y contraseña

            //encriptamos la contraseña y la utilizamos para buscar el mismo valor en la base de datos
            string encriptedPassword = Encrypt.GetSHA256(request.Password);
            try
            {
                //TO DO
                //buscar los datos a traves de entity framework o repositorio
                //var usuario = Context.usuarios.where(p =>
                //p.username == request.Username && p.password == encriptedPassword).FirstOrDefault();
                //if(usuario == null) return null

                if (request.Username == "mudo" && request.Password == "1234")
                {
                    response.Username = request.Username;
                    response.Token = GetToken(request);
                }
                else return null;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }

            //response.Username = "username";
            //response.Token = "token"; //generar token JWT
            return response;
        }
        private string GetToken(AuthenticationRequest request)
        {
            //_jwt.Issuer,_jwt.Audience, claims: null, expires: DateTime.UtcNow.AddMinutes(5), signingCredentials: 

            var tokenHandler = new JwtSecurityTokenHandler();
            //accedemos a la clave secreta y creamos la llave
            //codificandola en un arreglo de bytes
            var key = Encoding.ASCII.GetBytes(_jwt.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = _jwt.Issuer,
                Audience = _jwt.Audience,
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        //new Claim (JwtRegisteredClaimNames.Sub, _jwt.Subject),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, request.Username),
                        new Claim("Password", request.Password),
                        new Claim(ClaimTypes.Role,"user")
                    }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
