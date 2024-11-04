using FarmaciaWebAPI.Interfaces;
using FarmaciaWebAPI.Models.Request;
using FarmaciaWebAPI.Models.Response;
using FarmaciaWebAPI.Tools;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FarmaciaWebAPI.Services
{
    public class UserService : IUserService
    {
        public UserResponse Auth(AuthenticationRequest request)
        {
            UserResponse response = new UserResponse();
            // buscar las credenciales en la base de datos
            // usuario y contraseña
            
            //encriptamos la contraseña y la utilizamos para buscar el mismo valor en la base de datos
            string encriptedPassword = Encrypt.GetSHA256(request.Password);
            try
            {
                //buscar los datos a traves de entity framework o repositorio
                //var usuario = Context.usuarios.where(p =>
                //p.username == request.Username && p.password == encriptedPassword).FirstOrDefault();
                //if(usuario == null) return null

                if (request.Username == "mudo" && request.Password == "1234")
                {
                    response.Username = request.Username;
                    response.Token = "token";
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
    }
}
