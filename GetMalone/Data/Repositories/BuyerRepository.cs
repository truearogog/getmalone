namespace GetMalone.Data
{
    public class BuyerRepository : Repository, IBuyerRepository
    {
        public BuyerRepository(ApplicationDbContext context) : base(context) { }

        public Buyer? Create(Buyer buyer)
        {
            buyer = _context.Buyers.Add(buyer).Entity;
            _context.SaveChanges();
            return buyer;
        }

        public Buyer? GetById(int userId)
        {
            return _context.Buyers.FirstOrDefault(b => b.UserId.Equals(userId));
        }

        public bool IsBuyer(int userId)
        {
            return _context.Buyers.Any(b => b.UserId.Equals(userId));
        }
    }
}
