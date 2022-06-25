using Microsoft.EntityFrameworkCore;

namespace GetMalone.Data
{
    public class UserRepository : Repository, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context) {}

        public User Create(User user)
        {
            user = _context.Users.Add(user).Entity;
            _context.SaveChanges();
            return user;
        }

        public User? GetById(int id)
        {
            return GetAll().FirstOrDefault(u => u.Id.Equals(id));
        }

        public User? GetByEmail(string email)
        {
            return GetAll().FirstOrDefault(u => u.Email.Equals(email));
        }

        public IQueryable<User> GetAll()
        {
            return _context.Users
                .Include(u => u.Buyer)
                .Include(u => u.Seller);
        }

        public Buyer CreateBuyer(User user, Buyer userBuyer)
        {
            user = Create(user);
            userBuyer.User = user;
            userBuyer = _context.Buyers.Add(userBuyer).Entity;
            _context.SaveChanges();
            return userBuyer;
        }

        public Buyer? GetBuyerById(int id)
        {
            return _context.Buyers
                .Include(b => b.User)
                .FirstOrDefault(b => b.UserId.Equals(id));
        }

        public Seller CreateSeller(User user, Seller userSeller)
        {
            user = Create(user);
            userSeller.User = user;
            userSeller = _context.Sellers.Add(userSeller).Entity;
            _context.SaveChanges();
            return userSeller;
        }

        public Seller? GetSellerById(int id)
        {
            return _context.Sellers
                .Include(s => s.User)
                .Include(s => s.Products)
                .FirstOrDefault(s => s.UserId.Equals(id));
        }
    }
}
