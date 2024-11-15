using DataAccess.Context;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using FarmaciaWebAPI.Common;
using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Interfaces.CRUD;
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
    public class UserService : IUserService<T_User>
    {
        private readonly Jwt _jwt;
        private readonly IUserRepository<T_User> _repo;
        public UserService(IOptions<Jwt> appSettingsSection, IUserRepository<T_User> repository)
        {
            _jwt = appSettingsSection.Value;
            _repo = repository;
        }


        public async Task<List<T_User>?> GetAllAsync()
        {
            //NO SE PUEDE DESENCRIPTAR
            var lst = await _repo.GetAllAsync();
            if (lst == null || lst.Count == 0) { return null; }

            return lst;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }
        public async Task<bool> Register(T_User user)
        {
            string encripted = Encrypt.GetSHA256(user.Contraseña);
            user.Contraseña = encripted;
            return await _repo.SaveAsync(user);
        }
        public async Task<UserResponse?> Auth(AuthenticationRequest request)
        {
            UserResponse response = new UserResponse();
            // buscar las credenciales en la base de datos
            // usuario y contraseña

            //encriptamos la contraseña y la utilizamos para buscar el mismo valor en la base de datos
            string encriptedPassword = Encrypt.GetSHA256(request.Password);
            try
            {

                var usuario = await _repo.GetUserAsync(request.Email, encriptedPassword);
                if (usuario == null) { return null; }

                if (request.Email == "admin@gmail.com" && request.Password == "admin")
                {
                    response.Token = GetTokenAdmin(request);
                }
                else
                {
                    response.Token = GetToken(request);
                }

            }
            catch (Exception)
            {
                return null;
                throw;
            }
            finally
            {
                response.Email = request.Email;
                response.Password = request.Password;
            }
            return response;
        }
        private string GetToken(AuthenticationRequest request)
        {
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
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, request.Email.Trim()),
                        new Claim("Password", request.Password),
                        new Claim(ClaimTypes.Role,"User")
                    }),

                //to do poner 5 minutos
                Expires = DateTime.UtcNow.AddMinutes(55),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        private string GetTokenAdmin(AuthenticationRequest request)
        {
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
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, request.Email.Trim()),
                        new Claim("Password", request.Password),
                        new Claim(ClaimTypes.Role,"Admin")
                    }),

                //to do poner 5 minutos
                Expires = DateTime.UtcNow.AddMinutes(55),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

