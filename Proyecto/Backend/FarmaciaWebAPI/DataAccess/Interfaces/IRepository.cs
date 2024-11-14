using FarmaciaWebAPI.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IRepository<T> : IModifiable<T>, IGeteable<T>
    {
        //Task<List<T>?> GetAllAsync();
        //Task<T?> GetByIdAsync(int id);
        //Task<bool> UpdateAsync(T entity);
        //Task<bool> DeleteAsync(int id);
        //Task<bool> SaveAsync(T entity);
    }
}
