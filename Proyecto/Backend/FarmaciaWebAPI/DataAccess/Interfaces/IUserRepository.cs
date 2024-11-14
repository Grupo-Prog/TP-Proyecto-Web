using FarmaciaWebAPI.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IUserRepository<UserType> : IDeleteable<UserType>, IGetAll<UserType>, ICreateable<UserType>
    {
        Task<UserType?> GetUserAsync(string email, string password);
    }
}
