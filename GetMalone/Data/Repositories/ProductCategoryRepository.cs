namespace GetMalone.Data
{
    public class ProductCategoryRepository : Repository, IProductCategoryRepository
    {
        public ProductCategoryRepository(ApplicationDbContext context) : base(context) { }

        public IQueryable<ProductCategory> GetAll()
        {
            return _context.ProductCategories;
        }

        public ProductCategory? GetById(int categoryId)
        {
            return _context.ProductCategories.FirstOrDefault(c => c.Id.Equals(categoryId));
        }
    }
}
