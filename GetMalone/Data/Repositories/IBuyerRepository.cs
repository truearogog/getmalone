namespace GetMalone.Data
{
    public interface IBuyerRepository
    {
        Buyer? Create(Buyer buyer);
        Buyer? GetById(int userId);
        bool IsBuyer(int userId);
    }
}
