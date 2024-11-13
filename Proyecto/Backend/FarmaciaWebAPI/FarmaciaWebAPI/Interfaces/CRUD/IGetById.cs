namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IGetById<T>
    {
        Task<T> GetById(int id);
    }
}