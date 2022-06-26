namespace GetMalone.Data
{
    public class CategoryRepository : Repository, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context) { }

        public IQueryable<Category> GetAll()
        {
            return _context.Categories;
        }

        public Category? GetById(int categoryId)
        {
            return _context.Categories.FirstOrDefault(pc => pc.Id.Equals(categoryId));
        }
    }
}
