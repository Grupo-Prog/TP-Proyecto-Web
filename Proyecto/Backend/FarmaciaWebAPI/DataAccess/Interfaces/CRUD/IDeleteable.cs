namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IDeleteable<T>
    {
        Task<bool> DeleteAsync(int id);
    }
}