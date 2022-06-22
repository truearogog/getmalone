namespace GetMalone.Data
{
    public class SellerRepository : Repository, ISellerRepository
    {
        public SellerRepository(ApplicationDbContext context) : base(context) { }

        public Seller? Create(Seller seller)
        {
            seller = _context.Sellers.Add(seller).Entity;
            _context.SaveChanges();
            return seller;
        }

        public IQueryable<Seller> GetAll()
        {
            return _context.Sellers;
        }

        public Seller? GetById(int userId)
        {
            return _context.Sellers.FirstOrDefault(s => s.UserId.Equals(userId));
        }

        public bool IsSeller(int userId)
        {
            return _context.Sellers.Any(b => b.UserId.Equals(userId));
        }
    }
}
