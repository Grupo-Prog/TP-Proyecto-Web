namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IUpdateable<T>
    {
        Task<bool> Update(int id, T entity);
    }
}