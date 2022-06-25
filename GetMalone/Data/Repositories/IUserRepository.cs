namespace GetMalone.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User? GetById(int id);
        User? GetByEmail(string email);
        IQueryable<User> GetAll();
        Buyer CreateBuyer(User user, Buyer userBuyer);
        Buyer? GetBuyerById(int id);
        Seller CreateSeller(User user, Seller userSeller);
        Seller? GetSellerById(int id);
    }
}
