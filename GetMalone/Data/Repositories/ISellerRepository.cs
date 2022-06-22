namespace GetMalone.Data
{
    public interface ISellerRepository
    {
        Seller? Create(Seller seller);
        IQueryable<Seller> GetAll();
        Seller? GetById(int userId);
        bool IsSeller(int userId);
    }
}
