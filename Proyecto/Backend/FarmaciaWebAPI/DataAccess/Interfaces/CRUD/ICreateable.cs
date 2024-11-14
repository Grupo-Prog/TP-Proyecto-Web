namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface ICreateable<T>
    {
        Task<bool> SaveAsync(T entity);
    }
}