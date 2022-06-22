namespace GetMalone.Data
{
    public class ProductRepository : Repository, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context) { }

        public Product? Create(Product product)
        {
            product = _context.Products.Add(product).Entity;
            _context.SaveChanges();
            return product;
        }

        public void Delete(Product product)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public IQueryable<Product> GetAll()
        {
            return _context.Products;
        }

        public IQueryable<Product> GetByCategoryId(int categoryId)
        {
            return _context.Products.Where(p => p.CategoryId.Equals(categoryId));
        }

        public Product? GetById(int productId)
        {
            return _context.Products.FirstOrDefault(p => p.Id.Equals(productId));
        }

        public IQueryable<Product> GetBySellerId(int sellerId)
        {
            return _context.Products.Where(p => p.SellerId.Equals(sellerId));
        }
    }
}
