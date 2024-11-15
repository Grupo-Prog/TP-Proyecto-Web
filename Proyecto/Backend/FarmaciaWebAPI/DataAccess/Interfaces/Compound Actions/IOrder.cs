namespace DataAccess.Interfaces
{
    public interface IOrder<T>
    {
        Task<List<T>?> GetOrderedAsync();
    }
}