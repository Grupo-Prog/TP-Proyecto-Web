namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IGetAll<T>
    {
        Task<List<T>> GetAll();
    }
}