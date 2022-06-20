namespace GetMalone.Data
{
    public class SellerRepository : ISellerRepository
    {
        private readonly ApplicationDbContext _context;

        public SellerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Seller? Create(Seller seller)
        {
            seller = _context.Sellers.Add(seller).Entity;
            _context.SaveChanges();
            return seller;
        }

        public Seller? GetById(int userId)
        {
            return _context.Sellers.FirstOrDefault(s => s.UserId.Equals(userId));
        }
    }
}
