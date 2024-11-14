using DataAccess.Context;
using FarmaciaWebAPI.Interfaces.CRUD;
using FarmaciaWebAPI.Models.Request;
using FarmaciaWebAPI.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FarmaciaWebAPI.Interfaces
{
    public interface IUserService<UserType> : IDeleteable<UserType>, IGetAll<UserType>
    {
        //devuelve una Respuesta
        //se le ingresa una peticion de autenticación
        Task<UserResponse?> Auth(AuthenticationRequest request);
        Task<bool> Register(); 
    }
}
