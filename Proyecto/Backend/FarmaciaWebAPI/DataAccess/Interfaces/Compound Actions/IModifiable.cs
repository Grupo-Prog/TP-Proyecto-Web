namespace FarmaciaWebAPI.Interfaces.CRUD
{
    public interface IModifiable<T> : IDeleteable<T>, IUpdateable<T>, ICreateable<T>
    {
    }
}