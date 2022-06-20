namespace GetMalone.Data
{
    public class BuyerRepository : IBuyerRepository
    {
        private readonly ApplicationDbContext _context;

        public BuyerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

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
    }
}
