namespace GetMalone.Data
{
    public interface ISellerRepository
    {
        Seller? Create(Seller seller);
        Seller? GetById(int userId);
        bool IsSeller(int userId);
    }
}
