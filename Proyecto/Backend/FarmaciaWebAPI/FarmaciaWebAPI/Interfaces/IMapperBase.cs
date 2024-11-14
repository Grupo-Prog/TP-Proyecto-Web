namespace FarmaciaWebAPI.Interfaces
{
    public interface IMapperBase <Input,Output>
    {
        Output? Set(Input? entity);
        Input? Get(Output? entity);
        List<Output>? Set(List<Input>? entityList);
        List<Input>? Get(List<Output>? entityList);
    }
}
