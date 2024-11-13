namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IDeleteable<T>
    {
        Task<bool> Delete(int id);
    }
}