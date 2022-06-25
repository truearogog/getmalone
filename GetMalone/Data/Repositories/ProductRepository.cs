using Microsoft.EntityFrameworkCore;

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
            return _context.Products
                .Include(p => p.Seller)
                .Include(p => p.Seller.User)
                .Include(p => p.Category);
        }

        public IQueryable<Product> GetByCategoryId(int categoryId)
        {
            return GetAll().Where(p => p.CategoryId.Equals(categoryId));
        }

        public Product? GetById(int productId)
        {
            return GetAll().FirstOrDefault(p => p.Id.Equals(productId));
        }

        public IQueryable<Product> GetBySellerId(int sellerId)
        {
            return GetAll().Where(p => p.SellerId.Equals(sellerId));
        }

        public Product? Update(Product product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
            return product;
        }
    }
}
