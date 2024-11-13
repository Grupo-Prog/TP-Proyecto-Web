using FarmaciaWebAPI.Interfaces.CRUD;

namespace FarmaciaWebAPI.Interfaces
{
    public interface IManager<T> : IModifiable<T> , IGeteable<T>
    {
    }
}

