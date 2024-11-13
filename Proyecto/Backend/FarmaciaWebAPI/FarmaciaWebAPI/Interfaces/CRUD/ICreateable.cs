namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface ICreateable<T>
    {
        Task<bool> Save(T entity);
    }
}