namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IUpdateable<T>
    {
        Task<bool> UpdateAsync(int id, T entity);
    }
}