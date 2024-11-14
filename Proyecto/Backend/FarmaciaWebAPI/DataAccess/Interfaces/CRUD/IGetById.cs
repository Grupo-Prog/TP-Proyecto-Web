namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IGetById<T>
    {
        Task<T?> GetByIdAsync(int id);
    }
}