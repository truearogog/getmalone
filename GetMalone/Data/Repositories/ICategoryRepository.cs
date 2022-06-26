namespace GetMalone.Data
{
    public interface ICategoryRepository
    {
        IQueryable<Category> GetAll();
        Category? GetById(int categoryId);
    }
}
