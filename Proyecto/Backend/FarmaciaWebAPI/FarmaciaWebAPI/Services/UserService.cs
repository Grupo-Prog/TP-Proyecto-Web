using DataAccess.Repositories;
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
        private readonly UserRepository _repo;
        public UserService(IOptions<Jwt> appSettingsSection, UserRepository repository)
        {
            _jwt = appSettingsSection.Value;
            _repo = repository;
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
                var usuario = await _repo.GetUser(request.Username, encriptedPassword);
                if (usuario == null) { return null; } 
               
                response.Username = request.Username;
                response.Token = GetToken(request);
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
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
                        new Claim(ClaimTypes.NameIdentifier, request.Username.Trim()),
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
